/**
 * SEO utilities and metadata generators
 */

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

export const generateMetadata = (
  title: string,
  description: string,
  path: string = '/',
  image?: string
) => {
  const url = `${BASE_URL}${path}`
  const ogImage = image || `${BASE_URL}/og-image.png`

  return {
    title: `${title} | QF DAO`,
    description,
    canonical: url,
    openGraph: {
      title: `${title} | QF DAO`,
      description,
      url,
      type: 'website' as const,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: `${title} | QF DAO`,
      description,
      images: [ogImage],
    },
  }
}

export const generateJsonLd = (
  type: 'Organization' | 'WebPage' | 'Article',
  data: Record<string, any>
) => {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  }
}
