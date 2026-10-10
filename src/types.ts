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

export type AnnouncementCategory = 'announcement' | 'rooms' | 'school'

/** University announcement (sample). Source link is the university homepage. */
export type Announcement = Scoped & {
  id: string
  category: AnnouncementCategory
  /** Who posted it, e.g. a department secretariat. */
  source: string
  /** Minutes before "now", so relative times stay fresh in the demo. */
  minutesAgo: number
  title: string
  body: string
  confirms: number
}

/** Student post in the social feed (sample, fictional author). */
export type StudentPost = Scoped & {
  id: string
  author: string
  department: string
  minutesAgo: number
  body: string
  tags: string[]
  confirms: number
}

/** Lost & Found post with a placeholder photo from public/. */
export type LostFoundItem = Scoped & {
  id: string
  kind: 'lost' | 'found'
  author: string
  minutesAgo: number
  title: string
  body: string
  location: string
  image: string
  imageAlt: string
  confirms: number
}
