function u(e) {
  let openClass = "dc-accordion-is-open",
      toggleClass = e.getAttribute("dc-accordion-toggle");

  if (!toggleClass) {
    console.error("[DC] Accordion Error: Toggle class name attribute ('dc-accordion-toggle') is missing.");
    return;
  }

  let toggles = e.querySelectorAll(`.${toggleClass}`);
  if (toggles.length === 0) {
    console.error(`[DC] Accordion Error: No elements found with the class '${toggleClass}' in the accordion list.`);
    return;
  }

  let defaultIndex = parseInt(e.getAttribute("dc-accordion-default")) || 1,
      openAll = e.getAttribute("dc-accordion-open-all") === "true",
      allowClose = e.getAttribute("dc-accordion-close") !== "false";

  if (openAll && e.getAttribute("dc-accordion-close") === null) {
    allowClose = false;
  }

  if (!openAll && (defaultIndex < 1 || defaultIndex > toggles.length)) {
    console.error(`[DC] Accordion Error: The default open index (${defaultIndex}) is out of range for the number of toggles (${toggles.length}).`);
    return;
  }

  // Initialize: open all if openAll is true, otherwise open only the default toggle.
  toggles.forEach((toggle, index) => {
    if (openAll || index === defaultIndex - 1) {
      toggle.click();
      toggle.classList.add(openClass);
    }
  });

  e.addEventListener("click", function(event) {
    let clickedToggle = event.target.closest(`.${toggleClass}`);
    if (!clickedToggle) return;

    // Gather currently open toggles
    let openToggles = Array.from(toggles).filter(i => i.classList.contains(openClass));

    // If the clicked toggle is already open...
    if (clickedToggle.classList.contains(openClass)) {
      // ...and it is the only one open, do nothing.
      if (openToggles.length === 1) {
        return;
      } else {
        // Otherwise, allow closing it.
        clickedToggle.classList.remove(openClass);
        clickedToggle.click();
      }
    } else {
      // If the clicked toggle is closed, close all others (if allowed) and open the clicked one.
      if (allowClose) {
        toggles.forEach(i => {
          if (i !== clickedToggle && i.classList.contains(openClass)) {
            i.classList.remove(openClass);
            i.click();
          }
        });
      }
      clickedToggle.classList.add(openClass);
      clickedToggle.click();
    }
  });
}

function d() {
  document.querySelectorAll('[dc-accordion="list"]').forEach(u);
}

window.Webflow = window.Webflow || [];
window.Webflow.push(() => {
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", d) : d();
});
