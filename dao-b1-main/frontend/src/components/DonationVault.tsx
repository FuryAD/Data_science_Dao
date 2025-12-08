import React, { useState } from 'react'

export default function DonationVault({ eth }: any) {
  const [donations, setDonations] = useState<any[]>([])
  const [amount, setAmount] = useState('')
  const [toGrantId, setToGrantId] = useState('')

  const donate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!eth || !eth.signer || !amount) return
    const parsed = Number(amount)
    const pending = { id: Date.now(), grantId: toGrantId, amount: parsed, status: 'pending' }
    setDonations((s) => [pending, ...s])
    try {
      const txPromise = eth.signer.sendTransaction({ to: eth.address, value: BigInt(Math.floor(parsed * 1e18)) })
      await eth.sendTx(txPromise)
      setDonations((s) => s.map((d) => (d.id === pending.id ? { ...d, status: 'confirmed' } : d)))
    } catch (err) {
      setDonations((s) => s.map((d) => (d.id === pending.id ? { ...d, status: 'failed' } : d)))
    } finally {
      setAmount('')
      setToGrantId('')
    }
  }

  return (
    <div>
      <h2>Donation Vault</h2>
      <form onSubmit={donate} className="card">
        <label>Grant ID (optional)</label>
        <input value={toGrantId} onChange={(e) => setToGrantId(e.target.value)} />
        <label>Amount (ETH)</label>
        <input value={amount} onChange={(e) => setAmount(e.target.value)} />
        <div className="actions">
          <button type="submit">Donate</button>
        </div>
      </form>
      <div className="list">
        {donations.map((d) => (
          <div key={d.id} className="card">
            <p>Grant: {d.grantId || 'General'}</p>
            <p>Amount: {d.amount} ETH</p>
            <p>Status: {d.status}</p>
          </div>
        ))}
        {donations.length === 0 && <div className="empty">No donations yet</div>}
      </div>
    </div>
  )
}
