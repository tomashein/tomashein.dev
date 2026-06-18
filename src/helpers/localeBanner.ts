import { type Locale, LOCALE_BANNER_KEY } from '@config';
import { getStoredLocale, getCurrentLocale, getSystemLocale } from '@helpers/locale';

export function isBannerDismissed(): boolean {
  try {
    return localStorage.getItem(LOCALE_BANNER_KEY) === 'true';
  } catch (e) {
    console.warn('[locale-banner] localStorage unavailable:', e);
    return false;
  }
}

export function dismissBanner(): void {
  try {
    localStorage.setItem(LOCALE_BANNER_KEY, 'true');
  } catch (e) {
    console.warn('[locale-banner] localStorage unavailable:', e);
  }
}

export function getBannerSuggestion(): Locale | null {
  if (isBannerDismissed()) return null;
  const current = getCurrentLocale();
  const preferred = getStoredLocale() ?? getSystemLocale();
  if (!preferred) return null;
  return preferred !== current ? preferred : null;
}
