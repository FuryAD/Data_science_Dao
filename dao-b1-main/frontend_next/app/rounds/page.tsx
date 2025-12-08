import { Metadata } from 'next'
import Navbar from '../../components/Navbar'
import CountUp from '../../components/CountUp'
import { generateMetadata } from '../../utils/seo'

export const metadata: Metadata = generateMetadata(
  'Funding Rounds',
  'Explore active funding rounds and participate in quadratic funding initiatives',
  '/rounds'
)

interface Round {
  id: number
  name: string
  description: string
  status: 'active' | 'upcoming' | 'closed'
  startDate: string
  endDate: string
  fundingGoal: string
  totalFunded: string
  participants: number
  matchingPool: string
}

const rounds: Round[] = [
  {
    id: 1,
    name: 'Web3 Infrastructure Round',
    description: 'Support foundational infrastructure projects building the decentralized web',
    status: 'active',
    startDate: 'Jan 15, 2024',
    endDate: 'Feb 15, 2024',
    fundingGoal: '$500K',
    totalFunded: '$425K',
    participants: 1243,
    matchingPool: '$100K'
  },
  {
    id: 2,
    name: 'Climate Impact Round',
    description: 'Fund projects tackling climate change and environmental sustainability',
    status: 'active',
    startDate: 'Jan 20, 2024',
    endDate: 'Feb 20, 2024',
    fundingGoal: '$300K',
    totalFunded: '$182K',
    participants: 856,
    matchingPool: '$75K'
  },
  {
    id: 3,
    name: 'Education & Research',
    description: 'Support educational initiatives and academic research in blockchain',
    status: 'upcoming',
    startDate: 'Mar 1, 2024',
    endDate: 'Apr 1, 2024',
    fundingGoal: '$200K',
    totalFunded: '$0',
    participants: 0,
    matchingPool: '$50K'
  },
  {
    id: 4,
    name: 'Developer Tools Round',
    description: 'Empower developers with tools and libraries for Web3 development',
    status: 'closed',
    startDate: 'Dec 1, 2023',
    endDate: 'Jan 15, 2024',
    fundingGoal: '$400K',
    totalFunded: '$398K',
    participants: 2341,
    matchingPool: '$150K'
  }
]

function RoundCard({ round }: { round: Round }) {
  const statusColors = {
    active: { bg: 'bg-green-500/20', text: 'text-green-400', label: 'Active' },
    upcoming: { bg: 'bg-blue-500/20', text: 'text-blue-400', label: 'Upcoming' },
    closed: { bg: 'bg-gray-500/20', text: 'text-gray-400', label: 'Closed' }
  }

  const colors = statusColors[round.status]
  const fundingPercentage = (parseInt(round.totalFunded.replace(/[^0-9]/g, '')) / parseInt(round.fundingGoal.replace(/[^0-9]/g, ''))) * 100

  return (
    <div className="glass-panel p-8 group hover:border-white/20 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all duration-300">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neon-cyan transition-colors">{round.name}</h3>
          <p className="text-gray-300 text-sm leading-relaxed">{round.description}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors.text} ${colors.bg} border border-white/5`}>
          {colors.label}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8 pt-6 border-t border-white/10">
        <div>
          <p className="text-gray-400 text-xs mb-1">Start Date</p>
          <p className="text-white font-semibold">{round.startDate}</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs mb-1">End Date</p>
          <p className="text-white font-semibold">{round.endDate}</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs mb-1">Matching Pool</p>
          <p className="text-white font-semibold text-neon-mint">{round.matchingPool}</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs mb-1">Participants</p>
          <p className="text-white font-semibold">{round.participants.toLocaleString()}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8 space-y-2">
        <div className="flex justify-between items-center mb-2">
          <p className="text-gray-400 text-sm">Funding Progress</p>
          <span className="text-text-gradient font-semibold">{fundingPercentage.toFixed(0)}%</span>
        </div>
        <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000 ease-out"
            style={{
              width: `${fundingPercentage}%`,
              background: 'linear-gradient(90deg, #A855F7 0%, #00E5FF 50%, #00FFA3 100%)'
            }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>{round.totalFunded} raised</span>
          <span>Goal: {round.fundingGoal}</span>
        </div>
      </div>

      <button className="btn-premium w-full py-3 text-sm">
        {round.status === 'closed' ? 'View Results' : round.status === 'upcoming' ? 'Learn More' : 'Contribute Now'}
      </button>
    </div>
  )
}

export default function RoundsPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-dark-bg overflow-hidden">
        {/* Header Section */}
        <section className="relative pt-32 md:pt-40 pb-12 md:pb-24">
          <div className="container-main relative z-10">
            <div className="max-w-3xl mb-8">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
                <span className="text-gradient">Funding Rounds</span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Participate in our quadratic funding rounds to support innovative projects aligned with our mission. Each round democratizes the funding process, giving every contributor equal power regardless of the amount they give.
              </p>
            </div>
          </div>

          {/* Decorative gradient orbs */}
          <div className="absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none animate-pulse-slow bg-gradient-to-br from-neon-purple to-neon-cyan" />
          <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full blur-3xl opacity-15 pointer-events-none animate-pulse-slow delay-1000 bg-gradient-to-br from-neon-cyan to-neon-mint" />
        </section>

        {/* Stats Section */}
        <section className="relative py-12 md:py-24 border-t border-b border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="container-main">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center space-y-2">
                <p className="text-3xl md:text-4xl font-bold text-gradient text-glow">
                  <CountUp end={4} duration={1500} />
                </p>
                <p className="text-gray-400 font-medium">Active Rounds</p>
              </div>
              <div className="text-center space-y-2">
                <p className="text-3xl md:text-4xl font-bold text-gradient text-glow">
                  <CountUp end={2.3} prefix="$" suffix="M" decimals={1} duration={2500} />
                </p>
                <p className="text-gray-400 font-medium">Total Funded</p>
              </div>
              <div className="text-center space-y-2">
                <p className="text-3xl md:text-4xl font-bold text-gradient text-glow">
                  <CountUp end={5.2} suffix="K" decimals={1} duration={2000} />
                </p>
                <p className="text-gray-400 font-medium">Contributors</p>
              </div>
              <div className="text-center space-y-2">
                <p className="text-3xl md:text-4xl font-bold text-gradient text-glow">
                  <CountUp end={127} duration={2200} />
                </p>
                <p className="text-gray-400 font-medium">Projects</p>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Tabs */}
        <section className="relative py-12 md:py-24">
          <div className="container-main">
            <div className="flex gap-4 mb-12 overflow-x-auto pb-4 no-scrollbar">
              {['All', 'Active', 'Upcoming', 'Closed'].map((tab) => (
                <button
                  key={tab}
                  className={`px-8 py-3 rounded-xl whitespace-nowrap font-semibold transition-all duration-300 ${tab === 'All'
                    ? 'bg-gradient-to-r from-neon-purple to-neon-cyan text-white shadow-lg shadow-neon-purple/20'
                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Rounds Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {rounds.map((round) => (
                <RoundCard key={round.id} round={round} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 md:py-32">
          <div className="container-main">
            <div className="glass-panel p-12 text-center max-w-3xl mx-auto space-y-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/10 to-neon-mint/10 pointer-events-none" />
              <h2 className="text-3xl md:text-4xl font-bold text-white relative z-10">Ready to Make an Impact?</h2>
              <p className="text-gray-300 text-lg leading-relaxed relative z-10">
                Browse all active projects and make your contribution in any ongoing round. Your vote matters!
              </p>
              <button className="btn-premium px-8 py-4 text-lg relative z-10">Explore Projects</button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
