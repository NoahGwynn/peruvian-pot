import { useLanguage } from '@/contexts/LanguageContext.tsx'
import RecipeCard from '@/shared/components/RecipeCard/RecipeCard.tsx'
import type { Recipe } from '@/shared/types/recipe.ts'
import './RecipeGrid.scss'

interface RecipeGridProps {
  recipes: Recipe[]
}

export default function RecipeGrid({ recipes }: RecipeGridProps) {
  const { t } = useLanguage()

  if (recipes.length === 0) {
    return (
      <div className="recipe-grid__empty">
        <p>{t('menu_no_results')}</p>
      </div>
    )
  }

  return (
    <div className="grid">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  )
}
