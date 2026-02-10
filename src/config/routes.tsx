import type { RouteObject } from 'react-router'
import HomePage from '@/features/home/HomePage.tsx'
import MenuPage from '@/features/menu/MenuPage.tsx'
import RegionPage from '@/features/region/RegionPage.tsx'
import RecipePage from '@/features/recipe/RecipePage.tsx'
import BlogPage from '@/features/blog/BlogPage.tsx'
import BlogPostPage from '@/features/blog/BlogPostPage.tsx'
import FavoritesPage from '@/features/favorites/FavoritesPage.tsx'
import NotFoundPage from '@/features/not-found/NotFoundPage.tsx'

export const routes: RouteObject[] = [
  { path: '/', element: <HomePage /> },
  { path: '/menu', element: <MenuPage /> },
  { path: '/menu/:region', element: <MenuPage /> },
  { path: '/menu/:region/:course', element: <MenuPage /> },
  { path: '/region/:region', element: <RegionPage /> },
  { path: '/recipe/:slug', element: <RecipePage /> },
  { path: '/blog', element: <BlogPage /> },
  { path: '/blog/:slug', element: <BlogPostPage /> },
  { path: '/favorites', element: <FavoritesPage /> },
  { path: '*', element: <NotFoundPage /> },
]
