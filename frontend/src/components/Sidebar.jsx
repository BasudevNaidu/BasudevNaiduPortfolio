import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { NAV_ITEMS } from '../data'

export default function Sidebar() {
  const [active, setActive] = useState('home')

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

  return (
    <motion.nav
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.4, type: 'spring', stiffness: 80 }}
      className="fixed left-2 top-[10vh] z-40 h-[80vh] sm:left-4"
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
  )
}