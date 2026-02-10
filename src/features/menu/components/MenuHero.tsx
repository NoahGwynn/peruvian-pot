import { useLanguage } from '@/contexts/LanguageContext.tsx'
import { useRecipes } from '@/contexts/RecipeContext.tsx'
import './MenuHero.scss'

export default function MenuHero() {
  const { t } = useLanguage()
  const { recipes } = useRecipes()

  return (
    <section className="menu-hero">
      <div className="menu-hero__content container">
        <h1 className="menu-hero__title">{t('menu_title')}</h1>
        <p className="menu-hero__subtitle">{t('menu_subtitle')}</p>
        <p className="menu-hero__count">
          {recipes.length} {t('home_region_recipes')}
        </p>
      </div>
      <div className="menu-hero__border" />
    </section>
  )
}
