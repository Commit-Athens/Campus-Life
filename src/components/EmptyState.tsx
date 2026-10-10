import { Search, type LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { IconCircle } from './IconCircle'

type EmptyStateProps = {
  title: string
  description?: string
  icon?: LucideIcon
  /** Optional action, e.g. a "clear filters" Button. */
  action?: ReactNode
}

export function EmptyState({ title, description, icon = Search, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl bg-card px-6 py-10 text-center ring-1 ring-surface">
      <IconCircle icon={icon} />
      <p className="text-h3">{title}</p>
      {description && <p className="text-caption text-muted">{description}</p>}
      {action && <div className="mt-2 w-full max-w-60">{action}</div>}
    </div>
  )
}
