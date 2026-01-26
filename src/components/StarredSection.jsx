import { useState } from 'react'
import StarredProjectCard from './StarredProjectCard'
import starredData from '../data/starred.json'

// 分类图标映射
const categoryIcons = {
  'AI/ML': (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  '开发工具': (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  '前端': (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  '后端': (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
    </svg>
  ),
  'DevOps': (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
    </svg>
  ),
  '其他': (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
    </svg>
  ),
}

// 分类颜色映射
const categoryColors = {
  'AI/ML': 'from-purple-500 to-pink-500',
  '开发工具': 'from-amber-500 to-orange-500',
  '前端': 'from-blue-500 to-cyan-500',
  '后端': 'from-green-500 to-emerald-500',
  'DevOps': 'from-indigo-500 to-violet-500',
  '其他': 'from-gray-500 to-slate-500',
}

/**
 * 分类折叠面板
 */
function CategoryPanel({ category, data, defaultExpanded = false }) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)
  const [showAll, setShowAll] = useState(false)
  const repos = data?.repos || []
  const displayCount = 3
  const hasMore = repos.length > displayCount

  if (repos.length === 0) return null

  // 计算要显示的项目数量
  const visibleRepos = showAll ? repos : repos.slice(0, displayCount)

  return (
    <div className="glass rounded-2xl overflow-hidden">
      {/* 分类标题 */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/50"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${categoryColors[category] || categoryColors['其他']} flex items-center justify-center text-white`}>
            {categoryIcons[category] || categoryIcons['其他']}
          </div>
          <div className="text-left">
            <h3 className="text-white font-semibold">{category}</h3>
            <p className="text-white/60 text-sm">{repos.length} 个项目</p>
          </div>
        </div>
        <svg
          className={`w-5 h-5 text-white/60 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* 项目列表 */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}
      >
        <div className="px-4 pb-4 space-y-2">
          {visibleRepos.map((repo) => (
            <StarredProjectCard key={repo.fullName} {...repo} />
          ))}
        </div>

        {/* 展开更多按钮 - 仅在面板展开且有更多项目时显示 */}
        {hasMore && !showAll && (
          <div className="px-6 pb-4">
            <button
              onClick={() => setShowAll(true)}
              className="text-sm text-white/60 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded px-2 py-1"
            >
              展开全部 {repos.length} 个项目…
            </button>
          </div>
        )}

        {/* 收起按钮 - 仅在展开全部后显示 */}
        {hasMore && showAll && (
          <div className="px-6 pb-4">
            <button
              onClick={() => setShowAll(false)}
              className="text-sm text-white/60 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded px-2 py-1"
            >
              收起
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * Star 项目模块
 */
function StarredSection() {
  const categories = starredData?.categories || {}
  const categoryNames = Object.keys(categories)

  if (categoryNames.length === 0) {
    return (
      <section id="starred" className="mb-16 scroll-mt-20">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 text-wrap-balance">
          GitHub Star
        </h2>
        <p className="text-white/70 mb-8">
          我关注的开源项目
        </p>
        <div className="glass rounded-2xl p-8 text-center">
          <p className="text-white/60">暂无 Star 项目数据</p>
          <p className="text-white/40 text-sm mt-2">运行 npm run fetch-data 获取最新数据</p>
        </div>
      </section>
    )
  }

  // 定义分类顺序
  const categoryOrder = ['AI/ML', '开发工具', '前端', '后端', 'DevOps', '其他']
  const sortedCategories = categoryOrder.filter(cat => categories[cat])

  return (
    <section id="starred" className="mb-16 scroll-mt-20">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-wrap-balance">
          GitHub Star
        </h2>
        {starredData?.total > 0 && (
          <span className="text-white/60 text-sm">
            共 {starredData.total} 个项目
          </span>
        )}
      </div>
      <p className="text-white/70 mb-8">
        我关注的开源项目，按分类展示
      </p>

      <div className="space-y-4">
        {sortedCategories.map((category, index) => (
          <CategoryPanel
            key={category}
            category={category}
            data={categories[category]}
            defaultExpanded={index === 0}
          />
        ))}
      </div>

      {starredData?.fetchedAt && (
        <p className="text-white/40 text-xs mt-4 text-center">
          数据更新于: {new Date(starredData.fetchedAt).toLocaleDateString('zh-CN')}
        </p>
      )}
    </section>
  )
}

export default StarredSection
