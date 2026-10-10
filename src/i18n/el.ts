// All Greek UI strings. Components read text from here, never inline.
export const el = {
  brand: {
    name: 'CampusLife',
    tagline: 'Μάθε τι γίνεται. Πριν πας.',
  },
  header: {
    profile: 'Το προφίλ μου',
  },
  onboarding: {
    title: 'Όλα όσα χρειάζεσαι για τη φοιτητική ζωή',
    description: 'Ανακοινώσεις, προνόμια και ομάδες μελέτης για το πανεπιστήμιό σου, σε ένα μέρος.',
    start: 'Ξεκίνα',
    skip: 'Παράλειψη',
  },
  switcher: {
    open: 'Αλλαγή πανεπιστημίου',
    title: 'Επίλεξε πανεπιστήμιο',
    homepage: 'Ιστοσελίδα',
    close: 'Κλείσιμο',
  },
  login: {
    title: 'Σύνδεση',
    subtitle: 'Συνδέσου με έναν δοκιμαστικό λογαριασμό.',
    email: 'Email',
    password: 'Κωδικός',
    submit: 'Σύνδεση',
    error: 'Λάθος email ή κωδικός.',
    demoTitle: 'Δοκιμαστικοί λογαριασμοί (demo)',
    demoHint: 'Πάτα έναν λογαριασμό για να συμπληρωθούν τα στοιχεία.',
    demoPassword: 'Κωδικός για όλους',
    demoNotice: 'Demo εφαρμογή: δεν γίνεται πραγματική ταυτοποίηση φοιτητή.',
  },
  account: {
    title: 'Ο λογαριασμός μου',
    year: (n: number) => `${n}ο έτος`,
    logout: 'Αποσύνδεση',
  },
  tabs: {
    feed: 'Home',
    hub: 'Προνόμια',
    community: 'Study Groups',
    more: 'Περισσότερα',
  },
  pages: {
    feed: 'Live Feed',
    hub: 'Προνόμια',
    community: 'Study Groups',
    more: 'Περισσότερα',
  },
  comingSoon: {
    title: 'Έρχεται σύντομα',
    description: 'Αυτή η ενότητα είναι υπό κατασκευή.',
  },
  common: {
    search: 'Αναζήτηση...',
    noResults: 'Δεν βρέθηκαν αποτελέσματα',
    noResultsHint: 'Δοκίμασε άλλη αναζήτηση ή φίλτρο.',
    clearFilters: 'Καθαρισμός φίλτρων',
  },
  demo: {
    buttons: 'Κουμπιά',
    chips: 'Φίλτρα',
    list: 'Λίστα',
    selected: 'Επιλέχθηκε',
    secondaryAction: 'Καθαρισμός αναζήτησης',
  },
  benefitCategories: {
    all: 'Όλα',
    transport: 'Μεταφορές',
    food: 'Φαγητό',
    books: 'Βιβλία',
  },
} as const
