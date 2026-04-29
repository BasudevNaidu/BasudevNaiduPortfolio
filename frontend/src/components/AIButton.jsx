import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaRobot, FaTimes, FaMagic, FaBrain, FaLightbulb, FaCode, FaImage, FaSpinner, FaExpand, FaCompress } from 'react-icons/fa'
import { sendChatMessage, generateIdea } from '../services/aiService'

export default function AIButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('chat')
  const [chatInput, setChatInput] = useState('')
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: '👋 Hi! I\'m your AI assistant. Ask me anything or try the other tools!' }
  ])
  const [isChatLoading, setIsChatLoading] = useState(false)
  const [ideaLoading, setIdeaLoading] = useState(null)
  const [ideaResult, setIdeaResult] = useState(null)
  const [modalSize, setModalSize] = useState({ width: 400, height: 500 })
  const [isExpanded, setIsExpanded] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const modalRef = useRef(null)

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
    setIsResizing(true)
    const startX = e.clientX
    const startY = e.clientY
    const startWidth = modalSize.width
    const startHeight = modalSize.height

    const handleMouseMove = (moveEvent) => {
      const newWidth = Math.max(350, startWidth + (moveEvent.clientX - startX))
      const newHeight = Math.max(400, startHeight + (moveEvent.clientY - startY))
      setModalSize({ width: newWidth, height: newHeight })
    }

    const handleMouseUp = () => {
      setIsResizing(false)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const toggleExpand = () => {
    if (isExpanded) {
      setModalSize({ width: 400, height: 500 })
      setIsExpanded(false)
    } else {
      setModalSize({ width: window.innerWidth * 0.8, height: window.innerHeight * 0.8 })
      setIsExpanded(true)
    }
  }

  return (
    <>
      {/* Floating AI Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-[1000] flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-accent-pink text-white shadow-2xl"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          y: [0, -8, 0],
          boxShadow: [
            '0 0 0 0 rgba(91, 102, 255, 0.4)',
            '0 0 0 20px rgba(91, 102, 255, 0)',
            '0 0 0 0 rgba(91, 102, 255, 0)',
          ],
        }}
        transition={{
          y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
          boxShadow: { duration: 2, repeat: Infinity },
        }}
      >
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full border-2 border-white/30"
        />
        <FaRobot className="text-2xl relative z-10" />
      </motion.button>

      {/* AI Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              style={{ width: modalSize.width, height: modalSize.height }}
              className="fixed bottom-24 right-8 z-[1000] rounded-2xl bg-white/95 backdrop-blur-xl shadow-2xl border border-brand-200/50 flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-brand-100/60 p-4 flex-shrink-0">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-accent-pink text-white"
                  >
                    <FaRobot className="text-lg" />
                  </motion.div>
                  <div>
                    <h3 className="font-display font-semibold text-brand-900">AI Assistant</h3>
                    <p className="text-xs text-brand-700/60">Powered by magic ✨</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleExpand}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-brand-700 transition hover:bg-brand-200"
                    title={isExpanded ? 'Compress' : 'Expand'}
                  >
                    {isExpanded ? <FaCompress /> : <FaExpand />}
                  </motion.button>
                  <motion.button
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(false)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-brand-700 transition hover:bg-brand-200"
                  >
                    <FaTimes />
                  </motion.button>
                </div>
              </div>

              {/* Tool Tabs */}
              <div className="flex gap-2 p-4 overflow-x-auto flex-shrink-0">
                {tools.map((tool) => (
                  <motion.button
                    key={tool.id}
                    onClick={() => setActiveTab(tool.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex flex-col items-center gap-1 rounded-xl p-3 transition ${
                      activeTab === tool.id
                        ? `bg-gradient-to-br ${tool.color} text-white shadow-lg`
                        : 'bg-brand-50 text-brand-700 hover:bg-brand-100'
                    }`}
                  >
                    <tool.icon className="text-lg" />
                    <span className="text-[10px] font-medium">{tool.label}</span>
                  </motion.button>
                ))}
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto p-4">
                {activeTab === 'chat' && (
                  <div className="flex flex-col h-full space-y-3">
                    <div className="flex-1 overflow-y-auto space-y-2 min-h-[200px]">
                      {chatMessages.map((msg, i) => (
                        <div
                          key={i}
                          className={`rounded-xl p-3 ${
                            msg.role === 'user'
                              ? 'bg-brand-500 text-white ml-8'
                              : 'bg-brand-50 text-brand-700 mr-8'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap break-words">{msg.content}</p>
                        </div>
                      ))}
                      {isChatLoading && (
                        <div className="rounded-xl bg-brand-50 p-3 mr-8">
                          <div className="flex items-center gap-2 text-brand-700">
                            <FaSpinner className="animate-spin" />
                            <span className="text-sm">Thinking...</span>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2 pt-2 border-t border-brand-100/60 flex-shrink-0">
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Ask me anything..."
                        className="flex-1 rounded-full border border-brand-200 px-4 py-2 text-sm focus:outline-none focus:border-brand-500"
                        disabled={isChatLoading}
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSendMessage}
                        disabled={isChatLoading}
                        className="rounded-full bg-gradient-to-r from-brand-500 to-accent-pink px-4 py-2 text-white text-sm font-medium disabled:opacity-50"
                      >
                        {isChatLoading ? <FaSpinner className="animate-spin" /> : 'Send'}
                      </motion.button>
                    </div>
                  </div>
                )}

                {activeTab === 'magic' && (
                  <div className="space-y-3">
                    <textarea
                      placeholder="Enter text to transform..."
                      className="w-full rounded-xl border border-brand-200 p-3 text-sm focus:outline-none focus:border-brand-500 resize-none h-24"
                    />
                    <div className="flex gap-2 flex-wrap">
                      {['Summarize', 'Expand', 'Rewrite', 'Translate'].map((action) => (
                        <motion.button
                          key={action}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="rounded-full bg-brand-100 px-3 py-1 text-xs font-medium text-brand-700 hover:bg-brand-200 transition"
                        >
                          {action}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'brain' && (
                  <div className="space-y-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleGenerateIdea('random')}
                      disabled={ideaLoading === 'random'}
                      className="w-full rounded-xl bg-gradient-to-r from-accent-sky to-brand-400 p-4 text-white text-left disabled:opacity-50"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {ideaLoading === 'random' ? <FaSpinner className="animate-spin" /> : <FaLightbulb className="text-yellow-300" />}
                        <span className="font-medium">Random Idea</span>
                      </div>
                      <p className="text-xs opacity-90">Get a creative project idea</p>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleGenerateIdea('feature')}
                      disabled={ideaLoading === 'feature'}
                      className="w-full rounded-xl bg-gradient-to-r from-accent-pink to-accent-peach p-4 text-white text-left disabled:opacity-50"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {ideaLoading === 'feature' ? <FaSpinner className="animate-spin" /> : <FaMagic className="text-white" />}
                        <span className="font-medium">Feature Suggestion</span>
                      </div>
                      <p className="text-xs opacity-90">Get feature ideas for your projects</p>
                    </motion.button>
                    {ideaResult && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-xl bg-brand-50 p-4 text-sm text-brand-700 whitespace-pre-wrap"
                      >
                        {ideaResult}
                      </motion.div>
                    )}
                  </div>
                )}

                {activeTab === 'code' && (
                  <div className="space-y-3">
                    <textarea
                      placeholder="Describe what you want to build..."
                      className="w-full rounded-xl border border-brand-200 p-3 text-sm focus:outline-none focus:border-brand-500 resize-none h-24 font-mono"
                    />
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full rounded-xl bg-gradient-to-r from-brand-400 to-accent-mint p-3 text-white font-medium text-sm"
                    >
                      <FaCode className="inline mr-2" />
                      Generate Code
                    </motion.button>
                  </div>
                )}

                {activeTab === 'image' && (
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Describe an image..."
                      className="w-full rounded-xl border border-brand-200 px-4 py-3 text-sm focus:outline-none focus:border-brand-500"
                    />
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full rounded-xl bg-gradient-to-r from-accent-peach to-brand-500 p-3 text-white font-medium text-sm"
                    >
                      <FaImage className="inline mr-2" />
                      Generate Image
                    </motion.button>
                    <div className="grid grid-cols-2 gap-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="aspect-square rounded-lg bg-gradient-to-br from-brand-100 to-accent-pink/20 animate-pulse"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Resize Handle */}
              <div
                onMouseDown={handleResizeStart}
                className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize flex items-center justify-center hover:bg-brand-100/50 rounded-tl-lg"
              >
                <div className="w-2 h-2 border-r-2 border-b-2 border-brand-400 rotate-45" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
