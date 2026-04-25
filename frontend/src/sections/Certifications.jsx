import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaTimes,
  FaEye,
  FaCertificate,
  FaAward,
  FaMedal,
  FaCheckCircle,
} from 'react-icons/fa'
import { CERTIFICATES } from '../data'
import { SectionTitle } from './About'

const ACCENTS = [
  { from: '#5b66ff', to: '#ff6ad5', icon: FaCertificate },
  { from: '#ffb37c', to: '#ff6ad5', icon: FaAward },
  { from: '#7ce0c2', to: '#7cc6ff', icon: FaMedal },
  { from: '#7cc6ff', to: '#5b66ff', icon: FaCheckCircle },
  { from: '#ffe27c', to: '#ffb37c', icon: FaAward },
]

export default function Certifications() {
  const [active, setActive] = useState(null)

  return (
    <section
      id="certifications"
      className="relative px-6 py-28 sm:pl-28 sm:pr-10"
    >
      {/* Floating decorative ribbons */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-0 overflow-hidden"
      >
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-20 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full border border-dashed border-brand-300/30"
        />
        <motion.div
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-10 left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full border border-dashed border-accent-pink/20"
        />
      </motion.div>

      <div className="relative mx-auto max-w-6xl">
        <SectionTitle eyebrow="proof of work" title="Certifications" />

        {/* Frame for selected certificate */}
        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ opacity: 0, y: -40, scale: 0.9, rotateX: -15 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, y: -40, scale: 0.9, rotateX: -15 }}
              transition={{ type: 'spring', stiffness: 110, damping: 18 }}
              style={{ transformPerspective: 1000 }}
              className="glass-strong shadow-soft relative mt-10 overflow-hidden rounded-3xl border-4 border-white p-4"
            >
              {/* Animated rotating gradient border */}
              <motion.div
                aria-hidden
                animate={{ rotate: 360 }}
                transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
                className="pointer-events-none absolute -inset-1 -z-10 rounded-[1.6rem] opacity-70 blur-xl"
                style={{
                  background:
                    'conic-gradient(from 0deg, #5b66ff, #ff6ad5, #ffb37c, #7ce0c2, #5b66ff)',
                }}
              />

              <div className="flex items-center justify-between px-2 pb-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-3 w-3 rounded-full bg-accent-pink" />
                  <span className="flex h-3 w-3 rounded-full bg-accent-peach" />
                  <span className="flex h-3 w-3 rounded-full bg-accent-mint" />
                  <p className="ml-3 font-display text-sm font-semibold text-brand-900">
                    {active.name}
                  </p>
                </div>
                <button
                  onClick={() => setActive(null)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-900 text-white transition hover:rotate-90 hover:scale-110 hover:bg-accent-pink"
                  aria-label="Close"
                >
                  <FaTimes />
                </button>
              </div>
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-100 via-white to-accent-pink/15 p-2">
                {/* Scanning highlight */}
                <motion.div
                  animate={{ y: ['-20%', '120%'] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
                  className="pointer-events-none absolute inset-x-0 z-10 h-1/3 bg-gradient-to-b from-white/0 via-white/40 to-white/0"
                />
                <motion.img
                  key={active.img}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  src={active.img}
                  alt={active.name}
                  className="mx-auto max-h-[520px] w-auto rounded-xl object-contain shadow-soft"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          {CERTIFICATES.map((c, i) => {
            const a = ACCENTS[i % ACCENTS.length]
            const Icon = a.icon
            const isActive = active && active.img === c.img
            return (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 40, rotate: -3 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, type: 'spring', stiffness: 90 }}
                whileHover={{ y: -10, rotate: 0.6 }}
                className="group relative"
              >
                {/* Animated outer glow */}
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute -inset-1 rounded-[1.6rem] opacity-40 blur-xl transition group-hover:opacity-90"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 14,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  style={{
                    background: `conic-gradient(from 0deg, ${a.from}, ${a.to}, ${a.from})`,
                  }}
                />

                <div className="glass-strong relative overflow-hidden rounded-3xl p-6 shadow-soft">
                  {/* Ribbon */}
                  <motion.div
                    initial={{ y: -30, rotate: -8 }}
                    whileInView={{ y: 0, rotate: -8 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 + 0.1 }}
                    className="absolute -right-9 top-5 rotate-45"
                  >
                    <div
                      className="px-10 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-lg"
                      style={{
                        background: `linear-gradient(90deg, ${a.from}, ${a.to})`,
                      }}
                    >
                      Verified
                    </div>
                  </motion.div>

                  {/* Floating bloom */}
                  <motion.div
                    animate={{ scale: [1, 1.15, 1], rotate: [0, 8, 0] }}
                    transition={{
                      duration: 9,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="pointer-events-none absolute -left-12 -bottom-12 h-44 w-44 rounded-full opacity-30 blur-2xl"
                    style={{
                      background: `radial-gradient(circle, ${a.from}, transparent 70%)`,
                    }}
                  />

                  <div className="relative">
                    <div className="flex items-start gap-3">
                      <motion.span
                        whileHover={{ rotate: 18, scale: 1.15 }}
                        className="relative flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg"
                        style={{
                          background: `linear-gradient(135deg, ${a.from}, ${a.to})`,
                          boxShadow: `0 10px 30px -10px ${a.from}99`,
                        }}
                      >
                        <Icon className="text-lg" />
                        <motion.span
                          aria-hidden
                          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                          transition={{ duration: 2.4, repeat: Infinity }}
                          className="absolute inset-0 rounded-2xl"
                          style={{
                            boxShadow: `0 0 0 4px ${a.from}55`,
                          }}
                        />
                      </motion.span>
                      <h3 className="flex-1 pr-16 font-display text-base font-semibold leading-snug text-brand-900">
                        {c.name}
                      </h3>
                    </div>

                    <div className="mt-5 flex items-center gap-2 text-[11px] text-brand-700/70">
                      <span className="inline-flex h-1.5 w-1.5 animate-pulse rounded-full bg-accent-mint" />
                      Issued credential · ID · #{(1024 + i).toString(16).toUpperCase()}
                    </div>

                    <button
                      onClick={() => {
                        setActive(c)
                        setTimeout(() => {
                          document
                            .getElementById('certifications')
                            ?.scrollIntoView({ behavior: 'smooth' })
                        }, 60)
                      }}
                      className="group/btn relative mt-6 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full px-4 py-2.5 text-sm font-semibold text-white shadow-glow transition hover:scale-[1.03]"
                      style={{
                        background: `linear-gradient(135deg, ${a.from}, ${a.to})`,
                      }}
                    >
                      <span className="absolute inset-0 -translate-x-full bg-white/30 transition duration-700 group-hover/btn:translate-x-full" />
                      <FaEye className="relative transition group-hover/btn:scale-125" />
                      <span className="relative">
                        {isActive ? 'Showing above' : 'View Certificate'}
                      </span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
