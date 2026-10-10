import type { HousingListing } from '../types'

/** Fictional housing cards. Areas are near each campus; nothing here is a real listing. */
export const housingListings: HousingListing[] = [
  { id: 'nkua-h1', universityId: 'nkua', kind: 'room', title: 'Δωμάτιο κοντά στη Ζωγράφου', area: 'Ζωγράφου', rent: '320€', description: 'Δείγμα αγγελίας. Μονόκλινο, κοινόχρηστη κουζίνα.' },
  { id: 'nkua-h2', universityId: 'nkua', kind: 'roommate', title: 'Ψάχνω συγκάτοικο, Ιλίσια', area: 'Ιλίσια', rent: '280€', description: 'Δείγμα. Ήσυχος φοιτητής, 3ος όροφος.' },
  { id: 'nkua-h3', universityId: 'nkua', kind: 'room', title: 'Δωμάτιο στο κέντρο', area: 'Εξάρχεια', rent: '350€', description: 'Δείγμα. Κοντά σε λεωφορεία προς την Πανεπιστημιούπολη.' },
  { id: 'nkua-h4', universityId: 'nkua', kind: 'roommate', title: 'Συγκάτοικος για διαμέρισμα', area: 'Καισαριανή', rent: '300€', description: 'Δείγμα. Δύο υπνοδωμάτια, ήδη μένει μία φοιτήτρια.' },
  { id: 'nkua-h5', universityId: 'nkua', kind: 'room', title: 'Studio, Γουδή', area: 'Γουδή', rent: '400€', description: 'Δείγμα. Μικρό studio, λογαριασμοί εκτός.' },
  { id: 'ntua-h1', universityId: 'ntua', kind: 'room', title: 'Δωμάτιο στην Πολυτεχνειούπολη', area: 'Ζωγράφου', rent: '310€', description: 'Δείγμα. 10 λεπτά με τα πόδια από τις πύλες.' },
  { id: 'ntua-h2', universityId: 'ntua', kind: 'roommate', title: 'Συγκάτοικος, Παπάγου', area: 'Παπάγου', rent: '290€', description: 'Δείγμα. Ήσυχο σπίτι, δύο φοιτητές ΕΜΠ.' },
  { id: 'ntua-h3', universityId: 'ntua', kind: 'room', title: 'Δωμάτιο, Πατήσια', area: 'Πατήσια', rent: '270€', description: 'Δείγμα. Κοντά στο συγκρότημα Πατησίων.' },
  { id: 'ntua-h4', universityId: 'ntua', kind: 'roommate', title: 'Ψάχνω τρίτο άτομο', area: 'Καισαριανή', rent: '260€', description: 'Δείγμα. Κοινόχρηστα έξοδα χωριστά.' },
  { id: 'ntua-h5', universityId: 'ntua', kind: 'room', title: 'Δωμάτιο, Άνω Ιλίσια', area: 'Ιλίσια', rent: '330€', description: 'Δείγμα. Επιπλωμένο, διαθέσιμο από τον επόμενο μήνα.' },
  { id: 'uniwa-h1', universityId: 'uniwa', kind: 'room', title: 'Δωμάτιο στο Αιγάλεω', area: 'Αιγάλεω', rent: '250€', description: 'Δείγμα. Κοντά στην πανεπιστημιούπολη Άλσους.' },
  { id: 'uniwa-h2', universityId: 'uniwa', kind: 'roommate', title: 'Συγκάτοικος, Αιγάλεω', area: 'Αιγάλεω', rent: '230€', description: 'Δείγμα. Διαμέρισμα δύο υπνοδωματίων.' },
  { id: 'uniwa-h3', universityId: 'uniwa', kind: 'room', title: 'Δωμάτιο, Ελαιώνας', area: 'Ελαιώνας', rent: '280€', description: 'Δείγμα. Κοντά στην πανεπιστημιούπολη Αρχαίου Ελαιώνα.' },
  { id: 'uniwa-h4', universityId: 'uniwa', kind: 'roommate', title: 'Συγκάτοικος στο κέντρο', area: 'Μεταξουργείο', rent: '300€', description: 'Δείγμα. Για την πανεπιστημιούπολη Αθηνών.' },
  { id: 'uniwa-h5', universityId: 'uniwa', kind: 'room', title: 'Δωμάτιο, Περιστέρι', area: 'Περιστέρι', rent: '240€', description: 'Δείγμα. Λεωφορείο προς το Άλσος.' },
]
