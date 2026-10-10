import { BadgeCheck } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../components/Button'
import { PageTitle } from '../components/PageTitle'
import { VerifySheet } from '../components/VerifySheet'
import { useAuth } from '../hooks/useAuth'
import { useUniversity } from '../hooks/useUniversity'
import { el } from '../i18n/el'
import { playSpeech } from '../lib/elevenlabs'
import { maskStudentId } from '../lib/verification'

const DEMO_LINE =
  'Γεια σου! Είμαι ο βοηθός του CampusLife. Μπορώ να σου διαβάσω ανακοινώσεις και συμβουλές για την πανεπιστημιακή ζωή.'

export default function More() {
  const { account, logout, verified, studentId } = useAuth()
  const [verifying, setVerifying] = useState(false)
  const { university } = useUniversity()
  const [voiceState, setVoiceState] = useState<'idle' | 'loading' | 'playing' | 'error'>('idle')
  const [voiceError, setVoiceError] = useState<string | null>(null)

  if (!account) return null

  async function onHearDemo() {
    setVoiceError(null)
    setVoiceState('loading')
    try {
      await playSpeech({ text: DEMO_LINE })
      setVoiceState('idle')
    } catch (err) {
      setVoiceState('error')
      setVoiceError(err instanceof Error ? err.message : 'Voice demo failed')
    }
  }

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
        {verified && studentId ? (
          <div className="flex items-center gap-3 rounded-2xl bg-success-soft p-3">
            <BadgeCheck className="size-6 shrink-0 text-success" strokeWidth={2} aria-hidden />
            <div className="min-w-0">
              <p className="font-semibold text-success">{el.verify.verified}</p>
              <p className="text-caption text-muted">{el.verify.verifiedAs(maskStudentId(studentId))}</p>
            </div>
          </div>
        ) : (
          <Button onClick={() => setVerifying(true)}>{el.verify.start}</Button>
        )}
        <Button variant="secondary" onClick={logout}>
          {el.account.logout}
        </Button>
      </section>
      {verifying && <VerifySheet onClose={() => setVerifying(false)} />}

      <section className="mt-4 flex flex-col gap-3 rounded-2xl bg-white p-5 ring-1 ring-surface">
        <h2 className="text-h3">{el.agent.title}</h2>
        <p className="text-caption text-muted">{el.agent.moreHint}</p>
        <Button
          variant="primary"
          onClick={() => void onHearDemo()}
          disabled={voiceState === 'loading'}
        >
          {voiceState === 'loading' ? el.agent.preparing : el.agent.hearDemo}
        </Button>
        {voiceError ? <p className="text-caption text-error">{voiceError}</p> : null}
      </section>
    </>
  )
}
