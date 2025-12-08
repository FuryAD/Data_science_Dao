'use client'

import React from 'react'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'

export default function ProposalDetailsPage() {
    const { id } = useParams()

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gradient-to-b from-dark-bg via-dark-bg to-dark-surface pt-32 pb-20">
                <div className="container-wide max-w-4xl">
                    <div className="glass-panel p-8 mb-8">
                        <div className="flex gap-3 mb-6">
                            <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold uppercase">Active</span>
                            <span className="text-gray-400 text-sm">Proposal #{id}</span>
                        </div>

                        <h1 className="text-4xl font-bold text-white mb-6">Increase Matching Pool Allocation for Education</h1>

                        <div className="prose prose-invert max-w-none mb-8">
                            <p className="text-lg text-gray-300">
                                This proposal seeks to increase the quadratic funding matching pool allocation for the Education category from 15% to 25%.
                                The rationale is that education projects have seen a 40% increase in submissions over the last quarter.
                            </p>
                            <h3 className="text-xl font-semibold text-white mt-6 mb-3">Impact</h3>
                            <ul className="list-disc pl-5 text-gray-400 space-y-2">
                                <li>Higher funding for schools and ed-tech</li>
                                <li>More incentives for educators</li>
                                <li>Better long-term ecosystem growth</li>
                            </ul>
                        </div>

                        <div className="border-t border-white/10 pt-8">
                            <h3 className="text-xl font-bold text-white mb-4">Cast Your Vote</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <button className="p-4 rounded-xl border border-green-500/30 bg-green-500/10 hover:bg-green-500/20 transition-all text-center group">
                                    <span className="block text-2xl mb-1">👍</span>
                                    <span className="font-bold text-green-400 group-hover:text-green-300">Vote For</span>
                                </button>
                                <button className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 transition-all text-center group">
                                    <span className="block text-2xl mb-1">👎</span>
                                    <span className="font-bold text-red-400 group-hover:text-red-300">Vote Against</span>
                                </button>
                            </div>
                            <p className="text-center text-gray-500 text-sm mt-4">Voting Power: 1,200 QF-GOV</p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
