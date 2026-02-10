import { useLanguage } from '@/contexts/LanguageContext.tsx'
import type { Language } from '@/shared/types/i18n.ts'
import './LanguageSwitcher.scss'

const languages: { code: Language; short: string }[] = [
  { code: 'en', short: 'EN' },
  { code: 'es', short: 'ES' },
  { code: 'qu', short: 'QU' },
]

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="lang-switcher">
      <select
        className="lang-switcher__select"
        value={language}
        onChange={(e) => setLanguage(e.target.value as Language)}
        aria-label="Language"
      >
        {languages.map(({ code, short }) => (
          <option key={code} value={code}>
            {short}
          </option>
        ))}
      </select>
    </div>
  )
}
