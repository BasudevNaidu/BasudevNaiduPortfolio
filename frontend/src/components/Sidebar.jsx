import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_ITEMS } from '../data'

export default function Sidebar() {
  const [active, setActive] = useState('home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    )
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Hamburger Menu Button - Mobile Only */}
      <button
        onClick={toggleMobileMenu}
        className="fixed left-4 top-6 z-50 flex flex-col items-center justify-center gap-1.5 p-2 rounded-xl glass-strong shadow-soft sm:hidden"
        aria-label="Toggle menu"
      >
        <motion.span
          animate={{ 
            rotate: isMobileMenuOpen ? 45 : 0,
            y: isMobileMenuOpen ? 8 : 0
          }}
          className="h-0.5 w-6 bg-brand-700 rounded-full"
        />
        <motion.span
          animate={{ 
            opacity: isMobileMenuOpen ? 0 : 1,
            x: isMobileMenuOpen ? -10 : 0
          }}
          className="h-0.5 w-6 bg-brand-700 rounded-full"
        />
        <motion.span
          animate={{ 
            rotate: isMobileMenuOpen ? -45 : 0,
            y: isMobileMenuOpen ? -8 : 0
          }}
          className="h-0.5 w-6 bg-brand-700 rounded-full"
        />
      </button>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm sm:hidden"
            />
            
            {/* Mobile Sidebar */}
            <motion.nav
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 z-50 h-full w-64 sm:hidden"
            >
              <div className="glass-strong shadow-soft h-full flex flex-col items-center justify-between rounded-r-2xl p-4">
                
                {/* Close Button */}
                <button
                  onClick={closeMobileMenu}
                  className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-brand-700 hover:bg-brand-200"
                  aria-label="Close menu"
                >
                  <motion.svg
                    animate={{ rotate: isMobileMenuOpen ? 0 : 180 }}
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </motion.svg>
                </button>

                {/* Navigation Items */}
                <div className="flex w-full flex-col items-center gap-4 mt-16">
                  {NAV_ITEMS.map(({ id, label, Icon }) => {
                    const isActive = active === id
                    return (
                      <a
                        key={id}
                        href={`#${id}`}
                        onClick={closeMobileMenu}
                        className="group relative flex w-full items-center justify-center"
                      >
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className={`relative flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 ${
                            isActive
                              ? 'bg-gradient-to-br from-brand-500 to-accent-pink text-white shadow-glow'
                              : 'text-brand-700 hover:bg-brand-100'
                          }`}
                        >
                          <Icon className="text-[20px]" />
                          {isActive && (
                            <motion.span
                              layoutId="nav-pulse"
                              className="absolute inset-0 rounded-xl ring-2 ring-brand-400/60"
                            />
                          )}
                        </motion.div>
                        <span className="ml-4 text-sm font-medium text-brand-700 group-hover:text-brand-900">
                          {label}
                        </span>
                      </a>
                    )
                  })}
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar - Hidden on Mobile */}
      <motion.nav
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4, type: 'spring', stiffness: 80 }}
        className="fixed left-2 top-[10vh] z-40 h-[80vh] max-sm:hidden sm:left-4"
      >
        <div className="glass-strong shadow-soft flex h-full flex-col items-center justify-between rounded-2xl p-2 overflow-visible">
          {NAV_ITEMS.map(({ id, label, Icon }) => {
            const isActive = active === id

            return (
              <div key={id} className="relative flex items-center group">
                
                {/* Icon */}
                <a href={`#${id}`} className="block">
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.92 }}
                    className={`relative flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-br from-brand-500 to-accent-pink text-white shadow-glow'
                        : 'text-brand-700 hover:bg-brand-100'
                    }`}
                  >
                    <Icon className="text-[18px]" />

                    {isActive && (
                      <motion.span
                        layoutId="nav-pulse"
                        className="absolute inset-0 rounded-xl ring-2 ring-brand-400/60"
                      />
                    )}
                  </motion.div>
                </a>

                {/* Tooltip (exact like your image) */}
                <div
                  className="
                    absolute left-full top-1/2 ml-2 -translate-y-1/2
                    opacity-0 -translate-x-2
                    group-hover:opacity-100 group-hover:translate-x-0
                    transition-all duration-200 ease-out
                    pointer-events-none
                    z-50
                  "
                >
                  <div className="relative flex items-center">
                    
                    {/* Arrow */}
                    <div
                      className="
                        absolute left-[-6px] top-1/2 -translate-y-1/2
                        w-0 h-0
                        border-t-[6px] border-t-transparent
                        border-b-[6px] border-b-transparent
                        border-r-[6px] border-r-[#1c1c8c]
                      "
                    ></div>

                    {/* Label */}
                    <div
                      className="
                        bg-[#1c1c8c] text-white
                        px-4 py-2
                        rounded-xl
                        text-sm font-semibold
                        whitespace-nowrap
                        shadow-lg
                      "
                    >
                      {label}
                    </div>
                  </div>
                </div>

              </div>
            )
          })}
        </div>
      </motion.nav>
    </>
  )
}