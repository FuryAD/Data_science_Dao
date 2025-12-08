'use client'

import React, { useMemo } from 'react'
import { WagmiProvider, createConfig, http } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors'

const queryClient = new QueryClient()

// Use environment variable or default fallback
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'test-project-id'

const config = createConfig({
    chains: [mainnet, sepolia],
    connectors: [
        injected(),
        ...(projectId !== 'test-project-id' ? [walletConnect({ projectId })] : []),
        metaMask(),
        safe(),
    ],
    transports: {
        [mainnet.id]: http(),
        [sepolia.id]: http(),
    },
})

export function Web3Provider({ children }: { children: React.ReactNode }) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </WagmiProvider>
    )
}
