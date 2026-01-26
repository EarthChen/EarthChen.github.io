/**
 * AI 资源卡片组件
 */
function AIResourceCard({ name, description, url, stars, language, topics }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group glass rounded-2xl p-6 hover:scale-105 transition-all duration-300 cursor-pointer block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
    >
      {/* 图标 */}
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      </div>

      {/* 标题 */}
      <h3 className="text-xl font-semibold text-white mb-2 truncate" title={name}>
        {name}
      </h3>

      {/* 描述 */}
      <p className="text-white/70 text-sm mb-4 line-clamp-2" title={description}>
        {description || '暂无描述'}
      </p>

      {/* 元信息 */}
      <div className="flex items-center gap-4 text-xs text-white/60 mb-3">
        {language && (
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-purple-400" aria-hidden="true" />
            {language}
          </span>
        )}
        {stars > 0 && (
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {stars}
          </span>
        )}
      </div>

      {/* 标签 */}
      {topics && topics.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {topics.slice(0, 4).map((topic) => (
            <span
              key={topic}
              className="px-2 py-0.5 text-xs bg-white/10 text-white/70 rounded-full"
            >
              {topic}
            </span>
          ))}
        </div>
      )}

      {/* 链接提示 */}
      <div className="flex items-center text-purple-300 text-sm font-medium mt-4">
        查看仓库
        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </div>
    </a>
  )
}

export default AIResourceCard
