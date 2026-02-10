import { useLanguage } from '@/contexts/LanguageContext.tsx'
import type { Language } from '@/shared/types/i18n.ts'
import './LanguageSwitcher.scss'

const languages: { code: Language; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'qu', label: 'Runasimi' },
]

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="lang-switcher" role="group" aria-label="Language selector">
      {languages.map(({ code, label }) => (
        <button
          key={code}
          className={`lang-switcher__btn ${language === code ? 'lang-switcher__btn--active' : ''}`}
          onClick={() => setLanguage(code)}
          aria-label={`Switch to ${label}`}
          aria-pressed={language === code}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
