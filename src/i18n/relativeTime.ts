import { el } from './el'

/** Greek relative time ("πριν από 2 ώρες") from minutes ago. */
export function relativeTime(minutesAgo: number): string {
  if (minutesAgo < 1) return el.time.justNow
  if (minutesAgo < 60) return el.time.minutes(minutesAgo)
  const hours = Math.floor(minutesAgo / 60)
  if (hours < 24) return el.time.hours(hours)
  const days = Math.floor(hours / 24)
  return days === 1 ? el.time.yesterday : el.time.days(days)
}
