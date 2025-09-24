export function initNavigation() {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".header-nav");
  const links = nav?.querySelectorAll("a");
  const overlay = document.querySelector(".overlay");

  function toggleNav(forceClose = false) {
    const opened = forceClose ? false : !nav.classList.contains("active");
    nav.classList.toggle("active", opened);
    burger.classList.toggle("open", opened);
    overlay.classList.toggle("active", opened);
    document.body.classList.toggle("nav-open", opened);
    burger.setAttribute("aria-expanded", opened ? "true" : "false");
  }

  burger?.addEventListener("click", () => toggleNav());
  links?.forEach((a) => a.addEventListener("click", () => toggleNav(true)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("active")) toggleNav();
  });
  overlay?.addEventListener("click", () => toggleNav(true));
  document.addEventListener("click", (e) => {
    if (
      nav.classList.contains("active") &&
      !nav.contains(e.target) &&
      !burger.contains(e.target)
    ) {
      toggleNav(true);
    }
  });
}
