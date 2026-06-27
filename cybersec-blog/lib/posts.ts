import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export type ThreatLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO'

export interface PostFrontmatter {
  title: string
  date: string
  threatLevel: ThreatLevel
  cve?: string
  excerpt: string
  image?: string
  tags?: string[]
  author?: string
}

export interface Post extends PostFrontmatter {
  slug: string
  readingTime: string
  content: string
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) return []
  const fileNames = fs.readdirSync(postsDirectory).filter(f => f.endsWith('.mdx'))

  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    const rt = readingTime(content)

    return {
      slug,
      ...(data as PostFrontmatter),
      readingTime: rt.text,
      content,
    }
  })

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// Sanitize slug to prevent path traversal attacks (A01)
function sanitizeSlug(slug: string): string | null {
  const clean = slug.replace(/[^a-zA-Z0-9\-_]/g, '')
  if (!clean || clean.length === 0 || clean.length > 200) return null
  const resolved = path.resolve(postsDirectory, `${clean}.mdx`)
  if (!resolved.startsWith(postsDirectory + path.sep)) return null
  return clean
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const safeSlug = sanitizeSlug(slug)
    if (!safeSlug) return null
    const fullPath = path.join(postsDirectory, `${safeSlug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    const rt = readingTime(content)

    return {
      slug: safeSlug,
      ...(data as PostFrontmatter),
      readingTime: rt.text,
      content,
    }
  } catch {
    return null
  }
}

export function getRelatedPosts(currentSlug: string, tags: string[] = [], limit = 3): Post[] {
  const allPosts = getAllPosts()
  return allPosts
    .filter(p => p.slug !== currentSlug)
    .filter(p => p.tags?.some(t => tags.includes(t)))
    .slice(0, limit)
}

export function getThreatLevelColor(level: ThreatLevel): string {
  const map: Record<ThreatLevel, string> = {
    CRITICAL: '#ff0040',
    HIGH: '#ff6b00',
    MEDIUM: '#ffaa00',
    LOW: '#00aaff',
    INFO: '#6b7280',
  }
  return map[level] || '#6b7280'
}

export function getThreatLevelBg(level: ThreatLevel): string {
  const map: Record<ThreatLevel, string> = {
    CRITICAL: 'bg-red-900/30 text-red-400 border-red-800',
    HIGH: 'bg-orange-900/30 text-orange-400 border-orange-800',
    MEDIUM: 'bg-yellow-900/30 text-yellow-400 border-yellow-800',
    LOW: 'bg-blue-900/30 text-blue-400 border-blue-800',
    INFO: 'bg-gray-900/30 text-gray-400 border-gray-700',
  }
  return map[level] || 'bg-gray-900/30 text-gray-400 border-gray-700'
}
