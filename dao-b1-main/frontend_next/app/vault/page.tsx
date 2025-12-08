'use client'

import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { generateMetadata } from '../../utils/seo'

export default function VaultPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gradient-to-b from-dark-bg via-dark-bg to-dark-surface pt-32 pb-20">
                <div className="container-wide">
                    <h1 className="text-4xl font-bold text-white mb-8">Donation <span className="text-gradient">Vault</span></h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        <div className="glass-panel p-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-32 bg-neon-purple/20 blur-3xl rounded-full" />
                            <h3 className="text-xl font-bold text-gray-300 mb-2">Total Value Locked</h3>
                            <p className="text-5xl font-bold text-white">$1,245,000</p>
                            <p className="text-sm text-green-400 mt-2">+5% from last week</p>
                        </div>
                        <div className="glass-panel p-8">
                            <h3 className="text-xl font-bold text-white mb-6">Matching Pool Distribution</h3>
                            <div className="space-y-4">
                                {[
                                    { label: 'Education Pool', value: '45%', amount: '$560k', color: 'bg-blue-500' },
                                    { label: 'Climate Pool', value: '30%', amount: '$373k', color: 'bg-green-500' },
                                    { label: 'Tech Pool', value: '25%', amount: '$311k', color: 'bg-purple-500' },
                                ].map((pool, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between mb-2 text-sm">
                                            <span className="text-gray-300">{pool.label}</span>
                                            <span className="text-white font-mono">{pool.amount} ({pool.value})</span>
                                        </div>
                                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                            <div className={`h-full ${pool.color}`} style={{ width: pool.value }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="glass-panel p-6">
                        <h3 className="text-xl font-bold text-white mb-6">Recent Vault Transactions</h3>
                        <div className="space-y-4">
                            {[
                                { id: '0x3a...e4', type: 'Deposit', amount: '+5.0 ETH', time: '2 mins ago' },
                                { id: '0x9b...11', type: 'Withdrawal', amount: '-1.2 ETH', time: '1 hour ago' },
                                { id: '0x7c...22', type: 'Match Payout', amount: '-15.0 ETH', time: '1 day ago' },
                            ].map((tx, i) => (
                                <div key={i} className="flex justify-between items-center py-3 border-b border-white/5 last:border-0">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${tx.type === 'Deposit' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                                            }`}>
                                            {tx.type === 'Deposit' ? '↓' : '↑'}
                                        </div>
                                        <div>
                                            <p className="text-white font-mono text-sm">{tx.id}</p>
                                            <p className="text-gray-500 text-xs">{tx.type}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className={`font-mono font-bold ${tx.type === 'Deposit' ? 'text-green-400' : 'text-white'
                                            }`}>{tx.amount}</p>
                                        <p className="text-gray-500 text-xs">{tx.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
