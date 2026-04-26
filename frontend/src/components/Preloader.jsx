import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { FaCube, FaCode, FaPalette, FaRocket, FaCheck, FaCogs } from 'react-icons/fa'

const loadingSteps = [
  { icon: FaCode, text: 'Initializing...', color: 'from-blue-500 to-cyan-400' },
  { icon: FaPalette, text: 'Rendering UI...', color: 'from-pink-500 to-rose-400' },
  { icon: FaCogs, text: 'Optimizing...', color: 'from-purple-500 to-violet-400' },
  { icon: FaRocket, text: 'Launching...', color: 'from-orange-500 to-amber-400' },
  { icon: FaCheck, text: 'Complete!', color: 'from-green-500 to-emerald-400' }
]

export const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [-100, 100], [20, -20])
  const rotateY = useTransform(mouseX, [-100, 100], [-20, 20])

  useEffect(() => {
    const duration = 4000
    const interval = 20
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

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= 4) return 4
        const newStep = Math.min(Math.floor((progress / 100) * 5), 4)
        return newStep
      })
    }, 800)

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
        }, 600)
      }, 600)
    }
  }, [progress, onComplete])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
          onMouseMove={handleMouseMove}
        >
          {/* 3D Background Grid */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
            
            {/* Animated grid lines */}
            <svg className="absolute inset-0 w-full h-full opacity-20">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Floating 3D particles */}
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                initial={{
                  x: Math.random() * 100 + '%',
                  y: Math.random() * 100 + '%',
                  z: Math.random() * 100 - 50,
                  scale: 0
                }}
                animate={{
                  y: [null, (Math.random() - 0.5) * 400],
                  z: [null, (Math.random() - 0.5) * 200],
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 3 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: 'easeInOut'
                }}
                style={{
                  filter: `blur(${Math.random() * 2}px)`
                }}
              />
            ))}
          </div>

          {/* Main 3D Container */}
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d'
            }}
            className="relative z-10 w-full max-w-lg px-6"
          >
            {/* 3D Rotating Cube */}
            <div className="relative flex justify-center mb-12">
              <motion.div
                animate={{ rotateY: 360, rotateX: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className="relative w-32 h-32"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Cube faces */}
                {[
                  { rotate: 'rotateY(0deg) translateZ(64px)', bg: 'from-blue-500 to-cyan-400' },
                  { rotate: 'rotateY(180deg) translateZ(64px)', bg: 'from-purple-500 to-pink-400' },
                  { rotate: 'rotateY(90deg) translateZ(64px)', bg: 'from-pink-500 to-rose-400' },
                  { rotate: 'rotateY(-90deg) translateZ(64px)', bg: 'from-orange-500 to-amber-400' },
                  { rotate: 'rotateX(90deg) translateZ(64px)', bg: 'from-green-500 to-emerald-400' },
                  { rotate: 'rotateX(-90deg) translateZ(64px)', bg: 'from-indigo-500 to-violet-400' }
                ].map((face, i) => (
                  <motion.div
                    key={i}
                    className={`absolute inset-0 bg-gradient-to-br ${face.bg} opacity-80 flex items-center justify-center`}
                    style={{
                      transform: face.rotate,
                      backfaceVisibility: 'visible',
                      boxShadow: '0 0 30px rgba(255,255,255,0.3)'
                    }}
                  >
                    <FaCube className="text-white text-3xl" />
                  </motion.div>
                ))}
              </motion.div>

              {/* Glowing ring */}
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-40 h-40 rounded-full border-2 border-white/20" />
              </motion.div>
              <motion.div
                animate={{ rotate: -360, scale: [1.2, 1, 1.2] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-48 h-48 rounded-full border border-white/10" />
              </motion.div>
            </div>

            {/* Loading Steps */}
            <div className="space-y-3 mb-8">
              {loadingSteps.map((step, index) => {
                const Icon = step.icon
                const isActive = index === currentStep
                const isCompleted = index < currentStep

                return (
                  <motion.div
                    key={index}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.15, type: 'spring' }}
                    className={`flex items-center gap-4 px-5 py-4 rounded-2xl backdrop-blur-sm transition-all ${
                      isActive
                        ? 'bg-white/15 scale-105 shadow-2xl shadow-white/10'
                        : isCompleted
                        ? 'bg-white/5 opacity-50'
                        : 'bg-white/5 opacity-20'
                    }`}
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: isActive ? 'translateZ(20px)' : 'translateZ(0)'
                    }}
                  >
                    <motion.div
                      animate={isActive ? { rotate: 360, scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} shadow-lg`}
                    >
                      <Icon className="text-white text-xl" />
                    </motion.div>
                    <div className="flex-1">
                      <span className={`text-white font-semibold text-base ${isActive ? 'text-lg' : ''}`}>
                        {step.text}
                      </span>
                      {isActive && (
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 0.8 }}
                          className="h-1 bg-white/30 rounded-full mt-2 overflow-hidden"
                        >
                          <motion.div
                            className="h-full bg-gradient-to-r from-white to-white/50"
                            animate={{ x: ['-100%', '100%'] }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          />
                        </motion.div>
                      )}
                    </div>
                    {isCompleted && (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="text-green-400 text-xl"
                      >
                        <FaCheck />
                      </motion.div>
                    )}
                  </motion.div>
                )
              })}
            </div>

            {/* 3D Progress Bar */}
            <div className="relative h-3 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
                style={{
                  boxShadow: '0 0 20px rgba(168, 85, 247, 0.5)'
                }}
              />
              {/* 3D shimmer effect */}
              <motion.div
                className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-transparent via-white/40 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
              />
            </div>

            {/* Progress Percentage with 3D effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-4 text-center"
            >
              <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                {Math.round(progress)}
              </span>
              <span className="text-2xl text-white/60 ml-1">%</span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
