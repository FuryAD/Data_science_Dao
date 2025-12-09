'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { useAccount, useDisconnect } from 'wagmi'
import WalletConnect from './WalletConnect'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const { isAuthenticated, isAdmin } = useAuth()
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLoginClick = () => {
    const event = new CustomEvent('openAuthModal')
    window.dispatchEvent(event)
  }

  const handleDisconnect = () => {
    disconnect()
    localStorage.removeItem('authToken')
    localStorage.removeItem('userRole')
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
            {/* Public Links - Always Visible */}
            <Link
              href="/"
              className="nav-link text-sm tracking-wide hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 transition-all duration-300"
            >
              Home
            </Link>
            <Link
              href="/projects"
              className="nav-link text-sm tracking-wide hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 transition-all duration-300"
            >
              Projects
            </Link>
            <Link
              href="/rounds"
              className="nav-link text-sm tracking-wide hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 transition-all duration-300"
            >
              Rounds
            </Link>

            {/* Submit Proposal - Shows Login Modal if Not Auth */}
            {isAuthenticated ? (
              <Link
                href="/submit"
                className="nav-link text-sm tracking-wide hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 transition-all duration-300"
              >
                Submit Proposal
              </Link>
            ) : (
              <button
                onClick={handleLoginClick}
                className="nav-link text-sm tracking-wide hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 transition-all duration-300"
              >
                Submit Proposal
              </button>
            )}

            {/* User Dashboard - Auth Required */}
            {isAuthenticated && (
              <>
                <Link
                  href="/dashboard"
                  className="nav-link text-sm tracking-wide hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-green-400 hover:to-cyan-400 transition-all duration-300"
                >
                  Dashboard
                </Link>
                <Link
                  href="/wallet"
                  className="nav-link text-sm tracking-wide hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-green-400 hover:to-cyan-400 transition-all duration-300"
                >
                  Profile
                </Link>
              </>
            )}

            {/* Admin Links - Admin Only */}
            {isAdmin && (
              <>
                <Link
                  href="/admin"
                  className="nav-link text-sm tracking-wide text-orange-400 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-orange-400 hover:to-red-400 transition-all duration-300 font-semibold"
                >
                  Admin Dashboard
                </Link>
                <Link
                  href="/admin/rounds"
                  className="nav-link text-sm tracking-wide text-orange-400 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-orange-400 hover:to-red-400 transition-all duration-300"
                >
                  Round Manager
                </Link>
                <Link
                  href="/governance"
                  className="nav-link text-sm tracking-wide text-orange-400 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-orange-400 hover:to-red-400 transition-all duration-300"
                >
                  Governance
                </Link>
              </>
            )}
          </div>

          {/* Right Side - Auth & Wallet */}
          <div className="hidden lg:flex items-center gap-4">
            {isConnected && isAuthenticated ? (
              <button
                onClick={handleDisconnect}
                className="px-4 py-2 rounded-full text-red-400 border border-red-400 hover:bg-red-400/10 transition-all duration-300 text-sm font-medium"
              >
                Disconnect
              </button>
            ) : (
              <>
                {!isConnected && <WalletConnect />}
                {!isAuthenticated && (
                  <button
                    onClick={handleLoginClick}
                    className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold hover:shadow-lg transition-all duration-300 text-sm"
                  >
                    Login
                  </button>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden text-white">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-white/10 bg-dark-bg/95 backdrop-blur">
            <div className="container-main py-4 space-y-4">
              {/* Public Links */}
              <Link href="/" className="block text-gray-300 hover:text-white transition py-2">
                Home
              </Link>
              <Link href="/projects" className="block text-gray-300 hover:text-white transition py-2">
                Projects
              </Link>
              <Link href="/rounds" className="block text-gray-300 hover:text-white transition py-2">
                Rounds
              </Link>

              {/* Submit Proposal */}
              {isAuthenticated ? (
                <Link href="/submit" className="block text-gray-300 hover:text-white transition py-2">
                  Submit Proposal
                </Link>
              ) : (
                <button
                  onClick={handleLoginClick}
                  className="block text-gray-300 hover:text-white transition py-2 w-full text-left"
                >
                  Submit Proposal
                </button>
              )}

              {/* User Links */}
              {isAuthenticated && (
                <>
                  <Link href="/dashboard" className="block text-green-400 hover:text-green-300 transition py-2">
                    Dashboard
                  </Link>
                  <Link href="/wallet" className="block text-green-400 hover:text-green-300 transition py-2">
                    Profile
                  </Link>
                </>
              )}

              {/* Admin Links */}
              {isAdmin && (
                <>
                  <Link href="/admin" className="block text-orange-400 hover:text-orange-300 transition py-2 font-semibold">
                    Admin Dashboard
                  </Link>
                  <Link href="/admin/rounds" className="block text-orange-400 hover:text-orange-300 transition py-2">
                    Round Manager
                  </Link>
                  <Link href="/governance" className="block text-orange-400 hover:text-orange-300 transition py-2">
                    Governance
                  </Link>
                </>
              )}

              {/* Auth Actions */}
              <div className="pt-4 space-y-2 border-t border-white/10">
                {isConnected && isAuthenticated ? (
                  <button
                    onClick={handleDisconnect}
                    className="w-full px-4 py-2 rounded-full text-red-400 border border-red-400 hover:bg-red-400/10 transition-all duration-300 text-sm font-medium"
                  >
                    Disconnect Wallet
                  </button>
                ) : (
                  <>
                    {!isConnected && <WalletConnect />}
                    {!isAuthenticated && (
                      <button
                        onClick={handleLoginClick}
                        className="w-full px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold hover:shadow-lg transition-all duration-300 text-sm"
                      >
                        Login
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
