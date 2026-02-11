import './LoadingSpinner.scss'

export default function LoadingSpinner({ text }: { text?: string }) {
  return (
    <div className="spinner" role="status" aria-live="polite">
      <div className="spinner__circle" />
      {text && <p className="spinner__text">{text}</p>}
    </div>
  )
}
