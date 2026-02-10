import { Link } from 'react-router'
import { useLanguage } from '@/contexts/LanguageContext.tsx'
import './HeroSection.scss'

export default function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="hero">
      <div className="hero__inner container">
        <h1 className="hero__title">{t('home_hero_title')}</h1>
        <p className="hero__subtitle">{t('home_hero_subtitle')}</p>
        <Link to="/menu" className="btn btn--primary hero__cta" viewTransition>
          {t('home_hero_cta')}
        </Link>
      </div>
      <div className="hero__border" />
    </section>
  )
}
