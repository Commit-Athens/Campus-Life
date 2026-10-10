import { Button } from '../components/Button'
import { PageTitle } from '../components/PageTitle'
import { useAuth } from '../hooks/useAuth'
import { useUniversity } from '../hooks/useUniversity'
import { el } from '../i18n/el'

export default function More() {
  const { account, logout } = useAuth()
  const { university } = useUniversity()
  if (!account) return null

  return (
    <>
      <PageTitle>{el.pages.more}</PageTitle>
      <section className="flex flex-col gap-4 rounded-2xl bg-white p-5 ring-1 ring-surface">
        <h2 className="text-h3">{el.account.title}</h2>
        <div className="flex items-center gap-3">
          <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary-soft text-h3 text-primary">
            {account.initials}
          </span>
          <div className="min-w-0">
            <p className="font-semibold">{account.name}</p>
            <p className="text-caption text-muted">
              {account.department} · {el.account.year(account.year)}
            </p>
            <p className="text-caption text-muted">{university.name}</p>
          </div>
        </div>
        <Button variant="secondary" onClick={logout}>
          {el.account.logout}
        </Button>
      </section>
    </>
  )
}
