import { Briefcase, MapPin, Star } from 'lucide-react'
import { useState } from 'react'
import { ButtonLink } from '../../components/Button'
import { EmptyState } from '../../components/EmptyState'
import { ListRow } from '../../components/ListRow'
import { Sheet } from '../../components/Sheet'
import { opportunities } from '../../data/opportunities'
import { forUniversity } from '../../data/universities'
import { useUniversity } from '../../hooks/useUniversity'
import { el } from '../../i18n/el'
import { formatDayMonth } from '../../i18n/formatDate'
import type { Opportunity } from '../../types'

/** Hub section: internships and hackathons, with a detail sheet. */
export function OpportunitiesSection() {
  const { university } = useUniversity()
  const [open, setOpen] = useState<Opportunity | null>(null)

  const items = forUniversity(opportunities, university.id).sort((a, b) => a.deadline.localeCompare(b.deadline))
  const groups = [
    { title: el.opportunities.internships, kind: 'internship' as const, icon: Briefcase },
    { title: el.opportunities.hackathons, kind: 'hackathon' as const, icon: Star },
  ]

  return (
    <>
      {groups.map(({ title, kind, icon }) => {
        const list = items.filter((o) => o.kind === kind)
        return (
          <section key={kind} className="flex flex-col gap-3">
            <h2 className="text-h3">{title}</h2>
            {list.length === 0 ? (
              <EmptyState icon={icon} title={el.opportunities.empty} />
            ) : (
              list.map((o) => (
                <ListRow
                  key={o.id}
                  icon={icon}
                  tone={kind === 'internship' ? 'primary' : 'warning'}
                  title={o.title}
                  description={`${el.opportunities.deadline(formatDayMonth(o.deadline))} · ${o.organizer}`}
                  onClick={() => setOpen(o)}
                />
              ))
            )}
          </section>
        )
      })}

      <p className="text-caption text-muted">{el.opportunities.notice}</p>

      {open && (
        <Sheet title={open.title} onClose={() => setOpen(null)}>
          <p className="text-caption text-muted">{open.organizer}</p>
          <div className="flex flex-wrap items-center gap-2 text-caption">
            <span className="rounded-full bg-warning-soft px-3 py-1 font-semibold text-warning">
              {el.opportunities.deadline(formatDayMonth(open.deadline))}
            </span>
            <span className="flex items-center gap-1 text-muted">
              <MapPin className="size-4" strokeWidth={2} aria-hidden />
              {open.location}
            </span>
          </div>
          <p>{open.details}</p>
          <p className="text-caption text-muted">{el.opportunities.notice}</p>
          <ButtonLink href={university.homepage}>{el.links.homepageTitle(university.shortName)}</ButtonLink>
        </Sheet>
      )}
    </>
  )
}
