import { ThumbsDown, ThumbsUp, type LucideIcon } from 'lucide-react'
import type { Vote } from '../hooks/useVotes'
import { el } from '../i18n/el'

type VoteButtonsProps = {
  /** Counts from sample data, before the user's own vote. */
  useful: number
  notUseful: number
  current?: Vote
  onVote: (choice: Vote) => void
}

type PillProps = {
  icon: LucideIcon
  label: string
  count: number
  active: boolean
  activeClass: string
  onClick: () => void
}

function VotePill({ icon: Icon, label, count, active, activeClass, onClick }: PillProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`flex min-h-11 items-center gap-2 rounded-full px-4 text-caption font-semibold transition-colors ${
        active ? activeClass : 'bg-surface text-ink hover:bg-surface/70'
      }`}
    >
      <Icon className="size-4" strokeWidth={2} aria-hidden />
      {label} ({count})
    </button>
  )
}

/** "Χρήσιμο / Όχι χρήσιμο" vote pills with live counts. */
export function VoteButtons({ useful, notUseful, current, onVote }: VoteButtonsProps) {
  const usefulCount = useful + (current === 'useful' ? 1 : 0)
  const notUsefulCount = notUseful + (current === 'notUseful' ? 1 : 0)

  return (
    <div className="flex flex-wrap gap-2">
      <VotePill
        icon={ThumbsUp}
        label={el.vote.useful}
        count={usefulCount}
        active={current === 'useful'}
        activeClass="bg-success-soft text-success"
        onClick={() => onVote('useful')}
      />
      <VotePill
        icon={ThumbsDown}
        label={el.vote.notUseful}
        count={notUsefulCount}
        active={current === 'notUseful'}
        activeClass="bg-error-soft text-error"
        onClick={() => onVote('notUseful')}
      />
    </div>
  )
}
