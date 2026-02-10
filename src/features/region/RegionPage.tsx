import { useParams, Navigate, Link } from 'react-router'
import { useLanguage } from '@/contexts/LanguageContext.tsx'
import { useRecipes } from '@/contexts/RecipeContext.tsx'
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle.ts'
import type { Region } from '@/shared/types/recipe.ts'
import type { LocalizedString } from '@/shared/types/i18n.ts'
import RecipeCard from '@/shared/components/RecipeCard/RecipeCard.tsx'
import RegionHero from './components/RegionHero.tsx'
import regionsData from '@/data/regions.json'
import './RegionPage.scss'

const validRegions: Region[] = ['costa', 'andes', 'amazon']

interface RegionIngredient {
  name: LocalizedString
  description: LocalizedString
}

interface RegionData {
  cultureImage: string
  ingredients: RegionIngredient[]
  culture: LocalizedString[]
}

const regions = regionsData as Record<Region, RegionData>

export default function RegionPage() {
  const { region } = useParams<{ region: string }>()
  const { t, localize } = useLanguage()
  const { getRecipesByRegion } = useRecipes()

  if (!region || !validRegions.includes(region as Region)) {
    return <Navigate to="/menu" replace />
  }

  const typedRegion = region as Region
  const recipes = getRecipesByRegion(typedRegion)
  const regionData = regions[typedRegion]

  useDocumentTitle(t(`region_${typedRegion}`))

  return (
    <div className="region-page">
      <RegionHero region={typedRegion} recipeCount={recipes.length} />

      <section className="region-page__ingredients">
        <div className="container">
          <h2 className="region-page__section-heading">
            {t('region_ingredients_title')}
          </h2>
          <div className="region-page__ingredients-grid">
            {regionData.ingredients.map((ingredient) => (
              <div key={localize(ingredient.name)} className="region-page__ingredient">
                <h3 className="region-page__ingredient-name">
                  {localize(ingredient.name)}
                </h3>
                <p className="region-page__ingredient-desc">
                  {localize(ingredient.description)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="region-page__culture">
        <div className="container">
          <h2 className="region-page__section-heading">
            {t('region_culture_title')}
          </h2>
          <img
            className="region-page__culture-image"
            src={regionData.cultureImage}
            alt={`${t(`region_${typedRegion}`)} — ${t('region_culture_title')}`}
          />
          <div className="region-page__culture-body">
            {regionData.culture.map((paragraph, i) => (
              <p key={i}>{localize(paragraph)}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="region-page__recipes">
        <div className="container">
          <h2 className="region-page__section-heading">
            {t('region_recipes_title')} {t(`region_${typedRegion}`)}
          </h2>
          <div className="grid">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
          <div className="region-page__footer">
            <Link to="/menu" className="btn btn--outline">
              {t('region_page_view_all')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
