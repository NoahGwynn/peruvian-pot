import { useState } from 'react'
import type { FormEvent } from 'react'
import { useLanguage } from '@/contexts/LanguageContext.tsx'
import { useRecipeComments } from '@/shared/hooks/useFirebase.ts'
import LoadingSpinner from '@/shared/components/LoadingSpinner/LoadingSpinner.tsx'
import './CommentsSection.scss'

interface CommentsSectionProps {
  recipeId: string
}

export default function CommentsSection({ recipeId }: CommentsSectionProps) {
  const { t } = useLanguage()
  const { comments, loading, addComment } = useRecipeComments(recipeId)
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !text.trim()) return
    setSubmitting(true)
    await addComment(name.trim(), text.trim())
    setName('')
    setText('')
    setSubmitting(false)
  }

  return (
    <div className="comments">
      <h3>{t('comments_title')}</h3>

      <form className="comments__form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="comment-name" className="form-label">
            {t('comments_name')}
          </label>
          <input
            id="comment-name"
            type="text"
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={100}
          />
        </div>
        <div className="form-group">
          <label htmlFor="comment-text" className="form-label">
            {t('comments_text')}
          </label>
          <textarea
            id="comment-text"
            className="form-textarea"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            maxLength={2000}
          />
        </div>
        <button type="submit" className="btn btn--primary" disabled={submitting}>
          {submitting ? t('loading') : t('comments_submit')}
        </button>
      </form>

      {loading ? (
        <LoadingSpinner text={t('comments_loading')} />
      ) : comments.length === 0 ? (
        <p className="comments__empty">{t('comments_empty')}</p>
      ) : (
        <ul className="comments__list">
          {comments.map((comment) => (
            <li key={comment.id} className="comments__item">
              <div className="comments__header">
                <strong className="comments__author">{comment.authorName}</strong>
                <time className="comments__date">
                  {comment.createdAt.toLocaleDateString()}
                </time>
              </div>
              <p className="comments__text">{comment.text}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
