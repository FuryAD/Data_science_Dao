import React, { useMemo, useState } from 'react'

function quadraticSum(donations: number[]) {
  return donations.reduce((acc, v) => acc + v * v, 0)
}

export default function MatchingPool({ eth }: any) {
  const [allocations, setAllocations] = useState<Array<{ grantId: string; amount: number }>>([])
  const [poolSize, setPoolSize] = useState('')

  const totalQuadratic = useMemo(() => quadraticSum(allocations.map((a) => a.amount)), [allocations])

  const computeMatch = (grantAmount: number) => {
    if (totalQuadratic === 0) return 0
    return (grantAmount * grantAmount) / totalQuadratic * Number(poolSize || 0)
  }

  const addAllocation = (e: React.FormEvent) => {
    e.preventDefault()
    const f = new FormData(e.target as HTMLFormElement)
    const grantId = String(f.get('grantId') || '')
    const amount = Number(f.get('amount') || 0)
    if (!grantId || !amount) return
    setAllocations((s) => [{ grantId, amount }, ...s])
    ;(e.target as HTMLFormElement).reset()
  }

  return (
    <div>
      <h2>Matching Pool</h2>
      <div className="card">
        <label>Pool Size (ETH)</label>
        <input value={poolSize} onChange={(e) => setPoolSize(e.target.value)} />
      </div>
      <form onSubmit={addAllocation} className="card">
        <label>Grant ID</label>
        <input name="grantId" />
        <label>Donation Amount (ETH)</label>
        <input name="amount" />
        <div className="actions">
          <button type="submit">Add Allocation</button>
        </div>
      </form>
      <div className="list">
        {allocations.map((a) => (
          <div key={a.grantId + a.amount} className="card">
            <p>Grant: {a.grantId}</p>
            <p>Donation: {a.amount} ETH</p>
            <p>Estimated Match: {computeMatch(a.amount).toFixed(6)} ETH</p>
          </div>
        ))}
        {allocations.length === 0 && <div className="empty">No allocations yet</div>}
      </div>
    </div>
  )
}
