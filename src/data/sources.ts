import type { UniversitySource } from '../types'

/** Demo "crawl" cards. Links in the UI go only to the university homepage. */
export const universitySources: UniversitySource[] = [
  {
    universityId: 'nkua',
    blurb: 'Δείγμα καρτών από την ιστοσελίδα του ΕΚΠΑ: φοιτητικές υπηρεσίες, εκδηλώσεις και οδηγός πρωτοετών.',
    updatedMinutesAgo: 130,
  },
  {
    universityId: 'ntua',
    blurb: 'Δείγμα καρτών από την ιστοσελίδα του ΕΜΠ: ιδρυματικός λογαριασμός, φοιτητικές ομάδες και οδηγός για τη Ζωγράφου.',
    updatedMinutesAgo: 150,
  },
  {
    universityId: 'uniwa',
    blurb: 'Δείγμα καρτών από την ιστοσελίδα του ΠΑΔΑ: οι τρεις πανεπιστημιουπόλεις, εκδηλώσεις και οδηγός πρωτοετών.',
    updatedMinutesAgo: 170,
  },
]
