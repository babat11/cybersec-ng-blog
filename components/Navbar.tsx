'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { siteConfig } from '@/lib/metadata'
import SearchModal from './SearchModal'

const navLinks = [
  { href: '/', label: '~/home' },
  { href: '/blog', label: '~/blog' },
  { href: '/about', label: '~/about' },
  { href: '/contact', label: '~/contact' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Desktop Navbar */}
      <nav className="sticky top-0 z-40 border-b border-cyber-border bg-cyber-bg/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-mono text-sm font-bold">
            <span className="text-cyber-alert">▓</span>
            <span className="text-white">{siteConfig.name}</span>
            <span className="text-cyber-accent animate-pulse">_</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded font-mono text-xs transition-all ${
                  pathname === link.href
                    ? 'text-cyber-accent bg-cyber-accent/10 border border-cyber-accent/30'
                    : 'text-cyber-muted hover:text-cyber-text hover:bg-cyber-surface'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
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

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="md:hidden border-t border-cyber-border bg-cyber-surface px-4 py-3 space-y-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2 rounded font-mono text-sm ${
                  pathname === link.href
                    ? 'text-cyber-accent bg-cyber-accent/10'
                    : 'text-cyber-muted hover:text-cyber-text'
                }`}
              >
                <span className="text-cyber-accent">$ </span>{link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* Mobile bottom nav */}
      <nav className="mobile-nav md:hidden">
        <div className="flex justify-around items-center">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center gap-1 px-3 py-1 font-mono text-xs ${
                pathname === link.href ? 'text-cyber-accent' : 'text-cyber-muted'
              }`}
            >
              <span>{pathname === link.href ? '●' : '○'}</span>
              <span>{link.label.replace('~/', '')}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  )
}
