import type { Exam } from '../types'

// Sample exam slots for the winter exam period. Not an official timetable.
export const exams: Exam[] = [
  // ΕΚΠΑ
  { id: 'ex-nkua-1', universityId: 'nkua', course: 'Διακριτά Μαθηματικά', date: '2027-01-18', time: '09:00', location: 'Αμφιθέατρο Α1, Ζωγράφου' },
  { id: 'ex-nkua-2', universityId: 'nkua', course: 'Εισαγωγή στον Προγραμματισμό', date: '2027-01-20', time: '12:00', location: 'Αίθουσα Α2, Ζωγράφου' },
  { id: 'ex-nkua-3', universityId: 'nkua', course: 'Γραμμική Άλγεβρα', date: '2027-01-22', time: '15:00', location: 'Αμφιθέατρο Α1, Ζωγράφου' },
  { id: 'ex-nkua-4', universityId: 'nkua', course: 'Λογική Σχεδίαση', date: '2027-01-26', time: '09:00', location: 'Αίθουσα Β1, Ζωγράφου' },
  { id: 'ex-nkua-5', universityId: 'nkua', course: 'Αγγλικά για Πληροφορική', date: '2027-01-29', time: '12:00', location: 'Αίθουσα Α3, Ζωγράφου' },

  // ΕΜΠ
  { id: 'ex-ntua-1', universityId: 'ntua', course: 'Μαθηματική Ανάλυση Ι', date: '2027-01-18', time: '08:30', location: 'Αμφιθέατρο κτιρίου ΗΜΜΥ' },
  { id: 'ex-ntua-2', universityId: 'ntua', course: 'Φυσική Ι', date: '2027-01-21', time: '11:30', location: 'Αμφιθέατρο Πολιτικών Μηχανικών' },
  { id: 'ex-ntua-3', universityId: 'ntua', course: 'Στατική Ι', date: '2027-01-25', time: '08:30', location: 'Αμφιθέατρο Πολιτικών Μηχανικών' },
  { id: 'ex-ntua-4', universityId: 'ntua', course: 'Προγραμματισμός Ηλεκτρονικών Υπολογιστών', date: '2027-01-27', time: '14:30', location: 'Εργαστήριο υπολογιστών ΗΜΜΥ' },
  { id: 'ex-ntua-5', universityId: 'ntua', course: 'Μηχανολογικό Σχέδιο', date: '2027-02-01', time: '11:30', location: 'Αίθουσα σχεδίου, Μηχανολόγων' },

  // ΠΑΔΑ
  { id: 'ex-uniwa-1', universityId: 'uniwa', course: 'Προγραμματισμός Ι', date: '2027-01-19', time: '10:00', location: 'Εργαστήριο Η/Υ, Άλσος Αιγάλεω' },
  { id: 'ex-uniwa-2', universityId: 'uniwa', course: 'Ανατομία', date: '2027-01-21', time: '13:00', location: 'Αμφιθέατρο, Αρχαίος Ελαιώνας' },
  { id: 'ex-uniwa-3', universityId: 'uniwa', course: 'Μαθηματικά Ι', date: '2027-01-22', time: '10:00', location: 'Αμφιθέατρο, Άλσος Αιγάλεω' },
  { id: 'ex-uniwa-4', universityId: 'uniwa', course: 'Τυπογραφία', date: '2027-01-27', time: '16:00', location: 'Αίθουσα Γραφιστικής, Άλσος Αιγάλεω' },
  { id: 'ex-uniwa-5', universityId: 'uniwa', course: 'Ψηφιακά Συστήματα', date: '2027-02-02', time: '10:00', location: 'Αίθουσα Β2, Άλσος Αιγάλεω' },
]
