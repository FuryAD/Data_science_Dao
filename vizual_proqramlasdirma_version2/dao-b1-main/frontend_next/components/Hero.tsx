'use client'

import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'

const Orb = dynamic(() => import('./orb'), {
  loading: () => <div className="w-full h-full bg-gradient-to-br from-neon-purple/10 to-neon-cyan/10 rounded-full animate-pulse" />,
  ssr: false,
})

const STATS = [
  { value: '$12.4M', label: 'Total Funded' },
  { value: '1,240+', label: 'Active Projects' },
  { value: '48K+', label: 'Contributors' },
  { value: '12', label: 'Rounds Completed' },
]

export default function Hero() {
  return (
    <div className="relative pt-20 overflow-hidden">
      {/* Background Gradient Orbs */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none animate-pulse-slow bg-gradient-neon" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full blur-3xl opacity-15 pointer-events-none animate-pulse-slow delay-1000 bg-gradient-to-br from-neon-cyan to-neon-mint" />

      <div className="container-main relative z-10 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="flex flex-col justify-center space-y-8">
            {/* Heading */}
            <div className="space-y-6">
              <div className="inline-block">
                <span className="text-sm font-semibold px-4 py-2 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md text-gradient">
                  ✨ Web3 Public Goods Platform
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-6">
                <span className="text-gradient">Quadratic Funding</span>
                {' '}for Impact
              </h1>

              <p className="text-base md:text-lg leading-loose max-w-3xl text-gray-300">
                Innovative quadratic funding tools empowering DAOs to support impactful public goods through transparent, community-driven mechanisms.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-row items-center gap-4 pt-4">
              <Link href="/rounds" className="btn-premium px-8 py-3 rounded-full text-center min-w-[160px]">
                Explore Rounds
              </Link>
              <Link href="/projects" className="btn-ghost-premium px-8 py-3 rounded-full text-center min-w-[160px]">
                View Projects
              </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-white/10">
              {STATS.map((stat, idx) => (
                <div key={idx} className="space-y-2 text-center md:text-left">
                  <p className="text-2xl md:text-3xl font-bold text-gradient text-glow">
                    {stat.value}
                  </p>
                  <p className="text-xs md:text-sm text-gray-400 font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="hidden lg:flex items-center justify-center relative ml-auto md:translate-x-10 h-[500px] w-full">
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="absolute inset-0 z-0 flex items-center justify-center">
                <div className="w-[400px] h-[400px]">
                  <Orb />
                </div>
              </div>

              {/* Glass Card Overlay - Floating above the orb */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none translate-y-12">
                <div className="glass-panel p-8 text-center space-y-4 max-w-xs transform rotate-3 hover:rotate-0 transition-transform duration-500 pointer-events-auto backdrop-blur-md bg-dark-bg/30">
                  <div className="text-4xl text-neon-cyan">◆</div>
                  <h3 className="text-xl font-bold text-white">Quadratic Matching</h3>
                  <p className="text-sm text-gray-300">
                    Amplify individual donations with community matching to fund public goods fairly.
                  </p>
                  <button className="text-neon-cyan hover:text-neon-purple font-medium transition-colors flex items-center justify-center gap-1 mx-auto mt-2">
                    Learn More <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
