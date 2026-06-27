import { generateMetadata } from '@/lib/metadata'

export const metadata = generateMetadata({
  title: 'Privacy Policy',
  description: 'CyberSec NG privacy policy covering GDPR, CCPA, cookies, and AdSense data practices.',
  path: '/privacy-policy',
})

export default function PrivacyPolicyPage() {
  const updated = '2026-01-01'
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="font-mono text-xs text-cyber-accent mb-2">// LEGAL</div>
      <h1 className="font-mono text-2xl font-bold text-white mb-2">Privacy Policy</h1>
      <p className="font-mono text-xs text-cyber-muted mb-10">Last updated: {updated}</p>

      {[
        {
          title: '1. Data We Collect',
          content: `We collect minimal data necessary to operate this website. This may include: IP addresses (anonymized), browser type, pages visited, time on page, and referring URLs — collected automatically via analytics. If you subscribe to our newsletter or submit the contact form, we collect your name and email address voluntarily provided by you. We do not collect sensitive personal data, financial information, or government IDs.`,
        },
        {
          title: '2. How We Use Your Data',
          content: `We use collected data to: improve content relevance and site performance; respond to contact form submissions; send newsletter emails to subscribers who explicitly opted in; analyze traffic patterns via anonymized analytics. We do not sell your personal data to third parties.`,
        },
        {
          title: '3. Cookies',
          content: `This site uses essential cookies for functionality, and optional analytics/advertising cookies. Essential cookies cannot be disabled. Analytics cookies (e.g., Google Analytics) track anonymized usage. Advertising cookies (Google AdSense) serve contextual ads. You may opt out of non-essential cookies via your browser settings or a cookie consent banner.`,
        },
        {
          title: '4. Google AdSense',
          content: `We participate in the Google AdSense program. Google may use cookies to serve ads based on your prior visits to this and other websites. You may opt out of personalized advertising at https://www.google.com/settings/ads. Google's use of advertising cookies is governed by Google's Privacy Policy.`,
        },
        {
          title: '5. Third-Party Services',
          content: `We may use third-party services including: Google Analytics (traffic analysis), Google AdSense (advertising), newsletter providers (email delivery), and Vercel (hosting). Each third party has its own privacy policy and data handling practices.`,
        },
        {
          title: '6. Your Rights (GDPR / CCPA)',
          content: `If you are in the EU/EEA, UK, or California, you have the right to: access the personal data we hold about you; request correction of inaccurate data; request deletion of your data; object to processing; data portability. To exercise these rights, email us at hello@cybersec-ng.com. We will respond within 30 days.`,
        },
        {
          title: '7. Data Retention',
          content: `Newsletter subscriber data is retained until you unsubscribe. Contact form submissions are retained for up to 12 months. Anonymized analytics data may be retained indefinitely.`,
        },
        {
          title: '8. Security',
          content: `We implement reasonable technical measures to protect data, including HTTPS encryption, security headers, and access controls. No system is 100% secure; we encourage you not to share sensitive personal information via contact forms.`,
        },
        {
          title: '9. Changes to This Policy',
          content: `We may update this Privacy Policy periodically. Significant changes will be noted by updating the "Last updated" date above. Continued use of the site constitutes acceptance of the updated policy.`,
        },
        {
          title: '10. Contact',
          content: `For privacy-related inquiries: hello@cybersec-ng.com`,
        },
      ].map(section => (
        <section key={section.title} className="terminal-window mb-4">
          <div className="terminal-titlebar">
            <div className="terminal-dot bg-cyber-alert" /><div className="terminal-dot bg-yellow-500" /><div className="terminal-dot bg-cyber-accent" />
            <span className="ml-3 font-mono text-xs text-cyber-muted">{section.title}</span>
          </div>
          <div className="p-5">
            <h2 className="font-mono text-sm font-bold text-cyber-accent mb-3">{section.title}</h2>
            <p className="text-cyber-muted text-sm leading-relaxed">{section.content}</p>
          </div>
        </section>
      ))}
    </div>
  )
}
