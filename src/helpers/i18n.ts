// done
import type { Locale } from '@config';
import en, { type Translation } from '@locales/en';
import es from '@locales/es';

const locales: Record<Locale, Translation> = { en, es };

export function useTranslation(locale: Locale): Translation {
  return locales[locale];
}
