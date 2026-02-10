import { useRecipes } from '@/contexts/RecipeContext.tsx'
import { useLanguage } from '@/contexts/LanguageContext.tsx'
import RecipeCard from '@/shared/components/RecipeCard/RecipeCard.tsx'
import './FeaturedRecipes.scss'

export default function FeaturedRecipes() {
  const { getFeaturedRecipes } = useRecipes()
  const { t } = useLanguage()
  const featured = getFeaturedRecipes()

  return (
    <section className="featured">
      <div className="container">
        <h2 className="featured__title">{t('home_featured_title')}</h2>
        <div className="grid">
          {featured.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} featured />
          ))}
        </div>
      </div>
    </section>
  )
}
