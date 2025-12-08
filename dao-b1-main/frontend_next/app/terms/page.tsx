import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-dark-bg via-dark-bg to-dark-surface pt-32 pb-20">
        <div className="container-main max-w-4xl">
          <h1 className="text-5xl font-bold text-white mb-8">Terms & Privacy</h1>
          
          <div className="glass-panel p-8 md:p-12 space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Terms of Service</h2>
              <p className="text-gray-300 leading-relaxed">
                Welcome to Quadratic Funding DAO. By using our platform, you agree to comply with these terms and conditions.
              </p>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-bold text-white">1. Use License</h3>
              <p className="text-gray-300 leading-relaxed">
                Permission is granted to temporarily download one copy of the materials on our platform for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="text-gray-300 space-y-2 ml-6 list-disc">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to decompile or reverse engineer any software</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-bold text-white">2. Privacy Policy</h3>
              <p className="text-gray-300 leading-relaxed">
                Your privacy is important to us. We collect minimal personal information and do not share it with third parties without your consent.
              </p>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-bold text-white">3. Disclaimer</h3>
              <p className="text-gray-300 leading-relaxed">
                The materials on our platform are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-bold text-white">4. Limitations</h3>
              <p className="text-gray-300 leading-relaxed">
                In no event shall Quadratic Funding DAO or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our platform.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
