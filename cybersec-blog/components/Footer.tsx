import Link from 'next/link'
import { siteConfig } from '@/lib/metadata'

export default function Footer() {
  return (
    <footer className="border-t border-cyber-border bg-cyber-surface mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="font-mono text-sm font-bold mb-3">
              <span className="text-cyber-alert">▓</span>
              <span className="text-white ml-2">{siteConfig.name}</span>
            </div>
            <p className="text-cyber-muted text-xs leading-relaxed font-mono">
              Real-time cybersecurity intelligence for defenders across Nigeria, UK, and the US.
            </p>
          </div>

          {/* Links */}
          <div>
            <div className="font-mono text-xs text-cyber-accent mb-3">// NAVIGATE</div>
            <div className="space-y-2">
              {[
                { href: '/about', label: 'About' },
                { href: '/blog', label: 'Blog' },
                { href: '/contact', label: 'Contact' },
                { href: '/privacy-policy', label: 'Privacy Policy' },
                { href: '/disclaimer', label: 'Disclaimer' },
              ].map(link => (
                <Link key={link.href} href={link.href} className="block text-cyber-muted hover:text-cyber-accent font-mono text-xs transition-colors">
                  <span className="text-cyber-accent/50">→ </span>{link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* RSS + Legal */}
          <div>
            <div className="font-mono text-xs text-cyber-accent mb-3">// FEEDS</div>
            <div className="space-y-2">
              <a href="/feed.xml" className="block text-cyber-muted hover:text-cyber-accent font-mono text-xs transition-colors">
                <span className="text-cyber-accent/50">→ </span>RSS Feed
              </a>
              <a href="/sitemap.xml" className="block text-cyber-muted hover:text-cyber-accent font-mono text-xs transition-colors">
                <span className="text-cyber-accent/50">→ </span>Sitemap
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-cyber-border pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="font-mono text-xs text-cyber-muted">
            Built for Nigerian, UK, and US Cyber Defense 2026
          </p>
          <p className="font-mono text-xs text-cyber-muted">
            <span className="text-cyber-accent">©</span> {new Date().getFullYear()} {siteConfig.name} — Educational purposes only
          </p>
        </div>
      </div>
    </footer>
  )
}
