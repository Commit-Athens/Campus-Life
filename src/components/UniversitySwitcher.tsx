import { universities } from '../data/universities'
import { useUniversity } from '../hooks/useUniversity'
import { el } from '../i18n/el'
import { Sheet } from './Sheet'

/** Bottom sheet listing the universities. Selecting one switches and closes. */
export function UniversitySwitcher({ onClose }: { onClose: () => void }) {
  const { university, setUniversityId } = useUniversity()

  return (
    <Sheet title={el.switcher.title} onClose={onClose}>
      <ul className="flex flex-col gap-2">
        {universities.map((u) => {
          const selected = u.id === university.id
          return (
            <li key={u.id}>
              <button
                type="button"
                aria-pressed={selected}
                onClick={() => {
                  setUniversityId(u.id)
                  onClose()
                }}
                className={`flex min-h-16 w-full items-center gap-3 rounded-2xl p-3 text-left ring-1 transition-colors hover:bg-page ${
                  selected ? 'bg-primary-soft/50 ring-2 ring-primary' : 'ring-surface'
                }`}
              >
                <img src={u.photo} alt="" className="size-11 shrink-0 rounded-full bg-surface object-cover" />
                <span className="min-w-0 flex-1">
                  <span className={`mb-1 inline-block rounded-full px-3 py-0.5 text-xs font-semibold text-white ${u.badgeClass}`}>
                    {u.shortName}
                  </span>
                  <span className="block font-medium">{u.name}</span>
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </Sheet>
  )
}
