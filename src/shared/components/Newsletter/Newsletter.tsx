import { useState } from 'react'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { db } from '@/config/firebase.ts'
import { useLanguage } from '@/contexts/LanguageContext.tsx'
import './Newsletter.scss'

export default function Newsletter() {
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return

    setStatus('loading')
    try {
      await addDoc(collection(db, 'newsletter'), {
        email: email.trim(),
        createdAt: Timestamp.now(),
      })
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="newsletter">
      <div className="container">
        <div className="newsletter__content">
          <h2 className="newsletter__title">{t('newsletter_title')}</h2>
          <p className="newsletter__subtitle">{t('newsletter_subtitle')}</p>
          <div aria-live="polite">
            {status === 'success' ? (
              <p className="newsletter__success">{t('newsletter_success')}</p>
            ) : (
              <form className="newsletter__form" onSubmit={handleSubmit}>
                <input
                  type="email"
                  className="newsletter__input"
                  placeholder={t('newsletter_placeholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label={t('newsletter_placeholder')}
                />
                <button
                  type="submit"
                  className="btn btn--primary newsletter__btn"
                  disabled={status === 'loading'}
                >
                  {t('newsletter_submit')}
                </button>
              </form>
            )}
            {status === 'error' && (
              <p className="newsletter__error">{t('newsletter_error')}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
