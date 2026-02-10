import { useLanguage } from '@/contexts/LanguageContext.tsx'
import type { Region } from '@/shared/types/recipe.ts'
import './RegionHero.scss'

const regionImages: Record<Region, string> = {
  costa: '/images/regions/costa.png',
  andes: '/images/regions/andes.png',
  amazon: '/images/regions/amazon.png',
}

interface RegionHeroProps {
  region: Region
  recipeCount: number
}

export default function RegionHero({ region, recipeCount }: RegionHeroProps) {
  const { t } = useLanguage()

  const regionName = t(`region_${region}` as 'region_costa')
  const regionDesc = t(`region_${region}_desc` as 'region_costa_desc')

  return (
    <section
      className="region-hero"
      style={{ backgroundImage: `url(${regionImages[region]})` }}
    >
      <div className="region-hero__overlay" />
      <div className="region-hero__content container">
        <h1 className="region-hero__title">{regionName}</h1>
        <p className="region-hero__description">{regionDesc}</p>
        <p className="region-hero__count">
          {recipeCount} {t('home_region_recipes')}
        </p>
      </div>
      <div className="region-hero__border" />
    </section>
  )
}
