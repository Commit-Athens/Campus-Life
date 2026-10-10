import type { UsefulLink } from '../types'

// Quick links. External ones go only to the selected university's homepage (see CLAUDE.md).
export const usefulLinks: UsefulLink[] = [
  { id: 'link-secretariat', universityId: 'all', kind: 'homepage', title: 'Ηλεκτρονική γραμματεία', description: 'Βαθμολογίες, δηλώσεις και πιστοποιητικά' },
  { id: 'link-account', universityId: 'all', kind: 'homepage', title: 'Ιδρυματικός λογαριασμός', description: 'Email, Wi-Fi και ηλεκτρονικές υπηρεσίες' },
  { id: 'link-library', universityId: 'all', kind: 'homepage', title: 'Βιβλιοθήκες', description: 'Ωράρια, κατάλογος και χώροι μελέτης' },
  { id: 'link-feed', universityId: 'all', kind: 'route', to: '/feed', title: 'Ανακοινώσεις', description: 'Τα νέα του πανεπιστημίου σου στην εφαρμογή' },
  { id: 'link-groups', universityId: 'all', kind: 'route', to: '/community', title: 'Ομάδες μελέτης', description: 'Βρες συμφοιτητές για διάβασμα' },
]
