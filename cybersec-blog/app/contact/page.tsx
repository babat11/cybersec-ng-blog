import { generateMetadata } from '@/lib/metadata'
import ContactForm from '@/components/ContactForm'

export const metadata = generateMetadata({
  title: 'Contact',
  description: 'Send a message to the CyberSec NG team. Report a threat, suggest coverage, or ask a question.',
  path: '/contact',
})

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="font-mono text-xs text-cyber-accent mb-2">// CONTACT</div>
      <h1 className="font-mono text-2xl font-bold text-white mb-2">send --message</h1>
      <p className="text-cyber-muted text-sm mb-8">
        Report a threat tip, suggest coverage, or reach out directly at{' '}
        <a href="mailto:hello@cybersec-ng.com" className="text-cyber-accent hover:underline font-mono">hello@cybersec-ng.com</a>
      </p>
      <ContactForm />
    </div>
  )
}
