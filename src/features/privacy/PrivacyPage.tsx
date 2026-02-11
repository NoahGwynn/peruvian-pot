import { useLanguage } from '@/contexts/LanguageContext.tsx'
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle.ts'
import './PrivacyPage.scss'

export default function PrivacyPage() {
  const { t } = useLanguage()

  useDocumentTitle(t('privacy_title'))

  return (
    <div className="privacy">
      <div className="privacy__content container">
        <h1 className="privacy__title">{t('privacy_title')}</h1>
        <p className="privacy__intro">{t('privacy_intro')}</p>

        <section className="privacy__section">
          <h2>{t('privacy_data_title')}</h2>
          <p>{t('privacy_data_text')}</p>
        </section>

        <section className="privacy__section">
          <h2>{t('privacy_cookies_title')}</h2>
          <p>{t('privacy_cookies_text')}</p>
        </section>

        <section className="privacy__section">
          <h2>{t('privacy_third_party_title')}</h2>
          <p>{t('privacy_third_party_text')}</p>
        </section>

        <section className="privacy__section">
          <h2>{t('privacy_rights_title')}</h2>
          <p>{t('privacy_rights_text')}</p>
        </section>

        <p className="privacy__updated">{t('privacy_updated')}</p>
      </div>
    </div>
  )
}
