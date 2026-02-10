/**
 * Scales ingredient amount strings by a multiplier.
 *
 * Handles formats like:
 * - "500g" → "750g" (×1.5)
 * - "1/2 cup" → "1 cup" (×2)
 * - "1 1/2 tablespoons" → "3 tablespoons" (×2)
 * - "2-3 cloves" → "4-6 cloves" (×2)
 * - "to taste" → "to taste" (unchanged)
 */

function parseFraction(str: string): number | null {
  const fractionMatch = str.match(/^(\d+)\s*\/\s*(\d+)$/)
  if (fractionMatch) {
    return parseInt(fractionMatch[1]) / parseInt(fractionMatch[2])
  }
  return null
}

function formatNumber(n: number): string {
  // Clean up floating point
  const rounded = Math.round(n * 100) / 100

  // Common fractions
  const fractions: [number, string][] = [
    [0.25, '1/4'],
    [0.33, '1/3'],
    [0.5, '1/2'],
    [0.67, '2/3'],
    [0.75, '3/4'],
  ]

  const whole = Math.floor(rounded)
  const frac = rounded - whole

  if (frac < 0.05) {
    return whole.toString()
  }

  for (const [val, str] of fractions) {
    if (Math.abs(frac - val) < 0.05) {
      return whole > 0 ? `${whole} ${str}` : str
    }
  }

  // Fall back to decimal
  return rounded % 1 === 0 ? rounded.toString() : rounded.toFixed(1)
}

export function scaleAmount(amount: string, multiplier: number): string {
  if (multiplier === 1) return amount

  // "to taste", "a pinch", etc. — no numbers to scale
  if (!/\d/.test(amount)) return amount

  // Handle range: "2-3 cloves"
  const rangeMatch = amount.match(/^(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)\s*(.*)$/)
  if (rangeMatch) {
    const low = parseFloat(rangeMatch[1]) * multiplier
    const high = parseFloat(rangeMatch[2]) * multiplier
    const unit = rangeMatch[3]
    return `${formatNumber(low)}-${formatNumber(high)}${unit ? ' ' + unit.trim() : ''}`
  }

  // Handle mixed number + fraction: "1 1/2 cups"
  const mixedMatch = amount.match(/^(\d+)\s+(\d+\s*\/\s*\d+)\s*(.*)$/)
  if (mixedMatch) {
    const whole = parseInt(mixedMatch[1])
    const frac = parseFraction(mixedMatch[2].replace(/\s/g, ''))
    if (frac !== null) {
      const scaled = (whole + frac) * multiplier
      const unit = mixedMatch[3]
      return `${formatNumber(scaled)}${unit ? ' ' + unit.trim() : ''}`
    }
  }

  // Handle pure fraction: "1/2 cup"
  const fracMatch = amount.match(/^(\d+\s*\/\s*\d+)\s*(.*)$/)
  if (fracMatch) {
    const frac = parseFraction(fracMatch[1].replace(/\s/g, ''))
    if (frac !== null) {
      const scaled = frac * multiplier
      const unit = fracMatch[2]
      return `${formatNumber(scaled)}${unit ? ' ' + unit.trim() : ''}`
    }
  }

  // Handle number with optional unit: "500g", "2 tablespoons", "1.5 liters"
  const numMatch = amount.match(/^(\d+(?:\.\d+)?)\s*(.*)$/)
  if (numMatch) {
    const num = parseFloat(numMatch[1]) * multiplier
    const unit = numMatch[2]
    return `${formatNumber(num)}${unit ? (unit.startsWith(' ') ? '' : '') + unit : ''}`
  }

  // Fallback: return original
  return amount
}
