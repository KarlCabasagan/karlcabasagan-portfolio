import test from 'node:test'
import assert from 'node:assert'
import { validateContactInput, formatMailtoFallback, type ContactPayload } from '../src/lib/contact.ts'

test('Module 1 (Contact): Fails on missing or blank required fields', () => {
  const blankPayload: ContactPayload = {
    name: '   ',
    email: ' ',
    subject: '',
    message: '\n\t  ',
  }
  const result = validateContactInput(blankPayload)
  assert.strictEqual(result.isValid, false)
  assert.ok(result.errors.name, 'Name should have error')
  assert.ok(result.errors.email, 'Email should have error')
  assert.ok(result.errors.subject, 'Subject should have error')
  assert.ok(result.errors.message, 'Message should have error')
})

test('Module 1 (Contact): Rejects malformed email addresses', () => {
  const invalidEmails = [
    'plainaddress',
    '#@%^%#$@#$@#.com',
    '@example.com',
    'Joe Smith <email@example.com>',
    'email.example.com',
    'email@example@example.com',
    'email@example',
    'email@111.222.333.44444',
  ]

  for (const email of invalidEmails) {
    const result = validateContactInput({
      name: 'Valid Name',
      email,
      subject: 'Valid Subject',
      message: 'Valid message exceeding minimum length threshold.',
    })
    assert.strictEqual(result.isValid, false, `Expected invalid email for: ${email}`)
    assert.ok(result.errors.email, `Error object should contain email error for: ${email}`)
  }
})

test('Module 1 (Contact): Rejects oversized payloads exceeding security thresholds', () => {
  const oversizedPayload: ContactPayload = {
    name: 'A'.repeat(101),
    email: 'valid@example.com',
    subject: 'B'.repeat(201),
    message: 'C'.repeat(5001),
  }
  const result = validateContactInput(oversizedPayload)
  assert.strictEqual(result.isValid, false)
  assert.ok(result.errors.name?.includes('100'), 'Name max length error')
  assert.ok(result.errors.subject?.includes('200'), 'Subject max length error')
  assert.ok(result.errors.message?.includes('5000'), 'Message max length error')
})

test('Module 1 (Contact): Rejects spam submission if honeypot field is filled', () => {
  const spamPayload: ContactPayload = {
    name: 'Spam Bot',
    email: 'spammer@bot.net',
    subject: 'Crypto Offer',
    message: 'Check out this suspicious opportunity right now.',
    hp_field: 'I am a bot',
  }
  const result = validateContactInput(spamPayload)
  assert.strictEqual(result.isValid, false)
  assert.ok(result.isSpam, 'Should flag as spam')
})

test('Module 1 (Contact): Sanitizes valid payload and trims whitespace', () => {
  const validPayload: ContactPayload = {
    name: '  Karl Reyes  ',
    email: '  karl.reyes@domain.com  ',
    subject: '  Collaboration Inquiry  ',
    message: '  Hello Karl, I would like to discuss a project.  ',
  }
  const result = validateContactInput(validPayload)
  assert.strictEqual(result.isValid, true)
  assert.strictEqual(result.sanitized.name, 'Karl Reyes')
  assert.strictEqual(result.sanitized.email, 'karl.reyes@domain.com')
  assert.strictEqual(result.sanitized.subject, 'Collaboration Inquiry')
  assert.strictEqual(result.sanitized.message, 'Hello Karl, I would like to discuss a project.')
})

test('Module 1 (Contact): Generates encoded mailto fallback URL to prevent data loss', () => {
  const payload: ContactPayload = {
    name: 'Alex Tan',
    email: 'alex@company.ph',
    subject: 'Engineering Role',
    message: 'Let us connect regarding full-stack opportunities.',
  }
  const mailto = formatMailtoFallback('karlcabasagan.202200008@gmail.com', payload)
  assert.ok(mailto.startsWith('mailto:karlcabasagan.202200008@gmail.com?'))
  assert.ok(mailto.includes('subject=Engineering+Role') || mailto.includes('subject=Engineering%20Role'))
  assert.ok(mailto.includes('Alex+Tan') || mailto.includes('Alex%20Tan'))
})
