import { useRef, useState } from 'react'
import { ClipboardList, Globe, LayoutGrid, MapPin, Megaphone, School, Users } from 'lucide-react'
import { Link } from 'react-router'
import { Button } from '../components/Button'
import { CardActions } from '../components/CardActions'
import { EmptyState } from '../components/EmptyState'
import { FeedCard } from '../components/FeedCard'
import { SpeakButton } from '../components/SpeakButton'
import { announcements } from '../data/announcements'
import { universitySources } from '../data/sources'
import { getUniversity } from '../data/universities'
import { useAuth } from '../hooks/useAuth'
import { useComments } from '../hooks/useComments'
import { useFeedScope } from '../hooks/useFeedScope'
import { useUniversity } from '../hooks/useUniversity'
import { useVotes } from '../hooks/useVotes'
import { el } from '../i18n/el'
import { relativeTime } from '../i18n/relativeTime'
import type { AnnouncementCategory } from '../types'

type Filter = 'all' | AnnouncementCategory

const filters: { id: Filter; icon: typeof Megaphone }[] = [
  { id: 'all', icon: LayoutGrid },
  { id: 'announcement', icon: Megaphone },
  { id: 'rooms', icon: MapPin },
  { id: 'school', icon: School },
  { id: 'web', icon: Globe },
]

const startCards = [
  { to: '/hub?section=checklist', label: () => el.feed.startChecklist, icon: ClipboardList, accent: false },
  { to: '/community', label: () => el.feed.startGroups, icon: Users, accent: false },
] as const

/** Official feed home: greeting, shortcuts, rails, then university announcements. */
export default function Feed() {
  const [filter, setFilter] = useState<Filter>('all')
  const { showAll, scope, withUniversity } = useFeedScope()
  const { university } = useUniversity()
  const { account } = useAuth()
  const { votes, vote } = useVotes()
  const { commentsFor, addComment } = useComments()
  const cardRefs = useRef<Record<string, HTMLElement | null>>({})

  const showSources = filter === 'web'
  const sources = universitySources.filter((source) => showAll || source.universityId === university.id)
  const webItems = scope(announcements).filter((item) => item.category === 'web')

  const scoped = scope(announcements)
  const popular = [...scoped].sort((a, b) => a.minutesAgo - b.minutesAgo).slice(0, 6)

  const items = scoped
    .filter((item) => item.category !== 'web' && (filter === 'all' || item.category === filter))
    .sort((a, b) => a.minutesAgo - b.minutesAgo)

  const firstName = account?.name.split(' ')[0] ?? ''

  const scrollToCard = (id: string) => {
    const category = announcements.find((a) => a.id === id)?.category
    if (category === 'web') setFilter('web')
    else if (category && filter !== 'all' && filter !== category) setFilter('all')
    window.requestAnimationFrame(() => {
      cardRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    })
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <p className="min-h-11 flex-1 rounded-full bg-night px-4 py-2.5 text-caption font-semibold text-white">
          {el.feed.greeting(firstName)}
        </p>
        <Link
          to="/more"
          aria-label={account ? `${el.header.profile}, ${el.more.profile.ageValue(account.age)}` : el.header.profile}
          className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary-soft text-caption font-semibold text-primary"
        >
          {account?.age}
        </Link>
      </div>

      <h1 className="text-h1">{el.feed.headline(university.shortName)}</h1>

      <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1" role="toolbar" aria-label={el.pages.feed}>
        {filters.map(({ id, icon: Icon }) => {
          const active = filter === id
          return (
            <button
              key={id}
              type="button"
              onClick={() => setFilter(id)}
              aria-pressed={active}
              className="flex min-w-16 flex-col items-center gap-2"
            >
              <span
                className={`flex size-14 items-center justify-center rounded-full ring-1 transition-colors ${
                  active ? 'bg-primary text-white ring-primary' : 'bg-card text-ink ring-surface'
                }`}
              >
                <Icon className="size-6" strokeWidth={1.75} aria-hidden />
              </span>
              <span className={`text-xs font-medium ${active ? 'text-primary' : 'text-muted'}`}>
                {el.feed.filters[id]}
              </span>
            </button>
          )
        })}
      </div>

      {popular.length > 0 && (
        <section className="flex flex-col gap-3">
          <h2 className="text-h3">{el.feed.popularToday}</h2>
          <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1">
            {popular.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToCard(item.id)}
                className="flex w-56 shrink-0 snap-start flex-col gap-2 rounded-2xl bg-card p-4 text-left ring-1 ring-surface"
              >
                <p className="text-caption text-muted">
                  {item.source} · {relativeTime(item.minutesAgo)}
                </p>
                <p className="line-clamp-3 font-semibold text-ink">{item.title}</p>
              </button>
            ))}
          </div>
        </section>
      )}

      <section className="flex flex-col gap-3">
        <h2 className="text-h3">{el.feed.startHere}</h2>
        <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1">
          {startCards.map(({ to, label, icon: Icon, accent }) => (
            <Link
              key={to}
              to={to}
              className={`flex h-36 w-40 shrink-0 snap-start flex-col justify-between rounded-2xl p-4 ${
                accent ? 'bg-primary text-white' : 'bg-card text-ink ring-1 ring-surface'
              }`}
            >
              <span
                className={`flex size-11 items-center justify-center rounded-full ${
                  accent ? 'bg-white/20 text-white' : 'bg-primary-soft text-primary'
                }`}
              >
                <Icon className="size-5" strokeWidth={1.75} aria-hidden />
              </span>
              <span className="text-h3 font-semibold">{label()}</span>
            </Link>
          ))}
        </div>
      </section>

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
              <article
                key={source.universityId}
                ref={(node) => {
                  for (const card of cards) cardRefs.current[card.id] = node
                }}
                className="flex flex-col gap-3 overflow-hidden rounded-2xl bg-card p-4 ring-1 ring-surface"
              >
                <img src={uni.photo} alt={el.sources.photoAlt(uni.name)} className="-mx-4 -mt-4 aspect-[5/2] w-[calc(100%+2rem)] max-w-none object-cover" />
                <div className="flex items-start gap-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-h3">{uni.shortName}</h3>
                    <p className="text-caption text-muted">{el.sources.updated(relativeTime(source.updatedMinutesAgo))}</p>
                    <p className="mt-2">{source.blurb}</p>
                  </div>
                  <SpeakButton text={`${uni.shortName}. ${source.blurb}`} label={uni.shortName} />
                </div>
                <div>
                  <a
                    href={uni.homepage}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex min-h-11 items-center font-semibold text-primary"
                  >
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
            <div
              key={item.id}
              ref={(node) => {
                cardRefs.current[item.id] = node
              }}
            >
              <FeedCard
                source={item.source}
                avatarSrc={item.universityId === 'all' ? undefined : getUniversity(item.universityId).photo}
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
            </div>
          ))}
        </div>
      )}
    </>
  )
}
