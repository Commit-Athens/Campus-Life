import { Check } from 'lucide-react'
import { ProgressBar } from '../../components/ProgressBar'
import { SpeakButton } from '../../components/SpeakButton'
import { checklist } from '../../data/checklist'
import { forUniversity } from '../../data/universities'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { usePoints } from '../../hooks/usePoints'
import { useUniversity } from '../../hooks/useUniversity'
import { el } from '../../i18n/el'

/** Hub section: first-year checklist with persisted progress. Each completed item earns one point (once). */
export function ChecklistSection() {
  const { university } = useUniversity()
  const { award } = usePoints()
  const [doneIds, setDoneIds] = useLocalStorage<string[]>('campuslife.checklist', [])

  const items = forUniversity(checklist, university.id)
  const doneCount = items.filter((item) => doneIds.includes(item.id)).length

  const toggle = (id: string) => {
    const wasDone = doneIds.includes(id)
    setDoneIds((prev) => (wasDone ? prev.filter((d) => d !== id) : [...prev, id]))
    if (!wasDone) award(`checklist:${id}`)
  }

  return (
    <section className="flex flex-col gap-3">
      <div>
        <h2 className="text-h3">{el.checklist.title}</h2>
        <p className="text-caption text-muted">{el.checklist.intro}</p>
      </div>

      <div className="flex flex-col gap-2 rounded-2xl bg-white p-4 ring-1 ring-surface">
        <div className="flex items-baseline justify-between gap-3">
          <p className="font-semibold">{el.checklist.progress(doneCount, items.length)}</p>
          <p className="text-caption text-muted">{el.checklist.pointHint}</p>
        </div>
        <ProgressBar value={doneCount} max={items.length} label={el.checklist.progressLabel} />
        {doneCount === items.length && items.length > 0 && (
          <p className="text-caption font-semibold text-success">{el.checklist.allDone}</p>
        )}
      </div>

      <ul className="flex flex-col rounded-2xl bg-white ring-1 ring-surface">
        {items.map((item) => {
          const done = doneIds.includes(item.id)
          return (
            <li key={item.id} className="flex items-center border-t border-surface pr-1 first:border-t-0">
              <button
                type="button"
                role="checkbox"
                aria-checked={done}
                onClick={() => toggle(item.id)}
                className="flex min-h-16 min-w-0 flex-1 gap-3 p-4 text-left transition-colors hover:bg-page"
              >
                <span
                  className={`flex size-7 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                    done ? 'border-success bg-success text-white' : 'border-surface bg-white'
                  }`}
                  aria-hidden
                >
                  {done && <Check className="size-4" strokeWidth={3} />}
                </span>
                <span className="min-w-0">
                  <span className={`block font-semibold ${done ? 'text-muted line-through' : ''}`}>{item.title}</span>
                  <span className="block text-caption text-muted">{item.description}</span>
                </span>
              </button>
              <SpeakButton text={`${item.title}. ${item.description}`} label={item.title} />
            </li>
          )
        })}
      </ul>
    </section>
  )
}
