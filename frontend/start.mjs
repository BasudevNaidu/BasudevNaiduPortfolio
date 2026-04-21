import { createConnection } from 'net'
import { execSync } from 'child_process'

// Try connecting as a TCP client — if connection succeeds, port is in use
function checkHost(port, host) {
  return new Promise((resolve) => {
    const socket = createConnection({ port, host })
    socket.setTimeout(500)
    socket.on('connect', () => { socket.destroy(); resolve(true) })
    socket.on('timeout', () => { socket.destroy(); resolve(false) })
    socket.on('error', () => resolve(false))
  })
}

// Check both IPv4 (127.0.0.1) and IPv6 (::1) — handles all Vite binding modes
async function isPortInUse(port) {
  const [ipv4, ipv6] = await Promise.all([
    checkHost(port, '127.0.0.1'),
    checkHost(port, '::1'),
  ])
  return ipv4 || ipv6
}

async function findAvailablePort(port) {
  if (await isPortInUse(port)) {
    console.log(`  ⚡ Port ${port} in use, trying ${port + 1}...`)
    return findAvailablePort(port + 1)
  }
  return port
}

const startPort = process.env.PORT ? Number(process.env.PORT) : 5173
const port = await findAvailablePort(startPort)

console.log(`\n  🚀 Portfolio dev server → http://localhost:${port}/\n`)

try {
  execSync(`npx vite --host 0.0.0.0 --port ${port} --strictPort`, {
    stdio: 'inherit',
    shell: true,
  })
} catch {
  process.exit(1)
}

