import { forUniversity, getUniversity } from '../data/universities'
import { el } from '../i18n/el'
import type { Scoped, UniversityScope } from '../types'
import { useLocalStorage } from './useLocalStorage'
import { useUniversity } from './useUniversity'

/** The "all universities" setting, persisted and shared by the feeds, Community and Settings in More. */
export function useFeedScope() {
  const { university } = useUniversity()
  const [showAll, setShowAll] = useLocalStorage<boolean>('campuslife.showAllUniversities', false)

  const scope = <T extends Scoped>(items: T[]): T[] => (showAll ? items : forUniversity(items, university.id))

  /** "ΕΜΠ · Σχολή" when the card's university isn't obvious, otherwise just the label. */
  const withUniversity = (id: UniversityScope, label: string): string => {
    if (id === 'all') return `${el.feed.shared} · ${label}`
    return showAll ? `${getUniversity(id).shortName} · ${label}` : label
  }

  return { showAll, setShowAll, scope, withUniversity }
}
