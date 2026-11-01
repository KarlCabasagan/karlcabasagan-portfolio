import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Terminal, Sparkles, FolderGit2, Download } from 'lucide-react'

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-6 pb-16 md:pt-12 md:pb-24">
      {/* Background radial glow */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-gradient-to-tr from-accent-mint/15 to-accent-cyan/10 rounded-full blur-[100px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Col: Hero Pitch */}
        <div className="lg:col-span-7 flex flex-col items-start">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-muted/80 border border-white/10 text-xs text-slate-300 mb-6 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-mint opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-mint"></span>
            </span>
            <span className="font-mono text-accent-mint font-medium">BSIT Graduate</span>
            <span className="text-slate-500">•</span>
            <span>Full-Stack & Creative UI/UX Engineer</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.05 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6"
          >
            Hi, I’m{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-mint via-teal-300 to-accent-cyan">
              Karl Cabasagan
            </span>
            .
            <span className="block mt-2 text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-300">
              Architecting resilient backends & tactile interfaces.
            </span>
          </motion.h1>

          {/* Subtitle / Description capped at 65ch */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.1 }}
            className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-prose mb-8"
          >
            I synthesize full-stack engineering with creative design precision. From robust
            PHP/Laravel APIs, Supabase real-time pipelines, and normalized SQL schemas to fluid,
            micro-interaction rich React & Next.js client experiences.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.15 }}
            className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
          >
            <Link
              to="/projects"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-accent-mint text-slate-950 font-semibold text-sm hover:bg-emerald-300 transition-colors tap-scale shadow-lg shadow-accent-mint/20 min-h-[44px]"
            >
              <FolderGit2 className="w-4 h-4" />
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>

            <Link
              to="/about"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-surface hover:bg-surface-muted text-slate-200 border border-white/10 hover:border-white/20 font-medium text-sm transition-all tap-scale min-h-[44px]"
            >
              <Sparkles className="w-4 h-4 text-accent-cyan" />
              <span>Skills Matrix</span>
            </Link>

            <a
              href="/Karl_Cabasagan_CV.pdf"
              download="Karl_Cabasagan_CV.pdf"
              className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-slate-400 hover:text-white transition-colors text-sm font-medium tap-scale min-h-[44px] hit-target"
            >
              <Download className="w-4 h-4" />
              <span>Download CV</span>
            </a>
          </motion.div>
        </div>

        {/* Right Col: Interactive Code / Terminal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.12 }}
          className="lg:col-span-5"
        >
          <div className="rounded-2xl bg-surface border border-white/10 shadow-2xl overflow-hidden glass-surface">
            {/* Terminal Topbar */}
            <div className="flex items-center justify-between px-4 py-3 bg-surface-muted/90 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-mono text-[11px] text-slate-400 flex items-center gap-1">
                  <Terminal className="w-3.5 h-3.5 text-accent-mint" />
                  karl-cabasagan.config.ts
                </span>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-accent-mint/90 bg-accent-mint/10 px-2 py-0.5 rounded">
                TypeScript
              </span>
            </div>

            {/* Code Body */}
            <div className="p-5 font-mono text-xs leading-relaxed overflow-x-auto text-slate-300 bg-[#0b0d13]">
              <div className="text-slate-500 italic mb-2">
                // Full-Stack Engineer Manifest
              </div>
              <p>
                <span className="text-violet-400">export const</span>{' '}
                <span className="text-accent-cyan">developer</span>:{' '}
                <span className="text-amber-300">SoftwareEngineer</span> = &#123;
              </p>
              <div className="pl-4 space-y-1">
                <p>
                  <span className="text-slate-400">name:</span>{' '}
                  <span className="text-emerald-300">'John Karl Harley A. Cabasagan'</span>,
                </p>
                <p>
                  <span className="text-slate-400">credentials:</span>{' '}
                  <span className="text-emerald-300">'BSIT Graduate'</span>,
                </p>
                <p>
                  <span className="text-slate-400">coreBackends:</span> [
                  <span className="text-amber-200">'PHP'</span>,{' '}
                  <span className="text-amber-200">'Laravel'</span>,{' '}
                  <span className="text-amber-200">'Supabase'</span>,{' '}
                  <span className="text-amber-200">'MySQL'</span>,{' '}
                  <span className="text-amber-200">'PostgreSQL'</span>],
                </p>
                <p>
                  <span className="text-slate-400">coreFrontends:</span> [
                  <span className="text-teal-200">'React 19'</span>,{' '}
                  <span className="text-teal-200">'TypeScript'</span>,{' '}
                  <span className="text-teal-200">'Next.js'</span>,{' '}
                  <span className="text-teal-200">'Tailwind'</span>],
                </p>
                <p>
                  <span className="text-slate-400">polyglotFamiliarity:</span> [
                  <span className="text-slate-300">'Python'</span>,{' '}
                  <span className="text-slate-300">'Java'</span>,{' '}
                  <span className="text-slate-300">'C++'</span>,{' '}
                  <span className="text-slate-300">'Vue'</span>,{' '}
                  <span className="text-slate-300">'Angular'</span>],
                </p>
                <p>
                  <span className="text-slate-400">status:</span>{' '}
                  <span className="text-accent-mint font-semibold">'Ready to Deploy & Scale'</span>,
                </p>
                <p>
                  <span className="text-slate-400">solveProblem:</span> () =&gt; &#123;
                </p>
                <p className="pl-4 text-slate-400">
                  <span className="text-violet-400">return</span>{' '}
                  <span className="text-emerald-300">'High Performance + Zero AI Slop'</span>;
                </p>
                <p>&#125;</p>
              </div>
              <p>&#125;;</p>

              <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Tests: 100% Passed
                </span>
                <span className="tabular-nums">Latency: 14ms</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
