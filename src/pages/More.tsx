import { BadgeCheck, Star } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { Avatar } from '../components/Avatar'
import { Button } from '../components/Button'
import { Chip } from '../components/Chip'
import { PageTitle } from '../components/PageTitle'
import { Sheet } from '../components/Sheet'
import { Toggle } from '../components/Toggle'
import { UniversitySwitcher } from '../components/UniversitySwitcher'
import { VerifySheet } from '../components/VerifySheet'
import { getUniversity, universities } from '../data/universities'
import { useAuth } from '../hooks/useAuth'
import { useFeedScope } from '../hooks/useFeedScope'
import { usePoints } from '../hooks/usePoints'
import { THEME_KEY, useTheme, type ThemePreference } from '../hooks/useTheme'
import { useUniversity } from '../hooks/useUniversity'
import { el } from '../i18n/el'
import { useLanguage } from '../i18n/languageContext'
import { playSpeech } from '../lib/elevenlabs'
import { maskStudentId } from '../lib/verification'

const themeOptions: ThemePreference[] = ['system', 'light', 'dark']

/** Kept on reset so the user stays logged in, keeps theme and language, and skips onboarding. */
const KEEP_ON_RESET = ['campuslife.session', 'campuslife.university', 'campuslife.onboarded', THEME_KEY, 'campuslife.lang']

function resetDemoData() {
  try {
    Object.keys(window.localStorage)
      .filter((key) => key.startsWith('campuslife.') && !KEEP_ON_RESET.includes(key))
      .forEach((key) => window.localStorage.removeItem(key))
  } catch {
    // Storage blocked: nothing stored to clear.
  }
  window.location.reload()
}

function Card({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-4 rounded-2xl bg-card p-5 ring-1 ring-surface">
      {title && <h2 className="text-h3">{title}</h2>}
      {children}
    </section>
  )
}

function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col border-t border-surface pt-2 first:border-t-0 first:pt-0">
      <dt className="text-xs font-semibold text-muted">{label}</dt>
      <dd className="text-caption">{value}</dd>
    </div>
  )
}

/** More: profile, points, content university, settings, voice demo and roadmap. */
export default function More() {
  const { account, logout, verified, studentId } = useAuth()
  const { university } = useUniversity()
  const { points } = usePoints()
  const { showAll, setShowAll } = useFeedScope()
  const { preference, setPreference } = useTheme()
  const { lang, setLang } = useLanguage()
  const [verifying, setVerifying] = useState(false)
  const [switching, setSwitching] = useState(false)
  const [confirmReset, setConfirmReset] = useState(false)
  const [voiceState, setVoiceState] = useState<'idle' | 'loading' | 'playing' | 'error'>('idle')
  const [voiceError, setVoiceError] = useState<string | null>(null)

  if (!account) return null
  const home = getUniversity(account.universityId)

  async function onHearDemo() {
    setVoiceError(null)
    setVoiceState('loading')
    try {
      await playSpeech({ text: el.agent.demoLine })
      setVoiceState('idle')
    } catch (err) {
      setVoiceState('error')
      setVoiceError(err instanceof Error ? err.message : 'Voice demo failed')
    }
  }

  return (
    <>
      <div className="flex items-center justify-between gap-3">
        <PageTitle>{el.pages.more}</PageTitle>
        <span
          className="flex shrink-0 items-center gap-1.5 rounded-full bg-warning-soft px-3 py-1.5 text-caption font-semibold text-warning"
          aria-label={el.more.pointsLabel(points)}
        >
          <Star className="size-4 fill-current" strokeWidth={2} aria-hidden />
          {el.more.points(points)}
        </span>
      </div>

      <Card title={el.account.title}>
        <div className="flex items-center gap-3">
          <span className="relative shrink-0">
            <Avatar name={account.name} size="lg" />
            {verified && (
              <BadgeCheck
                className="absolute -right-0.5 -bottom-0.5 size-5 rounded-full bg-card text-success"
                strokeWidth={2.25}
                aria-label={el.verify.badge}
              />
            )}
          </span>
          <div className="min-w-0">
            <p className="font-semibold">{account.name}</p>
            <p className="text-caption text-muted">{account.email}</p>
          </div>
        </div>
        <dl className="flex flex-col gap-2 rounded-2xl bg-page p-3">
          <ProfileRow label={el.more.profile.university} value={home.name} />
          <ProfileRow label={el.more.profile.faculty} value={account.faculty} />
          {account.department !== account.faculty && (
            <ProfileRow label={el.more.profile.department} value={account.department} />
          )}
          <ProfileRow label={el.more.profile.semester} value={el.more.profile.semesterValue(account.year * 2 - 1)} />
          <ProfileRow label={el.more.profile.age} value={el.more.profile.ageValue(account.age)} />
        </dl>
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
        <p className="text-caption text-muted">{el.more.pointsHint}</p>
      </Card>

      <Card title={el.more.content.title}>
        <div className="flex items-center gap-3">
          <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold text-white ${university.badgeClass}`}>
            {university.shortName}
          </span>
          <div className="min-w-0">
            <p className="text-xs text-muted">{el.more.content.viewing}</p>
            <p className="text-caption font-semibold">{university.name}</p>
          </div>
        </div>
        <Button variant="secondary" onClick={() => setSwitching(true)}>
          {el.more.content.change}
        </Button>
      </Card>

      <Card title={el.settings.title}>
        <div className="flex flex-col gap-2">
          <p className="font-semibold">{el.settings.theme}</p>
          <div className="flex flex-wrap gap-2" role="group" aria-label={el.settings.theme}>
            {themeOptions.map((option) => (
              <Chip
                key={option}
                label={el.settings.themes[option]}
                active={preference === option}
                onClick={() => setPreference(option)}
              />
            ))}
          </div>
          <p className="text-caption text-muted">{el.settings.themeHint}</p>
          <p className="mt-2 text-caption font-medium">{el.settings.language}</p>
          <div className="flex gap-2" role="group" aria-label={el.settings.language}>
            <Chip label={el.settings.languageEl} active={lang === 'el'} onClick={() => setLang('el')} />
            <Chip label={el.settings.languageEn} active={lang === 'en'} onClick={() => setLang('en')} />
          </div>
        </div>
        <Toggle
          label={el.settings.allUniversities}
          description={el.settings.allUniversitiesHint}
          checked={showAll}
          onChange={setShowAll}
        />
        <div className="flex flex-col gap-2">
          <Button variant="secondary" onClick={() => setConfirmReset(true)}>
            {el.more.reset.open}
          </Button>
          <p className="text-caption text-muted">{el.more.reset.hint}</p>
        </div>
      </Card>

      <Card title={el.agent.title}>
        <p className="text-caption text-muted">{el.agent.moreHint}</p>
        <Button onClick={() => void onHearDemo()} disabled={voiceState === 'loading'}>
          {voiceState === 'loading' ? el.agent.preparing : el.agent.hearDemo}
        </Button>
        {voiceError ? <p className="text-caption text-error">{voiceError}</p> : null}
      </Card>

      <Card title={el.more.roadmap.title}>
        <p className="text-caption text-muted">{el.more.roadmap.intro}</p>
        <ul className="flex flex-wrap gap-2">
          {el.more.roadmap.items.map((item) => (
            <li key={item} className="rounded-full bg-surface px-3 py-1.5 text-caption text-muted">
              {item}
            </li>
          ))}
        </ul>
      </Card>

      <Card title={el.more.credits.title}>
        <ul className="flex flex-col gap-1 text-caption text-muted">
          {universities.map((u) => (
            <li key={u.id}>{el.more.credits.campus(u.shortName, u.photoCredit)}</li>
          ))}
          <li>{el.more.credits.faces}</li>
          <li>{el.more.credits.illustrations}</li>
        </ul>
      </Card>

      <Button variant="secondary" onClick={logout}>
        {el.account.logout}
      </Button>

      {verifying && <VerifySheet onClose={() => setVerifying(false)} />}
      {switching && <UniversitySwitcher onClose={() => setSwitching(false)} />}
      {confirmReset && (
        <Sheet title={el.more.reset.confirmTitle} onClose={() => setConfirmReset(false)}>
          <p className="text-caption text-muted">{el.more.reset.hint}</p>
          <Button onClick={resetDemoData}>{el.more.reset.confirm}</Button>
        </Sheet>
      )}
    </>
  )
}
