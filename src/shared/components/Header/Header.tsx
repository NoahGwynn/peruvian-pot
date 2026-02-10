import { useState } from 'react'
import { Link, useLocation } from 'react-router'
import { useLanguage } from '@/contexts/LanguageContext.tsx'
import LanguageSwitcher from '@/shared/components/LanguageSwitcher/LanguageSwitcher.tsx'

export default function Header() {
  const { t } = useLanguage()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <header className="header">
      <a href="#main-content" className="header__skip-link">
        Skip to content
      </a>
      <div className="header__inner">
        <Link to="/" className="header__logo">
          Peruvian Pot
        </Link>

        <nav className="header__nav">
          <Link
            to="/"
            className={`header__link ${isActive('/') ? 'header__link--active' : ''}`}
            aria-current={isActive('/') ? 'page' : undefined}
          >
            {t('nav_home')}
          </Link>
          <Link
            to="/menu"
            className={`header__link ${isActive('/menu') ? 'header__link--active' : ''}`}
            aria-current={isActive('/menu') ? 'page' : undefined}
          >
            {t('nav_menu')}
          </Link>
        </nav>

        <div className="header__actions">
          <LanguageSwitcher />
          <button
            className="header__hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? '\u2715' : '\u2630'}
          </button>
        </div>
      </div>

      <nav className={`header__mobile-nav ${mobileOpen ? 'header__mobile-nav--open' : ''}`}>
        <Link
          to="/"
          className="header__link"
          aria-current={isActive('/') ? 'page' : undefined}
          onClick={() => setMobileOpen(false)}
        >
          {t('nav_home')}
        </Link>
        <Link
          to="/menu"
          className="header__link"
          aria-current={isActive('/menu') ? 'page' : undefined}
          onClick={() => setMobileOpen(false)}
        >
          {t('nav_menu')}
        </Link>
      </nav>
    </header>
  )
}
