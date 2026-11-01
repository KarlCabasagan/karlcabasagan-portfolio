import React from 'react'
import { PageWrapper } from '../components/layout/PageWrapper'
import { Timeline } from '../components/experience/Timeline'
import { CVSection } from '../components/experience/CVSection'
import { Briefcase, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export const Experience: React.FC = () => {
  return (
    <PageWrapper className="space-y-16">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-mint/10 border border-accent-mint/30 text-xs font-mono text-accent-mint mb-4">
          <Briefcase className="w-3.5 h-3.5" />
          <span>CAREER & ACADEMICS</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
          Trajectory & Professional Milestones.
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-prose leading-relaxed">
          Chronological progression across university computer science (BSIT), practical full-stack 
          application deployments, and continuous technical evolution.
        </p>
      </div>

      {/* CV Section Card */}
      <CVSection />

      {/* Timeline Section */}
      <div className="space-y-8 pt-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Chronological Experience & Education
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-prose">
            Key academic stages, client engineering initiatives, and foundational programming milestones.
          </p>
        </div>

        <Timeline />
      </div>

      {/* Contact CTA */}
      <section className="p-8 rounded-2xl bg-gradient-to-r from-surface to-surface-muted border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <h3 className="text-lg font-bold text-white mb-1">Looking for a dependable engineer?</h3>
          <p className="text-xs text-slate-400">Let’s discuss how I can contribute to your engineering team.</p>
        </div>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-accent-mint text-slate-950 font-semibold text-xs hover:bg-emerald-300 transition-colors tap-scale shrink-0 min-h-[44px]"
        >
          <span>Initiate Contact</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </PageWrapper>
  )
}
