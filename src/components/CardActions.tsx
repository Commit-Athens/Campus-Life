import { useState, type FormEvent } from 'react'
import { MessageCircle, Send, ThumbsDown, ThumbsUp, type LucideIcon } from 'lucide-react'
import type { Vote } from '../hooks/useVotes'
import { Avatar } from './Avatar'
import { el } from '../i18n/el'
import { relativeTime } from '../i18n/relativeTime'
import type { FeedComment } from '../types'

type CardActionsProps = {
  /** Vote counts from sample data, before the user's own vote. */
  useful: number
  notUseful: number
  vote?: Vote
  onVote: (choice: Vote) => void
  comments: FeedComment[]
  onComment: (body: string) => void
}

type ActionPillProps = {
  icon: LucideIcon
  count: number
  /** Screen-reader label; the pill itself shows only icon + count. */
  label: string
  active: boolean
  activeClass: string
  onClick: () => void
  expanded?: boolean
}

function ActionPill({ icon: Icon, count, label, active, activeClass, onClick, expanded }: ActionPillProps) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={expanded === undefined ? active : undefined}
      aria-expanded={expanded}
      onClick={onClick}
      className={`flex min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-full px-4 text-caption font-semibold transition-colors ${
        active ? activeClass : 'bg-surface text-ink hover:bg-surface/70'
      }`}
    >
      <Icon className="size-4" strokeWidth={2} aria-hidden />
      {count}
    </button>
  )
}

/** Card footer: useful / not useful votes and an expandable comment thread. */
export function CardActions({ useful, notUseful, vote, onVote, comments, onComment }: CardActionsProps) {
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState('')

  const usefulCount = useful + (vote === 'useful' ? 1 : 0)
  const notUsefulCount = notUseful + (vote === 'notUseful' ? 1 : 0)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const body = draft.trim()
    if (!body) return
    onComment(body)
    setDraft('')
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <ActionPill
          icon={ThumbsUp}
          count={usefulCount}
          label={el.vote.useful(usefulCount)}
          active={vote === 'useful'}
          activeClass="bg-success-soft text-success"
          onClick={() => onVote('useful')}
        />
        <ActionPill
          icon={ThumbsDown}
          count={notUsefulCount}
          label={el.vote.notUseful(notUsefulCount)}
          active={vote === 'notUseful'}
          activeClass="bg-error-soft text-error"
          onClick={() => onVote('notUseful')}
        />
        <ActionPill
          icon={MessageCircle}
          count={comments.length}
          label={el.comments.toggle(comments.length)}
          active={open}
          activeClass="bg-primary-soft text-primary"
          onClick={() => setOpen(!open)}
          expanded={open}
        />
      </div>

      {open && (
        <div className="flex flex-col gap-3 border-t border-surface pt-3">
          {comments.length === 0 ? (
            <p className="text-caption text-muted">{el.comments.empty}</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {comments.map((c) => (
                <li key={c.id} className="flex items-start gap-2 rounded-2xl bg-page px-3 py-2">
                  <Avatar name={c.author} size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="text-caption">
                      <span className="font-semibold">{c.author}</span>
                      <span className="text-muted"> · {relativeTime(c.minutesAgo)}</span>
                    </p>
                    <p className="text-caption">{c.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <form onSubmit={submit} className="flex items-center gap-2">
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={el.comments.placeholder}
              aria-label={el.comments.placeholder}
              maxLength={280}
              className="min-h-11 min-w-0 flex-1 rounded-full bg-surface px-4 text-caption outline-none placeholder:text-muted focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              aria-label={el.comments.send}
              disabled={!draft.trim()}
              className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-primary/90 disabled:opacity-50"
            >
              <Send className="size-4" strokeWidth={2} aria-hidden />
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
