import type { Locale } from '@config';
import { getCurrentLocale, saveLocale } from '@helpers/locale';
import { getBannerSuggestion, dismissBanner } from '@helpers/localeBanner';

export interface BannerTranslation {
  message: string;
  switchTo: string;
  stayIn: string;
  localeNames: Record<Locale, string>;
}

function initLocaleBanner() {
  const script = document.querySelector<HTMLScriptElement>('[data-locale-translations]');

  if (!script) {
    console.error('[localeBanner] data-locale-translations script not found — locale banner will not initialise');
    return;
  }

  const translations: Record<Locale, BannerTranslation> = JSON.parse(script.text);

  script.remove();

  const banner = document.querySelector<HTMLElement>('[data-locale-banner]');

  if (!banner) {
    console.error('[localeBanner] data-locale-banner element not found — banner cannot be shown');
    return;
  }

  const suggested = getBannerSuggestion();

  if (!suggested) {
    banner.remove();
    return;
  }

  console.log(suggested);

  const content = translations[suggested];

  if (!content) {
    console.error(`[localeBanner] no translations found for suggested locale: "${suggested}"`);
    banner.remove();
    return;
  }

  const currentLocale = getCurrentLocale();
  const currentLocaleName = content.localeNames[currentLocale];
  const suggestedLocaleName = content.localeNames[suggested];
  if (!currentLocaleName || !suggestedLocaleName) {
    console.error(
      `[localeBanner] missing localeNames entry — currentLocale: "${currentLocale}", suggested: "${suggested}"`,
    );
    banner.remove();
    return;
  }

  const messageEl = banner.querySelector<HTMLElement>('p');
  if (!messageEl) {
    console.error('[localeBanner] paragraph element not found — banner cannot be shown');
    return;
  }
  messageEl.textContent = `${content.message} ${suggestedLocaleName}`;

  const switchLink = banner.querySelector<HTMLAnchorElement>(`a[data-locale="${suggested}"]`);
  if (!switchLink) {
    console.error(`[localeBanner] anchor with [data-locale="${suggested}"] not found — banner cannot be shown`);
    return;
  }
  switchLink.textContent = `${content.switchTo} ${suggestedLocaleName}`;
  switchLink.removeAttribute('hidden');

  const stayBtn = banner.querySelector<HTMLButtonElement>('button');
  if (!stayBtn) {
    console.error('[localeBanner] button not found — banner cannot be shown');
    return;
  }
  stayBtn.textContent = `${content.stayIn} ${currentLocaleName}`;

  banner.setAttribute('data-visible', 'true');

  switchLink.addEventListener('click', () => {
    saveLocale(suggested);
  });

  stayBtn.addEventListener('click', () => {
    dismissBanner();
    banner.remove();
  });
}

initLocaleBanner();
