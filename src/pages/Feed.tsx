import { useState } from 'react'
import { MapPin, Megaphone } from 'lucide-react'
import { Button } from '../components/Button'
import { Chip, Tag } from '../components/Chip'
import { EmptyState } from '../components/EmptyState'
import { FeedCard } from '../components/FeedCard'
import { PageTitle } from '../components/PageTitle'
import { Toggle } from '../components/Toggle'
import { announcements } from '../data/announcements'
import { lostFound } from '../data/lostFound'
import { studentPosts } from '../data/studentPosts'
import { forUniversity, getUniversity } from '../data/universities'
import { useUniversity } from '../hooks/useUniversity'
import { el } from '../i18n/el'
import { relativeTime } from '../i18n/relativeTime'
import type { Announcement, AnnouncementCategory, LostFoundItem, Scoped, StudentPost, UniversityScope } from '../types'

type Filter = 'all' | AnnouncementCategory | 'posts' | 'lostFound'

type FeedItem =
  | { kind: 'announcement'; item: Announcement }
  | { kind: 'post'; item: StudentPost }
  | { kind: 'lostFound'; item: LostFoundItem }

const filters: Filter[] = ['all', 'announcement', 'rooms', 'school', 'posts', 'lostFound']

function matches(entry: FeedItem, filter: Filter): boolean {
  if (filter === 'all') return true
  if (filter === 'posts') return entry.kind === 'post'
  if (filter === 'lostFound') return entry.kind === 'lostFound'
  return entry.kind === 'announcement' && entry.item.category === filter
}

function universityLabel(id: UniversityScope): string {
  return id === 'all' ? el.feed.shared : getUniversity(id).shortName
}

export default function Feed() {
  const { university } = useUniversity()
  const [filter, setFilter] = useState<Filter>('all')
  const [showAll, setShowAll] = useState(false)

  const scope = <T extends Scoped>(items: T[]): T[] => (showAll ? items : forUniversity(items, university.id))

  const entries: FeedItem[] = [
    ...scope(announcements).map((item): FeedItem => ({ kind: 'announcement', item })),
    ...scope(studentPosts).map((item): FeedItem => ({ kind: 'post', item })),
    ...scope(lostFound).map((item): FeedItem => ({ kind: 'lostFound', item })),
  ]
    .filter((entry) => matches(entry, filter))
    .sort((a, b) => a.item.minutesAgo - b.item.minutesAgo)

  /** "ΕΜΠ · Σχολή" when showing every university, otherwise just the label. */
  const withUniversity = (id: UniversityScope, label: string) =>
    showAll || id === 'all' ? `${universityLabel(id)} · ${label}` : label

  return (
    <>
      <PageTitle>{el.pages.feed}</PageTitle>

      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
        {filters.map((f) => (
          <Chip key={f} label={el.feed.filters[f]} active={filter === f} onClick={() => setFilter(f)} />
        ))}
      </div>

      <Toggle
        label={el.feed.allUniversities}
        description={el.feed.allUniversitiesHint}
        checked={showAll}
        onChange={setShowAll}
      />

      <p className="text-caption text-muted">{el.feed.sampleNotice}</p>

      {entries.length === 0 ? (
        <EmptyState
          icon={Megaphone}
          title={el.feed.empty}
          description={el.feed.emptyHint}
          action={
            filter !== 'all' && (
              <Button variant="secondary" onClick={() => setFilter('all')}>
                {el.common.clearFilters}
              </Button>
            )
          }
        />
      ) : (
        <div className="flex flex-col gap-4">
          {entries.map((entry) => {
            const { item } = entry
            const time = relativeTime(item.minutesAgo)

            if (entry.kind === 'announcement') {
              const a = entry.item
              return (
                <FeedCard
                  key={a.id}
                  source={a.source}
                  time={time}
                  label={withUniversity(a.universityId, el.feed.filters[a.category])}
                  title={a.title}
                  body={a.body}
                  sourceUrl={a.universityId === 'all' ? undefined : getUniversity(a.universityId).homepage}
                />
              )
            }

            if (entry.kind === 'post') {
              const p = entry.item
              return (
                <FeedCard
                  key={p.id}
                  source={p.author}
                  time={time}
                  label={withUniversity(p.universityId, p.department)}
                  body={p.body}
                >
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((tag) => (
                      <Tag key={tag} label={tag} />
                    ))}
                  </div>
                </FeedCard>
              )
            }

            const lf = entry.item
            return (
              <FeedCard
                key={lf.id}
                source={lf.author}
                time={time}
                label={withUniversity(lf.universityId, el.feed.filters.lostFound)}
                title={lf.title}
                body={lf.body}
                image={{ src: lf.image, alt: lf.imageAlt }}
              >
                <div className="flex flex-wrap items-center gap-2 text-caption">
                  <span
                    className={`rounded-full px-3 py-1 font-semibold ${
                      lf.kind === 'lost' ? 'bg-warning-soft text-warning' : 'bg-success-soft text-success'
                    }`}
                  >
                    {lf.kind === 'lost' ? el.feed.lost : el.feed.found}
                  </span>
                  <span className="flex items-center gap-1 text-muted">
                    <MapPin className="size-4" strokeWidth={2} aria-hidden />
                    {lf.location}
                  </span>
                </div>
              </FeedCard>
            )
          })}
        </div>
      )}
    </>
  )
}
