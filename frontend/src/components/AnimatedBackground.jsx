import React from 'react'
import { motion } from 'framer-motion'

export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Soft base */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-[#fff5f9]" />

      {/* Grid */}
      <div
        className="absolute inset-0 bg-grid-light opacity-60"
        style={{ backgroundSize: '52px 52px' }}
      />

      {/* Radial fade to soften the grid */}
      <div className="absolute inset-0 bg-radial-fade" />

      {/* Floating gradient blobs */}
      <motion.div
        className="absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full blur-3xl opacity-50"
        style={{
          background:
            'radial-gradient(circle at 30% 30%, #a5b1ff, transparent 70%)',
        }}
        animate={{ x: [0, 60, -40, 0], y: [0, -40, 30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/3 -right-24 h-[480px] w-[480px] rounded-full blur-3xl opacity-50"
        style={{
          background:
            'radial-gradient(circle at 70% 30%, #ffb7e0, transparent 70%)',
        }}
        animate={{ x: [0, -50, 40, 0], y: [0, 50, -30, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 left-1/4 h-[460px] w-[460px] rounded-full blur-3xl opacity-40"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, #ffd9a8, transparent 70%)',
        }}
        animate={{ x: [0, 40, -60, 0], y: [0, -60, 30, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/2 left-1/3 h-[360px] w-[360px] rounded-full blur-3xl opacity-30"
        style={{
          background:
            'radial-gradient(circle at 40% 60%, #b6f0dc, transparent 70%)',
        }}
        animate={{ x: [0, 70, -30, 0], y: [0, 30, -50, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating dots */}
      {Array.from({ length: 22 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-2 w-2 rounded-full"
          style={{
            top: `${(i * 53) % 100}%`,
            left: `${(i * 37) % 100}%`,
            background: i % 2 === 0 ? '#5b66ff' : '#ff6ad5',
            opacity: 0.18,
          }}
          animate={{
            y: [0, -25, 0, 25, 0],
            x: [0, 12, 0, -12, 0],
          }}
          transition={{
            duration: 8 + (i % 6),
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.2,
          }}
        />
      ))}

      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent" />
    </div>
  )
}
