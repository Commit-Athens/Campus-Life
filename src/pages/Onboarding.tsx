import { Navigate, useNavigate } from 'react-router'
import { Button } from '../components/Button'
import { Logo } from '../components/Logo'
import { useAuth } from '../hooks/useAuth'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { el } from '../i18n/el'

export const ONBOARDED_KEY = 'campuslife.onboarded'

export default function Onboarding() {
  const navigate = useNavigate()
  const { account } = useAuth()
  const [, setOnboarded] = useLocalStorage(ONBOARDED_KEY, false)

  if (account) return <Navigate to="/feed" replace />

  const go = (path: '/start' | '/login') => {
    setOnboarded(true)
    navigate(path, { replace: true })
  }

  return (
    <main className="relative mx-auto flex min-h-dvh max-w-md flex-col overflow-hidden">
      <img
        src="/welcome/campus.jpg"
        alt=""
        aria-hidden
        className="absolute inset-0 size-full object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/25 to-ink/80"
      />

      <div className="relative z-10 flex flex-1 flex-col px-5 pt-14 pb-10">
        <header className="flex flex-col gap-2">
          <Logo inverted />
          <p className="text-body text-white/90">{el.brand.tagline}</p>
        </header>

        <div className="flex-1" />

        <div className="flex flex-col gap-3">
          <Button variant="inverse" onClick={() => go('/start')}>
            {el.onboarding.start}
          </Button>
          <Button onClick={() => go('/login')}>{el.onboarding.haveAccount}</Button>
          <p className="text-center text-caption text-white/80">{el.onboarding.demoNotice}</p>
        </div>
      </div>
    </main>
  )
}
