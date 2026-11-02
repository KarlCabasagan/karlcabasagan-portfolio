import React from 'react'
import { motion } from 'framer-motion'
import { Layers, Database, ShieldCheck, Zap } from 'lucide-react'

const STATS = [
  {
    icon: ShieldCheck,
    value: 'Cum Laude',
    label: 'Academic Distinction',
    detail: 'BSIT Graduate • CGPA: 1.32 at St. Peter’s College',
  },
  {
    icon: Database,
    value: '486 Hrs',
    label: 'Corporate OJT',
    detail: 'Full-Stack Developer Intern at Multifactors Sales',
  },
  {
    icon: Layers,
    value: '6+ Systems',
    label: 'Lead Developer Projects',
    detail: 'Agrilink, QR Attendance, SPC Academic Affairs, SPCanteen',
  },
  {
    icon: Zap,
    value: 'Part-Time',
    label: 'College Instructor',
    detail: 'Teaching Programming, Mobile Apps & Platform Technologies',
  },
]

export const QuickStats: React.FC = () => {
  return (
    <section className="py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: idx * 0.05 }}
              className="p-5 rounded-2xl bg-surface/70 border border-white/[0.08] hover:border-white/20 glass-surface-hover group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-surface-muted flex items-center justify-center border border-white/[0.06] group-hover:border-accent-mint/30 transition-colors">
                  <Icon className="w-4 h-4 text-accent-mint" />
                </div>
                <span className="text-2xl font-bold tracking-tight text-white tabular-nums group-hover:text-accent-mint transition-colors">
                  {stat.value}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-slate-200 mb-1">
                {stat.label}
              </h3>
              <p className="text-xs text-slate-400 leading-normal">
                {stat.detail}
              </p>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
