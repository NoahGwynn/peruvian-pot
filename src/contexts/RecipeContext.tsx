import { createContext, useContext, useMemo, useCallback } from 'react'
import type { ReactNode } from 'react'
import type { Recipe, RecipeFilters, Region, Course } from '@/shared/types/recipe.ts'
import recipesData from '@/data/recipes/recipes.json'

const allRecipes = recipesData as Recipe[]

const regions: Region[] = ['costa', 'andes', 'amazon']
const courses: Course[] = ['appetizers', 'mains', 'desserts', 'drinks']

interface RecipeContextValue {
  recipes: Recipe[]
  regions: Region[]
  courses: Course[]
  getRecipeBySlug: (slug: string) => Recipe | undefined
  filterRecipes: (filters: RecipeFilters) => Recipe[]
  getFeaturedRecipes: () => Recipe[]
  getRecipesByRegion: (region: Region) => Recipe[]
  getRecipesByCourse: (course: Course) => Recipe[]
}

const RecipeContext = createContext<RecipeContextValue | null>(null)

export function RecipeProvider({ children }: { children: ReactNode }) {
  const getRecipeBySlug = useCallback(
    (slug: string) => allRecipes.find((r) => r.slug === slug),
    [],
  )

  const filterRecipes = useCallback((filters: RecipeFilters) => {
    let result = allRecipes
    if (filters.region) {
      result = result.filter((r) => r.region === filters.region)
    }
    if (filters.course) {
      result = result.filter((r) => r.course === filters.course)
    }
    if (filters.search) {
      const query = filters.search.toLowerCase()
      result = result.filter(
        (r) =>
          r.title.en.toLowerCase().includes(query) ||
          r.title.es.toLowerCase().includes(query) ||
          r.description.en.toLowerCase().includes(query) ||
          r.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }
    return result
  }, [])

  const getFeaturedRecipes = useCallback(
    () => allRecipes.filter((r) => r.featured),
    [],
  )

  const getRecipesByRegion = useCallback(
    (region: Region) => allRecipes.filter((r) => r.region === region),
    [],
  )

  const getRecipesByCourse = useCallback(
    (course: Course) => allRecipes.filter((r) => r.course === course),
    [],
  )

  const value = useMemo<RecipeContextValue>(
    () => ({
      recipes: allRecipes,
      regions,
      courses,
      getRecipeBySlug,
      filterRecipes,
      getFeaturedRecipes,
      getRecipesByRegion,
      getRecipesByCourse,
    }),
    [getRecipeBySlug, filterRecipes, getFeaturedRecipes, getRecipesByRegion, getRecipesByCourse],
  )

  return (
    <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>
  )
}

export function useRecipes() {
  const ctx = useContext(RecipeContext)
  if (!ctx) throw new Error('useRecipes must be used within RecipeProvider')
  return ctx
}
