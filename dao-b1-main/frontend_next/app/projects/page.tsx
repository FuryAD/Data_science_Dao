import { Metadata } from 'next'
import Navbar from '../../components/Navbar'
import CountUp from '../../components/CountUp'
import { generateMetadata } from '../../utils/seo'

export const metadata: Metadata = generateMetadata(
  'Projects',
  'Browse and support innovative projects in our quadratic funding ecosystem',
  '/projects'
)

interface Project {
  id: number
  name: string
  description: string
  category: string
  owner: string
  avatar: string
  raised: string
  goal: string
  backers: number
  impact: string
  trending?: boolean
}

const projects: Project[] = [
  {
    id: 1,
    name: 'Web3 Onboarding Platform',
    description: 'Simplifying blockchain access for mainstream users with an intuitive wallet and dApp browser',
    category: 'Infrastructure',
    owner: 'Aurora Labs',
    avatar: '🚀',
    raised: '$45,230',
    goal: '$50,000',
    backers: 523,
    impact: '15K users onboarded',
    trending: true
  },
  {
    id: 2,
    name: 'Decentralized Climate Registry',
    description: 'Transparent, tamper-proof carbon credit tracking on blockchain for global climate action',
    category: 'Climate',
    owner: 'GreenChain',
    avatar: '🌱',
    raised: '$67,890',
    goal: '$75,000',
    backers: 782,
    impact: '2.5M tons CO2 tracked'
  },
  {
    id: 3,
    name: 'Web3 Education Hub',
    description: 'Free, gamified courses teaching blockchain development to underserved communities worldwide',
    category: 'Education',
    owner: 'EduDAO',
    avatar: '📚',
    raised: '$32,100',
    goal: '$40,000',
    backers: 412,
    impact: '5,200 students'
  },
  {
    id: 4,
    name: 'DAO Treasury Analytics',
    description: 'Real-time analytics and insights for decentralized autonomous organization fund management',
    category: 'Tools',
    owner: 'Analytics Guild',
    avatar: '📊',
    raised: '$28,450',
    goal: '$35,000',
    backers: 234,
    impact: '89 DAOs using',
    trending: true
  },
  {
    id: 5,
    name: 'Privacy-Preserving DeFi',
    description: 'Building zero-knowledge privacy solutions for DeFi to protect user financial data',
    category: 'Infrastructure',
    owner: 'ZK Labs',
    avatar: '🔐',
    raised: '$91,200',
    goal: '$100,000',
    backers: 1024,
    impact: '$50M TVL protected'
  },
  {
    id: 6,
    name: 'Sustainable NFT Marketplace',
    description: 'Carbon-neutral NFT platform with verified eco-friendly minting and trading',
    category: 'Marketplace',
    owner: 'EcoNFT',
    avatar: '🎨',
    raised: '$54,320',
    goal: '$60,000',
    backers: 678,
    impact: 'Zero carbon emissions'
  }
]

function ProjectCard({ project }: { project: Project }) {
  const progressPercentage = (parseInt(project.raised.replace(/[^0-9]/g, '')) / parseInt(project.goal.replace(/[^0-9]/g, ''))) * 100

  const categoryColors: Record<string, string> = {
    'Infrastructure': '#A855F7',
    'Climate': '#00FFA3',
    'Education': '#00E5FF',
    'Tools': '#FFB800',
    'Marketplace': '#FF6B6B'
  }

  return (
    <div className="glass-panel p-6 md:p-8 group cursor-pointer hover:border-white/20 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all duration-300">
      {project.trending && (
        <div className="absolute -top-3 -right-3 px-3 py-1 rounded-full text-xs font-bold shadow-lg" style={{ background: 'linear-gradient(135deg, #A855F7, #00E5FF)' }}>
          🔥 Trending
        </div>
      )}

      <div className="flex items-start gap-4 mb-6">
        <div className="text-4xl p-3 bg-white/5 rounded-2xl">{project.avatar}</div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white group-hover:text-neon-cyan transition-colors">{project.name}</h3>
          <p className="text-sm text-gray-400">{project.owner}</p>
        </div>
      </div>

      <p className="text-sm text-gray-300 mb-6 leading-relaxed min-h-[60px]">{project.description}</p>

      <div className="flex gap-2 mb-6">
        <span className="px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: categoryColors[project.category] + '20', border: `1px solid ${categoryColors[project.category]}40`, color: categoryColors[project.category] }}>
          {project.category}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mb-6 space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-gray-400">Progress</span>
          <span className="text-white font-medium">{Math.min(progressPercentage, 100).toFixed(0)}%</span>
        </div>
        <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000 ease-out"
            style={{
              width: `${Math.min(progressPercentage, 100)}%`,
              background: 'linear-gradient(90deg, #A855F7 0%, #00E5FF 50%, #00FFA3 100%)'
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6 pt-4 border-t border-white/10">
        <div>
          <p className="text-xs text-gray-400 mb-1">Raised</p>
          <p className="text-white font-bold text-lg">{project.raised}</p>
          <p className="text-xs text-gray-500">of {project.goal}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-1">Backers</p>
          <p className="text-white font-bold text-lg">{project.backers.toLocaleString()}</p>
        </div>
      </div>

      <p className="text-sm text-neon-cyan font-medium mb-6 flex items-center gap-2">
        <span>✨</span> {project.impact}
      </p>

      <button className="btn-premium w-full py-3 text-sm">
        Back This Project
      </button>
    </div>
  )
}

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-dark-bg overflow-hidden">
        {/* Header Section */}
        <section className="relative pt-32 md:pt-40 pb-12 md:pb-24">
          <div className="container-main relative z-10">
            <div className="max-w-3xl mb-8">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
                <span className="text-gradient">Featured Projects</span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Support innovative projects shaping the future of Web3, climate action, education, and beyond. Every contribution counts in our democratic funding model.
              </p>
            </div>
          </div>

          {/* Decorative gradient orbs */}
          <div className="absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none animate-pulse-slow bg-gradient-neon" />
          <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full blur-3xl opacity-15 pointer-events-none animate-pulse-slow delay-1000 bg-gradient-to-br from-neon-cyan to-neon-mint" />
        </section>

        {/* Search & Filter */}
        <section className="relative py-8 border-t border-b border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="container-main">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Search projects..."
                className="flex-1 bg-white/5 border border-white/10 px-6 py-3 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-neon-purple/50 focus:ring-1 focus:ring-neon-purple/50 transition-all"
              />
              <select className="bg-white/5 border border-white/10 px-6 py-3 rounded-xl text-white focus:outline-none focus:border-neon-purple/50 focus:ring-1 focus:ring-neon-purple/50 transition-all cursor-pointer">
                <option className="bg-dark-bg">All Categories</option>
                <option className="bg-dark-bg">Infrastructure</option>
                <option className="bg-dark-bg">Climate</option>
                <option className="bg-dark-bg">Education</option>
                <option className="bg-dark-bg">Tools</option>
                <option className="bg-dark-bg">Marketplace</option>
              </select>
              <select className="bg-white/5 border border-white/10 px-6 py-3 rounded-xl text-white focus:outline-none focus:border-neon-purple/50 focus:ring-1 focus:ring-neon-purple/50 transition-all cursor-pointer">
                <option className="bg-dark-bg">Trending</option>
                <option className="bg-dark-bg">Recently Added</option>
                <option className="bg-dark-bg">Most Funded</option>
                <option className="bg-dark-bg">Ending Soon</option>
              </select>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="relative py-12 md:py-24">
          <div className="container-main">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center space-y-2">
                <p className="text-3xl md:text-4xl font-bold text-gradient text-glow">
                  <CountUp end={127} duration={2000} />
                </p>
                <p className="text-gray-400 font-medium">Active Projects</p>
              </div>
              <div className="text-center space-y-2">
                <p className="text-3xl md:text-4xl font-bold text-gradient text-glow">
                  <CountUp end={2.3} prefix="$" suffix="M" decimals={1} duration={2500} />
                </p>
                <p className="text-gray-400 font-medium">Total Funded</p>
              </div>
              <div className="text-center space-y-2">
                <p className="text-3xl md:text-4xl font-bold text-gradient text-glow">
                  <CountUp end={5.2} suffix="K" decimals={1} duration={2200} />
                </p>
                <p className="text-gray-400 font-medium">Contributors</p>
              </div>
              <div className="text-center space-y-2">
                <p className="text-3xl md:text-4xl font-bold text-gradient text-glow">
                  <CountUp end={42} duration={1800} />
                </p>
                <p className="text-gray-400 font-medium">Categories</p>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="relative py-12 md:py-24 pt-0">
          <div className="container-main">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 md:py-32">
          <div className="container-main">
            <div className="glass-panel p-12 text-center max-w-3xl mx-auto space-y-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/10 to-neon-cyan/10 pointer-events-none" />
              <h2 className="text-3xl md:text-4xl font-bold text-white relative z-10">Have a Project Idea?</h2>
              <p className="text-gray-300 text-lg leading-relaxed relative z-10">
                Submit your innovative project and apply for funding. Quadratic funding ensures fair, democratic allocation of resources.
              </p>
              <button className="btn-premium px-8 py-4 text-lg relative z-10">Submit Your Project</button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
