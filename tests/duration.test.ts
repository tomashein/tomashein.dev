import { getExperienceDuration } from '@helpers/duration';
import en from '@locales/en';
import es from '@locales/es';

const END = '2024-06-01';
const START_2Y = '2022-06-01';
const START_2Y3M = '2022-03-01';
const START_SAME = '2024-06-15';
const START_1M = '2024-05-01';

describe('startYear / endYear', () => {
  it('returns correct startYear and endYear for a completed role', () => {
    const d = getExperienceDuration(START_2Y, END, 'en', en);
    expect(d.startYear).toBe('2022');
    expect(d.endYear).toBe('2024');
  });

  it('returns t.date.present as endYear for an ongoing role', () => {
    const d = getExperienceDuration(START_2Y, 'PRESENT', 'en', en);
    expect(d.endYear).toBe(en.date.present);
  });

  it('returns translated present for Spanish', () => {
    const d = getExperienceDuration(START_2Y, 'PRESENT', 'es', es);
    expect(d.endYear).toBe(es.date.present);
  });
});

describe('startISO / endISO', () => {
  it('returns YYYY-MM format for startISO', () => {
    const d = getExperienceDuration(START_2Y, END, 'en', en);
    expect(d.startISO).toMatch(/^\d{4}-\d{2}$/);
    expect(d.startISO).toBe('2022-06');
  });

  it('returns YYYY-MM format for endISO on completed role', () => {
    const d = getExperienceDuration(START_2Y, END, 'en', en);
    expect(d.endISO).toBe('2024-06');
  });

  it('returns empty string for endISO on ongoing role', () => {
    const d = getExperienceDuration(START_2Y, 'PRESENT', 'en', en);
    expect(d.endISO).toBe('');
  });
});

describe('parts', () => {
  it('returns ["2 years"] for exactly 2 years', () => {
    const d = getExperienceDuration(START_2Y, END, 'en', en);
    expect(d.parts).toEqual(['2 years']);
  });

  it('returns ["2 years", "3 months"] for 2 years 3 months', () => {
    const d = getExperienceDuration(START_2Y3M, END, 'en', en);
    expect(d.parts).toEqual(['2 years', '3 months']);
  });

  it('returns ["1 month"] for exactly 1 month', () => {
    const d = getExperienceDuration(START_1M, END, 'en', en);
    expect(d.parts).toEqual(['1 month']);
  });

  it('returns lessThanAMonth for same-month start and end', () => {
    const d = getExperienceDuration(START_SAME, END, 'en', en);
    expect(d.parts).toEqual([en.date.lessThanAMonth]);
  });

  it('uses singular "año" for 1 year in Spanish', () => {
    const d = getExperienceDuration('2023-06-01', END, 'es', es);
    expect(d.parts).toContain('1 año');
  });

  it('uses plural "años" for 2 years in Spanish', () => {
    const d = getExperienceDuration(START_2Y, END, 'es', es);
    expect(d.parts).toContain('2 años');
  });

  it('uses singular "mes" for 1 month in Spanish', () => {
    const d = getExperienceDuration(START_1M, END, 'es', es);
    expect(d.parts).toContain('1 mes');
  });

  it('uses plural "meses" for 3 months in Spanish', () => {
    const d = getExperienceDuration('2024-03-01', END, 'es', es);
    expect(d.parts).toContain('3 meses');
  });

  it('does not include months when months is 0', () => {
    const d = getExperienceDuration(START_2Y, END, 'en', en);
    expect(d.parts).toHaveLength(1);
    expect(d.parts[0]).toContain('year');
  });

  it('parts is always a non-empty array', () => {
    const d = getExperienceDuration(START_2Y3M, END, 'en', en);
    expect(d.parts.length).toBeGreaterThan(0);
  });
});

describe('ariaLabel', () => {
  it('contains "for" prefix for English', () => {
    const d = getExperienceDuration(START_2Y, END, 'en', en);
    expect(d.ariaLabel).toMatch(/^for /);
  });

  it('contains "durante" prefix for Spanish', () => {
    const d = getExperienceDuration(START_2Y, END, 'es', es);
    expect(d.ariaLabel).toMatch(/^durante /);
  });

  it('contains soFar suffix for ongoing role in English', () => {
    const d = getExperienceDuration(START_2Y, 'PRESENT', 'en', en);
    expect(d.ariaLabel).toContain(en.date.soFar);
  });

  it('does not contain soFar suffix for completed role', () => {
    const d = getExperienceDuration(START_2Y, END, 'en', en);
    expect(d.ariaLabel).not.toContain(en.date.soFar);
  });

  it('is a non-empty string', () => {
    const d = getExperienceDuration(START_SAME, END, 'en', en);
    expect(d.ariaLabel.length).toBeGreaterThan(0);
  });
});

describe('edge cases', () => {
  it('handles Date objects as input', () => {
    const d = getExperienceDuration(new Date('2022-06-01'), new Date('2024-06-01'), 'en', en);
    expect(d.startYear).toBe('2022');
    expect(d.endYear).toBe('2024');
  });

  it('returns a degenerate result and warns when end is before start', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const d = getExperienceDuration('2024-06-01', '2022-06-01', 'en', en);
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('[getExperienceDuration]'));
    expect(d.parts).toEqual([en.date.lessThanAMonth]);
    expect(d.startISO).toBe('2024-06');
    expect(d.endISO).toBe('2022-06');
  });

  it('omits soFar suffix in degenerate result even when endDate is PRESENT', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const d = getExperienceDuration('2099-01-01', 'PRESENT', 'en', en);
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('[getExperienceDuration]'));
    expect(d.ariaLabel).toBe(`${en.date.for} ${en.date.lessThanAMonth}`);
    expect(d.ariaLabel).not.toContain(en.date.soFar);
  });
});

describe('validation', () => {
  it('throws for invalid startDate', () => {
    expect(() => {
      getExperienceDuration('not-a-date', END, 'en', en);
    }).toThrow(/Invalid startDate/);
  });

  it('throws for invalid endDate', () => {
    expect(() => {
      getExperienceDuration(START_2Y, 'not-a-date', 'en', en);
    }).toThrow(/Invalid endDate/);
  });

  it('does not throw for PRESENT as endDate', () => {
    const d = getExperienceDuration(START_2Y, 'PRESENT', 'en', en);
    expect(d.endYear).toBe(en.date.present);
  });
});
