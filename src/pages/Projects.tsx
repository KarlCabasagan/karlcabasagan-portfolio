import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PageWrapper } from '../components/layout/PageWrapper'
import { ProjectCard } from '../components/projects/ProjectCard'
import {
  PROJECTS_DATA,
  PROJECT_CATEGORIES,
} from '../../src/data/projectsData'
import { FolderGit2, Search, SlidersHorizontal } from 'lucide-react'
import { GithubIcon } from '../components/common/Icons'

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState<string>('')

  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter((p) => {
      const matchesCategory =
        selectedCategory === 'All' || p.category === selectedCategory
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  return (
    <PageWrapper className="space-y-12">
      {/* Page Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-cyan/10 border border-accent-cyan/30 text-xs font-mono text-accent-cyan mb-4">
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>PORTFOLIO DIRECTORY</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
          Engineered for scale, speed, and clean code.
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-prose leading-relaxed">
          Explore architectural implementations spanning enterprise PHP/Laravel backends, 
          real-time Supabase workflows, systems telemetry, and responsive frontend experiences.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-surface/80 border border-white/[0.08] backdrop-blur-sm">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5" role="tablist">
          {PROJECT_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-4 py-2 text-xs font-medium rounded-xl transition-all tap-scale hit-target min-h-[38px] ${
                  isActive
                    ? 'text-white font-semibold bg-white/10 border border-white/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-proj-cat"
                    className="absolute inset-0 rounded-xl bg-accent-mint/15 border border-accent-mint/40 -z-10"
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  />
                )}
                <span>{cat}</span>
              </button>
            )
          })}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects or tags..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-surface-muted/90 text-slate-200 placeholder-slate-500 rounded-xl border border-white/[0.08] focus:border-accent-mint focus:outline-none transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs font-mono"
            >
              clear
            </button>
          )}
        </div>
      </div>

      {/* Meta status bar */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span className="flex items-center gap-1.5 font-mono">
          <SlidersHorizontal className="w-3.5 h-3.5 text-accent-mint" />
          Displaying <span className="tabular-nums font-semibold text-white">{filteredProjects.length}</span> projects
        </span>
        <a
          href="https://github.com/KarlCabasagan"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-accent-mint hover:underline font-mono text-[11px]"
        >
          <GithubIcon className="w-3 h-3" />
          github.com/KarlCabasagan
        </a>
      </div>

      {/* Projects Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-16 rounded-2xl bg-surface/40 border border-dashed border-white/10">
          <p className="text-sm text-slate-400 mb-2">No projects matched your criteria.</p>
          <button
            onClick={() => {
              setSearchQuery('')
              setSelectedCategory('All')
            }}
            className="px-4 py-2 text-xs font-medium text-accent-mint hover:underline"
          >
            Clear Filters
          </button>
        </div>
      )}
    </PageWrapper>
  )
}
