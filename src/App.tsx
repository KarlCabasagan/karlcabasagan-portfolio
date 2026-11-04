import React, { Suspense, lazy } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { AmbientBackground } from './components/layout/AmbientBackground'
import { ScrollToTop } from './components/common/ScrollToTop'

// Lazy-loaded route chunks to decouple monolithic entry bundle
const Home = lazy(() => import('./pages/Home').then((m) => ({ default: m.Home })))
const About = lazy(() => import('./pages/About').then((m) => ({ default: m.About })))
const Projects = lazy(() => import('./pages/Projects').then((m) => ({ default: m.Projects })))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail').then((m) => ({ default: m.ProjectDetail })))
const Experience = lazy(() => import('./pages/Experience').then((m) => ({ default: m.Experience })))
const Contact = lazy(() => import('./pages/Contact').then((m) => ({ default: m.Contact })))

const RouteFallback: React.FC = () => (
  <div className="min-h-[50vh] flex items-center justify-center" aria-live="polite" aria-busy="true">
    <div className="w-6 h-6 border-2 border-accent-mint border-t-transparent rounded-full animate-spin" />
    <span className="sr-only">Loading page content...</span>
  </div>
)

export const App: React.FC = () => {
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col relative text-slate-100 selection:bg-accent-mint/20 selection:text-accent-mint font-sans overflow-x-hidden w-full max-w-full">
      <ScrollToTop />
      <AmbientBackground />
      <Navbar />

      <div className="flex-1">
        <Suspense fallback={<RouteFallback />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<ProjectDetail />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </div>

      <Footer />
    </div>
  )
}

export default App
