import { Link } from 'react-router'
import { useLanguage } from '@/contexts/LanguageContext.tsx'
import type { Recipe } from '@/shared/types/recipe.ts'
import './RecipeCard.scss'

interface RecipeCardProps {
  recipe: Recipe
  featured?: boolean
}

export default function RecipeCard({ recipe, featured }: RecipeCardProps) {
  const { t, localize } = useLanguage()

  return (
    <Link
      to={`/recipe/${recipe.slug}`}
      className={`card card--recipe ${featured ? 'card--featured' : ''}`}
      aria-label={localize(recipe.title)}
    >
      {featured && (
        <span className="card__badge">
          {t(`region_${recipe.region}` as 'region_costa')}
        </span>
      )}
      <img
        className="card__image"
        src={recipe.image}
        alt={localize(recipe.title)}
      />
      <div className="card__body">
        <h3 className="card__title">{localize(recipe.title)}</h3>
        <p className="card__description">{localize(recipe.description)}</p>
        <div className="card__meta">
          <span>{recipe.prepTime + recipe.cookTime} min</span>
          <span>{t(`difficulty_${recipe.difficulty}` as 'difficulty_easy')}</span>
        </div>
      </div>
    </Link>
  )
}
