'use client'
import { useEffect, useState } from 'react'

interface TOCItem {
  id: string
  text: string
  level: number
}

export default function TableOfContents({ headings }: { headings: TOCItem[] }) {
  const [active, setActive] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '0px 0px -70% 0px' }
    )

    headings.forEach(h => {
      const el = document.getElementById(h.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <aside className="sticky top-20 w-56 shrink-0 hidden lg:block">
      <div className="terminal-window">
        <div className="terminal-titlebar">
          <div className="terminal-dot bg-cyber-alert" />
          <div className="terminal-dot bg-yellow-500" />
          <div className="terminal-dot bg-cyber-accent" />
          <span className="ml-2 font-mono text-xs text-cyber-muted">OUTLINE</span>
        </div>
        <nav className="p-3 space-y-0.5 max-h-[60vh] overflow-y-auto">
          <div className="font-mono text-xs text-cyber-muted mb-2">// TABLE OF CONTENTS</div>
          {headings.map(h => (
            <a
              key={h.id}
              href={`#${h.id}`}
              className={`toc-link ${active === h.id ? 'active' : ''}`}
              style={{ paddingLeft: h.level === 3 ? '20px' : '8px' }}
            >
              <span className="text-cyber-accent/40">{h.level === 2 ? '##' : '###'} </span>
              {h.text}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  )
}
