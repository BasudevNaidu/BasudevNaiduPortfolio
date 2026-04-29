import React from 'react'
import { motion } from 'framer-motion'
import { FaFileDownload, FaRobot } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { ABOUT_IMG, RESUME_URL } from '../data'

export default function About() {
  const navigate = useNavigate()
  return (
    <section
      id="about"
      className="relative px-6 py-28 sm:pl-28 sm:pr-10"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2">
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto"
        >
          <motion.div
            animate={{ rotate: [0, 4, -4, 0] }}
            transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
            className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-brand-300 via-accent-pink to-accent-peach opacity-60 blur-2xl"
          />
          <motion.div
            whileHover={{ scale: 1.03, rotate: -2 }}
            className="relative h-[380px] w-[300px] overflow-hidden rounded-[2rem] border-4 border-white bg-white shadow-soft"
          >
            <img
              src={ABOUT_IMG}
              alt="Basudev"
              className="h-full w-full object-cover"
            />
            <motion.div
              animate={{ y: ['-100%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="pointer-events-none absolute inset-x-0 h-1/3 bg-gradient-to-b from-white/0 via-white/40 to-white/0"
            />
          </motion.div>

          {/* Decorative dots */}
          <div className="absolute -bottom-6 -right-6 grid grid-cols-5 gap-1.5 opacity-50">
            {Array.from({ length: 25 }).map((_, i) => (
              <span
                key={i}
                className="h-1.5 w-1.5 rounded-full bg-brand-500"
              />
            ))}
          </div>
        </motion.div>

        <div>
          <SectionTitle eyebrow="who am i" title="About Me" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-base leading-relaxed text-brand-800/85"
          >
            Hi, I'm <strong className="text-brand-900">Basudev</strong> — a
            Computer Science undergraduate with strong proficiency in Java and a
            solid understanding of Data Structures, Algorithms, and
            Object-Oriented Programming. My problem-solving skills have been
            honed through competitive programming. I have hands-on experience
            with{' '}
            <span className="font-semibold text-brand-700">
              Node.js, Express.js, and Docker
            </span>
            , along with Git and GitHub, and databases such as SQL and MongoDB.
            I have practical knowledge of building and deploying full-stack
            applications with scalable backend architecture and containerized
            environments.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex flex-wrap gap-2 sm:gap-3 md:gap-4"
          >
            {['Problem Solver', 'Full Stack', 'DevOps Curious', 'Builder'].map(
              (tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-brand-200 bg-white/70 px-4 py-1.5 text-sm font-medium text-brand-700 shadow-sm backdrop-blur transition hover:scale-105 hover:border-accent-pink hover:text-accent-pink"
                >
                  {tag}
                </span>
              ),
            )}
          </motion.div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            {/* View Resume */}
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.55 }}
              href={RESUME_URL}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-brand-500 to-accent-pink px-7 py-3 font-semibold text-white shadow-glow transition hover:scale-105"
            >
              <FaFileDownload className="transition group-hover:translate-y-1" />
              View Resume
              <span className="relative h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
              </span>
            </motion.a>

            {/* Try BanaAI */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/banaai')}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border-2 border-brand-500/40 bg-white/60 px-6 py-3 font-semibold text-brand-700 backdrop-blur transition hover:border-brand-500 hover:bg-white"
            >
              <motion.span
                animate={{ rotate: [0, 12, -12, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
              >
                <FaRobot className="text-brand-500" />
              </motion.span>
              <span>Try BanaAI</span>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}

export function SectionTitle({ eyebrow, title }) {
  return (
    <div>
      <motion.span
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-accent-pink"
      >
        <span className="h-px w-8 bg-accent-pink" />
        {eyebrow}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="mt-2 font-display text-4xl font-bold text-brand-900 sm:text-5xl"
      >
        {title}
      </motion.h2>
    </div>
  )
}
