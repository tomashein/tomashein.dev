import { THEME_DEFAULT } from '@config';
import { getStoredPreference, setPreference, applyTheme, watchSystemTheme } from '@helpers/theme';

function mockMatchMedia(prefersDark: boolean) {
  const listeners: Array<(e: MediaQueryListEvent) => void> = [];
  const mql = {
    matches: prefersDark,
    media: '(prefers-color-scheme: dark)',
    onchange: null,
    addEventListener: vi.fn((_: string, cb: (e: MediaQueryListEvent) => void) => {
      listeners.push(cb);
    }),
    removeEventListener: vi.fn((_: string, cb: (e: MediaQueryListEvent) => void) => {
      const i = listeners.indexOf(cb);
      if (i > -1) listeners.splice(i, 1);
    }),
    dispatchEvent: vi.fn(),
    triggerChange: (dark: boolean) => {
      mql.matches = dark;
      listeners.forEach((cb) => cb({ matches: dark } as MediaQueryListEvent));
    },
  };
  window.matchMedia = vi.fn().mockReturnValue(mql);
  return mql;
}

describe('getStoredPreference', () => {
  it('returns default theme when localStorage is empty', () => {
    expect(getStoredPreference()).toBe(THEME_DEFAULT);
  });

  it.each(['light', 'dark', 'system'] as const)('returns %s when stored in localStorage', (pref) => {
    localStorage.setItem('theme', pref);
    expect(getStoredPreference()).toBe(pref);
  });

  it('returns default theme for an invalid stored value', () => {
    localStorage.setItem('theme', 'invalid');
    expect(getStoredPreference()).toBe(THEME_DEFAULT);
  });
});

describe('setPreference', () => {
  it('saves the preference to localStorage', () => {
    setPreference('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('applies light theme to document when preference is light', () => {
    mockMatchMedia(false);
    setPreference('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('applies dark theme to document when preference is dark', () => {
    mockMatchMedia(false);
    setPreference('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('applies system theme — light when OS is light', () => {
    mockMatchMedia(false);
    setPreference('system');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('applies system theme — dark when OS is dark', () => {
    mockMatchMedia(true);
    setPreference('system');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });
});

describe('applyTheme', () => {
  it('sets data-theme attribute on documentElement', () => {
    applyTheme('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('overwrites a previous data-theme value', () => {
    applyTheme('light');
    applyTheme('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });
});

describe('watchSystemTheme', () => {
  it('calls onChange when OS switches to dark and preference is system', () => {
    localStorage.setItem('theme', 'system');
    const mql = mockMatchMedia(false);
    const onChange = vi.fn();

    watchSystemTheme(onChange);
    mql.triggerChange(true);

    expect(onChange).toHaveBeenCalledOnce();
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('does not call onChange when preference is not system', () => {
    localStorage.setItem('theme', 'light');
    const mql = mockMatchMedia(false);
    const onChange = vi.fn();

    watchSystemTheme(onChange);
    mql.triggerChange(true);

    expect(onChange).not.toHaveBeenCalled();
  });

  it('does not change data-theme when preference is not system', () => {
    localStorage.setItem('theme', 'light');
    applyTheme('light');
    const mql = mockMatchMedia(false);

    watchSystemTheme(vi.fn());
    mql.triggerChange(true);

    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });
});

describe('localStorage errors', () => {
  it('falls back to default theme when getStoredPreference fails', () => {
    vi.spyOn(window.localStorage, 'getItem').mockImplementation(() => {
      throw new Error('QuotaExceededError');
    });
    const pref = getStoredPreference();
    expect(pref).toBe(THEME_DEFAULT);
  });

  it('applies theme and continues when setPreference fails', () => {
    mockMatchMedia(false);
    vi.spyOn(window.localStorage, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError');
    });
    setPreference('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('logs warning when localStorage is unavailable', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(window.localStorage, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError');
    });
    mockMatchMedia(false);
    setPreference('dark');
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('[theme]'), expect.any(Error));
  });
});
