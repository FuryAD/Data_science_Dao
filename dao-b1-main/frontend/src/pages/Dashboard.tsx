import React, { useEffect } from 'react'
import { ListSkeleton } from '../components/Skeletons'

export default function Dashboard() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('show')
        })
      },
      { threshold: 0.12 }
    )
    document.querySelectorAll('.reveal').forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <div id="dashboard" className="flex flex-col gap-12">
      <section className="hero-wrap reveal py-12">
        <div className="hero-card bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Welcome — <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Quadratic Funding DAO</span>
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed max-w-3xl mb-8">
            Innovative quadratic funding tools empowering DAOs to support impactful public goods through transparent, community-driven mechanisms.
          </p>

          <div className="hero-cta flex flex-wrap gap-4">
            <a className="button" href="#projects">
              <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/20 transition-all hover:scale-105">
                Explore Rounds
              </button>
            </a>
            <a className="button" href="#submit">
              <button className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-xl border border-white/10 transition-all hover:scale-105">
                Submit Proposal
              </button>
            </a>
          </div>
        </div>
      </section>

      <section className="reveal grid md:grid-cols-2 gap-6">
        <div className="card bg-slate-800/50 p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
          <h3 className="text-xl font-bold text-white mb-4">About the DAO</h3>
          <p className="text-slate-400 leading-relaxed">
            We are dedicated to funding open-source software and public goods through a democratic, mathematical allocation process that amplifies community contributions.
          </p>
        </div>

        <div className="card bg-slate-800/50 p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
          <h3 className="text-xl font-bold text-white mb-4">Governance</h3>
          <ul className="space-y-3 text-slate-400">
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1">✓</span> Transparent on-chain voting and allocation.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1">✓</span> Community-driven decision making.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1">✓</span> Sybil-resistant identity verification.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1">✓</span> Open-source infrastructure and tooling.
            </li>
          </ul>
        </div>
      </section>

      <section className="reveal">
        <h3 className="text-2xl font-bold text-white mb-6">Recent Projects</h3>
        <div className="bg-slate-800/30 p-6 rounded-2xl border border-white/5">
          <ListSkeleton count={3} />
        </div>
      </section>
    </div>
  )
}
