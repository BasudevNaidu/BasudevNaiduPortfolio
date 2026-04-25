import React from 'react'
import { motion } from 'framer-motion'
import { SKILLS } from '../data'
import { SectionTitle } from './About'

export default function Skills() {
  return (
    <section id="skills" className="relative px-6 py-28 sm:pl-28 sm:pr-10">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="my arsenal" title="Skills & Technologies" />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((s, i) => {
            const CatIcon = s.Icon
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                whileHover={{ y: -8, rotate: -0.5 }}
                className="border-gradient glass-strong shadow-soft group relative overflow-hidden rounded-2xl p-6"
              >
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <motion.span
                      whileHover={{ rotate: 12, scale: 1.1 }}
                      className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${s.color} text-xl text-white shadow-glow`}
                    >
                      <CatIcon />
                    </motion.span>
                    <h3 className="font-display text-lg font-semibold text-brand-900">
                      {s.title}
                    </h3>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {s.items.map((item, j) => {
                      const ItemIcon = item.Icon
                      return (
                        <motion.button
                          key={item.name}
                          type="button"
                          initial={{ opacity: 0, scale: 0.6 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.07 + j * 0.04 }}
                          whileHover={{
                            y: -3,
                            scale: 1.06,
                            boxShadow:
                              '0 10px 30px -10px rgba(91,102,255,0.5)',
                          }}
                          className="group/chip cursor-default inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white/85 px-3.5 py-1.5 text-xs font-semibold text-brand-700 shadow-sm transition hover:border-accent-pink"
                        >
                          <ItemIcon
                            className="text-base transition group-hover/chip:scale-125"
                            style={{ color: item.color }}
                          />
                          <span>{item.name}</span>
                        </motion.button>
                      )
                    })}
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
