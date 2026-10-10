import { type FormEvent, useState } from 'react'
import { Navigate, useNavigate } from 'react-router'
import { Button } from '../components/Button'
import { Logo } from '../components/Logo'
import { TextInput } from '../components/TextInput'
import { DEMO_PASSWORD } from '../data/demoAccounts'
import { useAuth } from '../hooks/useAuth'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { el } from '../i18n/el'
import { ONBOARDED_KEY } from './Onboarding'

export default function Login() {
  const { account, login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [onboarded] = useLocalStorage(ONBOARDED_KEY, false)

  if (account) return <Navigate to="/feed" replace />
  if (!onboarded) return <Navigate to="/welcome" replace />

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (login(email, password)) navigate('/feed', { replace: true })
    else setError(true)
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col gap-8 px-4 py-10">
      <header className="flex flex-col gap-2">
        <Logo />
        <p className="text-caption text-muted">{el.brand.tagline}</p>
      </header>

      <form onSubmit={onSubmit} className="flex flex-col gap-4 rounded-2xl bg-card p-5 ring-1 ring-surface">
        <div>
          <h1 className="text-h2">{el.login.title}</h1>
          <p className="text-caption text-muted">{el.login.subtitle}</p>
        </div>
        <TextInput
          id="email"
          label={el.login.email}
          type="email"
          autoComplete="username"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            setError(false)
          }}
          required
        />
        <TextInput
          id="password"
          label={el.login.password}
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            setError(false)
          }}
          required
        />
        {error && (
          <p role="alert" className="rounded-2xl bg-error-soft px-4 py-2 text-caption text-error">
            {el.login.error}
          </p>
        )}
        <p className="text-caption text-muted">
          {el.login.demoPassword}: <code className="font-semibold text-ink">{DEMO_PASSWORD}</code>
        </p>
        <Button type="submit">{el.login.submit}</Button>
      </form>

      <button
        type="button"
        onClick={() => navigate('/start')}
        className="min-h-11 text-center text-caption font-medium text-primary"
      >
        {el.login.pickAccount}
      </button>
      <p className="text-center text-caption text-muted">{el.login.demoNotice}</p>
    </main>
  )
}
