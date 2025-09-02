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

  // Prevent scroll when menu is open
  const preventScroll = (e) => {
    if (body.classList.contains('menu-open')) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  // Menu toggle
  const openMenu = () => {
    menuButton.classList.add('open');
    navbar.classList.add('menu-active');
    body.classList.add('menu-open');
    // Add event listeners to prevent scrolling
    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });
    menuButton.setAttribute('aria-expanded', 'true');
    menuOpenedByUser = true;
    header.classList.remove('hide'); // Keep header visible when menu is open
  };

  const closeMenu = () => {
    menuButton.classList.remove('open');
    navbar.classList.remove('menu-active');
    body.classList.remove('menu-open');
    // Remove scroll prevention listeners
    window.removeEventListener('wheel', preventScroll);
    window.removeEventListener('touchmove', preventScroll);
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
    if (body.classList.contains('menu-open')) return; // Skip scroll updates when menu is open
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
    if (body.classList.contains('menu-open')) return; // Skip touch updates when menu is open
    touchStartY = e.touches[0].clientY;
  });

  window.addEventListener('touchmove', (e) => {
    if (body.classList.contains('menu-open')) return; // Skip touch updates when menu is open
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