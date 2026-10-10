import { useState } from 'react'
import { Megaphone } from 'lucide-react'
import { Button } from '../components/Button'
import { CardActions } from '../components/CardActions'
import { Chip } from '../components/Chip'
import { EmptyState } from '../components/EmptyState'
import { FeedCard } from '../components/FeedCard'
import { SpeakButton } from '../components/SpeakButton'
import { PageTitle } from '../components/PageTitle'
import { announcements } from '../data/announcements'
import { universitySources } from '../data/sources'
import { getUniversity } from '../data/universities'
import { useComments } from '../hooks/useComments'
import { useFeedScope } from '../hooks/useFeedScope'
import { useUniversity } from '../hooks/useUniversity'
import { useVotes } from '../hooks/useVotes'
import { el } from '../i18n/el'
import { relativeTime } from '../i18n/relativeTime'
import type { AnnouncementCategory } from '../types'

type Filter = 'all' | AnnouncementCategory

const filters: Filter[] = ['all', 'announcement', 'rooms', 'school', 'web']

/** Official feed: university announcements plus info collected from the web. */
export default function Feed() {
  const [filter, setFilter] = useState<Filter>('all')
  const { showAll, scope, withUniversity } = useFeedScope()
  const { university } = useUniversity()
  const { votes, vote } = useVotes()
  const { commentsFor, addComment } = useComments()

  const showSources = filter === 'web'
  const sources = universitySources.filter((source) => showAll || source.universityId === university.id)
  const webItems = scope(announcements).filter((item) => item.category === 'web')

  const items = scope(announcements)
    .filter((item) => item.category !== 'web' && (filter === 'all' || item.category === filter))
    .sort((a, b) => a.minutesAgo - b.minutesAgo)

  return (
    <>
      <PageTitle>{el.pages.feed}</PageTitle>

      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
        {filters.map((f) => (
          <Chip key={f} label={el.feed.filters[f]} active={filter === f} onClick={() => setFilter(f)} />
        ))}
      </div>

      <p className="text-caption text-muted">
        {filter === 'web' ? el.feed.webNotice : el.feed.sampleNotice}
      </p>

      {showSources && (
        <div className="flex flex-col gap-4">
          <h2 className="text-h3">{el.sources.title}</h2>
          <p className="text-caption text-muted">{el.sources.demo}</p>
          {sources.map((source) => {
            const uni = getUniversity(source.universityId)
            const cards = webItems.filter((item) => item.universityId === source.universityId)
            return (
              <article key={source.universityId} className="flex flex-col gap-3 rounded-2xl bg-white p-4 ring-1 ring-surface">
                <div className="flex items-start gap-2">
                  <div className="min-w-0 flex-1">
                  <h3 className="text-h3">{uni.shortName}</h3>
                  <p className="text-caption text-muted">{el.sources.updated(relativeTime(source.updatedMinutesAgo))}</p>
                  <p className="mt-2">{source.blurb}</p>
                  </div>
                  <SpeakButton text={`${uni.shortName}. ${source.blurb}`} label={uni.shortName} />
                </div>
                <div>
                  <a href={uni.homepage} target="_blank" rel="noreferrer" className="mt-2 inline-flex min-h-11 items-center font-semibold text-primary">
                    {el.sources.homepage(uni.shortName)}
                  </a>
                </div>
                {cards.map((item) => (
                  <div key={item.id} className="flex items-start gap-2 rounded-2xl bg-page p-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-caption text-muted">{el.sources.items}</p>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-caption">{item.body}</p>
                    </div>
                    <SpeakButton text={`${item.title}. ${item.body}`} label={item.title} />
                  </div>
                ))}
              </article>
            )
          })}
        </div>
      )}

      {items.length === 0 && filter !== 'web' ? (
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
                <CardActions
                  useful={item.useful}
                  notUseful={item.notUseful}
                  vote={votes[item.id]}
                  onVote={(choice) => vote(item.id, choice)}
                  comments={commentsFor(item.id)}
                  onComment={(body) => addComment(item.id, body)}
                />
              }
            />
          ))}
        </div>
      )}
    </>
  )
}
