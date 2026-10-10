import { createContext, useContext } from 'react'
import type { Lang } from './el'

export type LanguageContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)

export function useLanguage(): LanguageContextValue {
  const value = useContext(LanguageContext)
  if (!value) throw new Error('useLanguage must be used within LanguageProvider')
  return value
}
