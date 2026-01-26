/**
 * GitHub 数据获取脚本
 * 在构建时获取 AI 资源和 Star 项目数据
 */

import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_DIR = path.join(__dirname, '../src/data')

// GitHub API 配置
const GITHUB_API = 'https://api.github.com'
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || ''
const USERNAME = 'EarthChen'

// AI 资源仓库列表
const AI_REPOS = [
  { owner: 'EarthChen', repo: 'ai-rules' },
  { owner: 'EarthChen', repo: 'agent-skills' },
]

// Star 项目分类规则
const CATEGORIES = {
  'AI/ML': {
    keywords: ['ai', 'ml', 'llm', 'gpt', 'openai', 'claude', 'langchain', 'transformer', 'neural', 'machine-learning', 'deep-learning', 'chatgpt', 'copilot', 'agent', 'embedding', 'vector'],
    icon: 'brain',
  },
  '开发工具': {
    keywords: ['cli', 'tool', 'dev', 'developer', 'productivity', 'terminal', 'shell', 'editor', 'ide', 'utility', 'workflow'],
    icon: 'wrench',
  },
  '前端': {
    keywords: ['react', 'vue', 'next', 'frontend', 'css', 'ui', 'component', 'tailwind', 'svelte', 'angular', 'web', 'html', 'javascript', 'typescript', 'animation'],
    icon: 'browser',
  },
  '后端': {
    keywords: ['server', 'backend', 'api', 'database', 'sql', 'nosql', 'redis', 'postgres', 'mysql', 'mongodb', 'graphql', 'rest', 'microservice'],
    icon: 'server',
  },
  'DevOps': {
    keywords: ['docker', 'kubernetes', 'k8s', 'ci', 'cd', 'deploy', 'infrastructure', 'terraform', 'ansible', 'helm', 'container', 'cloud', 'aws', 'azure', 'gcp'],
    icon: 'cloud',
  },
  '其他': {
    keywords: [],
    icon: 'folder',
  },
}

/**
 * 获取请求头
 */
function getHeaders() {
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'EarthChen-Tools-Builder',
  }
  if (GITHUB_TOKEN) {
    headers['Authorization'] = `token ${GITHUB_TOKEN}`
  }
  return headers
}

/**
 * 获取单个仓库信息
 */
async function fetchRepoInfo(owner, repo) {
  try {
    const response = await fetch(`${GITHUB_API}/repos/${owner}/${repo}`, {
      headers: getHeaders(),
    })
    
    if (!response.ok) {
      console.warn(`Failed to fetch ${owner}/${repo}: ${response.status}`)
      return null
    }
    
    const data = await response.json()
    
    // 尝试获取 README 内容来提取更详细的描述
    let readme = ''
    try {
      const readmeResponse = await fetch(`${GITHUB_API}/repos/${owner}/${repo}/readme`, {
        headers: getHeaders(),
      })
      if (readmeResponse.ok) {
        const readmeData = await readmeResponse.json()
        const content = Buffer.from(readmeData.content, 'base64').toString('utf-8')
        // 提取第一段非标题的文本作为描述（最多200字符）
        const lines = content.split('\n').filter(line => 
          line.trim() && !line.startsWith('#') && !line.startsWith('!')
        )
        readme = lines.slice(0, 3).join(' ').slice(0, 200)
      }
    } catch (e) {
      // README 获取失败不影响主流程
    }
    
    return {
      name: data.name,
      fullName: data.full_name,
      description: data.description || readme || '暂无描述',
      url: data.html_url,
      stars: data.stargazers_count,
      forks: data.forks_count,
      language: data.language,
      topics: data.topics || [],
      updatedAt: data.updated_at,
      homepage: data.homepage,
    }
  } catch (error) {
    console.error(`Error fetching ${owner}/${repo}:`, error.message)
    return null
  }
}

/**
 * 获取用户 starred 项目
 */
async function fetchStarredRepos() {
  const repos = []
  let page = 1
  const perPage = 100
  
  try {
    // 获取最近 starred 的项目（按 star 时间排序）
    const response = await fetch(
      `${GITHUB_API}/users/${USERNAME}/starred?per_page=${perPage}&page=${page}&sort=created&direction=desc`,
      { headers: getHeaders() }
    )
    
    if (!response.ok) {
      console.warn(`Failed to fetch starred repos: ${response.status}`)
      return repos
    }
    
    const data = await response.json()
    
    for (const repo of data) {
      repos.push({
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description || '暂无描述',
        url: repo.html_url,
        stars: repo.stargazers_count,
        language: repo.language,
        topics: repo.topics || [],
        updatedAt: repo.updated_at,
        owner: {
          login: repo.owner.login,
          avatar: repo.owner.avatar_url,
        },
      })
    }
  } catch (error) {
    console.error('Error fetching starred repos:', error.message)
  }
  
  return repos
}

/**
 * 对项目进行分类
 */
function categorizeRepo(repo) {
  const searchText = [
    repo.name,
    repo.description,
    ...(repo.topics || []),
    repo.language,
  ].filter(Boolean).join(' ').toLowerCase()
  
  for (const [category, config] of Object.entries(CATEGORIES)) {
    if (category === '其他') continue
    
    const matched = config.keywords.some(keyword => 
      searchText.includes(keyword.toLowerCase())
    )
    
    if (matched) {
      return category
    }
  }
  
  return '其他'
}

/**
 * 对 starred 项目进行分类整理
 */
function categorizeStarredRepos(repos) {
  const categorized = {}
  
  // 初始化分类
  for (const category of Object.keys(CATEGORIES)) {
    categorized[category] = {
      icon: CATEGORIES[category].icon,
      repos: [],
    }
  }
  
  // 分类项目
  for (const repo of repos) {
    const category = categorizeRepo(repo)
    categorized[category].repos.push(repo)
  }
  
  // 移除空分类
  for (const category of Object.keys(categorized)) {
    if (categorized[category].repos.length === 0) {
      delete categorized[category]
    }
  }
  
  return categorized
}

/**
 * 主函数
 */
async function main() {
  console.log('🚀 Starting GitHub data fetch...')
  
  // 确保数据目录存在
  await fs.mkdir(DATA_DIR, { recursive: true })
  
  // 获取 AI 资源仓库信息
  console.log('📦 Fetching AI resource repos...')
  const aiResources = []
  for (const { owner, repo } of AI_REPOS) {
    const info = await fetchRepoInfo(owner, repo)
    if (info) {
      aiResources.push(info)
    }
  }
  
  // 写入 AI 资源数据
  await fs.writeFile(
    path.join(DATA_DIR, 'ai-resources.json'),
    JSON.stringify(aiResources, null, 2),
    'utf-8'
  )
  console.log(`✅ AI resources saved: ${aiResources.length} repos`)
  
  // 获取 starred 项目
  console.log('⭐ Fetching starred repos...')
  const starredRepos = await fetchStarredRepos()
  
  // 分类 starred 项目
  const categorizedStars = categorizeStarredRepos(starredRepos)
  
  // 写入 starred 数据
  await fs.writeFile(
    path.join(DATA_DIR, 'starred.json'),
    JSON.stringify({
      total: starredRepos.length,
      fetchedAt: new Date().toISOString(),
      categories: categorizedStars,
    }, null, 2),
    'utf-8'
  )
  console.log(`✅ Starred repos saved: ${starredRepos.length} repos`)
  
  // 输出分类统计
  console.log('\n📊 Category stats:')
  for (const [category, data] of Object.entries(categorizedStars)) {
    console.log(`   ${category}: ${data.repos.length} repos`)
  }
  
  console.log('\n✨ Done!')
}

main().catch(console.error)
