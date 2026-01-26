import AIResourceCard from './AIResourceCard'
import aiResources from '../data/ai-resources.json'

/**
 * AI 资源模块
 */
function AIResourceSection() {
  if (!aiResources || aiResources.length === 0) {
    return null
  }

  return (
    <section id="ai-resources" className="mb-16 scroll-mt-20">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 text-wrap-balance">
        AI 资源
      </h2>
      <p className="text-white/70 mb-8">
        我的 AI 编程规则与 Agent 技能库
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {aiResources.map((resource) => (
          <AIResourceCard key={resource.name} {...resource} />
        ))}
      </div>
    </section>
  )
}

export default AIResourceSection
