import { useCallback, useMemo, type ReactNode } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { PointsContext } from '../hooks/usePoints'

/** Activity points are the number of distinct awarded actions, persisted in localStorage. */
export function PointsProvider({ children }: { children: ReactNode }) {
  const [awarded, setAwarded] = useLocalStorage<string[]>('campuslife.pointsAwarded', [])

  const award = useCallback(
    (key: string) => setAwarded((prev) => (prev.includes(key) ? prev : [...prev, key])),
    [setAwarded],
  )

  const value = useMemo(() => ({ points: awarded.length, award }), [awarded.length, award])
  return <PointsContext.Provider value={value}>{children}</PointsContext.Provider>
}
