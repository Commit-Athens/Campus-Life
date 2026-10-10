import type { ReactNode } from 'react'
import { findAccount } from '../data/demoAccounts'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { AuthContext } from '../hooks/useAuth'
import { useUniversity } from '../hooks/useUniversity'

/** Demo-only login: remembers the account email in localStorage. No real authentication. */
export function AuthProvider({ children }: { children: ReactNode }) {
  const { setUniversityId } = useUniversity()
  const [email, setEmail] = useLocalStorage<string | null>('campuslife.session', null)
  const account = typeof email === 'string' ? (findAccount(email) ?? null) : null

  const login = (inputEmail: string, password: string) => {
    const match = findAccount(inputEmail)
    if (!match || match.password !== password) return false
    setEmail(match.email)
    setUniversityId(match.universityId)
    return true
  }

  const logout = () => setEmail(null)

  return <AuthContext.Provider value={{ account, login, logout }}>{children}</AuthContext.Provider>
}
