import { Metadata } from 'next'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { generateMetadata } from '../../utils/seo'
import { AdminCharts } from '../../components/admin/AdminCharts'

export const metadata: Metadata = generateMetadata(
  'Admin Dashboard',
  'Manage funding rounds, projects, and view analytics',
  '/admin'
)

interface DashboardStat {
  label: string
  value: string
  change: string
  icon: string
}

interface RecentActivity {
  id: number
  type: string
  description: string
  timestamp: string
}

const stats: DashboardStat[] = [
  { label: 'Total Funding', value: '$2.3M', change: '+12% this month', icon: '💰' },
  { label: 'Active Projects', value: '127', change: '+8 this month', icon: '📊' },
  { label: 'Contributors', value: '5,234', change: '+342 this month', icon: '👥' },
  { label: 'Rounds Active', value: '4', change: '2 starting soon', icon: '🎯' }
]

const recentActivity: RecentActivity[] = [
  { id: 1, type: 'Contribution', description: 'Sarah contributed $500 to Web3 Onboarding', timestamp: '2 hours ago' },
  { id: 2, type: 'Project', description: 'New project submitted: Decentralized Cloud Storage', timestamp: '4 hours ago' },
  { id: 3, type: 'Round', description: 'Climate Impact Round reached $500K milestone', timestamp: '1 day ago' },
  { id: 4, type: 'Approval', description: 'Education Hub project approved for funding', timestamp: '2 days ago' }
]

export default function AdminPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-dark-bg via-dark-bg to-dark-surface">
        {/* Header Section */}
        <section className="relative pt-32 md:pt-40 pb-12">
          <div className="container-wide">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
                  Admin <span className="text-gradient">Dashboard</span>
                </h1>
                <p className="text-gray-300">Welcome back! Here's an overview of your DAO's performance.</p>
              </div>
              <button className="btn-primary">Export Report</button>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="relative py-8">
          <div className="container-wide">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="glass-card">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-gray-400 text-sm">{stat.label}</p>
                      <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
                    </div>
                    <span className="text-3xl">{stat.icon}</span>
                  </div>
                  <p className="text-sm text-text-gradient font-semibold">{stat.change}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Charts Section */}
        <section className="relative py-8">
          <div className="container-wide">
            <AdminCharts />
          </div>
        </section>

        {/* Management Tables */}
        <section className="relative py-8">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <div className="glass-card">
                <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex gap-4 pb-4 border-b border-white/10 last:border-0">
                      <div className="text-2xl">{activity.type === 'Contribution' ? '💳' : activity.type === 'Project' ? '📝' : activity.type === 'Round' ? '🎯' : '✅'}</div>
                      <div className="flex-1">
                        <p className="text-white text-sm font-semibold">{activity.description}</p>
                        <p className="text-gray-400 text-xs">{activity.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="glass-card">
                <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
                <div className="space-y-3">
                  <button className="w-full btn-primary py-3 font-semibold hover:shadow-lg transition-shadow">
                    Start New Funding Round
                  </button>
                  <button className="w-full btn-secondary py-3 font-semibold hover:shadow-lg transition-shadow">
                    Review Pending Applications
                  </button>
                  <button className="w-full btn-secondary py-3 font-semibold hover:shadow-lg transition-shadow">
                    Update Matching Pool
                  </button>
                  <button className="w-full btn-secondary py-3 font-semibold hover:shadow-lg transition-shadow">
                    View Contributor Analytics
                  </button>
                  <button className="w-full btn-secondary py-3 font-semibold hover:shadow-lg transition-shadow">
                    Generate Financial Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Active Rounds Management */}
        <section className="relative py-8">
          <div className="container-wide">
            <div className="glass-card">
              <h2 className="text-xl font-bold text-white mb-6">Active Funding Rounds</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="pb-3 text-gray-400 text-sm font-semibold">Round Name</th>
                      <th className="pb-3 text-gray-400 text-sm font-semibold">Status</th>
                      <th className="pb-3 text-gray-400 text-sm font-semibold">Progress</th>
                      <th className="pb-3 text-gray-400 text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'Web3 Infrastructure', status: 'Active', progress: 85 },
                      { name: 'Climate Impact', status: 'Active', progress: 60 },
                      { name: 'Education & Research', status: 'Upcoming', progress: 0 }
                    ].map((round, i) => (
                      <tr key={i} className="border-b border-white/10 last:border-0">
                        <td className="py-4 text-white font-semibold">{round.name}</td>
                        <td className="py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${round.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>
                            {round.status}
                          </span>
                        </td>
                        <td className="py-4">
                          <div className="w-20 bg-gray-800 rounded-full h-2">
                            <div
                              className="h-full rounded-full"
                              style={{ width: `${round.progress}%`, background: 'linear-gradient(90deg, #A855F7, #00E5FF)' }}
                            />
                          </div>
                        </td>
                        <td className="py-4">
                          <button className="text-purple-400 hover:text-purple-300 text-sm font-semibold">Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Security Notice */}
        <section className="relative py-12">
          <div className="container-wide max-w-2xl">
            <div className="glass-card border-l-4" style={{ borderLeftColor: '#00FFA3' }}>
              <div className="flex gap-4">
                <span className="text-2xl">🔒</span>
                <div>
                  <h3 className="text-white font-bold mb-2">Admin Panel Security</h3>
                  <p className="text-gray-300 text-sm">
                    This admin dashboard is protected. All actions are logged and monitored. Multi-signature requirements apply to critical operations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
