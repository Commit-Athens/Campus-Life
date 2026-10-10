import { Gift, Megaphone, MessageCircle, Settings, Users, type LucideIcon } from 'lucide-react'
import { NavLink } from 'react-router'
import { el } from '../i18n/el'

export function TabBar() {
  const tabs: { to: string; label: string; icon: LucideIcon }[] = [
    { to: '/feed', label: el.tabs.feed, icon: Megaphone },
    { to: '/posts', label: el.tabs.posts, icon: MessageCircle },
    { to: '/hub', label: el.tabs.hub, icon: Gift },
    { to: '/community', label: el.tabs.community, icon: Users },
    { to: '/more', label: el.tabs.more, icon: Settings },
  ]

  return (
    <nav className="fixed inset-x-0 bottom-0 z-10 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <ul className="mx-auto flex max-w-md items-center justify-between rounded-full bg-card/80 px-2 py-2 shadow-lg ring-1 ring-surface backdrop-blur-xl">
        {tabs.map(({ to, label, icon: Icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={to === '/feed'}
              aria-label={label}
              className={({ isActive }) =>
                `flex size-11 items-center justify-center rounded-full transition-colors ${
                  isActive ? 'bg-primary text-white' : 'text-muted'
                }`
              }
            >
              <Icon className="size-5" strokeWidth={1.75} aria-hidden />
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
