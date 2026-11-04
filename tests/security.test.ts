import test from 'node:test'
import assert from 'node:assert'
import { sanitizeExternalUrl, createSafeCloneCommand, getProjectById } from '../src/lib/security.ts'

test('Module 3 (Security): Sanitizes external URLs and strictly blocks javascript/data URI attacks', () => {
  const dangerousUrls = [
    'javascript:alert("XSS")',
    'JAVASCRIPT:alert(1)',
    'javascript:/*--></title></style></textarea></em>*/<script>alert(1)</script>',
    'data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==',
    'vbscript:msgbox(1)',
    'file:///etc/passwd',
    'ftp://malicious.org',
    '//protocol-relative.com',
  ]

  for (const url of dangerousUrls) {
    const sanitized = sanitizeExternalUrl(url)
    assert.strictEqual(sanitized, null, `Should block malicious scheme: ${url}`)
  }

  const validUrls = [
    'https://github.com/karlcabasagan/portfolio',
    'http://localhost:5173',
    'https://agrilink.ph/dashboard',
  ]

  for (const url of validUrls) {
    const sanitized = sanitizeExternalUrl(url)
    assert.strictEqual(sanitized, url, `Should allow valid URL: ${url}`)
  }
})

test('Module 3 (Security): Prevents command injection in git clone generation', () => {
  const maliciousUrls = [
    'https://github.com/repo; rm -rf /',
    'https://github.com/repo && evil_command',
    'https://github.com/repo | bash',
    'https://github.com/repo`evil`',
    'https://github.com/repo$(evil)',
  ]

  for (const url of maliciousUrls) {
    const cmd = createSafeCloneCommand(url)
    assert.strictEqual(cmd, null, `Should reject unsafe clone URL: ${url}`)
  }

  const safeUrl = 'https://github.com/karlcabasagan/agrilink'
  const cmd = createSafeCloneCommand(safeUrl)
  assert.strictEqual(cmd, 'git clone https://github.com/karlcabasagan/agrilink.git')
})

test('Module 3 (Security): Safely resolves project catalog by ID without injection risk', () => {
  const project = getProjectById('agrilink')
  assert.ok(project, 'Should find project agrilink')
  assert.strictEqual(project?.id, 'agrilink')

  const upper = getProjectById('AGRILINK')
  assert.strictEqual(upper?.id, 'agrilink', 'Should be case-insensitive')

  assert.strictEqual(getProjectById('non-existent'), undefined)
  assert.strictEqual(getProjectById(null as unknown as string), undefined)
  assert.strictEqual(getProjectById(undefined as unknown as string), undefined)
})
