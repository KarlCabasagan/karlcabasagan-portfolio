export interface ExperienceItem {
  id: string
  period: string
  role: string
  organization: string
  location: string
  type: 'Education' | 'Experience' | 'Leadership' | 'Milestone'
  description: string
  highlights: string[]
  technologies: string[]
}

export const TIMELINE_DATA: ExperienceItem[] = [
  {
    id: 'instructor-spc',
    period: '2026 — Present',
    role: 'Academic Instructor (Part-Time)',
    organization: "St. Peter's College",
    location: 'Iligan City, Lanao del Norte',
    type: 'Experience',
    description: 'Instructing Information Technology students in software engineering, mobile application development, analytics modeling, and platform technologies with strong practical industry standards.',
    highlights: [
      'Teach foundational and advanced computing subjects including programming, mobile apps, and platform systems.',
      'Develop hands-on instructional materials, laboratory exercises, and performance assessment rubrics.',
      'Mentor and guide students in building analytical thinking, architectural rigor, and problem-solving skills.',
    ],
    technologies: ['Instruction', 'Curriculum Design', 'Programming', 'Mobile Development', 'Platform Technologies'],
  },
  {
    id: 'intern-multifactors',
    period: 'Feb 2026 — May 2026',
    role: 'Full-Stack Developer Intern (486 Hours OJT)',
    organization: 'Multifactors Sales Development Department',
    location: 'Iligan City, Lanao del Norte',
    type: 'Experience',
    description: 'Completed a certified 486-hour corporate industry internship within the core software development division, engineering full-stack solutions for operational commercial needs.',
    highlights: [
      'Actively built, tested, and maintained web applications leveraging full-stack methodologies to solve practical business problems.',
      'Collaborated directly with senior engineering teams under structured management and deployment pipelines.',
      'Fitted enterprise-level software requirements into reliable production releases.',
    ],
    technologies: ['PHP', 'Laravel', 'MySQL', 'Web Applications', 'Full-Stack Engineering'],
  },
  {
    id: 'freelance-automation',
    period: 'Oct 2024 — Sep 2025',
    role: 'Freelance Digital Specialist (Automation & SEO)',
    organization: 'Independent Consultancy',
    location: 'Remote',
    type: 'Experience',
    description: 'Engineered automated digital pipelines, web scraping tools, and SEO infrastructure to streamline content distribution and generate qualified commercial leads.',
    highlights: [
      'Formulated and managed scalable script-driven workflows for automated YouTube and media delivery pipelines.',
      'Contracted as a Marketing Lead Finder, deploying web data scraping technologies and data extraction pipelines.',
      'Implemented advanced Search Engine Optimization (SEO) methodologies for B2B lead generation.',
    ],
    technologies: ['Python', 'Web Scraping', 'Data Extraction', 'YouTube Automation', 'SEO Algorithms'],
  },
  {
    id: 'edu-spc-bsit',
    period: '2022 — 2026',
    role: 'Bachelor of Science in Information Technology (BSIT)',
    organization: "St. Peter's College",
    location: 'Iligan City, Lanao del Norte',
    type: 'Education',
    description: 'Graduated Cum Laude with a Cumulative Grade Point Average (CGPA) of 1.32. Specialized in full-stack web engineering, backend APIs, relational databases, and IT systems.',
    highlights: [
      'Academic Honor: Graduated Cum Laude with CGPA of 1.32.',
      'Undergraduate Thesis Lead Developer: Agrilink (Agricultural product sales & localized crop recommendation engine).',
      'Lead Developer & Collaborator on campus-wide institutional systems (SPC Academic Affairs, QR Attendance, SPCanteen, MSU-IIT Tracker).',
    ],
    technologies: ['Laravel', 'PHP', 'React', 'MySQL', 'Supabase', 'C++', 'Java', 'Python', 'Networking'],
  },
  {
    id: 'leadership-spc',
    period: '2023 — 2026',
    role: 'Year Level Representative & Former President',
    organization: "St. Peter's College Computing Student Body",
    location: 'Iligan City, Lanao del Norte',
    type: 'Leadership',
    description: 'Executive student leadership across multiple academic years, bridging student body requirements with faculty administration and orchestrating technical workshops.',
    highlights: [
      'S.Y. 2025–2026: Year Level Representative — primary liaison between student cohort and faculty administration, coordinating departmental IT projects and academic seminars.',
      'S.Y. 2023–2024: Year Level President — exercised executive leadership, organized student-led development workshops, and managed project delegations.',
    ],
    technologies: ['Leadership', 'Event Organization', 'Technical Workshops', 'Governance'],
  },
  {
    id: 'admin-hac',
    period: '2021 — 2025',
    role: 'Administrative Assistant (Part-Time)',
    organization: 'HAC Construction Supply',
    location: 'Iligan City, Lanao del Norte',
    type: 'Experience',
    description: 'Maintained operational data log records, inventory control, and transaction reconciliation for a high-volume construction supply enterprise.',
    highlights: [
      'Maintained strict corporate data entries for inventory control and structured stock level updates.',
      'Resolved client service inquiries and processed transactional order paperwork in a fast-paced environment.',
    ],
    technologies: ['Inventory Control', 'Data Entry', 'Operations Management', 'Customer Coordination'],
  },
]
