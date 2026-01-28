import { useState } from 'react'

// 导航链接配置
const navLinks = [
  { id: 'ai-resources', label: 'AI 资源', href: '#ai-resources' },
  { id: 'tools', label: '工具集', href: 'https://earthchen.github.io/web-tools/', external: true },
  { id: 'games', label: '游戏', href: '#games' },
  { id: 'starred', label: 'Star 项目', href: '#starred' },
]

function Header({ isDark, onToggleTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleNavClick = (e, href) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <header className="glass sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <a 
          href="#" 
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          onClick={(e) => handleNavClick(e, '#')}
        >
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-xl">
            E
          </div>
          <span className="text-white font-semibold text-lg">EarthChen</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6" aria-label="主导航">
          {navLinks.map((link) => (
            link.external ? (
              <a
                key={link.id}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded px-2 py-1"
              >
                {link.label}
              </a>
            ) : (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-white/80 hover:text-white transition-colors text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded px-2 py-1"
              >
                {link.label}
              </a>
            )
          ))}
          
          <div className="flex items-center gap-2 ml-4 border-l border-white/20 pl-4">
            <a
              href="https://github.com/EarthChen"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition-colors p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded"
              aria-label="访问 GitHub 主页"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <button
              onClick={onToggleTheme}
              className="text-white/80 hover:text-white transition-colors p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded"
              aria-label={isDark ? '切换到亮色模式' : '切换到暗色模式'}
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white/80 hover:text-white transition-colors p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded"
          aria-label={isMenuOpen ? '关闭菜单' : '打开菜单'}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden glass border-t border-white/10" aria-label="移动端导航">
          <div className="max-w-6xl mx-auto px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              link.external ? (
                <a
                  key={link.id}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-white/80 hover:text-white hover:bg-white/10 transition-colors text-sm font-medium px-3 py-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                >
                  {link.label}
                </a>
              ) : (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="block text-white/80 hover:text-white hover:bg-white/10 transition-colors text-sm font-medium px-3 py-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                >
                  {link.label}
                </a>
              )
            ))}
            <div className="flex items-center gap-2 pt-2 border-t border-white/10">
              <a
                href="https://github.com/EarthChen"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded"
                aria-label="访问 GitHub 主页"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <button
                onClick={onToggleTheme}
                className="text-white/80 hover:text-white transition-colors p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded"
                aria-label={isDark ? '切换到亮色模式' : '切换到暗色模式'}
              >
                {isDark ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </nav>
      )}
    </header>
  )
}

export default Header
