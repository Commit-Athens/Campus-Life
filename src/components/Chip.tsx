type ChipProps = {
  label: string
  active?: boolean
  onClick: () => void
}

/** Filter chip: pill on `surface`, solid `primary` when active. */
export function Chip({ label, active = false, onClick }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`min-h-11 shrink-0 rounded-full px-4 text-caption font-medium transition-colors ${
        active ? 'bg-primary text-white' : 'bg-surface text-ink hover:bg-surface/70'
      }`}
    >
      {label}
    </button>
  )
}

/** Non-interactive hashtag tag, e.g. #Μαθηματικά. */
export function Tag({ label }: { label: string }) {
  return (
    <span className="inline-flex rounded-full bg-primary-soft px-3 py-1 text-caption font-medium text-primary">
      #{label}
    </span>
  )
}
