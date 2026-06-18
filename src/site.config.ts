export const META = {
  author: 'Tomás Hein',
  website: 'https://tomashein.dev',
  social: [
    { title: 'Github', url: 'https://github.com/tomashein', icon: 'mdi:github' },
    { title: 'LinkedIn', url: 'https://linkedin.com/in/tomashein', icon: 'mdi:linkedin' },
  ],
} as const;

export const LOCALE_CONFIG = {
  en: 'English',
  es: 'Español',
} as const;

export type Locale = keyof typeof LOCALE_CONFIG;

export const LOCALE_LIST = Object.keys(LOCALE_CONFIG) as readonly Locale[];
export const LOCALE_DEFAULT = 'en' satisfies Locale;
export const LOCALE_KEY = 'locale';
export const LOCALE_BANNER_KEY = 'locale-banner-dismissed';

export const THEME_LIGHT = '#ffffff';
export const THEME_DARK = '#161819';
export const THEME_KEY = 'theme';
export const THEME_DEFAULT = 'dark';

export const MAIL_URL = import.meta.env.PUBLIC_MAIL_URL;
export const MAIL_KEY = import.meta.env.PUBLIC_MAIL_KEY;
