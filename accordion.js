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

  // Initialize: open all or default toggle
  toggles.forEach((toggle, index) => {
    if (openAll || index === defaultIndex - 1) {
      toggle.click();
      toggle.classList.add(openClass);
    }
  });

  e.addEventListener("click", function (event) {
    let targetToggle = event.target.closest(`.${toggleClass}`);
    if (!targetToggle) return;

    // Count how many toggles are currently open
    let openCount = Array.from(toggles).filter(i => i.classList.contains(openClass)).length;

    // If the target is already open…
    if (targetToggle.classList.contains(openClass)) {
      // …and it's the only one open, do nothing.
      if (openCount === 1) {
        return;
      } else {
        // Otherwise, allow closing it
        targetToggle.classList.remove(openClass);
        targetToggle.click();
      }
    } else {
      // When opening a new toggle, close others if allowed
      if (allowClose) {
        toggles.forEach(item => {
          if (item !== targetToggle && item.classList.contains(openClass)) {
            item.classList.remove(openClass);
            item.click();
          }
        });
      }
      targetToggle.classList.add(openClass);
      targetToggle.click();
    }
  });
}

function d() {
  document.querySelectorAll('[dc-accordion="list"]').forEach(u);
}

// Use older syntax for browser compatibility
window.Webflow = window.Webflow || [];
window.Webflow.push(function () {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", d);
  } else {
    d();
  }
});
