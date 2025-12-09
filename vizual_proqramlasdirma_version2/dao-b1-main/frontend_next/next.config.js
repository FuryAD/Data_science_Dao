/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enable optimizations
    reactStrictMode: true,

    // Image optimization
    images: {
        formats: ['image/avif', 'image/webp'],
        unoptimized: false,
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },

    // Compression
    compress: true,
    poweredByHeader: false,

    // Performance
    productionBrowserSourceMaps: false,
    experimental: {
        optimizeCss: false,
        optimizePackageImports: [
            '@chakra-ui/react',
            'lodash-es',
            'date-fns',
        ],
    },

    // Headers for caching
    headers: async () => {
        return [
            {
                source: '/api/:path*',
                headers: [
                    { key: 'Cache-Control', value: 'no-cache' },
                ],
            },
            {
                source: '/_next/static/:path*',
                headers: [
                    { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
                ],
            },
            {
                source: '/fonts/:path*',
                headers: [
                    { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
                ],
            },
        ]
    },

    // Redirects for performance
    redirects: async () => {
        return [
            // Add redirects here if needed
        ]
    },
}

module.exports = nextConfig
