import { useParams } from 'react-router'
import { useRecipes } from '@/contexts/RecipeContext.tsx'
import { useLanguage } from '@/contexts/LanguageContext.tsx'
import { parseRouteToFilters } from '@/shared/utils/recipeFilters.ts'
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle.ts'
import CategoryFilter from './components/CategoryFilter.tsx'
import RecipeGrid from './components/RecipeGrid.tsx'
import './MenuPage.scss'

export default function MenuPage() {
  const { region, course } = useParams<{ region?: string; course?: string }>()
  const { filterRecipes } = useRecipes()
  const { t } = useLanguage()

  useDocumentTitle(t('menu_title'))

  const filters = parseRouteToFilters(region, course)
  const recipes = filterRecipes(filters)

  return (
    <section className="menu-page">
      <div className="container">
        <h1 className="menu-page__title">{t('menu_title')}</h1>
        <CategoryFilter activeRegion={filters.region} activeCourse={filters.course} />
        <RecipeGrid recipes={recipes} />
      </div>
    </section>
  )
}
