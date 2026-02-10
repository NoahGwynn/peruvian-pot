import { Link } from 'react-router'
import { useLanguage } from '@/contexts/LanguageContext.tsx'
import { useRecipes } from '@/contexts/RecipeContext.tsx'
import { buildMenuPath } from '@/shared/utils/recipeFilters.ts'
import type { Region, Course } from '@/shared/types/recipe.ts'
import './CategoryFilter.scss'

interface CategoryFilterProps {
  activeRegion?: Region
  activeCourse?: Course
}

export default function CategoryFilter({ activeRegion, activeCourse }: CategoryFilterProps) {
  const { t } = useLanguage()
  const { regions, courses } = useRecipes()

  return (
    <nav className="category-filter" aria-label="Recipe filters">
      <div className="category-filter__row" role="group" aria-label="Filter by region">
        <Link
          to="/menu"
          className={`category-filter__pill ${!activeRegion ? 'category-filter__pill--active' : ''}`}
          aria-current={!activeRegion ? 'true' : undefined}
        >
          {t('region_all')}
        </Link>
        {regions.map((region) => (
          <Link
            key={region}
            to={buildMenuPath(region, activeCourse)}
            className={`category-filter__pill ${activeRegion === region ? 'category-filter__pill--active' : ''}`}
            aria-current={activeRegion === region ? 'true' : undefined}
          >
            {t(`region_${region}` as 'region_costa')}
          </Link>
        ))}
      </div>
      <div className="category-filter__row" role="group" aria-label="Filter by course">
        <Link
          to={buildMenuPath(activeRegion)}
          className={`category-filter__pill ${!activeCourse ? 'category-filter__pill--active' : ''}`}
          aria-current={!activeCourse ? 'true' : undefined}
        >
          {t('course_all')}
        </Link>
        {courses.map((course) => (
          <Link
            key={course}
            to={buildMenuPath(activeRegion, course)}
            className={`category-filter__pill ${activeCourse === course ? 'category-filter__pill--active' : ''}`}
            aria-current={activeCourse === course ? 'true' : undefined}
          >
            {t(`course_${course}` as 'course_appetizers')}
          </Link>
        ))}
      </div>
    </nav>
  )
}
