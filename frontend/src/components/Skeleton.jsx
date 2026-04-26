import React from 'react'
import { motion } from 'framer-motion'

export function Skeleton({ className, variant = 'default' }) {
  const variants = {
    default: 'h-4 w-full',
    text: 'h-4 w-3/4',
    title: 'h-8 w-1/2',
    avatar: 'h-12 w-12 rounded-full',
    button: 'h-10 w-24 rounded-lg',
    card: 'h-32 w-full rounded-xl',
    image: 'h-64 w-full rounded-2xl',
  }

  return (
    <motion.div
      className={`bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse ${variants[variant]} ${className}`}
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'linear',
      }}
      style={{
        backgroundSize: '200% 200%',
      }}
    />
  )
}

export function HeroSkeleton() {
  return (
    <section className="relative flex min-h-screen items-center px-6 pt-24 sm:pl-28 sm:pr-10">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-2">
        {/* Image skeleton */}
        <div className="relative mx-auto flex items-center justify-center">
          <Skeleton variant="avatar" className="h-[360px] w-[360px]" />
        </div>

        {/* Text skeleton */}
        <div className="relative space-y-4">
          <Skeleton variant="button" className="w-40" />
          <Skeleton variant="title" className="h-16" />
          <Skeleton variant="text" className="h-8" />
          <Skeleton variant="text" className="h-6" />
          <div className="flex gap-4 mt-8">
            <Skeleton variant="button" className="w-32" />
            <Skeleton variant="button" className="w-32" />
          </div>
          <div className="grid grid-cols-3 gap-4 mt-10">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} variant="card" className="h-20" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function CardSkeleton() {
  return (
    <div className="rounded-3xl p-6 bg-white/60 backdrop-blur">
      <Skeleton variant="avatar" className="h-14 w-14 mb-4" />
      <Skeleton variant="title" className="h-6 mb-2" />
      <Skeleton variant="text" className="h-4" />
    </div>
  )
}

export function SectionSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton variant="title" className="h-10 w-1/3" />
      <Skeleton variant="text" className="h-4 w-2/3" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} variant="card" className="h-48" />
        ))}
      </div>
    </div>
  )
}
