import { getStoredPreference, setPreference, watchSystemTheme } from '@helpers/theme';

function initThemeToggler() {
  const buttons = document.querySelectorAll<HTMLButtonElement>('[data-theme-preference]');

  if (!buttons.length) {
    console.warn('[themeToggler] no [data-theme-preference] buttons found — toggler will not initialise');
    return;
  }

  function syncState() {
    const active = getStoredPreference();
    buttons.forEach((btn) => {
      const isActive = btn.dataset.themePreference === active;
      btn.setAttribute('aria-pressed', String(isActive));
      btn.disabled = isActive;
    });
  }

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const raw = btn.dataset.themePreference;
      if (raw !== 'light' && raw !== 'dark' && raw !== 'system') return;
      setPreference(raw);
      syncState();
    });
  });

  watchSystemTheme(syncState);
  syncState();
}

initThemeToggler();
