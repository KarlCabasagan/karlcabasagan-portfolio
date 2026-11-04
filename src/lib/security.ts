import { PROJECTS_DATA, type Project } from '../data/projectsData.ts'

/**
 * Sanitizes external URLs, strictly permitting only standard HTTP and HTTPS protocols.
 * Blocks dangerous schemes such as javascript:, data:, vbscript:, and file:.
 */
export function sanitizeExternalUrl(url?: string | null): string | null {
  if (!url || typeof url !== 'string') return null
  const trimmed = url.trim()

  try {
    const parsed = new URL(trimmed)
    if (parsed.protocol === 'https:' || parsed.protocol === 'http:') {
      return trimmed
    }
  } catch {
    // Malformed URL or relative path
  }

  return null
}

/**
 * Validates a repository URL and constructs a safe git clone command,
 * preventing command injection via shell metacharacters in copy-paste targets.
 */
export function createSafeCloneCommand(repoUrl?: string | null): string | null {
  const sanitized = sanitizeExternalUrl(repoUrl)
  if (!sanitized) return null

  // Ensure repository URL contains only standard URL path characters, no shell control metacharacters
  if (!/^[a-zA-Z0-9.:\/-]+$/.test(sanitized)) {
    return null
  }

  return `git clone ${sanitized}.git`
}

/**
 * Retrieves a catalog project safely by identifier (case-insensitive).
 */
export function getProjectById(id?: string | null): Project | undefined {
  if (!id || typeof id !== 'string') return undefined
  const normalized = id.trim().toLowerCase()
  return PROJECTS_DATA.find((p) => p.id.toLowerCase() === normalized)
}
