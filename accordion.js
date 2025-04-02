// Helper: dispatch a synthetic click event that bubbles.
function simulateClick(element) {
  var event = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: true
  });
  element.dispatchEvent(event);
}

function initializeAccordion(listElement) {
  var openClass = "dc-accordion-is-open";
  var toggleClass = listElement.getAttribute("dc-accordion-toggle");

  if (!toggleClass) {
    console.error("[DC] Accordion Error: Missing 'dc-accordion-toggle' attribute.");
    return;
  }

  var toggles = listElement.querySelectorAll("." + toggleClass);
  if (!toggles.length) {
    console.error("[DC] Accordion Error: No elements found with class '" + toggleClass + "'.");
    return;
  }

  var defaultIndex = parseInt(listElement.getAttribute("dc-accordion-default")) || 1;
  if (defaultIndex < 1 || defaultIndex > toggles.length) {
    console.error("[DC] Accordion Error: Default index (" + defaultIndex + ") is out of range.");
    return;
  }

  // Open the default tab using synthetic click.
  toggles.forEach(function(toggle, index) {
    if (index === defaultIndex - 1) {
      toggle.classList.add(openClass);
      simulateClick(toggle);
    }
  });

  // Listen for clicks on the accordion container.
  listElement.addEventListener("click", function(event) {
    var clickedToggle = event.target.closest("." + toggleClass);
    if (!clickedToggle) return;

    var openToggles = Array.from(toggles).filter(function(t) {
      return t.classList.contains(openClass);
    });

    // If the clicked toggle is already open and it's the only one open, do nothing.
    if (clickedToggle.classList.contains(openClass) && openToggles.length === 1) {
      return;
    }

    // Otherwise, close any open toggle(s) that are not the clicked one.
    toggles.forEach(function(toggle) {
      if (toggle !== clickedToggle && toggle.classList.contains(openClass)) {
        toggle.classList.remove(openClass);
        simulateClick(toggle);
      }
    });

    // If the clicked toggle isn't open, open it.
    if (!clickedToggle.classList.contains(openClass)) {
      clickedToggle.classList.add(openClass);
      simulateClick(clickedToggle);
    }
  });
}

function setupAccordions() {
  document.querySelectorAll('[dc-accordion="list"]').forEach(function(listElement) {
    initializeAccordion(listElement);
  });
}

// Wait until Webflow is ready and CMS items are rendered.
// The setTimeout delay (500ms) may be adjusted based on your CMS load timing.
window.Webflow = window.Webflow || [];
window.Webflow.push(function() {
  setTimeout(setupAccordions, 500);
});
