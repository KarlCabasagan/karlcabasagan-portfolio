export interface Skill {
  name: string
  category: 'languages' | 'frameworks' | 'databases' | 'systems' | 'operations'
  level: 'Expert' | 'Advanced' | 'Proficient' | 'Familiar'
  highlight: boolean
  description: string
  badgeColor?: string
}

export const CATEGORIES = [
  { id: 'all', label: 'All Disciplines' },
  { id: 'languages', label: 'Programming Languages' },
  { id: 'frameworks', label: 'Frameworks & Libraries' },
  { id: 'databases', label: 'Databases & Cloud' },
  { id: 'systems', label: 'Systems & Administration' },
  { id: 'operations', label: 'Digital Automation & SEO' },
] as const

export const SKILLS_DATA: Skill[] = [
  // Programming Languages
  {
    name: 'PHP',
    category: 'languages',
    level: 'Advanced',
    highlight: true,
    description: 'Object-oriented backend services, modern PHP attributes, robust REST API architecture.',
  },
  {
    name: 'JavaScript',
    category: 'languages',
    level: 'Advanced',
    highlight: true,
    description: 'Modern ESNext, asynchronous programming, DOM manipulation, client-side event loops.',
  },
  {
    name: 'TypeScript',
    category: 'languages',
    level: 'Advanced',
    highlight: true,
    description: 'Type-safe scalable architectures, generic interfaces, and strict static analysis.',
  },
  {
    name: 'Java',
    category: 'languages',
    level: 'Proficient',
    highlight: true,
    description: 'Object-oriented programming, data structures, and collegiate algorithmic computation.',
  },
  {
    name: 'Python',
    category: 'languages',
    level: 'Proficient',
    highlight: false,
    description: 'Web data scraping, automation pipelines, data extraction, and backend utilities.',
  },
  {
    name: 'C++',
    category: 'languages',
    level: 'Proficient',
    highlight: false,
    description: 'Low-level memory management, pointers, algorithmic problem solving, and IoT control.',
  },
  {
    name: 'HTML5 & CSS3',
    category: 'languages',
    level: 'Expert',
    highlight: false,
    description: 'Semantic markup, accessible WCAG tree structure, modern CSS Grid/Flexbox layouts.',
  },

  // Frameworks & Libraries
  {
    name: 'Laravel',
    category: 'frameworks',
    level: 'Advanced',
    highlight: true,
    description: 'RESTful API development, Eloquent ORM, authentication pipelines, and transactional database integrity.',
  },
  {
    name: 'React.js',
    category: 'frameworks',
    level: 'Advanced',
    highlight: true,
    description: 'Component architecture, custom hooks, state management, and responsive web experiences.',
  },
  {
    name: 'React with TypeScript',
    category: 'frameworks',
    level: 'Advanced',
    highlight: true,
    description: 'Strict typing for components, props, hooks, and scalable design system integration.',
  },
  {
    name: 'Tailwind CSS',
    category: 'frameworks',
    level: 'Expert',
    highlight: true,
    description: 'Utility-first modern styling, responsive viewports, and custom theme systems.',
  },

  // Databases & Cloud Architecture
  {
    name: 'MySQL',
    category: 'databases',
    level: 'Advanced',
    highlight: true,
    description: 'Relational database schema modeling, indexing, foreign key constraints, and transactional consistency.',
  },
  {
    name: 'Supabase',
    category: 'databases',
    level: 'Proficient',
    highlight: true,
    description: 'PostgreSQL-backed serverless platform, real-time client sync, and relational data management.',
  },
  {
    name: 'SQLite',
    category: 'databases',
    level: 'Proficient',
    highlight: false,
    description: 'Embedded lightweight relational database management for desktop and local systems.',
  },
  {
    name: 'Firebase',
    category: 'databases',
    level: 'Proficient',
    highlight: false,
    description: 'NoSQL cloud document storage, authentication services, and real-time event triggers.',
  },
  {
    name: 'Role-Based Access Control (RBAC)',
    category: 'databases',
    level: 'Advanced',
    highlight: true,
    description: 'Architecting fine-grained user privilege tiers, route protection guards, and audit log access.',
  },

  // Systems & Network Administration
  {
    name: 'Windows Systems Administration',
    category: 'systems',
    level: 'Advanced',
    highlight: false,
    description: 'System configuration, diagnostic tooling, enterprise workstation administration, and software rollouts.',
  },
  {
    name: 'Linux Environments',
    category: 'systems',
    level: 'Proficient',
    highlight: false,
    description: 'Command-line familiarity, shell utilities, permissions management, and server deployments.',
  },
  {
    name: 'Networking Foundations',
    category: 'systems',
    level: 'Proficient',
    highlight: false,
    description: 'IP addressing, Local Area Networks (LAN), Wide Area Networks (WAN), and router/modem deployment.',
  },
  {
    name: 'IT Support & Troubleshooting',
    category: 'systems',
    level: 'Advanced',
    highlight: false,
    description: 'Diagnostics, computer hardware deployment, system maintenance, and peripheral configuration.',
  },

  // Digital Automation & Operations
  {
    name: 'YouTube Automation Pipelines',
    category: 'operations',
    level: 'Advanced',
    highlight: true,
    description: 'Scalable script-driven workflows for automated digital content delivery and media pipelines.',
  },
  {
    name: 'Web Scraping & Data Extraction',
    category: 'operations',
    level: 'Advanced',
    highlight: true,
    description: 'Specialized data scraping technologies, automated crawlers, parsing, and structured data extraction.',
  },
  {
    name: 'Search Engine Optimization (SEO)',
    category: 'operations',
    level: 'Advanced',
    highlight: false,
    description: 'Advanced SEO methodologies, organic search ranking algorithms, and performance auditing.',
  },
  {
    name: 'B2B Lead Qualification',
    category: 'operations',
    level: 'Proficient',
    highlight: false,
    description: 'Market lead discovery algorithms, automated qualification pipelines, and commercial lead vetting.',
  },
]
