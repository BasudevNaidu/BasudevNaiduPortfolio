import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { FaCube, FaCode, FaPalette, FaRocket, FaCheck, FaCogs, FaAtom, FaGem } from 'react-icons/fa'

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

  const rotateX = useTransform(mouseY, [-200, 200], [15, -15])
  const rotateY = useTransform(mouseX, [-200, 200], [-15, 15])

  useEffect(() => {
    const duration = 3000
    const interval = 15
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
    }, 600)

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
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden"
          onMouseMove={handleMouseMove}
        >
          {/* Multi-layer 3D Background */}
          <div className="absolute inset-0">
            {/* Deep space gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950" />
            
            {/* Animated starfield */}
            {[...Array(100)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-0.5 h-0.5 bg-white rounded-full"
                initial={{
                  x: Math.random() * 100 + '%',
                  y: Math.random() * 100 + '%',
                  scale: Math.random() * 2,
                  opacity: Math.random()
                }}
                animate={{
                  scale: [1, 2, 1],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{
                  duration: 2 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}

            {/* Nebula effect */}
            <div className="absolute inset-0">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 360]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
              />
              <motion.div
                animate={{
                  scale: [1.2, 1, 1.2],
                  rotate: [360, 0]
                }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
              />
            </div>

            {/* Grid floor */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 perspective-1000">
              <svg className="w-full h-full opacity-10" preserveAspectRatio="none">
                <defs>
                  <pattern id="floorGrid" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#floorGrid)" />
              </svg>
            </div>
          </div>

          {/* Main 3D Scene */}
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
              perspective: 1000
            }}
            className="relative z-10 w-full max-w-2xl px-6"
          >
            {/* Central 3D Object Cluster */}
            <div className="relative flex justify-center items-center mb-16 h-64">
              {/* Main rotating cube */}
              <motion.div
                animate={{ rotateY: 360, rotateX: 360, rotateZ: 180 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                className="relative w-24 h-24"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {[
                  { rotate: 'rotateY(0deg) translateZ(48px)', bg: 'from-blue-500 to-cyan-400' },
                  { rotate: 'rotateY(180deg) translateZ(48px)', bg: 'from-purple-500 to-pink-400' },
                  { rotate: 'rotateY(90deg) translateZ(48px)', bg: 'from-pink-500 to-rose-400' },
                  { rotate: 'rotateY(-90deg) translateZ(48px)', bg: 'from-orange-500 to-amber-400' },
                  { rotate: 'rotateX(90deg) translateZ(48px)', bg: 'from-green-500 to-emerald-400' },
                  { rotate: 'rotateX(-90deg) translateZ(48px)', bg: 'from-indigo-500 to-violet-400' }
                ].map((face, i) => (
                  <motion.div
                    key={i}
                    className={`absolute inset-0 bg-gradient-to-br ${face.bg} opacity-90 flex items-center justify-center border border-white/20`}
                    style={{
                      transform: face.rotate,
                      backfaceVisibility: 'visible',
                      boxShadow: '0 0 40px rgba(255,255,255,0.2)'
                    }}
                  >
                    <FaCube className="text-white text-2xl" />
                  </motion.div>
                ))}
              </motion.div>

              {/* Orbiting spheres */}
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 5 + i * 2, repeat: Infinity, ease: 'linear' }}
                  className="absolute"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <motion.div
                    className={`w-8 h-8 rounded-full bg-gradient-to-br ${
                      i === 0 ? 'from-pink-500 to-rose-400' : i === 1 ? 'from-cyan-500 to-blue-400' : 'from-amber-500 to-orange-400'
                    }`}
                    style={{
                      transform: `translateX(${80 + i * 20}px)`,
                      boxShadow: '0 0 20px rgba(255,255,255,0.3)'
                    }}
                  />
                </motion.div>
              ))}

              {/* Outer rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="absolute"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div
                  className="w-48 h-48 rounded-full border-2 border-white/30"
                  style={{
                    transform: 'rotateX(90deg)',
                    boxShadow: '0 0 30px rgba(168, 85, 247, 0.3)'
                  }}
                />
              </motion.div>

              {/* Inner rotating ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                className="absolute"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div
                  className="w-36 h-36 rounded-full border border-white/20"
                  style={{
                    transform: 'rotateX(90deg) rotateY(45deg)',
                    boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)'
                  }}
                />
              </motion.div>

              {/* Floating particles around center */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full"
                  initial={{
                    x: (Math.random() - 0.5) * 200,
                    y: (Math.random() - 0.5) * 200,
                    z: (Math.random() - 0.5) * 100
                  }}
                  animate={{
                    x: [(Math.random() - 0.5) * 200, (Math.random() - 0.5) * 200],
                    y: [(Math.random() - 0.5) * 200, (Math.random() - 0.5) * 200],
                    z: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100],
                    scale: [0.5, 1, 0.5],
                    opacity: [0.3, 1, 0.3]
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  style={{
                    filter: 'blur(1px)',
                    boxShadow: '0 0 10px rgba(255,255,255,0.5)'
                  }}
                />
              ))}
            </div>

            {/* Loading Steps with 3D cards */}
            <div className="grid grid-cols-5 gap-2 mb-8">
              {loadingSteps.map((step, index) => {
                const Icon = step.icon
                const isActive = index === currentStep
                const isCompleted = index < currentStep

                return (
                  <motion.div
                    key={index}
                    initial={{ y: 50, opacity: 0, rotateX: -90 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                    transition={{ delay: index * 0.1, type: 'spring' }}
                    className={`relative flex flex-col items-center gap-2 p-3 rounded-xl backdrop-blur-sm transition-all ${
                      isActive
                        ? 'bg-white/20 scale-110 shadow-2xl shadow-white/20 z-10'
                        : isCompleted
                        ? 'bg-white/10 opacity-60'
                        : 'bg-white/5 opacity-30'
                    }`}
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: isActive ? 'translateZ(30px)' : 'translateZ(0)'
                    }}
                  >
                    <motion.div
                      animate={isActive ? { rotate: 360, scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                      className={`flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br ${step.color} shadow-lg`}
                    >
                      <Icon className="text-white text-lg" />
                    </motion.div>
                    <span className="text-white text-xs font-medium text-center">{step.text}</span>
                    {isCompleted && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center"
                      >
                        <FaCheck className="text-white text-xs" />
                      </motion.div>
                    )}
                  </motion.div>
                )
              })}
            </div>

            {/* Circular Progress Ring */}
            <div className="relative flex justify-center mb-6">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="8"
                  fill="none"
                />
                <motion.circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: progress / 100 }}
                  transition={{ duration: 0.1 }}
                  style={{
                    filter: 'drop-shadow(0 0 10px rgba(168, 85, 247, 0.5))'
                  }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="50%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.span
                  className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  {Math.round(progress)}
                </motion.span>
              </div>
            </div>

            {/* Linear Progress Bar */}
            <div className="relative h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
                style={{
                  boxShadow: '0 0 30px rgba(168, 85, 247, 0.6)'
                }}
              />
              <motion.div
                className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-transparent via-white/50 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
