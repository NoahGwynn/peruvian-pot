import { BrowserRouter, useRoutes } from 'react-router'
import { LanguageProvider } from '@/contexts/LanguageContext.tsx'
import { RecipeProvider } from '@/contexts/RecipeContext.tsx'
import { FirebaseProvider } from '@/contexts/FirebaseContext.tsx'
import Layout from '@/shared/components/Layout/Layout.tsx'
import { routes } from '@/config/routes.tsx'

function AppRoutes() {
  const element = useRoutes(routes)
  return <Layout>{element}</Layout>
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <RecipeProvider>
          <FirebaseProvider>
            <AppRoutes />
          </FirebaseProvider>
        </RecipeProvider>
      </LanguageProvider>
    </BrowserRouter>
  )
}
