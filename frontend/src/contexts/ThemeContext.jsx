import React, { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light')
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  const toggleTheme = () => {
    setIsTransitioning(true)
    const newTheme = theme === 'light' ? 'dark' : 'light'
    
    // Add transition class for smooth theme switching
    document.body.classList.add('theme-transition')
    
    setTimeout(() => {
      setTheme(newTheme)
      localStorage.setItem('theme', newTheme)
      document.documentElement.setAttribute('data-theme', newTheme)
      
      // Remove transition class after animation completes
      setTimeout(() => {
        document.body.classList.remove('theme-transition')
        setIsTransitioning(false)
      }, 600)
    }, 100)
  }

  const value = {
    theme,
    toggleTheme,
    isTransitioning,
    isDark: theme === 'dark'
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}
