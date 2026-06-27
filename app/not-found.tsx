import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <div className="terminal-window inline-block text-left w-full">
        <div className="terminal-titlebar">
          <div className="terminal-dot bg-cyber-alert" />
          <div className="terminal-dot bg-yellow-500" />
          <div className="terminal-dot bg-cyber-accent" />
          <span className="ml-3 font-mono text-xs text-cyber-muted">bash — error</span>
        </div>
        <div className="p-8 font-mono">
          <p className="text-cyber-muted text-sm mb-1">root@cybersec-ng:~$ cat requested-page</p>
          <p className="text-cyber-alert text-sm mb-1">bash: requested-page: No such file or directory</p>
          <p className="text-cyber-muted text-sm mb-6">Exit code: 404</p>
          <div className="text-5xl font-bold text-cyber-accent glow-green mb-4">404</div>
          <p className="text-cyber-text text-sm mb-8">This page does not exist or has been moved.</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="bg-cyber-accent text-cyber-bg font-bold text-sm px-5 py-2 rounded hover:bg-cyber-accent/80 transition-colors">
              cd ~/home →
            </Link>
            <Link href="/blog" className="border border-cyber-border text-cyber-muted text-sm px-5 py-2 rounded hover:border-cyber-accent/40 hover:text-cyber-accent transition-all">
              ls /blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
