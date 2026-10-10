import { createContext, useContext } from 'react'

export type PointsContextValue = {
  points: number
  /** Adds one point the first time `key` is awarded (e.g. "vote:nkua-1"). Repeats are ignored. */
  award: (key: string) => void
}

export const PointsContext = createContext<PointsContextValue | null>(null)

/** Activity points. Must be used inside <PointsProvider>. */
export function usePoints(): PointsContextValue {
  const ctx = useContext(PointsContext)
  if (!ctx) throw new Error('usePoints must be used inside <PointsProvider>')
  return ctx
}
