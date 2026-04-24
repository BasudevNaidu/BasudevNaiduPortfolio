import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaSun, FaMoon } from 'react-icons/fa'
import { useTheme } from '../contexts/ThemeContext'

export const ThemeToggle = () => {
  const { theme, toggleTheme, isTransitioning } = useTheme()

  return (
    <motion.button
      onClick={toggleTheme}
      disabled={isTransitioning}
      className={`fixed top-6 right-6 z-50 p-3 rounded-full transition-all duration-300 shadow-lg ${
        theme === 'light' 
          ? 'bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 text-white shadow-glow' 
          : 'bg-gradient-to-r from-gray-800 to-gray-900 text-white'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        width: '48px',
        height: '48px',
        borderRadius: '50%'
      }}
    >
      <AnimatePresence mode="wait">
        {theme === 'light' ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center w-full h-full"
          >
            <FaSun className="text-xl" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center w-full h-full"
          >
            <FaMoon className="text-xl" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Simple tooltip */}
      <div className="absolute top-full mt-2 right-0 px-2 py-1 text-xs font-medium rounded bg-gray-900 text-white whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      </div>
    </motion.button>
  )
}
