import type { ReactNode } from 'react'
import { findAccount } from '../data/demoAccounts'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { AuthContext } from '../hooks/useAuth'
import { useUniversity } from '../hooks/useUniversity'

type StoredVerification = { email: string; name: string; studentId: string }

/** Demo-only login and student verification, remembered in localStorage. No real authentication. */
export function AuthProvider({ children }: { children: ReactNode }) {
  const { setUniversityId } = useUniversity()
  const [email, setEmail] = useLocalStorage<string | null>('campuslife.session', null)
  const [verification, setVerification] = useLocalStorage<StoredVerification | null>('campuslife.verification', null)
  const account = typeof email === 'string' ? (findAccount(email) ?? null) : null
  const verified = account !== null && verification?.email === account.email

  const login = (inputEmail: string, password: string) => {
    const match = findAccount(inputEmail)
    if (!match || match.password !== password) return false
    setEmail(match.email)
    setUniversityId(match.universityId)
    return true
  }

  const logout = () => {
    setEmail(null)
    setVerification(null)
  }

  const verify = (name: string, studentId: string) => {
    if (!account) return
    setVerification({ email: account.email, name: name.trim(), studentId: studentId.trim() })
  }

  return (
    <AuthContext.Provider
      value={{ account, login, logout, verified, studentId: verified ? verification.studentId : null, verify }}
    >
      {children}
    </AuthContext.Provider>
  )
}
