'use client'

import { useLanguage } from '@/lib/LanguageContext'
import { type Language } from '@/lib/i18n'

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage()

  const btn = (l: Language, label: string) => (
    <button
      key={l}
      onClick={() => setLang(l)}
      aria-label={`Switch to ${label}`}
      className="px-2 py-1 rounded-lg text-xs font-bold transition-all"
      style={
        lang === l
          ? { background: 'var(--duo-green)', color: '#fff' }
          : { background: 'transparent', color: 'var(--text-secondary)' }
      }
    >
      {label}
    </button>
  )

  return (
    <div
      className="flex items-center gap-0.5 rounded-xl p-0.5"
      style={{ background: 'var(--bg-secondary)' }}
    >
      {btn('nl', 'NL')}
      {btn('en', 'EN')}
    </div>
  )
}
