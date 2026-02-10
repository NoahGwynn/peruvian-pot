import { useParams, Navigate } from 'react-router'
import { useRecipes } from '@/contexts/RecipeContext.tsx'
import { useLanguage } from '@/contexts/LanguageContext.tsx'
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle.ts'
import RecipeHero from './components/RecipeHero.tsx'
import IngredientList from './components/IngredientList.tsx'
import InstructionSteps from './components/InstructionSteps.tsx'
import RatingWidget from './components/RatingWidget.tsx'
import CommentsSection from './components/CommentsSection.tsx'
import './RecipePage.scss'

export default function RecipePage() {
  const { slug } = useParams<{ slug: string }>()
  const { getRecipeBySlug } = useRecipes()
  const { localize } = useLanguage()

  const recipe = slug ? getRecipeBySlug(slug) : undefined

  useDocumentTitle(recipe ? localize(recipe.title) : 'Recipe')

  if (!recipe) {
    return <Navigate to="/menu" replace />
  }

  return (
    <article className="recipe-page">
      <RecipeHero recipe={recipe} />
      <div className="recipe-page__content container">
        <div className="recipe-page__main">
          <IngredientList ingredients={recipe.ingredients} />
          <InstructionSteps instructions={recipe.instructions} />
        </div>
        <aside className="recipe-page__sidebar">
          <RatingWidget recipeId={recipe.id} />
          <CommentsSection recipeId={recipe.id} />
        </aside>
      </div>
    </article>
  )
}
