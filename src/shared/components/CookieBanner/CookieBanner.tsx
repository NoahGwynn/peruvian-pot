import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { useLanguage } from '@/contexts/LanguageContext.tsx'
import { initAnalytics } from '@/config/firebase.ts'
import './CookieBanner.scss'

const STORAGE_KEY = 'cookie_consent'

export default function CookieBanner() {
  const { t } = useLanguage()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true)
    }

    const handleReset = () => setVisible(true)
    window.addEventListener('cookie-consent-reset', handleReset)
    return () => window.removeEventListener('cookie-consent-reset', handleReset)
  }, [])

  if (!visible) return null

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    initAnalytics()
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, 'declined')
    setVisible(false)
  }

  return (
    <div className="cookie-banner" role="dialog" aria-label={t('cookie_settings')} aria-describedby="cookie-banner-message">
      <div className="cookie-banner__inner">
        <p className="cookie-banner__message" id="cookie-banner-message">
          {t('cookie_message')}{' '}
          <Link to="/privacy" className="cookie-banner__link">{t('cookie_learn_more')}</Link>
        </p>
        <div className="cookie-banner__actions">
          <button className="cookie-banner__accept" onClick={accept}>
            {t('cookie_accept')}
          </button>
          <button className="cookie-banner__decline" onClick={decline}>
            {t('cookie_decline')}
          </button>
        </div>
      </div>
    </div>
  )
}
