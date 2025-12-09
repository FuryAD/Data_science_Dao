'use client'

import React, { useState } from 'react'
import { ProtectedRoute } from '../../components/ProtectedRoute'
import Link from 'next/link'

export default function GovernancePage() {
  const [filter, setFilter] = useState<'all' | 'active' | 'passed' | 'rejected'>('all')

  const proposals = [
    {
      id: 1,
      title: 'Increase Matching Pool Allocation for Education',
      description: 'Proposal to increase the matching pool for educational initiatives from 15% to 20% of total funding.',
      status: 'Active',
      votesFor: 125000,
      votesAgainst: 45000,
      endsIn: '2 days',
      author: '0x1234...5678',
      category: 'Budget',
    },
    {
      id: 2,
      title: 'Update Quadratic Formula Parameter',
      description: 'Adjust the alpha parameter in our quadratic matching formula to 0.5 from 0.4.',
      status: 'Passed',
      votesFor: 450000,
      votesAgainst: 12000,
      endsIn: 'Ended',
      author: '0x8901...2345',
      category: 'Technical',
    },
    {
      id: 3,
      title: 'Add New Category: AI Safety',
      description: 'Create a dedicated funding round for AI Safety research and development projects.',
      status: 'Active',
      votesFor: 89000,
      votesAgainst: 92000,
      endsIn: '5 hours',
      author: '0x3344...5566',
      category: 'Policy',
    },
    {
      id: 4,
      title: 'Extend Round Duration to 6 Weeks',
      description: 'Extend all future funding rounds from 4 weeks to 6 weeks duration.',
      status: 'Rejected',
      votesFor: 45000,
      votesAgainst: 320000,
      endsIn: 'Ended',
      author: '0x7788...9900',
      category: 'Policy',
    },
  ]

  const filteredProposals = proposals.filter((p) => {
    if (filter === 'all') return true
    return p.status.toLowerCase() === filter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-500/20 text-green-400'
      case 'Passed':
        return 'bg-blue-500/20 text-blue-400'
      case 'Rejected':
        return 'bg-red-500/20 text-red-400'
      default:
        return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getProgressPercentage = (votesFor: number, votesAgainst: number) => {
    const total = votesFor + votesAgainst
    return total === 0 ? 0 : Math.round((votesFor / total) * 100)
  }

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gradient-to-b from-dark-bg via-dark-bg to-dark-surface pt-32 pb-20">
        <div className="container-main max-w-6xl">
          {/* Header */}
          <div className="flex justify-between items-end mb-12">
            <div>
              <h1 className="text-5xl font-bold text-white mb-4">
                DAO <span className="text-gradient">Governance</span>
              </h1>
              <p className="text-gray-400 max-w-xl">Vote on proposals that shape the future of the platform. Your governance tokens represent your voting power.</p>
            </div>
            <Link href="/governance/create" className="btn-premium px-6 py-3 whitespace-nowrap">
              + Create Proposal
            </Link>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {(['all', 'active', 'passed', 'rejected'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition capitalize ${
                  filter === tab ? 'bg-purple-500 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {tab === 'all' ? 'All Proposals' : tab}
              </button>
            ))}
          </div>

          {/* Proposals Grid */}
          <div className="space-y-6">
            {filteredProposals.length > 0 ? (
              filteredProposals.map((proposal) => (
                <Link key={proposal.id} href={`/governance/${proposal.id}`}>
                  <div className="glass-panel p-6 hover:bg-white/[0.08] hover:border-white/20 transition-all group cursor-pointer">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusColor(proposal.status)} border-current/30`}>
                          {proposal.status}
                        </span>
                        <span className="text-gray-500 text-sm">📋 {proposal.category}</span>
                        <span className="text-gray-500 text-sm">⏱️ {proposal.endsIn}</span>
                      </div>
                      <span className="text-gray-500 text-sm font-mono">{proposal.author}</span>
                    </div>

                    {/* Title and Description */}
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                      {proposal.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-6">{proposal.description}</p>

                    {/* Voting Stats */}
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm mb-2">
                        <div>
                          <span className="text-gray-400">For: </span>
                          <span className="text-green-400 font-semibold">{proposal.votesFor.toLocaleString()} votes</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Against: </span>
                          <span className="text-red-400 font-semibold">{proposal.votesAgainst.toLocaleString()} votes</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Progress: </span>
                          <span className="text-white font-semibold">{getProgressPercentage(proposal.votesFor, proposal.votesAgainst)}%</span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden flex">
                        <div
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                          style={{ width: `${getProgressPercentage(proposal.votesFor, proposal.votesAgainst)}%` }}
                        />
                        <div
                          className="h-full bg-gradient-to-r from-red-500 to-rose-500"
                          style={{ width: `${100 - getProgressPercentage(proposal.votesFor, proposal.votesAgainst)}%` }}
                        />
                      </div>
                    </div>

                    {/* View Details Link */}
                    <div className="mt-4 text-purple-400 group-hover:text-purple-300 text-sm font-medium transition">
                      View Details & Vote →
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="glass-panel p-12 text-center">
                <div className="text-6xl mb-4">🗳️</div>
                <p className="text-gray-400 mb-6">No {filter !== 'all' ? filter : ''} proposals at the moment</p>
                <Link href="/governance/create" className="btn-primary px-6 py-3 inline-block">
                  Create a Proposal
                </Link>
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel p-6">
              <div className="text-3xl mb-3">🏛️</div>
              <h3 className="text-lg font-bold text-white mb-2">How Voting Works</h3>
              <p className="text-sm text-gray-400">
                Each governance token equals one vote. Proposals pass when they receive majority support within the voting period.
              </p>
            </div>
            <div className="glass-panel p-6">
              <div className="text-3xl mb-3">💡</div>
              <h3 className="text-lg font-bold text-white mb-2">Create Proposals</h3>
              <p className="text-sm text-gray-400">
                Have an idea? Create a proposal to suggest changes to DAO parameters, policies, or fund allocation.
              </p>
            </div>
            <div className="glass-panel p-6">
              <div className="text-3xl mb-3">⏱️</div>
              <h3 className="text-lg font-bold text-white mb-2">Voting Timeline</h3>
              <p className="text-sm text-gray-400">
                Most proposals run for 7 days. Vote early to ensure your voice is heard before the deadline.
              </p>
            </div>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  )
}

