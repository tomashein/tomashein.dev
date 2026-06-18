import { LOCALE_BANNER_KEY } from '@config';
import { isBannerDismissed, dismissBanner, getBannerSuggestion } from '@helpers/localeBanner';
import { saveLocale } from '@helpers/locale';
import { setPathname, setNavigatorLanguages } from './helpers';

describe('isBannerDismissed', () => {
  it('returns false when not dismissed', () => {
    expect(isBannerDismissed()).toBe(false);
  });

  it('returns true after dismissBanner is called', () => {
    dismissBanner();
    expect(isBannerDismissed()).toBe(true);
  });
});

describe('dismissBanner', () => {
  it('sets dismissal flag in localStorage', () => {
    dismissBanner();
    expect(localStorage.getItem(LOCALE_BANNER_KEY)).toBe('true');
  });

  it('is idempotent — calling twice leaves isBannerDismissed true', () => {
    dismissBanner();
    dismissBanner();
    expect(isBannerDismissed()).toBe(true);
  });
});

describe('getBannerSuggestion', () => {
  it('returns null when banner is dismissed', () => {
    dismissBanner();
    setPathname('/');
    expect(getBannerSuggestion()).toBeNull();
  });

  it('returns null when stored locale matches current page', () => {
    saveLocale('en');
    setPathname('/');
    expect(getBannerSuggestion()).toBeNull();
  });

  it('returns the stored locale when it differs from current page', () => {
    saveLocale('es');
    setPathname('/');
    expect(getBannerSuggestion()).toBe('es');
  });

  it('returns system locale suggestion when no stored locale', () => {
    setPathname('/');
    setNavigatorLanguages(['es-MX', 'es']);
    expect(getBannerSuggestion()).toBe('es');
  });

  it('returns null when system locale matches current page', () => {
    setPathname('/');
    setNavigatorLanguages(['en-US', 'en']);
    expect(getBannerSuggestion()).toBeNull();
  });

  it('returns null when system locale is not a supported locale', () => {
    setPathname('/');
    setNavigatorLanguages(['fr-FR', 'fr']);
    expect(getBannerSuggestion()).toBeNull();
  });

  it('returns null when system locale is not supported, on non-default page', () => {
    setPathname('/es/');
    setNavigatorLanguages(['fr-FR', 'fr']);
    expect(getBannerSuggestion()).toBeNull();
  });

  it('returns null when on es page and stored locale is es', () => {
    saveLocale('es');
    setPathname('/es/');
    expect(getBannerSuggestion()).toBeNull();
  });

  it('returns en suggestion when on es page and stored locale is en', () => {
    saveLocale('en');
    setPathname('/es/');
    expect(getBannerSuggestion()).toBe('en');
  });

  it('stored locale takes priority over system locale', () => {
    saveLocale('es');
    setNavigatorLanguages(['en-US', 'en']);
    setPathname('/');
    expect(getBannerSuggestion()).toBe('es');
  });

  it('no banner when stored locale matches page, even if system locale differs', () => {
    saveLocale('en');
    setNavigatorLanguages(['es-MX', 'es']);
    setPathname('/');
    expect(getBannerSuggestion()).toBeNull();
  });

  it('returns null when navigator.languages is empty', () => {
    setPathname('/');
    setNavigatorLanguages([]);
    expect(getBannerSuggestion()).toBeNull();
  });

  it('resolves suggestion correctly from a mixed-case pathname segment', () => {
    setPathname('/ES/');
    setNavigatorLanguages(['en-US', 'en']);
    expect(getBannerSuggestion()).toBe('en');
  });
});

describe('localStorage errors', () => {
  it('isBannerDismissed returns false when localStorage throws', () => {
    vi.spyOn(window.localStorage, 'getItem').mockImplementation(() => {
      throw new Error('QuotaExceededError');
    });
    expect(isBannerDismissed()).toBe(false);
  });

  it('isBannerDismissed logs warning when localStorage throws', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(window.localStorage, 'getItem').mockImplementation(() => {
      throw new Error('QuotaExceededError');
    });
    isBannerDismissed();
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('[locale-banner]'), expect.any(Error));
  });

  it('dismissBanner continues silently when localStorage throws', () => {
    vi.spyOn(window.localStorage, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError');
    });
    expect(() => dismissBanner()).not.toThrow();
  });

  it('dismissBanner logs warning when localStorage throws', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(window.localStorage, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError');
    });
    dismissBanner();
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('[locale-banner]'), expect.any(Error));
  });

  it('getBannerSuggestion does not throw and returns suggestion when localStorage.getItem throws', () => {
    vi.spyOn(window.localStorage, 'getItem').mockImplementation(() => {
      throw new Error('QuotaExceededError');
    });
    setPathname('/');
    setNavigatorLanguages(['es-MX', 'es']);
    expect(getBannerSuggestion()).toBe('es');
  });
});
