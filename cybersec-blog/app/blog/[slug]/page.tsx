import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug, getRelatedPosts, getThreatLevelBg, getThreatLevelColor } from '@/lib/posts'
import { generateMetadata as genMeta } from '@/lib/metadata'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { format } from 'date-fns'
import TableOfContents from '@/components/TableOfContents'
import PostCard from '@/components/PostCard'
import Newsletter from '@/components/Newsletter'
import { siteConfig } from '@/lib/metadata'
import rehypeSlug from 'rehype-slug'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkGfm from 'remark-gfm'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

// Next.js 15 — params is now a Promise
interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return genMeta({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.image,
    type: 'article',
  })
}

function extractHeadings(content: string) {
  const headingRegex = /^#{2,3} (.+)$/gm
  const headings = []
  let match
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[0].startsWith('###') ? 3 : 2
    const text = match[1]
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    headings.push({ id, text, level })
  }
  return headings
}

export default async function PostPage({ params }: Props) {
  // Await params — required in Next.js 15
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const headings = extractHeadings(post.content)
  const related = getRelatedPosts(post.slug, post.tags || [], 3)
  const threatClass = getThreatLevelBg(post.threatLevel)
  const threatColor = getThreatLevelColor(post.threatLevel)

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
    publisher: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
    url: `${siteConfig.url}/blog/${post.slug}`,
    ...(post.cve && { about: { '@type': 'Thing', name: post.cve } }),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      {/* Threat level banner */}
      <div className="border-b border-cyber-border py-2 px-4" style={{ borderLeftColor: threatColor, borderLeftWidth: 3 }}>
        <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-3 font-mono text-xs">
          <span className={`px-2 py-0.5 rounded border font-bold ${threatClass}`}>
            THREAT LEVEL: {post.threatLevel}
          </span>
          {post.cve && (
            <span className="text-red-400 bg-red-950 border border-red-900 px-2 py-0.5 rounded">{post.cve}</span>
          )}
          <span className="text-cyber-muted">
            [{format(new Date(post.date), 'yyyy-MM-dd')}] · {post.readingTime}
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex gap-8">
          {/* TOC */}
          <TableOfContents headings={headings} />

          {/* Article */}
          <article className="flex-1 min-w-0">
            <header className="mb-8">
              <h1 className="font-mono text-2xl md:text-3xl font-bold text-white leading-tight mb-4">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-cyber-muted">
                <span>{format(new Date(post.date), 'MMMM d, yyyy')}</span>
                <span>·</span>
                <span>{post.readingTime}</span>
                {post.author && <><span>·</span><span>by {post.author}</span></>}
                {post.tags?.map(tag => (
                  <span key={tag} className="px-2 py-0.5 rounded bg-cyber-surface border border-cyber-border text-cyber-muted">
                    #{tag}
                  </span>
                ))}
              </div>
            </header>

            {/* AdSense slot — top of post */}
            {/* <ins className="adsbygoogle" style={{ display: 'block' }} data-ad-client="ca-pub-XXXXXXXXXX" data-ad-slot="XXXXXXXXXX" /> */}

            <div className="prose prose-invert max-w-none">
              <MDXRemote
                source={post.content}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [
                      rehypeSlug,
                      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
                      [rehypePrettyCode, {
                        theme: 'github-dark',
                        keepBackground: true,
                      }],
                    ],
                  },
                }}
              />
            </div>

            {/* AdSense slot — bottom of post */}
            {/* <ins className="adsbygoogle" style={{ display: 'block' }} data-ad-client="ca-pub-XXXXXXXXXX" data-ad-slot="XXXXXXXXXX" /> */}

            <Newsletter />

            {/* Related threats */}
            {related.length > 0 && (
              <section className="mt-12">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-cyber-alert font-mono text-sm">●</span>
                  <h2 className="font-mono text-base font-bold text-white">RELATED THREATS</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {related.map(p => <PostCard key={p.slug} post={p} />)}
                </div>
              </section>
            )}
          </article>
        </div>
      </div>
    </>
  )
}
