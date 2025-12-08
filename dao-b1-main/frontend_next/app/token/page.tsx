'use client'

import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { generateMetadata } from '../../utils/seo'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const tokenData = [
    { name: 'Jan', price: 1.2 },
    { name: 'Feb', price: 1.5 },
    { name: 'Mar', price: 1.4 },
    { name: 'Apr', price: 2.1 },
    { name: 'May', price: 2.8 },
]

export default function TokenPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gradient-to-b from-dark-bg via-dark-bg to-dark-surface pt-32 pb-20">
                <div className="container-wide">
                    <div className="flex justify-between items-center mb-12">
                        <div>
                            <h1 className="text-5xl font-bold text-white mb-2">QF-GOV <span className="text-gradient">Token</span></h1>
                            <p className="text-gray-400">The governance token powering the Quadratic Funding DAO.</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-500 uppercase tracking-widest">Current Price</p>
                            <p className="text-4xl font-bold text-white">$2.84 <span className="text-green-400 text-lg font-normal">+12%</span></p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <div className="glass-panel p-6">
                            <p className="text-gray-400 text-sm mb-1">Market Cap</p>
                            <p className="text-2xl font-bold text-white">$28.4M</p>
                        </div>
                        <div className="glass-panel p-6">
                            <p className="text-gray-400 text-sm mb-1">Total Supply</p>
                            <p className="text-2xl font-bold text-white">10M QF</p>
                        </div>
                        <div className="glass-panel p-6">
                            <p className="text-gray-400 text-sm mb-1">Circulating</p>
                            <p className="text-2xl font-bold text-white">4.2M QF</p>
                        </div>
                    </div>

                    <div className="glass-panel p-8 mb-12">
                        <h3 className="text-xl font-bold text-white mb-6">Price History</h3>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={tokenData}>
                                    <defs>
                                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#A855F7" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#A855F7" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="name" stroke="#555" />
                                    <YAxis stroke="#555" />
                                    <Tooltip contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }} />
                                    <Area type="monotone" dataKey="price" stroke="#A855F7" fillOpacity={1} fill="url(#colorPrice)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <button className="btn-primary px-8 py-3 text-lg">Claim Airdrop (Coming Soon)</button>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
