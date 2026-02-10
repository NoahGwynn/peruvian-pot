import { useState, useMemo } from 'react'
import { useParams } from 'react-router'
import { useRecipes } from '@/contexts/RecipeContext.tsx'
import { useLanguage } from '@/contexts/LanguageContext.tsx'
import { parseRouteToFilters } from '@/shared/utils/recipeFilters.ts'
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle.ts'
import MenuHero from './components/MenuHero.tsx'
import CategoryFilter from './components/CategoryFilter.tsx'
import SearchBar from './components/SearchBar.tsx'
import RecipeGrid from './components/RecipeGrid.tsx'
import './MenuPage.scss'

export default function MenuPage() {
  const { region, course } = useParams<{ region?: string; course?: string }>()
  const { filterRecipes } = useRecipes()
  const { t } = useLanguage()
  const [search, setSearch] = useState('')

  useDocumentTitle(t('menu_title'))

  const filters = parseRouteToFilters(region, course)
  const recipes = useMemo(
    () => filterRecipes({ ...filters, search: search || undefined }),
    [filterRecipes, filters.region, filters.course, search],
  )

  return (
    <div className="menu-page">
      <MenuHero />
      <section className="menu-page__content">
        <div className="container">
          <SearchBar value={search} onChange={setSearch} />
          <CategoryFilter activeRegion={filters.region} activeCourse={filters.course} />
          <RecipeGrid recipes={recipes} />
        </div>
      </section>
    </div>
  )
}
