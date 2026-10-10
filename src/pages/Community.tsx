import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router'
import { Download, Home, MessageCircle, Plus, Users } from 'lucide-react'
import { Button } from '../components/Button'
import { SpeakButton } from '../components/SpeakButton'
import { Chip } from '../components/Chip'
import { EmptyState } from '../components/EmptyState'
import { PageTitle } from '../components/PageTitle'
import { SearchInput } from '../components/SearchInput'
import { Sheet } from '../components/Sheet'
import { sampleChat, chatChannels } from '../data/chat'
import { forumAliases, forumPosts } from '../data/forum'
import { studyGroups } from '../data/groups'
import { housingListings } from '../data/housing'
import { courseNotes } from '../data/notes'
import { useAuth } from '../hooks/useAuth'
import { useFeedScope } from '../hooks/useFeedScope'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { usePoints } from '../hooks/usePoints'
import { useUniversity } from '../hooks/useUniversity'
import { el } from '../i18n/el'
import { relativeTime } from '../i18n/relativeTime'
import type { ChatChannel, ChatMessage, ForumCategory, ForumPost, ForumReply, StudyGroup } from '../types'

type Section = 'groups' | 'notes' | 'housing' | 'forum' | 'chat'
const sections: Section[] = ['groups', 'notes', 'housing', 'forum', 'chat']
const forumFilters: Array<'all' | ForumCategory> = ['all', 'stress', 'housing', 'courses', 'money', 'other']
const SAMPLE_PDF = '/notes/sample.pdf'

function matches(query: string, ...parts: string[]) {
  const q = query.trim().toLocaleLowerCase('el')
  if (!q) return true
  return parts.join(' ').toLocaleLowerCase('el').includes(q)
}

/** Reads the verified flag once Track A adds it. Until then, chat stays locked. */
function useVerified() {
  const auth = useAuth()
  return Boolean((auth as { verified?: boolean }).verified)
}

export default function Community() {
  const [section, setSection] = useState<Section>('groups')
  const [query, setQuery] = useState('')
  const [course, setCourse] = useState('all')
  const [forumCategory, setForumCategory] = useState<'all' | ForumCategory>('all')
  const [channel, setChannel] = useState<ChatChannel>('general')
  const [creating, setCreating] = useState(false)
  const [preview, setPreview] = useState<(typeof courseNotes)[number] | null>(null)
  const [openPost, setOpenPost] = useState<string | null>(null)
  const { showAll, scope, withUniversity } = useFeedScope()
  const { university } = useUniversity()
  const { award } = usePoints()
  const verified = useVerified()
  const { account } = useAuth()

  const [joined, setJoined] = useLocalStorage<string[]>('campuslife.joins', [])
  const [mine, setMine] = useLocalStorage<StudyGroup[]>('campuslife.myGroups', [])
  const [extraPosts, setExtraPosts] = useLocalStorage<ForumPost[]>('campuslife.forum', [])
  const [extraReplies, setExtraReplies] = useLocalStorage<Record<string, ForumReply[]>>('campuslife.forumReplies', {})
  const [storedAlias, setAlias] = useLocalStorage<string | null>('campuslife.alias', null)
  const alias = storedAlias ?? forumAliases[0]
  useEffect(() => {
    if (storedAlias) return
    const pick = forumAliases[Math.floor(Math.random() * forumAliases.length)]
    setAlias(pick)
  }, [storedAlias, setAlias])
  const [chatExtra, setChatExtra] = useLocalStorage<Record<string, ChatMessage[]>>('campuslife.chat', {})

  const groups = [...scope(studyGroups), ...mine.filter((g) => showAll || g.universityId === university.id || g.universityId === 'all')]
    .filter((g) => matches(query, g.name, g.course))

  const notes = scope(courseNotes).filter(
    (n) => (course === 'all' || n.course === course) && matches(query, n.title, n.course),
  )
  const courses = [...new Set(scope(courseNotes).map((n) => n.course))]

  const listings = scope(housingListings).filter((h) => matches(query, h.title, h.area, h.description))

  const posts = [...extraPosts.filter((p) => showAll || p.universityId === university.id), ...scope(forumPosts)].filter(
    (p) => (forumCategory === 'all' || p.category === forumCategory) && matches(query, p.title, p.body),
  )

  const chatKey = `${university.id}:${channel}`
  const messages = useMemo(
    () => [...sampleChat(university.id, channel), ...(chatExtra[chatKey] ?? [])].sort((a, b) => b.minutesAgo - a.minutesAgo),
    [university.id, channel, chatExtra, chatKey],
  )

  const toggleJoin = (id: string) => {
    setJoined((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id)
      award(`join:${id}`)
      return [...prev, id]
    })
  }

  return (
    <>
      <div className="flex items-center justify-between gap-3">
        <PageTitle>{el.pages.community}</PageTitle>
        <button
          type="button"
          aria-label={el.community.add}
          onClick={() => setCreating(true)}
          className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-white"
        >
          <Plus className="size-6" strokeWidth={2} aria-hidden />
        </button>
      </div>

      <SearchInput value={query} onChange={setQuery} placeholder={el.community.search} />

      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
        {sections.map((s) => (
          <Chip key={s} label={el.community.sections[s]} active={section === s} onClick={() => setSection(s)} />
        ))}
      </div>

      <p className="text-caption text-muted">{el.community.sampleNotice}</p>

      {section === 'groups' && (
        <section className="flex flex-col gap-3">
          <h2 className="text-h3">{el.groups.title}</h2>
          {groups.length === 0 ? (
            <EmptyState title={el.groups.empty} description={el.common.noResultsHint} />
          ) : (
            groups.map((group) => {
              const on = joined.includes(group.id)
              const owned = mine.some((item) => item.id === group.id)
              const memberCount = group.members + (on && !owned ? 1 : 0)
              return (
                <article key={group.id} className="flex items-center gap-3 rounded-2xl bg-white p-3 ring-1 ring-surface">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
                    <Users className="size-5" strokeWidth={2} aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold">{group.name}</span>
                    <span className="block truncate text-caption text-muted">
                      {withUniversity(group.universityId, `${el.groups.members(memberCount)} · ${group.course}`)}
                    </span>
                    <span className="block text-caption text-muted">{group.nextSession}</span>
                  </span>
                  <SpeakButton
                    text={`${group.name}. ${group.course}. ${group.nextSession}`}
                    label={group.name}
                  />
                  <button
                    type="button"
                    aria-label={`${on ? el.groups.joined : el.groups.join}: ${group.name}`}
                    onClick={() => toggleJoin(group.id)}
                    className={`min-h-11 shrink-0 rounded-full px-4 text-caption font-semibold ${
                      on ? 'bg-success text-white' : 'bg-primary text-white'
                    }`}
                  >
                    {on ? el.groups.joined : el.groups.join}
                  </button>
                </article>
              )
            })
          )}
        </section>
      )}

      {section === 'notes' && (
        <section className="flex flex-col gap-3">
          <h2 className="text-h3">{el.notes.title}</h2>
          <label className="flex min-h-12 items-center gap-3 rounded-full bg-surface px-4">
            <span className="shrink-0 text-caption text-muted">{el.notes.course}</span>
            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="w-full bg-transparent text-body outline-none"
              aria-label={el.notes.course}
            >
              <option value="all">{el.notes.allCourses}</option>
              {courses.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          {notes.length === 0 ? (
            <EmptyState title={el.notes.empty} description={el.common.noResultsHint} />
          ) : (
            notes.map((note) => (
              <div key={note.id} className="flex items-center rounded-2xl bg-white pr-1 ring-1 ring-surface">
                <button
                  type="button"
                  onClick={() => setPreview(note)}
                  className="flex min-h-16 min-w-0 flex-1 items-center gap-3 p-3 text-left"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold">{note.title}</span>
                    <span className="block truncate text-caption text-muted">
                      {withUniversity(note.universityId, `${note.course} · ${el.notes.meta(note.pages)}`)}
                    </span>
                  </span>
                  <Download className="size-5 shrink-0 text-primary" strokeWidth={2} aria-hidden />
                </button>
                <SpeakButton text={`${note.title}. ${note.course}. ${el.notes.meta(note.pages)}`} label={note.title} />
              </div>
            ))
          )}
        </section>
      )}

      {section === 'housing' && (
        <section className="flex flex-col gap-3">
          <h2 className="text-h3">{el.housing.title}</h2>
          <p className="text-caption text-muted">{el.housing.sampleNotice}</p>
          {listings.length === 0 ? (
            <EmptyState icon={Home} title={el.housing.empty} description={el.common.noResultsHint} />
          ) : (
            listings.map((item) => (
              <article key={item.id} className="rounded-2xl bg-white p-4 ring-1 ring-surface">
                <div className="flex items-start gap-2">
                  <div className="min-w-0 flex-1">
                <p className="text-caption font-medium text-primary">
                  {withUniversity(item.universityId, item.kind === 'room' ? el.housing.room : el.housing.roommate)}
                </p>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-caption text-muted">
                  {item.area} · {item.rent}
                </p>
                <p className="mt-1 text-body">{item.description}</p>
                  </div>
                  <SpeakButton
                    text={`${item.title}. ${item.area}. ${item.rent}. ${item.description}`}
                    label={item.title}
                  />
                </div>
              </article>
            ))
          )}
        </section>
      )}

      {section === 'forum' && (
        <ForumSection
          posts={posts}
          category={forumCategory}
          onCategory={setForumCategory}
          openId={openPost}
          onOpen={setOpenPost}
          alias={alias}
          extraReplies={extraReplies}
          onReply={(postId, body) => {
            const reply: ForumReply = { id: `r-${Date.now()}`, alias, body, minutesAgo: 0 }
            setExtraReplies((prev) => ({ ...prev, [postId]: [...(prev[postId] ?? []), reply] }))
          }}
          onCreate={(title, body, category) => {
            const post: ForumPost = {
              id: `f-${Date.now()}`,
              universityId: university.id,
              alias,
              category,
              title,
              body,
              minutesAgo: 0,
              replies: [],
            }
            setExtraPosts((prev) => [post, ...prev])
          }}
          homepage={university.homepage}
          shortName={university.shortName}
        />
      )}

      {section === 'chat' && (
        <section className="flex flex-col gap-3">
          <h2 className="text-h3">{el.chat.title}</h2>
          <p className="text-caption text-muted">{el.chat.demo}</p>
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4">
            {chatChannels.map((c) => (
              <Chip key={c} label={el.chat.channels[c]} active={channel === c} onClick={() => setChannel(c)} />
            ))}
          </div>
          {messages.length === 0 ? (
            <EmptyState icon={MessageCircle} title={el.chat.empty} />
          ) : (
            <div className="flex flex-col gap-2">
              {messages.map((m) => (
                <article key={m.id} className="flex items-start gap-2 rounded-2xl bg-white p-3 ring-1 ring-surface">
                  <div className="min-w-0 flex-1">
                    <p className="text-caption font-semibold">
                      {m.author} <span className="font-normal text-muted">{relativeTime(m.minutesAgo)}</span>
                    </p>
                    <p>{m.body}</p>
                  </div>
                  <SpeakButton text={`${m.author}. ${m.body}`} label={m.author} />
                </article>
              ))}
            </div>
          )}
          {verified ? (
            <ChatComposer
              onSend={(body) => {
                const message: ChatMessage = {
                  id: `m-${Date.now()}`,
                  author: account?.name ?? el.comments.you,
                  body,
                  minutesAgo: 0,
                }
                setChatExtra((prev) => ({ ...prev, [chatKey]: [...(prev[chatKey] ?? []), message] }))
              }}
            />
          ) : (
            <div className="rounded-2xl bg-white p-4 ring-1 ring-surface">
              <p className="font-semibold">{el.chat.lockedTitle}</p>
              <p className="mt-1 text-caption text-muted">{el.chat.locked}</p>
              <Link to="/more" className="mt-3 inline-flex min-h-11 items-center font-semibold text-primary">
                {el.chat.verify}
              </Link>
            </div>
          )}
        </section>
      )}

      {creating && (
        <CreateGroupSheet
          onClose={() => setCreating(false)}
          onSave={(name, courseName) => {
            const id = `mine-${Date.now()}`
            setMine((prev) => [
              {
                id,
                universityId: university.id,
                name,
                course: courseName,
                members: 1,
                nextSession: el.groups.mine,
              },
              ...prev,
            ])
            setJoined((prev) => (prev.includes(id) ? prev : [...prev, id]))
            setCreating(false)
            setSection('groups')
          }}
        />
      )}

      {preview && (
        <Sheet title={preview.title} onClose={() => setPreview(null)}>
          <div className="flex items-start gap-2">
            <div className="min-w-0 flex-1">
              <p className="text-caption text-muted">{el.notes.meta(preview.pages)}</p>
              <p>{el.notes.sampleBody}</p>
            </div>
            <SpeakButton text={`${preview.title}. ${el.notes.sampleBody}`} label={preview.title} />
          </div>
          <a
            href={SAMPLE_PDF}
            download
            className="flex min-h-12 items-center justify-center rounded-full bg-primary font-semibold text-white"
          >
            {el.notes.download}
          </a>
        </Sheet>
      )}
    </>
  )
}

function CreateGroupSheet({ onClose, onSave }: { onClose: () => void; onSave: (name: string, course: string) => void }) {
  const [name, setName] = useState('')
  const [course, setCourse] = useState('')
  return (
    <Sheet title={el.groups.createTitle} onClose={onClose}>
      <label className="flex flex-col gap-1 text-caption">
        {el.groups.name}
        <input value={name} onChange={(e) => setName(e.target.value)} className="min-h-12 rounded-2xl bg-surface px-4 text-body outline-none" />
      </label>
      <label className="flex flex-col gap-1 text-caption">
        {el.groups.course}
        <input value={course} onChange={(e) => setCourse(e.target.value)} className="min-h-12 rounded-2xl bg-surface px-4 text-body outline-none" />
      </label>
      <Button disabled={!name.trim() || !course.trim()} onClick={() => onSave(name.trim(), course.trim())}>
        {el.groups.save}
      </Button>
    </Sheet>
  )
}

function ForumSection({
  posts,
  category,
  onCategory,
  openId,
  onOpen,
  alias,
  extraReplies,
  onReply,
  onCreate,
  homepage,
  shortName,
}: {
  posts: ForumPost[]
  category: 'all' | ForumCategory
  onCategory: (c: 'all' | ForumCategory) => void
  openId: string | null
  onOpen: (id: string | null) => void
  alias: string
  extraReplies: Record<string, ForumReply[]>
  onReply: (postId: string, body: string) => void
  onCreate: (title: string, body: string, category: ForumCategory) => void
  homepage: string
  shortName: string
}) {
  const [draftTitle, setDraftTitle] = useState('')
  const [draftBody, setDraftBody] = useState('')
  const [draftCategory, setDraftCategory] = useState<ForumCategory>('other')
  const [reply, setReply] = useState('')

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-h3">{el.forum.title}</h2>
      <p className="rounded-2xl bg-warning/15 p-3 text-caption">{el.forum.safety}</p>
      <a href={homepage} target="_blank" rel="noreferrer" className="text-caption font-semibold text-primary">
        {el.forum.counselling(shortName)}
      </a>
      <p className="text-caption text-muted">
        {el.forum.demo} · {alias}
      </p>
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4">
        {forumFilters.map((c) => (
          <Chip key={c} label={el.forum.categories[c]} active={category === c} onClick={() => onCategory(c)} />
        ))}
      </div>
      <form
        className="flex flex-col gap-2 rounded-2xl bg-white p-4 ring-1 ring-surface"
        onSubmit={(e) => {
          e.preventDefault()
          if (!draftTitle.trim() || !draftBody.trim()) return
          onCreate(draftTitle.trim(), draftBody.trim(), draftCategory)
          setDraftTitle('')
          setDraftBody('')
        }}
      >
        <h3 className="font-semibold">{el.forum.newTitle}</h3>
        <select
          value={draftCategory}
          onChange={(e) => setDraftCategory(e.target.value as ForumCategory)}
          className="min-h-12 rounded-2xl bg-surface px-4"
          aria-label={el.forum.category}
        >
          {forumFilters.filter((c) => c !== 'all').map((c) => (
            <option key={c} value={c}>
              {el.forum.categories[c]}
            </option>
          ))}
        </select>
        <input
          value={draftTitle}
          onChange={(e) => setDraftTitle(e.target.value)}
          placeholder={el.forum.postTitle}
          aria-label={el.forum.postTitle}
          className="min-h-12 rounded-2xl bg-surface px-4 outline-none"
        />
        <textarea
          value={draftBody}
          onChange={(e) => setDraftBody(e.target.value)}
          placeholder={el.forum.postBody}
          aria-label={el.forum.postBody}
          className="min-h-24 rounded-2xl bg-surface px-4 py-3 outline-none"
        />
        <Button type="submit" disabled={!draftTitle.trim() || !draftBody.trim()}>
          {el.forum.publish}
        </Button>
      </form>
      {posts.length === 0 ? (
        <EmptyState icon={MessageCircle} title={el.forum.empty} />
      ) : (
        posts.map((post) => {
          const replies = [...post.replies, ...(extraReplies[post.id] ?? [])]
          const open = openId === post.id
          return (
            <article key={post.id} className="rounded-2xl bg-white p-4 ring-1 ring-surface">
              <div className="flex items-start gap-2">
              <button type="button" onClick={() => onOpen(open ? null : post.id)} className="min-w-0 flex-1 text-left">
                <p className="text-caption text-muted">
                  {post.alias} · {el.forum.categories[post.category]} · {relativeTime(post.minutesAgo)}
                </p>
                <h3 className="font-semibold">{post.title}</h3>
                <p className="mt-1">{post.body}</p>
                <p className="mt-2 text-caption text-primary">{el.forum.replies(replies.length)}</p>
              </button>
              <SpeakButton text={`${post.title}. ${post.body}`} label={post.title} />
              </div>
              {open && (
                <div className="mt-3 flex flex-col gap-2">
                  {replies.map((r) => (
                    <div key={r.id} className="flex items-start gap-2 rounded-2xl bg-page p-3">
                      <p className="min-w-0 flex-1 text-caption">
                        <span className="font-semibold">{r.alias}</span> · {relativeTime(r.minutesAgo)}
                        <span className="mt-1 block text-body">{r.body}</span>
                      </p>
                      <SpeakButton text={r.body} label={r.alias} />
                    </div>
                  ))}
                  <form
                    className="flex flex-col gap-2"
                    onSubmit={(e) => {
                      e.preventDefault()
                      if (!reply.trim()) return
                      onReply(post.id, reply.trim())
                      setReply('')
                    }}
                  >
                    <input
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      placeholder={el.forum.replyPlaceholder}
                      aria-label={el.forum.reply}
                      className="min-h-12 rounded-full bg-surface px-4 outline-none"
                    />
                    <Button type="submit" disabled={!reply.trim()}>
                      {el.forum.send}
                    </Button>
                  </form>
                </div>
              )}
            </article>
          )
        })
      )}
    </section>
  )
}

function ChatComposer({ onSend }: { onSend: (body: string) => void }) {
  const [body, setBody] = useState('')
  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault()
        if (!body.trim()) return
        onSend(body.trim())
        setBody('')
      }}
    >
      <input
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder={el.chat.placeholder}
        aria-label={el.chat.placeholder}
        className="min-h-12 rounded-full bg-surface px-4 outline-none"
      />
      <Button type="submit" disabled={!body.trim()}>
        {el.chat.send}
      </Button>
    </form>
  )
}
