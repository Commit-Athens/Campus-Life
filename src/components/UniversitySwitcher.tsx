import { useEffect } from 'react'
import { universities } from '../data/universities'
import { useUniversity } from '../hooks/useUniversity'
import { el } from '../i18n/el'
import { Button } from './Button'

/** Bottom sheet listing the universities. Selecting one switches and closes. */
export function UniversitySwitcher({ onClose }: { onClose: () => void }) {
  const { university, setUniversityId } = useUniversity()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center">
      <button type="button" aria-label={el.switcher.close} onClick={onClose} className="absolute inset-0 bg-ink/40" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="switcher-title"
        className="relative flex w-full max-w-md flex-col gap-3 rounded-t-2xl bg-white p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))]"
      >
        <h2 id="switcher-title" className="text-h3">
          {el.switcher.title}
        </h2>
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
                  <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold text-white ${u.badgeClass}`}>
                    {u.shortName}
                  </span>
                  <span className="flex-1 font-medium">{u.name}</span>
                </button>
              </li>
            )
          })}
        </ul>
        <Button variant="secondary" onClick={onClose}>
          {el.switcher.close}
        </Button>
      </div>
    </div>
  )
}
