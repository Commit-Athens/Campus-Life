import { ChevronRight, type LucideIcon } from 'lucide-react'
import { IconCircle, type Tone } from './IconCircle'

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
    'flex min-h-16 w-full items-center gap-3 rounded-2xl bg-white p-3 text-left shadow-sm ring-1 ring-surface transition-colors hover:bg-page'

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {content}
      </a>
    )
  }
  return (
    <button type="button" onClick={onClick} className={className}>
      {content}
    </button>
  )
}
