import { useState } from 'react'
import './StarRating.scss'

interface StarRatingProps {
  value?: number
  onChange?: (value: number) => void
  readonly?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export default function StarRating({
  value = 0,
  onChange,
  readonly = false,
  size = 'md',
}: StarRatingProps) {
  const [hovered, setHovered] = useState(0)

  const displayValue = hovered || value

  return (
    <div
      className={`star-rating star-rating--${size} ${readonly ? 'star-rating--readonly' : ''}`}
      role="group"
      aria-label="Star rating"
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`star-rating__star ${star <= displayValue ? 'star-rating__star--filled' : ''}`}
          onClick={() => !readonly && onChange?.(star)}
          onMouseEnter={() => !readonly && setHovered(star)}
          onMouseLeave={() => !readonly && setHovered(0)}
          disabled={readonly}
          aria-label={`Rate ${star} out of 5 stars`}
        >
          &#9733;
        </button>
      ))}
    </div>
  )
}
