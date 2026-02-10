import { Link } from 'react-router'
import { useLanguage } from '@/contexts/LanguageContext.tsx'
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle.ts'
import './NotFoundPage.scss'

export default function NotFoundPage() {
  const { t } = useLanguage()

  useDocumentTitle(t('not_found_title'))

  return (
    <div className="not-found">
      <div className="not-found__content container">
        <span className="not-found__code">404</span>
        <h1 className="not-found__title">{t('not_found_title')}</h1>
        <p className="not-found__message">{t('not_found_message')}</p>
        <div className="not-found__actions">
          <Link to="/" className="btn btn--primary">{t('nav_home')}</Link>
          <Link to="/menu" className="btn btn--outline">{t('nav_menu')}</Link>
        </div>
      </div>
    </div>
  )
}
