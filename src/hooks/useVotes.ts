import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { usePoints } from './usePoints'

export type Vote = 'useful' | 'notUseful'

/**
 * Useful / not useful votes per item, persisted. Call once per page and pass down,
 * so every card shares the same stored record.
 */
export function useVotes() {
  const [votes, setVotes] = useLocalStorage<Record<string, Vote>>('campuslife.votes', {})
  const { award } = usePoints()

  /** Tapping your current vote removes it; tapping the other one switches. */
  const vote = useCallback(
    (id: string, choice: Vote) => {
      setVotes((prev) => {
        const next = { ...prev }
        if (next[id] === choice) delete next[id]
        else next[id] = choice
        return next
      })
      award(`vote:${id}`)
    },
    [setVotes, award],
  )

  return { votes, vote }
}
