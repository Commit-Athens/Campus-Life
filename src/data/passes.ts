import type { PartnerPass } from '../types'

// 15 fictional partner passes (5 per university). Names are invented; nothing here is redeemable.
export const passes: PartnerPass[] = [
  // ΕΚΠΑ
  { id: 'pass-nkua-1', universityId: 'nkua', partner: 'Καφέ Το Τετράδιο', category: 'cafe', area: 'Ζωγράφου', offer: '-20% σε όλα τα ροφήματα', terms: 'Με την ακαδημαϊκή ταυτότητα, καθημερινές.' },
  { id: 'pass-nkua-2', universityId: 'nkua', partner: 'Ψητοπωλείο Η Γωνιά', category: 'food', area: 'Ζωγράφου', offer: 'Φοιτητικό μενού 5€', terms: 'Πιάτο ημέρας με αναψυκτικό, 12:00-17:00.' },
  { id: 'pass-nkua-3', universityId: 'nkua', partner: 'Βιβλιοπωλείο Σελίδες', category: 'books', area: 'Πανεπιστημίου', offer: '-15% σε βιβλία εκτός Εύδοξου', terms: 'Δεν ισχύει σε προσφορές.' },
  { id: 'pass-nkua-4', universityId: 'nkua', partner: 'Γυμναστήριο Κίνηση', category: 'gym', area: 'Ιλίσια', offer: 'Μία εβδομάδα δωρεάν', terms: 'Μία φορά ανά φοιτητή.' },
  { id: 'pass-nkua-5', universityId: 'nkua', partner: 'Πλυντήριο Αφρός', category: 'services', area: 'Γουδή', offer: '-25% σε πλύσιμο και στέγνωμα', terms: 'Ισχύει Δευτέρα έως Πέμπτη.' },

  // ΕΜΠ
  { id: 'pass-ntua-1', universityId: 'ntua', partner: 'Καφέ Ροπή', category: 'cafe', area: 'Πολυτεχνειούπολη', offer: '2 freddo στην τιμή του 1', terms: 'Καθημερινές μέχρι τις 11:00.' },
  { id: 'pass-ntua-2', universityId: 'ntua', partner: 'Σουβλατζίδικο Το Κύκλωμα', category: 'food', area: 'Ζωγράφου', offer: 'Δωρεάν πατάτες με κάθε τυλιχτό', terms: 'Με την ακαδημαϊκή ταυτότητα.' },
  { id: 'pass-ntua-3', universityId: 'ntua', partner: 'Εκτυπωτικό Κέντρο Σχέδιο', category: 'books', area: 'Ζωγράφου', offer: '-10% σε εκτυπώσεις και plotter', terms: 'Για σχέδια και εργασίες σχολής.' },
  { id: 'pass-ntua-4', universityId: 'ntua', partner: 'Επισκευές Κύκλωμα+', category: 'services', area: 'Ιλίσια', offer: '-15% σε επισκευή οθόνης', terms: 'Για laptop και κινητά.' },
  { id: 'pass-ntua-5', universityId: 'ntua', partner: 'Αναρρίχηση Κορυφή', category: 'gym', area: 'Καισαριανή', offer: 'Πρώτη είσοδος δωρεάν', terms: 'Μία φορά ανά φοιτητή, με κράτηση.' },

  // ΠΑΔΑ
  { id: 'pass-uniwa-1', universityId: 'uniwa', partner: 'Καφέ Άλσος', category: 'cafe', area: 'Αιγάλεω', offer: '-20% σε καφέ και σνακ', terms: 'Με την ακαδημαϊκή ταυτότητα.' },
  { id: 'pass-uniwa-2', universityId: 'uniwa', partner: 'Φούρνος Το Προζύμι', category: 'food', area: 'Αιγάλεω', offer: 'Δωρεάν τσάι με κάθε πίτα', terms: 'Πρωινές ώρες.' },
  { id: 'pass-uniwa-3', universityId: 'uniwa', partner: 'Copy Point Ελαιώνας', category: 'books', area: 'Αρχαίος Ελαιώνας', offer: '-10% σε εκτυπώσεις', terms: 'Για εργασίες και αφίσες.' },
  { id: 'pass-uniwa-4', universityId: 'uniwa', partner: 'Γυμναστήριο Ρυθμός', category: 'gym', area: 'Αιγάλεω', offer: 'Φοιτητική συνδρομή -30%', terms: 'Για μηνιαία συνδρομή.' },
  { id: 'pass-uniwa-5', universityId: 'uniwa', partner: 'Κουρείο Ψαλίδι', category: 'services', area: 'Αιγάλεω', offer: 'Φοιτητικό κούρεμα 10€', terms: 'Καθημερινές.' },
]

/** Demo code shown on a claimed pass, stable per pass. */
export function passCode(pass: PartnerPass): string {
  const digits = [...pass.id].reduce((sum, ch) => (sum * 31 + ch.charCodeAt(0)) % 10000, 7)
  return `CL-${pass.universityId.toUpperCase()}-${String(digits).padStart(4, '0')}`
}
