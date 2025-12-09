'use client'

import { ReactNode, useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'

interface ProtectedRouteProps {
  children: ReactNode
  requireAdmin?: boolean
  fallback?: ReactNode
}

export function ProtectedRoute({ children, requireAdmin = false, fallback }: ProtectedRouteProps) {
  const { isAuthenticated, isAdmin, isLoading } = useAuth()
  const router = useRouter()
  const [showLoginModal, setShowLoginModal] = useState(false)

  useEffect(() => {
    if (isLoading) return

    if (!isAuthenticated) {
      setShowLoginModal(true)
    } else if (requireAdmin && !isAdmin) {
      router.push('/')
    }
  }, [isAuthenticated, isAdmin, requireAdmin, isLoading, router])

  // Listen for login modal events
  useEffect(() => {
    const handleLoginModal = () => setShowLoginModal(true)
    window.addEventListener('openLoginModal', handleLoginModal)
    return () => window.removeEventListener('openLoginModal', handleLoginModal)
  }, [])

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Authentication Required</h1>
          <p className="text-gray-400 mb-6">Please connect your wallet and log in to access this page</p>
          <button
            onClick={() => setShowLoginModal(true)}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold hover:shadow-lg transition-all"
          >
            Connect & Login
          </button>
        </div>
      </div>
    )
  }

  if (requireAdmin && !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Admin Access Required</h1>
          <p className="text-gray-400 mb-6">This page is only accessible to administrators</p>
          <button
            onClick={() => router.push('/')}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold hover:shadow-lg transition-all"
          >
            Go Home
          </button>
        </div>
      </div>
    )
  }

  return <>{children}</> || fallback
}
