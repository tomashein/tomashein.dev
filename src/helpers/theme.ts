// done
import { THEME_DEFAULT, THEME_KEY } from '@config';

export type ThemePreference = 'light' | 'dark' | 'system';

export type Theme = 'light' | 'dark';

export function getStoredPreference(): ThemePreference {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'system') return stored;
  } catch (e) {
    console.warn('[theme] localStorage unavailable:', e);
  }
  return THEME_DEFAULT;
}

export function setPreference(preference: ThemePreference): void {
  try {
    localStorage.setItem(THEME_KEY, preference);
  } catch (e) {
    console.warn('[theme] localStorage unavailable:', e);
  }
  applyTheme(resolveTheme(preference));
}

function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function resolveTheme(preference: ThemePreference): Theme {
  return preference === 'system' ? getSystemTheme() : preference;
}

export function applyTheme(theme: Theme): void {
  document.documentElement.setAttribute('data-theme', theme);
}

export function watchSystemTheme(onChange: () => void): void {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (getStoredPreference() === 'system') {
      applyTheme(getSystemTheme());
      onChange();
    }
  });
}
