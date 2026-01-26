import { useState, useEffect } from 'react'
import Header from './components/Header'
import ToolCard from './components/ToolCard'
import Footer from './components/Footer'
import AIResourceSection from './components/AIResourceSection'
import StarredSection from './components/StarredSection'

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

          {/* 工具集模块 */}
          <section id="tools" className="mb-16 scroll-mt-20">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 text-wrap-balance">
              工具集
            </h2>
            <p className="text-white/70 mb-8">
              免费、实用、高效的在线工具
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool) => (
                <ToolCard key={tool.id} {...tool} />
              ))}
            </div>
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
