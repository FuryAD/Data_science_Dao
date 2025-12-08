'use client'

import React, { useState } from 'react'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import { Dialog } from '../../../components/ui/Dialog'
import { useToast } from '../../../components/ui/Toast'

export default function RoundManagerPage() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { addToast } = useToast()

    const handleCreateRound = (e: React.FormEvent) => {
        e.preventDefault()
        setIsModalOpen(false)
        addToast("New funding round created successfully!", "success")
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gradient-to-b from-dark-bg via-dark-bg to-dark-surface pt-32 pb-20">
                <div className="container-wide">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-4xl font-bold text-white">Round <span className="text-gradient">Manager</span></h1>
                        <button onClick={() => setIsModalOpen(true)} className="btn-premium px-6 py-2">
                            + Create New Round
                        </button>
                    </div>

                    <div className="glass-panel overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-white/5 border-b border-white/10">
                                <tr>
                                    <th className="p-4 text-gray-400 font-semibold">Round Name</th>
                                    <th className="p-4 text-gray-400 font-semibold">Status</th>
                                    <th className="p-4 text-gray-400 font-semibold">Matching Pool</th>
                                    <th className="p-4 text-gray-400 font-semibold">Start Date</th>
                                    <th className="p-4 text-gray-400 font-semibold">End Date</th>
                                    <th className="p-4 text-gray-400 font-semibold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {[
                                    { name: 'Web3 Infrastructure', status: 'Active', pool: '$500,000', start: '2025-01-01', end: '2025-01-31' },
                                    { name: 'Climate Impact', status: 'Active', pool: '$250,000', start: '2025-01-15', end: '2025-02-15' },
                                    { name: 'Education', status: 'Pending', pool: '$150,000', start: '2025-02-01', end: '2025-03-01' },
                                    { name: 'DeFi Research', status: 'Closed', pool: '$100,000', start: '2024-12-01', end: '2024-12-31' },
                                ].map((round, i) => (
                                    <tr key={i} className="hover:bg-white/5 transition-colors">
                                        <td className="p-4 font-semibold text-white">{round.name}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${round.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                                                    round.status === 'Closed' ? 'bg-red-500/20 text-red-400' :
                                                        'bg-yellow-500/20 text-yellow-400'
                                                }`}>
                                                {round.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-white font-mono">{round.pool}</td>
                                        <td className="p-4 text-gray-400 text-sm">{round.start}</td>
                                        <td className="p-4 text-gray-400 text-sm">{round.end}</td>
                                        <td className="p-4 text-right space-x-2">
                                            <button className="text-sm text-blue-400 hover:text-blue-300">Edit</button>
                                            <button className="text-sm text-red-400 hover:text-red-300">Close</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <Dialog isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create Funding Round">
                    <form onSubmit={handleCreateRound} className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Round Name</label>
                            <input type="text" className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Matching Pool Amount</label>
                            <input type="number" className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Start Date</label>
                                <input type="date" className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white" />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">End Date</label>
                                <input type="date" className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white" />
                            </div>
                        </div>
                        <button type="submit" className="w-full btn-primary py-2 mt-2">Create Round</button>
                    </form>
                </Dialog>
            </main>
            <Footer />
        </>
    )
}
