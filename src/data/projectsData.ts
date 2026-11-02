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
    id: 'agrilink',
    title: 'Agrilink: Optimized Agricultural Sales & Crop Recommendation',
    subtitle: 'Undergraduate Thesis • Full-Stack Web Platform • Predictive Analysis',
    description: 'Conceptualized, designed, and deployed an end-to-end agricultural platform engineered to maximize commercial efficiency across supply chains. Integrated data-driven insights and a localized crop recommendation engine providing predictive analytics for local farmers.',
    category: 'Full-Stack',
    tags: ['PHP', 'Laravel', 'MySQL', 'JavaScript', 'Predictive Analysis', 'Tailwind CSS'],
    featured: true,
    githubUrl: 'https://github.com/KarlCabasagan/Agrilink',
    demoUrl: '#',
    highlights: [
      'Conceptualized and built end-to-end agricultural marketplace connecting farmers directly to local buyers',
      'Engineered localized crop recommendation engine providing soil-and-climate aligned predictive insights',
      'Thesis adviser: Dr. Sahawi S. Malik, PhD, PCpE, STS, LPT; delivered verified yield optimizations'
    ],
    metrics: [
      { label: 'Role', value: 'Lead Developer' },
      { label: 'Scope', value: 'End-to-End' },
      { label: 'Domain', value: 'AgriTech' }
    ]
  },
  {
    id: 'qr-attendance-system',
    title: 'QR Attendance System & High-Performance Laravel REST API',
    subtitle: 'Laravel REST API • Dynamic QR Codes • Real-Time Verification',
    description: 'A high-performance, secure RESTful API built with Laravel powering a real-time mobile and web attendance verification suite. Features dynamic QR code generation, cryptographic validation, and automated attendance logging.',
    category: 'Backend',
    tags: ['Laravel', 'PHP', 'RESTful API', 'MySQL', 'Dynamic QR', 'Authentication'],
    featured: true,
    githubUrl: 'https://github.com/KarlCabasagan/QR-Attendance-System-With-Laraverl-API',
    demoUrl: '#',
    highlights: [
      'Developed high-performance RESTful API endpoints powering instant dynamic QR scanning and clock-ins',
      'Implemented tokenized request verification and tamper-proof attendance record validation',
      'Engineered automated attendance reporting and aggregated administrative audit dashboards'
    ],
    metrics: [
      { label: 'Architecture', value: 'RESTful API' },
      { label: 'Verification', value: 'Real-Time' },
      { label: 'Framework', value: 'Laravel' }
    ]
  },
  {
    id: 'spc-academic-affairs',
    title: 'SPC Academic Affairs Evaluation System',
    subtitle: 'Institutional Evaluation Framework • Academic Audit Platform',
    description: 'Specialized evaluation and reporting framework designed, coded, and deployed for St. Peter’s College. Streamlines capture, processing, and analytical breakdown of internal departmental evaluations and administrative audit data.',
    category: 'Full-Stack',
    tags: ['PHP', 'MySQL', 'JavaScript', 'HTML5', 'CSS3', 'Audit Systems'],
    featured: true,
    githubUrl: 'https://github.com/KarlCabasagan/spc-academic-affairs-ticket-system',
    demoUrl: '#',
    highlights: [
      'Designed and deployed institutional evaluation engine for faculty and academic department metrics',
      'Standardized automated calculation pipelines eliminating manual report tally errors',
      'Delivered role-governed administrative reporting portals adopted across academic units'
    ],
    metrics: [
      { label: 'Institution', value: "St. Peter's College" },
      { label: 'Accuracy', value: '100% Automated' },
      { label: 'Impact', value: 'Campus-Wide' }
    ]
  },
  {
    id: 'spcanteen-ordering',
    title: 'SPCanteen: Campus Canteen Ordering System',
    subtitle: 'Web Ordering Platform • Queue Reduction • Campus Operations',
    description: 'Intuitive web-based transactional ordering and menu platform for school canteen operations. Modernized order placement, decreased waiting times, and boosted transactional efficiency for students and food service staff.',
    category: 'Full-Stack',
    tags: ['JavaScript', 'PHP', 'MySQL', 'Responsive UI', 'POS Workflow'],
    featured: false,
    githubUrl: 'https://github.com/KarlCabasagan/SPCCanteenOrderingSystem',
    demoUrl: '#',
    highlights: [
      'Created intuitive responsive digital menus enabling students and faculty to pre-order food',
      'Engineered kitchen order queue display streamlining preparation dispatch and counter pickups',
      'Cut campus lunch peak waiting times through digital transaction tracking'
    ],
    metrics: [
      { label: 'Efficiency', value: 'Low Wait' },
      { label: 'Audience', value: 'Campus Community' }
    ]
  },
  {
    id: 'checkmate-inventory',
    title: 'CheckMate: Consumable Stock & Grocery Management',
    subtitle: 'Stock Inventory Platform • Purchasing Alerts • Retail Optimization',
    description: 'Inventory management and stock surveillance software engineered to monitor consumable goods, generate automated reorder thresholds, and optimize small-business and household purchasing rhythms.',
    category: 'Frontend',
    tags: ['React', 'JavaScript', 'State Management', 'Local Storage', 'Tailwind CSS'],
    featured: false,
    githubUrl: 'https://github.com/KarlCabasagan/CheckMate',
    demoUrl: '#',
    highlights: [
      'Architected reactive stock tracking matrix with consumable expiration warnings',
      'Formulated automated shopping list compilation based on user-defined stock threshold levels',
      'Designed responsive dashboard with instant search, category filtering, and item categorization'
    ],
    metrics: [
      { label: 'Focus', value: 'Inventory Tracking' },
      { label: 'Alerting', value: 'Automated' }
    ]
  },
  {
    id: 'smart-breaker-system',
    title: 'Smart Breaker System & Electrical Automation',
    subtitle: 'Systems Engineering • Hardware/IoT Integration • Power Monitoring',
    description: 'Electrical automation and hardware-interfaced monitoring platform designed for real-time circuit surveillance, fault detection, and intelligent remote breaker control.',
    category: 'Systems',
    tags: ['Systems', 'C++', 'IoT', 'Hardware Automation', 'Telemetries'],
    featured: false,
    githubUrl: 'https://github.com/KarlCabasagan/Smart-Breaker-System',
    demoUrl: '#',
    highlights: [
      'Engineered telemetry ingestion interface reading real-time breaker state and electrical metrics',
      'Implemented safety trip alert notifications and status monitoring pipelines',
      'Interfaced embedded microcontroller communications with centralized management portal'
    ],
    metrics: [
      { label: 'Domain', value: 'IoT & Systems' },
      { label: 'Response', value: 'Immediate Trip' }
    ]
  },
  {
    id: 'msu-iit-ccs-tracker',
    title: 'MSU-IIT CCS Contribution Tracker',
    subtitle: 'Cross-Institutional Collaboration • RBAC • Financial Analytics',
    description: 'Customized financial and asset-tracking system co-developed for the Mindanao State University - Iligan Institute of Technology (MSU-IIT) College of Computer Studies. Features Role-Based Access Control and data visualization.',
    category: 'Full-Stack',
    tags: ['PHP', 'MySQL', 'RBAC', 'Data Visualization', 'Audit Logs', 'Financial Systems'],
    featured: true,
    githubUrl: 'https://github.com/KarlCabasagan',
    demoUrl: '#',
    highlights: [
      'Architected Role-Based Access Control (RBAC) securing departmental fee records across officer tiers',
      'Engineered interactive data visualization graphs, financial audit logs, and downloadable reports',
      'Collaborated cross-institutionally with collegiate student governing bodies'
    ],
    metrics: [
      { label: 'Security', value: 'Granular RBAC' },
      { label: 'Partner', value: 'MSU-IIT CCS' },
      { label: 'Scope', value: 'Financial Audit' }
    ]
  },
  {
    id: 'inventree',
    title: 'InvenTree: Multi-Tier Asset & Stock Directory',
    subtitle: 'Asset Directory • Relational Database • Organizational Workflow',
    description: 'Structured asset cataloging and inventory classification tool designed for hierarchical item tracking, stock transfers, and structured departmental asset registries.',
    category: 'Backend',
    tags: ['PHP', 'MySQL', 'Database Architecture', 'CRUD', 'Asset Tracking'],
    featured: false,
    githubUrl: 'https://github.com/KarlCabasagan/InvenTree',
    demoUrl: '#',
    highlights: [
      'Implemented hierarchical asset tree indexing for fast multi-category queries',
      'Designed normalized relational tables ensuring referential integrity on stock movement',
      'Built clean administrative controls for rapid item intake and batch state updates'
    ],
    metrics: [
      { label: 'Schema', value: 'Normalized RDBMS' },
      { label: 'Type', value: 'Asset Management' }
    ]
  },
  {
    id: 'movie-site-react',
    title: 'MovieSite React: Media Catalog & Discovery',
    subtitle: 'React • Dynamic API Ingestion • Responsive Streaming UI',
    description: 'Modern media discovery client engineered with React, showcasing responsive layout paradigms, API consumption, debounce search queries, and dynamic modal overlays.',
    category: 'Frontend',
    tags: ['React', 'JavaScript', 'REST API', 'CSS3', 'Responsive Design'],
    featured: false,
    githubUrl: 'https://github.com/KarlCabasagan/MovieSite-React',
    demoUrl: '#',
    highlights: [
      'Integrated external media API streaming movie metadata, ratings, and posters in real-time',
      'Built reactive category filters, instant keyword queries, and responsive poster grids',
      'Optimized image loading and component rendering states for smooth mobile browsing'
    ],
    metrics: [
      { label: 'Framework', value: 'React' },
      { label: 'UX', value: 'Mobile-First' }
    ]
  }
]
