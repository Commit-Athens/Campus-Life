import { Link } from 'react-router'
import { el } from '../i18n/el'
import { Logo } from './Logo'
import { UniversityBadge } from './UniversityBadge'

export function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-surface bg-white/90 px-4 backdrop-blur">
      <Link to="/feed" aria-label={el.brand.name} className="flex min-h-11 items-center">
        <Logo />
      </Link>
      <div className="flex items-center gap-2">
        <UniversityBadge />
        <Link
          to="/more"
          aria-label={el.header.profile}
          className="flex size-11 items-center justify-center rounded-full"
        >
          <span className="flex size-9 items-center justify-center rounded-full bg-primary-soft text-caption font-semibold text-primary">
            {el.header.profileInitials}
          </span>
        </Link>
      </div>
    </header>
  )
}
