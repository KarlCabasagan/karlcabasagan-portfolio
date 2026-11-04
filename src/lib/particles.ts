/**
 * Computes a safe, battery-friendly particle count based on screen area.
 * Capped strictly at 45 on desktop, and down to 10-20 on mobile to avoid 60FPS jank.
 */
export function computeParticleCount(width: number, height: number): number {
  const area = width * height
  // Scale dynamically with screen area while setting hard clamp limits
  const raw = Math.floor(area / 32000)
  return Math.max(8, Math.min(raw, 45))
}

/**
 * Lightweight, zero-dependency debounce utility for high-frequency window events.
 */
export function debounce<T extends (...args: any[]) => void>(fn: T, ms: number): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  return (...args: Parameters<T>) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      fn(...args)
    }, ms)
  }
}
