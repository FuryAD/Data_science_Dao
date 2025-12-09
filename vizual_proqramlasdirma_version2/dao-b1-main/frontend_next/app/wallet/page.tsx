'use client'

import React, { useState } from 'react'
import { ProtectedRoute } from '../../components/ProtectedRoute'
import { useAuth } from '../../hooks/useAuth'
import { useToast } from '../../components/ui/Toast'
import Link from 'next/link'

export default function WalletPage() {
  const { userAddress } = useAuth()
  const { addToast } = useToast()
  const [activeTab, setActiveTab] = useState<'balance' | 'exchange' | 'history'>('balance')
  const [exchangeAmount, setExchangeAmount] = useState('')
  const [selectedCurrency, setSelectedCurrency] = useState('ETH')
  const [isBuying, setIsBuying] = useState(true)

  // Mock wallet data
  const walletBalance = {
    ETH: 2.5,
    USDC: 5000,
    DAO: 1250,
  }

  const mockTransactionHistory = [
    { id: 1, type: 'buy', amount: 0.5, currency: 'ETH', date: '2025-12-08', status: 'completed', price: 2500 },
    { id: 2, type: 'sell', amount: 100, currency: 'USDC', date: '2025-12-07', status: 'completed', price: 1 },
    { id: 3, type: 'buy', amount: 250, currency: 'DAO', date: '2025-12-06', status: 'completed', price: 15 },
  ]

  const exchangeRates = {
    ETH: 2500,
    USDC: 1,
    DAO: 15,
  }

  const handleExchange = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!exchangeAmount || parseFloat(exchangeAmount) <= 0) {
      addToast('Please enter a valid amount', 'error')
      return
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const action = isBuying ? 'Purchased' : 'Sold'
    const totalValue = (parseFloat(exchangeAmount) * exchangeRates[selectedCurrency as keyof typeof exchangeRates]).toFixed(2)
    
    addToast(`${action} ${exchangeAmount} ${selectedCurrency} successfully!`, 'success')
    setExchangeAmount('')
  }

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gradient-to-b from-dark-bg via-dark-bg to-dark-surface pt-32 pb-20">
        <div className="container-main max-w-6xl">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl font-bold text-white mb-2">
              My <span className="text-gradient">Wallet</span>
            </h1>
            <p className="text-gray-400">Manage your assets and make exchanges</p>
          </div>

          {/* Wallet Address Card */}
          <div className="glass-panel p-6 mb-8 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Connected Wallet Address</p>
                <p className="text-white font-mono text-lg">{userAddress}</p>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(userAddress || '')
                  addToast('Wallet address copied!', 'success')
                }}
                className="px-4 py-2 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 transition font-medium"
              >
                Copy Address
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2 border-b border-white/10">
            {(['balance', 'exchange', 'history'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-lg capitalize transition font-medium whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-purple-500 text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {tab === 'balance' && '💰 Balance'}
                {tab === 'exchange' && '🔄 Exchange'}
                {tab === 'history' && '📊 History'}
              </button>
            ))}
          </div>

          {/* Balance Tab */}
          {activeTab === 'balance' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Asset Balance</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(walletBalance).map(([currency, amount]) => (
                  <div key={currency} className="glass-panel p-6 hover:bg-white/[0.08] transition">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-3xl">
                        {currency === 'ETH' && '⟠'}
                        {currency === 'USDC' && '💵'}
                        {currency === 'DAO' && '🏛️'}
                      </div>
                      <div className="text-right">
                        <p className="text-gray-400 text-sm">{currency}</p>
                        <p className="text-2xl font-bold text-white">{amount}</p>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-white/10">
                      <p className="text-gray-400 text-sm">
                        ≈ ${(amount * exchangeRates[currency as keyof typeof exchangeRates]).toFixed(2)} USD
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Balance */}
              <div className="glass-panel p-8 mt-8 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border-l-4 border-cyan-500">
                <p className="text-gray-400 text-sm mb-2">Total Portfolio Value</p>
                <p className="text-4xl font-bold text-white">
                  ${(
                    Object.entries(walletBalance).reduce(
                      (sum, [currency, amount]) =>
                        sum + amount * exchangeRates[currency as keyof typeof exchangeRates],
                      0
                    )
                  ).toFixed(2)}{' '}
                  USD
                </p>
              </div>
            </div>
          )}

          {/* Exchange Tab */}
          {activeTab === 'exchange' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Exchange Form */}
              <div className="glass-panel p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Exchange Assets</h3>
                
                <form onSubmit={handleExchange} className="space-y-6">
                  {/* Buy/Sell Toggle */}
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setIsBuying(true)}
                      className={`flex-1 py-3 rounded-lg font-semibold transition ${
                        isBuying
                          ? 'bg-green-500/30 text-green-300 border border-green-500/50'
                          : 'bg-white/5 text-gray-400 hover:bg-white/10'
                      }`}
                    >
                      Buy
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsBuying(false)}
                      className={`flex-1 py-3 rounded-lg font-semibold transition ${
                        !isBuying
                          ? 'bg-red-500/30 text-red-300 border border-red-500/50'
                          : 'bg-white/5 text-gray-400 hover:bg-white/10'
                      }`}
                    >
                      Sell
                    </button>
                  </div>

                  {/* Currency Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Select Currency</label>
                    <select
                      value={selectedCurrency}
                      onChange={(e) => setSelectedCurrency(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition"
                    >
                      <option value="ETH">Ethereum (ETH)</option>
                      <option value="USDC">USDC Stablecoin (USDC)</option>
                      <option value="DAO">DAO Governance Token (DAO)</option>
                    </select>
                  </div>

                  {/* Amount Input */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Amount</label>
                    <input
                      type="number"
                      step="0.01"
                      value={exchangeAmount}
                      onChange={(e) => setExchangeAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Available: {walletBalance[selectedCurrency as keyof typeof walletBalance]} {selectedCurrency}
                    </p>
                  </div>

                  {/* Rate Info */}
                  {exchangeAmount && (
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Rate</span>
                        <span className="text-white font-semibold">
                          1 {selectedCurrency} = ${exchangeRates[selectedCurrency as keyof typeof exchangeRates]}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Total Value</span>
                        <span className="text-white font-semibold">
                          ${(parseFloat(exchangeAmount) * exchangeRates[selectedCurrency as keyof typeof exchangeRates]).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className={`w-full py-3 rounded-lg font-semibold transition ${
                      isBuying
                        ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:shadow-lg hover:shadow-green-500/20'
                        : 'bg-gradient-to-r from-red-600 to-rose-600 hover:shadow-lg hover:shadow-red-500/20'
                    } text-white`}
                  >
                    {isBuying ? 'Buy Now' : 'Sell Now'}
                  </button>
                </form>
              </div>

              {/* Info Cards */}
              <div className="space-y-6">
                <div className="glass-panel p-6">
                  <div className="text-3xl mb-3">⚠️</div>
                  <h4 className="text-lg font-bold text-white mb-2">Trading Guidelines</h4>
                  <ul className="text-sm text-gray-400 space-y-2">
                    <li>• Minimum buy amount: 0.01 {selectedCurrency}</li>
                    <li>• Trading fee: 0.5% per transaction</li>
                    <li>• Settlement: Instant for all trades</li>
                    <li>• Slippage protection enabled</li>
                  </ul>
                </div>

                <div className="glass-panel p-6">
                  <div className="text-3xl mb-3">🔒</div>
                  <h4 className="text-lg font-bold text-white mb-2">Security</h4>
                  <ul className="text-sm text-gray-400 space-y-2">
                    <li>• Your assets are in your wallet</li>
                    <li>• Non-custodial trading</li>
                    <li>• All transactions on-chain</li>
                    <li>• Multi-sig security available</li>
                  </ul>
                </div>

                <Link href="/governance" className="glass-panel p-6 hover:bg-white/[0.08] transition group">
                  <div className="text-3xl mb-3">🏛️</div>
                  <h4 className="text-lg font-bold text-white group-hover:text-purple-400 transition mb-2">Vote on Governance</h4>
                  <p className="text-sm text-gray-400">Use your DAO tokens to vote on platform decisions</p>
                </Link>
              </div>
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Transaction History</h2>
              <div className="space-y-4">
                {mockTransactionHistory.length > 0 ? (
                  mockTransactionHistory.map((tx) => (
                    <div key={tx.id} className="glass-panel p-6 hover:bg-white/[0.08] transition">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="text-3xl">
                            {tx.type === 'buy' ? '📈' : '📉'}
                          </div>
                          <div>
                            <p className="text-white font-semibold">
                              {tx.type === 'buy' ? 'Bought' : 'Sold'} {tx.amount} {tx.currency}
                            </p>
                            <p className="text-sm text-gray-400">{tx.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold ${tx.type === 'buy' ? 'text-red-400' : 'text-green-400'}`}>
                            {tx.type === 'buy' ? '-' : '+'}${(tx.amount * tx.price).toFixed(2)}
                          </p>
                          <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full">
                            {tx.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="glass-panel p-12 text-center">
                    <div className="text-6xl mb-4">📭</div>
                    <p className="text-gray-400 mb-6">No transactions yet</p>
                    <button onClick={() => setActiveTab('exchange')} className="btn-primary px-6 py-3 inline-block">
                      Make Your First Trade
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </ProtectedRoute>
  )
}
