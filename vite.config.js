import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const ASSET_FOLDERS = ['Home', 'Logo&Icon', 'Image', 'Edit Profile']

function rewriteAssetPaths(base) {
  if (base === '/') return null
  const trimmed = base.replace(/\/$/, '')
  const folderPattern = ASSET_FOLDERS.map(f => f.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')
  const re = new RegExp(`(['"\`])\\/(?:${folderPattern})\\/`, 'g')
  return {
    name: 'rewrite-asset-paths',
    apply: 'build',
    renderChunk(code) {
      if (!re.test(code)) return null
      re.lastIndex = 0
      return { code: code.replace(re, (m, q) => `${q}${trimmed}${m.slice(1)}`), map: null }
    },
  }
}

export default defineConfig(({ command }) => {
  const base = command === 'build' ? '/tk-platform-demo/' : '/'
  return {
    plugins: [vue(), rewriteAssetPaths(base)].filter(Boolean),
    base,
    server: {
      port: 5173,
      proxy: {
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true,
        },
        '/video-lists': {
          target: 'http://localhost:3001',
          changeOrigin: true,
        },
      },
    },
  }
})
