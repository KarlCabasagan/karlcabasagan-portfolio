import React from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Sparkles, CheckCircle, ArrowUpRight } from 'lucide-react'
import { GithubIcon } from '../common/Icons'
import type { Project } from '../../data/projectsData'

interface ProjectCardProps {
  project: Project
  onSelect: (project: Project) => void
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className="group rounded-2xl bg-surface/80 border border-white/[0.08] hover:border-accent-mint/40 glass-surface-hover flex flex-col justify-between overflow-hidden"
    >
      <div className="p-6">
        {/* Header badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/[0.04] text-accent-cyan border border-white/[0.08]">
            {project.category}
          </span>
          {project.featured && (
            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-accent-mint bg-accent-mint/10 border border-accent-mint/30 px-2 py-0.5 rounded-full">
              <Sparkles className="w-3 h-3" />
              Featured
            </span>
          )}
        </div>

        {/* Title & Subtitle */}
        <h3 className="text-lg font-bold text-white group-hover:text-accent-mint transition-colors mb-1">
          {project.title}
        </h3>
        <p className="text-xs font-mono text-slate-400 mb-3">
          {project.subtitle}
        </p>

        {/* Description */}
        <p className="text-xs text-slate-300 leading-relaxed mb-5">
          {project.description}
        </p>

        {/* Key Highlights list */}
        <div className="space-y-2 mb-6">
          {project.highlights.slice(0, 2).map((item, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-slate-400">
              <CheckCircle className="w-3.5 h-3.5 text-accent-mint shrink-0 mt-0.5" />
              <span className="leading-tight">{item}</span>
            </div>
          ))}
        </div>

        {/* Performance Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-surface-muted/70 border border-white/[0.04] mb-5">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="text-center">
                <span className="block text-[10px] text-slate-500 font-mono uppercase">
                  {m.label}
                </span>
                <span className="text-xs font-bold text-slate-200 tabular-nums">
                  {m.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.03] text-slate-300 border border-white/[0.05]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="px-6 py-4 bg-surface-muted/40 border-t border-white/[0.06] flex items-center justify-between">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors tap-scale hit-target"
          aria-label={`View ${project.title} on GitHub`}
        >
          <GithubIcon className="w-3.5 h-3.5" />
          <span className="font-mono text-[11px]">Repository</span>
          <ArrowUpRight className="w-3 h-3 text-slate-500" />
        </a>

        <button
          onClick={() => onSelect(project)}
          className="inline-flex items-center gap-1 text-xs font-medium text-accent-mint hover:text-emerald-300 transition-colors tap-scale hit-target min-h-[36px]"
        >
          <span>Deep Dive</span>
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    </motion.div>
  )
}
