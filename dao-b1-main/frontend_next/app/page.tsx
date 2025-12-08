import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import FeatureSection from '../components/FeatureSection'
import ProjectGrid from '../components/ProjectGrid'
import CountUp from '../components/CountUp'

export default function Home() {
  return (
    <>
      <Navbar />

      <div className="overflow-hidden">
        {/* Hero Section */}
        <section className="relative min-h-screen pt-32 md:pt-40 pb-12 md:pb-24">
          <Hero />
        </section>

        {/* Features Section */}
        <section className="relative py-12 md:py-24 bg-gradient-to-b from-transparent to-dark-bg/50">
          <FeatureSection />
        </section>

        {/* Stats Section */}
        <section className="relative py-12 md:py-24 border-y border-white/10 bg-white/5">
          <div className="container-main">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center space-y-2">
                <p className="text-3xl md:text-4xl font-bold text-gradient text-glow">
                  <CountUp end={12.4} prefix="$" suffix="M" decimals={1} duration={2500} />
                </p>
                <p className="text-gray-400 font-medium">Total Funded</p>
              </div>
              <div className="text-center space-y-2">
                <p className="text-3xl md:text-4xl font-bold text-gradient text-glow">
                  <CountUp end={1240} suffix="+" duration={2000} />
                </p>
                <p className="text-gray-400 font-medium">Active Projects</p>
              </div>
              <div className="text-center space-y-2">
                <p className="text-3xl md:text-4xl font-bold text-gradient text-glow">
                  <CountUp end={48} suffix="K+" duration={2200} />
                </p>
                <p className="text-gray-400 font-medium">Contributors</p>
              </div>
              <div className="text-center space-y-2">
                <p className="text-3xl md:text-4xl font-bold text-gradient text-glow">
                  <CountUp end={12} duration={1800} />
                </p>
                <p className="text-gray-400 font-medium">Rounds Completed</p>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="relative py-12 md:py-24">
          <div className="container-main">
            <div className="mb-12 md:mb-16 text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                Featured <span className="text-gradient">Projects</span>
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl leading-relaxed">
                Discover impactful initiatives powered by quadratic funding.
              </p>
            </div>
            <ProjectGrid />
          </div>
        </section>
      </div>

    </>
  )
}
