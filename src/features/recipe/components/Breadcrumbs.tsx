import { Link } from 'react-router'
import { useLanguage } from '@/contexts/LanguageContext.tsx'
import type { Recipe } from '@/shared/types/recipe.ts'
import './Breadcrumbs.scss'

interface BreadcrumbsProps {
  recipe: Recipe
}

export default function Breadcrumbs({ recipe }: BreadcrumbsProps) {
  const { t, localize } = useLanguage()

  const regionLabel = t(`region_${recipe.region}` as 'region_costa')

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to="/menu" className="breadcrumbs__link" viewTransition>
            {t('nav_menu')}
          </Link>
        </li>
        <li className="breadcrumbs__item">
          <Link to={`/region/${recipe.region}`} className="breadcrumbs__link" viewTransition>
            {regionLabel}
          </Link>
        </li>
        <li className="breadcrumbs__item breadcrumbs__item--current" aria-current="page">
          {localize(recipe.title)}
        </li>
      </ol>
    </nav>
  )
}
