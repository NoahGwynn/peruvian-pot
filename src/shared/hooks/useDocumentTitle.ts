import { useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext.tsx'

export function useDocumentTitle(title: string) {
  const { t } = useLanguage()
  useEffect(() => {
    document.title = `${title} | ${t('site_name')}`
  }, [title, t])
}
