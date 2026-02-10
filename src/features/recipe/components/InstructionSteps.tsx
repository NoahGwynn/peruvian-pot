import { useLanguage } from '@/contexts/LanguageContext.tsx'
import type { LocalizedString } from '@/shared/types/i18n.ts'
import type { RecipeTip } from '@/shared/types/recipe.ts'
import './InstructionSteps.scss'

interface InstructionStepsProps {
  instructions: LocalizedString[]
  tips?: RecipeTip[]
}

export default function InstructionSteps({ instructions, tips }: InstructionStepsProps) {
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
      {tips && tips.length > 0 && (
        <div className="instruction-steps__tips">
          {tips.map((tip, index) => (
            <aside key={index} className="instruction-steps__tip">
              <strong className="instruction-steps__tip-title">{localize(tip.title)}</strong>
              <p className="instruction-steps__tip-text">{localize(tip.text)}</p>
            </aside>
          ))}
        </div>
      )}
    </section>
  )
}
