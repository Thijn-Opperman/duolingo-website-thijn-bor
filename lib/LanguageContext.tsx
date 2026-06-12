'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { translations, type Language, type Translations } from './i18n'

interface LanguageState {
  lang: Language
  setLang: (lang: Language) => void
  t: Translations[Language]
}

const LanguageContext = createContext<LanguageState | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('nl')

  useEffect(() => {
    const saved = localStorage.getItem('duoproject-lang') as Language | null
    if (saved === 'nl' || saved === 'en') setLangState(saved)
  }, [])

  const setLang = useCallback((l: Language) => {
    setLangState(l)
    localStorage.setItem('duoproject-lang', l)
  }, [])

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageState {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
