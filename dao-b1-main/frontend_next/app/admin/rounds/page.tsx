'use client'

import React, { useState } from 'react'
import { ProtectedRoute } from '../../../components/ProtectedRoute'
import { Dialog } from '../../../components/ui/Dialog'
import { useToast } from '../../../components/ui/Toast'
import Link from 'next/link'

export default function RoundManagerPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { addToast } = useToast()

  const handleCreateRound = (e: React.FormEvent) => {
    e.preventDefault()
    setIsModalOpen(false)
    addToast('New funding round created successfully!', 'success')
  }

  const rounds = [
    { id: 1, name: 'Web3 Infrastructure', status: 'Active', pool: 500, contributions: 285, projects: 42, start: '2025-01-01', end: '2025-01-31' },
    { id: 2, name: 'Climate Impact', status: 'Active', pool: 250, contributions: 180, projects: 28, start: '2025-01-15', end: '2025-02-15' },
    { id: 3, name: 'Education Initiative', status: 'Pending', pool: 150, contributions: 0, projects: 0, start: '2025-02-01', end: '2025-03-01' },
    { id: 4, name: 'DeFi Research', status: 'Closed', pool: 100, contributions: 95, projects: 18, start: '2024-12-01', end: '2024-12-31' },
  ]

  return (
    <ProtectedRoute requireAdmin={true}>
      <main className="min-h-screen bg-gradient-to-b from-dark-bg via-dark-bg to-dark-surface pt-32 pb-20">
        <div className="container-main max-w-6xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-5xl font-bold text-white">
                Round <span className="text-gradient">Manager</span>
              </h1>
              <p className="text-gray-400 mt-2">Create and manage quadratic funding rounds</p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn-premium px-6 py-3 whitespace-nowrap"
            >
              + Create New Round
            </button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            <div className="glass-panel p-6 border-l-2 border-purple-500">
              <div className="text-gray-400 text-sm mb-2">Active Rounds</div>
              <div className="text-4xl font-bold text-white">{rounds.filter((r) => r.status === 'Active').length}</div>
            </div>
            <div className="glass-panel p-6 border-l-2 border-blue-500">
              <div className="text-gray-400 text-sm mb-2">Total Pooled</div>
              <div className="text-4xl font-bold text-white">{rounds.reduce((sum, r) => sum + r.pool, 0)} ETH</div>
            </div>
            <div className="glass-panel p-6 border-l-2 border-green-500">
              <div className="text-gray-400 text-sm mb-2">Total Contributions</div>
              <div className="text-4xl font-bold text-white">{rounds.reduce((sum, r) => sum + r.contributions, 0)} ETH</div>
            </div>
            <div className="glass-panel p-6 border-l-2 border-pink-500">
              <div className="text-gray-400 text-sm mb-2">Total Projects</div>
              <div className="text-4xl font-bold text-white">{rounds.reduce((sum, r) => sum + r.projects, 0)}</div>
            </div>
          </div>

          {/* Rounds Table */}
          <div className="glass-panel overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="p-4 text-gray-400 font-semibold">Round Name</th>
                    <th className="p-4 text-gray-400 font-semibold">Status</th>
                    <th className="p-4 text-gray-400 font-semibold">Matching Pool</th>
                    <th className="p-4 text-gray-400 font-semibold">Contributions</th>
                    <th className="p-4 text-gray-400 font-semibold">Projects</th>
                    <th className="p-4 text-gray-400 font-semibold">Period</th>
                    <th className="p-4 text-gray-400 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {rounds.map((round) => (
                    <tr key={round.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 font-semibold text-white">{round.name}</td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                            round.status === 'Active'
                              ? 'bg-green-500/20 text-green-400'
                              : round.status === 'Closed'
                                ? 'bg-red-500/20 text-red-400'
                                : 'bg-yellow-500/20 text-yellow-400'
                          }`}
                        >
                          {round.status}
                        </span>
                      </td>
                      <td className="p-4 text-white font-mono">{round.pool} ETH</td>
                      <td className="p-4 text-white font-mono">{round.contributions} ETH</td>
                      <td className="p-4 text-white font-mono">{round.projects}</td>
                      <td className="p-4 text-gray-400 text-sm">
                        {round.start} to {round.end}
                      </td>
                      <td className="p-4 text-right space-x-2">
                        {round.status === 'Active' && (
                          <>
                            <button className="text-sm text-blue-400 hover:text-blue-300 font-medium">Edit</button>
                            <button className="text-sm text-red-400 hover:text-red-300 font-medium">Close</button>
                          </>
                        )}
                        {round.status !== 'Active' && (
                          <button className="text-sm text-gray-500 font-medium">View</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Create Round Modal */}
          <Dialog isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Funding Round">
            <form onSubmit={handleCreateRound} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Round Name</label>
                <input
                  type="text"
                  placeholder="e.g. Q1 2025 Impact Round"
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Start Date</label>
                  <input
                    type="date"
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">End Date</label>
                  <input
                    type="date"
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Matching Pool (ETH)</label>
                <input
                  type="number"
                  placeholder="e.g. 100"
                  step="0.01"
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Description</label>
                <textarea
                  placeholder="Describe the purpose and goals of this round..."
                  rows={4}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition resize-none"
                  required
                ></textarea>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition"
                >
                  Cancel
                </button>
                <button type="submit" className="flex-1 btn-premium py-3 font-semibold">
                  Create Round
                </button>
              </div>
            </form>
          </Dialog>
        </div>
      </main>
    </ProtectedRoute>
  )
}
