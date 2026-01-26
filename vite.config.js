import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { execSync } from 'child_process'
import path from 'path'
import fs from 'fs'

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

// 子应用目录列表
const subApps = ['photo-tools', 'pdf2png', 'json-tools']

// 开发模式下处理子应用路由的插件
const subAppRoutingPlugin = () => ({
  name: 'sub-app-routing',
  configureServer(server) {
    // 在中间件之前处理子应用路由
    server.middlewares.use((req, res, next) => {
      const url = req.url || ''
      
      for (const app of subApps) {
        if (url.startsWith(`/${app}/`) || url === `/${app}`) {
          // 检查子应用的 dist 目录是否存在
          const distPath = path.join(process.cwd(), app, 'dist')
          const distIndexPath = path.join(distPath, 'index.html')
          
          if (fs.existsSync(distPath) && fs.existsSync(distIndexPath)) {
            // 如果 dist 存在，服务构建后的文件
            const filePath = url === `/${app}` || url === `/${app}/` 
              ? distIndexPath 
              : path.join(distPath, url.replace(`/${app}`, ''))
            
            if (fs.existsSync(filePath)) {
              const content = fs.readFileSync(filePath)
              const ext = path.extname(filePath)
              const mimeTypes = {
                '.html': 'text/html',
                '.js': 'application/javascript',
                '.css': 'text/css',
                '.json': 'application/json',
                '.png': 'image/png',
                '.jpg': 'image/jpeg',
                '.svg': 'image/svg+xml',
              }
              res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream')
              res.end(content)
              return
            }
          }
          
          // 如果 dist 不存在，重定向到子应用的开发服务器（如果运行的话）
          // 或者显示提示信息
          const devHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${app} - 开发模式</title>
  <style>
    body { font-family: system-ui; padding: 40px; text-align: center; background: #1e1b4b; color: white; }
    .card { background: rgba(255,255,255,0.1); padding: 30px; border-radius: 16px; max-width: 500px; margin: 0 auto; }
    code { background: rgba(0,0,0,0.3); padding: 4px 8px; border-radius: 4px; }
    a { color: #a78bfa; }
  </style>
</head>
<body>
  <div class="card">
    <h2>${app}</h2>
    <p>此工具需要单独启动开发服务器：</p>
    <p><code>cd ${app} && pnpm dev</code></p>
    <p>或者先构建：</p>
    <p><code>cd ${app} && pnpm build</code></p>
    <p><a href="/">← 返回首页</a></p>
  </div>
</body>
</html>`
          res.setHeader('Content-Type', 'text/html')
          res.end(devHtml)
          return
        }
      }
      next()
    })
  }
})

export default defineConfig({
  plugins: [
    fetchGithubDataPlugin(),
    subAppRoutingPlugin(),
    react(),
  ],
  base: '/',
  build: {
    outDir: 'dist',
  },
})
