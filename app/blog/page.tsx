import { getAllPosts } from '@/lib/posts'
import { generateMetadata } from '@/lib/metadata'
import PostCard from '@/components/PostCard'

export const metadata = generateMetadata({
  title: 'Threat Intelligence Blog',
  description: 'All cybersecurity advisories, CVE disclosures, and threat reports from CyberSec NG.',
  path: '/blog',
})

export default function BlogPage() {
  const posts = getAllPosts()

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
            ls -la /threats <span className="text-cyber-muted text-base font-normal">({posts.length} advisories)</span>
          </h1>
          <p className="text-cyber-muted text-sm">Sorted by date descending. All threat levels included.</p>
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
            <p className="font-mono text-cyber-muted">// No posts found. Add .mdx files to /content/posts/</p>
          </div>
        )}
      </div>
    </>
  )
}
