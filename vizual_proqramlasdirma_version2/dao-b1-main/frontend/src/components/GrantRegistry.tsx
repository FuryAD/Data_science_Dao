import React, { useState } from 'react'

export default function GrantRegistry({ eth }: any) {
  const [grants, setGrants] = useState<Array<any>>([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const createGrant = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !description) return
    const newGrant = { id: Date.now(), title, description, owner: eth.address }
    setGrants((s) => [newGrant, ...s])
    setTitle('')
    setDescription('')
  }

  return (
    <div>
      <h2>Grant Registry</h2>
      <form onSubmit={createGrant} className="card">
        <label>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        <div className="actions">
          <button type="submit">Create Grant</button>
        </div>
      </form>
      <div className="list">
        {grants.map((g) => (
          <div key={g.id} className="card">
            <h3>{g.title}</h3>
            <p>{g.description}</p>
            <small>Owner: {g.owner ?? '—'}</small>
          </div>
        ))}
        {grants.length === 0 && <div className="empty">No grants yet</div>}
      </div>
    </div>
  )
}
