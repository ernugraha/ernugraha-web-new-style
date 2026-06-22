/**
 * Search Modal — full-text search with keyboard navigation
 */
(function () {
  'use strict';

  let modal, backdrop, input, results, emptyState, initialState, clearBtn, closeBtn, trigger;
  let isOpen = false;
  let focusedIndex = -1;
  let currentResults = [];
  let debounceTimer;

  // ── Simple highlight helper ──────────────────────────────────────────────
  function highlight(text, query) {
    if (!query || !text) return escapeHtml(text || '');
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`(${escaped})`, 'gi');
    return escapeHtml(text).replace(re, '<mark>$1</mark>');
  }

  function escapeHtml(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  // ── Search logic ─────────────────────────────────────────────────────────
  function search(query) {
    if (!window.searchIndex || !query.trim()) return [];

    const q = query.trim().toLowerCase();
    const terms = q.split(/\s+/);

    return window.searchIndex
      .map(item => {
        const titleLower = (item.title || '').toLowerCase();
        const contentLower = (item.content || '').toLowerCase();
        const excerptLower = (item.excerpt || '').toLowerCase();

        let score = 0;
        terms.forEach(term => {
          if (titleLower.includes(term)) score += 10;
          if (excerptLower.includes(term)) score += 5;
          if (contentLower.includes(term)) score += 2;
        });

        return { ...item, score };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);
  }

  // ── Render results ───────────────────────────────────────────────────────
  function renderResults(items, query) {
    focusedIndex = -1;
    currentResults = items;

    if (items.length === 0) {
      results.innerHTML = '';
      results.hidden = true;
      initialState.hidden = true;
      emptyState.hidden = false;
      document.getElementById('search-empty-query').textContent = query;
      return;
    }

    emptyState.hidden = true;
    initialState.hidden = true;
    results.hidden = false;

    results.innerHTML = items.map((item, i) => `
      <a href="${item.url}" class="search-result" role="option" data-index="${i}" aria-selected="false">
        <div class="search-result__icon" aria-hidden="true">
          ${item.categories ? '◈' : '◇'}
        </div>
        <div class="search-result__content">
          <div class="search-result__title">${highlight(item.title, query)}</div>
          ${item.excerpt ? `<div class="search-result__excerpt">${highlight(item.excerpt.slice(0,100), query)}</div>` : ''}
          ${item.date ? `<div class="search-result__meta">${item.date}${item.categories ? ' · ' + item.categories : ''}</div>` : ''}
        </div>
      </a>
    `).join('');
  }

  function showInitial() {
    results.innerHTML = '';
    results.hidden = true;
    emptyState.hidden = true;
    initialState.hidden = false;
  }

  // ── Keyboard navigation ──────────────────────────────────────────────────
  function moveFocus(dir) {
    const items = results.querySelectorAll('.search-result');
    if (!items.length) return;

    if (focusedIndex >= 0) items[focusedIndex].setAttribute('aria-selected', 'false');
    items[focusedIndex]?.classList.remove('is-focused');

    focusedIndex = Math.max(0, Math.min(items.length - 1, focusedIndex + dir));

    items[focusedIndex].setAttribute('aria-selected', 'true');
    items[focusedIndex].classList.add('is-focused');
    items[focusedIndex].scrollIntoView({ block: 'nearest' });
  }

  function selectFocused() {
    if (focusedIndex < 0) return;
    const items = results.querySelectorAll('.search-result');
    if (items[focusedIndex]) items[focusedIndex].click();
  }

  // ── Open / Close ─────────────────────────────────────────────────────────
  function openModal() {
    if (!modal) return;
    isOpen = true;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    if (trigger) trigger.setAttribute('aria-expanded', 'true');

    setTimeout(() => {
      input.focus();
      if (input.value) handleInput();
      else showInitial();
    }, 50);

    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    isOpen = false;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    if (trigger) {
      trigger.setAttribute('aria-expanded', 'false');
      trigger.focus();
    }
    document.body.style.overflow = '';
  }

  // ── Input handler ─────────────────────────────────────────────────────────
  function handleInput() {
    const q = input.value.trim();
    clearBtn.hidden = !q;

    clearTimeout(debounceTimer);
    if (!q) { showInitial(); return; }

    debounceTimer = setTimeout(() => {
      const found = search(q);
      renderResults(found, q);
    }, 120);
  }

  // ── Init ─────────────────────────────────────────────────────────────────
  function init() {
    modal       = document.getElementById('search-modal');
    backdrop    = document.getElementById('search-backdrop');
    input       = document.getElementById('search-input');
    results     = document.getElementById('search-results');
    emptyState  = document.getElementById('search-empty');
    initialState= document.getElementById('search-initial');
    clearBtn    = document.getElementById('search-clear');
    closeBtn    = document.getElementById('search-close');
    trigger     = document.getElementById('search-trigger');

    if (!modal || !input) return;

    // Trigger buttons
    if (trigger) trigger.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);

    // Clear input
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        input.value = '';
        clearBtn.hidden = true;
        showInitial();
        input.focus();
      });
    }

    // Input
    input.addEventListener('input', handleInput);

    // Keyboard: global shortcut ⌘K / Ctrl+K
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? closeModal() : openModal();
        return;
      }

      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          closeModal();
          break;
        case 'ArrowDown':
          e.preventDefault();
          moveFocus(1);
          break;
        case 'ArrowUp':
          e.preventDefault();
          moveFocus(-1);
          break;
        case 'Enter':
          e.preventDefault();
          selectFocused();
          break;
      }
    });

    // Close on result click
    results.addEventListener('click', () => closeModal());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
