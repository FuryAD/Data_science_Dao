'use client'

import React, { useState } from 'react'
import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi'
import { Dialog } from './ui/Dialog'
import { useToast } from './ui/Toast'
import { cn } from '@/utils/cn'

export default function WalletConnect() {
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const { connectors, connect } = useConnect()
  const { data: balance } = useBalance({ address })
  const [showModal, setShowModal] = useState(false)
  const { addToast } = useToast()

  const handleConnect = (connector: any) => {
    connect({ connector }, {
      onSuccess: () => {
        setShowModal(false)
        addToast('Wallet connected successfully!', 'success')
      },
      onError: (error) => {
        addToast(`Connection failed: ${error.message}`, 'error')
      }
    })
  }

  const handleCopy = () => {
    if (address) {
      navigator.clipboard.writeText(address)
      addToast('Address copied to clipboard', 'info')
    }
  }

  return (
    <div>
      {isConnected && address ? (
        <div className="flex items-center gap-3">
          <div className="hidden md:flex flex-col items-end mr-2">
            <span className="text-xs text-gray-400">Balance</span>
            <span className="text-sm font-bold text-white">
              {balance?.value ? (balance.value / BigInt(10) ** BigInt(balance.decimals || 18)).toString().slice(0, 5) : '0'} {balance?.symbol || 'ETH'}
            </span>
          </div>
          <div className="relative group">
            <button className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all">
              <span className="w-2.5 h-2.5 rounded-full bg-neon-mint animate-pulse" />
              <span className="text-sm font-semibold text-white">
                {address.slice(0, 6)}...{address.slice(-4)}
              </span>
            </button>
            {/* Dropdown Menu */}
            <div className="absolute right-0 top-full mt-2 w-48 py-2 bg-dark-surface border border-white/10 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              <button onClick={handleCopy} className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white">
                Copy Address
              </button>
              <button onClick={() => disconnect()} className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/5 hover:text-red-300">
                Disconnect
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <button onClick={() => setShowModal(true)} className="btn-premium px-6 py-2.5 text-sm font-bold">
            Connect Wallet
          </button>
          <Dialog isOpen={showModal} onClose={() => setShowModal(false)} title="Connect Wallet">
            <div className="grid gap-3">
              {connectors.map((connector) => (
                <button
                  key={connector.uid}
                  onClick={() => handleConnect(connector)}
                  className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all group"
                >
                  <span className="font-semibold text-white">{connector.name}</span>
                  <span className="text-gray-500 group-hover:text-neon-cyan transition-colors">→</span>
                </button>
              ))}
            </div>
          </Dialog>
        </>
      )}
    </div>
  )
}
