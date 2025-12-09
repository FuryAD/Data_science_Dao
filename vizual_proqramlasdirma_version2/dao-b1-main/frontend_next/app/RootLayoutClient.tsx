'use client'

import { ThemeProvider } from '../components/ThemeProvider'
import { AuthProvider } from '../hooks/useAuth'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { AuthModal } from '../components/AuthModal'
import { Web3Provider } from '../providers/Web3Provider'
import { ToastProvider } from '../components/ui/Toast'
import { ReactNode } from 'react'

export function RootLayoutClient({ children }: { children: ReactNode }) {
  return (
    <Web3Provider>
      <AuthProvider>
        <ThemeProvider>
          <ToastProvider>
            <Navbar />
            <AuthModal />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </ToastProvider>
        </ThemeProvider>
      </AuthProvider>
    </Web3Provider>
  )
}
