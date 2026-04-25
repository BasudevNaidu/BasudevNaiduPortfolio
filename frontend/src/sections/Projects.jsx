import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import {
  FaGithub,
  FaExternalLinkAlt,
  FaPlay,
  FaCircle,
} from 'react-icons/fa'
import { PROJECTS } from '../data'
import { SectionTitle } from './About'

const GRADIENTS = [
  { from: '#7d8aff', via: '#a5b1ff', to: '#ff6ad5' },
  { from: '#ffb37c', via: '#ff8e9e', to: '#ff6ad5' },
  { from: '#7ce0c2', via: '#7cc6ff', to: '#7d8aff' },
  { from: '#7cc6ff', via: '#a5b1ff', to: '#5b66ff' },
  { from: '#ffe27c', via: '#ffb37c', to: '#ff8e9e' },
  { from: '#5b66ff', via: '#7d8aff', to: '#7cc6ff' },
  { from: '#ff6ad5', via: '#ffb37c', to: '#ffe27c' },
]

function TiltCard({ children, className = '' }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(useSpring(y, { stiffness: 220, damping: 20 }), [-60, 60], [12, -12])
  const rotateY = useTransform(useSpring(x, { stiffness: 220, damping: 20 }), [-60, 60], [-12, 12])

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

function VideoFrame({ project, grad }) {
  const conic = `conic-gradient(from 0deg, ${grad.from}, ${grad.via}, ${grad.to}, ${grad.from})`
  return (
    <div className="relative">
      {/* Animated rotating conic gradient ring */}
      <motion.div
        aria-hidden
        animate={{ rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        className="absolute -inset-[2px] rounded-[1.4rem]"
        style={{ background: conic }}
      />
      {/* Soft outer glow */}
      <motion.div
        aria-hidden
        animate={{ opacity: [0.45, 0.85, 0.45] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -inset-3 rounded-[1.7rem] blur-2xl"
        style={{ background: conic }}
      />

      {/* Inner frame */}
      <div className="relative overflow-hidden rounded-[1.3rem] bg-brand-900">
        {/* Mac-style chrome bar */}
        <div className="flex items-center gap-1.5 bg-brand-900/95 px-3 py-2">
          <FaCircle className="text-[8px] text-[#ff5f56]" />
          <FaCircle className="text-[8px] text-[#ffbd2e]" />
          <FaCircle className="text-[8px] text-[#27c93f]" />
          <span className="ml-3 truncate font-mono text-[10px] text-white/60">
            {project.name.toLowerCase().replace(/\s+/g, '-')}.mp4
          </span>
          <span className="ml-auto flex items-center gap-1 text-[9px] uppercase tracking-wider text-white/40">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" /> live
          </span>
        </div>

        {/* Video / placeholder area (16:9) */}
        <div className="relative aspect-video w-full overflow-hidden bg-black">
          {project.video ? (
            <video
              src={project.video}
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
            />
          ) : (
            <Placeholder grad={grad} name={project.name} />
          )}

          {/* Scanline sweep across video */}
          <motion.div
            aria-hidden
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className="pointer-events-none absolute inset-x-0 h-1/2 bg-gradient-to-b from-white/0 via-white/15 to-white/0"
          />
          {/* Vignette */}
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.55)]" />
          {/* Corner brackets */}
          {['top-2 left-2 border-t-2 border-l-2', 'top-2 right-2 border-t-2 border-r-2',
            'bottom-2 left-2 border-b-2 border-l-2', 'bottom-2 right-2 border-b-2 border-r-2'].map((pos, k) => (
            <span
              key={k}
              className={`absolute h-4 w-4 border-white/70 ${pos}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function Placeholder({ grad, name }) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Animated gradient base */}
      <motion.div
        animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(135deg, ${grad.from}, ${grad.via}, ${grad.to})`,
          backgroundSize: '200% 200%',
        }}
      />
      {/* Grid overlay */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      {/* Floating orbs */}
      {Array.from({ length: 6 }).map((_, k) => (
        <motion.span
          key={k}
          className="absolute h-2 w-2 rounded-full bg-white/80"
          style={{ top: `${(k * 31) % 100}%`, left: `${(k * 47) % 100}%` }}
          animate={{ y: [0, -14, 0], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 3 + (k % 4), repeat: Infinity, delay: k * 0.25 }}
        />
      ))}
      {/* Center play badge */}
      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 text-white"
      >
        <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
          <motion.span
            aria-hidden
            animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-white/40"
          />
          <FaPlay className="relative ml-1 text-xl" />
        </span>
        <span className="font-display text-xl font-bold drop-shadow-lg">
          {name}
        </span>
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/80">
          video coming soon
        </span>
      </motion.div>
    </div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="relative px-6 py-28 sm:pl-28 sm:pr-10">
      {/* Decorative animated streaks */}
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 -z-0">
        <motion.div
          animate={{ x: ['-10%', '10%', '-10%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-1/4 top-10 h-72 w-72 rounded-full bg-accent-pink/10 blur-3xl"
        />
        <motion.div
          animate={{ x: ['10%', '-10%', '10%'] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute right-1/4 bottom-10 h-80 w-80 rounded-full bg-brand-300/15 blur-3xl"
        />
      </motion.div>

      <div className="relative mx-auto max-w-6xl">
        <SectionTitle eyebrow="things i built" title="Projects" />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-4 max-w-xl text-base text-brand-700/80"
        >
          Watch each project come alive — real product previews running on
          loop. Hover for the parallax tilt.
        </motion.p>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p, i) => {
            const grad = GRADIENTS[i % GRADIENTS.length]
            return (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 50, rotate: -2 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.07, type: 'spring', stiffness: 80 }}
              >
                <TiltCard className="group relative h-full">
                  <div className="relative overflow-hidden rounded-3xl bg-white/70 p-4 shadow-soft backdrop-blur-md">
                    {/* Floating decorative ring inside card */}
                    <motion.div
                      aria-hidden
                      animate={{ rotate: 360 }}
                      transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
                      className="pointer-events-none absolute -right-12 -bottom-12 h-44 w-44 rounded-full border-2 border-dashed"
                      style={{ borderColor: `${grad.from}30` }}
                    />

                    <VideoFrame project={p} grad={grad} />

                    {/* Meta row */}
                    <div className="mt-4 flex items-center justify-between px-1">
                      <span
                        className="inline-block rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider"
                        style={{
                          background: `linear-gradient(135deg, ${grad.from}22, ${grad.to}22)`,
                          color: grad.from,
                        }}
                      >
                        {p.tag}
                      </span>
                      <div className="flex items-center gap-1 text-[10px] font-mono text-brand-700/60">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-mint" />
                        looping
                      </div>
                    </div>

                    <h3 className="mt-2 px-1 font-display text-lg font-semibold text-brand-900">
                      {p.name}
                    </h3>

                    <div className="mt-4 flex items-center gap-2 px-1">
                      <motion.a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.96 }}
                        className="inline-flex items-center gap-2 rounded-full bg-brand-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-brand-700"
                      >
                        <FaGithub /> Code
                      </motion.a>
                      {p.live ? (
                        <motion.a
                          href={p.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.06 }}
                          whileTap={{ scale: 0.96 }}
                          className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-2 text-xs font-semibold text-brand-700 transition hover:border-accent-pink hover:text-accent-pink"
                        >
                          <FaExternalLinkAlt /> Live
                        </motion.a>
                      ) : (
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.06 }}
                          whileTap={{ scale: 0.96 }}
                          className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-2 text-xs font-semibold text-brand-700/50 transition cursor-not-allowed"
                          disabled
                        >
                          <FaExternalLinkAlt /> Coming Soon
                        </motion.button>
                      )}
                    </div>
                  </div>

                  {/* Outer glowing animated halo on hover */}
                  <motion.div
                    aria-hidden
                    className="pointer-events-none absolute -inset-1 -z-10 rounded-[2rem] opacity-0 blur-2xl transition group-hover:opacity-80"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                    style={{
                      background: `conic-gradient(from 0deg, ${grad.from}, ${grad.via}, ${grad.to}, ${grad.from})`,
                    }}
                  />
                </TiltCard>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
