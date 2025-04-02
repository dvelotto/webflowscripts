function u(e){
  let o = "dc-accordion-is-open",
      s = e.getAttribute("dc-accordion-toggle");

  if (!s) {
    console.error("[DC] Accordion Error: Toggle class name attribute ('dc-accordion-toggle') is missing.");
    return;
  }

  let c = e.querySelectorAll(`.${s}`);
  if (c.length === 0) {
    console.error(`[DC] Accordion Error: No elements found with the class '${s}' in the accordion list.`);
    return;
  }

  let n = parseInt(e.getAttribute("dc-accordion-default")) || 1,
      l = e.getAttribute("dc-accordion-open-all") === "true",
      a = e.getAttribute("dc-accordion-close") !== "false";

  if (l && e.getAttribute("dc-accordion-close") === null) a = false;

  if (!l && (n < 1 || n > c.length)) {
    console.error(`[DC] Accordion Error: The default open index (${n}) is out of range for the number of toggles (${c.length}).`);
    return;
  }

  c.forEach((r, t) => {
    if (l || t === n - 1) {
      r.click();
      r.classList.add(o);
    }
  });

  e.addEventListener("click", function(r) {
    let t = r.target.closest(`.${s}`);
    if (!t) return;

    let openCount = Array.from(c).filter(i => i.classList.contains(o)).length;

    // If closing the last open item, block it
    if (t.classList.contains(o) && openCount === 1) {
      return; // prevent closing the last open toggle
    }

    if (a) {
      c.forEach(i => {
        if (i !== t && i.classList.contains(o)) {
          i.click();
          i.classList.remove(o);
        }
      });
    }

    // Toggle clicked item
    if (t.classList.contains(o)) {
      t.classList.remove(o);
    } else {
      t.classList.add(o);
    }
  });
}

function d(){
  document.querySelectorAll('[dc-accordion="list"]').forEach(u);
}

window.Webflow ||= [];
window.Webflow.push(() => {
  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", d)
    : d();
});
