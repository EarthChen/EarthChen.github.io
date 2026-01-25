import { useState } from 'react'
import Header from './components/Header'
import ToolCard from './components/ToolCard'
import Footer from './components/Footer'

// 工具列表配置
const tools = [
  {
    id: 'photo-tools',
    title: '证件照处理工具',
    description: '智能抠图、背景替换、尺寸调整、体积压缩，一站式证件照处理',
    href: '/photo-tools/',
    icon: 'camera',
    gradient: 'from-blue-500 to-purple-600',
    linkText: '立即使用',
    linkColor: 'text-blue-300',
    external: false,
  },
  {
    id: 'pdf2png',
    title: 'PDF 转 PNG',
    description: '将 PDF 文档转换为高质量 PNG 图片，Python 命令行工具',
    href: 'https://github.com/EarthChen/pdf2png',
    icon: 'document',
    gradient: 'from-red-500 to-orange-600',
    linkText: '查看源码',
    linkColor: 'text-orange-300',
    external: true,
  },
]

function App() {
  const [isDark, setIsDark] = useState(false)

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className={`min-h-screen gradient-bg animate-gradient ${isDark ? 'dark' : ''}`}>
      <div className="min-h-screen flex flex-col">
        <Header isDark={isDark} onToggleTheme={toggleTheme} />

        <main className="flex-1 max-w-6xl mx-auto px-4 py-12">
          {/* 欢迎区域 */}
          <section className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-float">
              在线工具集
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              免费、实用、高效的在线工具，帮助您更轻松地完成各种任务
            </p>
          </section>

          {/* 工具卡片 */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {tools.map((tool) => (
              <ToolCard key={tool.id} {...tool} />
            ))}

            {/* 更多工具占位 */}
            <div className="glass rounded-2xl p-6 opacity-60">
              <div className="w-14 h-14 rounded-xl bg-gray-500/30 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white/70 mb-2">更多工具</h3>
              <p className="text-white/50 text-sm mb-4">敬请期待...</p>
              <div className="text-white/40 text-sm">即将推出</div>
            </div>
          </section>

          {/* 快速链接 */}
          <section className="text-center">
            <h2 className="text-2xl font-semibold text-white mb-6">其他链接</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://github.com/EarthChen"
                target="_blank"
                rel="noopener noreferrer"
                className="glass px-6 py-3 rounded-full text-white hover:bg-white/20 transition-colors"
              >
                GitHub
              </a>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  )
}

export default App
