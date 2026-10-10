import { createContext, useContext } from 'react'
import type { DemoAccount } from '../types'

export type AuthContextValue = {
  account: DemoAccount | null
  /** Returns false if the email/password don't match a demo account. */
  login: (email: string, password: string) => boolean
  logout: () => void
  /** True once the logged-in account passed the demo student verification. */
  verified: boolean
  /** Student card ID of the verified account, or null. */
  studentId: string | null
  /** Marks the account verified. Validate first with `validateVerification`. */
  verify: (name: string, studentId: string) => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)

/** The logged-in demo account. Must be used inside <AuthProvider>. */
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
