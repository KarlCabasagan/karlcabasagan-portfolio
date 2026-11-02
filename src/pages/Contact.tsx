import React from 'react'
import { PageWrapper } from '../components/layout/PageWrapper'
import { ContactForm } from '../components/contact/ContactForm'
import { Mail, ExternalLink, MapPin } from 'lucide-react'
import { GithubIcon, LinkedInIcon } from '../components/common/Icons'

export const Contact: React.FC = () => {
  return (
    <PageWrapper className="space-y-12">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-mint/10 border border-accent-mint/30 text-xs font-mono text-accent-mint mb-4">
          <Mail className="w-3.5 h-3.5" />
          <span>INQUIRIES & ENGAGEMENT</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
          Get in touch.
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-prose leading-relaxed">
          Whether you have an enterprise backend requirement, a front-end interface to build, 
          or an engineering position to fill, let’s talk.
        </p>
      </div>

      {/* Main Form & Info */}
      <ContactForm />

      {/* Network Profiles */}
      <section className="pt-8 border-t border-white/[0.08]">
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 font-mono">
          Online Presence & Communication
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <a
            href="https://github.com/KarlCabasagan"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-surface/70 border border-white/[0.08] hover:border-accent-mint/40 flex items-center justify-between glass-surface-hover group tap-scale hit-target"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-surface-muted flex items-center justify-center text-slate-200 group-hover:text-accent-mint transition-colors">
                <GithubIcon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-white block">GitHub</span>
                <span className="text-[11px] font-mono text-slate-400">@KarlCabasagan</span>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-accent-mint transition-colors" />
          </a>

          <a
            href="https://www.linkedin.com/in/john-karl-harley-cabasagan-981489335/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-surface/70 border border-white/[0.08] hover:border-[#0A66C2]/60 flex items-center justify-between glass-surface-hover group tap-scale hit-target"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-surface-muted flex items-center justify-center text-slate-200 group-hover:text-[#0A66C2] transition-colors">
                <LinkedInIcon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-white block">LinkedIn</span>
                <span className="text-[11px] font-mono text-slate-400">in/john-karl-harley</span>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-[#0A66C2] transition-colors" />
          </a>

          <a
            href="mailto:karlcabasagan.202200008@gmail.com"
            className="p-4 rounded-xl bg-surface/70 border border-white/[0.08] hover:border-accent-cyan/40 flex items-center justify-between glass-surface-hover group tap-scale hit-target"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-surface-muted flex items-center justify-center text-slate-200 group-hover:text-accent-cyan transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-white block">Direct Email</span>
                <span className="text-[11px] font-mono text-slate-400 truncate max-w-[130px] block" title="karlcabasagan.202200008@gmail.com">karlcabasagan…</span>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-accent-cyan transition-colors" />
          </a>

          <div className="p-4 rounded-xl bg-surface/70 border border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-surface-muted flex items-center justify-center text-accent-mint">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-white block">Location</span>
                <span className="text-[11px] font-mono text-slate-400">Iligan City, PH</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
