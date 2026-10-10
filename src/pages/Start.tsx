import { Navigate, useNavigate } from 'react-router'
import { Avatar } from '../components/Avatar'
import { Logo } from '../components/Logo'
import { DEMO_PASSWORD, demoAccounts } from '../data/demoAccounts'
import { getUniversity } from '../data/universities'
import { useAuth } from '../hooks/useAuth'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { el } from '../i18n/el'
import { ONBOARDED_KEY } from './Onboarding'

/** One-tap demo account picker. Sets university via login(). */
export default function Start() {
  const { account, login } = useAuth()
  const navigate = useNavigate()
  const [onboarded] = useLocalStorage(ONBOARDED_KEY, false)

  if (account) return <Navigate to="/feed" replace />
  if (!onboarded) return <Navigate to="/welcome" replace />

  const pick = (email: string) => {
    if (login(email, DEMO_PASSWORD)) navigate('/feed', { replace: true })
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col gap-8 px-4 py-10">
      <header className="flex flex-col gap-2">
        <Logo />
        <div>
          <h1 className="text-h2">{el.start.title}</h1>
          <p className="text-caption text-muted">{el.start.subtitle}</p>
        </div>
      </header>

      <section className="flex flex-col gap-3">
        {demoAccounts.map((a) => {
          const uni = getUniversity(a.universityId)
          return (
            <button
              key={a.email}
              type="button"
              onClick={() => pick(a.email)}
              className="flex min-h-16 w-full items-center gap-3 rounded-2xl bg-card p-3 text-left ring-1 ring-surface transition-colors hover:bg-page"
            >
              <Avatar name={a.name} />
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2 font-semibold">
                  {a.name}
                  <span className={`rounded-full px-2 py-0.5 text-xs text-white ${uni.badgeClass}`}>{uni.shortName}</span>
                </span>
                <span className="block truncate text-caption text-muted">{a.department}</span>
              </span>
            </button>
          )
        })}
      </section>
    </main>
  )
}
