document.addEventListener("DOMContentLoaded", function () {
  // Select elements
  const hamburgerButton = document.querySelector(".hamburger-button");
  const navBar = document.querySelector("#main-navigation");
  const logoSVG = document.querySelector(".logo svg");
  const hamburgerSVG = document.querySelector(".hamburger-button svg");

  hamburgerButton.addEventListener("click", function () {
    const isOpening = !navBar.classList.contains("active");

    // Toggle hamburger button state
    this.classList.toggle("active", isOpening);

    // Update ARIA attributes
    this.setAttribute("aria-expanded", isOpening);
    navBar.setAttribute("aria-hidden", !isOpening);

    // Lock scroll on mobile
    document.documentElement.classList.toggle("no-scroll", isOpening);
    document.body.classList.toggle("no-scroll", isOpening);

    if (isOpening) {
      // Opening: show nav and animate in
      navBar.classList.add("active");
      navBar.classList.add("nav-open");
    } else {
      // Closing: animate out, then hide nav
      navBar.classList.remove("nav-open");

      setTimeout(() => {
        navBar.classList.remove("active");
      }, 500); // Match fade-out + slide-up duration
    }
  });
});
