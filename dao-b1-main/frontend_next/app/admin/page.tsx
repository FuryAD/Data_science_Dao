'use client'

import React, { useState } from 'react'
import { ProtectedRoute } from '../../components/ProtectedRoute'
import Link from 'next/link'

export default function AdminPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month')

  return (
    <ProtectedRoute requireAdmin={true}>
      <main className="min-h-screen bg-gradient-to-b from-dark-bg via-dark-bg to-dark-surface pt-32 pb-20">
        <div className="container-main max-w-6xl">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl font-bold text-white mb-2">
              Admin <span className="text-gradient">Dashboard</span>
            </h1>
            <p className="text-gray-400">System overview and key metrics</p>
          </div>

          {/* Period Selector */}
          <div className="flex gap-2 mb-8">
            {(['week', 'month', 'year'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 rounded-lg capitalize transition ${
                  selectedPeriod === period
                    ? 'bg-purple-500 text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                Last {period}
              </button>
            ))}
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            <div className="glass-panel p-6 border-l-2 border-purple-500">
              <div className="text-gray-400 text-sm mb-2">Total Users</div>
              <div className="text-4xl font-bold text-white">1,247</div>
              <div className="text-xs text-green-400 mt-2">↑ 12% from last period</div>
            </div>
            <div className="glass-panel p-6 border-l-2 border-blue-500">
              <div className="text-gray-400 text-sm mb-2">Total Funded</div>
              <div className="text-4xl font-bold text-white">2,485 ETH</div>
              <div className="text-xs text-green-400 mt-2">↑ 28% from last period</div>
            </div>
            <div className="glass-panel p-6 border-l-2 border-green-500">
              <div className="text-gray-400 text-sm mb-2">Active Projects</div>
              <div className="text-4xl font-bold text-white">342</div>
              <div className="text-xs text-green-400 mt-2">↑ 45 new projects</div>
            </div>
            <div className="glass-panel p-6 border-l-2 border-pink-500">
              <div className="text-gray-400 text-sm mb-2">Total Votes Cast</div>
              <div className="text-4xl font-bold text-white">85,429</div>
              <div className="text-xs text-green-400 mt-2">↑ 34% participation</div>
            </div>
          </div>

          {/* System Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Backend Services */}
            <div className="glass-panel p-6">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span>⚙️</span> Backend Services
              </h3>
              <div className="space-y-3">
                {[
                  { name: 'Django API', status: 'healthy', uptime: '99.9%' },
                  { name: 'FastAPI Service', status: 'healthy', uptime: '99.8%' },
                  { name: 'Database', status: 'healthy', uptime: '100%' },
                  { name: 'Cache Layer', status: 'degraded', uptime: '95.2%' },
                ].map((service, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div>
                      <p className="font-medium text-white">{service.name}</p>
                      <p className="text-xs text-gray-500">Uptime: {service.uptime}</p>
                    </div>
                    <div
                      className={`w-3 h-3 rounded-full ${
                        service.status === 'healthy'
                          ? 'bg-green-500'
                          : service.status === 'degraded'
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                      }`}
                    ></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activities */}
            <div className="glass-panel p-6">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span>📋</span> Recent Activities
              </h3>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {[
                  { action: 'New project submitted', time: '2 minutes ago', icon: '📝' },
                  { action: 'User registered', time: '5 minutes ago', icon: '👤' },
                  { action: 'Funding round completed', time: '1 hour ago', icon: '✅' },
                  { action: 'Emergency alert triggered', time: '3 hours ago', icon: '⚠️' },
                  { action: 'System backup completed', time: '6 hours ago', icon: '💾' },
                  { action: 'Policy update applied', time: '1 day ago', icon: '📋' },
                ].map((activity, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{activity.icon}</span>
                      <span className="text-sm text-gray-300">{activity.action}</span>
                    </div>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="glass-panel p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                href="/admin/rounds"
                className="flex flex-col items-center justify-center p-6 bg-white/5 hover:bg-purple-500/20 rounded-xl transition border border-white/10 hover:border-purple-500/30 group"
              >
                <span className="text-3xl mb-3">🎯</span>
                <span className="font-bold text-white group-hover:text-purple-400 transition">Manage Rounds</span>
              </Link>
              <button className="flex flex-col items-center justify-center p-6 bg-white/5 hover:bg-blue-500/20 rounded-xl transition border border-white/10 hover:border-blue-500/30 group">
                <span className="text-3xl mb-3">📊</span>
                <span className="font-bold text-white group-hover:text-blue-400 transition">Generate Reports</span>
              </button>
              <button className="flex flex-col items-center justify-center p-6 bg-white/5 hover:bg-green-500/20 rounded-xl transition border border-white/10 hover:border-green-500/30 group">
                <span className="text-3xl mb-3">👥</span>
                <span className="font-bold text-white group-hover:text-green-400 transition">Manage Users</span>
              </button>
              <Link
                href="/governance"
                className="flex flex-col items-center justify-center p-6 bg-white/5 hover:bg-pink-500/20 rounded-xl transition border border-white/10 hover:border-pink-500/30 group"
              >
                <span className="text-3xl mb-3">🏛️</span>
                <span className="font-bold text-white group-hover:text-pink-400 transition">Governance</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  )
}

