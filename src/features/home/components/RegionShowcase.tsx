import { Link } from 'react-router'
import { useLanguage } from '@/contexts/LanguageContext.tsx'
import { useRecipes } from '@/contexts/RecipeContext.tsx'
import type { Region } from '@/shared/types/recipe.ts'
import './RegionShowcase.scss'

const regionImages: Record<Region, string> = {
  costa: '/images/regions/costa.webp',
  andes: '/images/regions/andes.webp',
  amazon: '/images/regions/amazon.webp',
}

const regionColors: Record<Region, string> = {
  costa: '#2563EB',
  andes: '#D97706',
  amazon: '#059669',
}

export default function RegionShowcase() {
  const { t } = useLanguage()
  const { regions, getRecipesByRegion } = useRecipes()

  return (
    <section className="regions">
      <div className="container">
        <h2 className="regions__title">{t('home_regions_title')}</h2>
        <p className="regions__subtitle">{t('home_regions_subtitle')}</p>
        <div className="grid">
          {regions.map((region) => {
            const regionName = t(`region_${region}` as 'region_costa')
            const count = getRecipesByRegion(region).length
            return (
              <Link
                key={region}
                to={`/region/${region}`}
                className="region-card"
                viewTransition
                style={{ '--region-color': regionColors[region] } as React.CSSProperties}
                aria-label={`${regionName} — ${count} ${t('home_region_recipes')}`}
              >
                <div className="region-card__image-wrap">
                  <img
                    src={regionImages[region]}
                    alt=""
                    className="region-card__image"
                  />
                </div>
                <div className="region-card__body">
                  <h3 className="region-card__name">{regionName}</h3>
                  <p className="region-card__count">
                    {count} {t('home_region_recipes')}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
