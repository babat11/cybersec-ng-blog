import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'
import { siteConfig } from '@/lib/metadata'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
  const base = siteConfig.url

  const staticPages = [
    { url: base, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${base}/privacy-policy`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${base}/disclaimer`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
  ]

  const postPages = posts.map(post => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...postPages]
}
