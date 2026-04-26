import React from 'react'
import { motion } from 'framer-motion'
import {
  FaLinkedin,
  FaInstagram,
  FaTelegramPlane,
  FaEnvelope,
  FaHeart,
  FaArrowUp,
} from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="relative mt-20 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-400/60 to-transparent" />

      {/* Marquee */}
      <div className="overflow-hidden border-y border-brand-100/60 bg-white/40 py-4 backdrop-blur">
        <div className="flex animate-marquee whitespace-nowrap text-3xl font-display font-semibold text-brand-700/70">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex gap-12 px-6">
              {[
                'Code.',
                'Break.',
                'Optimize.',
                'Repeat.',
                'Build.',
                'Ship.',
                'Learn.',
                'Grow.',
                'Naidu Basudev',
              ].map((w, i) => (
                <span key={i} className="flex items-center gap-12">
                  <span className="text-gradient">{w}</span>
                  <span className="text-brand-300">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="relative px-6 py-12 sm:px-10">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-3 inline-flex items-center gap-2"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-pink font-display text-lg font-bold text-white shadow-glow">
                B
              </span>
              <h3 className="font-display text-xl font-semibold text-brand-900">
                Naidu Basudev
              </h3>
            </motion.div>
            <p className="text-sm leading-relaxed text-brand-700/80">
              Aspiring software engineer crafting full-stack experiences with
              React, Node and a sprinkle of motion.
            </p>
          </div>

          <div>
            <h4 className="mb-3 font-display text-sm uppercase tracking-widest text-brand-700/70">
              Quick Links
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-sm text-brand-700">
              {[
                ['home', 'Home'],
                ['about', 'About'],
                ['education', 'Education'],
                ['skills', 'Skills'],
                ['projects', 'Projects'],
                ['coding', 'Coding'],
                ['certifications', 'Certs'],
                ['contact', 'Contact'],
              ].map(([id, label]) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="group inline-flex items-center gap-1 transition hover:text-accent-pink"
                  >
                    <span className="h-1 w-1 rounded-full bg-brand-400 transition group-hover:w-3 group-hover:bg-accent-pink" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 font-display text-sm uppercase tracking-widest text-brand-700/70">
              Reach Me
            </h4>
            <div className="flex gap-2 sm:gap-3 md:gap-4">
              {[
                {
                  Icon: FaLinkedin,
                  url: 'https://www.linkedin.com/in/naidu-basudev-96b7a6289/',
                },
                {
                  Icon: FaInstagram,
                  url: 'https://www.instagram.com/basudev1728/',
                },
                { Icon: FaTelegramPlane, url: 'https://t.me/BasudevNaidu' },
                { Icon: FaEnvelope, url: 'mailto:basudevnaidu2@gmail.com' },
              ].map(({ Icon, url }, i) => (
                <motion.a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -4, scale: 1.1 }}
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/70 text-brand-700 shadow-soft transition hover:bg-gradient-to-br hover:from-brand-500 hover:to-accent-pink hover:text-white"
                >
                  <Icon />
                </motion.a>
              ))}
            </div>

            <a
              href="#home"
              className="group mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-accent-pink px-4 py-2 text-sm font-medium text-white shadow-glow"
            >
              Back to top
              <FaArrowUp className="transition group-hover:-translate-y-1" />
            </a>
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-brand-100/60 pt-6 text-sm text-brand-700/80 sm:flex-row">
          <p className="flex items-center gap-2">
            © {new Date().getFullYear()} Naidu Basudev. Made with{' '}
            <motion.span
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ repeat: Infinity, duration: 1.4 }}
              className="text-accent-pink"
            >
              <FaHeart />
            </motion.span>{' '}
            and lots of coffee.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/BasudevNaidu/BasudevNaiduPortfolio/blob/main/LICENSE"
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs font-semibold bg-gradient-to-r from-brand-500 to-accent-pink bg-clip-text text-transparent hover:opacity-80 transition"
            >
              View MIT License
            </a>
            <p className="font-mono text-xs text-brand-700/60">
              Crafted with React · Vite · Tailwind · Framer Motion
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
