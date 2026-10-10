import { type FormEvent, useState } from 'react'
import { Navigate, useNavigate } from 'react-router'
import { Button } from '../components/Button'
import { Logo } from '../components/Logo'
import { TextInput } from '../components/TextInput'
import { DEMO_PASSWORD, demoAccounts } from '../data/demoAccounts'
import { getUniversity } from '../data/universities'
import { useAuth } from '../hooks/useAuth'
import { el } from '../i18n/el'

export default function Login() {
  const { account, login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  if (account) return <Navigate to="/feed" replace />

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (login(email, password)) navigate('/feed', { replace: true })
    else setError(true)
  }

  const fill = (demoEmail: string) => {
    setEmail(demoEmail)
    setPassword(DEMO_PASSWORD)
    setError(false)
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col gap-8 px-4 py-10">
      <header className="flex flex-col gap-2">
        <Logo />
        <p className="text-caption text-muted">{el.brand.tagline}</p>
      </header>

      <form onSubmit={onSubmit} className="flex flex-col gap-4 rounded-2xl bg-white p-5 ring-1 ring-surface">
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
        <Button type="submit">{el.login.submit}</Button>
      </form>

      <section className="flex flex-col gap-3">
        <div>
          <h2 className="text-h3">{el.login.demoTitle}</h2>
          <p className="text-caption text-muted">
            {el.login.demoHint} {el.login.demoPassword}: <code className="font-semibold text-ink">{DEMO_PASSWORD}</code>
          </p>
        </div>
        {demoAccounts.map((a) => {
          const uni = getUniversity(a.universityId)
          return (
            <button
              key={a.email}
              type="button"
              onClick={() => fill(a.email)}
              className={`flex min-h-16 w-full items-center gap-3 rounded-2xl bg-white p-3 text-left ring-1 transition-colors hover:bg-page ${
                email === a.email ? 'ring-2 ring-primary' : 'ring-surface'
              }`}
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary-soft text-caption font-semibold text-primary">
                {a.initials}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2 font-semibold">
                  {a.name}
                  <span className={`rounded-full px-2 py-0.5 text-xs text-white ${uni.badgeClass}`}>{uni.shortName}</span>
                </span>
                <span className="block truncate text-caption text-muted">{a.email}</span>
              </span>
            </button>
          )
        })}
        <p className="text-center text-caption text-muted">{el.login.demoNotice}</p>
      </section>
    </main>
  )
}
