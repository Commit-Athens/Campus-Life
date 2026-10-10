import { useState } from 'react'
import { MapPin, MessageCircle } from 'lucide-react'
import { Button } from '../components/Button'
import { CardActions } from '../components/CardActions'
import { Chip, Tag } from '../components/Chip'
import { EmptyState } from '../components/EmptyState'
import { FeedCard } from '../components/FeedCard'
import { PageTitle } from '../components/PageTitle'
import { Toggle } from '../components/Toggle'
import { lostFound } from '../data/lostFound'
import { studentPosts } from '../data/studentPosts'
import { useComments } from '../hooks/useComments'
import { useFeedScope } from '../hooks/useFeedScope'
import { useVotes } from '../hooks/useVotes'
import { el } from '../i18n/el'
import { relativeTime } from '../i18n/relativeTime'
import type { LostFoundItem, StudentPost } from '../types'

type Filter = 'all' | 'posts' | 'lostFound'

type Entry = { kind: 'post'; item: StudentPost } | { kind: 'lostFound'; item: LostFoundItem }

const filters: Filter[] = ['all', 'posts', 'lostFound']

/** Student-sourced feed: posts plus Lost & Found. */
export default function Posts() {
  const [filter, setFilter] = useState<Filter>('all')
  const { showAll, setShowAll, scope, withUniversity } = useFeedScope()
  const { votes, vote } = useVotes()
  const { commentsFor, addComment } = useComments()

  const entries: Entry[] = [
    ...(filter !== 'lostFound' ? scope(studentPosts).map((item): Entry => ({ kind: 'post', item })) : []),
    ...(filter !== 'posts' ? scope(lostFound).map((item): Entry => ({ kind: 'lostFound', item })) : []),
  ].sort((a, b) => a.item.minutesAgo - b.item.minutesAgo)

  return (
    <>
      <PageTitle>{el.pages.posts}</PageTitle>

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

      <p className="text-caption text-muted">{el.feed.postsNotice}</p>

      {entries.length === 0 ? (
        <EmptyState
          icon={MessageCircle}
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
          {entries.map(({ kind, item }) => {
            const actions = (
              <CardActions
                useful={item.useful}
                notUseful={item.notUseful}
                vote={votes[item.id]}
                onVote={(choice) => vote(item.id, choice)}
                comments={commentsFor(item.id)}
                onComment={(body) => addComment(item.id, body)}
              />
            )

            if (kind === 'post') {
              return (
                <FeedCard
                  key={item.id}
                  source={item.author}
                  time={relativeTime(item.minutesAgo)}
                  label={withUniversity(item.universityId, item.department)}
                  body={item.body}
                  footer={actions}
                >
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <Tag key={tag} label={tag} />
                    ))}
                  </div>
                </FeedCard>
              )
            }

            return (
              <FeedCard
                key={item.id}
                source={item.author}
                time={relativeTime(item.minutesAgo)}
                label={withUniversity(item.universityId, el.feed.filters.lostFound)}
                title={item.title}
                body={item.body}
                image={{ src: item.image, alt: item.imageAlt }}
                footer={actions}
              >
                <div className="flex flex-wrap items-center gap-2 text-caption">
                  <span
                    className={`rounded-full px-3 py-1 font-semibold ${
                      item.kind === 'lost' ? 'bg-warning-soft text-warning' : 'bg-success-soft text-success'
                    }`}
                  >
                    {item.kind === 'lost' ? el.feed.lost : el.feed.found}
                  </span>
                  <span className="flex items-center gap-1 text-muted">
                    <MapPin className="size-4" strokeWidth={2} aria-hidden />
                    {item.location}
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
