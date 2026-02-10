import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import type { ReactNode } from 'react'
import type { Language, LocalizedString, UITranslations } from '@/shared/types/i18n.ts'

import en from '@/data/i18n/en.json'
import es from '@/data/i18n/es.json'
import qu from '@/data/i18n/qu.json'

const translations: Record<Language, UITranslations> = {
  en: en as UITranslations,
  es: es as UITranslations,
  qu: qu as UITranslations,
}

interface LanguageContextValue {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: keyof UITranslations) => string
  localize: (obj: LocalizedString) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function detectBrowserLanguage(): Language {
  for (const locale of navigator.languages ?? [navigator.language]) {
    const lang = locale.toLowerCase().split('-')[0]
    if (lang === 'es') return 'es'
    if (lang === 'qu') return 'qu'
    if (lang === 'en') return 'en'
  }
  return 'en'
}

function getInitialLanguage(): Language {
  const stored = localStorage.getItem('peruvian-pot-lang')
  if (stored === 'en' || stored === 'es' || stored === 'qu') return stored
  return detectBrowserLanguage()
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage)

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('peruvian-pot-lang', lang)
  }, [])

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const t = useCallback(
    (key: keyof UITranslations) => translations[language][key] ?? key,
    [language],
  )

  const localize = useCallback(
    (obj: LocalizedString) => obj[language] ?? obj.en,
    [language],
  )

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, localize }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
