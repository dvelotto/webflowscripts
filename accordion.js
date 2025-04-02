can you make this script also always keep one open:

function u(e){let o="dc-accordion-is-open",s=e.getAttribute("dc-accordion-toggle");if(!s){console.error("[DC] Accordion Error: Toggle class name attribute ('dc-accordion-toggle') is missing.");return}let c=e.querySelectorAll(`.${s}`);if(c.length===0){console.error(`[DC] Accordion Error: No elements found with the class '${s}' in the accordion list.`);return}let n=parseInt(e.getAttribute("dc-accordion-default"))||1,l=e.getAttribute("dc-accordion-open-all")==="true",a=e.getAttribute("dc-accordion-close")!=="false";if(l&&e.getAttribute("dc-accordion-close")===null&&(a=!1),!l&&(n<1||n>c.length)){console.error(`[DC] Accordion Error: The default open index (${n}) is out of range for the number of toggles (${c.length}).`);return}c.forEach((r,t)=>{(l||t===n-1)&&(r.click(),r.classList.add(o))}),e.addEventListener("click",function(r){let t=r.target.closest(`.${s}`);t&&(a&&c.forEach(i=>{i!==t&&i.classList.contains(o)&&(i.click(),i.classList.remove(o))}),t.classList.contains(o)?t.classList.remove(o):t.classList.add(o))})}function d(){document.querySelectorAll('[dc-accordion="list"]').forEach(u)}window.Webflow||=[];window.Webflow.push(()=>{document.readyState==="loading"?document.addEventListener("DOMContentLoaded",d):d()});
/*!
 * Webflow Accordion Toggle Script
 * This script enhances Webflow custom accordion components with additional functionality.
 * It enables interactive open/close behavior of accordion elements.
 * Features:
 * - Open all toggles by default.
 * - Open a specific toggle by default.
 * - Comprehensive error handling for configuration issues.
 *
 * Copyright 2023, Delta Clan. All rights reserved.
 * @website: https://deltaclan.com
 * @author: Dimitris Theofanous, dimitris@deltaclan.com
 */
