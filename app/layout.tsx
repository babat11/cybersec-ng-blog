import type { Metadata } from 'next'
import { JetBrains_Mono, Inter } from 'next/font/google'
import './globals.css'
import { siteConfig } from '@/lib/metadata'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Toaster } from 'react-hot-toast'

// Load fonts via next/font — no @import needed, zero layout shift, self-hosted
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jetbrains',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  keywords: ['cybersecurity Nigeria', 'pentest', 'CVE', 'threat intelligence', 'hacking news', 'security blog', 'Lagos', 'cybersecurity Africa'],
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [{ url: `${siteConfig.url}/api/og?title=CyberSec+NG`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  verification: { google: 'YOUR_GOOGLE_VERIFICATION_CODE' },
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${siteConfig.url}/blog?q={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${jetbrainsMono.variable} ${inter.variable}`}>
      <head>
        {/* AdSense placeholder — replace with real script when approved */}
        {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX" crossOrigin="anonymous"></script> */}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <link rel="alternate" type="application/rss+xml" title={`${siteConfig.name} RSS Feed`} href="/feed.xml" />
        <meta name="geo.region" content="NG" />
        <meta name="geo.placename" content="Nigeria" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="scanline min-h-screen flex flex-col">
        <Toaster
          position="top-right"
          toastOptions={{
            style: { background: '#0f0f1a', color: '#e0e0e0', border: '1px solid #1a1a2e', fontFamily: 'JetBrains Mono, monospace', fontSize: '13px' },
          }}
        />
        <Navbar />
        <main className="flex-1 pb-20 md:pb-0">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
