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

export type AnnouncementCategory = 'announcement' | 'rooms' | 'school' | 'web'

/** Official feed item (sample): a university announcement, or info collected from the web (`'web'`). Source link is the university homepage. */
export type Announcement = Scoped & {
  id: string
  category: AnnouncementCategory
  /** Who posted it, e.g. a department secretariat. */
  source: string
  /** Minutes before "now", so relative times stay fresh in the demo. */
  minutesAgo: number
  title: string
  body: string
  useful: number
  notUseful: number
}

/** Student post in the social feed (sample, fictional author). */
export type StudentPost = Scoped & {
  id: string
  author: string
  department: string
  minutesAgo: number
  body: string
  tags: string[]
  useful: number
  notUseful: number
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
  useful: number
  notUseful: number
}

/** Sample comment on a feed card (fictional author). */
export type SampleComment = {
  id: string
  itemId: string
  author: string
  minutesAgo: number
  body: string
}

/** A comment as shown on a card: sample or written by the user. */
export type FeedComment = Omit<SampleComment, 'itemId'>

export type BenefitCategory = 'transport' | 'food' | 'books' | 'other'

/** Student benefit or affordable option (sample). */
export type Benefit = Scoped & {
  id: string
  category: BenefitCategory
  title: string
  /** One line for the list row. */
  description: string
  /** Longer text for the detail sheet. */
  details: string
  /** Shown as the banner at the top of the page. */
  featured?: boolean
}

// Track A: Hub

/** Quick link: the university homepage or a page inside the app. */
export type UsefulLink = Scoped & {
  id: string
  title: string
  description: string
} & ({ kind: 'homepage' } | { kind: 'route'; to: string })

/** First-year checklist item. */
export type ChecklistItem = Scoped & {
  id: string
  title: string
  description: string
}

/** Exam slot (sample dates, not an official timetable). */
export type Exam = Scoped & {
  id: string
  course: string
  /** ISO date, e.g. "2027-01-18". */
  date: string
  time: string
  location: string
}

/** Internship or hackathon (sample). */
export type Opportunity = Scoped & {
  id: string
  kind: 'internship' | 'hackathon'
  title: string
  organizer: string
  location: string
  /** ISO date of the application deadline. */
  deadline: string
  description: string
  details: string
}
