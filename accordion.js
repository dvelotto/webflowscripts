function initializeAccordion(listElement) {
  const openClass = "dc-accordion-is-open";
  const toggleClass = listElement.getAttribute("dc-accordion-toggle");

  if (!toggleClass) {
    console.error("[DC] Accordion Error: Missing 'dc-accordion-toggle' attribute.");
    return;
  }

  const toggles = listElement.querySelectorAll(`.${toggleClass}`);
  if (!toggles.length) {
    console.error(`[DC] Accordion Error: No elements found with class '${toggleClass}'.`);
    return;
  }

  const defaultIndex = parseInt(listElement.getAttribute("dc-accordion-default")) || 1;

  // Open default tab
  toggles.forEach((toggle, index) => {
    if (index === defaultIndex - 1) {
      toggle.classList.add(openClass);
      toggle.click(); // trigger interaction
    }
  });

  listElement.addEventListener("click", function (event) {
    const clickedToggle = event.target.closest(`.${toggleClass}`);
    if (!clickedToggle) return;

    const isOpen = clickedToggle.classList.contains(openClass);
    const openItems = Array.from(toggles).filter(t => t.classList.contains(openClass));

    // If it's already open and the only one open, prevent closing
    if (isOpen && openItems.length === 1) {
      return;
    }

    // Close others
    toggles.forEach(t => {
      if (t !== clickedToggle && t.classList.contains(openClass)) {
        t.classList.remove(openClass);
        t.click(); // trigger close interaction
      }
    });

    // Open this one
    if (!isOpen) {
      clickedToggle.classList.add(openClass);
      clickedToggle.click(); // trigger open interaction
    }
  });
}

// Run when Webflow is ready
window.Webflow = window.Webflow || [];
window.Webflow.push(() => {
  // Slight delay to ensure Webflow finishes rendering CMS items
  setTimeout(() => {
    document.querySelectorAll('[dc-accordion="list"]').forEach(initializeAccordion);
  }, 50); // adjust delay if needed
});
