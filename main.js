document.addEventListener("DOMContentLoaded", function () {
  const hamburgerButton = document.querySelector(".hamburger-button");
  const navBar = document.querySelector("#main-navigation");
  const header = document.querySelector(".site-header");

  // Scroll lock helpers
  function getScrollBarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
  }

  function lockScroll() {
    const scrollBarWidth = getScrollBarWidth();
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = scrollBarWidth + "px";

    if (header) {
      header.style.paddingRight = scrollBarWidth + "px";
    }
  }

  function unlockScroll() {
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";

    if (header) {
      header.style.paddingRight = "";
    }
  }

  // Toggle nav on hamburger click
  hamburgerButton.addEventListener("click", function () {
    const isOpening = !navBar.classList.contains("active");

    this.classList.toggle("active", isOpening);
    this.setAttribute("aria-expanded", isOpening);
    navBar.setAttribute("aria-hidden", !isOpening);

    if (isOpening) {
      lockScroll();
      navBar.classList.add("active", "nav-open");
    } else {
      unlockScroll();
      navBar.classList.remove("nav-open");
      setTimeout(() => {
        navBar.classList.remove("active");
      }, 420); // Match your transition duration
    }
  });

  // Auto-close nav on resize to desktop
  let resizeTimeout;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const isDesktop = window.innerWidth >= 992;
      const isNavOpen = navBar.classList.contains("active");

      if (isDesktop && isNavOpen) {
        hamburgerButton.classList.remove("active");
        hamburgerButton.setAttribute("aria-expanded", "false");
        navBar.setAttribute("aria-hidden", "true");
        navBar.classList.remove("nav-open", "active");
        unlockScroll();
      }
    }, 200); // Debounce delay
  });
});
