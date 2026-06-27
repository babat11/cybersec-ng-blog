'use client'
import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'

interface SearchResult {
  slug: string
  title: string
  threatLevel: string
  cve?: string
  excerpt: string
}

export default function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)

  const search = useCallback(async (q: string) => {
    if (!q.trim()) { setResults([]); return }
    setLoading(true)
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`)
      const data = await res.json()
      setResults(data.results || [])
    } catch { setResults([]) }
    finally { setLoading(false) }
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => search(query), 300)
    return () => clearTimeout(timeout)
  }, [query, search])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); open ? onClose() : null }
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative w-full max-w-xl terminal-window shadow-2xl shadow-cyber-accent/10" onClick={e => e.stopPropagation()}>
        <div className="terminal-titlebar">
          <div className="terminal-dot bg-cyber-alert" />
          <div className="terminal-dot bg-yellow-500" />
          <div className="terminal-dot bg-cyber-accent" />
          <span className="ml-3 font-mono text-xs text-cyber-muted">grep -r &quot;{query}&quot; /blog</span>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-cyber-accent font-mono text-sm">$</span>
            <input
              autoFocus
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="search threats, CVEs, topics..."
              className="flex-1 bg-transparent text-cyber-text font-mono text-sm outline-none placeholder:text-cyber-muted"
            />
            {loading && <span className="text-cyber-muted font-mono text-xs animate-pulse">scanning...</span>}
          </div>

          {results.length > 0 && (
            <div className="border-t border-cyber-border pt-3 space-y-2 max-h-72 overflow-y-auto">
              {results.map(r => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  onClick={onClose}
                  className="block p-3 rounded hover:bg-cyber-accent/5 border border-transparent hover:border-cyber-accent/20 transition-all"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-cyber-muted">[{r.threatLevel}]</span>
                    {r.cve && <span className="text-xs font-mono text-red-400">{r.cve}</span>}
                  </div>
                  <p className="font-mono text-sm text-cyber-text">{r.title}</p>
                </Link>
              ))}
            </div>
          )}

          {query && !loading && results.length === 0 && (
            <div className="border-t border-cyber-border pt-3 font-mono text-xs text-cyber-muted">
              No threats found matching &quot;{query}&quot;
            </div>
          )}

          <div className="border-t border-cyber-border pt-3 mt-3 flex gap-4 font-mono text-xs text-cyber-muted">
            <span><kbd className="bg-cyber-border px-1 rounded">↵</kbd> open</span>
            <span><kbd className="bg-cyber-border px-1 rounded">esc</kbd> close</span>
          </div>
        </div>
      </div>
    </div>
  )
}
