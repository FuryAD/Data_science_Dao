'use client'

import React from 'react'
import Link from 'next/link'

export default function ConnectWalletPage() {
    const WALLETS = [
        { name: 'MetaMask', icon: '🦊', color: 'bg-orange-500/10 text-orange-500' },
        { name: 'WalletConnect', icon: '📡', color: 'bg-blue-500/10 text-blue-500' },
        { name: 'Coinbase Wallet', icon: '🔵', color: 'bg-blue-600/10 text-blue-600' },
        { name: 'Rainbow', icon: '🌈', color: 'bg-purple-500/10 text-purple-500' },
    ]

    return (
        <div className="min-h-screen bg-dark-bg relative overflow-hidden flex flex-col">
            {/* Decorative gradient orbs */}
            <div className="absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none animate-pulse-slow bg-gradient-to-br from-neon-purple to-neon-cyan" />
            <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full blur-3xl opacity-15 pointer-events-none animate-pulse-slow delay-1000 bg-gradient-to-br from-neon-cyan to-neon-mint" />

            <div className="container-main pt-32 md:pt-40 pb-12 md:pb-24 flex-grow flex items-center justify-center relative z-10">
                <div className="max-w-md w-full space-y-8">
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl md:text-5xl font-bold text-white">
                            Connect <span className="text-gradient">Wallet</span>
                        </h1>
                        <p className="text-gray-400 text-lg">Choose a wallet provider to continue.</p>
                    </div>

                    <div className="space-y-4">
                        {WALLETS.map((wallet) => (
                            <button
                                key={wallet.name}
                                className="w-full flex items-center gap-4 p-4 rounded-2xl glass-panel hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] transition-all duration-300 group"
                            >
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${wallet.color} group-hover:scale-110 transition-transform duration-300`}>
                                    {wallet.icon}
                                </div>
                                <span className="font-semibold text-lg text-white">{wallet.name}</span>
                                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-gray-400">
                                    →
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="text-center">
                        <Link href="/" className="text-sm text-gray-500 hover:text-white transition-colors flex items-center justify-center gap-2">
                            <span>←</span> Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
