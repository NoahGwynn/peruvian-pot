import { useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext.tsx'
import type { Recipe } from '@/shared/types/recipe.ts'

function toISO8601Duration(minutes: number): string {
  if (minutes <= 0) return 'PT0M'
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h > 0 && m > 0) return `PT${h}H${m}M`
  if (h > 0) return `PT${h}H`
  return `PT${m}M`
}

const courseMap: Record<string, string> = {
  appetizers: 'Appetizer',
  mains: 'Main course',
  desserts: 'Dessert',
  drinks: 'Beverage',
}

const difficultyMap: Record<string, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
}

export function useRecipeSchema(recipe: Recipe | undefined) {
  const { localize } = useLanguage()

  useEffect(() => {
    if (!recipe) return

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Recipe',
      name: localize(recipe.title),
      description: localize(recipe.description),
      image: `${window.location.origin}${recipe.image}`,
      author: {
        '@type': 'Organization',
        name: 'Peruvian Pot',
      },
      prepTime: toISO8601Duration(recipe.prepTime),
      cookTime: toISO8601Duration(recipe.cookTime),
      totalTime: toISO8601Duration(recipe.prepTime + recipe.cookTime),
      recipeYield: `${recipe.servings} servings`,
      recipeCategory: courseMap[recipe.course] ?? recipe.course,
      recipeCuisine: 'Peruvian',
      keywords: [
        difficultyMap[recipe.difficulty] ?? recipe.difficulty,
        ...recipe.tags,
      ].join(', '),
      recipeIngredient: recipe.ingredients.map(
        (i) => `${i.amount} ${localize(i.name)}`,
      ),
      recipeInstructions: recipe.instructions.map((step, idx) => ({
        '@type': 'HowToStep',
        position: idx + 1,
        text: localize(step),
      })),
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(schema)
    script.id = 'recipe-schema'
    document.head.appendChild(script)

    return () => {
      const existing = document.getElementById('recipe-schema')
      if (existing) existing.remove()
    }
  }, [recipe, localize])
}
