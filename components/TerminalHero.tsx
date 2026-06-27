'use client'
import { useEffect, useState } from 'react'

const lines = [
  { text: 'root@cybersec-ng:~$ nmap -sV yourmind.com', delay: 0 },
  { text: 'Starting Nmap 7.94 ( https://nmap.org )', delay: 800, muted: true },
  { text: 'Scanning yourmind.com [1000 ports]...', delay: 1400, muted: true },
  { text: 'PORT     STATE  SERVICE  VERSION', delay: 2200, accent: true },
  { text: '443/tcp  open   https    nginx 1.24.0', delay: 2600, muted: true },
  { text: '22/tcp   open   ssh      OpenSSH 8.9', delay: 2900, muted: true },
  { text: 'CVE-2024-6387 DETECTED — regreSSHion', delay: 3400, alert: true },
  { text: 'root@cybersec-ng:~$ # Stay patched. Stay protected.', delay: 4200 },
]

export default function TerminalHero() {
  const [visibleLines, setVisibleLines] = useState<number[]>([])
  const [blink, setBlink] = useState(true)

  useEffect(() => {
    lines.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, i])
      }, line.delay + 600)
    })

    const blinkInterval = setInterval(() => setBlink(b => !b), 500)
    return () => clearInterval(blinkInterval)
  }, [])

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'linear-gradient(#00ff88 1px, transparent 1px), linear-gradient(90deg, #00ff88 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 font-mono text-xs text-cyber-accent border border-cyber-accent/30 px-3 py-1 rounded mb-6">
            <span className="animate-pulse">●</span> LIVE THREAT FEED — NG / UK / US
          </div>

          {/* Terminal window */}
          <div className="terminal-window border-glow mb-8">
            <div className="terminal-titlebar">
              <div className="terminal-dot bg-cyber-alert" />
              <div className="terminal-dot bg-yellow-500" />
              <div className="terminal-dot bg-cyber-accent" />
              <span className="ml-3 font-mono text-xs text-cyber-muted">bash — threat-scanner v4.2</span>
            </div>
            <div className="p-5 font-mono text-sm space-y-1.5 min-h-48">
              {lines.map((line, i) => (
                <div
                  key={i}
                  className={`transition-all duration-300 ${
                    visibleLines.includes(i) ? 'opacity-100' : 'opacity-0'
                  } ${
                    line.alert ? 'text-cyber-alert font-bold glow-red' :
                    line.accent ? 'text-cyber-accent' :
                    line.muted ? 'text-cyber-muted' :
                    'text-cyber-text'
                  }`}
                >
                  {line.alert && '⚠ '}{line.text}
                </div>
              ))}
              <div className={`text-cyber-accent ${blink ? 'opacity-100' : 'opacity-0'} transition-opacity`}>█</div>
            </div>
          </div>

          {/* Headline */}
          <h1 className="font-mono text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            Cyber Intelligence for
            <span className="text-cyber-accent glow-green"> Nigerian </span>
            Defenders
          </h1>
          <p className="text-cyber-muted text-base leading-relaxed mb-8 max-w-xl">
            Real CVEs. Real POS fraud patterns. Real mobile exploits. Covering threats hitting Nigeria, UK, and US — in plain language built for defenders.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <a href="/blog" className="font-mono text-sm bg-cyber-accent text-cyber-bg font-bold px-5 py-2.5 rounded hover:bg-cyber-accent/80 transition-colors">
              ./read-threats →
            </a>
            <a href="/feed.xml" className="font-mono text-sm border border-cyber-border text-cyber-muted px-5 py-2.5 rounded hover:border-cyber-accent/40 hover:text-cyber-accent transition-all">
              subscribe --rss
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
