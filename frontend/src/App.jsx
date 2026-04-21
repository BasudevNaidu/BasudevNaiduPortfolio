import React, { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import AnimatedBackground from './components/AnimatedBackground'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
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

function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])
  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-brand-500 mix-blend-multiply md:block"
        animate={{ x: pos.x, y: pos.y }}
        transition={{ type: 'spring', stiffness: 1000, damping: 35 }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-pink md:block"
        animate={{ x: pos.x, y: pos.y }}
        transition={{ type: 'spring', stiffness: 1500, damping: 40 }}
      />
    </>
  )
}

export default function App() {
  return (
    <div className="relative min-h-screen font-body text-brand-900">
      <AnimatedBackground />
      <ProgressBar />
      <Cursor />
      <Sidebar />

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
  )
}
