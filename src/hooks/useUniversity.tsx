import { createContext, useContext } from 'react'
import type { University, UniversityId } from '../types'

export type UniversityContextValue = {
  university: University
  setUniversityId: (id: UniversityId) => void
}

export const UniversityContext = createContext<UniversityContextValue | null>(null)

/** The selected university. Must be used inside <UniversityProvider>. */
export function useUniversity(): UniversityContextValue {
  const ctx = useContext(UniversityContext)
  if (!ctx) throw new Error('useUniversity must be used inside <UniversityProvider>')
  return ctx
}
