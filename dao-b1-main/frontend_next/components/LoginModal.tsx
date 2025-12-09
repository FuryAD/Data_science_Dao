'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import WalletConnect from './WalletConnect'
import { useAccount } from 'wagmi'

export function LoginModal() {
  const [isOpen, setIsOpen] = useState(false)
  const { address, isConnected } = useAccount()
  const { login, isLoading } = useAuth()

  // Listen for custom event from Navbar
  useEffect(() => {
    const handleOpenLoginModal = () => {
      setIsOpen(true)
    }

    window.addEventListener('openLoginModal', handleOpenLoginModal)
    return () => window.removeEventListener('openLoginModal', handleOpenLoginModal)
  }, [])

  // Auto-close when wallet is connected
  useEffect(() => {
    if (isConnected && address) {
      // Trigger login with the connected address
      const handleLogin = async () => {
        // Sign-in logic: In a real app, you would:
        // 1. Create a message to sign
        // 2. Get user to sign it
        // 3. Send signed message to backend for verification
        // 4. Backend returns JWT token
        // For now, we'll simulate successful login
        const token = `token_${address}_${Date.now()}`
        localStorage.setItem('authToken', token)
        localStorage.setItem('userRole', 'user')
        await login(token)
        setIsOpen(false)
      }
      handleLogin()
    }
  }, [isConnected, address, login])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-dark-surface border border-white/10 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl relative">
        {/* Close button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition"
        >
          <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal content */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Connect Your Wallet</h2>
          <p className="text-gray-400 text-sm">Sign in to access exclusive features and submit proposals</p>
        </div>

        {/* Wallet Connect Component */}
        <div className="mb-6">
          <WalletConnect />
        </div>

        {/* Info text */}
        <div className="text-center text-xs text-gray-500 space-y-2">
          <p>💡 First time? Connect your wallet to create an account</p>
          <p>🔒 Your private keys are never shared with us</p>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="mt-4 flex items-center justify-center">
            <div className="animate-spin">
              <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full"></div>
            </div>
            <span className="ml-2 text-gray-300 text-sm">Processing login...</span>
          </div>
        )}
      </div>
    </div>
  )
}
