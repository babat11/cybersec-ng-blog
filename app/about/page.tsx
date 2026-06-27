import { generateMetadata } from '@/lib/metadata'
import { siteConfig } from '@/lib/metadata'

export const metadata = generateMetadata({
  title: 'About CyberSec NG',
  description: 'Our mission: deliver actionable cybersecurity intelligence to Nigerian, UK, and US defenders.',
  path: '/about',
})

export default function AboutPage() {
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'CyberSec NG Author',
    jobTitle: 'Cybersecurity Researcher',
    worksFor: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
    knowsAbout: ['Penetration Testing', 'CVE Analysis', 'POS Fraud', 'Mobile Security', 'Threat Intelligence'],
    url: `${siteConfig.url}/about`,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="font-mono text-xs text-cyber-accent mb-2">// ABOUT</div>
        <h1 className="font-mono text-2xl font-bold text-white mb-10">cat /about/cybersec-ng.txt</h1>

        {/* Mission */}
        <section className="terminal-window mb-6">
          <div className="terminal-titlebar">
            <div className="terminal-dot bg-cyber-alert" /><div className="terminal-dot bg-yellow-500" /><div className="terminal-dot bg-cyber-accent" />
            <span className="ml-3 font-mono text-xs text-cyber-muted">mission.md</span>
          </div>
          <div className="p-6">
            <h2 className="font-mono text-base font-bold text-cyber-accent mb-3">## MISSION</h2>
            <p className="text-cyber-muted leading-relaxed mb-3">
              CyberSec NG exists to close the cybersecurity awareness gap in Nigeria and the African diaspora. Too many critical vulnerability disclosures, fraud patterns, and mobile exploits go unreported in formats that everyday defenders and non-technical users can act on.
            </p>
            <p className="text-cyber-muted leading-relaxed">
              We translate CVE alerts, CERT advisories, and threat intelligence into plain, actionable language — written specifically for the threat landscape facing users in Nigeria, the UK, and the US.
            </p>
          </div>
        </section>

        {/* Author */}
        <section className="terminal-window mb-6">
          <div className="terminal-titlebar">
            <div className="terminal-dot bg-cyber-alert" /><div className="terminal-dot bg-yellow-500" /><div className="terminal-dot bg-cyber-accent" />
            <span className="ml-3 font-mono text-xs text-cyber-muted">author.md</span>
          </div>
          <div className="p-6">
            <h2 className="font-mono text-base font-bold text-cyber-accent mb-4">## AUTHOR</h2>
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              {/* Photo placeholder */}
              <div className="w-24 h-24 rounded border-2 border-cyber-accent/30 bg-cyber-surface flex items-center justify-center font-mono text-cyber-muted text-xs text-center shrink-0">
                [photo<br/>placeholder]
              </div>
              <div>
                <h3 className="font-mono text-white font-semibold mb-1">Your Name Here</h3>
                <p className="font-mono text-xs text-cyber-accent mb-3">Cybersecurity Researcher · Lagos, NG</p>
                <p className="text-cyber-muted text-sm leading-relaxed">
                  Replace this with your real bio. Experience in penetration testing, vulnerability research, and digital fraud investigation across Nigerian financial infrastructure. Former [role] at [company]. Certified in [certifications].
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why trust us */}
        <section className="terminal-window mb-6">
          <div className="terminal-titlebar">
            <div className="terminal-dot bg-cyber-alert" /><div className="terminal-dot bg-yellow-500" /><div className="terminal-dot bg-cyber-accent" />
            <span className="ml-3 font-mono text-xs text-cyber-muted">trust.md</span>
          </div>
          <div className="p-6">
            <h2 className="font-mono text-base font-bold text-cyber-accent mb-4">## WHY TRUST US</h2>
            <div className="space-y-4">
              {[
                { icon: '✓', title: 'Primary sources only', desc: 'We cite NVD, CERT-NG, NCSC, CISA, and vendor security advisories — never unverified social media claims.' },
                { icon: '✓', title: 'Local context', desc: 'We understand how global threats manifest differently in Nigeria — from POS infrastructure gaps to mobile money fraud patterns.' },
                { icon: '✓', title: 'No sponsored threat ratings', desc: 'Our CVE threat levels are based on CVSS scores and real-world exploitability, never vendor marketing.' },
                { icon: '✓', title: 'Educational transparency', desc: 'All technical content is for defensive awareness. We follow responsible disclosure standards.' },
              ].map(item => (
                <div key={item.title} className="flex gap-3">
                  <span className="text-cyber-accent font-mono mt-0.5 shrink-0">{item.icon}</span>
                  <div>
                    <p className="font-mono text-sm text-white font-semibold">{item.title}</p>
                    <p className="text-cyber-muted text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
