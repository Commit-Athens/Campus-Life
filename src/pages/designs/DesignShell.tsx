import { BadgeCheck, Gift, Megaphone, MessageCircle, Settings, Users, type LucideIcon } from 'lucide-react'
import { useEffect } from 'react'
import { NavLink, Navigate, Outlet, useLocation } from 'react-router'
import { Logo } from '../../components/Logo'
import { UniversityBadge } from '../../components/UniversityBadge'
import { Avatar } from '../../components/Avatar'
import { useAuth } from '../../hooks/useAuth'
import { el } from '../../i18n/el'
import { useLanguage } from '../../i18n/languageContext'

type Variant = 1 | 2 | 3

type Tab = { to: string; end?: boolean; label: string; icon: LucideIcon; center?: boolean }

/** Trial shell. The live tab bar stays on the real routes. */
export default function DesignShell({ variant }: { variant: Variant }) {
  const { account } = useAuth()
  useLanguage()
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  if (!account) return <Navigate to="/welcome" replace />

  const copy = el.designs.variants[variant]
  const base = `/design${variant}`
  const tabs: Tab[] = [
    { to: base, end: true, label: el.tabs.feed, icon: Megaphone },
    { to: `${base}/posts`, label: el.tabs.posts, icon: MessageCircle },
    { to: `${base}/hub`, label: el.tabs.hub, icon: Gift, center: variant === 2 },
    { to: `${base}/community`, label: el.tabs.community, icon: Users },
    { to: `${base}/more`, label: el.tabs.more, icon: Settings },
  ]

  return (
    <div className="mx-auto min-h-dvh max-w-md bg-page">
      <div className="flex items-center gap-2 bg-night px-3 py-2 text-white">
        <p className="min-w-0 flex-1 truncate text-xs font-semibold">
          {variant}/3 · {copy.name}
        </p>
        <nav className="flex items-center gap-1" aria-label={el.designs.backLabel}>
          {([1, 2, 3] as const).map((n) => (
            <NavLink
              key={n}
              to={`/design${n}`}
              aria-label={el.designs.variants[n].name}
              className={`flex size-8 items-center justify-center rounded-full text-xs font-semibold ${
                n === variant ? 'bg-primary text-white' : 'bg-white/15 text-white'
              }`}
            >
              {n}
            </NavLink>
          ))}
          <NavLink
            to="/feed"
            aria-label={el.designs.backLabel}
            className="flex h-8 items-center rounded-full bg-white/15 px-3 text-xs font-semibold text-white"
          >
            {el.designs.back}
          </NavLink>
        </nav>
      </div>
      <p className="bg-night px-4 pb-3 text-xs text-white/80">{copy.note}</p>

      {variant === 3 ? <EditorialHeader /> : <TrialHeader home={base} compact={variant === 2} />}

      <main className={`flex flex-col gap-6 px-4 pt-6 ${variant === 2 ? 'pb-36' : 'pb-32'}`}>
        <Outlet />
      </main>

      {variant === 1 && <GlassBar tabs={tabs} />}
      {variant === 2 && <CenterBar tabs={tabs} />}
      {variant === 3 && <IndicatorBar tabs={tabs} />}
    </div>
  )
}

function TrialHeader({ home, compact }: { home: string; compact: boolean }) {
  const { account, verified } = useAuth()
  return (
    <header
      className={`sticky top-0 z-10 flex items-center justify-between px-4 ${
        compact ? 'h-14 border-b border-surface bg-card' : 'h-16 bg-card/75 backdrop-blur-xl'
      }`}
    >
      <NavLink to={home} end aria-label={el.brand.name} className="flex min-h-11 items-center">
        <Logo />
      </NavLink>
      <div className="flex items-center gap-2">
        <UniversityBadge />
        {account && (
          <span className="relative">
            <Avatar name={account.name} size="sm" />
            {verified && (
              <BadgeCheck
                className="absolute -right-0.5 -bottom-0.5 size-4 rounded-full bg-card text-success"
                strokeWidth={2.25}
                aria-label={el.verify.badge}
              />
            )}
          </span>
        )}
      </div>
    </header>
  )
}

function EditorialHeader() {
  const { account } = useAuth()
  return (
    <header className="flex items-end justify-between px-4 pt-6">
      <div>
        <p className="text-caption text-muted">{el.pages.feed}</p>
        <Logo />
      </div>
      {account && <Avatar name={account.name} size="lg" />}
    </header>
  )
}

function GlassBar({ tabs }: { tabs: Tab[] }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-10 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <ul className="mx-auto flex max-w-md items-center justify-between rounded-full bg-card/80 px-2 py-2 shadow-lg ring-1 ring-surface backdrop-blur-xl">
        {tabs.map((tab) => (
          <li key={tab.to}>
            <NavLink
              to={tab.to}
              end={tab.end}
              aria-label={tab.label}
              className={({ isActive }) =>
                `flex size-11 items-center justify-center rounded-full transition-colors ${
                  isActive ? 'bg-primary text-white' : 'text-muted'
                }`
              }
            >
              <tab.icon className="size-5" strokeWidth={1.75} aria-hidden />
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function CenterBar({ tabs }: { tabs: Tab[] }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-10 border-t border-surface bg-card pb-[env(safe-area-inset-bottom)]">
      <ul className="mx-auto flex max-w-md items-end justify-around">
        {tabs.map((tab) => (
          <li key={tab.to} className={tab.center ? '-mt-5' : ''}>
            <NavLink
              to={tab.to}
              end={tab.end}
              aria-label={tab.label}
              className={({ isActive }) =>
                tab.center
                  ? `flex size-14 items-center justify-center rounded-full bg-primary text-white shadow-lg ring-4 ring-page ${
                      isActive ? 'ring-primary-soft' : ''
                    }`
                  : `flex min-h-16 min-w-11 flex-col items-center justify-center gap-1 px-1 text-center text-xs leading-tight font-medium ${
                      isActive ? 'text-primary' : 'text-muted'
                    }`
              }
            >
              <tab.icon className="size-6" strokeWidth={1.75} aria-hidden />
              {tab.center ? <span className="sr-only">{tab.label}</span> : tab.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function IndicatorBar({ tabs }: { tabs: Tab[] }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-10 border-t border-surface bg-card pb-[env(safe-area-inset-bottom)]">
      <ul className="mx-auto grid max-w-md grid-cols-5">
        {tabs.map((tab) => (
          <li key={tab.to}>
            <NavLink
              to={tab.to}
              end={tab.end}
              aria-label={tab.label}
              className="flex min-h-16 flex-col items-center justify-center gap-1 px-1 text-center"
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`flex h-8 w-12 items-center justify-center rounded-full ${
                      isActive ? 'bg-primary-soft text-primary' : 'text-muted'
                    }`}
                  >
                    <tab.icon className="size-5" strokeWidth={1.75} aria-hidden />
                  </span>
                  {isActive ? (
                    <span className="text-center text-[11px] leading-tight font-semibold text-primary">{tab.label}</span>
                  ) : (
                    <span className="sr-only">{tab.label}</span>
                  )}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
