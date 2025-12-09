import React, { useState } from 'react'

export default function RoundManager({ eth }: any) {
  const [rounds, setRounds] = useState<any[]>([])
  const [title, setTitle] = useState('')
  const [matchingBudget, setMatchingBudget] = useState('')

  const createRound = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !matchingBudget) return
    const r = { id: Date.now(), title, matchingBudget: Number(matchingBudget), open: true }
    setRounds((s) => [r, ...s])
    setTitle('')
    setMatchingBudget('')
  }

  const toggleOpen = (id: number) => setRounds((rs) => rs.map((r) => (r.id === id ? { ...r, open: !r.open } : r)))

  return (
    <div>
      <h2>Round Manager</h2>
      <form onSubmit={createRound} className="card">
        <label>Round Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <label>Matching Budget (ETH)</label>
        <input value={matchingBudget} onChange={(e) => setMatchingBudget(e.target.value)} />
        <div className="actions">
          <button type="submit">Create Round</button>
        </div>
      </form>

      <div className="list">
        {rounds.map((r) => (
          <div key={r.id} className="card">
            <h3>{r.title}</h3>
            <p>Budget: {r.matchingBudget} ETH</p>
            <p>Status: {r.open ? 'Open' : 'Closed'}</p>
            <div className="actions">
              <button onClick={() => toggleOpen(r.id)}>{r.open ? 'Close' : 'Open'}</button>
            </div>
          </div>
        ))}
        {rounds.length === 0 && <div className="empty">No rounds yet</div>}
      </div>
    </div>
  )
}
