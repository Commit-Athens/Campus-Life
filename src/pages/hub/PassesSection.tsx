import { BookOpen, Coffee, Gift, Dumbbell, Settings, Utensils, type LucideIcon } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../../components/Button'
import { EmptyState } from '../../components/EmptyState'
import { IconCircle, type Tone } from '../../components/IconCircle'
import { ProgressBar } from '../../components/ProgressBar'
import { Sheet } from '../../components/Sheet'
import { passCode, passes } from '../../data/passes'
import { forUniversity } from '../../data/universities'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { usePoints } from '../../hooks/usePoints'
import { useUniversity } from '../../hooks/useUniversity'
import { el } from '../../i18n/el'
import type { PartnerPass, PassCategory } from '../../types'

const categoryStyle: Record<PassCategory, { icon: LucideIcon; tone: Tone }> = {
  cafe: { icon: Coffee, tone: 'warning' },
  food: { icon: Utensils, tone: 'success' },
  books: { icon: BookOpen, tone: 'primary' },
  gym: { icon: Dumbbell, tone: 'error' },
  services: { icon: Settings, tone: 'primary' },
}

/** Hub section: fictional partner passes; claimed passes persist and show a demo code. */
export function PassesSection() {
  const { university } = useUniversity()
  const { award } = usePoints()
  const [claimed, setClaimed] = useLocalStorage<string[]>('campuslife.passes', [])
  const [open, setOpen] = useState<PartnerPass | null>(null)

  const items = forUniversity(passes, university.id)
  const claimedCount = items.filter((p) => claimed.includes(p.id)).length

  const toggleClaim = (pass: PartnerPass) => {
    const isClaimed = claimed.includes(pass.id)
    setClaimed((prev) => (isClaimed ? prev.filter((id) => id !== pass.id) : [...prev, pass.id]))
    if (!isClaimed) award(`pass:${pass.id}`)
  }

  return (
    <section className="flex flex-col gap-3">
      <div>
        <h2 className="text-h3">{el.passes.title}</h2>
        <p className="text-caption text-muted">{el.passes.intro}</p>
      </div>

      {items.length === 0 ? (
        <EmptyState icon={Gift} title={el.passes.empty} description={el.passes.emptyHint} />
      ) : (
        <>
          <div className="flex flex-col gap-2 rounded-2xl bg-white p-4 ring-1 ring-surface">
            <p className="font-semibold">{el.passes.count(claimedCount, items.length)}</p>
            <ProgressBar value={claimedCount} max={items.length} label={el.passes.title} />
          </div>

          <ul className="flex flex-col gap-3">
            {items.map((pass) => {
              const style = categoryStyle[pass.category]
              const isClaimed = claimed.includes(pass.id)
              return (
                <li key={pass.id}>
                  <button
                    type="button"
                    onClick={() => setOpen(pass)}
                    className="flex min-h-16 w-full items-center gap-3 rounded-2xl bg-white p-3 text-left shadow-sm ring-1 ring-surface transition-colors hover:bg-page"
                  >
                    <IconCircle icon={style.icon} tone={style.tone} />
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold">{pass.partner}</span>
                      <span className="block text-caption text-ink">{pass.offer}</span>
                      <span className="block text-xs text-muted">
                        {pass.area} · {el.passes.sample}
                      </span>
                    </span>
                    {isClaimed && (
                      <span className="shrink-0 rounded-full bg-success-soft px-3 py-1 text-xs font-semibold text-success">
                        {el.passes.claimed}
                      </span>
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        </>
      )}

      <p className="text-caption text-muted">{el.passes.demoNotice}</p>

      {open && (
        <Sheet title={open.partner} onClose={() => setOpen(null)}>
          <div className="flex items-center gap-3">
            <IconCircle icon={categoryStyle[open.category].icon} tone={categoryStyle[open.category].tone} />
            <div className="min-w-0">
              <p className="font-semibold">{open.offer}</p>
              <p className="text-caption text-muted">
                {el.passes.categories[open.category]} · {open.area} · {el.passes.sample}
              </p>
            </div>
          </div>
          <p className="text-caption">
            <span className="font-semibold">{el.passes.terms}: </span>
            {open.terms}
          </p>
          {claimed.includes(open.id) ? (
            <>
              <div className="flex flex-col items-center gap-1 rounded-2xl border-2 border-dashed border-primary bg-primary-soft p-4">
                <p className="text-caption text-muted">{el.passes.showCode}</p>
                <p className="font-mono text-h2 tracking-wider text-primary">{passCode(open)}</p>
              </div>
              <Button variant="secondary" onClick={() => toggleClaim(open)}>
                {el.passes.unclaim}
              </Button>
            </>
          ) : (
            <Button onClick={() => toggleClaim(open)}>{el.passes.claim}</Button>
          )}
          <p className="text-caption text-muted">{el.passes.demoNotice}</p>
        </Sheet>
      )}
    </section>
  )
}
