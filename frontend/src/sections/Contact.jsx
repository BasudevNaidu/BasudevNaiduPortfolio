import React from 'react'
import { motion } from 'framer-motion'
import {
  FaLinkedin,
  FaInstagram,
  FaTelegramPlane,
  FaEnvelope,
  FaArrowRight,
} from 'react-icons/fa'
import { CONTACTS } from '../data'
import { SectionTitle } from './About'

const ICONS = {
  LinkedIn: FaLinkedin,
  Instagram: FaInstagram,
  Telegram: FaTelegramPlane,
  Email: FaEnvelope,
}

export default function Contact() {
  return (
    <section id="contact" className="relative px-6 py-28 sm:pl-28 sm:pr-10">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="say hello" title="Get in Touch" />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-4 max-w-xl text-base text-brand-700/80"
        >
          I'm always open to interesting conversations, collaborations, and
          opportunities. Pick your favorite channel and let's chat.
        </motion.p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {CONTACTS.map((c, i) => {
            const Icon = ICONS[c.name]
            const external = c.url.startsWith('http')
            return (
              <motion.a
                key={c.name}
                href={c.url}
                target={external ? '_blank' : undefined}
                rel={external ? 'noreferrer' : undefined}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -8, rotate: 0.4 }}
                className="glass-strong shadow-soft group relative overflow-hidden rounded-3xl p-6"
              >
                <div
                  className={`pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gradient-to-br ${c.color} opacity-25 blur-3xl transition group-hover:opacity-50`}
                />
                <div className="relative flex items-center gap-5">
                  <motion.div
                    whileHover={{ rotate: 12, scale: 1.1 }}
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${c.color} text-2xl text-white shadow-glow`}
                  >
                    <Icon />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-bold text-brand-900">
                      {c.name}
                    </h3>
                    <p className="font-mono text-sm text-brand-700/80">
                      {c.handle}
                    </p>
                  </div>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-900 text-white transition group-hover:scale-110 group-hover:bg-accent-pink">
                    <FaArrowRight className="transition group-hover:translate-x-0.5" />
                  </span>
                </div>
              </motion.a>
            )
          })}
        </div>

        {/* Big quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 rounded-3xl bg-gradient-to-r from-brand-500 via-accent-pink to-accent-peach p-1 shadow-glow"
        >
          <div className="rounded-3xl bg-white/90 p-8 text-center backdrop-blur sm:p-12">
            <p className="font-display text-2xl font-semibold leading-snug text-brand-900 sm:text-3xl">
              “Let's build something{' '}
              <span className="text-gradient">extraordinary</span> together.”
            </p>
            <p className="mt-3 text-sm text-brand-700/70">
              — Naidu Basudev
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
