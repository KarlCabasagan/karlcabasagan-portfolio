export interface ExperienceItem {
  id: string
  period: string
  role: string
  organization: string
  location: string
  type: 'Education' | 'Experience' | 'Milestone'
  description: string
  highlights: string[]
  technologies: string[]
}

export const TIMELINE_DATA: ExperienceItem[] = [
  {
    id: 'exp-fullstack-dev',
    period: '2024 — Present',
    role: 'Full-Stack Developer & Software Engineer',
    organization: 'Independent Practice / Client Engineering',
    location: 'Remote / Philippines',
    type: 'Experience',
    description: 'Engineering resilient web applications, custom enterprise backends, and creative frontends with high-velocity release cycles.',
    highlights: [
      'Developed and deployed production web applications leveraging PHP/Laravel and React/TypeScript architectures.',
      'Designed normalized SQL schemas, integrated real-time Supabase services, and built robust RESTful API endpoints.',
      'Spearheaded user experience overhauls with fluid micro-interactions, responsive accessibility, and performance optimization.',
    ],
    technologies: ['Laravel', 'PHP', 'React', 'TypeScript', 'PostgreSQL', 'Tailwind CSS', 'Supabase'],
  },
  {
    id: 'edu-bsit',
    period: '2021 — 2025',
    role: 'Bachelor of Science in Information Technology (BSIT)',
    organization: 'University IT Faculty',
    location: 'Philippines',
    type: 'Education',
    description: 'Rigorous foundation in computer science, software engineering methodologies, database management systems, network infrastructure, and algorithmic computation.',
    highlights: [
      'Lead Developer on collegiate capstone project automating campus resource allocation and departmental logistics.',
      'Core coursework: Advanced Database Systems (MySQL/PostgreSQL), Object-Oriented Programming (Java, C++), Web Systems, Software Engineering Architecture.',
      'Recognized for exceptional software design and practical full-stack deployment capability.',
    ],
    technologies: ['Java', 'C++', 'Python', 'MySQL', 'PHP', 'Systems Architecture', 'Networking'],
  },
  {
    id: 'exp-web-solutions',
    period: '2022 — 2024',
    role: 'Web Developer & CMS Specialist',
    organization: 'Digital Projects & Academic Lab',
    location: 'Philippines',
    type: 'Experience',
    description: 'Designed tailored content management solutions, responsive web interfaces, and bespoke WordPress architectures.',
    highlights: [
      'Created custom responsive WordPress themes and tailored PHP plugins replacing bloated off-the-shelf page builders.',
      'Integrated payment gateways, booking systems, and automated email workflows for local business clients.',
      'Maintained 99.9% uptime and streamlined client onboarding through clear technical documentation.',
    ],
    technologies: ['WordPress', 'PHP', 'JavaScript', 'Bootstrap', 'HTML5/CSS3', 'MySQL'],
  },
  {
    id: 'milestone-systems',
    period: '2021 — 2022',
    role: 'Programming Fundamentals & Algorithmic Foundations',
    organization: 'Academic Computing & Open-Source Studies',
    location: 'Self-Directed & Collegiate',
    type: 'Milestone',
    description: 'Intensive immersion into algorithmic problem solving, computational complexity, memory management, and structured programming paradigms.',
    highlights: [
      'Implemented data structures (linked lists, trees, graphs, hash tables) from scratch in C++ and Java.',
      'Built automated CLI productivity scripts in Python and explored Linux environment scripting.',
      'Committed early open-source experiments and established version control discipline with Git.',
    ],
    technologies: ['C++', 'Java', 'Python', 'Data Structures', 'Algorithms', 'Git'],
  },
]
