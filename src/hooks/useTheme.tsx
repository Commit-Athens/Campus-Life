import { createContext, useContext } from 'react'

export type ThemePreference = 'system' | 'light' | 'dark'

export const THEME_KEY = 'campuslife.theme'

export type ThemeContextValue = {
  preference: ThemePreference
  setPreference: (preference: ThemePreference) => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

/** Light / dark / follow the device. Must be used inside <ThemeProvider>. */
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>')
  return ctx
}
