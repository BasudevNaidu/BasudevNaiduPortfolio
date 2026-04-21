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
      <div className="glass-strong shadow-soft flex h-full flex-col items-center justify-between overflow-hidden rounded-2xl p-2">
        {NAV_ITEMS.map(({ id, label, Icon }, i) => {
          const isActive = active === id
          return (
            <a
              key={id}
              href={`#${id}`}
              className="group relative flex items-center justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.92 }}
                className={`relative flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300 sm:h-10 sm:w-10 ${
                  isActive
                    ? 'bg-gradient-to-br from-brand-500 to-accent-pink text-white shadow-glow'
                    : 'text-brand-700 hover:bg-brand-100'
                }`}
              >
                <Icon className="text-[16px] sm:text-[17px]" />
                {isActive && (
                  <motion.span
                    layoutId="nav-pulse"
                    className="absolute inset-0 rounded-xl ring-2 ring-brand-400/60"
                  />
                )}
              </motion.div>
              <span
                className="pointer-events-none absolute left-full top-1/2 ml-3 -translate-y-1/2 whitespace-nowrap rounded-lg bg-brand-900/90 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                style={{ transitionDelay: `${i * 20}ms` }}
              >
                {label}
              </span>
            </a>
          )
        })}
      </div>
    </motion.nav>
  )
}
