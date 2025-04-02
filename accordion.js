function u(e) {
  var openClass = "dc-accordion-is-open",
      toggleClass = e.getAttribute("dc-accordion-toggle");

  if (!toggleClass) {
    console.error("[DC] Accordion Error: Toggle class name attribute ('dc-accordion-toggle') is missing.");
    return;
  }

  var toggles = e.querySelectorAll('.' + toggleClass);
  if (toggles.length === 0) {
    console.error("[DC] Accordion Error: No elements found with the class '" + toggleClass + "' in the accordion list.");
    return;
  }

  var defaultIndex = parseInt(e.getAttribute("dc-accordion-default")) || 1;
  if (defaultIndex < 1 || defaultIndex > toggles.length) {
    console.error("[DC] Accordion Error: The default open index (" + defaultIndex + ") is out of range for the number of toggles (" + toggles.length + ").");
    return;
  }

  // Initialize: Open only the default toggle.
  toggles.forEach(function(toggle, index) {
    if (index === defaultIndex - 1) {
      toggle.click();
      toggle.classList.add(openClass);
    }
  });

  // Listen for clicks on the accordion.
  e.addEventListener("click", function(event) {
    var clickedToggle = event.target.closest('.' + toggleClass);
    if (!clickedToggle) return;

    // If the clicked toggle is already open, do nothing.
    if (clickedToggle.classList.contains(openClass)) {
      return;
    }

    // Close any currently open toggle.
    toggles.forEach(function(toggle) {
      if (toggle.classList.contains(openClass)) {
        toggle.classList.remove(openClass);
        toggle.click(); // Trigger the close behavior.
      }
    });

    // Open the clicked toggle.
    clickedToggle.classList.add(openClass);
    clickedToggle.click(); // Trigger the open behavior.
  });
}

function d() {
  document.querySelectorAll('[dc-accordion="list"]').forEach(u);
}

window.Webflow = window.Webflow || [];
window.Webflow.push(function () {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", d);
  } else {
    d();
  }
});
