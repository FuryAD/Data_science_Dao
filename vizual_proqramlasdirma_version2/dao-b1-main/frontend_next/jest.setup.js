import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/navigation', () => ({
    useRouter() {
        return {
            push: jest.fn(),
            replace: jest.fn(),
            prefetch: jest.fn(),
            back: jest.fn(),
            pathname: '/',
            query: {},
            asPath: '/',
        }
    },
    usePathname() {
        return '/'
    },
    useSearchParams() {
        return new URLSearchParams()
    },
}))

// Mock wagmi hooks
jest.mock('wagmi', () => ({
    useAccount: () => ({
        address: '0x1234567890123456789012345678901234567890',
        isConnected: false,
    }),
    useConnect: () => ({
        connect: jest.fn(),
        connectors: [],
    }),
    useDisconnect: () => ({
        disconnect: jest.fn(),
    }),
    useBalance: () => ({
        data: { formatted: '0', symbol: 'ETH' },
    }),
}))

// Suppress console errors in tests
global.console = {
    ...console,
    error: jest.fn(),
    warn: jest.fn(),
}
