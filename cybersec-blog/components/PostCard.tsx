import Link from 'next/link'
import { Post, getThreatLevelBg } from '@/lib/posts'
import { format } from 'date-fns'

export default function PostCard({ post }: { post: Post }) {
  const threatClass = getThreatLevelBg(post.threatLevel)

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="terminal-window hover:border-cyber-accent/40 transition-all duration-300 hover:shadow-lg hover:shadow-cyber-accent/5 h-full">
        {/* Terminal titlebar */}
        <div className="terminal-titlebar">
          <div className="terminal-dot bg-cyber-alert" />
          <div className="terminal-dot bg-yellow-500" />
          <div className="terminal-dot bg-cyber-accent" />
          <span className="ml-3 font-mono text-xs text-cyber-muted truncate">/blog/{post.slug}</span>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className={`text-xs font-mono px-2 py-0.5 rounded border ${threatClass}`}>
              THREAT: {post.threatLevel}
            </span>
            {post.cve && (
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-900">
                {post.cve}
              </span>
            )}
            <span className="text-xs font-mono text-cyber-muted ml-auto">
              [{format(new Date(post.date), 'yyyy-MM-dd HH:mm')}]
            </span>
          </div>

          {/* Title */}
          <h2 className="font-mono text-sm font-semibold text-cyber-text group-hover:text-cyber-accent transition-colors mb-2 leading-snug">
            {post.title}
          </h2>

          {/* Excerpt */}
          <p className="text-xs text-cyber-muted leading-relaxed mb-4 line-clamp-2">
            {post.excerpt}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between font-mono text-xs text-cyber-muted border-t border-cyber-border pt-3">
            <span>{post.readingTime}</span>
            <span className="text-cyber-accent group-hover:translate-x-1 transition-transform inline-block">
              cat post →
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
