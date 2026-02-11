import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext.tsx'
import { scaleAmount } from '@/shared/utils/ingredientScaler.ts'
import type { Ingredient } from '@/shared/types/recipe.ts'
import './IngredientList.scss'

interface IngredientListProps {
  ingredients: Ingredient[]
  servings: number
}

export default function IngredientList({ ingredients, servings }: IngredientListProps) {
  const { t, localize } = useLanguage()
  const [currentServings, setCurrentServings] = useState(servings)

  const multiplier = currentServings / servings

  function decrease() {
    setCurrentServings((s) => Math.max(1, s - 1))
  }

  function increase() {
    setCurrentServings((s) => Math.min(servings * 4, s + 1))
  }

  return (
    <section className="ingredient-list">
      <div className="ingredient-list__header">
        <h2>{t('recipe_ingredients')}</h2>
        <div className="ingredient-list__adjuster">
          <button
            type="button"
            className="ingredient-list__adj-btn"
            onClick={decrease}
            disabled={currentServings <= 1}
            aria-label="Decrease servings"
          >
            -
          </button>
          <span className="ingredient-list__adj-value">
            {currentServings} {t('recipe_servings').toLowerCase()}
          </span>
          <button
            type="button"
            className="ingredient-list__adj-btn"
            onClick={increase}
            disabled={currentServings >= servings * 4}
            aria-label="Increase servings"
          >
            +
          </button>
        </div>
      </div>
      <ul className="ingredient-list__items">
        {ingredients.map((ing, index) => (
          <li key={index} className="ingredient-list__item">
            <label htmlFor={`ingredient-${index}`} className="ingredient-list__label">
              <input type="checkbox" id={`ingredient-${index}`} className="ingredient-list__checkbox" />
              <span className="ingredient-list__checkmark" />
              <span className="ingredient-list__amount">
                {scaleAmount(ing.amount, multiplier)}
              </span>
              <span className="ingredient-list__name">
                {localize(ing.name)}
                {ing.optional && (
                  <span className="ingredient-list__optional"> ({t('optional')})</span>
                )}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </section>
  )
}
