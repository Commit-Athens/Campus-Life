import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'

/** Exam ids the user added to "My exams", persisted. Call once (in Hub) and pass down. */
export function useMyExams() {
  const [ids, setIds] = useLocalStorage<string[]>('campuslife.myExams', [])
  const toggle = useCallback(
    (id: string) => setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])),
    [setIds],
  )
  return { myExamIds: ids, toggleExam: toggle }
}
