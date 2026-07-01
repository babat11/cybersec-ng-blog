'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { siteConfig } from '@/lib/metadata'
import SearchModal from './SearchModal'

interface DropdownItem {
  label: string
  href: string
}

interface NavItem {
  label: string
  href?: string
  dropdown?: DropdownItem[]
}

const navItems: NavItem[] = [
  {
    label: 'Threats',
    dropdown: [
      { label: 'Vulnerabilities & CVEs', href: '/blog?category=vulnerabilities' },
      { label: 'Fraud & Scams', href: '/blog?category=fraud' },
      { label: 'News & Roundups', href: '/blog?category=news' },
      { label: 'Case Studies', href: '/blog?category=case-studies' },
    ],
  },
  {
    label: 'Guides',
    dropdown: [
      { label: 'How-To & Tutorials', href: '/blog?category=how-to' },
      { label: 'Career & Certifications', href: '/blog?category=career' },
      { label: 'Deep Dives & Explainers', href: '/blog?category=deep-dives' },
    ],
  },
  {
    label: 'Tools',
    dropdown: [
      { label: 'Tool Reviews', href: '/blog?category=tool-reviews' },
      { label: 'Cybercrime Calculator', href: '/tools/calculator' },
      { label: 'African Threat Map', href: '/tools/threat-map' },
    ],
  },
]

function DesktopDropdown({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1 px-3 py-1.5 rounded font-mono text-xs text-cyber-muted hover:text-cyber-text hover:bg-cyber-surface transition-all"
      >
        {item.label}
        <span className={`text-[10px] transition-transform ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 w-56 terminal-window shadow-xl shadow-black/40 z-50">
          <div className="terminal-titlebar !py-2">
            <div className="terminal-dot bg-cyber-alert" />
            <div className="terminal-dot bg-yellow-500" />
            <div className="terminal-dot bg-cyber-accent" />
            <span className="ml-2 font-mono text-[10px] text-cyber-muted">{item.label.toLowerCase()}/</span>
          </div>
          <div className="py-1">
            {item.dropdown?.map(d => (
              <Link
                key={d.href}
                href={d.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-2 font-mono text-xs text-cyber-muted hover:text-cyber-accent hover:bg-cyber-accent/5 transition-all"
              >
                <span className="text-cyber-accent/40">▸ </span>{d.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const pathname = usePathname()

  return (
    <>
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Desktop Navbar */}
      <nav className="sticky top-0 z-40 border-b border-cyber-border bg-cyber-bg/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-mono text-sm font-bold shrink-0">
            <span className="text-cyber-alert">▓</span>
            <span className="text-white">{siteConfig.name}</span>
            <span className="text-cyber-accent animate-pulse">_</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <DesktopDropdown key={item.label} item={item} />
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Product CTA */}
            <a
              href="https://securereport-pro.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded bg-cyber-accent/10 border border-cyber-accent/40 text-cyber-accent font-mono text-xs font-semibold hover:bg-cyber-accent/20 transition-all"
            >
              SecureReport Pro <span>→</span>
            </a>

            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded border border-cyber-border bg-cyber-surface text-cyber-muted hover:text-cyber-accent hover:border-cyber-accent/50 transition-all font-mono text-xs"
              aria-label="Search"
            >
              <span>⌕</span>
              <span className="hidden sm:inline">Cmd+K</span>
            </button>

            {/* Mobile hamburger = terminal prompt */}
            <button
              className="md:hidden font-mono text-cyber-accent text-sm px-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? '✕' : 'root@:~$'}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-cyber-border bg-cyber-surface px-4 py-3 space-y-1">
            {navItems.map(item => (
              <div key={item.label}>
                <button
                  onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded font-mono text-sm text-cyber-muted hover:text-cyber-text"
                >
                  <span><span className="text-cyber-accent">$ </span>{item.label.toLowerCase()}</span>
                  <span className={`text-xs transition-transform ${mobileExpanded === item.label ? 'rotate-180' : ''}`}>▾</span>
                </button>
                {mobileExpanded === item.label && (
                  <div className="pl-6 space-y-1 mb-2">
                    {item.dropdown?.map(d => (
                      <Link
                        key={d.href}
                        href={d.href}
                        onClick={() => { setMobileOpen(false); setMobileExpanded(null) }}
                        className="block px-3 py-1.5 rounded font-mono text-xs text-cyber-muted hover:text-cyber-accent"
                      >
                        <span className="text-cyber-accent/40">▸ </span>{d.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <a
              href="https://securereport-pro.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-2 mt-2 rounded bg-cyber-accent/10 border border-cyber-accent/40 text-cyber-accent font-mono text-sm font-semibold text-center"
            >
              SecureReport Pro →
            </a>
          </div>
        )}
      </nav>

      {/* Mobile bottom nav — quick access */}
      <nav className="mobile-nav md:hidden">
        <div className="flex justify-around items-center">
          <Link href="/" className={`flex flex-col items-center gap-1 px-3 py-1 font-mono text-xs ${pathname === '/' ? 'text-cyber-accent' : 'text-cyber-muted'}`}>
            <span>{pathname === '/' ? '●' : '○'}</span>
            <span>home</span>
          </Link>
          <Link href="/blog" className={`flex flex-col items-center gap-1 px-3 py-1 font-mono text-xs ${pathname === '/blog' ? 'text-cyber-accent' : 'text-cyber-muted'}`}>
            <span>{pathname === '/blog' ? '●' : '○'}</span>
            <span>blog</span>
          </Link>
          <button onClick={() => setSearchOpen(true)} className="flex flex-col items-center gap-1 px-3 py-1 font-mono text-xs text-cyber-muted">
            <span>⌕</span>
            <span>search</span>
          </button>
          <Link href="/about" className={`flex flex-col items-center gap-1 px-3 py-1 font-mono text-xs ${pathname === '/about' ? 'text-cyber-accent' : 'text-cyber-muted'}`}>
            <span>{pathname === '/about' ? '●' : '○'}</span>
            <span>about</span>
          </Link>
        </div>
      </nav>
    </>
  )
}
