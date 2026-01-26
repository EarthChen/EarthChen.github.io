/**
 * Star 项目卡片组件
 */
function StarredProjectCard({ name, fullName, description, url, stars, language, owner }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group glass rounded-xl p-4 hover:bg-white/10 transition-all duration-200 cursor-pointer block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
    >
      <div className="flex items-start gap-3">
        {/* 头像 */}
        {owner?.avatar && (
          <img
            src={owner.avatar}
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 rounded-lg flex-shrink-0"
            loading="lazy"
          />
        )}

        <div className="flex-1 min-w-0">
          {/* 仓库名 */}
          <h4 className="text-white font-medium truncate group-hover:text-purple-300 transition-colors" title={fullName}>
            {fullName}
          </h4>

          {/* 描述 */}
          <p className="text-white/60 text-sm mt-1 line-clamp-2" title={description}>
            {description || '暂无描述'}
          </p>

          {/* 元信息 */}
          <div className="flex items-center gap-3 mt-2 text-xs text-white/50">
            {language && (
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-400" aria-hidden="true" />
                {language}
              </span>
            )}
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {stars?.toLocaleString() || 0}
            </span>
          </div>
        </div>

        {/* 外链图标 */}
        <svg className="w-4 h-4 text-white/40 group-hover:text-white/70 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </div>
    </a>
  )
}

export default StarredProjectCard
