'use client'

import React, { useState } from 'react'
import Link from 'next/link'

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Rounds', href: '/rounds' },
  { label: 'Submit Proposal', href: '/submit' },
]

export default function Navbar() {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleWalletConnect = () => {
    setIsConnected(true)
    setAddress('0x742d35Cc6634C0532925a3b844Bc9e7595f42bE')
  }

  const handleWalletDisconnect = () => {
    setIsConnected(false)
    setAddress('')
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="border-b border-white/10 bg-dark-bg/80 backdrop-blur-xl transition-all duration-300">
        <div className="container-main py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center font-bold text-lg md:text-xl bg-gradient-to-br from-neon-purple via-neon-cyan to-neon-mint text-dark-bg shadow-[0_0_20px_rgba(168,85,247,0.3)] group-hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all duration-300">
              ◆
            </div>
            <div className="hidden sm:block">
              <p className="font-bold text-lg text-white tracking-tight group-hover:text-neon-cyan transition-colors">QFDAO</p>
              <p className="text-xs text-gray-400 font-medium">Public Goods</p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-x-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="nav-link text-sm tracking-wide hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 transition-all duration-300"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Wallet Button */}
          <div className="flex items-center gap-3">
            {isConnected ? (
              <button
                onClick={handleWalletDisconnect}
                className="hidden md:inline-flex px-6 py-2.5 rounded-xl font-medium text-sm transition-all border border-white/10 bg-white/5 backdrop-blur-md text-white hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_15px_rgba(99,102,241,0.3)]"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full animate-pulse bg-neon-mint"></span>
                  {address.slice(0, 6)}...{address.slice(-4)}
                </span>
              </button>
            ) : (
              <Link
                href="/wallet"
                className="hidden md:inline-flex items-center justify-center px-8 py-3 rounded-xl font-bold text-white transition-all duration-300 bg-gradient-to-r from-indigo-600 via-purple-600 to-neon-purple hover:scale-105 hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] active:scale-95 border border-white/10"
              >
                Connect Wallet
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg transition-all text-white hover:bg-white/10"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-white/10 bg-dark-bg/95 backdrop-blur-xl">
            <div className="container mx-auto px-6 py-4 flex flex-col gap-4">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-gray-300 hover:text-white font-medium py-2 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {!isConnected && (
                <Link
                  href="/wallet"
                  className="btn-premium w-full py-3 mt-2 text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Connect Wallet
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

