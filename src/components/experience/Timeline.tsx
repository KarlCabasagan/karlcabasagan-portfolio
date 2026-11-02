import React from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, Briefcase, CheckCircle2, Calendar, MapPin, Milestone, Users } from 'lucide-react'
import { TIMELINE_DATA, type ExperienceItem } from '../../data/experienceData'

export const Timeline: React.FC = () => {
  const getTypeBadge = (type: ExperienceItem['type']) => {
    switch (type) {
      case 'Education':
        return {
          icon: GraduationCap,
          color: 'text-accent-cyan bg-accent-cyan/10 border-accent-cyan/30',
        }
      case 'Experience':
        return {
          icon: Briefcase,
          color: 'text-accent-mint bg-accent-mint/10 border-accent-mint/30',
        }
      case 'Leadership':
        return {
          icon: Users,
          color: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
        }
      case 'Milestone':
        return {
          icon: Milestone,
          color: 'text-violet-400 bg-violet-500/10 border-violet-500/30',
        }
    }
  }

  return (
    <div className="relative pl-6 sm:pl-8 border-l border-white/10 space-y-12">
      {TIMELINE_DATA.map((item, idx) => {
        const { icon: TypeIcon, color } = getTypeBadge(item.type)
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.22, delay: idx * 0.07 }}
            className="relative group"
          >
            {/* Timeline Dot */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-surface border-2 border-white/20 group-hover:border-accent-mint group-hover:scale-110 flex items-center justify-center transition-all">
              <span className="w-2 h-2 rounded-full bg-accent-mint" />
            </div>

            {/* Timeline Content Card */}
            <div className="p-6 rounded-2xl bg-surface/80 border border-white/[0.08] hover:border-white/20 glass-surface-hover space-y-4">
              {/* Header row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`inline-flex items-center gap-1 text-[11px] font-mono px-2.5 py-0.5 rounded-full border ${color}`}>
                    <TypeIcon className="w-3 h-3" />
                    {item.type}
                  </span>
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span className="tabular-nums">{item.period}</span>
                  </span>
                </div>

                <span className="text-xs text-slate-500 flex items-center gap-1 font-mono">
                  <MapPin className="w-3 h-3" />
                  {item.location}
                </span>
              </div>

              {/* Title & Organization */}
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-accent-mint transition-colors">
                  {item.role}
                </h3>
                <p className="text-xs font-medium text-slate-300">
                  {item.organization}
                </p>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-400 leading-relaxed max-w-prose">
                {item.description}
              </p>

              {/* Bullet highlights */}
              <div className="space-y-2 pt-2 border-t border-white/[0.04]">
                {item.highlights.map((bullet, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent-mint shrink-0 mt-0.5" />
                    <span className="leading-normal">{bullet}</span>
                  </div>
                ))}
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {item.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.03] text-slate-400 border border-white/[0.05]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
