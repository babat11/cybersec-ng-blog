import { generateMetadata } from '@/lib/metadata'

export const metadata = generateMetadata({
  title: 'Disclaimer',
  description: 'Legal disclaimer for CyberSec NG — educational purposes, no liability, affiliate disclosure.',
  path: '/disclaimer',
})

export default function DisclaimerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="font-mono text-xs text-cyber-accent mb-2">// LEGAL</div>
      <h1 className="font-mono text-2xl font-bold text-white mb-10">Disclaimer</h1>

      {[
        {
          title: 'Educational Purposes Only',
          alert: true,
          content: `All content published on CyberSec NG — including CVE analyses, threat advisories, exploit descriptions, and security tool references — is provided strictly for educational and informational purposes. This content is intended to help defenders, security professionals, and the public understand and protect against cyber threats.

CyberSec NG does not condone, encourage, or facilitate illegal activity, unauthorized system access, or any action that violates applicable law. Readers are solely responsible for any actions they take based on information published on this site.`,
        },
        {
          title: 'No Liability',
          content: `To the fullest extent permitted by law, CyberSec NG and its authors accept no liability for: direct or indirect damages arising from use of information on this site; security incidents, data breaches, or financial losses; actions taken by third parties based on content published here; inaccuracies, omissions, or outdated information in any post.

Cybersecurity is a fast-moving field. Threat information may become outdated quickly. Always verify critical security information against official vendor advisories and primary sources.`,
        },
        {
          title: 'No Professional Advice',
          content: `Content on this site does not constitute professional legal, financial, or cybersecurity consulting advice. For specific security assessments, incident response, or compliance guidance, engage a qualified cybersecurity professional or legal counsel.`,
        },
        {
          title: 'Affiliate Disclosure',
          content: `[PLACEHOLDER — update when applicable] CyberSec NG may participate in affiliate programs. This means we may earn a commission if you purchase products or services through links on this site, at no extra cost to you. We only recommend products we have evaluated and believe provide genuine value to our readers. Affiliate relationships do not influence our editorial coverage or threat ratings.`,
        },
        {
          title: 'Third-Party Links',
          content: `This site may link to external websites, advisories, and resources. We are not responsible for the content, privacy practices, or accuracy of third-party sites. External links are provided for reference only.`,
        },
        {
          title: 'Responsible Disclosure',
          content: `CyberSec NG follows responsible disclosure principles. We do not publish working exploit code or step-by-step attack instructions. If you believe content on this site crosses ethical lines, contact us at hello@cybersec-ng.com.`,
        },
      ].map(section => (
        <section key={section.title} className="terminal-window mb-4">
          <div className="terminal-titlebar">
            <div className="terminal-dot bg-cyber-alert" /><div className="terminal-dot bg-yellow-500" /><div className="terminal-dot bg-cyber-accent" />
            <span className="ml-3 font-mono text-xs text-cyber-muted">{section.title}</span>
          </div>
          <div className="p-5">
            <h2 className={`font-mono text-sm font-bold mb-3 ${section.alert ? 'text-cyber-alert' : 'text-cyber-accent'}`}>
              {section.alert && '⚠ '}{section.title}
            </h2>
            <p className="text-cyber-muted text-sm leading-relaxed whitespace-pre-line">{section.content}</p>
          </div>
        </section>
      ))}
    </div>
  )
}
