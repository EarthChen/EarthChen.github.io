/**
 * 游戏中心页面
 * 独立的游戏列表展示页面
 */

import { Link } from 'react-router-dom'

// 游戏列表配置
const games = [
  {
    id: 'daxigua',
    name: '合成大西瓜',
    description: '经典休闲游戏，相同水果碰撞合成更大水果，合成西瓜获得高分！',
    url: 'https://earthchen.github.io/daxigua/',
    icon: '🍉',
    color: 'from-green-500 to-emerald-600',
    tags: ['休闲益智', '在线游玩'],
  },
]

function GameCard({ game }) {
  return (
    <a
      href={game.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block glass rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 group"
    >
      <div className="flex flex-col items-center text-center">
        <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${game.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
          <span className="text-5xl" role="img" aria-label={game.name}>
            {game.icon}
          </span>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{game.name}</h3>
        <p className="text-white/70 text-sm mb-4 leading-relaxed">
          {game.description}
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {game.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  )
}

function GamesPage({ isDark, onToggleTheme }) {
  return (
    <div className={`min-h-screen gradient-bg ${isDark ? 'dark' : ''}`}>
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="glass sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link 
              to="/" 
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-xl">
                E
              </div>
              <span className="text-white font-semibold text-lg">EarthChen</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="text-white/80 hover:text-white transition-colors text-sm font-medium"
              >
                ← 返回首页
              </Link>
              <button
                onClick={onToggleTheme}
                className="text-white/80 hover:text-white transition-colors p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded"
                aria-label={isDark ? '切换到亮色模式' : '切换到暗色模式'}
              >
                {isDark ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 max-w-6xl mx-auto px-4 py-12 w-full">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <div className="text-6xl mb-4">🎮</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              游戏中心
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              休闲娱乐，放松一刻
            </p>
          </section>

          {/* Games Grid */}
          <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}

            {/* 更多游戏占位 */}
            <div className="glass rounded-2xl p-6 opacity-60 cursor-not-allowed">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-2xl bg-white/10 flex items-center justify-center mb-4">
                  <span className="text-5xl" role="img" aria-label="敬请期待">🚀</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">更多游戏</h3>
                <p className="text-white/70 text-sm mb-4">
                  正在开发中，敬请期待...
                </p>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-white/60 text-xs font-medium">
                  Coming Soon
                </span>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="glass mt-auto">
          <div className="max-w-6xl mx-auto px-4 py-6 text-center">
            <p className="text-white/60 text-sm">
              © 2024-2026 EarthChen. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default GamesPage
