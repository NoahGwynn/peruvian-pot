import HeroSection from './components/HeroSection.tsx'
import FeaturedRecipes from './components/FeaturedRecipes.tsx'
import RegionShowcase from './components/RegionShowcase.tsx'
import Newsletter from '@/shared/components/Newsletter/Newsletter.tsx'
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle.ts'
import { useLanguage } from '@/contexts/LanguageContext.tsx'

export default function HomePage() {
  const { t } = useLanguage()
  useDocumentTitle(t('nav_home'))

  return (
    <>
      <HeroSection />
      <FeaturedRecipes />
      <RegionShowcase />
      <Newsletter />
    </>
  )
}
