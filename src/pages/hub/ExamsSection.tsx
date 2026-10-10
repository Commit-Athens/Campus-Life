import { Calendar, MapPin } from 'lucide-react'
import { EmptyState } from '../../components/EmptyState'
import { exams } from '../../data/exams'
import { forUniversity } from '../../data/universities'
import { useUniversity } from '../../hooks/useUniversity'
import { el } from '../../i18n/el'
import { formatDayMonth, formatWeekday } from '../../i18n/formatDate'

/** Hub section: sample exam calendar, soonest first. "My exams" arrives in step 16. */
export function ExamsSection() {
  const { university } = useUniversity()
  const items = forUniversity(exams, university.id).sort((a, b) => a.date.localeCompare(b.date))

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-h3">{el.exams.title}</h2>
      <p className="text-caption text-muted">{el.exams.notice}</p>
      {items.length === 0 ? (
        <EmptyState icon={Calendar} title={el.exams.empty} />
      ) : (
        <ul className="flex flex-col gap-3">
          {items.map((exam) => (
            <li key={exam.id} className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-surface">
              <div className="flex w-16 shrink-0 flex-col items-center rounded-xl bg-primary-soft py-2 text-primary">
                <span className="text-xs font-semibold">{formatWeekday(exam.date)}</span>
                <span className="text-caption font-bold">{formatDayMonth(exam.date)}</span>
              </div>
              <div className="min-w-0">
                <p className="font-semibold">{exam.course}</p>
                <p className="flex items-center gap-1 text-caption text-muted">
                  <span className="shrink-0">{exam.time}</span>
                  <span aria-hidden>·</span>
                  <MapPin className="size-4 shrink-0" strokeWidth={2} aria-hidden />
                  <span className="truncate">{exam.location}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
