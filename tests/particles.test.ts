import test from 'node:test'
import assert from 'node:assert'
import { computeParticleCount, debounce } from '../src/lib/particles.ts'

test('Module 4 (Performance): Computes bounded particle count for mobile and desktop screens', () => {
  // Mobile screen (375x667)
  const mobileCount = computeParticleCount(375, 667)
  assert.ok(mobileCount <= 20, `Mobile count should be <= 20, got ${mobileCount}`)
  assert.ok(mobileCount >= 5, `Mobile count should be >= 5, got ${mobileCount}`)

  // Tablet screen (768x1024)
  const tabletCount = computeParticleCount(768, 1024)
  assert.ok(tabletCount <= 35, `Tablet count should be <= 35, got ${tabletCount}`)

  // 4K Ultra-wide display (3840x2160) - must stay capped at max ceiling to prevent lag
  const ultrawideCount = computeParticleCount(3840, 2160)
  assert.strictEqual(ultrawideCount, 45, 'Desktop particle count must be capped at 45')
})

test('Module 4 (Performance): Debounce helper coalesces rapid event invocations', async () => {
  let callCount = 0
  const debouncedFn = debounce(() => {
    callCount++
  }, 50)

  debouncedFn()
  debouncedFn()
  debouncedFn()
  assert.strictEqual(callCount, 0, 'Should not execute synchronously')

  await new Promise((r) => setTimeout(r, 80))
  assert.strictEqual(callCount, 1, 'Should execute exactly once after delay')
})
