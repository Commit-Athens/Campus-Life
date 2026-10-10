import { BadgeCheck } from 'lucide-react'
import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { el } from '../i18n/el'
import { Avatar } from './Avatar'
import { Logo } from './Logo'
import { UniversityBadge } from './UniversityBadge'

export function Header() {
  const { account, verified } = useAuth()
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-surface bg-white/90 px-4 backdrop-blur">
      <Link to="/feed" aria-label={el.brand.name} className="flex min-h-11 items-center">
        <Logo />
      </Link>
      <div className="flex items-center gap-2">
        <UniversityBadge />
        <Link
          to="/more"
          aria-label={verified ? `${el.header.profile} · ${el.verify.badge}` : el.header.profile}
          className="relative flex size-11 items-center justify-center rounded-full"
        >
          {account && <Avatar name={account.name} size="sm" />}
          {verified && (
            <BadgeCheck
              className="absolute right-0 bottom-0 size-5 rounded-full bg-white text-success"
              strokeWidth={2.25}
              aria-hidden
            />
          )}
        </Link>
      </div>
    </header>
  )
}
