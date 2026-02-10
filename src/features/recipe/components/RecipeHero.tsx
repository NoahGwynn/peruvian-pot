import { useLanguage } from '@/contexts/LanguageContext.tsx'
import FavoriteButton from '@/shared/components/FavoriteButton/FavoriteButton.tsx'
import type { Recipe } from '@/shared/types/recipe.ts'
import './RecipeHero.scss'

interface RecipeHeroProps {
  recipe: Recipe
}

export default function RecipeHero({ recipe }: RecipeHeroProps) {
  const { t, localize } = useLanguage()

  return (
    <section className="recipe-hero">
      <div className="recipe-hero__image-wrap">
        <img
          src={recipe.image}
          alt={localize(recipe.title)}
          className="recipe-hero__image"
          width={1200}
          height={750}
        />
        <FavoriteButton slug={recipe.slug} size="md" />
      </div>
      <div className="recipe-hero__content container">
        <div className="recipe-hero__badges">
          <span className="recipe-hero__badge recipe-hero__badge--region">
            {t(`region_${recipe.region}` as 'region_costa')}
          </span>
          <span className="recipe-hero__badge recipe-hero__badge--course">
            {t(`course_${recipe.course}` as 'course_appetizers')}
          </span>
        </div>
        <h1 className="recipe-hero__title">{localize(recipe.title)}</h1>
        <p className="recipe-hero__description">{localize(recipe.description)}</p>
        <div className="recipe-hero__meta">
          <div className="recipe-hero__meta-item">
            <span className="recipe-hero__meta-label">{t('recipe_prep_time')}</span>
            <span className="recipe-hero__meta-value">{recipe.prepTime} min</span>
          </div>
          <div className="recipe-hero__meta-item">
            <span className="recipe-hero__meta-label">{t('recipe_cook_time')}</span>
            <span className="recipe-hero__meta-value">{recipe.cookTime} min</span>
          </div>
          <div className="recipe-hero__meta-item">
            <span className="recipe-hero__meta-label">{t('recipe_servings')}</span>
            <span className="recipe-hero__meta-value">{recipe.servings}</span>
          </div>
          <div className="recipe-hero__meta-item">
            <span className="recipe-hero__meta-label">{t('recipe_difficulty')}</span>
            <span className="recipe-hero__meta-value">
              {t(`difficulty_${recipe.difficulty}` as 'difficulty_easy')}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
