import { getAllPosts } from '@/lib/posts'
import { generateMetadata } from '@/lib/metadata'
import PostCard from '@/components/PostCard'
import Link from 'next/link'

export const metadata = generateMetadata({
  title: 'Threat Intelligence Blog',
  description: 'All cybersecurity advisories, CVE disclosures, and threat reports from CyberSec NG.',
  path: '/blog',
})

// Maps URL category slugs to tag values used in post frontmatter
const CATEGORY_MAP: Record<string, { label: string; tags: string[] }> = {
  vulnerabilities: { label: 'Vulnerabilities & CVEs', tags: ['cve', 'patch', 'rce', 'vulnerability'] },
  fraud: { label: 'Fraud & Scams', tags: ['fraud', 'scam', 'pos', 'atm', 'financial'] },
  news: { label: 'News & Roundups', tags: ['news', 'roundup'] },
  'case-studies': { label: 'Case Studies', tags: ['case-study', 'incident'] },
  'how-to': { label: 'How-To & Tutorials', tags: ['how-to', 'tutorial', 'guide'] },
  career: { label: 'Career & Certifications', tags: ['career', 'certification'] },
  'deep-dives': { label: 'Deep Dives & Explainers', tags: ['deep-dive', 'explainer'] },
  'tool-reviews': { label: 'Tool Reviews', tags: ['tools', 'review'] },
}

interface Props {
  searchParams: Promise<{ category?: string }>
}

export default async function BlogPage({ searchParams }: Props) {
  const { category } = await searchParams
  const allPosts = getAllPosts()

  const activeCategory = category && CATEGORY_MAP[category] ? CATEGORY_MAP[category] : null
  const posts = activeCategory
    ? allPosts.filter(p => p.tags?.some(t => activeCategory.tags.includes(t)))
    : allPosts

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'CyberSec NG Threat Blog',
    url: 'https://cybersec-ng.vercel.app/blog',
    description: 'Cybersecurity threat intelligence for Nigeria, UK, and US defenders.',
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }} />

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-10">
          <div className="font-mono text-xs text-cyber-accent mb-2">// THREAT DATABASE</div>
          <h1 className="font-mono text-2xl font-bold text-white mb-2">
            ls -la /threats{activeCategory ? `/${category}` : ''}{' '}
            <span className="text-cyber-muted text-base font-normal">({posts.length} {posts.length === 1 ? 'post' : 'posts'})</span>
          </h1>
          <p className="text-cyber-muted text-sm">
            {activeCategory ? `Filtered by: ${activeCategory.label}` : 'Sorted by date descending. All categories included.'}
          </p>
          {activeCategory && (
            <Link href="/blog" className="inline-flex items-center gap-1 mt-3 font-mono text-xs text-cyber-accent hover:underline">
              ✕ clear filter
            </Link>
          )}
        </div>

        {/* AdSense slot placeholder */}
        {/* <ins className="adsbygoogle" style={{ display: 'block' }} data-ad-client="ca-pub-XXXXXXXXXX" data-ad-slot="XXXXXXXXXX" /> */}

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map(post => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="terminal-window p-12 text-center">
            <p className="font-mono text-cyber-muted">
              {activeCategory
                ? `// No posts tagged for "${activeCategory.label}" yet. Check back soon.`
                : '// No posts found. Add .mdx files to /content/posts/'}
            </p>
          </div>
        )}
      </div>
    </>
  )
}
