import { useState } from 'react'
import { Button } from '../components/Button'
import { PageTitle } from '../components/PageTitle'
import { useAuth } from '../hooks/useAuth'
import { useUniversity } from '../hooks/useUniversity'
import { el } from '../i18n/el'
import { playSpeech } from '../lib/elevenlabs'

const DEMO_LINE =
  'Γεια σου! Είμαι ο βοηθός του CampusLife. Μπορώ να σου διαβάσω ανακοινώσεις και συμβουλές για την πανεπιστημιακή ζωή.'

export default function More() {
  const { account, logout } = useAuth()
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
        <Button variant="secondary" onClick={logout}>
          {el.account.logout}
        </Button>
      </section>

      <section className="mt-4 flex flex-col gap-3 rounded-2xl bg-white p-5 ring-1 ring-surface">
        <h2 className="text-h3">Voice agent (ElevenLabs)</h2>
        <p className="text-caption text-muted">
          Demo TTS via the Cloudflare Worker proxy. The API key stays in Worker secrets — never in the
          browser.
        </p>
        <Button
          variant="primary"
          onClick={() => void onHearDemo()}
          disabled={voiceState === 'loading'}
        >
          {voiceState === 'loading' ? 'Preparing…' : 'Hear campus tip'}
        </Button>
        {voiceError ? <p className="text-caption text-red-600">{voiceError}</p> : null}
      </section>
    </>
  )
}
