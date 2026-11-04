export interface RouteConfig {
  path: string
  label: string
}

export const ROUTES: RouteConfig[] = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/projects', label: 'Projects' },
  { path: '/projects/:id', label: 'Project Detail' },
  { path: '/experience', label: 'Experience' },
  { path: '/contact', label: 'Contact' },
  { path: '*', label: 'Not Found' },
]

export function isValidRoutePath(path: string): boolean {
  if (['/', '/about', '/projects', '/experience', '/contact'].includes(path)) {
    return true
  }
  if (path.startsWith('/projects/') && path.length > '/projects/'.length) {
    return true
  }
  return false
}
