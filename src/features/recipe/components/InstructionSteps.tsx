import { useLanguage } from '@/contexts/LanguageContext.tsx'
import type { LocalizedString } from '@/shared/types/i18n.ts'
import './InstructionSteps.scss'

interface InstructionStepsProps {
  instructions: LocalizedString[]
}

export default function InstructionSteps({ instructions }: InstructionStepsProps) {
  const { t, localize } = useLanguage()

  return (
    <section className="instruction-steps">
      <h2>{t('recipe_instructions')}</h2>
      <ol className="instruction-steps__list">
        {instructions.map((step, index) => (
          <li key={index} className="instruction-steps__item">
            <span className="instruction-steps__number">{index + 1}</span>
            <p className="instruction-steps__text">{localize(step)}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
