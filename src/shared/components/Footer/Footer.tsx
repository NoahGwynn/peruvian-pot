import { useLanguage } from '@/contexts/LanguageContext.tsx'

export default function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__tagline">{t('footer_tagline')}</p>
        <p className="footer__copyright">
          &copy; {year} {t('footer_copyright')}
        </p>
      </div>
    </footer>
  )
}
