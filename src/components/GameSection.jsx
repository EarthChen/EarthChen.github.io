/**
 * 游戏模块组件
 * 展示可玩的在线小游戏
 */

// 游戏列表配置
const games = [
  {
    id: 'daxigua',
    name: '合成大西瓜',
    description: '经典休闲游戏，相同水果碰撞合成更大水果，合成西瓜获得高分！',
    url: 'https://earthchen.github.io/daxigua/',
    icon: '🍉',
    color: 'from-green-500 to-emerald-600',
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
      <div className="flex items-start gap-4">
        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${game.color} flex items-center justify-center flex-shrink-0`}>
          <span className="text-3xl" role="img" aria-label={game.name}>
            {game.icon}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-lg font-bold text-white truncate">{game.name}</h3>
            <div className="text-white/60 group-hover:text-white transition-colors flex-shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
          <p className="text-white/70 text-sm mt-1 line-clamp-2">{game.description}</p>
          <div className="mt-3">
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/10 text-white/80 text-xs">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              点击游玩
            </span>
          </div>
        </div>
      </div>
    </a>
  )
}

function GameSection() {
  return (
    <section id="games" className="mb-16 scroll-mt-20">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 text-wrap-balance">
        游戏
      </h2>
      <p className="text-white/70 mb-8">
        休闲娱乐，放松一刻
      </p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      {games.length === 0 && (
        <div className="glass rounded-2xl p-8 text-center">
          <p className="text-white/60">暂无游戏，敬请期待...</p>
        </div>
      )}
    </section>
  )
}

export default GameSection
