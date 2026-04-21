import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { SiCodechef, SiLeetcode } from 'react-icons/si'
import { FaArrowRight, FaBolt } from 'react-icons/fa'
import { CODING_PROFILES } from '../data'
import { SectionTitle } from './About'

const ICONS = { CodeChef: SiCodechef, LeetCode: SiLeetcode }

function TiltWrap({ children, className = '' }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(useSpring(y, { stiffness: 200, damping: 20 }), [-60, 60], [8, -8])
  const rotateY = useTransform(useSpring(x, { stiffness: 200, damping: 20 }), [-60, 60], [-8, 8])

  function handleMove(e) {
    const rect = ref.current.getBoundingClientRect()
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
  }
  function reset() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function Coding() {
  return (
    <section id="coding" className="relative px-6 py-28 sm:pl-28 sm:pr-10">
      {/* Floating background blobs */}
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 -z-0">
        <motion.div
          animate={{ x: ['-8%', '8%', '-8%'], y: ['0%', '8%', '0%'] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-10 top-10 h-72 w-72 rounded-full bg-brand-300/15 blur-3xl"
        />
        <motion.div
          animate={{ x: ['8%', '-8%', '8%'], y: ['0%', '-8%', '0%'] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute right-10 bottom-10 h-80 w-80 rounded-full bg-accent-pink/15 blur-3xl"
        />
      </motion.div>

      <div className="relative mx-auto max-w-6xl">
        <SectionTitle eyebrow="grind mode" title="Coding Profiles" />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-4 max-w-xl text-base text-brand-700/80"
        >
          Daily problem-solving across competitive platforms — sharpening
          algorithms, data structures, and contest-grade thinking.
        </motion.p>

        <div className="mt-14 grid gap-8 sm:grid-cols-2">
          {CODING_PROFILES.map((c, i) => {
            const Icon = ICONS[c.name]
            return (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 50, rotate: -2 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: 'spring', stiffness: 90 }}
              >
                <TiltWrap className="group relative">
                  {/* Outer rotating conic halo */}
                  <motion.div
                    aria-hidden
                    animate={{ rotate: 360 }}
                    transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
                    className="pointer-events-none absolute -inset-1 rounded-[1.7rem] opacity-40 blur-xl transition group-hover:opacity-90"
                    style={{
                      background: `conic-gradient(from 0deg, ${c.accent}, ${c.softAccent}, #7ce0c2, ${c.accent})`,
                    }}
                  />

                  <div className="relative overflow-hidden rounded-3xl shadow-soft">
                    {/* Brand-tinted gradient background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${c.bgGradient}`} />

                    {/* Animated dot mesh */}
                    <svg className="absolute inset-0 h-full w-full opacity-50" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id={`dots-${i}`} x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
                          <circle cx="2" cy="2" r="1.2" fill={c.accent} fillOpacity="0.18" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill={`url(#dots-${i})`} />
                    </svg>

                    {/* Drifting bloom */}
                    <motion.div
                      animate={{ scale: [1, 1.18, 1], rotate: [0, 14, 0], x: [0, 14, 0] }}
                      transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
                      className={`pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br ${c.iconGradient} opacity-30 blur-3xl`}
                    />
                    {/* Two rotating dashed rings (counter-rotating) */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
                      className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full border-2 border-dashed"
                      style={{ borderColor: `${c.accent}30` }}
                    />
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
                      className="pointer-events-none absolute -bottom-16 -left-12 h-48 w-48 rounded-full border"
                      style={{ borderColor: `${c.softAccent}40` }}
                    />

                    {/* Floating sparkles */}
                    {Array.from({ length: 6 }).map((_, k) => (
                      <motion.span
                        key={k}
                        className="pointer-events-none absolute h-1.5 w-1.5 rounded-full"
                        style={{
                          top: `${(k * 23 + 10) % 90}%`,
                          left: `${(k * 41 + 15) % 90}%`,
                          background: k % 2 ? c.accent : c.softAccent,
                        }}
                        animate={{ y: [0, -10, 0], opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 3 + (k % 4), repeat: Infinity, delay: k * 0.3 }}
                      />
                    ))}

                    {/* Inner glass card */}
                    <div className="relative m-[1.5px] rounded-[1.45rem] bg-white/75 p-7 backdrop-blur-md">
                      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex items-center gap-5">
                          <motion.div
                            whileHover={{ rotate: 14, scale: 1.15 }}
                            className={`relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${c.iconGradient} text-3xl text-white shadow-lg`}
                          >
                            {Icon ? <Icon /> : c.name.charAt(0)}
                            {/* Pulsing ring */}
                            <motion.span
                              aria-hidden
                              animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                              transition={{ duration: 2.4, repeat: Infinity }}
                              className="absolute inset-0 rounded-2xl"
                              style={{ boxShadow: `0 0 0 4px ${c.accent}55` }}
                            />
                          </motion.div>
                          <div>
                            <h3
                              className="font-display text-2xl font-bold"
                              style={{ color: c.accent }}
                            >
                              {c.name}
                            </h3>
                            <p className="font-mono text-sm text-brand-700/80">{c.handle}</p>
                            <span
                              className={`mt-2 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${c.chip}`}
                            >
                              <FaBolt className="text-[9px]" /> Active solver
                            </span>
                          </div>
                        </div>

                        <a
                          href={c.url}
                          target="_blank"
                          rel="noreferrer"
                          className="group/btn relative inline-flex items-center gap-2 self-start overflow-hidden rounded-full px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-105"
                          style={{
                            backgroundImage: `linear-gradient(135deg, ${c.accent}, ${c.softAccent})`,
                            boxShadow: `0 12px 30px -10px ${c.accent}66`,
                          }}
                        >
                          <span className="absolute inset-0 -translate-x-full bg-white/30 transition duration-700 group-hover/btn:translate-x-full" />
                          <span className="relative">View Profile</span>
                          <FaArrowRight className="relative transition group-hover/btn:translate-x-1" />
                        </a>
                      </div>

                      {/* Stat strip */}
                      <div
                        className="mt-7 grid grid-cols-3 overflow-hidden rounded-2xl border bg-white/70"
                        style={{ borderColor: `${c.accent}25` }}
                      >
                        {c.stats.map((s, idx) => (
                          <motion.div
                            key={s.label}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 + idx * 0.1 }}
                            className={`relative flex flex-col items-center px-2 py-3 ${
                              idx > 0 ? 'border-l' : ''
                            }`}
                            style={{ borderColor: `${c.accent}15` }}
                          >
                            <span
                              className="font-display text-xl font-bold"
                              style={{ color: c.accent }}
                            >
                              {s.value}
                            </span>
                            <span className="text-[10px] uppercase tracking-wider text-brand-700/70">
                              {s.label}
                            </span>
                          </motion.div>
                        ))}
                      </div>

                      {/* Animated progress bar */}
                      <div className="mt-5">
                        <div className="mb-1.5 flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-brand-700/70">
                          <span>Consistency</span>
                          <span style={{ color: c.accent }}>92%</span>
                        </div>
                        <div className="relative h-1.5 overflow-hidden rounded-full bg-brand-100">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: '92%' }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.4, delay: 0.4, ease: 'easeOut' }}
                            className="h-full rounded-full"
                            style={{
                              backgroundImage: `linear-gradient(90deg, ${c.accent}, ${c.softAccent})`,
                            }}
                          />
                          {/* Shimmer */}
                          <motion.span
                            aria-hidden
                            animate={{ x: ['-100%', '300%'] }}
                            transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
                            className="absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-white/70 to-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </TiltWrap>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
