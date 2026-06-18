import { LOCALE_KEY } from '@config';
import { isValidLocale, getStoredLocale, saveLocale, getCurrentLocale, getSystemLocale } from '@helpers/locale';
import { setPathname, setNavigatorLanguages } from './helpers';

describe('isValidLocale', () => {
  it('returns true for valid locales', () => {
    expect(isValidLocale('en')).toBe(true);
    expect(isValidLocale('es')).toBe(true);
  });

  it('returns false for invalid values', () => {
    expect(isValidLocale('fr')).toBe(false);
    expect(isValidLocale('')).toBe(false);
    expect(isValidLocale(null)).toBe(false);
    expect(isValidLocale(undefined)).toBe(false);
    expect(isValidLocale(42)).toBe(false);
  });

  it('returns false for valid locale in wrong case', () => {
    expect(isValidLocale('EN')).toBe(false);
    expect(isValidLocale('Es')).toBe(false);
  });
});

describe('getStoredLocale', () => {
  it('returns null when localStorage is empty', () => {
    expect(getStoredLocale()).toBeNull();
  });

  it('returns the stored locale when valid — es', () => {
    saveLocale('es');
    expect(getStoredLocale()).toBe('es');
  });

  it('returns the stored locale when valid — en', () => {
    saveLocale('en');
    expect(getStoredLocale()).toBe('en');
  });

  it('returns null when stored value is invalid', () => {
    localStorage.setItem(LOCALE_KEY, 'fr');
    expect(getStoredLocale()).toBeNull();
  });
});

describe('saveLocale', () => {
  it('persists es to localStorage', () => {
    saveLocale('es');
    expect(localStorage.getItem(LOCALE_KEY)).toBe('es');
  });

  it('persists en to localStorage', () => {
    saveLocale('en');
    expect(localStorage.getItem(LOCALE_KEY)).toBe('en');
  });
});

describe('localStorage errors', () => {
  it('getStoredLocale returns null when localStorage throws', () => {
    vi.spyOn(window.localStorage, 'getItem').mockImplementation(() => {
      throw new Error('QuotaExceededError');
    });
    expect(getStoredLocale()).toBeNull();
  });

  it('getStoredLocale logs warning when localStorage throws', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(window.localStorage, 'getItem').mockImplementation(() => {
      throw new Error('QuotaExceededError');
    });
    getStoredLocale();
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('[locale]'), expect.any(Error));
  });

  it('saveLocale continues silently when localStorage throws', () => {
    vi.spyOn(window.localStorage, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError');
    });
    expect(() => saveLocale('es')).not.toThrow();
  });

  it('saveLocale logs warning when localStorage throws', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(window.localStorage, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError');
    });
    saveLocale('es');
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('[locale]'), expect.any(Error));
  });
});

describe('getCurrentLocale', () => {
  it('returns default locale for root path', () => {
    setPathname('/');
    expect(getCurrentLocale()).toBe('en');
  });

  it('returns the locale from a prefixed path', () => {
    setPathname('/es/');
    expect(getCurrentLocale()).toBe('es');
  });

  it('returns default locale when segment is not a known locale', () => {
    setPathname('/fr/');
    expect(getCurrentLocale()).toBe('en');
  });

  it('normalises a mixed-case segment to a valid locale', () => {
    setPathname('/ES/');
    expect(getCurrentLocale()).toBe('es');
  });

  it('returns default locale for an empty pathname', () => {
    setPathname('');
    expect(getCurrentLocale()).toBe('en');
  });
});

describe('getSystemLocale', () => {
  it('returns a supported locale from navigator.languages', () => {
    setNavigatorLanguages(['es-MX', 'es']);
    expect(getSystemLocale()).toBe('es');
  });

  it('returns the first supported locale when multiple are present', () => {
    setNavigatorLanguages(['en-US', 'en', 'es']);
    expect(getSystemLocale()).toBe('en');
  });

  it('returns null when no supported locale is found', () => {
    setNavigatorLanguages(['fr-FR', 'fr']);
    expect(getSystemLocale()).toBeNull();
  });

  it('returns null when navigator.languages is empty', () => {
    setNavigatorLanguages([]);
    expect(getSystemLocale()).toBeNull();
  });

  it('matches a full BCP 47 tag by its base language only', () => {
    setNavigatorLanguages(['es-419']);
    expect(getSystemLocale()).toBe('es');
  });
});
