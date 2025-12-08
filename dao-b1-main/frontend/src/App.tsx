import Header from './components/Header'
import React, { useState, Suspense, lazy } from 'react'
const GrantRegistry = lazy(() => import('./components/GrantRegistry'))
const RoundManager = lazy(() => import('./components/RoundManager'))
const DonationVault = lazy(() => import('./components/DonationVault'))
const MatchingPool = lazy(() => import('./components/MatchingPool'))
const GovernanceToken = lazy(() => import('./components/GovernanceToken'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const ProjectEditor = lazy(() => import('./pages/ProjectEditor'))
import { useEthers } from './hooks/useEthers'
import Background3D from './components/Background3D'

const sections = ['Dashboard', 'Projects', 'Grant Registry', 'Round Manager', 'Donation Vault', 'Matching Pool', 'Governance Token']

export default function App() {
  const [active, setActive] = useState(sections[0])
  const eth = useEthers()

  return (
    <div className="app">
      <Header address={eth.address} connect={eth.connect} disconnect={eth.disconnect} />
      <div className="hero-composite">
        <div className="hero-left glass">
          <div className="hero-title">
            <h1>Quadratic Funding DAO</h1>
            <p>Match community donations to public-good proposals via quadratic funding rounds.</p>
            <div className="section-tabs">
              {sections.map((s) => (
                <button key={s} className={`tab-btn ${active === s ? 'active' : ''}`} onClick={() => setActive(s)}>{s}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="three-inline">
            <Background3D />
          </div>
        </div>
      </div>

      <main className="page-content relative z-10 pt-10 pb-20 px-6">
        <div className="content-wrap max-w-7xl mx-auto flex flex-col gap-8">
          <Suspense fallback={<div className="card p-8 text-center text-slate-400">Loading…</div>}>
            {active === 'Dashboard' && <Dashboard />}
            {active === 'Projects' && <ProjectEditor />}
            {active === 'Grant Registry' && <GrantRegistry eth={eth} />}
            {active === 'Round Manager' && <RoundManager eth={eth} />}
            {active === 'Donation Vault' && <DonationVault eth={eth} />}
            {active === 'Matching Pool' && <MatchingPool eth={eth} />}
            {active === 'Governance Token' && <GovernanceToken eth={eth} />}
          </Suspense>

          <footer className="about-section mt-12 border-t border-white/5 pt-8">
            <div className="info-card bg-slate-800/50 backdrop-blur-md rounded-2xl p-8 border border-white/5">
              <div className="grid md:grid-cols-4 gap-8">
                <div>
                  <h3 className="text-lg font-bold text-white mb-4">About</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Empowering public goods through quadratic funding and community governance.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-4">Resources</h3>
                  <ul className="text-sm text-slate-400 space-y-2">
                    <li><a href="#" className="hover:text-cyan-400 transition-colors">Documentation</a></li>
                    <li><a href="#" className="hover:text-cyan-400 transition-colors">Security & Audits</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-4">Governance</h3>
                  <ul className="text-sm text-slate-400 space-y-2">
                    <li><a href="#" className="hover:text-cyan-400 transition-colors">DAO Governance</a></li>
                    <li><a href="#" className="hover:text-cyan-400 transition-colors">Voting Dashboard</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-4">Legal</h3>
                  <ul className="text-sm text-slate-400 space-y-2">
                    <li><a href="#" className="hover:text-cyan-400 transition-colors">Terms & Privacy</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  )
}
