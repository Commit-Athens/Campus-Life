import { useState } from 'react'
import { Megaphone } from 'lucide-react'
import { Button } from '../components/Button'
import { Chip } from '../components/Chip'
import { EmptyState } from '../components/EmptyState'
import { FeedCard } from '../components/FeedCard'
import { PageTitle } from '../components/PageTitle'
import { announcements } from '../data/announcements'
import { forUniversity, getUniversity } from '../data/universities'
import { useUniversity } from '../hooks/useUniversity'
import { el } from '../i18n/el'
import { relativeTime } from '../i18n/relativeTime'
import type { AnnouncementCategory } from '../types'

type Filter = 'all' | AnnouncementCategory

const filters: Filter[] = ['all', 'announcement', 'rooms', 'school']

export default function Feed() {
  const { university } = useUniversity()
  const [filter, setFilter] = useState<Filter>('all')

  const items = forUniversity(announcements, university.id)
    .filter((item) => filter === 'all' || item.category === filter)
    .sort((a, b) => a.minutesAgo - b.minutesAgo)

  return (
    <>
      <PageTitle>{el.pages.feed}</PageTitle>

      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
        {filters.map((f) => (
          <Chip key={f} label={el.feed.filters[f]} active={filter === f} onClick={() => setFilter(f)} />
        ))}
      </div>

      <p className="text-caption text-muted">{el.feed.sampleNotice}</p>

      {items.length === 0 ? (
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
          {items.map((item) => (
            <FeedCard
              key={item.id}
              source={item.source}
              time={relativeTime(item.minutesAgo)}
              label={el.feed.filters[item.category]}
              title={item.title}
              body={item.body}
              sourceUrl={item.universityId === 'all' ? undefined : getUniversity(item.universityId).homepage}
            />
          ))}
        </div>
      )}
    </>
  )
}
