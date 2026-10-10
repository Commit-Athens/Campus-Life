import { BookOpen, Bus, ChevronRight, Star, Utensils, type LucideIcon } from 'lucide-react'
import { useState } from 'react'
import { Button, ButtonLink } from '../../components/Button'
import { SpeakButton } from '../../components/SpeakButton'
import { Chip } from '../../components/Chip'
import { EmptyState } from '../../components/EmptyState'
import { IconCircle, type Tone } from '../../components/IconCircle'
import { ListRow } from '../../components/ListRow'
import { SearchInput } from '../../components/SearchInput'
import { Sheet } from '../../components/Sheet'
import { benefits } from '../../data/benefits'
import { forUniversity } from '../../data/universities'
import { useUniversity } from '../../hooks/useUniversity'
import { el } from '../../i18n/el'
import type { Benefit, BenefitCategory } from '../../types'

type Filter = 'all' | Exclude<BenefitCategory, 'other'>

const filters: Filter[] = ['all', 'transport', 'food', 'books']

const categoryStyle: Record<BenefitCategory, { icon: LucideIcon; tone: Tone }> = {
  transport: { icon: Bus, tone: 'primary' },
  food: { icon: Utensils, tone: 'success' },
  books: { icon: BookOpen, tone: 'warning' },
  other: { icon: Star, tone: 'primary' },
}

function FeaturedBanner({ benefit, onOpen }: { benefit: Benefit; onOpen: () => void }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-primary-soft p-5">
      <div className="min-w-0 flex-1">
        <p className="text-caption font-semibold text-primary">{el.benefits.featured}</p>
        <h2 className="text-h3">{benefit.title}</h2>
        <p className="text-caption text-muted">{benefit.description}</p>
      </div>
      <SpeakButton text={`${benefit.title}. ${benefit.description}. ${benefit.details}`} label={benefit.title} />
      <button
        type="button"
        onClick={onOpen}
        aria-label={el.benefits.open(benefit.title)}
        className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-primary/90"
      >
        <ChevronRight className="size-6" strokeWidth={2} aria-hidden />
      </button>
    </div>
  )
}

/** Hub section: student benefits with search, category chips and a featured banner. */
export function BenefitsSection() {
  const { university } = useUniversity()
  const [filter, setFilter] = useState<Filter>('all')
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState<Benefit | null>(null)

  const q = query.trim().toLocaleLowerCase('el')
  const matching = forUniversity(benefits, university.id).filter(
    (b) =>
      (filter === 'all' || b.category === filter) &&
      (q === '' || `${b.title} ${b.description}`.toLocaleLowerCase('el').includes(q)),
  )
  const featured = matching.find((b) => b.featured)
  const rows = matching.filter((b) => !b.featured)

  const clearFilters = () => {
    setFilter('all')
    setQuery('')
  }

  return (
    <>
      <SearchInput value={query} onChange={setQuery} />

      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
        {filters.map((f) => (
          <Chip key={f} label={el.benefits.categories[f]} active={filter === f} onClick={() => setFilter(f)} />
        ))}
      </div>

      {featured && <FeaturedBanner benefit={featured} onOpen={() => setOpen(featured)} />}

      {matching.length === 0 ? (
        <EmptyState
          title={el.common.noResults}
          description={el.common.noResultsHint}
          action={<Button onClick={clearFilters}>{el.common.clearFilters}</Button>}
        />
      ) : (
        <div className="flex flex-col gap-3">
          {rows.map((b) => (
            <ListRow
              key={b.id}
              icon={categoryStyle[b.category].icon}
              tone={categoryStyle[b.category].tone}
              title={b.title}
              description={b.description}
              onClick={() => setOpen(b)}
            />
          ))}
        </div>
      )}

      <p className="text-caption text-muted">{el.benefits.sampleNotice}</p>

      {open && (
        <Sheet title={open.title} onClose={() => setOpen(null)}>
          <div className="flex items-center gap-3">
            <IconCircle icon={categoryStyle[open.category].icon} tone={categoryStyle[open.category].tone} />
            <span className="text-caption font-semibold text-muted">{el.benefits.categories[open.category]}</span>
          </div>
          <div className="flex items-start gap-2">
            <p className="min-w-0 flex-1">{open.details}</p>
            <SpeakButton text={`${open.title}. ${open.details}`} label={open.title} />
          </div>
          <p className="text-caption text-muted">{el.benefits.sampleNotice}</p>
          <ButtonLink href={university.homepage}>{el.benefits.visitSite(university.shortName)}</ButtonLink>
        </Sheet>
      )}
    </>
  )
}
