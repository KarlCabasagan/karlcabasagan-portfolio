import React, { useState, useCallback, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle,
  Copy,
  Check,
  GitBranch,
  FileCode,
  Sparkles,
  ExternalLink,
  Layers,
  Terminal,
  Share2,
} from 'lucide-react'
import { PageWrapper } from '../components/layout/PageWrapper'
import { GithubIcon } from '../components/common/Icons'
import { useRef } from 'react'
import { PROJECTS_DATA, type Project } from '../data/projectsData'
import { getProjectById, createSafeCloneCommand, sanitizeExternalUrl } from '../lib/security'

export const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  const [copiedClone, setCopiedClone] = useState<boolean>(false)
  const [copiedCode, setCopiedCode] = useState<boolean>(false)
  const [copiedLink, setCopiedLink] = useState<boolean>(false)

  const cloneTimerRef = useRef<number | null>(null)
  const codeTimerRef = useRef<number | null>(null)
  const shareTimerRef = useRef<number | null>(null)

  // Find project by id safely
  const project: Project | undefined = getProjectById(id)
  const projectIndex = project ? PROJECTS_DATA.findIndex((p) => p.id === project.id) : -1

  const prevProject = projectIndex > 0 ? PROJECTS_DATA[projectIndex - 1] : null
  const nextProject =
    projectIndex !== -1 && projectIndex < PROJECTS_DATA.length - 1
      ? PROJECTS_DATA[projectIndex + 1]
      : null

  // Scroll to top on route change and clear active timers on unmount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    return () => {
      if (cloneTimerRef.current) window.clearTimeout(cloneTimerRef.current)
      if (codeTimerRef.current) window.clearTimeout(codeTimerRef.current)
      if (shareTimerRef.current) window.clearTimeout(shareTimerRef.current)
    }
  }, [id])

  const handleCopyClone = useCallback(async () => {
    const cloneCmd = createSafeCloneCommand(project?.githubUrl)
    if (!cloneCmd) return
    try {
      await navigator.clipboard.writeText(cloneCmd)
      setCopiedClone(true)
      if (cloneTimerRef.current) window.clearTimeout(cloneTimerRef.current)
      cloneTimerRef.current = window.setTimeout(() => setCopiedClone(false), 2000)
    } catch {
      // Fallback
    }
  }, [project])

  const handleCopyCode = useCallback(async () => {
    if (!project?.codeSnippet?.code) return
    try {
      await navigator.clipboard.writeText(project.codeSnippet.code)
      setCopiedCode(true)
      if (codeTimerRef.current) window.clearTimeout(codeTimerRef.current)
      codeTimerRef.current = window.setTimeout(() => setCopiedCode(false), 2000)
    } catch {
      // Fallback
    }
  }, [project])

  const handleShare = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopiedLink(true)
      if (shareTimerRef.current) window.clearTimeout(shareTimerRef.current)
      shareTimerRef.current = window.setTimeout(() => setCopiedLink(false), 2000)
    } catch {
      // Fallback
    }
  }, [])

  if (!project) {
    return (
      <PageWrapper className="py-20">
        <div className="max-w-xl mx-auto text-center space-y-6 p-8 rounded-2xl bg-surface/80 border border-white/[0.08] backdrop-blur-sm">
          <div className="w-12 h-12 mx-auto rounded-full bg-accent-cyan/10 border border-accent-cyan/30 flex items-center justify-center text-accent-cyan font-mono text-sm">
            404
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-white tracking-tight">Project Not Found</h1>
            <p className="text-sm text-slate-400 max-w-prose mx-auto">
              The project identifier &ldquo;{id}&rdquo; does not match any entry in the catalog.
            </p>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent-mint/15 border border-accent-mint/40 text-accent-mint text-xs font-semibold hover:bg-accent-mint/25 transition-colors duration-150 tap-scale hit-target"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Portfolio Directory</span>
          </Link>
        </div>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper className="space-y-12 pb-16">
      {/* Breadcrumb & Navigation Bar */}
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors hit-target tap-scale py-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Projects</span>
          </Link>
          <span className="text-slate-600">/</span>
          <span className="text-accent-cyan uppercase tracking-wider">{project.category}</span>
          <span className="text-slate-600">/</span>
          <span className="text-slate-200 truncate max-w-[200px] sm:max-w-xs">{project.title}</span>
        </div>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-muted/60 border border-white/[0.08] hover:border-white/20 text-xs text-slate-300 transition-colors tap-scale hit-target min-h-[36px]"
          title="Copy permalink"
        >
          {copiedLink ? (
            <>
              <Check className="w-3.5 h-3.5 text-accent-mint" />
              <span className="font-mono text-[11px] text-accent-mint">Copied URL</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-mono text-[11px]">Share</span>
            </>
          )}
        </button>
      </nav>

      {/* Hero Section */}
      <header className="space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/30">
            {project.category} Architecture
          </span>
          {project.featured && (
            <span className="inline-flex items-center gap-1 text-xs font-mono text-accent-mint bg-accent-mint/10 border border-accent-mint/30 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              Featured Deployment
            </span>
          )}
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            {project.title}
          </h1>
          <p className="text-xs sm:text-sm font-mono text-slate-400 tracking-wide">
            {project.subtitle}
          </p>
        </div>

        <p className="text-sm sm:text-base text-slate-300 max-w-prose leading-relaxed">
          {project.description}
        </p>

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {sanitizeExternalUrl(project.githubUrl) && (
            <a
              href={sanitizeExternalUrl(project.githubUrl)!}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.12] text-white text-xs font-medium transition-colors duration-150 tap-scale hit-target min-h-[42px]"
            >
              <GithubIcon className="w-4 h-4" />
              <span className="font-mono">GitHub Repository</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
            </a>
          )}

          {sanitizeExternalUrl(project.demoUrl) && project.demoUrl !== '#' && (
            <a
              href={sanitizeExternalUrl(project.demoUrl)!}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent-mint/15 hover:bg-accent-mint/25 border border-accent-mint/40 text-accent-mint text-xs font-medium transition-colors duration-150 tap-scale hit-target min-h-[42px]"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Demonstration</span>
            </a>
          )}

          <button
            onClick={handleCopyClone}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-surface-muted/80 hover:bg-surface-muted border border-white/[0.08] hover:border-white/20 text-xs text-slate-300 transition-colors duration-150 tap-scale hit-target min-h-[42px]"
            title="Copy git clone command"
          >
            <Terminal className="w-3.5 h-3.5 text-accent-mint" />
            <span className="font-mono text-[11px] text-slate-300">
              {copiedClone ? 'git clone copied!' : 'git clone'}
            </span>
            {copiedClone ? (
              <Check className="w-3 h-3 text-accent-mint" />
            ) : (
              <Copy className="w-3 h-3 text-slate-500" />
            )}
          </button>
        </div>

        {/* Performance & Architectural Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-surface/80 border border-white/[0.08] backdrop-blur-sm">
            {project.metrics.map((metric, idx) => (
              <div key={idx} className="space-y-1">
                <span className="block text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                  {metric.label}
                </span>
                <span className="text-sm sm:text-base font-bold text-white tabular-nums tracking-tight">
                  {metric.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono px-2.5 py-1 rounded-md bg-white/[0.04] text-slate-300 border border-white/[0.08]"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* Main Content Grid: Architecture & Technical Breakdown */}
      <main className="space-y-12">
        {/* System Architecture Pipeline */}
        {project.architecture && (
          <section className="space-y-6 p-6 sm:p-8 rounded-2xl bg-surface/80 border border-white/[0.08] backdrop-blur-sm">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-accent-mint">
                <GitBranch className="w-4 h-4" />
                <span className="uppercase tracking-wider">System Pipeline & Dataflow</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Architectural Breakdown
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-prose leading-relaxed">
                {project.architecture.summary}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {project.architecture.steps.map((st) => (
                <div
                  key={st.step}
                  className="flex flex-col justify-between p-5 rounded-xl bg-surface-muted/60 border border-white/[0.06] hover:border-white/15 transition-colors space-y-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-mono font-bold text-accent-mint tabular-nums px-2 py-0.5 rounded bg-accent-mint/10 border border-accent-mint/20">
                      STEP {st.step}
                    </span>
                    <span className="text-[11px] font-mono text-accent-cyan truncate">
                      {st.tech}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-sm font-semibold text-white tracking-tight">
                      {st.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {st.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Code Highlights Walkthrough */}
        {project.codeSnippet && (
          <section className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-accent-cyan">
                  <FileCode className="w-4 h-4" />
                  <span className="uppercase tracking-wider">Implementation Snapshot</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Core Logic & Algorithms
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-slate-400 bg-white/[0.04] px-2.5 py-1 rounded-md border border-white/[0.08]">
                  {project.codeSnippet.language.toUpperCase()}
                </span>
                <button
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-muted hover:bg-surface border border-white/[0.1] text-xs font-mono text-slate-300 hover:text-white transition-colors duration-150 tap-scale hit-target min-h-[36px]"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-accent-mint" />
                      <span className="text-accent-mint">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {project.codeSnippet.description && (
              <p className="text-xs sm:text-sm text-slate-400 max-w-prose leading-relaxed">
                {project.codeSnippet.description}
              </p>
            )}

            {/* Code Block Container */}
            <div className="rounded-2xl bg-surface-muted/95 border border-white/[0.08] overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between px-4 py-2.5 bg-black/40 border-b border-white/[0.06] text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <span className="text-slate-300 text-[11px] pl-2">{project.codeSnippet.filename}</span>
                </div>
              </div>

              <div className="p-4 sm:p-6 overflow-x-auto text-xs font-mono leading-relaxed text-slate-200">
                <pre>
                  <code>{project.codeSnippet.code}</code>
                </pre>
              </div>
            </div>
          </section>
        )}

        {/* Highlights & Engineering Impact */}
        <section className="space-y-4 p-6 sm:p-8 rounded-2xl bg-surface/80 border border-white/[0.08] backdrop-blur-sm">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-accent-mint">
              <Layers className="w-4 h-4" />
              <span className="uppercase tracking-wider">Engineering Impact</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Key Deliverables & Verification
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-3 pt-2">
            {project.highlights.map((highlight, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-4 rounded-xl bg-surface-muted/40 border border-white/[0.04]"
              >
                <CheckCircle className="w-4 h-4 text-accent-mint shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {highlight}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Screenshots / Wireframe Showcase */}
        {project.screenshots && project.screenshots.length > 0 && (
          <section className="space-y-4">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Interface & System Telemetry
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-prose">
                Contextual previews and interactive dashboard layouts for {project.title}.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {project.screenshots.map((screen, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-surface/80 border border-white/[0.08] overflow-hidden flex flex-col justify-between"
                >
                  <div className="p-6 bg-surface-muted/50 border-b border-white/[0.06] flex items-center justify-center min-h-[160px] text-center">
                    <div className="space-y-2">
                      <span className="inline-block text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-white/[0.04] text-accent-cyan border border-white/[0.08]">
                        Preview Module {idx + 1}
                      </span>
                      <p className="text-xs font-mono text-slate-300 max-w-xs mx-auto">
                        {screen.placeholderText || screen.title}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 space-y-1.5">
                    <h3 className="text-sm font-semibold text-white tracking-tight">
                      {screen.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {screen.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer Adjacent Projects Navigation */}
      <footer className="pt-10 border-t border-white/[0.08]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevProject ? (
            <Link
              to={`/projects/${prevProject.id}`}
              className="p-5 rounded-2xl bg-surface/60 hover:bg-surface/90 border border-white/[0.08] hover:border-accent-mint/40 transition-colors duration-150 flex flex-col justify-between group tap-scale hit-target"
            >
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-2">
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                <span className="uppercase tracking-wider">Previous Project</span>
              </div>
              <h4 className="text-sm font-bold text-white group-hover:text-accent-mint transition-colors truncate">
                {prevProject.title}
              </h4>
            </Link>
          ) : (
            <div className="p-5 rounded-2xl bg-surface/[0.2] border border-white/[0.04] text-xs font-mono text-slate-600 flex items-center">
              Beginning of project directory
            </div>
          )}

          {nextProject ? (
            <Link
              to={`/projects/${nextProject.id}`}
              className="p-5 rounded-2xl bg-surface/60 hover:bg-surface/90 border border-white/[0.08] hover:border-accent-mint/40 transition-colors duration-150 flex flex-col justify-between text-right group tap-scale hit-target"
            >
              <div className="flex items-center justify-end gap-2 text-xs font-mono text-slate-400 mb-2">
                <span className="uppercase tracking-wider">Next Project</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
              <h4 className="text-sm font-bold text-white group-hover:text-accent-mint transition-colors truncate">
                {nextProject.title}
              </h4>
            </Link>
          ) : (
            <div className="p-5 rounded-2xl bg-surface/[0.2] border border-white/[0.04] text-xs font-mono text-slate-600 flex items-center justify-end">
              End of project directory
            </div>
          )}
        </div>
      </footer>
    </PageWrapper>
  )
}
export default ProjectDetail
