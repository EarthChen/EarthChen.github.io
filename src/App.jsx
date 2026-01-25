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
    description: '免费在线将 PDF 文档转换为高质量 PNG 图片，支持批量下载',
    href: '/pdf2png/',
    icon: 'document',
    gradient: 'from-red-500 to-orange-600',
    linkText: '立即使用',
    linkColor: 'text-orange-300',
    external: false,
  },
  {
    id: 'json-tools',
    title: 'JSON 工具集',
    description: '格式化、压缩、对比、JSONPath 查询、修复等一站式 JSON 处理工具',
    href: '/json-tools/',
    icon: 'code',
    gradient: 'from-green-500 to-teal-600',
    linkText: '立即使用',
    linkColor: 'text-green-300',
    external: false,
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
