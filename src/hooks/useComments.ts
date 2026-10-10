import { useCallback } from 'react'
import { sampleComments } from '../data/comments'
import { el } from '../i18n/el'
import type { FeedComment } from '../types'
import { useAuth } from './useAuth'
import { useLocalStorage } from './useLocalStorage'
import { usePoints } from './usePoints'

type StoredComment = { id: string; author: string; body: string; createdAt: number }

/**
 * Sample comments plus the user's own (persisted). Call once per page and pass down,
 * so every card shares the same stored record.
 */
export function useComments() {
  const [stored, setStored] = useLocalStorage<Record<string, StoredComment[]>>('campuslife.comments', {})
  const { account } = useAuth()
  const { award } = usePoints()

  /** Oldest first, like a chat thread. */
  const commentsFor = (itemId: string): FeedComment[] => {
    const samples = sampleComments
      .filter((c) => c.itemId === itemId)
      .map(({ id, author, body, minutesAgo }) => ({ id, author, body, minutesAgo }))
    const own = (stored[itemId] ?? []).map((c) => ({
      id: c.id,
      author: c.author,
      body: c.body,
      minutesAgo: Math.floor((Date.now() - c.createdAt) / 60000),
    }))
    return [...samples, ...own].sort((a, b) => b.minutesAgo - a.minutesAgo)
  }

  const addComment = useCallback(
    (itemId: string, body: string) => {
      const comment: StoredComment = {
        id: `${itemId}-${Date.now()}`,
        author: account?.name ?? el.comments.you,
        body,
        createdAt: Date.now(),
      }
      setStored((prev) => ({ ...prev, [itemId]: [...(prev[itemId] ?? []), comment] }))
      award(`comment:${itemId}`)
    },
    [account, setStored, award],
  )

  return { commentsFor, addComment }
}
