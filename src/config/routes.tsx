import type { RouteObject } from 'react-router'
import HomePage from '@/features/home/HomePage.tsx'
import MenuPage from '@/features/menu/MenuPage.tsx'
import RecipePage from '@/features/recipe/RecipePage.tsx'

export const routes: RouteObject[] = [
  { path: '/', element: <HomePage /> },
  { path: '/menu', element: <MenuPage /> },
  { path: '/menu/:region', element: <MenuPage /> },
  { path: '/menu/:region/:course', element: <MenuPage /> },
  { path: '/recipe/:slug', element: <RecipePage /> },
]
