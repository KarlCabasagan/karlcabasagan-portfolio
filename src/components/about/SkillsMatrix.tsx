import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, CheckCircle2, Sparkles, SlidersHorizontal } from 'lucide-react'
import { SKILLS_DATA, CATEGORIES, type Skill } from '../../data/skillsData'

export const SkillsMatrix: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')

  const filteredSkills = useMemo(() => {
    return SKILLS_DATA.filter((skill) => {
      const matchesCategory =
        selectedCategory === 'all' || skill.category === selectedCategory
      const matchesSearch =
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  const getLevelBadge = (level: Skill['level']) => {
    switch (level) {
      case 'Expert':
        return 'bg-accent-mint/15 text-accent-mint border-accent-mint/40'
      case 'Advanced':
        return 'bg-accent-cyan/15 text-accent-cyan border-accent-cyan/40'
      case 'Proficient':
        return 'bg-violet-500/15 text-violet-300 border-violet-500/40'
      case 'Familiar':
        return 'bg-slate-500/15 text-slate-300 border-slate-500/30'
    }
  }

  return (
    <div className="space-y-6">
      {/* Controls: Category Filter + Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-surface/80 border border-white/[0.08] backdrop-blur-sm">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5" role="tablist">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedCategory(cat.id)}
                className={`relative px-3.5 py-2 text-xs font-medium rounded-xl transition-colors duration-150 tap-scale hit-target min-h-[38px] ${
                  isActive
                    ? 'text-white font-semibold bg-white/10 border border-white/20 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-skill-cat"
                    className="absolute inset-0 rounded-xl bg-accent-mint/15 border border-accent-mint/40 -z-10"
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  />
                )}
                <span>{cat.label}</span>
              </button>
            )
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-auto md:min-w-[240px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skills, tools, frameworks..."
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

      {/* Results Count Header */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span className="flex items-center gap-1.5 font-mono">
          <SlidersHorizontal className="w-3.5 h-3.5 text-accent-mint" />
          Showing <span className="tabular-nums font-semibold text-white">{filteredSkills.length}</span> technologies
        </span>
        <span className="text-[11px] text-slate-500 hidden sm:inline">
          Filter updated dynamically • Click or tap cards for focus
        </span>
      </div>

      {/* Grid of Skill Cards */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill) => (
            <motion.div
              layout
              key={skill.name}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="p-5 rounded-2xl bg-surface/80 border border-white/[0.08] hover:border-white/20 glass-surface-hover flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm text-white group-hover:text-accent-mint transition-colors">
                      {skill.name}
                    </h3>
                    {skill.highlight && (
                      <Sparkles className="w-3 h-3 text-accent-mint" />
                    )}
                  </div>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${getLevelBadge(
                      skill.level
                    )}`}
                  >
                    {skill.level}
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {skill.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/[0.04] flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span className="capitalize">{skill.category}</span>
                <span className="flex items-center gap-1 text-slate-400">
                  <CheckCircle2 className="w-3 h-3 text-accent-mint" />
                  Production Ready
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredSkills.length === 0 && (
        <div className="text-center py-12 rounded-2xl bg-surface/40 border border-dashed border-white/10">
          <p className="text-sm text-slate-400">No technology matched your search.</p>
          <button
            onClick={() => {
              setSearchQuery('')
              setSelectedCategory('all')
            }}
            className="mt-3 px-4 py-1.5 text-xs font-medium text-accent-mint hover:underline"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  )
}
