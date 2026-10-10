import type { ForumPost } from '../types'

export const forumAliases = [
  'Ανώνυμη Αλεπού',
  'Ανώνυμος Γλάρος',
  'Ανώνυμη Κουκουβάγια',
  'Ανώνυμος Σκαντζόχοιρος',
  'Ανώνυμη Χελώνα',
] as const

export const forumPosts: ForumPost[] = [
  {
    id: 'nkua-f1',
    universityId: 'nkua',
    alias: 'Ανώνυμη Αλεπού',
    category: 'stress',
    title: 'Δεν προλαβαίνω την πρόοδο',
    body: 'Δείγμα ανάρτησης. Νιώθω ότι μένω πίσω στο διάβασμα και δεν ξέρω από πού να ξεκινήσω.',
    minutesAgo: 80,
    replies: [
      { id: 'nkua-f1-r1', alias: 'Ανώνυμος Γλάρος', body: 'Δείγμα απάντησης. Κόψε την ύλη σε μικρά κομμάτια και ξεκίνα από ένα κεφάλαιο.', minutesAgo: 40 },
    ],
  },
  {
    id: 'nkua-f2',
    universityId: 'nkua',
    alias: 'Ανώνυμη Χελώνα',
    category: 'money',
    title: 'Έξοδα του μήνα',
    body: 'Δείγμα. Ψάχνω ιδέες για φθηνό φαγητό κοντά στη σχολή, χωρίς συγκεκριμένο μαγαζί.',
    minutesAgo: 400,
    replies: [],
  },
  {
    id: 'ntua-f1',
    universityId: 'ntua',
    alias: 'Ανώνυμος Σκαντζόχοιρος',
    category: 'courses',
    title: 'Στατική, από πού να αρχίσω',
    body: 'Δείγμα. Η πρώτη σειρά ασκήσεων φαίνεται τεράστια.',
    minutesAgo: 120,
    replies: [],
  },
  {
    id: 'ntua-f2',
    universityId: 'ntua',
    alias: 'Ανώνυμη Κουκουβάγια',
    category: 'housing',
    title: 'Πρώτη φορά μόνος σε σπίτι',
    body: 'Δείγμα. Με αγχώνει η συγκατοίκηση με αγνώστους.',
    minutesAgo: 900,
    replies: [],
  },
  {
    id: 'uniwa-f1',
    universityId: 'uniwa',
    alias: 'Ανώνυμος Γλάρος',
    category: 'courses',
    title: 'Κλινική και διάβασμα μαζί',
    body: 'Δείγμα. Πώς οργανώνετε την εβδομάδα όταν έχετε και πρακτική;',
    minutesAgo: 200,
    replies: [],
  },
  {
    id: 'uniwa-f2',
    universityId: 'uniwa',
    alias: 'Ανώνυμη Αλεπού',
    category: 'other',
    title: 'Νέος στο τμήμα',
    body: 'Δείγμα. Θέλω να γνωρίσω κόσμο χωρίς να είναι περίεργο.',
    minutesAgo: 1500,
    replies: [],
  },
]
