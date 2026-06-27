import { NextRequest, NextResponse } from 'next/server'
import { getAllPosts } from '@/lib/posts'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const raw = searchParams.get('q') || ''

  // Sanitize: strip HTML chars, cap length (A03)
  const q = raw
    .replace(/[<>"'&]/g, '')
    .trim()
    .toLowerCase()
    .slice(0, 100) // max 100 chars — prevents ReDoS and oversized queries

  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] })
  }

  const posts = getAllPosts()
  const results = posts
    .filter(post =>
      post.title.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q) ||
      post.cve?.toLowerCase().includes(q) ||
      post.tags?.some(t => t.toLowerCase().includes(q)) ||
      post.content.toLowerCase().includes(q)
    )
    .slice(0, 8)
    .map(({ slug, title, threatLevel, cve, excerpt }) => ({
      slug, title, threatLevel, cve, excerpt,
    }))

  return NextResponse.json({ results })
}
