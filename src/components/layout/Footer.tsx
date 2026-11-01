import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Mail, ArrowUpRight, Terminal, Heart } from 'lucide-react'
import { GithubIcon } from '../common/Icons'

export const Footer: React.FC = () => {
  const [timeString, setTimeString] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      // Display local time in Asia/Manila (UTC+8)
      const formatted = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Manila',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(now)
      setTimeString(formatted)
    }

    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <footer className="relative mt-24 border-t border-white/[0.08] bg-[#090a0f]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Bio / Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono font-bold text-accent-mint text-base">&lt;KC /&gt;</span>
              <span className="text-white font-semibold text-sm">John Karl Harley A. Cabasagan</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-prose mb-4">
              BSIT Graduate & Full-Stack Developer building scalable web applications, 
              robust backend architectures (Laravel, Supabase, MySQL), and creative animated interfaces.
            </p>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-[11px] font-mono text-slate-300">
                <span className="w-2 h-2 rounded-full bg-accent-mint animate-pulse" />
                Manila, PH <span className="tabular-nums text-slate-400">({timeString || 'UTC+8'})</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-accent-mint/10 border border-accent-mint/30 text-[11px] font-mono text-accent-mint">
                Open to Opportunities
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
              Exploration
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="text-slate-400 hover:text-accent-mint transition-colors inline-block py-1">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-accent-mint transition-colors inline-block py-1">
                  About & Skills Matrix
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-slate-400 hover:text-accent-mint transition-colors inline-block py-1">
                  Featured Projects
                </Link>
              </li>
              <li>
                <Link to="/experience" className="text-slate-400 hover:text-accent-mint transition-colors inline-block py-1">
                  Experience & CV
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-accent-mint transition-colors inline-block py-1">
                  Get In Touch
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Socials & GitHub */}
          <div>
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
              Connect
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://github.com/KarlCabasagan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-slate-400 hover:text-accent-mint transition-colors py-1 group"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub Profile</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-accent-mint transition-colors" />
                </a>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="flex items-center gap-1 text-slate-400 hover:text-accent-mint transition-colors py-1 group"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Direct Message</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-accent-mint transition-colors" />
                </Link>
              </li>
              <li>
                <a
                  href="/Karl_Cabasagan_CV.pdf"
                  download="Karl_Cabasagan_CV.pdf"
                  className="flex items-center gap-1 text-slate-400 hover:text-accent-mint transition-colors py-1 group"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Download Resume (PDF)</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-accent-mint transition-colors" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} John Karl Harley A. Cabasagan. All rights reserved.</span>
          </p>
          <p className="flex items-center gap-1 font-mono text-[11px]">
            <span>Crafted with</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
            <span>React 19 • Tailwind • Framer Motion</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
