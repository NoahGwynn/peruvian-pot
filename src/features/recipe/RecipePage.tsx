import { useParams, Navigate } from 'react-router'
import { useRecipes } from '@/contexts/RecipeContext.tsx'
import { useLanguage } from '@/contexts/LanguageContext.tsx'
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle.ts'
import { useRecipeSchema } from '@/shared/hooks/useRecipeSchema.ts'
import { useMetaTags } from '@/shared/hooks/useMetaTags.ts'
import Breadcrumbs from './components/Breadcrumbs.tsx'
import RecipeHero from './components/RecipeHero.tsx'
import ShareButtons from './components/ShareButtons.tsx'
import IngredientList from './components/IngredientList.tsx'
import InstructionSteps from './components/InstructionSteps.tsx'
import RatingWidget from './components/RatingWidget.tsx'
import CommentsSection from './components/CommentsSection.tsx'
import RelatedRecipes from './components/RelatedRecipes.tsx'
import './RecipePage.scss'

export default function RecipePage() {
  const { slug } = useParams<{ slug: string }>()
  const { getRecipeBySlug } = useRecipes()
  const { localize } = useLanguage()

  const recipe = slug ? getRecipeBySlug(slug) : undefined

  useDocumentTitle(recipe ? localize(recipe.title) : 'Recipe')
  useRecipeSchema(recipe)
  useMetaTags({
    title: recipe ? localize(recipe.title) : undefined,
    description: recipe ? localize(recipe.description) : undefined,
    image: recipe?.image,
  })

  if (!recipe) {
    return <Navigate to="/menu" replace />
  }

  return (
    <article className="recipe-page">
      <Breadcrumbs recipe={recipe} />
      <RecipeHero recipe={recipe} />
      <div className="recipe-page__content container">
        <div className="recipe-page__main">
          <ShareButtons title={localize(recipe.title)} description={localize(recipe.description)} image={recipe.image} />
          <IngredientList ingredients={recipe.ingredients} servings={recipe.servings} />
          <InstructionSteps instructions={recipe.instructions} tips={recipe.tips} />
        </div>
        <aside className="recipe-page__sidebar">
          <RatingWidget recipeId={recipe.id} />
          <CommentsSection recipeId={recipe.id} />
        </aside>
      </div>
      <RelatedRecipes recipe={recipe} />
    </article>
  )
}
