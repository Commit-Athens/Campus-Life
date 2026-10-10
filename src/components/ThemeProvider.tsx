import { useEffect, type ReactNode } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { THEME_KEY, ThemeContext, type ThemePreference } from '../hooks/useTheme'

const DARK_QUERY = '(prefers-color-scheme: dark)'

/** Applies the theme as <html data-theme="light|dark">, following the device when set to "system". */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreference] = useLocalStorage<ThemePreference>(THEME_KEY, 'system')

  useEffect(() => {
    const media = window.matchMedia(DARK_QUERY)
    const apply = () => {
      const dark = preference === 'dark' || (preference === 'system' && media.matches)
      document.documentElement.dataset.theme = dark ? 'dark' : 'light'
    }
    apply()
    media.addEventListener('change', apply)
    return () => media.removeEventListener('change', apply)
  }, [preference])

  return <ThemeContext.Provider value={{ preference, setPreference }}>{children}</ThemeContext.Provider>
}
