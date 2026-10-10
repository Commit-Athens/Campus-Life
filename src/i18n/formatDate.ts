const dayMonth = new Intl.DateTimeFormat('el-GR', { day: 'numeric', month: 'short' })
const weekday = new Intl.DateTimeFormat('el-GR', { weekday: 'short' })

/** Parses "2027-01-18" as a local date (no timezone shift). */
export function parseDate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

/** "18 Ιαν" */
export function formatDayMonth(iso: string): string {
  return dayMonth.format(parseDate(iso))
}

/** "Δευ" */
export function formatWeekday(iso: string): string {
  return weekday.format(parseDate(iso))
}

/** Whole days from today (local midnight) until the ISO date; negative if past. */
export function daysUntil(iso: string, now: Date = new Date()): number {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  return Math.round((parseDate(iso).getTime() - today.getTime()) / 86_400_000)
}
