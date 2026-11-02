import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Download, Eye, ExternalLink } from 'lucide-react'

export const CVSection: React.FC = () => {
  const [showPreview, setShowPreview] = useState(false)

  return (
    <div className="rounded-2xl bg-surface/90 border border-white/10 p-6 sm:p-8 glass-surface">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-1.5 text-accent-mint text-xs font-mono mb-2">
            <FileText className="w-3.5 h-3.5" />
            <span>VERIFIED CREDENTIALS</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
            Curriculum Vitae & Technical Summary
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-prose leading-relaxed">
            Download or view my formal resume containing complete academic background (BSIT), 
            industry technologies, and project leadership roles.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <a
            href="/Karl_Cabasagan_CV.pdf"
            download="Karl_Cabasagan_CV.pdf"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-accent-mint text-slate-950 font-semibold text-xs hover:bg-emerald-300 transition-colors tap-scale hit-target min-h-[44px] shadow-lg shadow-accent-mint/10"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </a>

          <button
            onClick={() => setShowPreview(!showPreview)}
            className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-surface-muted hover:bg-surface text-slate-200 border border-white/10 text-xs font-medium transition-colors tap-scale hit-target min-h-[44px]"
          >
            <Eye className="w-4 h-4 text-accent-cyan" />
            <span>{showPreview ? 'Hide Inline Preview' : 'Toggle Inline Preview'}</span>
          </button>
        </div>
      </div>

      {/* Quick Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
        <div className="p-4 rounded-xl bg-surface-muted/60 border border-white/[0.04]">
          <span className="text-[11px] font-mono uppercase text-slate-500 block mb-1">Degree & Honors</span>
          <p className="text-sm font-semibold text-white">BS in Information Technology (BSIT)</p>
          <p className="text-xs text-accent-mint mt-1">Graduated Cum Laude • CGPA 1.32</p>
        </div>

        <div className="p-4 rounded-xl bg-surface-muted/60 border border-white/[0.04]">
          <span className="text-[11px] font-mono uppercase text-slate-500 block mb-1">Core Expertise</span>
          <p className="text-sm font-semibold text-white">Full-Stack & REST API Design</p>
          <p className="text-xs text-slate-400 mt-1">Laravel, React, PHP, MySQL, RBAC, Python</p>
        </div>

        <div className="p-4 rounded-xl bg-surface-muted/60 border border-white/[0.04]">
          <span className="text-[11px] font-mono uppercase text-slate-500 block mb-1">Current Roles</span>
          <p className="text-sm font-semibold text-accent-mint flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-accent-mint animate-pulse" />
            Academic Instructor & Lead Dev
          </p>
          <p className="text-xs text-slate-400 mt-1">St. Peter's College • Open to Engagements</p>
        </div>
      </div>

      {/* Embedded PDF Preview Toggle */}
      {showPreview && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-6 pt-6 border-t border-white/[0.08]"
        >
          <div className="flex items-center justify-between mb-3 text-xs text-slate-400">
            <span className="font-mono">Embedded Document Preview: Karl_Cabasagan_CV.pdf</span>
            <a
              href="/Karl_Cabasagan_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-accent-mint hover:underline font-mono text-[11px]"
            >
              <span>Open in new window</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <div className="w-full h-[500px] rounded-xl overflow-hidden border border-white/10 bg-slate-900">
            <iframe
              src="/Karl_Cabasagan_CV.pdf#toolbar=0"
              title="Karl Cabasagan CV Preview"
              className="w-full h-full"
            />
          </div>
        </motion.div>
      )}
    </div>
  )
}
