import { getAllPosts } from '@/lib/posts'
import { siteConfig } from '@/lib/metadata'

// Escape XML special characters to prevent XML injection (A03)
function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

// Sanitize slug for use in URLs — only allow safe characters
function safeSlug(slug: string): string {
  return slug.replace(/[^a-zA-Z0-9\-_]/g, '')
}

export async function GET() {
  const posts = getAllPosts()
  const base = siteConfig.url

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.name)}</title>
    <link>${escapeXml(base)}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>en-ng</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${escapeXml(base)}/feed.xml" rel="self" type="application/rss+xml"/>
    ${posts.map(post => {
      const slug = safeSlug(post.slug)
      const postUrl = `${base}/blog/${slug}`
      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${escapeXml(postUrl)}</link>
      <guid isPermaLink="true">${escapeXml(postUrl)}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      ${post.cve ? `<category>${escapeXml(post.cve)}</category>` : ''}
      ${post.tags?.map(t => `<category>${escapeXml(t)}</category>`).join('') || ''}
    </item>`
    }).join('')}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}
