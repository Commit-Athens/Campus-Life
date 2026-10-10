import { Gift, Megaphone, Users } from 'lucide-react'
import { useNavigate } from 'react-router'
import { Button } from '../components/Button'
import { IconCircle } from '../components/IconCircle'
import { LogoMark } from '../components/Logo'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { el } from '../i18n/el'

export const ONBOARDED_KEY = 'campuslife.onboarded'

export default function Onboarding() {
  const navigate = useNavigate()
  const [, setOnboarded] = useLocalStorage(ONBOARDED_KEY, false)

  const finish = () => {
    setOnboarded(true)
    navigate('/login', { replace: true })
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col px-4 py-10">
      {/* Illustration placeholder built from brand icons. */}
      <div
        aria-hidden
        className="flex flex-1 flex-col items-center justify-center gap-6 rounded-2xl bg-primary-soft/50 py-12"
      >
        <LogoMark className="size-20" />
        <div className="flex gap-3">
          <IconCircle icon={Megaphone} />
          <IconCircle icon={Gift} tone="success" />
          <IconCircle icon={Users} tone="warning" />
        </div>
      </div>

      <div className="flex flex-col gap-3 py-8 text-center">
        <h1 className="text-h1">{el.onboarding.title}</h1>
        <p className="text-muted">{el.onboarding.description}</p>
      </div>

      <div className="flex flex-col items-center gap-2">
        <Button onClick={finish}>{el.onboarding.start}</Button>
        <button
          type="button"
          onClick={finish}
          className="min-h-11 px-4 text-caption font-medium text-muted hover:text-ink"
        >
          {el.onboarding.skip}
        </button>
      </div>
    </main>
  )
}
