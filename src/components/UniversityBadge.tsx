import { useState } from 'react'
import { useUniversity } from '../hooks/useUniversity'
import { el } from '../i18n/el'
import { UniversitySwitcher } from './UniversitySwitcher'

/** Header badge with the selected university's short name. Opens the switcher. */
export function UniversityBadge() {
  const { university } = useUniversity()
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`${el.switcher.open}: ${university.name}`}
        aria-haspopup="dialog"
        className="flex min-h-11 items-center"
      >
        <span className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${university.badgeClass}`}>
          {university.shortName}
        </span>
      </button>
      {open && <UniversitySwitcher onClose={() => setOpen(false)} />}
    </>
  )
}
