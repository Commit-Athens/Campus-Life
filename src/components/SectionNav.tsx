type SectionNavProps<T extends string> = {
  sections: readonly T[]
  labels: Record<T, string>
  active: T
  onChange: (section: T) => void
  ariaLabel: string
}

/** Underlined tabs for switching sections within a page (distinct from filter chips). */
export function SectionNav<T extends string>({ sections, labels, active, onChange, ariaLabel }: SectionNavProps<T>) {
  return (
    <div role="tablist" aria-label={ariaLabel} className="-mx-4 flex overflow-x-auto border-b border-surface px-4">
      {sections.map((s) => {
        const selected = s === active
        return (
          <button
            key={s}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(s)}
            className={`min-h-11 shrink-0 border-b-2 px-3 text-caption font-semibold transition-colors ${
              selected ? 'border-primary text-primary' : 'border-transparent text-muted hover:text-ink'
            }`}
          >
            {labels[s]}
          </button>
        )
      })}
    </div>
  )
}
