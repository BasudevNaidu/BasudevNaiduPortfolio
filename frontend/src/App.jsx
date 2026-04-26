import React, { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import AnimatedBackground from './components/AnimatedBackground'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import { ThemeToggle } from './components/ThemeToggle'
import { Preloader } from './components/Preloader'
import { ThemeProvider } from './contexts/ThemeContext'
import Hero from './sections/Hero'
import About from './sections/About'
import Education from './sections/Education'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Coding from './sections/Coding'
import Certifications from './sections/Certifications'
import Contact from './sections/Contact'

function ProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 right-0 top-0 z-50 h-1 origin-left bg-gradient-to-r from-brand-500 via-accent-pink to-accent-peach"
    />
  )
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true)

  const handlePreloaderComplete = () => {
    setIsLoading(false)
  }

  return (
    <ThemeProvider>
      <Preloader onComplete={handlePreloaderComplete} />
      <div className={`relative min-h-screen font-body text-brand-900 transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <AnimatedBackground />
        <ProgressBar />
        <Sidebar />
        <ThemeToggle />

        <main>
          <Hero />
          <About />
          <Education />
          <Skills />
          <Projects />
          <Coding />
          <Certifications />
          <Contact />
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  )
}
