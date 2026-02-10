import { useLanguage } from '@/contexts/LanguageContext.tsx'
import { useRecipes } from '@/contexts/RecipeContext.tsx'
import RecipeCard from '@/shared/components/RecipeCard/RecipeCard.tsx'
import type { Recipe } from '@/shared/types/recipe.ts'
import './RelatedRecipes.scss'

interface RelatedRecipesProps {
  recipe: Recipe
}

export default function RelatedRecipes({ recipe }: RelatedRecipesProps) {
  const { t } = useLanguage()
  const { getRelatedRecipes } = useRecipes()

  const related = getRelatedRecipes(recipe, 3)

  if (related.length === 0) return null

  return (
    <section className="related-recipes">
      <div className="container">
        <h2 className="related-recipes__title">{t('recipe_related')}</h2>
        <div className="related-recipes__grid">
          {related.map((r) => (
            <RecipeCard key={r.id} recipe={r} />
          ))}
        </div>
      </div>
    </section>
  )
}
