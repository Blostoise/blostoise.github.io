/**
 * SITE NAVIGATION
 * ----------------------------------------------------------------
 * This is the ONLY file you need to edit to change the site's
 * navigation menu. Add, remove, reorder, or rename links in the
 * NAV_LINKS array below and every page that includes this script
 * will update automatically.
 *
 * label   -> text shown in the menu
 * href    -> where it links to (an in-page anchor like "#world",
 *            or another page like "characters.html")
 * external -> optional, set to true to open the link in a new tab
 * ----------------------------------------------------------------
 */

const NAV_LINKS = [
  { label: "Home", href: "#top" },
  { label: "The World", href: "#world" },
  { label: "Timeline", href: "#timeline" },
];

/* ------------------------------------------------------------- */
/* Rendering logic — shouldn't need to change for a simple edit. */
/* ------------------------------------------------------------- */
function renderSiteNav() {
  const mount = document.getElementById("site-nav");
  if (!mount) return;

  const items = NAV_LINKS.map((link) => {
    const target = link.external ? ' target="_blank" rel="noopener"' : "";
    return `<li><a href="${link.href}"${target}>${link.label}</a></li>`;
  }).join("");

  mount.innerHTML = `
    <ul class="nav-list" id="nav-list">${items}</ul>
    <button class="nav-toggle" id="nav-toggle" aria-label="Toggle navigation" aria-expanded="false" aria-controls="nav-list">
      <span></span><span></span><span></span>
    </button>
  `;

  const toggle = document.getElementById("nav-toggle");
  const list = document.getElementById("nav-list");

  toggle.addEventListener("click", () => {
    const isOpen = list.classList.toggle("is-open");
    toggle.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  list.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      list.classList.remove("is-open");
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

document.addEventListener("DOMContentLoaded", renderSiteNav);
