import { useLanguage } from '@/contexts/LanguageContext.tsx'
import type { Ingredient } from '@/shared/types/recipe.ts'
import './IngredientList.scss'

interface IngredientListProps {
  ingredients: Ingredient[]
}

export default function IngredientList({ ingredients }: IngredientListProps) {
  const { t, localize } = useLanguage()

  return (
    <section className="ingredient-list">
      <h2>{t('recipe_ingredients')}</h2>
      <ul className="ingredient-list__items">
        {ingredients.map((ing, index) => (
          <li key={index} className="ingredient-list__item">
            <label className="ingredient-list__label">
              <input type="checkbox" className="ingredient-list__checkbox" />
              <span className="ingredient-list__checkmark" />
              <span className="ingredient-list__amount">{ing.amount}</span>
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
