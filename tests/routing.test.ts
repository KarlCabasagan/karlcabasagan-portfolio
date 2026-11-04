import test from 'node:test'
import assert from 'node:assert'
import { ROUTES, isValidRoutePath } from '../src/lib/routes.ts'

test('Module 2 (Routing): Route manifest contains all required application paths', () => {
  const paths = ROUTES.map((r) => r.path)
  assert.ok(paths.includes('/'), 'Missing root route')
  assert.ok(paths.includes('/about'), 'Missing about route')
  assert.ok(paths.includes('/projects'), 'Missing projects route')
  assert.ok(paths.includes('/projects/:id'), 'Missing project detail route')
  assert.ok(paths.includes('/experience'), 'Missing experience route')
  assert.ok(paths.includes('/contact'), 'Missing contact route')
  assert.ok(paths.includes('*'), 'Missing 404 wildcard route')
})

test('Module 2 (Routing): Validates route paths accurately', () => {
  assert.strictEqual(isValidRoutePath('/'), true)
  assert.strictEqual(isValidRoutePath('/about'), true)
  assert.strictEqual(isValidRoutePath('/projects/agrilink'), true)
  assert.strictEqual(isValidRoutePath('/invalid-random-path'), false)
})
