// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import icon from 'astro-icon';
import { browserslistToTargets } from 'lightningcss';
import browserslist from 'browserslist';
import { LOCALE_DEFAULT, LOCALE_LIST, META } from './src/site.config';

export default defineConfig({
  site: META.website,
  output: 'static',
  trailingSlash: 'always',
  integrations: [icon()],
  i18n: {
    locales: [...LOCALE_LIST],
    defaultLocale: LOCALE_DEFAULT,
    routing: {
      prefixDefaultLocale: false,
    },
  },
  fonts: [
    {
      name: 'Google Sans Flex',
      cssVariable: '--font-sans',
      provider: fontProviders.google(),
      styles: ['normal', 'italic'],
      weights: ['300 700'],
      subsets: ['latin'],
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
    },
  ],
  vite: {
    build: {
      cssMinify: 'lightningcss',
    },
    css: {
      devSourcemap: true,
      transformer: 'lightningcss',
      lightningcss: {
        targets: browserslistToTargets(browserslist()),
      },
    },
  },
  devToolbar: {
    enabled: false,
  },
});
