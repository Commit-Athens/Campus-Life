import type { Opportunity } from '../types'

// Sample internships and hackathons. Organizers are generic, not real companies.
export const opportunities: Opportunity[] = [
  // ΕΚΠΑ
  {
    id: 'op-nkua-1', universityId: 'nkua', kind: 'internship',
    title: 'Πρακτική σε ανάπτυξη λογισμικού', organizer: 'Εταιρεία λογισμικού (δείγμα)', location: 'Αθήνα, υβριδικά',
    deadline: '2026-11-15', description: 'Τρίμηνη πρακτική για φοιτητές Πληροφορικής',
    details: 'Συμμετοχή σε ομάδα ανάπτυξης εφαρμογών web. Απαιτούνται βασικές γνώσεις προγραμματισμού. Η πρακτική μπορεί να αναγνωριστεί από το τμήμα.',
  },
  {
    id: 'op-nkua-2', universityId: 'nkua', kind: 'internship',
    title: 'Πρακτική σε νομικό γραφείο', organizer: 'Δικηγορικό γραφείο (δείγμα)', location: 'Αθήνα, κέντρο',
    deadline: '2026-11-30', description: 'Για φοιτητές Νομικής από το 3ο έτος',
    details: 'Υποστήριξη στην έρευνα νομολογίας και στη σύνταξη υπομνημάτων, με καθοδήγηση από έμπειρους δικηγόρους.',
  },
  {
    id: 'op-nkua-3', universityId: 'nkua', kind: 'internship',
    title: 'Πρακτική σε εργαστήριο βιολογίας', organizer: 'Ερευνητικό κέντρο (δείγμα)', location: 'Αθήνα',
    deadline: '2026-12-10', description: 'Εργαστηριακή εμπειρία για φοιτητές Θετικών Επιστημών',
    details: 'Συμμετοχή σε ερευνητικό πρόγραμμα με εργαστηριακές μετρήσεις και ανάλυση δεδομένων.',
  },

  // ΕΜΠ
  {
    id: 'op-ntua-1', universityId: 'ntua', kind: 'internship',
    title: 'Πρακτική σε τεχνική εταιρεία', organizer: 'Τεχνική εταιρεία (δείγμα)', location: 'Αθήνα και εργοτάξια',
    deadline: '2026-11-20', description: 'Για φοιτητές Πολιτικών Μηχανικών',
    details: 'Παρακολούθηση έργων υποδομής, μελέτες και επισκέψεις σε εργοτάξια με επίβλεψη μηχανικού.',
  },
  {
    id: 'op-ntua-2', universityId: 'ntua', kind: 'internship',
    title: 'Πρακτική σε ενσωματωμένα συστήματα', organizer: 'Εταιρεία ηλεκτρονικών (δείγμα)', location: 'Αθήνα',
    deadline: '2026-12-01', description: 'Για φοιτητές ΗΜΜΥ',
    details: 'Ανάπτυξη firmware και δοκιμές πλακετών σε ομάδα μηχανικών. Βοηθά η εμπειρία με C.',
  },
  {
    id: 'op-ntua-3', universityId: 'ntua', kind: 'internship',
    title: 'Πρακτική σε αρχιτεκτονικό γραφείο', organizer: 'Αρχιτεκτονικό γραφείο (δείγμα)', location: 'Αθήνα',
    deadline: '2026-12-15', description: 'Για φοιτητές Αρχιτεκτονικής',
    details: 'Συμμετοχή σε μελέτες, μακέτες και παρουσιάσεις έργων.',
  },

  // ΠΑΔΑ
  {
    id: 'op-uniwa-1', universityId: 'uniwa', kind: 'internship',
    title: 'Πρακτική σε υποστήριξη IT', organizer: 'Εταιρεία πληροφορικής (δείγμα)', location: 'Αιγάλεω',
    deadline: '2026-11-18', description: 'Για φοιτητές Μηχανικών Πληροφορικής',
    details: 'Υποστήριξη χρηστών, εγκαταστάσεις δικτύων και διαχείριση συστημάτων.',
  },
  {
    id: 'op-uniwa-2', universityId: 'uniwa', kind: 'internship',
    title: 'Κλινική πρακτική σε νοσοκομείο', organizer: 'Νοσοκομείο (δείγμα)', location: 'Αθήνα',
    deadline: '2026-12-05', description: 'Για φοιτητές Νοσηλευτικής',
    details: 'Κλινική άσκηση σε τμήματα του νοσοκομείου με επίβλεψη από νοσηλευτές.',
  },
  {
    id: 'op-uniwa-3', universityId: 'uniwa', kind: 'internship',
    title: 'Πρακτική σε στούντιο γραφιστικής', organizer: 'Δημιουργικό στούντιο (δείγμα)', location: 'Αθήνα',
    deadline: '2026-12-12', description: 'Για φοιτητές Γραφιστικής',
    details: 'Σχεδιασμός εντύπων, ψηφιακών καμπανιών και οπτικής ταυτότητας για πελάτες του στούντιο.',
  },

  // Όλα τα πανεπιστήμια
  {
    id: 'op-all-1', universityId: 'all', kind: 'hackathon',
    title: 'Διαπανεπιστημιακό hackathon Αθήνας', organizer: 'Φοιτητικές ομάδες (δείγμα)', location: 'Αθήνα, 48 ώρες',
    deadline: '2026-11-08', description: 'Ομάδες από φοιτητές διαφορετικών πανεπιστημίων',
    details: 'Φτιάξε ομάδα 3-5 ατόμων και ανάπτυξε μια ιδέα για τη φοιτητική ζωή μέσα σε ένα Σαββατοκύριακο. Ανοιχτό σε όλες τις σχολές.',
  },
  {
    id: 'op-all-2', universityId: 'all', kind: 'hackathon',
    title: 'Green Campus Challenge', organizer: 'Φοιτητικές ομάδες (δείγμα)', location: 'Online',
    deadline: '2026-11-25', description: 'Ιδέες για πιο βιώσιμες πανεπιστημιουπόλεις',
    details: 'Διαγωνισμός ιδεών για ενέργεια, ανακύκλωση και μετακινήσεις στα πανεπιστήμια. Δεν χρειάζεται εμπειρία προγραμματισμού.',
  },
  {
    id: 'op-all-3', universityId: 'all', kind: 'hackathon',
    title: 'Data for Athens Datathon', organizer: 'Φοιτητικές ομάδες (δείγμα)', location: 'Αθήνα',
    deadline: '2026-12-20', description: 'Ανάλυση ανοιχτών δεδομένων για την πόλη',
    details: 'Δουλεύεις με ανοιχτά δεδομένα για συγκοινωνίες και δημόσιο χώρο και παρουσιάζεις τα ευρήματα σε επιτροπή.',
  },
]
