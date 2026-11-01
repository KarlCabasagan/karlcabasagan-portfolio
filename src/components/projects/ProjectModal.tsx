import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle2, Cpu, Terminal, ArrowUpRight } from 'lucide-react'
import { GithubIcon } from '../common/Icons'
import type { Project } from '../../data/projectsData'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
          aria-hidden="true"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-surface border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10 glass-surface my-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/[0.08] flex items-start justify-between gap-4 bg-surface-muted/60">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-accent-mint/15 text-accent-mint border border-accent-mint/30">
                  {project.category}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {project.subtitle}
                </span>
              </div>
              <h2 id="project-modal-title" className="text-xl sm:text-2xl font-bold text-white">
                {project.title}
              </h2>
            </div>

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-xl bg-white/[0.04] hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center tap-scale hit-target focus:outline-none"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
            {/* Overview */}
            <div>
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5 font-mono">
                <Terminal className="w-3.5 h-3.5 text-accent-cyan" />
                Architecture Overview
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed max-w-prose">
                {project.description}
              </p>
            </div>

            {/* Engineering Highlights */}
            <div>
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-1.5 font-mono">
                <Cpu className="w-3.5 h-3.5 text-accent-mint" />
                Engineering Feats & Decisions
              </h4>
              <div className="space-y-2.5">
                {project.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <CheckCircle2 className="w-4 h-4 text-accent-mint shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-300 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Metrics */}
            {project.metrics && (
              <div>
                <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 font-mono">
                  Telemetry & Benchmarks
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  {project.metrics.map((m, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-surface-muted border border-white/[0.04] text-center">
                      <span className="block text-[10px] text-slate-400 uppercase font-mono">{m.label}</span>
                      <span className="text-sm font-bold text-white tabular-nums">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Stack Tags */}
            <div>
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 font-mono">
                Technologies & Protocols
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono px-3 py-1 rounded-lg bg-surface-muted text-slate-200 border border-white/[0.08]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 bg-surface-muted/90 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
            <span className="text-[11px] text-slate-500 font-mono">
              Repository: KarlCabasagan/{project.id}
            </span>

            <div className="flex items-center gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface hover:bg-surface-subtle text-slate-200 border border-white/10 text-xs font-medium transition-colors tap-scale min-h-[40px]"
              >
                <GithubIcon className="w-4 h-4 text-accent-mint" />
                <span>GitHub Repo</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={onClose}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent-mint text-slate-950 text-xs font-semibold hover:bg-emerald-300 transition-colors tap-scale min-h-[40px]"
              >
                <span>Close Preview</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
