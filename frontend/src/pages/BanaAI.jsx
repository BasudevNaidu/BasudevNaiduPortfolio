import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaRobot, FaTimes, FaMagic, FaBrain, FaLightbulb, FaCode, FaImage, FaSpinner, FaArrowLeft, FaExpand } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { sendChatMessage, generateIdea } from '../services/aiService'

export default function BanaAI() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('chat')
  const [chatInput, setChatInput] = useState('')
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: '👋 Welcome to BanaAI! I\'m your intelligent assistant. Ask me anything or explore the other AI tools!' }
  ])
  const [isChatLoading, setIsChatLoading] = useState(false)
  const [ideaLoading, setIdeaLoading] = useState(null)
  const [ideaResult, setIdeaResult] = useState(null)
  const [modalSize, setModalSize] = useState({ width: 750, height: 600 })
  const [isExpanded, setIsExpanded] = useState(false)

  const tools = [
    { id: 'chat', icon: FaRobot, label: 'AI Chat', color: 'from-brand-500 to-accent-pink' },
    { id: 'magic', icon: FaMagic, label: 'Magic Text', color: 'from-accent-pink to-accent-peach' },
    { id: 'brain', icon: FaBrain, label: 'AI Ideas', color: 'from-accent-sky to-brand-400' },
    { id: 'code', icon: FaCode, label: 'Code Gen', color: 'from-brand-400 to-accent-mint' },
    { id: 'image', icon: FaImage, label: 'AI Art', color: 'from-accent-peach to-brand-500' },
  ]

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return

    const userMessage = { role: 'user', content: chatInput }
    setChatMessages(prev => [...prev, userMessage])
    setChatInput('')
    setIsChatLoading(true)

    try {
      const messages = chatMessages.map(m => ({ role: m.role, content: m.content }))
      messages.push(userMessage)
      
      const response = await sendChatMessage(messages)
      setChatMessages(prev => [...prev, { role: 'assistant', content: response }])
    } catch (error) {
      setChatMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' }])
    } finally {
      setIsChatLoading(false)
    }
  }

  const handleGenerateIdea = async (type) => {
    setIdeaLoading(type)
    setIdeaResult(null)

    try {
      const idea = await generateIdea(type)
      setIdeaResult(idea)
    } catch (error) {
      setIdeaResult('Sorry, something went wrong. Please try again.')
    } finally {
      setIdeaLoading(null)
    }
  }

  const handleResizeStart = (e) => {
    e.preventDefault()
    const startX = e.clientX
    const startY = e.clientY
    const startWidth = modalSize.width
    const startHeight = modalSize.height

    const handleMouseMove = (moveEvent) => {
      const newWidth = Math.max(400, startWidth + (moveEvent.clientX - startX))
      const newHeight = Math.max(500, startHeight + (moveEvent.clientY - startY))
      setModalSize({ width: newWidth, height: newHeight })
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const toggleExpand = () => {
    if (isExpanded) {
      setModalSize({ width: 500, height: 600 })
      setIsExpanded(false)
    } else {
      setModalSize({ width: window.innerWidth * 0.85, height: window.innerHeight * 0.85 })
      setIsExpanded(true)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-accent-pink/20 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-brand-300/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent-pink/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-accent-sky/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: 'spring' }}
        className="relative z-10 flex items-center px-8 py-6 pr-24"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-brand-700 hover:text-brand-900 transition"
        >
          <FaArrowLeft />
          <span className="font-medium">Back to Portfolio</span>
        </motion.button>
      </motion.header>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-100px)] px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: 'spring' }}
          style={{ width: modalSize.width, height: modalSize.height }}
          className="relative rounded-3xl bg-white/95 backdrop-blur-xl shadow-2xl border border-brand-200/50 flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-brand-100/60 p-6 flex-shrink-0 bg-gradient-to-r from-brand-50 to-accent-pink/20">
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-accent-pink text-white shadow-lg"
              >
                <FaRobot className="text-xl" />
              </motion.div>
              <div>
                <h1 className="font-display text-2xl font-bold text-brand-900">BanaAI</h1>
                <p className="text-sm text-brand-700/60">Your Intelligent Assistant</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleExpand}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-brand-700 transition hover:bg-brand-200"
                title={isExpanded ? 'Compress' : 'Expand'}
              >
                {isExpanded ? <FaTimes /> : <FaExpand />}
              </motion.button>
            </div>
          </div>

          {/* Tool Tabs */}
          <div className="flex gap-3 p-6 overflow-x-auto flex-shrink-0 border-b border-brand-100/60">
            {tools.map((tool) => (
              <motion.button
                key={tool.id}
                onClick={() => setActiveTab(tool.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex flex-col items-center gap-2 rounded-2xl p-4 transition min-w-[80px] ${
                  activeTab === tool.id
                    ? `bg-gradient-to-br ${tool.color} text-white shadow-lg`
                    : 'bg-brand-50 text-brand-700 hover:bg-brand-100'
                }`}
              >
                <tool.icon className="text-xl" />
                <span className="text-xs font-medium">{tool.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Content Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {activeTab === 'chat' && (
              <>
                {/* Messages — scrollable */}
                <div className="flex-1 overflow-y-auto p-6 space-y-3">
                  {chatMessages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`rounded-2xl p-4 ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-r from-brand-500 to-accent-pink text-white ml-12'
                          : 'bg-brand-50 text-brand-700 mr-12'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap break-words">{msg.content}</p>
                    </motion.div>
                  ))}
                  {isChatLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="rounded-2xl bg-brand-50 p-4 mr-12"
                    >
                      <div className="flex items-center gap-2 text-brand-700">
                        <FaSpinner className="animate-spin" />
                        <span className="text-sm">Thinking...</span>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Input — always pinned at bottom */}
                <div className="flex gap-3 px-6 py-4 border-t border-brand-100/60 flex-shrink-0 bg-white/80 backdrop-blur">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask me anything..."
                    className="flex-1 rounded-full border-2 border-brand-200 px-6 py-3 text-sm focus:outline-none focus:border-brand-500 transition"
                    disabled={isChatLoading}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSendMessage}
                    disabled={isChatLoading}
                    className="rounded-full bg-gradient-to-r from-brand-500 to-accent-pink px-6 py-3 text-white text-sm font-semibold disabled:opacity-50 shadow-lg"
                  >
                    {isChatLoading ? <FaSpinner className="animate-spin" /> : 'Send'}
                  </motion.button>
                </div>
              </>
            )}

            {/* Other tabs — scrollable content */}
            {activeTab !== 'chat' && (
              <div className="flex-1 overflow-y-auto p-6">
                {activeTab === 'magic' && (
                  <div className="space-y-4">
                    <textarea
                      placeholder="Enter text to transform..."
                      className="w-full rounded-2xl border-2 border-brand-200 p-4 text-sm focus:outline-none focus:border-brand-500 resize-none h-40 transition"
                    />
                    <div className="flex gap-3 flex-wrap">
                      {['Summarize', 'Expand', 'Rewrite', 'Translate'].map((action) => (
                        <motion.button
                          key={action}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="rounded-full bg-brand-100 px-4 py-2 text-sm font-medium text-brand-700 hover:bg-brand-200 transition"
                        >
                          {action}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'brain' && (
                  <div className="space-y-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleGenerateIdea('random')}
                      disabled={ideaLoading === 'random'}
                      className="w-full rounded-2xl bg-gradient-to-r from-accent-sky to-brand-400 p-6 text-white text-left disabled:opacity-50 shadow-lg"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        {ideaLoading === 'random' ? <FaSpinner className="animate-spin" /> : <FaLightbulb className="text-yellow-300" />}
                        <span className="font-semibold text-lg">Random Idea</span>
                      </div>
                      <p className="text-sm opacity-90">Get a creative project idea</p>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleGenerateIdea('feature')}
                      disabled={ideaLoading === 'feature'}
                      className="w-full rounded-2xl bg-gradient-to-r from-accent-pink to-accent-peach p-6 text-white text-left disabled:opacity-50 shadow-lg"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        {ideaLoading === 'feature' ? <FaSpinner className="animate-spin" /> : <FaMagic className="text-white" />}
                        <span className="font-semibold text-lg">Feature Suggestion</span>
                      </div>
                      <p className="text-sm opacity-90">Get feature ideas for your projects</p>
                    </motion.button>
                    {ideaResult && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-2xl bg-brand-50 p-6 text-sm text-brand-700 whitespace-pre-wrap border-2 border-brand-200"
                      >
                        {ideaResult}
                      </motion.div>
                    )}
                  </div>
                )}

                {activeTab === 'code' && (
                  <div className="space-y-4">
                    <textarea
                      placeholder="Describe what you want to build..."
                      className="w-full rounded-2xl border-2 border-brand-200 p-4 text-sm focus:outline-none focus:border-brand-500 resize-none h-40 font-mono transition"
                    />
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full rounded-2xl bg-gradient-to-r from-brand-400 to-accent-mint p-4 text-white font-semibold text-sm shadow-lg"
                    >
                      <FaCode className="inline mr-2" />
                      Generate Code
                    </motion.button>
                  </div>
                )}

                {activeTab === 'image' && (
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Describe an image..."
                      className="w-full rounded-2xl border-2 border-brand-200 px-6 py-4 text-sm focus:outline-none focus:border-brand-500 transition"
                    />
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full rounded-2xl bg-gradient-to-r from-accent-peach to-brand-500 p-4 text-white font-semibold text-sm shadow-lg"
                    >
                      <FaImage className="inline mr-2" />
                      Generate Image
                    </motion.button>
                    <div className="grid grid-cols-2 gap-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="aspect-square rounded-2xl bg-gradient-to-br from-brand-100 to-accent-pink/20 animate-pulse"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>  {/* end content area */}


          {/* Resize Handle */}
          <div
            onMouseDown={handleResizeStart}
            className="absolute bottom-0 right-0 w-6 h-6 cursor-se-resize flex items-center justify-center hover:bg-brand-100/50 rounded-tl-lg z-20"
          >
            <div className="w-3 h-3 border-r-2 border-b-2 border-brand-400 rotate-45" />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
