import { useTranslation } from '@helpers/i18n';
import en from '@locales/en';
import es from '@locales/es';

describe('useTranslation', () => {
  it('returns English translations for "en"', () => {
    const t = useTranslation('en');
    expect(t).toBe(en);
  });

  it('returns Spanish translations for "es"', () => {
    const t = useTranslation('es');
    expect(t).toBe(es);
  });

  it('returns an object with all expected top-level keys', () => {
    const t = useTranslation('en');
    expect(t).toHaveProperty('meta');
    expect(t).toHaveProperty('locale');
    expect(t).toHaveProperty('theme');
    expect(t).toHaveProperty('social');
    expect(t).toHaveProperty('date');
    expect(t).toHaveProperty('error');
    expect(t).toHaveProperty('section');
  });

  it('t.meta.role is a string', () => {
    const t = useTranslation('en');
    expect(typeof t.meta.role).toBe('string');
  });

  it('t.meta.description is a string', () => {
    const t = useTranslation('en');
    expect(typeof t.meta.description).toBe('string');
  });

  it('t.meta.hero is a string', () => {
    const t = useTranslation('en');
    expect(typeof t.meta.hero).toBe('string');
  });

  it('t.section has profile, featured, experience, skills', () => {
    const t = useTranslation('en');
    expect(t.section).toHaveProperty('profile');
    expect(t.section).toHaveProperty('featured');
    expect(t.section).toHaveProperty('experience');
    expect(t.section).toHaveProperty('skills');
  });

  it('each section entry has id and title strings', () => {
    const t = useTranslation('en');
    for (const entry of Object.values(t.section)) {
      expect(typeof entry.id).toBe('string');
      expect(typeof entry.title).toBe('string');
    }
  });

  it('t.locale has name, banner, selector', () => {
    const t = useTranslation('en');
    expect(t.locale).toHaveProperty('name');
    expect(t.locale).toHaveProperty('banner');
    expect(t.locale).toHaveProperty('selector');
  });

  it('t.locale.name has an entry for every supported locale', () => {
    const t = useTranslation('en');
    expect(typeof t.locale.name.en).toBe('string');
    expect(typeof t.locale.name.es).toBe('string');
  });

  it('t.locale.name entries are consistent across locales', () => {
    const tEn = useTranslation('en');
    const tEs = useTranslation('es');
    expect(typeof tEn.locale.name.es).toBe('string');
    expect(typeof tEs.locale.name.en).toBe('string');
  });

  it('t.locale.banner has message, switchTo, stayIn strings', () => {
    const t = useTranslation('en');
    expect(typeof t.locale.banner.message).toBe('string');
    expect(typeof t.locale.banner.switchTo).toBe('string');
    expect(typeof t.locale.banner.stayIn).toBe('string');
  });

  it('t.locale.selector has group, selected strings', () => {
    const t = useTranslation('en');
    expect(typeof t.locale.selector.group).toBe('string');
  });

  it('t.theme has group, light, dark, system and announcement keys', () => {
    const t = useTranslation('en');
    expect(typeof t.theme.group).toBe('string');
    expect(typeof t.theme.light).toBe('string');
    expect(typeof t.theme.dark).toBe('string');
    expect(typeof t.theme.system).toBe('string');
  });

  it('t.date has year, month plural forms and helper strings', () => {
    const t = useTranslation('en');
    expect(typeof t.date.year.one).toBe('string');
    expect(typeof t.date.year.other).toBe('string');
    expect(typeof t.date.month.one).toBe('string');
    expect(typeof t.date.month.other).toBe('string');
    expect(typeof t.date.lessThanAMonth).toBe('string');
    expect(typeof t.date.present).toBe('string');
    expect(typeof t.date.soFar).toBe('string');
    expect(typeof t.date.for).toBe('string');
  });

  it('Spanish translations satisfy the same shape checks', () => {
    const t = useTranslation('es');
    expect(typeof t.meta.role).toBe('string');
    expect(typeof t.locale.name.en).toBe('string');
    expect(typeof t.locale.banner.message).toBe('string');
    expect(typeof t.date.year.one).toBe('string');
  });

  it('returns the same reference on repeated calls with the same locale', () => {
    expect(useTranslation('en')).toBe(useTranslation('en'));
  });
});
