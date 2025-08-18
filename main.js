document.addEventListener("DOMContentLoaded", function () {
  // Select elements
  const hamburgerButton = document.querySelector(".hamburger-button");
  const navBar = document.querySelector("#main-navigation");
  const logoSVG = document.querySelector(".logo svg"); // Adjust selector if needed
  const hamburgerSVG = document.querySelector(".hamburger-button svg");
  // Add click event listener
  hamburgerButton.addEventListener("click", function () {
    const isActive = this.classList.toggle("active");
    navBar.classList.toggle("active");

    // Update ARIA attributes
    this.setAttribute("aria-expanded", isActive);
    navBar.setAttribute("aria-hidden", !isActive);

    document.documentElement.classList.toggle("no-scroll", isActive);
    document.body.classList.toggle("no-scroll", isActive);

  });
});
