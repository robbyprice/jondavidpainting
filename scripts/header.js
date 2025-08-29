document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  const menuButton = document.querySelector('.menu');
  const navbar = document.querySelector('.navbar');
  const body = document.body;
  let menuOpenedByUser = false;

  // Scroll tracking variables
  let lastScrollY = window.scrollY;
  let scrollDelta = 0;
  const threshold = 96; // Minimum scroll distance before header reacts
  let lastDirection = 'up';
  let touchStartY = 0;

  // Menu toggle
  const openMenu = () => {
    menuButton.classList.add('open');
    navbar.classList.add('menu-active');
    body.classList.add('menu-open');
    menuButton.setAttribute('aria-expanded', 'true');
    menuOpenedByUser = true;
    header.classList.remove('hide'); // Keep header visible when menu is open
  };

  const closeMenu = () => {
    menuButton.classList.remove('open');
    navbar.classList.remove('menu-active');
    body.classList.remove('menu-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuOpenedByUser = false;
  };

  menuButton.addEventListener('click', () =>
    menuButton.classList.contains('open') ? closeMenu() : openMenu()
  );

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOpenedByUser) closeMenu();
  });

  // Header show/hide logic based on scroll direction
  const updateHeader = (direction) => {
    if (menuOpenedByUser) return;

    if (direction === 'down' && lastDirection !== 'down') {
      header.classList.add('hide');
      lastDirection = 'down';
    } else if (direction === 'up' && lastDirection !== 'up') {
      header.classList.remove('hide');
      lastDirection = 'up';
    }
  };

  // Scroll listener with threshold sensitivity
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const direction = currentScrollY > lastScrollY ? 'down' : 'up';
    scrollDelta += Math.abs(currentScrollY - lastScrollY);

    if (scrollDelta > threshold) {
      updateHeader(direction);
      scrollDelta = 0; // Reset after triggering
    }

    lastScrollY = currentScrollY;
  });

  // Touch support (optional, for mobile)
  window.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  });

  window.addEventListener('touchmove', (e) => {
    const touchEndY = e.touches[0].clientY;
    const direction = touchEndY < touchStartY ? 'down' : 'up';
    scrollDelta += Math.abs(touchEndY - touchStartY);

    if (scrollDelta > threshold) {
      updateHeader(direction);
      scrollDelta = 0;
    }

    touchStartY = touchEndY;
  });
});
