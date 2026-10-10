import { useState } from 'react'
import { MapPin, MessageCircle } from 'lucide-react'
import { CreatePostSheet, type NewPost } from '../components/CreatePostSheet'
import { Button } from '../components/Button'
import { CardActions } from '../components/CardActions'
import { Chip, Tag } from '../components/Chip'
import { EmptyState } from '../components/EmptyState'
import { FeedCard } from '../components/FeedCard'
import { PageTitle } from '../components/PageTitle'
import { lostFound } from '../data/lostFound'
import { studentPosts } from '../data/studentPosts'
import { useAuth } from '../hooks/useAuth'
import { useComments } from '../hooks/useComments'
import { useFeedScope } from '../hooks/useFeedScope'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { usePoints } from '../hooks/usePoints'
import { useUniversity } from '../hooks/useUniversity'
import { useVotes } from '../hooks/useVotes'
import { el } from '../i18n/el'
import { relativeTime } from '../i18n/relativeTime'
import type { LostFoundItem, StudentPost, UserPost } from '../types'

type Filter = 'all' | 'posts' | 'lostFound'

type Entry = { kind: 'post'; item: StudentPost } | { kind: 'lostFound'; item: LostFoundItem }

const filters: Filter[] = ['all', 'posts', 'lostFound']

const minutesSince = (time: number) => Math.max(0, Math.floor((Date.now() - time) / 60000))

/** A post the user wrote, shaped like the sample data so it renders with the same cards. */
function toEntry(p: UserPost): Entry {
  const base = {
    id: p.id,
    universityId: p.universityId,
    author: p.author,
    minutesAgo: minutesSince(p.createdAt),
    body: p.body,
    useful: 0,
    notUseful: 0,
  }
  return p.kind === 'post'
    ? {
        kind: 'post',
        item: { ...base, department: p.department, tags: p.tags },
      }
    : {
        kind: 'lostFound',
        item: {
          ...base,
          kind: p.kind,
          title: p.title ?? '',
          location: p.location ?? '',
        },
      }
}

/** Student-sourced feed: posts plus Lost & Found. */
export default function Posts() {
  const [filter, setFilter] = useState<Filter>('all')
  const { showAll, scope, withUniversity } = useFeedScope()
  const { university } = useUniversity()
  const { account } = useAuth()
  const { award } = usePoints()
  const [myPosts, setMyPosts] = useLocalStorage<UserPost[]>('campuslife.myPosts', [])
  const [creating, setCreating] = useState(false)
  const { votes, vote } = useVotes()
  const { commentsFor, addComment } = useComments()

  const mine = myPosts
    .filter((p) => showAll || p.universityId === university.id)
    .map(toEntry)
    .filter((e) => filter === 'all' || (filter === 'posts' ? e.kind === 'post' : e.kind === 'lostFound'))

  const entries: Entry[] = [
    ...mine,
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

      <Button onClick={() => setCreating(true)}>{el.createPost.open}</Button>

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
                image={item.image ? { src: item.image, alt: item.imageAlt ?? item.title } : undefined}
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
      {creating && (
        <CreatePostSheet
          onClose={() => setCreating(false)}
          onSubmit={(post: NewPost) => {
            const id = `mine-${Date.now()}`
            setMyPosts((prev) => [
              {
                ...post,
                id,
                universityId: university.id,
                author: account?.name ?? el.comments.you,
                department: account?.department ?? '',
                createdAt: Date.now(),
              },
              ...prev,
            ])
            setFilter(post.kind === 'post' ? 'posts' : 'lostFound')
            award(`post:${id}`)
          }}
        />
      )}
    </>
  )
}
