import { el } from '../i18n/el'

/** Mortarboard mark, drawn inline so it needs no external assets. */
export function LogoMark({ className = 'size-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={`text-primary ${className}`} aria-hidden>
      <path d="M16 5 2 12l14 7 14-7-14-7Z" fill="currentColor" />
      <path
        d="M8 15.5V21c0 2.2 3.6 4 8 4s8-1.8 8-4v-5.5l-8 4-8-4Z"
        fill="currentColor"
        opacity="0.75"
      />
      <path d="M27 13v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="27" cy="21.5" r="1.75" fill="currentColor" />
    </svg>
  )
}

/** Mark + wordmark with "Life" in primary blue. `inverted` is for dark/photo screens. */
export function Logo({ inverted = false }: { inverted?: boolean }) {
  const campus = el.brand.name.replace(/Life$/, '')
  return (
    <span className="flex items-center gap-2">
      <LogoMark className={`size-8 ${inverted ? 'text-white' : ''}`} />
      <span className={`text-h3 font-bold ${inverted ? 'text-white' : 'text-ink'}`}>
        {campus}
        <span className="text-primary">Life</span>
      </span>
    </span>
  )
}
