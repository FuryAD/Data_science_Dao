import type { Metadata } from 'next'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { generateMetadata } from '../../utils/seo'
import Link from 'next/link'

export const metadata: Metadata = generateMetadata(
    'Governance',
    'Vote on DAO proposals',
    '/governance'
)

const PROPOSALS = [
    {
        id: 1,
        title: 'Increase Matching Pool Allocation for Education',
        status: 'Active',
        votesFor: 125000,
        votesAgainst: 45000,
        endsIn: '2 days',
        author: '0x12...45AB'
    },
    {
        id: 2,
        title: 'Update Quadratic Formula Parameter',
        status: 'Passed',
        votesFor: 450000,
        votesAgainst: 12000,
        endsIn: 'Ended',
        author: '0x89...CD21'
    },
    {
        id: 3,
        title: 'Add New Category: AI Safety',
        status: 'Active',
        votesFor: 89000,
        votesAgainst: 92000,
        endsIn: '5 hours',
        author: '0x33...11FF'
    }
]

export default function GovernancePage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gradient-to-b from-dark-bg via-dark-bg to-dark-surface pt-32 pb-20">
                <div className="container-wide">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h1 className="text-5xl font-bold text-white mb-4">DAO <span className="text-gradient">Governance</span></h1>
                            <p className="text-gray-400 max-w-xl">Vote on proposals that shape the future of the platform. Your governance tokens represent your voting power.</p>
                        </div>
                        <Link href="/governance/create" className="btn-premium px-6 py-3">
                            + Create Proposal
                        </Link>
                    </div>

                    <div className="grid gap-6">
                        {PROPOSALS.map((proposal) => (
                            <div key={proposal.id} className="glass-panel p-6 hover:border-white/20 transition-all group">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${proposal.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-purple-500/20 text-purple-400'
                                            }`}>
                                            {proposal.status}
                                        </span>
                                        <span className="text-gray-500 text-sm">Ends: {proposal.endsIn}</span>
                                    </div>
                                    <span className="text-gray-500 text-sm font-mono">{proposal.author}</span>
                                </div>

                                <Link href={`/governance/${proposal.id}`}>
                                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-neon-cyan transition-colors">{proposal.title}</h3>
                                </Link>

                                <div className="mt-6">
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-gray-400">Votes For: <span className="text-white font-semibold">{proposal.votesFor.toLocaleString()}</span></span>
                                        <span className="text-gray-400">Votes Against: <span className="text-white font-semibold">{proposal.votesAgainst.toLocaleString()}</span></span>
                                    </div>
                                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden flex">
                                        <div
                                            className="h-full bg-green-500"
                                            style={{ width: `${(proposal.votesFor / (proposal.votesFor + proposal.votesAgainst)) * 100}%` }}
                                        />
                                        <div
                                            className="h-full bg-red-500"
                                            style={{ width: `${(proposal.votesAgainst / (proposal.votesFor + proposal.votesAgainst)) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
