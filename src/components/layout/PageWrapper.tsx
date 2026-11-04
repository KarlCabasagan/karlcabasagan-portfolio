import React from 'react'
import { motion } from 'framer-motion'

interface PageWrapperProps {
  children: React.ReactNode
  className?: string
}

export const PageWrapper: React.FC<PageWrapperProps> = ({ children, className = '' }) => {
  return (
    <motion.main
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
      className={`min-h-[calc(100vh-5rem)] pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto will-change-[opacity,transform] ${className}`}
    >
      {children}
    </motion.main>
  )
}
