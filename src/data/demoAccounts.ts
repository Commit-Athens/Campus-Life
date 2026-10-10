import type { DemoAccount } from '../types'

// Fake accounts for the demo login. The .demo domain is intentionally not a real address.
export const DEMO_PASSWORD = 'demo1234'

export const demoAccounts: DemoAccount[] = [
  {
    email: 'maria@campuslife.demo',
    password: DEMO_PASSWORD,
    name: 'Μαρία Παπαδοπούλου',
    age: 18,
    universityId: 'nkua',
    faculty: 'Σχολή Νομικών, Οικονομικών και Πολιτικών Επιστημών',
    department: 'Τμήμα Νομικής',
    year: 1,
  },
  {
    email: 'nikos@campuslife.demo',
    password: DEMO_PASSWORD,
    name: 'Νίκος Κωνσταντίνου',
    age: 20,
    universityId: 'ntua',
    faculty: 'Σχολή Ηλεκτρολόγων Μηχανικών και Μηχανικών Υπολογιστών',
    department: 'Σχολή Ηλεκτρολόγων Μηχανικών και Μηχανικών Υπολογιστών',
    year: 2,
  },
  {
    email: 'eleni@campuslife.demo',
    password: DEMO_PASSWORD,
    name: 'Ελένη Δημητρίου',
    age: 19,
    universityId: 'uniwa',
    faculty: 'Σχολή Μηχανικών',
    department: 'Τμήμα Μηχανικών Πληροφορικής και Υπολογιστών',
    year: 1,
  },
]

export function findAccount(email: string): DemoAccount | undefined {
  const normalized = email.trim().toLowerCase()
  return demoAccounts.find((a) => a.email === normalized)
}
