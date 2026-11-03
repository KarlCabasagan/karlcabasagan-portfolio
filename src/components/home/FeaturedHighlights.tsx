import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { GithubIcon } from '../common/Icons'
import { PROJECTS_DATA } from '../../data/projectsData'

export const FeaturedHighlights: React.FC = () => {
  const navigate = useNavigate()
  const featured = PROJECTS_DATA.filter((p) => p.featured).slice(0, 3)

  return (
    <section className="py-12 border-t border-white/[0.08]">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-accent-mint text-xs font-mono font-medium mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CURATED WORKS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Featured Full-Stack Systems
          </h2>
        </div>
        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-mint hover:text-emerald-300 transition-colors tap-scale hit-target"
        >
          <span>View All Projects</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featured.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, delay: idx * 0.06 }}
            onClick={(e) => {
              if ((e.target as HTMLElement).closest('a')) return
              navigate(`/projects/${project.id}`)
            }}
            className="group flex flex-col justify-between p-6 rounded-2xl bg-surface/80 border border-white/[0.08] hover:border-accent-mint/30 glass-surface-hover cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-white/[0.04] text-accent-cyan border border-white/[0.06]">
                  {project.category}
                </span>
                <span className="text-xs font-mono text-slate-500">0{idx + 1}</span>
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-accent-mint transition-colors mb-2">
                {project.title}
              </h3>

              <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-surface-muted text-slate-300 border border-white/[0.04]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors hit-target tap-scale"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span className="font-mono text-[11px]">Source</span>
              </a>

              <Link
                to={`/projects/${project.id}`}
                className="flex items-center gap-1.5 text-accent-mint hover:text-emerald-300 font-semibold transition-colors hit-target tap-scale"
              >
                <span>Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
