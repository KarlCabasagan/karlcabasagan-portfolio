import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { AmbientBackground } from './components/layout/AmbientBackground'
import { ScrollToTop } from './components/common/ScrollToTop'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Projects } from './pages/Projects'
import { ProjectDetail } from './pages/ProjectDetail'
import { Experience } from './pages/Experience'
import { Contact } from './pages/Contact'

export const App: React.FC = () => {
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col relative text-slate-100 selection:bg-accent-mint/20 selection:text-accent-mint font-sans">
      <ScrollToTop />
      <AmbientBackground />
      <Navbar />

      <div className="flex-1">
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
      </div>

      <Footer />
    </div>
  )
}

export default App
