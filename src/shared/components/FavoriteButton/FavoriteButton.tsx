import { useFavorites } from '@/contexts/FavoritesContext.tsx'
import './FavoriteButton.scss'

interface FavoriteButtonProps {
  slug: string
  size?: 'sm' | 'md'
}

export default function FavoriteButton({ slug, size = 'sm' }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const active = isFavorite(slug)

  function handleClick(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(slug)
  }

  return (
    <button
      type="button"
      className={`favorite-btn favorite-btn--${size} ${active ? 'favorite-btn--active' : ''}`}
      onClick={handleClick}
      aria-label={active ? 'Remove from favorites' : 'Add to favorites'}
      aria-pressed={active}
    >
      <svg viewBox="0 0 24 24" className="favorite-btn__icon" aria-hidden="true">
        <path
          d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
