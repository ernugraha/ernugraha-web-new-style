/**
 * Theme Manager — Light / Dark mode with persistence
 */
(function () {
  'use strict';

  const STORAGE_KEY = 'site-theme';
  const THEMES = ['light', 'dark'];

  // ── Detect preferred theme ──────────────────────────────────────────────
  function getPreferredTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && THEMES.includes(saved)) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  // ── Apply theme ──────────────────────────────────────────────────────────
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    updateToggleLabel(theme);
  }

  function updateToggleLabel(theme) {
    const footerLabel = document.getElementById('footer-theme-label');
    if (footerLabel) {
      footerLabel.textContent = theme === 'dark' ? 'Mode Terang' : 'Mode Gelap';
    }
    // aria labels
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      toggleBtn.setAttribute('aria-label',
        theme === 'dark' ? 'Beralih ke mode terang' : 'Beralih ke mode gelap');
    }
  }

  // ── Toggle ───────────────────────────────────────────────────────────────
  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  }

  // ── Init ─────────────────────────────────────────────────────────────────
  function init() {
    // Apply before first paint (already done inline, but also here for safety)
    applyTheme(getPreferredTheme());

    // Navbar toggle
    const navToggle = document.getElementById('theme-toggle');
    if (navToggle) navToggle.addEventListener('click', toggleTheme);

    // Footer toggle
    const footerToggle = document.getElementById('footer-theme-toggle');
    if (footerToggle) footerToggle.addEventListener('click', toggleTheme);

    // System preference change listener
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      // Only follow system if user hasn't manually set a preference
      if (!localStorage.getItem(STORAGE_KEY)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  // Run immediately to prevent flash
  (function preventFlash() {
    const saved = localStorage.getItem(STORAGE_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = (saved && THEMES.includes(saved)) ? saved : (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  })();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
