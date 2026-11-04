import test from 'node:test'
import assert from 'node:assert'

test('test runner typescript check', () => {
  const x: number = 42
  assert.strictEqual(x, 42)
})
