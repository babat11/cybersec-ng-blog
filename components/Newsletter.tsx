'use client'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    // Console.log for now — wire to ConvertKit/Mailchimp later
    console.log('[Newsletter] New subscriber:', email)
    await new Promise(r => setTimeout(r, 1000))
    toast.success('✓ Subscribed. Threat intel incoming.')
    setEmail('')
    setLoading(false)
  }

  return (
    <section className="terminal-window border-glow my-12">
      <div className="terminal-titlebar">
        <div className="terminal-dot bg-cyber-alert" />
        <div className="terminal-dot bg-yellow-500" />
        <div className="terminal-dot bg-cyber-accent" />
        <span className="ml-3 font-mono text-xs text-cyber-muted">subscribe --channel=threat-intel</span>
      </div>
      <div className="p-6 md:p-8">
        <div className="max-w-lg">
          <div className="font-mono text-xs text-cyber-accent mb-2">// INTELLIGENCE FEED</div>
          <h3 className="font-mono text-lg font-bold text-white mb-2">Get Threat Intel</h3>
          <p className="text-cyber-muted text-sm mb-5">
            Weekly CVE alerts, POS fraud patterns, and mobile exploit roundups — delivered to your inbox. No spam. Unsubscribe anytime.
          </p>
          <form onSubmit={handleSubmit} className="flex gap-2 flex-col sm:flex-row">
            <div className="flex-1 flex items-center gap-2 bg-cyber-bg border border-cyber-border rounded px-3 py-2 focus-within:border-cyber-accent/50 transition-colors">
              <span className="text-cyber-accent font-mono text-sm shrink-0">$</span>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="analyst@yourdomain.com"
                required
                className="flex-1 bg-transparent text-cyber-text font-mono text-sm outline-none placeholder:text-cyber-muted"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-cyber-accent text-cyber-bg font-mono text-sm font-bold px-5 py-2 rounded hover:bg-cyber-accent/80 transition-colors disabled:opacity-50 whitespace-nowrap"
            >
              {loading ? 'encrypting...' : 'SUBSCRIBE →'}
            </button>
          </form>
          <p className="font-mono text-xs text-cyber-muted mt-3">
            <span className="text-cyber-accent">✓</span> No spam. Unsubscribe with one click.
          </p>
        </div>
      </div>
    </section>
  )
}
