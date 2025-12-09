'use client'

import React from 'react'

const FEATURES = [
  {
    icon: '📊',
    title: 'Grant Registry',
    description: 'A transparent on-chain registry of all public-good projects participating in funding rounds.',
    gradient: 'from-neon-purple to-neon-cyan',
  },
  {
    icon: '🎯',
    title: 'Round Manager',
    description: 'Create, manage, and configure quadratic funding rounds with customizable parameters.',
    gradient: 'from-neon-cyan to-neon-mint',
  },
  {
    icon: '🔐',
    title: 'Donation Vault',
    description: 'A secure contribution system enabling matching pools and community donations.',
    gradient: 'from-neon-mint to-neon-purple',
  },
  {
    icon: '🏛️',
    title: 'Governance Token',
    description: 'ERC-20 governance token powering voting and treasury decisions.',
    gradient: 'from-neon-purple to-neon-cyan',
  },
  {
    icon: '🌊',
    title: 'Matching Pool',
    description: 'Automated quadratic matching engine amplifying community support.',
    gradient: 'from-neon-cyan to-neon-mint',
  },
]

export default function FeatureSection() {
  return (
    <div className="container-main feature-section">
      {/* Section Header */}
      <div className="mb-12 md:mb-16 text-center max-w-2xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Why QF DAO</h2>
        <p className="text-lg text-gray-300 leading-relaxed">Powerful features designed for transparent, community-driven public goods funding</p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-center">
        {FEATURES.map((feature, idx) => (
          <div
            key={idx}
            className="group relative overflow-hidden rounded-3xl"
          >
            {/* Glass Card */}
            <div className="glass-panel p-8 md:p-10 space-y-6 h-full relative z-10 hover:border-white/20 hover:shadow-purple-500/10">
              {/* Icon */}
              <div className={`flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} bg-opacity-10`}>
                <div className="absolute inset-0 bg-white/5 rounded-2xl" />
                <span className="text-3xl relative z-10">{feature.icon}</span>
              </div>

              {/* Content */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white group-hover:text-neon-cyan transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-base leading-relaxed text-gray-400 group-hover:text-gray-300 transition-colors">
                  {feature.description}
                </p>
              </div>

              {/* Hover Accent */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-neon-purple to-neon-cyan group-hover:w-full transition-all duration-500" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

