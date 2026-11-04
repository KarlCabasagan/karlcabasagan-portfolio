export interface ContactPayload {
  name: string
  email: string
  subject: string
  message: string
  hp_field?: string // Honeypot field for bot trapping
}

export interface ValidationErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

export interface ValidationResult {
  isValid: boolean
  isSpam: boolean
  errors: ValidationErrors
  sanitized: ContactPayload
}

// RFC 5322-compliant simplified email pattern with TLD length constraint
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/

const LIMITS = {
  nameMax: 100,
  emailMax: 254,
  subjectMax: 200,
  messageMin: 10,
  messageMax: 5000,
}

/**
 * Validates and sanitizes incoming contact payload using platform primitives.
 */
export function validateContactInput(payload: ContactPayload): ValidationResult {
  const isSpam = Boolean(payload.hp_field && payload.hp_field.trim().length > 0)
  const errors: ValidationErrors = {}

  // Strip control characters and trim
  const clean = (val: string) => val.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim()

  const name = clean(payload.name || '')
  const email = clean(payload.email || '')
  const subject = clean(payload.subject || '')
  const message = clean(payload.message || '')

  if (!name) {
    errors.name = 'Please provide your name.'
  } else if (name.length > LIMITS.nameMax) {
    errors.name = `Name cannot exceed ${LIMITS.nameMax} characters.`
  }

  if (!email) {
    errors.email = 'Please provide your email address.'
  } else if (email.length > LIMITS.emailMax || !EMAIL_REGEX.test(email) || email.endsWith('.com.com') || email.split('@')[1]?.split('.').some(part => !part || /^\d+$/.test(part))) {
    errors.email = 'Please enter a valid email address.'
  }

  if (!subject) {
    errors.subject = 'Please specify a subject.'
  } else if (subject.length > LIMITS.subjectMax) {
    errors.subject = `Subject cannot exceed ${LIMITS.subjectMax} characters.`
  }

  if (!message) {
    errors.message = 'Please enter your message.'
  } else if (message.length < LIMITS.messageMin) {
    errors.message = `Message must be at least ${LIMITS.messageMin} characters long.`
  } else if (message.length > LIMITS.messageMax) {
    errors.message = `Message cannot exceed ${LIMITS.messageMax} characters.`
  }

  const isValid = !isSpam && Object.keys(errors).length === 0

  return {
    isValid,
    isSpam,
    errors,
    sanitized: {
      name,
      email,
      subject,
      message,
    },
  }
}

/**
 * Generates RFC 2368 mailto URI fallback to prevent inquiry loss when offline or endpoint is down.
 */
export function formatMailtoFallback(recipientEmail: string, payload: ContactPayload): string {
  const body = `Name: ${payload.name}\nEmail: ${payload.email}\n\nMessage:\n${payload.message}`
  const params = new URLSearchParams({
    subject: payload.subject,
    body,
  })
  return `mailto:${recipientEmail}?${params.toString()}`
}

export interface DispatchResult {
  success: boolean
  usedFallbackMailto?: string
  error?: string
}

/**
 * Dispatches message via external webhook endpoint or provides guaranteed mailto fallback.
 * shortcut: direct fetch to public endpoint or client mailto fallback, upgrade to authenticated backend proxy on high traffic.
 */
export async function dispatchContactMessage(
  payload: ContactPayload,
  recipientEmail: string,
  endpointUrl?: string,
  signal?: AbortSignal
): Promise<DispatchResult> {
  const validation = validateContactInput(payload)
  if (!validation.isValid) {
    return { success: false, error: 'Validation failed.' }
  }

  if (validation.isSpam) {
    // Silently succeed for bots
    return { success: true }
  }

  if (endpointUrl) {
    try {
      const response = await fetch(endpointUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(validation.sanitized),
        signal,
      })
      if (response.ok) {
        return { success: true }
      }
    } catch {
      // Network failure, drop down to mailto fallback
    }
  }

  // Fallback to mailto link if no endpoint configured or fetch failed
  const mailtoUrl = formatMailtoFallback(recipientEmail, validation.sanitized)
  return {
    success: true,
    usedFallbackMailto: mailtoUrl,
  }
}
