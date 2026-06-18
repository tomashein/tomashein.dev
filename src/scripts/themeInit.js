(() => {
  // Must match keys in site.config.ts — cannot import at runtime
  const THEME_KEY = 'theme';
  const THEME_DEFAULT = 'dark';

  const getStoredPreference = () => {
    try {
      const stored = localStorage.getItem(THEME_KEY);
      if (stored === 'light' || stored === 'dark' || stored === 'system') return stored;
    } catch {
      // localStorage unavailable — falls back to 'system'
    }
    return THEME_DEFAULT;
  };

  const getSystemTheme = () => (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  const resolveTheme = (pref) => (pref === 'system' ? getSystemTheme() : pref);

  const applyTheme = (theme) => document.documentElement.setAttribute('data-theme', theme);

  const preference = getStoredPreference();

  applyTheme(resolveTheme(preference));

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('button[data-theme-preference]').forEach((button) => {
      const isActive = button.getAttribute('data-theme-preference') === preference;
      button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      button.toggleAttribute('disabled', isActive);
    });
  });
})();
