import { useState, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import AIResourceSection from './components/AIResourceSection'
import GameSection from './components/GameSection'
import StarredSection from './components/StarredSection'

// 工具主页 URL
const WEB_TOOLS_URL = 'https://earthchen.github.io/web-tools/'

function App() {
  const [isDark, setIsDark] = useState(false)

  // 检测系统主题偏好
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    if (prefersDark) {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className={`min-h-screen gradient-bg ${isDark ? 'dark' : ''}`}>
      <div className="min-h-screen flex flex-col">
        {/* 跳过导航链接 - 无障碍 */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded"
        >
          跳到主要内容
        </a>

        <Header isDark={isDark} onToggleTheme={toggleTheme} />

        <main id="main-content" className="flex-1 max-w-6xl mx-auto px-4 py-12 w-full">
          {/* Hero 欢迎区域 */}
          <section className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-wrap-balance">
              EarthChen 的个人主页
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto text-wrap-pretty">
              AI 资源、实用工具与开源项目收藏
            </p>
          </section>

          {/* AI 资源模块 */}
          <AIResourceSection />

          {/* 游戏模块 */}
          <GameSection />

          {/* 工具集入口 */}
          <section id="tools" className="mb-16 scroll-mt-20">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 text-wrap-balance">
              工具集
            </h2>
            <p className="text-white/70 mb-8">
              免费、实用、高效的在线工具
            </p>

            <a
              href={WEB_TOOLS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block glass rounded-2xl p-8 hover:scale-[1.02] transition-all duration-300 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">在线工具集</h3>
                    <p className="text-white/70">
                      证件照处理、PDF 转换、JSON 工具、CSV/Excel 互转等实用工具
                    </p>
                  </div>
                </div>
                <div className="text-white/60 group-hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </a>
          </section>

          {/* GitHub Star 项目模块 */}
          <StarredSection />
        </main>

        <Footer />
      </div>
    </div>
  )
}

export default App
