import type { ChatChannel, ChatMessage, UniversityId } from '../types'

export const chatChannels: ChatChannel[] = ['general', 'exams', 'housing', 'random']

const samples: Record<UniversityId, Record<ChatChannel, ChatMessage[]>> = {
  nkua: {
    general: [
      { id: 'nkua-c1', author: 'Μαρία Π.', body: 'Δείγμα μηνύματος. Κάποιος για καφέ στη σχολή αύριο;', minutesAgo: 30 },
      { id: 'nkua-c2', author: 'Νίκος Α.', body: 'Δείγμα. Εγώ μετά τη διάλεξη.', minutesAgo: 12 },
    ],
    exams: [{ id: 'nkua-c3', author: 'Ελένη Κ.', body: 'Δείγμα. Η πρόοδος άλγεβρας είναι την Πέμπτη, σωστά;', minutesAgo: 90 }],
    housing: [{ id: 'nkua-c4', author: 'Γιώργος Λ.', body: 'Δείγμα. Ψάχνω συγκάτοικο στα Ιλίσια από τον επόμενο μήνα.', minutesAgo: 200 }],
    random: [{ id: 'nkua-c5', author: 'Άννα Σ.', body: 'Δείγμα. Ποιος έχει καλή playlist για διάβασμα;', minutesAgo: 50 }],
  },
  ntua: {
    general: [{ id: 'ntua-c1', author: 'Δημήτρης Β.', body: 'Δείγμα. Ανοιχτό το εργαστήριο σήμερα;', minutesAgo: 40 }],
    exams: [{ id: 'ntua-c2', author: 'Σοφία Μ.', body: 'Δείγμα. Θέλω ομάδα για τις ασκήσεις στατικής.', minutesAgo: 70 }],
    housing: [{ id: 'ntua-c3', author: 'Κώστας Ρ.', body: 'Δείγμα. Δωμάτιο στη Ζωγράφου, δείγμα αγγελίας στο Community.', minutesAgo: 300 }],
    random: [{ id: 'ntua-c4', author: 'Ηλίας Τ.', body: 'Δείγμα. Ποδόσφαιρο το απόγευμα στο προαύλιο;', minutesAgo: 15 }],
  },
  uniwa: {
    general: [{ id: 'uniwa-c1', author: 'Κατερίνα Δ.', body: 'Δείγμα. Σε ποια πύλη του Άλσους βγαίνει το λεωφορείο;', minutesAgo: 25 }],
    exams: [{ id: 'uniwa-c2', author: 'Πέτρος Ν.', body: 'Δείγμα. Επανάληψη βάσεων δεδομένων την Κυριακή.', minutesAgo: 110 }],
    housing: [{ id: 'uniwa-c3', author: 'Ιωάννα Φ.', body: 'Δείγμα. Ψάχνω δωμάτιο στο Αιγάλεω.', minutesAgo: 180 }],
    random: [{ id: 'uniwa-c4', author: 'Αλέξης Η.', body: 'Δείγμα. Κανείς για εκτύπωση poster;', minutesAgo: 60 }],
  },
}

export function sampleChat(universityId: UniversityId, channel: ChatChannel): ChatMessage[] {
  return samples[universityId][channel]
}
