import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function SecurityPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-dark-bg via-dark-bg to-dark-surface pt-32 pb-20">
        <div className="container-main max-w-4xl">
          <h1 className="text-5xl font-bold text-white mb-8">Security & Audits</h1>
          
          <div className="glass-panel p-8 md:p-12 space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Security Standards</h2>
              <p className="text-gray-300 leading-relaxed">
                At Quadratic Funding DAO, security is our top priority. We implement industry-leading security practices to protect user funds and data.
              </p>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-bold text-white">1. Smart Contract Audits</h3>
              <p className="text-gray-300 leading-relaxed">
                All smart contracts are audited by reputable third-party security firms before deployment. Our audit reports are available upon request.
              </p>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-bold text-white">2. Authentication & Authorization</h3>
              <p className="text-gray-300 leading-relaxed">
                We use token-based authentication with industry-standard encryption to protect user accounts and API access.
              </p>
              <ul className="text-gray-300 space-y-2 ml-6 list-disc">
                <li>End-to-end encryption for sensitive data</li>
                <li>Multi-signature wallets for large transactions</li>
                <li>Time-locked smart contracts for critical operations</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-bold text-white">3. Bug Bounty Program</h3>
              <p className="text-gray-300 leading-relaxed">
                We maintain an active bug bounty program to incentivize security researchers to responsibly disclose vulnerabilities. 
                Rewards range from $100 to $50,000 depending on severity.
              </p>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-bold text-white">4. Regular Penetration Testing</h3>
              <p className="text-gray-300 leading-relaxed">
                Our systems undergo regular penetration testing by certified security professionals to identify and remediate vulnerabilities.
              </p>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-bold text-white">5. Incident Response Plan</h3>
              <p className="text-gray-300 leading-relaxed">
                We maintain a comprehensive incident response plan and 24/7 security monitoring to quickly identify and respond to any security issues.
              </p>
            </section>

            <div className="border-t border-white/10 pt-8 mt-8">
              <h3 className="text-xl font-bold text-white mb-4">Security Contact</h3>
              <p className="text-gray-300">
                To report security vulnerabilities, please email: <span className="text-neon-cyan">security@qfdao.com</span>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
