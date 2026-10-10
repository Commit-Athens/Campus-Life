import { useUniversity } from '../hooks/useUniversity'

/** Small label showing the selected university. Becomes the switcher trigger in step 4. */
export function UniversityBadge() {
  const { university } = useUniversity()
  return (
    <span
      title={university.name}
      className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${university.badgeClass}`}
    >
      {university.shortName}
    </span>
  )
}
