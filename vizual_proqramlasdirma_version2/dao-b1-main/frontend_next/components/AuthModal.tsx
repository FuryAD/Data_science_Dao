'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import WalletConnect from './WalletConnect'
import { useAccount } from 'wagmi'
import { useToast } from './ui/Toast'

type AuthModalMode = 'login' | 'signup' | 'wallet'

export function AuthModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [mode, setMode] = useState<AuthModalMode>('wallet')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [username, setUsername] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  const { address, isConnected } = useAccount()
  const { login, isLoading: authLoading } = useAuth()
  const { addToast } = useToast()

  useEffect(() => {
    const handleOpenAuthModal = () => {
      setIsOpen(true)
      setMode('wallet')
      resetForm()
    }
    window.addEventListener('openAuthModal', handleOpenAuthModal)
    return () => window.removeEventListener('openAuthModal', handleOpenAuthModal)
  }, [])

  useEffect(() => {
    if (isConnected && address && isOpen && mode === 'wallet') {
      setMode('login')
    }
  }, [isConnected, address, isOpen, mode])

  const resetForm = () => {
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setUsername('')
    setErrors({})
  }

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const validatePassword = (password: string) => {
    return password.length >= 8
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const newErrors: Record<string, string> = {}

    if (!username.trim()) newErrors.username = 'Username is required'
    if (!email.trim()) newErrors.email = 'Email is required'
    if (!validateEmail(email)) newErrors.email = 'Invalid email format'
    if (!validatePassword(password)) newErrors.password = 'Password must be at least 8 characters'
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
    if (!isConnected || !address) newErrors.wallet = 'Wallet must be connected'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsLoading(false)
      return
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const token = `token_${address}_${Date.now()}`
      localStorage.setItem('authToken', token)
      localStorage.setItem('userRole', 'user')
      localStorage.setItem('userEmail', email)
      localStorage.setItem('username', username)
      
      await login(token)
      addToast('Account created successfully!', 'success')
      setIsOpen(false)
      resetForm()
    } catch (error) {
      addToast('Failed to create account. Please try again.', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const newErrors: Record<string, string> = {}

    if (!email.trim()) newErrors.email = 'Email is required'
    if (!validateEmail(email)) newErrors.email = 'Invalid email format'
    if (!password) newErrors.password = 'Password is required'
    if (!isConnected || !address) newErrors.wallet = 'Wallet must be connected'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsLoading(false)
      return
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const token = `token_${address}_${Date.now()}`
      localStorage.setItem('authToken', token)
      localStorage.setItem('userRole', 'user')
      localStorage.setItem('userEmail', email)
      
      await login(token)
      addToast('Login successful!', 'success')
      setIsOpen(false)
      resetForm()
    } catch (error) {
      addToast('Invalid email or password. Please try again.', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
      <div className="bg-dark-surface border border-white/10 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => {
            setIsOpen(false)
            resetForm()
          }}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition"
          disabled={isLoading || authLoading}
        >
          <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {mode === 'wallet' && (
          <>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Connect Your Wallet</h2>
              <p className="text-gray-400 text-sm">First, connect your wallet to proceed</p>
            </div>
            <div className="mb-6">
              <WalletConnect />
            </div>
            <div className="text-center text-xs text-gray-500 space-y-2">
              <p>💡 Use MetaMask, WalletConnect, or other Web3 wallets</p>
              <p>🔒 Your private keys are never shared with us</p>
            </div>
          </>
        )}

        {mode === 'login' && (
          <>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Login</h2>
              <p className="text-gray-400 text-sm">Enter your credentials</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
                  disabled={isLoading || authLoading}
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
                  disabled={isLoading || authLoading}
                />
                {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
              </div>

              <button
                type="submit"
                disabled={isLoading || authLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50"
              >
                {isLoading || authLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <div className="text-center text-sm text-gray-400">
              Don't have an account?{' '}
              <button
                onClick={() => setMode('signup')}
                className="text-purple-400 hover:text-purple-300 font-semibold"
              >
                Sign up
              </button>
            </div>
          </>
        )}

        {mode === 'signup' && (
          <>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Create Account</h2>
              <p className="text-gray-400 text-sm">Join the DAO</p>
            </div>

            <form onSubmit={handleSignUp} className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="your_username"
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
                  disabled={isLoading || authLoading}
                />
                {errors.username && <p className="text-red-400 text-xs mt-1">{errors.username}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
                  disabled={isLoading || authLoading}
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
                  disabled={isLoading || authLoading}
                />
                {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
                  disabled={isLoading || authLoading}
                />
                {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
              </div>

              <button
                type="submit"
                disabled={isLoading || authLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50"
              >
                {isLoading || authLoading ? 'Creating...' : 'Create Account'}
              </button>
            </form>

            <div className="text-center text-sm text-gray-400">
              Already have an account?{' '}
              <button
                onClick={() => setMode('login')}
                className="text-purple-400 hover:text-purple-300 font-semibold"
              >
                Login
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
