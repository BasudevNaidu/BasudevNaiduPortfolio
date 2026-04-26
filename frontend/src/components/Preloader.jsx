import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaCode, FaPalette, FaRocket, FaCheck } from 'react-icons/fa'

const loadingSteps = [
  { icon: FaCode, text: 'Loading components...' },
  { icon: FaPalette, text: 'Applying styles...' },
  { icon: FaRocket, text: 'Preparing launch...' },
  { icon: FaCheck, text: 'Ready!' }
]

export const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const duration = 3000 // 3 seconds total
    const interval = 30 // Update every 30ms
    const increment = 100 / (duration / interval)

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return prev + increment
      })
    }, interval)

    // Update steps based on progress
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= 3) return 3
        const newStep = Math.floor((progress / 100) * 4)
        return newStep
      })
    }, 700)

    return () => {
      clearInterval(timer)
      clearInterval(stepInterval)
    }
  }, [])

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => {
        setIsVisible(false)
        setTimeout(() => {
          onComplete?.()
        }, 500)
      }, 500)
    }
  }, [progress, onComplete])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-brand-900 via-purple-900 to-brand-800"
        >
          <div className="relative w-full max-w-md px-6">
            {/* Animated background particles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white/20 rounded-full"
                  initial={{
                    x: Math.random() * 100 + '%',
                    y: Math.random() * 100 + '%',
                    scale: 0
                  }}
                  animate={{
                    y: [null, -Math.random() * 200 - 100],
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                />
              ))}
            </div>

            {/* Main content */}
            <div className="relative z-10 text-center">
              {/* Logo/Brand */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', damping: 15, delay: 0.2 }}
                className="mb-8"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-brand-500 via-accent-pink to-accent-peach shadow-glow">
                  <span className="text-3xl font-bold text-white">N</span>
                </div>
              </motion.div>

              {/* Loading steps */}
              <div className="space-y-4 mb-8">
                {loadingSteps.map((step, index) => {
                  const Icon = step.icon
                  const isActive = index === currentStep
                  const isCompleted = index < currentStep

                  return (
                    <motion.div
                      key={index}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        isActive
                          ? 'bg-white/20 scale-105'
                          : isCompleted
                          ? 'bg-white/10 opacity-60'
                          : 'bg-white/5 opacity-30'
                      }`}
                    >
                      <motion.div
                        animate={isActive ? { rotate: 360 } : {}}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        className={`flex items-center justify-center w-8 h-8 rounded-lg ${
                          isActive
                            ? 'bg-gradient-to-r from-brand-500 to-accent-pink'
                            : isCompleted
                            ? 'bg-green-500'
                            : 'bg-white/20'
                        }`}
                      >
                        <Icon className="text-white text-sm" />
                      </motion.div>
                      <span className="text-white font-medium text-sm">{step.text}</span>
                      {isCompleted && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-auto text-green-400"
                        >
                          <FaCheck />
                        </motion.div>
                      )}
                    </motion.div>
                  )
                })}
              </div>

              {/* Progress bar */}
              <div className="relative h-2 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-brand-500 via-accent-pink to-accent-peach rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                />
              </div>

              {/* Progress percentage */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-3 text-white/80 text-sm font-mono"
              >
                {Math.round(progress)}%
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
