import { BrowserRouter, useRoutes, useLocation } from 'react-router'
import { useEffect } from 'react'
import { LanguageProvider } from '@/contexts/LanguageContext.tsx'
import { RecipeProvider } from '@/contexts/RecipeContext.tsx'
import { FirebaseProvider } from '@/contexts/FirebaseContext.tsx'
import { FavoritesProvider } from '@/contexts/FavoritesContext.tsx'
import Layout from '@/shared/components/Layout/Layout.tsx'
import { routes } from '@/config/routes.tsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

function AppRoutes() {
  const element = useRoutes(routes)
  return (
    <>
      <ScrollToTop />
      <Layout>{element}</Layout>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <RecipeProvider>
          <FavoritesProvider>
            <FirebaseProvider>
              <AppRoutes />
            </FirebaseProvider>
          </FavoritesProvider>
        </RecipeProvider>
      </LanguageProvider>
    </BrowserRouter>
  )
}
