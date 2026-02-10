import { Link } from 'react-router'
import { useLanguage } from '@/contexts/LanguageContext.tsx'
import { useFavorites } from '@/contexts/FavoritesContext.tsx'
import { useRecipes } from '@/contexts/RecipeContext.tsx'
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle.ts'
import RecipeCard from '@/shared/components/RecipeCard/RecipeCard.tsx'
import './FavoritesPage.scss'

export default function FavoritesPage() {
  const { t } = useLanguage()
  const { favorites } = useFavorites()
  const { recipes } = useRecipes()

  useDocumentTitle(t('favorites_title'))

  const favoriteRecipes = recipes.filter((r) => favorites.has(r.slug))

  return (
    <div className="favorites-page">
      <div className="favorites-page__header">
        <div className="container">
          <h1 className="favorites-page__title">{t('favorites_title')}</h1>
        </div>
      </div>
      <section className="favorites-page__content">
        <div className="container">
          {favoriteRecipes.length > 0 ? (
            <div className="grid">
              {favoriteRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          ) : (
            <div className="favorites-page__empty">
              <svg className="favorites-page__empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p>{t('favorites_empty')}</p>
              <Link to="/menu" className="btn btn--primary" viewTransition>
                {t('favorites_browse')}
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
