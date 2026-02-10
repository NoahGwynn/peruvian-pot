import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext.tsx'
import { useRecipeRatings } from '@/shared/hooks/useFirebase.ts'
import StarRating from '@/shared/components/StarRating/StarRating.tsx'
import LoadingSpinner from '@/shared/components/LoadingSpinner/LoadingSpinner.tsx'
import './RatingWidget.scss'

interface RatingWidgetProps {
  recipeId: string
}

export default function RatingWidget({ recipeId }: RatingWidgetProps) {
  const { t } = useLanguage()
  const { ratings, loading, addRating } = useRecipeRatings(recipeId)
  const [userRating, setUserRating] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const handleRate = async (value: number) => {
    setUserRating(value)
    await addRating(value)
    setSubmitted(true)
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="rating-widget">
      <h3>{t('rating_title')}</h3>
      {ratings.count > 0 && (
        <div className="rating-widget__summary">
          <StarRating value={Math.round(ratings.average)} readonly size="sm" />
          <span className="rating-widget__average">
            {ratings.average.toFixed(1)}
          </span>
          <span className="rating-widget__count">
            ({ratings.count} {t('rating_count')})
          </span>
        </div>
      )}
      {submitted ? (
        <p className="rating-widget__thanks">{t('rating_thanks')}</p>
      ) : (
        <div className="rating-widget__input">
          <StarRating value={userRating} onChange={handleRate} />
        </div>
      )}
    </div>
  )
}
