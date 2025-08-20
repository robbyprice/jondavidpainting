document.addEventListener("DOMContentLoaded", function () {
  const hamburgerButton = document.querySelector(".hamburger-button");
  const navBar = document.querySelector("#main-navigation");

  // Scroll lock helpers
  function lockScroll() {
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = scrollBarWidth + "px";
  }

  function unlockScroll() {
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
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
      }, 420);
    }
  });

  // Auto-close nav on resize to desktop
  let resizeTimeout;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const isDesktop = window.matchMedia("(min-width: 992px)").matches;
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

  // Prevent transition glitches on orientation change
  window.addEventListener("orientationchange", function () {
    document.body.classList.add("disable-transitions");

    setTimeout(() => {
      document.body.classList.remove("disable-transitions");
    }, 500); // Allow layout to settle before re-enabling transitions
  });
});
