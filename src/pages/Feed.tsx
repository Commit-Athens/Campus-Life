import { useState } from 'react'
import { Megaphone } from 'lucide-react'
import { Button } from '../components/Button'
import { Chip } from '../components/Chip'
import { EmptyState } from '../components/EmptyState'
import { FeedCard } from '../components/FeedCard'
import { PageTitle } from '../components/PageTitle'
import { Toggle } from '../components/Toggle'
import { VoteButtons } from '../components/VoteButtons'
import { announcements } from '../data/announcements'
import { getUniversity } from '../data/universities'
import { useFeedScope } from '../hooks/useFeedScope'
import { useVotes } from '../hooks/useVotes'
import { el } from '../i18n/el'
import { relativeTime } from '../i18n/relativeTime'
import type { AnnouncementCategory } from '../types'

type Filter = 'all' | AnnouncementCategory

const filters: Filter[] = ['all', 'announcement', 'rooms', 'school', 'web']

/** Official feed: university announcements plus info collected from the web. */
export default function Feed() {
  const [filter, setFilter] = useState<Filter>('all')
  const { showAll, setShowAll, scope, withUniversity } = useFeedScope()
  const { votes, vote } = useVotes()

  const items = scope(announcements)
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

      <Toggle
        label={el.feed.allUniversities}
        description={el.feed.allUniversitiesHint}
        checked={showAll}
        onChange={setShowAll}
      />

      <p className="text-caption text-muted">
        {filter === 'web' ? el.feed.webNotice : el.feed.sampleNotice}
      </p>

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
              label={withUniversity(item.universityId, el.feed.filters[item.category])}
              title={item.title}
              body={item.body}
              sourceUrl={item.universityId === 'all' ? undefined : getUniversity(item.universityId).homepage}
              footer={
                <VoteButtons
                  useful={item.useful}
                  notUseful={item.notUseful}
                  current={votes[item.id]}
                  onVote={(choice) => vote(item.id, choice)}
                />
              }
            />
          ))}
        </div>
      )}
    </>
  )
}
