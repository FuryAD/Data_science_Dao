import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export function GrantSkeleton() {
  return (
    <div className="card">
      <h3><Skeleton width={140} /></h3>
      <p><Skeleton count={3} /></p>
      <div className="actions"><Skeleton width={100} height={32} /></div>
    </div>
  )
}

export function ListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="list">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card">
          <h3><Skeleton width={120} /></h3>
          <p><Skeleton count={2} /></p>
        </div>
      ))}
    </div>
  )
}
