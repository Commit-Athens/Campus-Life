import { ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { el } from '../i18n/el'

type FeedCardProps = {
  source: string
  time: string
  title: string
  body: string
  /** Small label next to the time, e.g. the category. */
  label?: string
  /** External source link (opens in a new tab). */
  sourceUrl?: string
  /** Extra content at the bottom, e.g. a confirm button. */
  footer?: ReactNode
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter((word) => word.length > 3)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase()
}

export function FeedCard({ source, time, title, body, label, sourceUrl, footer }: FeedCardProps) {
  return (
    <article className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-surface">
      <header className="flex items-center gap-3">
        <span
          className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary-soft text-caption font-semibold text-primary"
          aria-hidden
        >
          {initials(source)}
        </span>
        <div className="min-w-0">
          <p className="truncate text-caption font-semibold">{source}</p>
          <p className="text-caption text-muted">
            {time}
            {label && ` · ${label}`}
          </p>
        </div>
      </header>
      <div className="flex flex-col gap-1">
        <h2 className="text-h3">{title}</h2>
        <p className="text-muted">{body}</p>
      </div>
      {sourceUrl && (
        <a
          href={sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="flex min-h-11 items-center gap-1 self-start text-caption font-semibold text-primary hover:underline"
        >
          {el.feed.source}: {new URL(sourceUrl).hostname.replace(/^www\./, '')}
          <ChevronRight className="size-4" strokeWidth={2} aria-hidden />
        </a>
      )}
      {footer}
    </article>
  )
}
