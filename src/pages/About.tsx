import React from 'react'
import { motion } from 'framer-motion'
import { PageWrapper } from '../components/layout/PageWrapper'
import { SkillsMatrix } from '../components/about/SkillsMatrix'
import { GraduationCap, Code2, Server, Layout, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export const About: React.FC = () => {
  return (
    <PageWrapper className="space-y-16">
      {/* Bio / Background Section */}
      <section className="relative">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-mint/10 border border-accent-mint/30 text-xs font-mono text-accent-mint mb-4"
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>BSIT • Academic & Practical Mastery</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, delay: 0.05 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6"
          >
            Engineering scalable systems with mathematical precision and design taste.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, delay: 0.1 }}
            className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed max-w-prose"
          >
            <p>
              I am <strong className="text-white font-semibold">John Karl Harley A. Cabasagan</strong>, 
              an academically distinguished <strong className="text-white">Cum Laude</strong> graduate in 
              Bachelor of Science in Information Technology (BSIT) from <strong className="text-white">St. Peter's College</strong> (CGPA: 1.32). 
              Currently serving as a part-time Academic Instructor at St. Peter's College, I combine deep theoretical foundations with extensive hands-on experience as a Lead Developer across enterprise, academic, and web software applications.
            </p>
            <p>
              My technical proficiency spans full-stack development, backend API design, database management, and cross-institutional software collaboration. 
              My core stack centers on <strong className="text-white">Laravel (RESTful API Development), PHP, React.js, React with TypeScript, MySQL, Supabase, SQLite, and Firebase</strong>, alongside role-based access control (RBAC) implementations. 
              I also possess solid systems competencies in <strong className="text-white">Java, Python, C++, and Windows/Linux systems administration</strong>.
            </p>
            <p>
              Beyond development, I have led university student bodies as Year Level Representative and President, 
              completed a certified 486-hour software engineering industry internship at Multifactors Sales, 
              and engineered real-world digital automation pipelines in YouTube media workflows, web scraping, and SEO.
            </p>
          </motion.div>
        </div>

        {/* 3 Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="p-6 rounded-2xl bg-surface/70 border border-white/[0.08] glass-surface-hover">
            <div className="w-10 h-10 rounded-xl bg-accent-mint/10 border border-accent-mint/30 flex items-center justify-center text-accent-mint mb-4">
              <Server className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">Relational & API Architecture</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              ACID-compliant schemas, optimized Eloquent/SQL queries, REST contracts, and resilient WebSockets with row-level security.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-surface/70 border border-white/[0.08] glass-surface-hover">
            <div className="w-10 h-10 rounded-xl bg-accent-cyan/10 border border-accent-cyan/30 flex items-center justify-center text-accent-cyan mb-4">
              <Layout className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">Design Engineering Discipline</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Inspired by Emil Kowalski principles: 44px hit-targets, tabular numbers, spring physics, zero cumulative layout shift.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-surface/70 border border-white/[0.08] glass-surface-hover">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400 mb-4">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">Polyglot Problem Solver</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Comfortable pivoting across OOP (Java, PHP, C++), reactive functional code (React, TS), and rapid prototyping (Python, WordPress).
            </p>
          </div>
        </div>
      </section>

      {/* Skills Matrix Section */}
      <section className="pt-6 border-t border-white/[0.08]">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 text-accent-mint text-xs font-mono font-medium mb-1">
            <span>TECHNICAL CAPABILITIES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
            Interactive Skills Matrix
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-prose">
            Explore technologies by domain or search by name. Each entry represents real production implementation or rigorous academic application.
          </p>
        </div>

        <SkillsMatrix />
      </section>

      {/* Quick Jump CTA */}
      <section className="p-8 rounded-2xl bg-gradient-to-r from-surface to-surface-muted border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <h3 className="text-lg font-bold text-white mb-1">Ready to see these skills in action?</h3>
          <p className="text-xs text-slate-400">Review selected full-stack projects and architectural breakdowns.</p>
        </div>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-accent-mint text-slate-950 font-semibold text-xs hover:bg-emerald-300 transition-colors tap-scale shrink-0 min-h-[44px]"
        >
          <span>View Projects Showcase</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </PageWrapper>
  )
}
