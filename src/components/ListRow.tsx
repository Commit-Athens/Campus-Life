import { ChevronRight, type LucideIcon } from 'lucide-react'
import { IconCircle, type Tone } from './IconCircle'
import { SpeakButton } from './SpeakButton'

type ListRowProps = {
  icon: LucideIcon
  tone?: Tone
  title: string
  description: string
  /** External link (opens in a new tab). Use either `href` or `onClick`. */
  href?: string
  onClick?: () => void
}

export function ListRow({ icon, tone, title, description, href, onClick }: ListRowProps) {
  const content = (
    <>
      <IconCircle icon={icon} tone={tone} />
      <span className="min-w-0 flex-1">
        <span className="block font-semibold">{title}</span>
        <span className="block truncate text-caption text-muted">{description}</span>
      </span>
      <ChevronRight className="size-5 shrink-0 text-muted" strokeWidth={2} aria-hidden />
    </>
  )
  const className =
    'flex min-h-16 min-w-0 flex-1 items-center gap-3 rounded-2xl p-3 text-left transition-colors hover:bg-page'
  const spoken = `${title}. ${description}`

  return (
    <div className="flex items-center gap-1 rounded-2xl bg-card pr-1 shadow-sm ring-1 ring-surface">
      {href ? (
        <a href={href} target="_blank" rel="noreferrer" className={className}>
          {content}
        </a>
      ) : (
        <button type="button" onClick={onClick} className={className}>
          {content}
        </button>
      )}
      <SpeakButton text={spoken} label={title} />
    </div>
  )
}
