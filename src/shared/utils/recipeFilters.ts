import type { Region, Course, RecipeFilters } from '@/shared/types/recipe.ts'

const validRegions: Region[] = ['costa', 'andes', 'amazon']
const validCourses: Course[] = ['appetizers', 'mains', 'desserts', 'drinks']

export function parseRouteToFilters(
  region?: string,
  course?: string,
): RecipeFilters {
  const filters: RecipeFilters = {}
  if (region && validRegions.includes(region as Region)) {
    filters.region = region as Region
  }
  if (course && validCourses.includes(course as Course)) {
    filters.course = course as Course
  }
  return filters
}

export function buildMenuPath(region?: Region, course?: Course): string {
  if (region && course) return `/menu/${region}/${course}`
  if (region) return `/menu/${region}`
  return '/menu'
}
