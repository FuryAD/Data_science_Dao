'use client'

import { useContext, createContext, useState, useEffect, ReactNode } from 'react'
import { useAccount } from 'wagmi'

interface AuthContextType {
  isAuthenticated: boolean
  isAdmin: boolean
  isLoading: boolean
  userAddress: string | null
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { address, isConnected } = useAccount()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user has auth token in localStorage
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null
    const userRole = typeof window !== 'undefined' ? localStorage.getItem('userRole') : null
    
    if (token && address && isConnected) {
      setIsAuthenticated(true)
      setIsAdmin(userRole === 'admin')
    } else {
      setIsAuthenticated(false)
      setIsAdmin(false)
    }
    
    setIsLoading(false)
  }, [address, isConnected])

  const login = (token: string) => {
    localStorage.setItem('authToken', token)
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userRole')
    setIsAuthenticated(false)
    setIsAdmin(false)
  }

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      isAdmin,
      isLoading,
      userAddress: address || null,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
