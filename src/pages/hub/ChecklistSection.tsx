import { checklist } from '../../data/checklist'
import { forUniversity } from '../../data/universities'
import { useUniversity } from '../../hooks/useUniversity'
import { el } from '../../i18n/el'

/** Hub section: first-year checklist. Items become checkable in step 13. */
export function ChecklistSection() {
  const { university } = useUniversity()
  const items = forUniversity(checklist, university.id)

  return (
    <section className="flex flex-col gap-3">
      <div>
        <h2 className="text-h3">{el.checklist.title}</h2>
        <p className="text-caption text-muted">{el.checklist.intro}</p>
      </div>
      <ol className="flex flex-col rounded-2xl bg-white ring-1 ring-surface">
        {items.map((item, i) => (
          <li key={item.id} className="flex gap-3 border-t border-surface p-4 first:border-t-0">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-soft text-caption font-semibold text-primary">
              {i + 1}
            </span>
            <div className="min-w-0">
              <p className="font-semibold">{item.title}</p>
              <p className="text-caption text-muted">{item.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
