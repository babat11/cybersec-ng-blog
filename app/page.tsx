import { getAllPosts } from '@/lib/posts'
import { generateMetadata } from '@/lib/metadata'
import PostCard from '@/components/PostCard'
import Newsletter from '@/components/Newsletter'
import TerminalHero from '@/components/TerminalHero'

export const metadata = generateMetadata({
  title: 'CyberSec NG — Nigerian Cyber Intelligence',
  description: 'Real-time cybersecurity threat intelligence for Nigeria, UK, and US defenders. CVE alerts, POS fraud, mobile security.',
})

export default function HomePage() {
  const posts = getAllPosts()
  const latestPosts = posts.slice(0, 3)
  const olderPosts = posts.slice(3)

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is CyberSec NG?',
        acceptedAnswer: { '@type': 'Answer', text: 'CyberSec NG is a cybersecurity intelligence blog focused on threats affecting Nigeria, UK, and US users — including CVE disclosures, POS fraud, and mobile security.' },
      },
      {
        '@type': 'Question',
        name: 'How do I protect my ATM card from cloning in Nigeria?',
        acceptedAnswer: { '@type': 'Answer', text: 'Use chip-and-PIN only, cover the keypad when typing your PIN, avoid ATMs in isolated locations, and enable transaction alerts on your banking app.' },
      },
      {
        '@type': 'Question',
        name: 'What is a CVE?',
        acceptedAnswer: { '@type': 'Answer', text: 'A CVE (Common Vulnerabilities and Exposures) is a publicly disclosed cybersecurity vulnerability assigned a unique ID, severity score, and patch guidance.' },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero */}
      <TerminalHero />

      {/* Latest threats */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-8">
          <span className="text-cyber-alert font-mono text-sm animate-pulse">●</span>
          <h2 className="font-mono text-lg font-bold text-white">LATEST THREATS</h2>
          <span className="text-cyber-muted font-mono text-xs">[{latestPosts.length} active advisories]</span>
        </div>

        {latestPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {latestPosts.map((post, i) => (
              <div key={post.slug} className="fade-in-up" style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}>
                <PostCard post={post} />
              </div>
            ))}
          </div>
        ) : (
          <div className="terminal-window p-8 text-center font-mono text-cyber-muted">
            <p>// No posts yet. Add MDX files to /content/posts/</p>
          </div>
        )}

        {olderPosts.length > 0 && (
          <div className="mt-8 text-center">
            <a href="/blog" className="inline-flex items-center gap-2 font-mono text-sm text-cyber-accent border border-cyber-accent/30 px-5 py-2 rounded hover:bg-cyber-accent/10 transition-all">
              ls -la /blog <span>→</span>
            </a>
          </div>
        )}
      </section>

      {/* Stats bar */}
      <section className="border-y border-cyber-border bg-cyber-surface py-6">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Advisories', value: posts.length.toString().padStart(3, '0') },
            { label: 'Critical CVEs', value: posts.filter(p => p.threatLevel === 'CRITICAL').length.toString().padStart(3, '0') },
            { label: 'Regions Covered', value: '003' },
            { label: 'Uptime', value: '99.9%' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <div className="font-mono text-2xl font-bold text-cyber-accent glow-green">{stat.value}</div>
              <div className="font-mono text-xs text-cyber-muted mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <div className="max-w-6xl mx-auto px-4">
        <Newsletter />
      </div>

      {/* AdSense slot placeholder */}
      {/* <div className="max-w-6xl mx-auto px-4 my-8">
        <ins className="adsbygoogle" style={{ display: 'block' }} data-ad-client="ca-pub-XXXXXXXXXX" data-ad-slot="XXXXXXXXXX" data-ad-format="auto" />
      </div> */}
    </>
  )
}
