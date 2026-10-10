// Profile pictures for the fictional sample people. Anyone not listed gets coloured initials.
// Photos are AI-generated faces (thispersondoesnotexist.com), so no real person is shown.
// Illustrations are DiceBear "Notionists" by Zoish, CC0 1.0.
export const avatarImages: Record<string, string> = {
  // Demo accounts
  'Μαρία Παπαδοπούλου': '/avatars/maria-papadopoulou.jpg',
  'Νίκος Κωνσταντίνου': '/avatars/nikos-konstantinou.jpg',
  'Ελένη Δημητρίου': '/avatars/eleni-dimitriou.jpg',

  // Student feed authors: photos
  'Άννα Β.': '/avatars/anna-v.jpg',
  'Γιώργος Π.': '/avatars/giorgos-p.jpg',
  'Δημήτρης Α.': '/avatars/dimitris-a.jpg',
  'Ελένη Σ.': '/avatars/eleni-s.jpg',
  'Ιωάννα Δ.': '/avatars/ioanna-d.jpg',
  'Κατερίνα Λ.': '/avatars/katerina-l.jpg',
  'Μαρία Κ.': '/avatars/maria-k.jpg',
  'Νίκος Μ.': '/avatars/nikos-m.jpg',
  'Παναγιώτης Ρ.': '/avatars/panagiotis-r.jpg',
  'Σπύρος Τ.': '/avatars/spyros-t.jpg',
  'Στέφανος Κ.': '/avatars/stefanos-k.jpg',
  'Χριστίνα Ν.': '/avatars/christina-n.jpg',
  'Δανάη Χ.': '/avatars/danai-ch.jpg',

  // Lost & Found and a few others: illustrations
  'Αλέξης Θ.': '/avatars/alexis-th.svg',
  'Βασίλης Ο.': '/avatars/vasilis-o.svg',
  'Ζωή Μ.': '/avatars/zoi-m.svg',
  'Ηλέκτρα Π.': '/avatars/ilektra-p.svg',
  'Θοδωρής Κ.': '/avatars/thodoris-k.svg',
  'Κωνσταντίνος Β.': '/avatars/konstantinos-v.svg',
  'Λευτέρης Α.': '/avatars/lefteris-a.svg',
  'Μελίνα Ζ.': '/avatars/melina-z.svg',
  'Μυρτώ Σ.': '/avatars/myrto-s.svg',
  'Ραφαήλ Γ.': '/avatars/rafail-g.svg',
  'Φοίβος Ε.': '/avatars/foivos-e.svg',
  'Σοφία Μ.': '/avatars/sofia-m.svg',
}

export function avatarFor(name: string): string | undefined {
  return avatarImages[name]
}
