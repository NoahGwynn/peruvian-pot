import { Link } from 'react-router'
import { useLanguage } from '@/contexts/LanguageContext.tsx'

export default function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  const openCookieSettings = () => {
    localStorage.removeItem('cookie_consent')
    window.dispatchEvent(new Event('cookie-consent-reset'))
  }

  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__tagline">{t('footer_tagline')}</p>
        <p className="footer__copyright">
          &copy; {year} {t('footer_copyright')}
        </p>
        <div className="footer__links">
          <Link to="/privacy" className="footer__link">{t('footer_privacy')}</Link>
          <button className="footer__cookie-settings" onClick={openCookieSettings}>
            {t('cookie_settings')}
          </button>
        </div>
      </div>
    </footer>
  )
}
