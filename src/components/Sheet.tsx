import { useEffect, useId, type ReactNode } from 'react'
import { el } from '../i18n/el'
import { Button } from './Button'

type SheetProps = {
  title: string
  onClose: () => void
  children: ReactNode
}

/** Bottom sheet dialog with a backdrop, Escape to close, and a close button. */
export function Sheet({ title, onClose, children }: SheetProps) {
  const titleId = useId()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center">
      <button type="button" aria-label={el.common.close} onClick={onClose} className="absolute inset-0 bg-night/60" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative flex max-h-[85dvh] w-full max-w-md flex-col gap-3 overflow-y-auto rounded-t-2xl bg-card p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))]"
      >
        <h2 id={titleId} className="text-h3">
          {title}
        </h2>
        {children}
        <Button variant="secondary" onClick={onClose}>
          {el.common.close}
        </Button>
      </div>
    </div>
  )
}
