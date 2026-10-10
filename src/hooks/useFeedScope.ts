import { useState } from 'react'
import { forUniversity, getUniversity } from '../data/universities'
import { el } from '../i18n/el'
import type { Scoped, UniversityScope } from '../types'
import { useUniversity } from './useUniversity'

/** The "all universities" toggle shared by both feeds. */
export function useFeedScope() {
  const { university } = useUniversity()
  const [showAll, setShowAll] = useState(false)

  const scope = <T extends Scoped>(items: T[]): T[] => (showAll ? items : forUniversity(items, university.id))

  /** "ΕΜΠ · Σχολή" when the card's university isn't obvious, otherwise just the label. */
  const withUniversity = (id: UniversityScope, label: string): string => {
    if (id === 'all') return `${el.feed.shared} · ${label}`
    return showAll ? `${getUniversity(id).shortName} · ${label}` : label
  }

  return { showAll, setShowAll, scope, withUniversity }
}
