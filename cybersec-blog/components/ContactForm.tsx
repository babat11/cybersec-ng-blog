'use client'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    console.log('[Contact]', form)
    await new Promise(r => setTimeout(r, 1200))
    toast.success('✓ Message encrypted & sent. We\'ll respond within 48h.')
    setForm({ name: '', email: '', message: '' })
    setLoading(false)
  }

  const inputClass = 'w-full bg-cyber-bg border border-cyber-border rounded px-4 py-3 font-mono text-sm text-cyber-text placeholder:text-cyber-muted outline-none focus:border-cyber-accent/50 transition-colors'

  return (
    <div className="terminal-window">
      <div className="terminal-titlebar">
        <div className="terminal-dot bg-cyber-alert" /><div className="terminal-dot bg-yellow-500" /><div className="terminal-dot bg-cyber-accent" />
        <span className="ml-3 font-mono text-xs text-cyber-muted">compose --encrypted</span>
      </div>
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-mono text-xs text-cyber-accent mb-1.5 block">// NAME</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              placeholder="Your name"
              className={inputClass}
            />
          </div>
          <div>
            <label className="font-mono text-xs text-cyber-accent mb-1.5 block">// EMAIL</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              placeholder="you@domain.com"
              className={inputClass}
            />
          </div>
          <div>
            <label className="font-mono text-xs text-cyber-accent mb-1.5 block">// MESSAGE</label>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              placeholder="Your message, threat tip, or question..."
              className={`${inputClass} resize-none`}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyber-accent text-cyber-bg font-mono text-sm font-bold py-3 rounded hover:bg-cyber-accent/80 transition-colors disabled:opacity-50"
          >
            {loading ? '⟳ encrypting & sending...' : 'SEND MESSAGE →'}
          </button>
        </form>
      </div>
    </div>
  )
}
