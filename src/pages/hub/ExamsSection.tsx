import { useState } from 'react'
import { Calendar, Check, MapPin } from 'lucide-react'
import { Button } from '../../components/Button'
import { Chip } from '../../components/Chip'
import { EmptyState } from '../../components/EmptyState'
import { exams } from '../../data/exams'
import { forUniversity } from '../../data/universities'
import { useUniversity } from '../../hooks/useUniversity'
import { el } from '../../i18n/el'
import { formatDayMonth, formatWeekday } from '../../i18n/formatDate'

type Filter = 'all' | 'mine'

type ExamsSectionProps = {
  myExamIds: string[]
  onToggle: (id: string) => void
}

/** Hub section: sample exam calendar, soonest first. Tap an exam to add it to "My exams". */
export function ExamsSection({ myExamIds, onToggle }: ExamsSectionProps) {
  const { university } = useUniversity()
  const [filter, setFilter] = useState<Filter>('all')

  const all = forUniversity(exams, university.id).sort((a, b) => a.date.localeCompare(b.date))
  const items = filter === 'mine' ? all.filter((e) => myExamIds.includes(e.id)) : all

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-h3">{el.exams.title}</h2>
      <div className="flex gap-2">
        {(['all', 'mine'] as const).map((f) => (
          <Chip key={f} label={el.exams.filters[f]} active={filter === f} onClick={() => setFilter(f)} />
        ))}
      </div>
      <p className="text-caption text-muted">{filter === 'all' ? el.exams.tapHint : el.exams.notice}</p>

      {items.length === 0 ? (
        filter === 'mine' ? (
          <EmptyState
            icon={Calendar}
            title={el.exams.mineEmpty}
            description={el.exams.mineEmptyHint}
            action={<Button onClick={() => setFilter('all')}>{el.exams.showAll}</Button>}
          />
        ) : (
          <EmptyState icon={Calendar} title={el.exams.empty} />
        )
      ) : (
        <ul className="flex flex-col gap-3">
          {items.map((exam) => {
            const added = myExamIds.includes(exam.id)
            return (
              <li key={exam.id}>
                <button
                  type="button"
                  aria-pressed={added}
                  aria-label={added ? el.exams.remove(exam.course) : el.exams.add(exam.course)}
                  onClick={() => onToggle(exam.id)}
                  className={`flex w-full items-center gap-3 rounded-2xl bg-card p-3 text-left shadow-sm transition-colors hover:bg-page ${
                    added ? 'ring-2 ring-success' : 'ring-1 ring-surface'
                  }`}
                >
                  <span className="flex w-16 shrink-0 flex-col items-center rounded-xl bg-primary-soft py-2 text-primary">
                    <span className="text-xs font-semibold">{formatWeekday(exam.date)}</span>
                    <span className="text-caption font-bold">{formatDayMonth(exam.date)}</span>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold">{exam.course}</span>
                    <span className="flex items-center gap-1 text-caption text-muted">
                      <span className="shrink-0">{exam.time}</span>
                      <span aria-hidden>·</span>
                      <MapPin className="size-4 shrink-0" strokeWidth={2} aria-hidden />
                      <span className="truncate">{exam.location}</span>
                    </span>
                    {added && <span className="block text-xs font-semibold text-success">{el.exams.added}</span>}
                  </span>
                  <span
                    className={`flex size-7 shrink-0 items-center justify-center rounded-full border-2 ${
                      added ? 'border-success bg-success text-white' : 'border-surface'
                    }`}
                    aria-hidden
                  >
                    {added && <Check className="size-4" strokeWidth={3} />}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      )}
      {filter === 'all' && <p className="text-caption text-muted">{el.exams.notice}</p>}
    </section>
  )
}
