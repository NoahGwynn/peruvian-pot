import { useParams, Navigate, Link } from 'react-router'
import { useLanguage } from '@/contexts/LanguageContext.tsx'
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle.ts'
import { useMetaTags } from '@/shared/hooks/useMetaTags.ts'
import ShareButtons from '@/features/recipe/components/ShareButtons.tsx'
import Newsletter from '@/shared/components/Newsletter/Newsletter.tsx'
import posts from '@/data/blog/posts.json'
import recipes from '@/data/recipes/recipes.json'
import type { BlogPost } from '@/shared/types/blog.ts'
import type { Recipe } from '@/shared/types/recipe.ts'
import './BlogPostPage.scss'

const blogPosts = posts as BlogPost[]
const allRecipes = recipes as Recipe[]

// Build a map of recipe name variants → slug for auto-linking
const recipeNameMap: Array<{ pattern: RegExp; slug: string }> = allRecipes.flatMap((recipe) => {
  const names = new Set<string>()
  names.add(recipe.title.en)
  names.add(recipe.title.es)
  if (recipe.title.qu) names.add(recipe.title.qu)
  return Array.from(names)
    .filter((name) => name.length > 3)
    .sort((a, b) => b.length - a.length)
    .map((name) => ({
      pattern: new RegExp(`(?<!<[^>]*)\\b(${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})\\b(?![^<]*>)`, 'gi'),
      slug: recipe.slug,
    }))
})

function linkRecipeNames(html: string): string {
  let result = html
  const linked = new Set<string>()

  // Skip recipes already manually linked
  for (const match of html.matchAll(/href="\/recipe\/([^"]+)"/g)) {
    linked.add(match[1])
  }

  for (const { pattern, slug } of recipeNameMap) {
    if (linked.has(slug)) continue
    const match = result.match(pattern)
    if (match) {
      // Only link the first occurrence of each recipe
      result = result.replace(pattern, (m) => {
        if (linked.has(slug)) return m
        linked.add(slug)
        return `<a href="/recipe/${slug}">${m}</a>`
      })
    }
  }
  return result
}

function getRelatedPosts(current: BlogPost, limit = 2): BlogPost[] {
  return blogPosts
    .filter((p) => p.id !== current.id)
    .map((p) => ({
      post: p,
      score: p.tags.filter((tag) => current.tags.includes(tag)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((p) => p.post)
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const { t, localize } = useLanguage()

  const post = blogPosts.find((p) => p.slug === slug)

  useDocumentTitle(post ? localize(post.title) : t('not_found_title'))
  useMetaTags({
    title: post ? localize(post.title) : '',
    description: post ? localize(post.excerpt) : '',
    image: post?.image,
    type: 'article',
  })

  if (!post) {
    return <Navigate to="/blog" replace />
  }

  const content = localize(post.content)
  const related = getRelatedPosts(post)

  return (
    <article className="blog-post">
      <div className="blog-post__header">
        <div className="container">
          <Link to="/blog" className="blog-post__back" viewTransition>
            &larr; {t('blog_back')}
          </Link>
          <h1 className="blog-post__title">{localize(post.title)}</h1>
          <div className="blog-post__meta">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span>&middot;</span>
            <span>{post.readTime} {t('blog_min_read')}</span>
          </div>
        </div>
      </div>
      {post.image && (
        <div className="blog-post__image-wrap">
          <div className="container">
            <img
              src={post.image}
              alt={localize(post.title)}
              className="blog-post__image"
              width={1200}
              height={630}
            />
          </div>
        </div>
      )}
      <div className="blog-post__content">
        <div className="container">
          <div className="blog-post__body" dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }} />
          <ShareButtons title={localize(post.title)} description={localize(post.excerpt)} image={post.image} />
        </div>
      </div>
      {related.length > 0 && (
        <section className="blog-post__related">
          <div className="container">
            <h2>{t('recipe_related')}</h2>
            <div className="blog-post__related-grid">
              {related.map((p) => (
                <Link key={p.id} to={`/blog/${p.slug}`} className="blog-post__related-card" viewTransition>
                  <img src={p.image} alt={localize(p.title)} loading="lazy" width={400} height={225} />
                  <div className="blog-post__related-body">
                    <h3>{localize(p.title)}</h3>
                    <span>{p.readTime} {t('blog_min_read')}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      <Newsletter />
    </article>
  )
}

function inlineMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
}

function renderMarkdown(text: string): string {
  const html = text
    .split('\n\n')
    .map((block) => {
      if (block.startsWith('## ')) {
        return `<h2>${inlineMarkdown(block.slice(3))}</h2>`
      }
      const imgMatch = block.match(/^!\[([^\]]*)\]\(([^)]+)\)$/)
      if (imgMatch) {
        return `<img src="${imgMatch[2]}" alt="${imgMatch[1]}" loading="lazy" />`
      }
      return `<p>${inlineMarkdown(block)}</p>`
    })
    .join('\n')
  return linkRecipeNames(html)
}
