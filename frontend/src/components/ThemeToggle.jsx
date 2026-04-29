import React from 'react'
import { FaSun, FaMoon } from 'react-icons/fa'
import { useTheme } from '../contexts/ThemeContext'

export const ThemeToggle = () => {
  const { theme, toggleTheme, isTransitioning } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      disabled={isTransitioning}
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      className={`theme-toggle-btn ${
        theme === 'light'
          ? 'bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 text-white'
          : 'bg-gradient-to-r from-gray-800 to-gray-900 text-white'
      }`}
    >
      {theme === 'light' ? (
        <FaMoon className="text-lg" />
      ) : (
        <FaSun className="text-lg" />
      )}
    </button>
  )
}
