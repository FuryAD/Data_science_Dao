'use client'

import React, { useState } from 'react'
import { ProtectedRoute } from '../../components/ProtectedRoute'
import { useAuth } from '../../hooks/useAuth'
import Link from 'next/link'

export default function DashboardPage() {
  const { userAddress, isAdmin } = useAuth()
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'completed'>('all')

  // Mock data for user projects
  const mockProjects = [
    {
      id: 1,
      title: 'Open Source Climate Tech',
      category: 'Environment',
      status: 'approved',
      fundingGoal: 5.5,
      fundingReceived: 3.2,
      votes: 1024,
      createdAt: '2025-11-15',
    },
    {
      id: 2,
      title: 'Educational AI Platform',
      category: 'Education',
      status: 'pending',
      fundingGoal: 10.0,
      fundingReceived: 0,
      votes: 0,
      createdAt: '2025-12-01',
    },
    {
      id: 3,
      title: 'Healthcare Data Privacy',
      category: 'Healthcare',
      status: 'completed',
      fundingGoal: 8.0,
      fundingReceived: 8.0,
      votes: 2048,
      createdAt: '2025-10-20',
    },
  ]

  // Mock data for backed projects
  const mockBackedProjects = [
    {
      id: 101,
      title: 'Decentralized Governance SDK',
      creator: '0x1234...5678',
      amountBacked: 0.5,
      date: '2025-11-10',
      fundingReceived: 5.2,
    },
    {
      id: 102,
      title: 'Community Science Network',
      creator: '0x8901...2345',
      amountBacked: 1.25,
      date: '2025-11-25',
      fundingReceived: 12.8,
    },
  ]

  const filteredProjects = mockProjects.filter((p) => {
    if (filter === 'all') return true
    return p.status === filter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-500/20 text-green-300 border-green-500/30'
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
      case 'completed':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }
  }

  const getProgressPercentage = (received: number, goal: number) => {
    return Math.round((received / goal) * 100)
  }

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gradient-to-b from-dark-bg via-dark-bg to-dark-surface pt-32 pb-20">
        <div className="container-main max-w-6xl">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl font-bold text-white mb-2">
              Welcome Back, <span className="text-gradient">{userAddress?.slice(0, 6)}...{userAddress?.slice(-4)}</span>
            </h1>
            <p className="text-gray-400">Track your projects and contributions at a glance</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            <div className="glass-panel p-6 border-l-2 border-purple-500">
              <div className="text-gray-400 text-sm mb-2">Total Projects</div>
              <div className="text-4xl font-bold text-white">{mockProjects.length}</div>
              <div className="text-xs text-gray-500 mt-2">+1 this month</div>
            </div>
            <div className="glass-panel p-6 border-l-2 border-green-500">
              <div className="text-gray-400 text-sm mb-2">Approved Projects</div>
              <div className="text-4xl font-bold text-white">{mockProjects.filter((p) => p.status === 'approved').length}</div>
              <div className="text-xs text-gray-500 mt-2">In funding rounds</div>
            </div>
            <div className="glass-panel p-6 border-l-2 border-blue-500">
              <div className="text-gray-400 text-sm mb-2">Total Funded</div>
              <div className="text-4xl font-bold text-white">
                {mockProjects.reduce((sum, p) => sum + p.fundingReceived, 0).toFixed(2)} ETH
              </div>
              <div className="text-xs text-gray-500 mt-2">Across all projects</div>
            </div>
            <div className="glass-panel p-6 border-l-2 border-pink-500">
              <div className="text-gray-400 text-sm mb-2">Total Votes</div>
              <div className="text-4xl font-bold text-white">{mockProjects.reduce((sum, p) => sum + p.votes, 0).toLocaleString()}</div>
              <div className="text-xs text-gray-500 mt-2">Community support</div>
            </div>
          </div>

          {/* Your Projects Section */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-white">Your Projects</h2>
              <Link href="/submit" className="btn-primary px-4 py-2 text-sm">
                Create New Project
              </Link>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {(['all', 'pending', 'approved', 'completed'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition capitalize ${
                    filter === tab ? 'bg-purple-500 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Projects List */}
            <div className="space-y-4">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <div key={project.id} className="glass-panel p-6 hover:bg-white/[0.08] transition">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="text-sm text-gray-400">📁 {project.category}</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                          </span>
                          <span className="text-sm text-gray-500">{project.createdAt}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-white">{getProgressPercentage(project.fundingReceived, project.fundingGoal)}%</div>
                        <div className="text-xs text-gray-400">
                          {project.fundingReceived.toFixed(2)} / {project.fundingGoal} ETH
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-300"
                          style={{ width: `${getProgressPercentage(project.fundingReceived, project.fundingGoal)}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Bottom Row */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">🗳️ {project.votes.toLocaleString()} votes</span>
                      <Link
                        href={`/projects/${project.id}`}
                        className="text-purple-400 hover:text-purple-300 transition font-medium"
                      >
                        View Details →
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="glass-panel p-12 text-center">
                  <div className="text-6xl mb-4">📭</div>
                  <p className="text-gray-400 mb-6">No {filter !== 'all' ? filter : ''} projects yet</p>
                  <Link href="/submit" className="btn-primary px-6 py-3 inline-block">
                    Create Your First Project
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Backed Projects Section */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Projects You've Backed</h2>

            <div className="space-y-4">
              {mockBackedProjects.length > 0 ? (
                mockBackedProjects.map((project) => (
                  <div key={project.id} className="glass-panel p-6 hover:bg-white/[0.08] transition">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white">{project.title}</h3>
                        <p className="text-sm text-gray-400 mt-1">Created by {project.creator}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-green-400">+{project.amountBacked} ETH</div>
                        <div className="text-xs text-gray-500">Backed on {project.date}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-4 pt-4 border-t border-white/10">
                      <span className="text-gray-400">Project Status: {project.fundingReceived.toFixed(2)} ETH funded</span>
                      <Link href={`/projects/${project.id}`} className="text-purple-400 hover:text-purple-300 transition font-medium">
                        View Project →
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="glass-panel p-12 text-center">
                  <div className="text-6xl mb-4">💰</div>
                  <p className="text-gray-400 mb-6">You haven't backed any projects yet</p>
                  <Link href="/projects" className="btn-primary px-6 py-3 inline-block">
                    Explore Projects
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Admin Section */}
          {isAdmin && (
            <div className="mt-12 pt-12 border-t border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6">Admin Tools</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  href="/admin"
                  className="glass-panel p-6 hover:bg-white/[0.08] transition group"
                >
                  <div className="text-3xl mb-3">📊</div>
                  <h3 className="font-bold text-white group-hover:text-purple-400 transition">Admin Dashboard</h3>
                  <p className="text-sm text-gray-400 mt-1">View system analytics and statistics</p>
                </Link>
                <Link
                  href="/admin/rounds"
                  className="glass-panel p-6 hover:bg-white/[0.08] transition group"
                >
                  <div className="text-3xl mb-3">🎯</div>
                  <h3 className="font-bold text-white group-hover:text-purple-400 transition">Manage Rounds</h3>
                  <p className="text-sm text-gray-400 mt-1">Create and configure funding rounds</p>
                </Link>
                <Link
                  href="/governance"
                  className="glass-panel p-6 hover:bg-white/[0.08] transition group"
                >
                  <div className="text-3xl mb-3">🏛️</div>
                  <h3 className="font-bold text-white group-hover:text-purple-400 transition">Governance</h3>
                  <p className="text-sm text-gray-400 mt-1">Manage voting and proposals</p>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </ProtectedRoute>
  )
}
