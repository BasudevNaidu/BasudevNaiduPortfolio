import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaPaperPlane, FaProjectDiagram } from 'react-icons/fa'
import { HERO_IMG, HERO_TAGLINES } from '../data'

export default function Hero() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(
      () => setIdx((i) => (i + 1) % HERO_TAGLINES.length),
      2200,
    )
    return () => clearInterval(t)
  }, [])

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center px-6 pt-24 sm:pl-28 sm:pr-10"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-2">
        {/* Image */}
        <motion.div
          initial={{ x: -80, opacity: 0, rotate: -8 }}
          animate={{ x: 0, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.9, type: 'spring' }}
          className="relative mx-auto flex items-center justify-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
            className="absolute h-[360px] w-[360px] rounded-full"
            style={{
              background:
                'conic-gradient(from 0deg, #5b66ff, #ff6ad5, #ffb37c, #7ce0c2, #5b66ff)',
              filter: 'blur(2px)',
            }}
          />
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
            className="relative z-10 h-[320px] w-[320px] overflow-hidden rounded-full bg-white p-2 shadow-soft"
          >
            <div className="relative h-full w-full overflow-hidden rounded-full bg-gradient-to-br from-brand-100 to-accent-pink/20">
              <img
                src={HERO_IMG}
                alt="Naidu Basudev"
                className="h-full w-full object-cover"
              />
              <div className="shimmer pointer-events-none absolute inset-0" />
            </div>
          </motion.div>

          {/* Floating chips */}
          {[
            { label: '⚛︎ React', top: '4%', left: '-12%', d: 0 },
            { label: '{ } JS', top: '40%', left: '-18%', d: 0.3 },
            { label: '☕ Java', top: '82%', left: '-8%', d: 0.6 },
            { label: '🌿 Node', top: '6%', left: '90%', d: 0.9 },
            { label: '◉ Express', top: '46%', left: '96%', d: 1.2 },
            { label: '⚙ DevOps', top: '84%', left: '88%', d: 1.5 },
          ].map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
              transition={{
                delay: 0.6 + c.d,
                y: { repeat: Infinity, duration: 3 + i, ease: 'easeInOut' },
              }}
              style={{ top: c.top, left: c.left }}
              className="glass-strong absolute z-20 rounded-full px-3 py-1.5 text-xs font-semibold text-brand-700 shadow-soft"
            >
              {c.label}
            </motion.div>
          ))}
        </motion.div>

        {/* Text */}
        <div className="relative">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-brand-700 shadow-soft"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-pink opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-pink" />
            </span>
            Available for opportunities
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-display text-5xl font-bold leading-tight text-brand-900 sm:text-6xl"
          >
            Hi, I am{' '}
            <span className="text-gradient">Naidu Basudev</span>
          </motion.h1>

          {/* Animated rotating tagline */}
          <div className="relative mt-6 h-12 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={idx}
                initial={{ y: 40, opacity: 0, rotateX: -90 }}
                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                exit={{ y: -40, opacity: 0, rotateX: 90 }}
                transition={{ duration: 0.55 }}
                className="absolute font-mono text-xl text-brand-700 sm:text-2xl"
              >
                <span className="text-accent-pink">{'>'} </span>
                {HERO_TAGLINES[idx]}
                <span className="ml-1 inline-block h-6 w-[2px] animate-pulse bg-brand-700 align-middle" />
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 max-w-lg text-base leading-relaxed text-brand-700/80"
          >
           I build to understand—turning concepts into real systems 
           through consistent practice and problem-solving
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8 flex flex-wrap gap-3 sm:gap-4 md:gap-5"
          >
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-brand-500 to-accent-pink px-6 py-3 font-semibold text-white shadow-glow transition hover:scale-[1.04]"
            >
              <span className="absolute inset-0 -translate-x-full bg-white/30 transition group-hover:translate-x-full" />
              <FaPaperPlane className="relative" />
              <span className="relative">Get in touch</span>
            </a>
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full border-2 border-brand-500/40 bg-white/60 px-6 py-3 font-semibold text-brand-700 backdrop-blur transition hover:border-brand-500 hover:bg-white"
            >
              <FaProjectDiagram className="transition group-hover:rotate-12" />
              View Projects
            </a>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-10 grid max-w-md grid-cols-3 divide-x divide-brand-100 rounded-2xl bg-white/60 p-4 shadow-soft backdrop-blur"
          >
            {[
              ['9.07', 'CGPA'],
              ['7+', 'Projects'],
              ['5+', 'Certs'],
            ].map(([n, l]) => (
              <div key={l} className="px-2 text-center">
                <div className="font-display text-2xl font-bold text-gradient">
                  {n}
                </div>
                <div className="text-xs uppercase tracking-wider text-brand-700/70">
                  {l}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
