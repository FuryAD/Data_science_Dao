import type { Metadata } from 'next'
import '../styles/globals.css'
import { RootLayoutClient } from './RootLayoutClient'

export const metadata: Metadata = {
  title: 'Quadratic Funding DAO | Web3 Public Goods',
  description: 'Support public-good ecosystems through quadratic funding. Democratizing impact with transparent, community-driven allocation.',
  keywords: ['DAO', 'quadratic funding', 'Web3', 'public goods', 'blockchain'],
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Quadratic Funding DAO',
    description: 'Support public-good ecosystems through quadratic funding.',
    type: 'website',
  },
  other: {
    'X-UA-Compatible': 'IE=edge',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth h-full" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#0B0F17" />
        {/* Preconnect to external services */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* DNS prefetch for API */}
        <link rel="dns-prefetch" href="http://localhost:8000" />
        <link rel="dns-prefetch" href="http://localhost:8001" />
        {/* Prefetch critical pages */}
        <link rel="prefetch" href="/projects" />
        <link rel="prefetch" href="/rounds" />
        <link rel="prefetch" href="/submit" />
      </head>
      <body className="bg-white dark:bg-dark-bg text-black dark:text-white overflow-x-hidden transition-colors h-full">
        <RootLayoutClient>
          {children}
        </RootLayoutClient>
      </body>
    </html>
  )
}
