import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [currentLine, setCurrentLine] = useState(0)
  const [typingText, setTypingText] = useState('')

  const codeLines = [
    'import React from "react"',
    'const Portfolio = () => {',
    '  const [loading, setLoading] = useState(true)',
    '  useEffect(() => {',
    '    setTimeout(() => setLoading(false), 3000)',
    '  }, [])',
    '  return <div className="portfolio">Loading...</div>',
    '}'
  ]

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

    const typingTimer = setInterval(() => {
      setCurrentLine(prev => (prev + 1) % codeLines.length)
    }, 400)

    return () => {
      clearInterval(timer)
      clearInterval(typingTimer)
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
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0d1117] overflow-hidden font-mono"
        >
          {/* Matrix rain background */}
          <div className="absolute inset-0 overflow-hidden opacity-20">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-green-400 text-xs"
                initial={{ x: Math.random() * 100 + '%', y: '-100%' }}
                animate={{ y: '200%' }}
                transition={{
                  duration: 3 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 5
                }}
                style={{ left: `${Math.random() * 100}%` }}
              >
                {Array(20).fill(0).map(() => Math.random() > 0.5 ? '1' : '0').join('')}
              </motion.div>
            ))}
          </div>

          {/* Main terminal window */}
          <div className="relative z-10 w-full max-w-4xl mx-6">
            {/* Terminal header */}
            <div className="bg-[#161b22] rounded-t-lg border-b border-[#30363d] px-4 py-3 flex items-center gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27ca40]" />
              </div>
              <span className="text-gray-400 text-sm ml-4">portfolio.jsx — loading</span>
            </div>

            {/* Terminal body */}
            <div className="bg-[#0d1117] rounded-b-lg border border-[#30363d] p-6 min-h-[400px]">
              {/* Code display */}
              <div className="space-y-2 mb-8">
                {codeLines.map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center gap-3 ${index === currentLine ? 'bg-[#161b22] -mx-2 px-2 py-1 rounded' : ''}`}
                  >
                    <span className="text-gray-500 w-8 text-right">{index + 1}</span>
                    <span className="text-gray-400">{line}</span>
                    {index === currentLine && (
                      <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="text-green-400 ml-2"
                      >
                        ▌
                      </motion.span>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Loading indicators */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {/* File tree */}
                <div className="bg-[#161b22] rounded-lg p-4 border border-[#30363d]">
                  <div className="text-blue-400 text-xs mb-3 font-semibold">📁 src</div>
                  <div className="space-y-1 text-xs">
                    <div className="text-gray-400 flex items-center gap-2">
                      <span>📄</span> App.jsx
                    </div>
                    <div className="text-gray-400 flex items-center gap-2">
                      <span>📄</span> index.css
                    </div>
                    <div className="text-gray-400 flex items-center gap-2">
                      <span>📁</span> components
                    </div>
                    <div className="text-gray-400 flex items-center gap-2 pl-4">
                      <span>📄</span> Preloader.jsx
                    </div>
                  </div>
                </div>

                {/* Dependencies */}
                <div className="bg-[#161b22] rounded-lg p-4 border border-[#30363d]">
                  <div className="text-purple-400 text-xs mb-3 font-semibold">📦 Installing</div>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-green-400">✓</span> react
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-400">✓</span> framer-motion
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-400 animate-pulse">⟳</span> tailwindcss
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">○</span> react-icons
                    </div>
                  </div>
                </div>

                {/* Git status */}
                <div className="bg-[#161b22] rounded-lg p-4 border border-[#30363d]">
                  <div className="text-orange-400 text-xs mb-3 font-semibold">🔀 Git Status</div>
                  <div className="space-y-1 text-xs">
                    <div className="text-green-400">On branch main</div>
                    <div className="text-gray-400">Changes to be committed:</div>
                    <div className="text-gray-400 pl-2">new file: Preloader.jsx</div>
                    <div className="text-gray-400 pl-2">modified: App.jsx</div>
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="bg-[#161b22] rounded-lg p-4 border border-[#30363d]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-xs">Building portfolio...</span>
                  <span className="text-green-400 text-xs font-bold">{Math.round(progress)}%</span>
                </div>
                <div className="relative h-2 bg-[#0d1117] rounded-full overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  <motion.span
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    npm run build
                  </motion.span>
                </div>
              </div>
            </div>

            {/* Terminal footer */}
            <div className="bg-[#161b22] rounded-b-lg border-t border-[#30363d] px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-green-400">➜</span>
                <span className="text-gray-400">~/portfolio</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>UTF-8</span>
                <span>JavaScript</span>
                <span>React</span>
              </div>
            </div>
          </div>

          {/* Floating code symbols */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {['{ }', '< />', '[]', '()', '=>', '&&', '||', '...'].map((symbol, i) => (
              <motion.div
                key={i}
                className="absolute text-gray-600/20 text-4xl font-bold"
                initial={{
                  x: Math.random() * 100 + '%',
                  y: Math.random() * 100 + '%',
                  rotate: Math.random() * 360,
                  scale: 0
                }}
                animate={{
                  rotate: 360,
                  scale: [0, 1, 0],
                  opacity: [0, 0.3, 0]
                }}
                transition={{
                  duration: 5 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              >
                {symbol}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
