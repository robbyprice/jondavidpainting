document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  const menuButton = document.querySelector('.menu');
  const navbar = document.querySelector('.navbar');
  const body = document.body;
  let menuOpenedByUser = false;
  let lastScrollY = window.scrollY;
  let touchStartY = 0;
  let lastDirection = 'up';

  // Menu toggle
  const openMenu = () => {
    menuButton.classList.add('open');
    navbar.classList.add('menu-active');
    body.classList.add('menu-open');
    menuButton.setAttribute('aria-expanded', 'true');
    menuOpenedByUser = true;
    header.classList.remove('hide'); // Keep header visible
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

  // Scroll direction logic
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

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const direction = currentScrollY > lastScrollY ? 'down' : 'up';
    updateHeader(direction);
    lastScrollY = currentScrollY;
  });

  window.addEventListener('wheel', (e) => {
    const direction = e.deltaY > 0 ? 'down' : 'up';
    updateHeader(direction);
  });

  window.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  });

  window.addEventListener('touchmove', (e) => {
    const touchEndY = e.touches[0].clientY;
    const direction = touchEndY < touchStartY ? 'down' : 'up';
    updateHeader(direction);
    touchStartY = touchEndY;
  });
});