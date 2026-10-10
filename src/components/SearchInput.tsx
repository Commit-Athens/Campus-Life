import { Search } from 'lucide-react'
import { el } from '../i18n/el'

type SearchInputProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchInput({ value, onChange, placeholder = el.common.search }: SearchInputProps) {
  return (
    <label className="flex min-h-12 items-center gap-3 rounded-full bg-surface px-4 focus-within:ring-2 focus-within:ring-primary">
      <Search className="size-5 shrink-0 text-muted" strokeWidth={2} aria-hidden />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="w-full bg-transparent text-body outline-none placeholder:text-muted"
      />
    </label>
  )
}
