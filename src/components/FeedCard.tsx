import { ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { el } from '../i18n/el'
import { Avatar } from './Avatar'
import { SpeakButton } from './SpeakButton'

type FeedCardProps = {
  source: string
  /** Picture for the source; defaults to the sample avatar for the name, then initials. */
  avatarSrc?: string
  time: string
  title?: string
  body: string
  /** Small label next to the time, e.g. the category. */
  label?: string
  /** External source link (opens in a new tab). */
  sourceUrl?: string
  image?: { src: string; alt: string }
  /** Extra content under the body, e.g. tags or a location. */
  children?: ReactNode
  /** Content at the bottom, e.g. a confirm button. */
  footer?: ReactNode
}

export function FeedCard({ source, avatarSrc, time, title, body, label, sourceUrl, image, children, footer }: FeedCardProps) {
  return (
    <article className="flex flex-col gap-3 rounded-2xl bg-card p-4 shadow-sm ring-1 ring-surface">
      <header className="flex items-center gap-3">
        <Avatar name={source} src={avatarSrc} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-caption font-semibold">{source}</p>
          <p className="truncate text-caption text-muted">
            {time}
            {label && ` · ${label}`}
          </p>
        </div>
        <SpeakButton text={[title, body].filter(Boolean).join('. ')} label={title || source} />
      </header>
      {image && (
        <img src={image.src} alt={image.alt} className="aspect-[5/3] w-full rounded-xl bg-surface object-cover" />
      )}
      <div className="flex flex-col gap-1">
        {title && <h2 className="text-h3">{title}</h2>}
        <p className={title ? 'text-muted' : ''}>{body}</p>
      </div>
      {children}
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
