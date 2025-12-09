import React, { useState } from 'react'

export default function GovernanceToken({ eth }: any) {
  const [supply, setSupply] = useState(0)
  const [mintTo, setMintTo] = useState('')
  const [mintAmount, setMintAmount] = useState('')

  const mint = async (e: React.FormEvent) => {
    e.preventDefault()
    const amt = Number(mintAmount)
    if (!mintTo || !amt) return
    setSupply((s) => s + amt)
    setMintTo('')
    setMintAmount('')
  }

  return (
    <div>
      <h2>Governance Token</h2>
      <div className="card">
        <p>Total supply: {supply}</p>
      </div>
      <form onSubmit={mint} className="card">
        <label>Recipient</label>
        <input value={mintTo} onChange={(e) => setMintTo(e.target.value)} />
        <label>Amount</label>
        <input value={mintAmount} onChange={(e) => setMintAmount(e.target.value)} />
        <div className="actions">
          <button type="submit">Mint</button>
        </div>
      </form>
    </div>
  )
}
