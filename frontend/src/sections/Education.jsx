import React from 'react'
import { motion } from 'framer-motion'
import { EDUCATION } from '../data'
import { SectionTitle } from './About'

export default function Education() {
  return (
    <section id="education" className="relative px-6 py-28 sm:pl-28 sm:pr-10">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="my journey" title="Education" />

        <div className="relative mt-14">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 hidden h-full w-1 rounded-full bg-gradient-to-b from-brand-300 via-accent-pink to-accent-peach md:block" />

          <div className="space-y-10">
            {EDUCATION.map((e, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="relative md:pl-20"
              >
                {/* Dot */}
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className="absolute left-0 top-6 hidden h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-brand-500 to-accent-pink text-white shadow-glow md:flex"
                >
                  <span className="font-bold">{i + 1}</span>
                </motion.div>

                <motion.div
                  whileHover={{ y: -6 }}
                  className="glass-strong shadow-soft group relative flex flex-col gap-5 rounded-2xl p-6 sm:flex-row sm:items-center"
                >
                  <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-2 shadow-soft">
                    <img
                      src={e.logo}
                      alt={e.school}
                      className="h-full w-full object-contain transition group-hover:scale-110"
                      onError={(ev) => {
                        ev.currentTarget.style.display = 'none'
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-semibold text-brand-900">
                      {e.title}
                    </h3>
                    <p className="mt-1 text-sm text-brand-700">{e.school}</p>
                    <p className="mt-1 text-xs text-brand-700/70">
                      {e.period} · {e.place}
                    </p>
                  </div>
                  <span className="inline-flex shrink-0 items-center rounded-full bg-gradient-to-r from-brand-500 to-accent-pink px-4 py-2 text-sm font-semibold text-white shadow-glow">
                    {e.gpa}
                  </span>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
