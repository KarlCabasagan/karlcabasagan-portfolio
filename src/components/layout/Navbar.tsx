import React, { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Code2,
  FolderGit2,
  User,
  Briefcase,
  Mail,
  Menu,
  X,
  Sparkles,
} from 'lucide-react'
import { GithubIcon, LinkedInIcon } from '../common/Icons'

const NAV_ITEMS = [
  { path: '/', label: 'Home', icon: Code2 },
  { path: '/about', label: 'About & Skills', icon: User },
  { path: '/projects', label: 'Projects', icon: FolderGit2 },
  { path: '/experience', label: 'Experience & CV', icon: Briefcase },
  { path: '/contact', label: 'Contact', icon: Mail },
]

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-[#090a0f]/90 backdrop-blur-md border-b border-white/[0.08] shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Brand Logo */}
          <NavLink
            to="/"
            className="group flex items-center gap-3 text-slate-100 focus:outline-none hit-target"
            aria-label="Karl Cabasagan Portfolio Home"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl overflow-hidden border border-white/10 group-hover:border-accent-mint/50 transition-colors bg-surface">
              <img
                src="/1x1-id.jpg"
                alt="John Karl Harley A. Cabasagan"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-200"
              />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5 z-10 pointer-events-none">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-mint opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-mint"></span>
              </span>
            </div>
            <div className="hidden sm:block">
              <span className="font-semibold text-sm tracking-tight text-slate-200 group-hover:text-white transition-colors">
                Karl Cabasagan
              </span>
              <span className="block text-[11px] font-mono text-slate-400">
                BSIT • Full-Stack Engineer
              </span>
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-surface/80 p-1.5 rounded-full border border-white/[0.08] backdrop-blur-sm">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.path
              const Icon = item.icon
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive: active }) =>
                    `relative px-4 py-2 text-xs font-medium rounded-full transition-colors flex items-center gap-2 tap-scale min-h-[40px] ${
                      active
                        ? 'text-white font-semibold'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                    }`
                  }
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-mint/20 to-accent-cyan/15 border border-accent-mint/40 -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-accent-mint' : ''}`} />
                  <span>{item.label}</span>
                </NavLink>
              )
            })}
          </nav>

          {/* Right Action: GitHub & LinkedIn Quick Links & Mobile Trigger */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="https://github.com/KarlCabasagan"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Karl Cabasagan on GitHub"
              className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-200 bg-surface/90 hover:bg-surface-muted border border-white/10 hover:border-accent-mint/40 rounded-xl transition-all tap-scale hit-target"
            >
              <GithubIcon className="w-4 h-4 text-accent-mint" />
              <span className="hidden sm:inline font-mono">GitHub</span>
            </a>

            <a
              href="https://www.linkedin.com/in/john-karl-harley-cabasagan-981489335/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="John Karl Harley Cabasagan on LinkedIn"
              className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-200 bg-surface/90 hover:bg-surface-muted border border-white/10 hover:border-[#0A66C2]/60 rounded-xl transition-all tap-scale hit-target"
            >
              <LinkedInIcon className="w-4 h-4 text-[#0A66C2]" />
              <span className="hidden sm:inline font-mono">LinkedIn</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden flex items-center justify-center w-11 h-11 rounded-xl bg-surface border border-white/10 text-slate-300 hover:text-white focus:outline-none hit-target tap-scale"
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-5 h-5 text-accent-mint" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-surface/95 backdrop-blur-xl border-b border-white/10 px-4 pt-3 pb-6 shadow-2xl"
          >
            <div className="flex flex-col gap-1.5">
              {NAV_ITEMS.map((item) => {
                const isActive = location.pathname === item.path
                const Icon = item.icon
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all min-h-[44px] ${
                      isActive
                        ? 'bg-accent-mint/15 text-accent-mint border border-accent-mint/30 font-semibold'
                        : 'text-slate-300 hover:bg-white/[0.04] hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                    {isActive && <Sparkles className="w-3.5 h-3.5 ml-auto text-accent-mint" />}
                  </NavLink>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
