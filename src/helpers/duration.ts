import type { Translation } from '@locales/en';

type StartDateInput = Date | string;

type EndDateInput = Date | string | 'PRESENT';

export interface ExperienceDuration {
  startYear: string;
  endYear: string;
  startISO: string;
  endISO: string;
  parts: string[];
  ariaLabel: string;
}

function toYearMonth(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function parseDateSafe(input: Date | string): Date {
  if (input instanceof Date) return input;
  const parts = input.split('-').map(Number);
  return new Date(parts[0], parts[1] !== undefined ? parts[1] - 1 : 0, parts[2] ?? 1);
}

function resolveUnit(count: number, unit: 'year' | 'month', locale: string, t: Translation): string {
  const rule = new Intl.PluralRules(locale).select(count);
  const label =
    unit === 'year' ?
      rule === 'one' ?
        t.date.year.one
      : t.date.year.other
    : rule === 'one' ? t.date.month.one
    : t.date.month.other;
  return `${count} ${label}`;
}

export function getExperienceDuration(
  startDate: StartDateInput,
  endDate: EndDateInput = 'PRESENT',
  locale: string,
  t: Translation,
): ExperienceDuration {
  const isPresent = endDate === 'PRESENT';

  if (typeof startDate === 'string' && startDate.split('-').length < 2) {
    throw new Error(`[getExperienceDuration] Invalid startDate: "${startDate}" (use ISO format: YYYY-MM-DD)`);
  }
  if (!isPresent && typeof endDate === 'string' && endDate.split('-').length < 2) {
    throw new Error(`[getExperienceDuration] Invalid endDate: "${endDate}" (use ISO format: YYYY-MM-DD, or 'PRESENT')`);
  }

  const start = parseDateSafe(startDate);
  const end = isPresent ? new Date() : parseDateSafe(endDate);

  if (isNaN(start.getTime())) {
    throw new Error(`[getExperienceDuration] Invalid startDate: "${startDate}" (use ISO format: YYYY-MM-DD)`);
  }
  if (!isPresent && isNaN(end.getTime())) {
    throw new Error(`[getExperienceDuration] Invalid endDate: "${endDate}" (use ISO format: YYYY-MM-DD, or 'PRESENT')`);
  }

  const rawMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());

  if (rawMonths < 0) {
    console.warn(
      `[getExperienceDuration] end date (${toYearMonth(end)}) is before start date (${toYearMonth(start)}) — returning degenerate result`,
    );
    return {
      startYear: start.getFullYear().toString(),
      endYear: isPresent ? t.date.present : end.getFullYear().toString(),
      startISO: toYearMonth(start),
      endISO: isPresent ? '' : toYearMonth(end),
      parts: [t.date.lessThanAMonth],
      ariaLabel: `${t.date.for} ${t.date.lessThanAMonth}`,
    };
  }

  const totalMonths = rawMonths;

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  const parts: string[] = [];

  if (rawMonths === 0) {
    parts.push(t.date.lessThanAMonth);
  } else {
    if (years > 0) parts.push(resolveUnit(years, 'year', locale, t));
    if (months > 0) parts.push(resolveUnit(months, 'month', locale, t));
  }

  const suffix = isPresent ? ` ${t.date.soFar}` : '';

  const lf = new Intl.ListFormat(locale, { style: 'long', type: 'conjunction' });

  return {
    startYear: start.getFullYear().toString(),
    endYear: isPresent ? t.date.present : end.getFullYear().toString(),
    startISO: toYearMonth(start),
    endISO: isPresent ? '' : toYearMonth(end),
    parts,
    ariaLabel: `${t.date.for} ${lf.format(parts)}${suffix}`,
  };
}
