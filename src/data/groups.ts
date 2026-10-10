import type { StudyGroup } from '../types'

/** Sample study groups. Member counts are starting numbers; Join adds one locally. */
export const studyGroups: StudyGroup[] = [
  { id: 'nkua-g1', universityId: 'nkua', name: 'Γραμμική Άλγεβρα', course: 'Γραμμική Άλγεβρα', members: 18, nextSession: 'Πέμπτη 18:00' },
  { id: 'nkua-g2', universityId: 'nkua', name: 'Αλγόριθμοι, ήσυχα', course: 'Αλγόριθμοι', members: 12, nextSession: 'Τρίτη 17:00' },
  { id: 'nkua-g3', universityId: 'nkua', name: 'Νεοελληνική φιλολογία', course: 'Νεοελληνική φιλολογία', members: 9, nextSession: 'Δευτέρα 19:00' },
  { id: 'nkua-g4', universityId: 'nkua', name: 'Ανατομία, επανάληψη', course: 'Ανατομία', members: 22, nextSession: 'Σάββατο 11:00' },
  { id: 'nkua-g5', universityId: 'nkua', name: 'Συνταγματικό δίκαιο', course: 'Συνταγματικό δίκαιο', members: 14, nextSession: 'Τετάρτη 16:30' },
  { id: 'ntua-g1', universityId: 'ntua', name: 'Στατική, ομάδα Α', course: 'Στατική', members: 16, nextSession: 'Δευτέρα 18:00' },
  { id: 'ntua-g2', universityId: 'ntua', name: 'Κυκλώματα πριν την πρόοδο', course: 'Ηλεκτρικά κυκλώματα', members: 20, nextSession: 'Τετάρτη 19:00' },
  { id: 'ntua-g3', universityId: 'ntua', name: 'Θερμοδυναμική', course: 'Θερμοδυναμική', members: 11, nextSession: 'Πέμπτη 17:30' },
  { id: 'ntua-g4', universityId: 'ntua', name: 'Αρχιτεκτονική σύνθεση', course: 'Αρχιτεκτονική σύνθεση', members: 8, nextSession: 'Παρασκευή 15:00' },
  { id: 'ntua-g5', universityId: 'ntua', name: 'Προγραμματισμός C', course: 'Προγραμματισμός', members: 24, nextSession: 'Τρίτη 20:00' },
  { id: 'uniwa-g1', universityId: 'uniwa', name: 'Βάσεις δεδομένων', course: 'Βάσεις δεδομένων', members: 15, nextSession: 'Δευτέρα 18:30' },
  { id: 'uniwa-g2', universityId: 'uniwa', name: 'Νοσηλευτική, κλινικά', course: 'Κλινική νοσηλευτική', members: 13, nextSession: 'Τετάρτη 17:00' },
  { id: 'uniwa-g3', universityId: 'uniwa', name: 'Επιστήμη τροφίμων', course: 'Χημεία τροφίμων', members: 10, nextSession: 'Πέμπτη 16:00' },
  { id: 'uniwa-g4', universityId: 'uniwa', name: 'Γραφιστική, portfolio', course: 'Γραφιστική', members: 7, nextSession: 'Σάββατο 12:00' },
  { id: 'uniwa-g5', universityId: 'uniwa', name: 'Λογιστική', course: 'Χρηματοοικονομική λογιστική', members: 17, nextSession: 'Τρίτη 19:00' },
  { id: 'all-g1', universityId: 'all', name: 'Hackathon prep', course: 'Προγραμματισμός', members: 31, nextSession: 'Κυριακή 11:00' },
]
