export type UniversityId = 'nkua' | 'ntua' | 'uniwa'

/** Content scope: one university, or `'all'` for items shared across universities. */
export type UniversityScope = UniversityId | 'all'

export type University = {
  id: UniversityId
  name: string
  shortName: string
  homepage: string
  /** Tailwind class for the small header badge only (tokens in index.css). */
  badgeClass: string
}

/** Every content item in src/data carries this. */
export type Scoped = { universityId: UniversityScope }

/** Sample student account for the demo login. Not a real user. */
export type DemoAccount = {
  email: string
  password: string
  name: string
  initials: string
  universityId: UniversityId
  department: string
  year: number
}
