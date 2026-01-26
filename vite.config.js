import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { execSync } from 'child_process'

// 构建前获取 GitHub 数据的插件
const fetchGithubDataPlugin = () => ({
  name: 'fetch-github-data',
  buildStart() {
    if (process.env.NODE_ENV === 'production' || process.env.FETCH_DATA === 'true') {
      console.log('📦 Fetching GitHub data...')
      try {
        execSync('node scripts/fetch-github-data.js', { 
          stdio: 'inherit',
          env: { ...process.env, NODE_ENV: 'production' }
        })
      } catch (error) {
        console.warn('⚠️ Failed to fetch GitHub data, using cached data')
      }
    }
  }
})

export default defineConfig({
  plugins: [
    fetchGithubDataPlugin(),
    react(),
  ],
  base: '/',
  build: {
    outDir: 'dist',
  },
})
