import type { ReactNode } from 'react'
import { DEFAULT_UNIVERSITY, getUniversity, isUniversityId } from '../data/universities'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { UniversityContext } from '../hooks/useUniversity'

/** Holds the selected university, persisted in localStorage (defaults to NKUA). */
export function UniversityProvider({ children }: { children: ReactNode }) {
  const [storedId, setUniversityId] = useLocalStorage<unknown>('campuslife.university', DEFAULT_UNIVERSITY)
  const id = isUniversityId(storedId) ? storedId : DEFAULT_UNIVERSITY

  return (
    <UniversityContext.Provider value={{ university: getUniversity(id), setUniversityId }}>
      {children}
    </UniversityContext.Provider>
  )
}
