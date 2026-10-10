import { Gift, Home, Settings, Users, type LucideIcon } from 'lucide-react'
import { NavLink } from 'react-router'
import { el } from '../i18n/el'

const tabs: { to: string; label: string; icon: LucideIcon }[] = [
  { to: '/feed', label: el.tabs.feed, icon: Home },
  { to: '/hub', label: el.tabs.hub, icon: Gift },
  { to: '/community', label: el.tabs.community, icon: Users },
  { to: '/more', label: el.tabs.more, icon: Settings },
]

export function TabBar() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-10 border-t border-surface bg-white pb-[env(safe-area-inset-bottom)]">
      <ul className="mx-auto grid max-w-md grid-cols-4">
        {tabs.map(({ to, label, icon: Icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `flex min-h-16 flex-col items-center justify-center gap-1 text-xs font-medium transition-colors ${
                  isActive ? 'text-primary' : 'text-muted hover:text-ink'
                }`
              }
            >
              <Icon className="size-6" strokeWidth={1.75} aria-hidden />
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
