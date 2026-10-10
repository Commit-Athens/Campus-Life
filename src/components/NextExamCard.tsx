import { Calendar, ChevronRight } from 'lucide-react'
import type { Exam } from '../types'
import { el } from '../i18n/el'
import { daysUntil, formatDayMonth, formatWeekday } from '../i18n/formatDate'

type NextExamCardProps = {
  /** The user's soonest upcoming exam, or null if none is added. */
  exam: Exam | null
  onOpen: () => void
}

/** Countdown to the next of "My exams", shown at the top of the Hub. */
export function NextExamCard({ exam, onOpen }: NextExamCardProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={el.exams.nextOpen}
      className="flex w-full items-center gap-3 rounded-2xl bg-card p-4 text-left shadow-sm ring-1 ring-surface transition-colors hover:bg-page"
    >
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-warning-soft text-warning">
        <Calendar className="size-5" strokeWidth={2} aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-caption font-semibold text-muted">{el.exams.nextTitle}</span>
        {exam ? (
          <>
            <span className="block font-semibold">
              {el.exams.countdown(daysUntil(exam.date))} · {exam.course}
            </span>
            <span className="block text-caption text-muted">
              {formatWeekday(exam.date)} {formatDayMonth(exam.date)} · {exam.time}
            </span>
          </>
        ) : (
          <>
            <span className="block text-caption">{el.exams.nextEmpty}</span>
            <span className="block text-caption font-semibold text-primary">{el.exams.nextCta}</span>
          </>
        )}
      </span>
      <ChevronRight className="size-5 shrink-0 text-muted" strokeWidth={2} aria-hidden />
    </button>
  )
}
