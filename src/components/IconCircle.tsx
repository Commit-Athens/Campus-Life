import type { LucideIcon } from 'lucide-react'

export type Tone = 'primary' | 'success' | 'warning' | 'error'

const tones: Record<Tone, string> = {
  primary: 'bg-primary-soft text-primary',
  success: 'bg-success-soft text-success',
  warning: 'bg-warning-soft text-warning',
  error: 'bg-error-soft text-error',
}

export function IconCircle({ icon: Icon, tone = 'primary' }: { icon: LucideIcon; tone?: Tone }) {
  return (
    <span className={`flex size-11 shrink-0 items-center justify-center rounded-full ${tones[tone]}`}>
      <Icon className="size-5" strokeWidth={2} aria-hidden />
    </span>
  )
}
