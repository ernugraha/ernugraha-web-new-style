/**
 * Navbar — scroll blur/animation + mobile menu
 */
(function () {
  'use strict';

  const SCROLL_THRESHOLD = 20; // px before blur kicks in

  let navbar, burger, mobileMenu;
  let isScrolled = false;
  let isMobileOpen = false;
  let ticking = false;

  // ── Scroll handler (throttled via rAF) ──────────────────────────────────
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  }

  function updateNavbar() {
    const scrollY = window.scrollY || window.pageYOffset;
    const shouldBlur = scrollY > SCROLL_THRESHOLD;

    if (shouldBlur !== isScrolled) {
      isScrolled = shouldBlur;
      navbar.classList.toggle('is-scrolled', isScrolled);
    }

    ticking = false;
  }

  // ── Mobile menu ──────────────────────────────────────────────────────────
  function toggleMobileMenu() {
    isMobileOpen = !isMobileOpen;
    burger.classList.toggle('is-active', isMobileOpen);
    mobileMenu.classList.toggle('is-open', isMobileOpen);
    burger.setAttribute('aria-expanded', isMobileOpen.toString());
    mobileMenu.setAttribute('aria-hidden', (!isMobileOpen).toString());

    // Trap focus when open
    if (isMobileOpen) {
      document.addEventListener('keydown', handleMobileEsc);
    } else {
      document.removeEventListener('keydown', handleMobileEsc);
    }
  }

  function closeMobileMenu() {
    if (!isMobileOpen) return;
    isMobileOpen = false;
    burger.classList.remove('is-active');
    mobileMenu.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.removeEventListener('keydown', handleMobileEsc);
  }

  function handleMobileEsc(e) {
    if (e.key === 'Escape') {
      closeMobileMenu();
      burger.focus();
    }
  }

  // ── Init ─────────────────────────────────────────────────────────────────
  function init() {
    navbar = document.getElementById('navbar');
    burger = document.getElementById('navbar-burger');
    mobileMenu = document.getElementById('navbar-mobile');

    if (!navbar) return;

    // Scroll listener
    window.addEventListener('scroll', onScroll, { passive: true });
    updateNavbar(); // run once on load

    // Mobile menu
    if (burger && mobileMenu) {
      burger.addEventListener('click', toggleMobileMenu);

      // Close mobile menu on link click
      mobileMenu.querySelectorAll('.navbar__mobile-link').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
      });

      // Close when clicking outside
      document.addEventListener('click', (e) => {
        if (isMobileOpen && !navbar.contains(e.target)) {
          closeMobileMenu();
        }
      });
    }

    // Close mobile menu on resize to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && isMobileOpen) {
        closeMobileMenu();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
