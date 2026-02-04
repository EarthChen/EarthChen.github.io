import React from 'react'

const icons = {
  camera: (
    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  document: (
    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 3v6h6" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6" />
    </svg>
  ),
  code: (
    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  table: (
    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18M3 6h18M3 18h18M8 6v12M16 6v12" />
    </svg>
  ),
}

function ToolCard({ title, description, href, icon, gradient, linkText, linkColor, external }) {
  const Tag = external ? 'a' : 'a'
  const linkProps = external
    ? { href, target: '_blank', rel: 'noopener noreferrer' }
    : { href }

  return (
    <Tag
      {...linkProps}
      className="group relative glass rounded-2xl p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl overflow-hidden cursor-pointer flex flex-col h-full"
    >
      {/* Background Glow Effect */}
      <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-500 rounded-full`} />
      
      {/* Icon Container */}
      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 relative z-10`}>
        {icons[icon]}
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-white mb-2 font-display tracking-wide group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all">
          {title}
        </h3>
        
        <p className="text-white/70 text-sm leading-relaxed mb-6 group-hover:text-white/90 transition-colors flex-1">
          {description}
        </p>

        <div className={`flex items-center ${linkColor} text-sm font-semibold tracking-wide mt-auto`}>
          <span className="relative">
            {linkText}
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full" />
          </span>
          <svg className="w-4 h-4 ml-2 group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
      
      {/* Shimmer Effect on Hover */}
      <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent z-20 pointer-events-none" />
    </Tag>
  )
}

export default ToolCard
