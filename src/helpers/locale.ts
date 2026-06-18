import { type Locale, LOCALE_LIST, LOCALE_DEFAULT, LOCALE_KEY } from '@config';

export function isValidLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALE_LIST as readonly string[]).includes(value);
}

export function getStoredLocale(): Locale | null {
  try {
    const stored = localStorage.getItem(LOCALE_KEY);
    return isValidLocale(stored) ? stored : null;
  } catch (e) {
    console.warn('[locale] localStorage unavailable:', e);
    return null;
  }
}

export function saveLocale(locale: Locale): void {
  try {
    localStorage.setItem(LOCALE_KEY, locale);
  } catch (e) {
    console.warn('[locale] localStorage unavailable:', e);
  }
}

export function getCurrentLocale(): Locale {
  const segments = window.location.pathname.split('/').filter(Boolean);
  const first = segments[0]?.toLowerCase();
  return isValidLocale(first) ? first : LOCALE_DEFAULT;
}

export function getSystemLocale(): Locale | null {
  for (const lang of navigator.languages) {
    const base = lang.split('-')[0].toLowerCase();
    if (isValidLocale(base)) return base;
  }
  return null;
}
