import type { Scoped, University, UniversityId } from '../types'

export const universities: University[] = [
  {
    id: 'nkua',
    name: 'Εθνικό και Καποδιστριακό Πανεπιστήμιο Αθηνών',
    shortName: 'ΕΚΠΑ',
    homepage: 'https://www.uoa.gr',
    badgeClass: 'bg-uni-nkua',
  },
  {
    id: 'ntua',
    name: 'Εθνικό Μετσόβιο Πολυτεχνείο',
    shortName: 'ΕΜΠ',
    homepage: 'https://www.ntua.gr',
    badgeClass: 'bg-uni-ntua',
  },
  {
    id: 'uniwa',
    name: 'Πανεπιστήμιο Δυτικής Αττικής',
    shortName: 'ΠΑΔΑ',
    homepage: 'https://www.uniwa.gr',
    badgeClass: 'bg-uni-uniwa',
  },
]

export const DEFAULT_UNIVERSITY: UniversityId = 'nkua'

export function isUniversityId(value: unknown): value is UniversityId {
  return universities.some((u) => u.id === value)
}

export function getUniversity(id: UniversityId): University {
  return universities.find((u) => u.id === id) ?? universities[0]
}

/** Items for the selected university plus those shared with `'all'`. */
export function forUniversity<T extends Scoped>(items: T[], id: UniversityId): T[] {
  return items.filter((item) => item.universityId === id || item.universityId === 'all')
}
