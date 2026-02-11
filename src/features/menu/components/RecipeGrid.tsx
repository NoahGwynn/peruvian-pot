import { useLanguage } from '@/contexts/LanguageContext.tsx'
import RecipeCard from '@/shared/components/RecipeCard/RecipeCard.tsx'
import type { Recipe } from '@/shared/types/recipe.ts'
import './RecipeGrid.scss'

interface RecipeGridProps {
  recipes: Recipe[]
}

export default function RecipeGrid({ recipes }: RecipeGridProps) {
  const { t } = useLanguage()

  return (
    <div aria-live="polite">
      <p className="sr-only">{t('menu_no_results').replace(/\..*/, '')}: {recipes.length}</p>
      {recipes.length === 0 ? (
        <div className="recipe-grid__empty">
          <p>{t('menu_no_results')}</p>
        </div>
      ) : (
        <div className="grid">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  )
}
