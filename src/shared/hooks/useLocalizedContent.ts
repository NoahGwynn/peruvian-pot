import { useCallback } from 'react'
import { useLanguage } from '@/contexts/LanguageContext.tsx'
import type { LocalizedString } from '@/shared/types/i18n.ts'

export function useLocalizedContent() {
  const { localize } = useLanguage()

  const localizeString = useCallback(
    (obj: LocalizedString) => localize(obj),
    [localize],
  )

  const localizeArray = useCallback(
    (arr: LocalizedString[]) => arr.map((item) => localize(item)),
    [localize],
  )

  return { localizeString, localizeArray }
}
