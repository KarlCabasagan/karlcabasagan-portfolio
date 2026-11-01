export interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  category: 'Full-Stack' | 'Backend' | 'Frontend' | 'Systems'
  tags: string[]
  featured: boolean
  githubUrl: string
  demoUrl?: string
  highlights: string[]
  metrics?: { label: string; value: string }[]
}

export const PROJECT_CATEGORIES = ['All', 'Full-Stack', 'Backend', 'Frontend', 'Systems'] as const

export const PROJECTS_DATA: Project[] = [
  {
    id: 'artisan-inventory',
    title: 'Enterprise Multi-Tier Inventory & Order Pipeline',
    subtitle: 'Laravel 11 • MySQL • Tailwind CSS • Livewire',
    description: 'A robust enterprise-grade inventory and automated dispatch system with real-time stock reconciliation, audit logging, and role-based permissions.',
    category: 'Full-Stack',
    tags: ['PHP', 'Laravel', 'MySQL', 'Tailwind CSS', 'REST API', 'Livewire'],
    featured: true,
    githubUrl: 'https://github.com/KarlCabasagan/enterprise-inventory-system',
    demoUrl: '#',
    highlights: [
      'Engineered multi-tenant database partitioning handling 100k+ SKU records with optimized indexing',
      'Designed transactional stock mutation guards preventing race conditions during concurrent orders',
      'Integrated automated PDF invoice dispatch and low-stock webhook notifications'
    ],
    metrics: [
      { label: 'Query Latency', value: '< 42ms' },
      { label: 'Relational Integrity', value: '100% ACID' },
      { label: 'SKU Capacity', value: '100,000+' }
    ]
  },
  {
    id: 'pulse-board',
    title: 'PulseBoard Real-Time Team Canvas',
    subtitle: 'React 19 • TypeScript • Supabase • Framer Motion',
    description: 'Collaborative project execution workspace featuring live cursor presence, instant document sync via WebSockets, and granular Row-Level Security.',
    category: 'Full-Stack',
    tags: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Framer Motion', 'Tailwind CSS'],
    featured: true,
    githubUrl: 'https://github.com/KarlCabasagan/pulseboard-realtime-app',
    demoUrl: '#',
    highlights: [
      'Architected Postgres RLS security policies safeguarding organization workspaces',
      'Implemented optimistic UI state trees with rollback capability for offline resilience',
      'Fluid gesture-based kanban interactions powered by 60fps Framer Motion spring physics'
    ],
    metrics: [
      { label: 'Sync Latency', value: '~18ms' },
      { label: 'WebSocket Uptime', value: '99.9%' },
      { label: 'Frame Budget', value: '60 FPS' }
    ]
  },
  {
    id: 'headless-wp-engine',
    title: 'Headless Editorial API & Content Engine',
    subtitle: 'WordPress REST API • Next.js • PostgreSQL • Redis',
    description: 'High-speed headless CMS publishing architecture decoupling content authorship from a blazing-fast edge-rendered Next.js reader frontend.',
    category: 'Backend',
    tags: ['WordPress', 'PHP', 'Next.js', 'PostgreSQL', 'REST API', 'TypeScript'],
    featured: true,
    githubUrl: 'https://github.com/KarlCabasagan/headless-wp-next-engine',
    demoUrl: '#',
    highlights: [
      'Authored custom WordPress REST endpoints with selective field serialization reducing payload size by 68%',
      'Configured incremental static revalidation (ISR) for sub-second page propagation',
      'Implemented JWT authentication with rotating refresh tokens for secure administrative actions'
    ],
    metrics: [
      { label: 'Lighthouse Score', value: '100/100' },
      { label: 'Payload Reduction', value: '68%' },
      { label: 'TTFB', value: '85ms' }
    ]
  },
  {
    id: 'algotrace-core',
    title: 'AlgoTrace Memory & Compute Telemetry',
    subtitle: 'C++20 • Python • SQLite • CLI Tooling',
    description: 'Benchmarking and runtime memory profiler designed for analyzing algorithmic bottlenecks, cache miss ratios, and localized CPU thread loads.',
    category: 'Systems',
    tags: ['C++', 'Python', 'SQLite', 'Systems Programming', 'CLI'],
    featured: false,
    githubUrl: 'https://github.com/KarlCabasagan/algotrace-profiler',
    demoUrl: '#',
    highlights: [
      'Built high-resolution timing harnesses measuring microsecond execution variations',
      'Python data pipeline parsing SQLite trace logs into visual terminal ASCII graphs and heatmaps',
      'Zero-allocation fast logging ring buffer in modern C++'
    ],
    metrics: [
      { label: 'Sampling Jitter', value: '< 2μs' },
      { label: 'Memory Overhead', value: '< 4MB' }
    ]
  },
  {
    id: 'nexus-academic-portal',
    title: 'Institutional Resource & Student Portal',
    subtitle: 'BSIT Capstone • PHP • MySQL • Bootstrap 5 • JavaScript',
    description: 'Comprehensive academic administration and laboratory equipment tracking system developed for collegiate IT department workflow automation.',
    category: 'Full-Stack',
    tags: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'HTML5', 'CSS3'],
    featured: true,
    githubUrl: 'https://github.com/KarlCabasagan/campus-resource-portal',
    demoUrl: '#',
    highlights: [
      'Constructed relational schema modeling student enrollments, lab station reservations, and hardware assets',
      'Developed CSRF/XSS sanitization security middleware and role-based authentication matrix',
      'Automated semester end data archival with transaction integrity checks'
    ],
    metrics: [
      { label: 'Active Users', value: '1,200+' },
      { label: 'Audit Records', value: '50k+' }
    ]
  },
  {
    id: 'vue-metric-dashboard',
    title: 'Veloce Real-Time Service Monitor',
    subtitle: 'Vue 3 • TypeScript • Tailwind CSS • Chart.js',
    description: 'Lightweight reactive metrics dashboard providing operational health indicators, API response distribution histograms, and error alerting.',
    category: 'Frontend',
    tags: ['Vue', 'TypeScript', 'Tailwind CSS', 'WebSockets', 'Frontend'],
    featured: false,
    githubUrl: 'https://github.com/KarlCabasagan/veloce-service-monitor',
    demoUrl: '#',
    highlights: [
      'Dynamic reactive telemetry widgets utilizing Vue 3 Composition API',
      'Low battery consumption background polling with adaptive backoff',
      'Configurable dark/neon telemetry UI themes'
    ],
    metrics: [
      { label: 'Bundle Size', value: '38KB' },
      { label: 'Render Latency', value: '8ms' }
    ]
  }
]
