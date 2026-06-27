import type { Metadata } from 'next'

const siteConfig = {
  name: 'CyberSec NG',
  description: 'Nigerian cybersecurity intelligence. Real threats, real analysis — for defenders in Nigeria, UK, and the US.',
  url: 'https://cybersec-ng.vercel.app',
  author: 'CyberSec NG Team',
  twitterHandle: '@cybersecng',
  locale: 'en_NG',
}

export { siteConfig }

export function generateMetadata({
  title,
  description,
  path = '',
  image,
  type = 'website',
}: {
  title?: string
  description?: string
  path?: string
  image?: string
  type?: 'website' | 'article'
}): Metadata {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name
  const fullDescription = description || siteConfig.description
  const fullUrl = `${siteConfig.url}${path}`
  const ogImage = image || `${siteConfig.url}/api/og?title=${encodeURIComponent(title || siteConfig.name)}`

  return {
    title: fullTitle,
    description: fullDescription,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: fullUrl },
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url: fullUrl,
      siteName: siteConfig.name,
      images: [{ url: ogImage, width: 1200, height: 630, alt: fullTitle }],
      locale: siteConfig.locale,
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
      site: siteConfig.twitterHandle,
      images: [ogImage],
    },
    robots: { index: true, follow: true },
    other: {
      'geo.region': 'NG',
      'geo.placename': 'Nigeria',
    },
  }
}
