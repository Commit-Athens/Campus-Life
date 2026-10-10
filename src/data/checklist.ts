import type { ChecklistItem } from '../types'

// First-year checklist (sample). General steps plus a couple per university.
export const checklist: ChecklistItem[] = [
  { id: 'cl-account', universityId: 'all', title: 'Ενεργοποίησε τον ιδρυματικό λογαριασμό', description: 'Τον χρειάζεσαι για email, Wi-Fi και τις ηλεκτρονικές υπηρεσίες.' },
  { id: 'cl-id', universityId: 'all', title: 'Κάνε αίτηση για ακαδημαϊκή ταυτότητα', description: 'Για μειωμένο εισιτήριο και φοιτητικές εκπτώσεις.' },
  { id: 'cl-courses', universityId: 'all', title: 'Δήλωσε τα μαθήματα του εξαμήνου', description: 'Πρόσεξε την προθεσμία της γραμματείας.' },
  { id: 'cl-books', universityId: 'all', title: 'Δήλωσε συγγράμματα στον Εύδοξο', description: 'Μετά τη δήλωση μαθημάτων, για να πάρεις δωρεάν βιβλία.' },
  { id: 'cl-meals', universityId: 'all', title: 'Δες αν δικαιούσαι δωρεάν σίτιση', description: 'Η αίτηση γίνεται στην αρχή της χρονιάς.' },
  { id: 'cl-library', universityId: 'all', title: 'Γράψου στη βιβλιοθήκη', description: 'Δανεισμός βιβλίων και θέση για διάβασμα.' },

  { id: 'cl-nkua-campus', universityId: 'nkua', title: 'Βρες πού είναι η Σχολή σου', description: 'Κάποιες Σχολές είναι στη Ζωγράφου και κάποιες στο κέντρο.' },
  { id: 'cl-nkua-eclass', universityId: 'nkua', title: 'Γράψου στα μαθήματα στο eClass', description: 'Εκεί ανεβαίνουν σημειώσεις και ανακοινώσεις διδασκόντων.' },

  { id: 'cl-ntua-campus', universityId: 'ntua', title: 'Κάνε μια βόλτα στην Πολυτεχνειούπολη', description: 'Μάθε πού είναι τα κτίρια, η Λέσχη και η Κεντρική Βιβλιοθήκη.' },
  { id: 'cl-ntua-labs', universityId: 'ntua', title: 'Δήλωσε τα εργαστήρια', description: 'Οι θέσεις ανά τμήμα εργαστηρίου γεμίζουν γρήγορα.' },

  { id: 'cl-uniwa-campus', universityId: 'uniwa', title: 'Μάθε σε ποια πανεπιστημιούπολη είναι το τμήμα σου', description: 'Άλσος Αιγάλεω, Αρχαίος Ελαιώνας ή Αθήνα.' },
  { id: 'cl-uniwa-platform', universityId: 'uniwa', title: 'Γράψου στην πλατφόρμα μαθημάτων', description: 'Εκεί θα βρεις υλικό και ανακοινώσεις για κάθε μάθημα.' },
]
