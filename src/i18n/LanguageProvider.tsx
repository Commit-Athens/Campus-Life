import { useEffect, useMemo, type ReactNode } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { en } from './en'
import { messagesElCatalog, setActiveMessages, type Lang, type Messages } from './el'
import { LanguageContext } from './languageContext'

const catalogs: Record<Lang, Messages> = { el: messagesElCatalog, en }

function asLang(value: unknown): Lang {
  return value === 'en' ? 'en' : 'el'
}

/** Persists the UI language and points the shared `el` catalog at it before children render. */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [stored, setStored] = useLocalStorage<Lang>('campuslife.lang', 'el')
  const lang = asLang(stored)

  setActiveMessages(catalogs[lang], lang)

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const value = useMemo(
    () => ({
      lang,
      setLang: (next: Lang) => setStored(next),
    }),
    [lang, setStored],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
