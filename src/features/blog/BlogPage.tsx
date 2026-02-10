import { Link } from 'react-router'
import { useLanguage } from '@/contexts/LanguageContext.tsx'
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle.ts'
import posts from '@/data/blog/posts.json'
import type { BlogPost } from '@/shared/types/blog.ts'
import './BlogPage.scss'

const blogPosts = (posts as BlogPost[]).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

export default function BlogPage() {
  const { t, localize } = useLanguage()
  useDocumentTitle(t('blog_title'))

  return (
    <div className="blog-page">
      <section className="blog-page__hero">
        <div className="container">
          <h1>{t('blog_title')}</h1>
          <p>{t('blog_subtitle')}</p>
        </div>
        <div className="blog-page__border" />
      </section>
      <section className="blog-page__list">
        <div className="container">
          <div className="blog-page__grid">
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="blog-card"
                viewTransition
              >
                <div className="blog-card__image-wrap">
                  <img
                    src={post.image}
                    alt={localize(post.title)}
                    className="blog-card__image"
                    loading="lazy"
                    width={600}
                    height={340}
                  />
                </div>
                <div className="blog-card__body">
                  <div className="blog-card__meta">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                    <span>{post.readTime} {t('blog_min_read')}</span>
                  </div>
                  <h2 className="blog-card__title">{localize(post.title)}</h2>
                  <p className="blog-card__excerpt">{localize(post.excerpt)}</p>
                  <span className="blog-card__link">{t('blog_read_more')} &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
