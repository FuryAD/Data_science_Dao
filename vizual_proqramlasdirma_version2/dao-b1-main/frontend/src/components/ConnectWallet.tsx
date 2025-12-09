import React, { useState } from 'react'

export default function ConnectWallet({ address, connect, disconnect }: { address: string | null; connect: () => Promise<any>; disconnect: () => void }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      {address ? (
        <div className="wallet-pill flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors" onClick={() => setOpen((s) => !s)} role="button" tabIndex={0} aria-label="Wallet menu">
          <div className="wallet-avatar w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 shadow-lg shadow-purple-500/20" aria-hidden />
          <div className="flex flex-col ml-2">
            <span className="text-xs font-bold text-cyan-400">{address.slice(0, 6)}...{address.slice(-4)}</span>
            <span className="text-[11px] text-slate-400">Balance: —</span>
          </div>
        </div>
      ) : (
        <button className="connect-btn" onClick={() => connect().catch(console.error)} aria-label="Connect Wallet">Connect Wallet</button>
      )}

      {open && address && (
        <div className="wallet-popup absolute right-0 top-14 bg-slate-800 rounded-xl shadow-2xl border border-white/10 min-w-[240px] z-50 p-4">
          <div className="mb-3 text-sm text-slate-300">Connected: <strong className="font-mono text-white block mt-1 text-xs break-all">{address}</strong></div>
          <div className="flex gap-2">
            <button onClick={() => { navigator.clipboard?.writeText(address); }} className="btn small px-3 py-1.5 rounded-lg border border-white/10 text-xs text-slate-400 hover:text-white hover:border-white transition-colors">Copy</button>
            <button onClick={() => { disconnect(); setOpen(false) }} className="btn small px-3 py-1.5 rounded-lg border border-white/10 text-xs text-slate-400 hover:text-white hover:border-white transition-colors">Disconnect</button>
          </div>
        </div>
      )}
    </div>
  )
}

