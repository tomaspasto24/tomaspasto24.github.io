(function () {
  "use strict";

  var nav = document.getElementById("site-nav");
  var toggle = document.querySelector(".nav-toggle");

  function setNav(open) {
    if (!nav || !toggle) return;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.querySelector(".visually-hidden").textContent = open ? "Close menu" : "Open menu";
    nav.classList.toggle("is-open", open);
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setNav(toggle.getAttribute("aria-expanded") !== "true");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function (event) {
        setNav(false);
        var id = link.hash;
        var target = id ? document.querySelector(id) : null;
        if (target && link.pathname.replace(/^\//, "") === location.pathname.replace(/^\//, "")) {
          event.preventDefault();
          target.scrollIntoView({
            behavior: prefersReducedMotion() ? "auto" : "smooth",
            block: "start"
          });
          history.pushState(null, "", id);
        }
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") setNav(false);
    });
  }

  var topBtn = document.querySelector(".scrollToTopBtn");
  if (topBtn) {
    if (!topBtn.getAttribute("aria-label")) {
      topBtn.setAttribute("aria-label", "Back to top");
    }
    topBtn.setAttribute("href", "#top");

    topBtn.addEventListener("click", function (event) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
      var heading = document.querySelector("h1");
      if (heading) heading.focus({ preventScroll: true });
    });
  }

  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  if (window.AOS) {
    window.AOS.init({
      disable: prefersReducedMotion(),
      duration: 650,
      once: true,
      offset: 40
    });
  }

  if (document.querySelector('nav[aria-label="Breadcrumb"]')) {
    document.querySelectorAll(".awe-section-header").forEach(function (hero) {
      hero.setAttribute("hidden", "");
      hero.setAttribute("aria-hidden", "true");
    });
  }
})();
