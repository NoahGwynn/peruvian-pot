import type { LocalizedString } from './i18n.ts'

export interface BlogPost {
  id: string
  slug: string
  title: LocalizedString
  excerpt: LocalizedString
  content: LocalizedString
  image: string
  author: string
  date: string
  readTime: number
  tags: string[]
}
