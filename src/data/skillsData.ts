export interface Skill {
  name: string
  category: 'languages' | 'frameworks' | 'databases' | 'tools'
  level: 'Expert' | 'Advanced' | 'Proficient' | 'Familiar'
  highlight: boolean
  description: string
  badgeColor?: string
}

export const CATEGORIES = [
  { id: 'all', label: 'All Disciplines' },
  { id: 'languages', label: 'Core Languages' },
  { id: 'frameworks', label: 'Frameworks & Libs' },
  { id: 'databases', label: 'Databases & Cloud' },
  { id: 'tools', label: 'CMS & Engineering Tools' },
] as const

export const SKILLS_DATA: Skill[] = [
  // Core Languages
  {
    name: 'PHP',
    category: 'languages',
    level: 'Advanced',
    highlight: true,
    description: 'Object-oriented backend services, modern PHP 8.x attributes, robust MVC architecture.',
  },
  {
    name: 'TypeScript',
    category: 'languages',
    level: 'Advanced',
    highlight: true,
    description: 'Type-safe scalable systems, generic interfaces, and strict static analysis.',
  },
  {
    name: 'JavaScript (ESNext)',
    category: 'languages',
    level: 'Expert',
    highlight: true,
    description: 'Asynchronous event loops, Web APIs, functional patterns, and browser execution profiling.',
  },
  {
    name: 'Python',
    category: 'languages',
    level: 'Proficient',
    highlight: false,
    description: 'Data processing scripts, algorithmic tooling, automation, and backend utilities.',
  },
  {
    name: 'Java',
    category: 'languages',
    level: 'Proficient',
    highlight: false,
    description: 'Object-oriented programming, data structures, and enterprise application patterns.',
  },
  {
    name: 'C++',
    category: 'languages',
    level: 'Proficient',
    highlight: false,
    description: 'Low-level memory management, pointers, algorithmic problem solving, and CLI systems.',
  },
  {
    name: 'HTML5 & CSS3',
    category: 'languages',
    level: 'Expert',
    highlight: false,
    description: 'Semantic markup, accessible WCAG 2.1 tree structure, modern CSS Grid/Flexbox layouts.',
  },

  // Frameworks & Libraries
  {
    name: 'Laravel',
    category: 'frameworks',
    level: 'Advanced',
    highlight: true,
    description: 'Artisan CLI, Eloquent ORM, service providers, authentication pipelines, and RESTful APIs.',
  },
  {
    name: 'React 19',
    category: 'frameworks',
    level: 'Expert',
    highlight: true,
    description: 'Component lifecycles, custom hooks, concurrent rendering, and reactive state trees.',
  },
  {
    name: 'Next.js',
    category: 'frameworks',
    level: 'Advanced',
    highlight: true,
    description: 'Server-side rendering (SSR), static site generation (SSG), and optimized API endpoints.',
  },
  {
    name: 'Vue.js',
    category: 'frameworks',
    level: 'Proficient',
    highlight: false,
    description: 'Composition API, reactive refs, single-file components, and lightweight frontends.',
  },
  {
    name: 'Angular',
    category: 'frameworks',
    level: 'Familiar',
    highlight: false,
    description: 'Dependency injection, TypeScript-first decorators, and structured component modules.',
  },
  {
    name: 'Tailwind CSS',
    category: 'frameworks',
    level: 'Expert',
    highlight: true,
    description: 'Design token architecture, custom utility plugins, responsive micro-layouts.',
  },
  {
    name: 'Bootstrap',
    category: 'frameworks',
    level: 'Proficient',
    highlight: false,
    description: 'Rapid grid prototyping, responsive component layouts, utility-first adaptation.',
  },

  // Databases & Backend
  {
    name: 'MySQL',
    category: 'databases',
    level: 'Advanced',
    highlight: true,
    description: 'Relational schema normalization, complex indexing, stored procedures, and query tuning.',
  },
  {
    name: 'PostgreSQL',
    category: 'databases',
    level: 'Advanced',
    highlight: true,
    description: 'ACID transactions, JSONB querying, relational integrity, and performant aggregation.',
  },
  {
    name: 'Supabase',
    category: 'databases',
    level: 'Advanced',
    highlight: true,
    description: 'Row-Level Security (RLS), real-time WebSockets, edge functions, and OAuth identity.',
  },
  {
    name: 'SQLite',
    category: 'databases',
    level: 'Proficient',
    highlight: false,
    description: 'Embedded fast transactional storage, zero-config relational database operations.',
  },

  // CMS & Tools
  {
    name: 'WordPress',
    category: 'tools',
    level: 'Advanced',
    highlight: true,
    description: 'Custom theme & plugin development, headless WP REST APIs, and CMS customization.',
  },
  {
    name: 'Git & GitHub',
    category: 'tools',
    level: 'Advanced',
    highlight: true,
    description: 'Branching workflows, semantic versioning, conventional commits, and team collaboration.',
  },
  {
    name: 'Vite',
    category: 'tools',
    level: 'Expert',
    highlight: false,
    description: 'Fast HMR bundling, Rollup pipeline optimizations, and plugin integrations.',
  },
  {
    name: 'Postman & REST APIs',
    category: 'tools',
    level: 'Advanced',
    highlight: false,
    description: 'Contract-first API testing, automated collection runners, and payload inspection.',
  },
]
