import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  FaLinkedin,
  FaInstagram,
  FaTelegramPlane,
  FaEnvelope,
  FaArrowRight,
  FaPaperPlane,
} from 'react-icons/fa'
import { CONTACTS } from '../data'
import { SectionTitle } from './About'

const ICONS = {
  LinkedIn: FaLinkedin,
  Instagram: FaInstagram,
  Telegram: FaTelegramPlane,
  Email: FaEnvelope,
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('')

    try {
      // Create mailto link
      const subject = encodeURIComponent(`Message from ${formData.name}`)
      const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)
      const mailtoLink = `mailto:basudevnaidu@example.com?subject=${subject}&body=${body}`
      
      // Open email client
      window.location.href = mailtoLink
      
      setSubmitStatus('success')
      setTimeout(() => {
        setSubmitStatus('')
        setFormData({ name: '', email: '', message: '' })
      }, 2000)
    } catch (error) {
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus(''), 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="relative px-6 py-28 sm:pl-28 sm:pr-10">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="say hello" title="Get in Touch" />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-4 max-w-xl text-base text-brand-700/80"
        >
          Have a project in mind? Want to collaborate or just say hello? 
          Fill out the form below and I'll get back to you as soon as possible.
        </motion.p>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 rounded-3xl bg-white/70 p-8 backdrop-blur sm:p-12"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Name Input */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-brand-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-brand-200 bg-white/90 backdrop-blur-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
                  placeholder="John Doe"
                />
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-brand-700 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-brand-200 bg-white/90 backdrop-blur-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            {/* Message Textarea */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-brand-700 mb-2">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={5}
                className="w-full px-4 py-3 rounded-xl border border-brand-200 bg-white/90 backdrop-blur-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all resize-none"
                placeholder="Tell me about your project idea..."
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
              whileTap={{ scale: isSubmitting ? 0.95 : 0.98 }}
              className="w-full rounded-xl bg-gradient-to-r from-brand-500 via-accent-pink to-accent-peach px-6 py-4 text-base font-semibold text-white shadow-glow transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="h-5 w-5 rounded-full border-2 border-white/30"
                  />
                  Sending...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <FaPaperPlane className="text-xl" />
                  Send Message
                </span>
              )}
            </motion.button>

            {/* Status Messages */}
            {submitStatus && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 p-4 rounded-xl text-center ${
                  submitStatus === 'success' 
                    ? 'bg-green-100 text-green-700 border border-green-200' 
                    : 'bg-red-100 text-red-700 border border-red-200'
                }`}
              >
                {submitStatus === 'success' ? (
                  <>
                    <div className="text-lg font-semibold mb-1">✅ Message Sent Successfully!</div>
                    <div className="text-sm">Thank you for reaching out. I'll get back to you soon.</div>
                  </>
                ) : (
                  <>
                    <div className="text-lg font-semibold mb-1">❌ Failed to Send Message</div>
                    <div className="text-sm">Please try again or contact me directly.</div>
                  </>
                )}
              </motion.div>
            )}
          </form>
        </motion.div>

        {/* Social Links */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {CONTACTS.map((c, i) => {
            const Icon = ICONS[c.name]
            const external = c.url.startsWith('http')
            return (
              <motion.a
                key={c.name}
                href={c.url}
                target={external ? '_blank' : undefined}
                rel={external ? 'noreferrer' : undefined}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -8, rotate: 0.4 }}
                className="glass-strong shadow-soft group relative overflow-hidden rounded-3xl p-6"
              >
                <div
                  className={`pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gradient-to-br ${c.color} opacity-25 blur-3xl transition group-hover:opacity-50`}
                />
                <div className="relative flex items-center gap-5">
                  <motion.div
                    whileHover={{ rotate: 12, scale: 1.1 }}
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${c.color} text-2xl text-white shadow-glow`}
                  >
                    <Icon />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-bold text-brand-900">
                      {c.name}
                    </h3>
                    <p className="font-mono text-sm text-brand-700/80">
                      {c.handle}
                    </p>
                  </div>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-900 text-white transition group-hover:scale-110 group-hover:bg-accent-pink">
                    <FaArrowRight className="transition group-hover:translate-x-0.5" />
                  </span>
                </div>
              </motion.a>
            )
          })}
        </div>

        {/* Big quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 rounded-3xl bg-gradient-to-r from-brand-500 via-accent-pink to-accent-peach p-1 shadow-glow"
        >
          <div className="rounded-3xl bg-white/90 p-8 text-center backdrop-blur sm:p-12">
            <p className="font-display text-2xl font-semibold leading-snug text-brand-900 sm:text-3xl">
              "Let's build something{' '}
              <span className="text-gradient">extraordinary</span> together."
            </p>
            <p className="mt-3 text-sm text-brand-700/70">
              — Naidu Basudev
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
