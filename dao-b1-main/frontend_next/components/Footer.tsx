'use client'

import React from 'react'
import Link from 'next/link'

const FOOTER_LINKS = {
  Social: [
    { label: 'Twitter', href: 'https://twitter.com', external: true },
    { label: 'Discord', href: 'https://discord.com', external: true },
    { label: 'GitHub', href: 'https://github.com', external: true },
    { label: 'Mirror', href: 'https://mirror.xyz', external: true },
  ],
  Legal: [
    { label: 'Terms & Privacy', href: '/terms' },
    { label: 'Security & Audits', href: '/security' },
  ],
}

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-dark-bg/50 backdrop-blur-xl">
      <div className="container-main py-12 md:py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg bg-gradient-to-br from-neon-purple via-neon-cyan to-neon-mint text-dark-bg shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                ◆
              </div>
              <span className="font-bold text-xl text-white tracking-tight text-gradient">QF DAO</span>
            </div>
            <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
              Empowering public goods through quadratic funding and community governance.
            </p>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h4 className="font-bold text-white">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a 
                        href={link.href} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-gray-400 hover:text-neon-cyan transition-colors duration-200"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link 
                        href={link.href}
                        className="text-sm text-gray-400 hover:text-neon-cyan transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © 2025 Quadratic Funding DAO. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="w-2 h-2 rounded-full bg-neon-mint animate-pulse"></span>
            <span className="text-xs text-gray-400">System Operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
