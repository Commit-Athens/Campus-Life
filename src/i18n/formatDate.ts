import { activeDateLocale } from './el'

/** Parses "2027-01-18" as a local date (no timezone shift). */
export function parseDate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

/** "18 Jan" or "18 Ιαν", following the active language. */
export function formatDayMonth(iso: string): string {
  return new Intl.DateTimeFormat(activeDateLocale(), { day: 'numeric', month: 'short' }).format(parseDate(iso))
}

/** "Mon" or "Δευ", following the active language. */
export function formatWeekday(iso: string): string {
  return new Intl.DateTimeFormat(activeDateLocale(), { weekday: 'short' }).format(parseDate(iso))
}

/** Whole days from today (local midnight) until the ISO date; negative if past. */
export function daysUntil(iso: string, now: Date = new Date()): number {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  return Math.round((parseDate(iso).getTime() - today.getTime()) / 86_400_000)
}
