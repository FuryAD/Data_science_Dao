import React, { Suspense } from 'react'
import type { FC } from 'react'

let Lottie: any
try {
  // optional import - if not installed it won't crash app
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  Lottie = require('lottie-react').default
} catch (e) {
  Lottie = null
}

const LottieSpot: FC = () => {
  if (!Lottie) return null
  // small built-in lottie data fallback (minimal)
  const sample = { v: '5.5.7', fr: 30, ip: 0, op: 60, w: 200, h: 200, nm: 'dot', ddd: 0, assets: [], layers: [] }
  return <Lottie animationData={sample} style={{ width: 40, height: 40 }} />
}

import ConnectWallet from './ConnectWallet'

export default function Header({ address, connect, disconnect }: { address: string | null; connect: () => Promise<any>; disconnect: () => void }) {
  const admin = typeof import.meta !== 'undefined' && (import.meta as any).env ? (import.meta as any).env.VITE_ADMIN_ADDRESS : undefined
  const isAdmin = !!(address && admin && address.toLowerCase() === admin.toLowerCase())

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'Rounds', href: '/rounds' },
    { label: 'Submit Proposal', href: '/submit' },
  ]

  if (isAdmin) navItems.push({ label: 'Admin', href: '/admin' })

  return (
    <header className="header fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#0b1020]/80 border-b border-white/5" role="banner">
      <div className="header-inner max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Suspense fallback={null}>
            <LottieSpot />
          </Suspense>
          <span className="brand-title text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">Quadratic Funding DAO</span>
        </div>

        <nav className="nav-left hidden md:flex items-center gap-x-8" aria-label="Main navigation">
          {navItems.map((n) => (
            <a key={n.label} className="nav-link text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200" href={n.href}>{n.label}</a>
          ))}
        </nav>

        <div className="wallet-right flex items-center gap-4">
          <ConnectWallet address={address} connect={connect} disconnect={disconnect} />
        </div>
      </div>
    </header>
  )
}
