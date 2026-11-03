import React, { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Layers,
  Cpu,
  ArrowUpRight,
  Copy,
  Check,
  Code2,
  ExternalLink,
  Sparkles,
  GitBranch,
  FileCode,
  Image as ImageIcon,
  Terminal,
} from 'lucide-react'
import { GithubIcon } from '../common/Icons'
import type { Project } from '../../data/projectsData'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

type ModalTab = 'overview' | 'architecture' | 'code' | 'screenshots'

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<ModalTab>('overview')
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false)
  const [copiedCode, setCopiedCode] = useState<boolean>(false)

  // Reset tab when project changes
  useEffect(() => {
    if (project) {
      setActiveTab('overview')
      setCopiedUrl(false)
      setCopiedCode(false)
    }
  }, [project])

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (!project) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [project, onClose])

  // Extract repo slug from GitHub URL
  const repoSlug = project?.githubUrl
    ? project.githubUrl.replace(/^https?:\/\/github\.com\//i, '')
    : ''

  const handleCopyClone = useCallback(async () => {
    if (!project) return
    const cloneUrl = `${project.githubUrl}.git`
    try {
      await navigator.clipboard.writeText(cloneUrl)
      setCopiedUrl(true)
      setTimeout(() => setCopiedUrl(false), 2000)
    } catch {
      // Fallback
    }
  }, [project])

  const handleCopyCode = useCallback(async () => {
    if (!project?.codeSnippet?.code) return
    try {
      await navigator.clipboard.writeText(project.codeSnippet.code)
      setCopiedCode(true)
      setTimeout(() => setCopiedCode(false), 2000)
    } catch {
      // Fallback
    }
  }, [project])

  const tabs: { id: ModalTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'overview', label: 'Overview', icon: Layers },
    { id: 'architecture', label: 'Architecture & Flow', icon: GitBranch },
    { id: 'code', label: 'Code Highlights', icon: FileCode },
    { id: 'screenshots', label: 'Screenshots', icon: ImageIcon },
  ]

  return (
    <AnimatePresence>
      {project && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            onClick={onClose}
            className="fixed inset-0 bg-background/85 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-3xl bg-surface/95 border border-white/[0.12] rounded-2xl shadow-2xl overflow-hidden z-10 glass-surface my-auto max-h-[90vh] flex flex-col"
          >
            {/* Ambient subtle top glow */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-mint via-accent-cyan to-accent-violet pointer-events-none" />

            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-white/[0.08] bg-surface-muted/70 relative">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-accent-mint/10 text-accent-mint border border-accent-mint/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-mint animate-pulse" />
                      {project.category}
                    </span>

                    {project.featured && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/[0.04] text-slate-300 border border-white/[0.08]">
                        <Sparkles className="w-3 h-3 text-accent-cyan" />
                        Featured
                      </span>
                    )}

                    <span className="text-[11px] font-mono text-slate-400">
                      {project.subtitle}
                    </span>
                  </div>

                  <h2
                    id="project-modal-title"
                    className="text-xl sm:text-2xl font-bold tracking-tight text-white pr-4"
                  >
                    {project.title}
                  </h2>
                </div>

                <button
                  onClick={onClose}
                  className="shrink-0 w-9 h-9 rounded-xl bg-white/[0.04] hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center tap-scale hit-target focus:outline-none focus:ring-1 focus:ring-accent-mint/50 transition-colors"
                  aria-label="Close dialog"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Tabs Bar */}
              <div className="flex items-center gap-1.5 mt-5 pt-3 border-t border-white/[0.06] overflow-x-auto scrollbar-none">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  const isActive = activeTab === tab.id
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-2 transition-colors tap-scale hit-target whitespace-nowrap ${
                        isActive
                          ? 'text-white font-semibold'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="modal-active-tab"
                          className="absolute inset-0 rounded-lg bg-white/10 border border-white/20"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                      <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-accent-mint' : 'text-slate-500'}`} />
                      <span className="relative z-10">{tab.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Scrollable Tab Body */}
            <div className="p-5 sm:p-6 space-y-6 overflow-y-auto overscroll-contain flex-1">
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <motion.div
                  key="tab-overview"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-6"
                >
                  {/* Architecture Overview */}
                  <div>
                    <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5 font-mono">
                      <Layers className="w-3.5 h-3.5 text-accent-cyan" />
                      <span>Architecture Overview</span>
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed max-w-prose">
                      {project.description}
                    </p>
                  </div>

                  {/* Engineering Highlights */}
                  <div>
                    <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-1.5 font-mono">
                      <Cpu className="w-3.5 h-3.5 text-accent-mint" />
                      <span>Engineering Decisions & Architecture Highlights</span>
                    </h3>
                    <div className="space-y-2.5">
                      {project.highlights.map((item, idx) => (
                        <div
                          key={idx}
                          className="group flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.06] transition-colors"
                        >
                          <span className="shrink-0 font-mono text-[11px] text-accent-mint/80 bg-accent-mint/10 border border-accent-mint/20 w-5 h-5 rounded-md flex items-center justify-center tabular-nums">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          <p className="text-xs text-slate-300 leading-relaxed font-sans">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dynamic Telemetry & Benchmarks */}
                  {project.metrics && project.metrics.length > 0 && (
                    <div>
                      <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5 font-mono flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
                        <span>Telemetry & Benchmarks</span>
                      </h3>
                      <div
                        className={`grid gap-3 ${
                          project.metrics.length === 2
                            ? 'grid-cols-2'
                            : 'grid-cols-2 sm:grid-cols-3'
                        }`}
                      >
                        {project.metrics.map((m, idx) => (
                          <div
                            key={idx}
                            className="p-3.5 rounded-xl bg-surface-muted/80 border border-white/[0.06] flex flex-col justify-between"
                          >
                            <span className="block text-[10px] text-slate-400 uppercase tracking-wider font-mono mb-1">
                              {m.label}
                            </span>
                            <span className="text-sm font-bold text-white tabular-nums tracking-tight">
                              {m.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Technologies & Protocols */}
                  <div>
                    <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5 font-mono flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5 text-accent-violet" />
                      <span>Technologies & Protocols</span>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-lg bg-surface-muted/90 text-slate-200 border border-white/[0.08]"
                        >
                          <span className="w-1 h-1 rounded-full bg-accent-mint/70" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 2: ARCHITECTURE & FLOW */}
              {activeTab === 'architecture' && (
                <motion.div
                  key="tab-architecture"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-6"
                >
                  {/* Summary banner */}
                  {project.architecture?.summary && (
                    <div className="p-4 rounded-xl bg-accent-cyan/10 border border-accent-cyan/30 flex items-start gap-3">
                      <Terminal className="w-4 h-4 text-accent-cyan shrink-0 mt-0.5" />
                      <div>
                        <span className="block text-[11px] font-mono uppercase tracking-wider text-accent-cyan font-semibold mb-0.5">
                          Architectural Design Paradigm
                        </span>
                        <p className="text-xs text-slate-200 leading-relaxed">
                          {project.architecture.summary}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Flow pipeline steps */}
                  <div>
                    <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3.5 font-mono flex items-center gap-1.5">
                      <GitBranch className="w-3.5 h-3.5 text-accent-mint" />
                      <span>End-to-End System Pipeline</span>
                    </h3>

                    <div className="relative space-y-3 before:absolute before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-white/[0.08]">
                      {project.architecture?.steps.map((step, idx) => (
                        <div
                          key={idx}
                          className="relative flex items-start gap-4 p-4 rounded-xl bg-surface-muted/70 border border-white/[0.06] hover:border-white/[0.12] transition-colors"
                        >
                          <span className="relative z-10 shrink-0 font-mono text-[11px] font-bold text-accent-mint bg-surface border border-accent-mint/40 w-8 h-8 rounded-lg flex items-center justify-center tabular-nums shadow-sm">
                            {step.step}
                          </span>
                          <div className="flex-1 space-y-1">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <h4 className="text-xs font-bold text-white font-mono">
                                {step.title}
                              </h4>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.04] text-slate-400 border border-white/[0.06]">
                                {step.tech}
                              </span>
                            </div>
                            <p className="text-xs text-slate-300 leading-relaxed">
                              {step.detail}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 3: CODE HIGHLIGHTS */}
              {activeTab === 'code' && (
                <motion.div
                  key="tab-code"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-4"
                >
                  {project.codeSnippet ? (
                    <div className="rounded-xl border border-white/[0.12] bg-[#0c0e14] overflow-hidden shadow-2xl">
                      {/* Dark IDE Window Title Bar */}
                      <div className="flex items-center justify-between px-4 py-2.5 bg-[#141721] border-b border-white/[0.08]">
                        <div className="flex items-center gap-3">
                          {/* macOS window controls */}
                          <div className="flex items-center gap-1.5" aria-hidden="true">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                          </div>

                          <div className="flex items-center gap-1.5 pl-2 text-xs font-mono text-slate-300">
                            <FileCode className="w-3.5 h-3.5 text-accent-mint" />
                            <span>{project.codeSnippet.filename}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 px-2 py-0.5 rounded bg-white/[0.04]">
                            {project.codeSnippet.language}
                          </span>

                          <button
                            onClick={handleCopyCode}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.04] hover:bg-white/10 text-slate-400 hover:text-white text-xs font-mono border border-white/[0.06] transition-colors tap-scale hit-target"
                            title="Copy code snippet"
                          >
                            {copiedCode ? (
                              <>
                                <Check className="w-3 h-3 text-accent-mint" />
                                <span className="text-accent-mint">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Code Snippet with Line Numbers */}
                      <div className="p-4 overflow-x-auto text-xs font-mono leading-relaxed max-h-[380px] scrollbar-thin">
                        <pre className="text-slate-200">
                          <code>
                            {project.codeSnippet.code
                              .trim()
                              .split('\n')
                              .map((line, idx) => (
                                <div key={idx} className="table-row">
                                  <span className="table-cell pr-4 text-right text-slate-600 select-none tabular-nums text-[11px] w-8">
                                    {idx + 1}
                                  </span>
                                  <span className="table-cell whitespace-pre">
                                    {line}
                                  </span>
                                </div>
                              ))}
                          </code>
                        </pre>
                      </div>

                      {/* Snippet Context Bar */}
                      {project.codeSnippet.description && (
                        <div className="p-3 bg-[#11141c] border-t border-white/[0.06] text-xs text-slate-400 font-mono flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-mint" />
                          <span>{project.codeSnippet.description}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-8 text-center rounded-xl bg-surface-muted/60 border border-white/[0.06]">
                      <p className="text-xs text-slate-400 font-mono">
                        Source code available on GitHub repository.
                      </p>
                    </div>
                  )}
                </motion.div>
              )}

              {/* TAB 4: SCREENSHOTS & UI */}
              {activeTab === 'screenshots' && (
                <motion.div
                  key="tab-screenshots"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-4"
                >
                  {project.screenshots && project.screenshots.length > 0 ? (
                    <div className="space-y-6">
                      {project.screenshots.map((shot, idx) => (
                        <div
                          key={idx}
                          className="rounded-xl border border-white/[0.08] bg-surface-muted/60 overflow-hidden"
                        >
                          {/* Placeholder Wireframe Frame */}
                          <div className="relative aspect-video w-full bg-[#0a0c12] flex flex-col items-center justify-center p-6 border-b border-white/[0.06] group overflow-hidden">
                            {/* Decorative technical grid background */}
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

                            {/* Center status placeholder box */}
                            <div className="relative z-10 flex flex-col items-center text-center p-6 rounded-2xl bg-surface/90 border border-white/10 max-w-sm backdrop-blur-sm">
                              <div className="w-12 h-12 rounded-xl bg-accent-mint/10 border border-accent-mint/30 flex items-center justify-center text-accent-mint mb-3">
                                <ImageIcon className="w-6 h-6" />
                              </div>
                              <h4 className="text-sm font-bold text-white font-mono mb-1">
                                {shot.placeholderText || shot.title}
                              </h4>
                              <p className="text-xs text-slate-400 leading-relaxed font-sans mb-3">
                                High-resolution application preview slot.
                              </p>
                              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-accent-cyan bg-accent-cyan/10 border border-accent-cyan/20 px-2.5 py-1 rounded-full">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
                                Ready for Image Ingestion
                              </span>
                            </div>

                            {/* Corner tags */}
                            <div className="absolute bottom-3 left-3 text-[10px] font-mono text-slate-500 bg-black/40 px-2 py-0.5 rounded border border-white/[0.04]">
                              RESOLUTION: 1920 × 1080 (16:9)
                            </div>
                            <div className="absolute bottom-3 right-3 text-[10px] font-mono text-slate-500 bg-black/40 px-2 py-0.5 rounded border border-white/[0.04]">
                              VIEWPORT: DESKTOP
                            </div>
                          </div>

                          {/* Screenshot description */}
                          <div className="p-4">
                            <h5 className="text-xs font-bold text-white font-mono mb-1">
                              {shot.title}
                            </h5>
                            <p className="text-xs text-slate-300 leading-relaxed">
                              {shot.caption}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center rounded-xl bg-surface-muted/60 border border-white/[0.06]">
                      <p className="text-xs text-slate-400 font-mono">
                        No screenshots configured for this project.
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="p-4 sm:p-5 bg-surface-muted/90 border-t border-white/[0.08] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-400 font-mono truncate max-w-[220px] sm:max-w-[280px]">
                  {repoSlug || `KarlCabasagan/${project.id}`}
                </span>
                {project.githubUrl && (
                  <button
                    onClick={handleCopyClone}
                    title="Copy Git repository URL"
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/[0.04] hover:bg-white/10 text-slate-400 hover:text-white text-[10px] font-mono border border-white/[0.06] transition-colors tap-scale hit-target"
                  >
                    {copiedUrl ? (
                      <>
                        <Check className="w-3 h-3 text-accent-mint" />
                        <span className="text-accent-mint">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy URL</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              <div className="flex items-center justify-end gap-2.5">
                {project.demoUrl && project.demoUrl !== '#' && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-surface hover:bg-surface-subtle text-slate-200 border border-white/10 text-xs font-medium transition-colors tap-scale min-h-[38px]"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-accent-cyan" />
                    <span>Live Demo</span>
                  </a>
                )}

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface hover:bg-surface-subtle text-slate-200 border border-white/10 text-xs font-medium transition-colors tap-scale min-h-[38px]"
                >
                  <GithubIcon className="w-3.5 h-3.5 text-accent-mint" />
                  <span>GitHub Repo</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400" />
                </a>

                <button
                  onClick={onClose}
                  className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-accent-mint text-slate-950 text-xs font-semibold hover:bg-emerald-300 transition-colors tap-scale min-h-[38px]"
                >
                  <span>Close</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
