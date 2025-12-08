'use client'

import React from 'react'
import { DonationModal } from './DonationModal'

const PROJECTS = [
  {
    id: 1,
    title: 'OpenSchool',
    tagline: 'Community Learning Hubs',
    description: 'Providing accessible education to underserved communities worldwide',
    category: 'Education',
    funded: '3.2 ETH',
    match: '1.1 ETH',
    contributors: 142,
    progress: 65,
  },
  {
    id: 2,
    title: 'CleanStreams',
    tagline: 'River Restoration Initiative',
    description: 'Environmental protection through community-driven restoration efforts',
    category: 'Environment',
    funded: '1.5 ETH',
    match: '0.8 ETH',
    contributors: 89,
    progress: 48,
  },
  {
    id: 3,
    title: 'LibreTools',
    tagline: 'Open Source Development',
    description: 'Supporting critical open source infrastructure projects',
    category: 'Technology',
    funded: '2.0 ETH',
    match: '0.9 ETH',
    contributors: 156,
    progress: 72,
  },
  {
    id: 4,
    title: 'HealthNet',
    tagline: 'Global Healthcare Access',
    description: 'Bridging healthcare gaps in remote and underserved regions',
    category: 'Healthcare',
    funded: '2.8 ETH',
    match: '1.2 ETH',
    contributors: 203,
    progress: 81,
  },
  {
    id: 5,
    title: 'GreenFarm',
    tagline: 'Sustainable Agriculture',
    description: 'Promoting regenerative farming and food security initiatives',
    category: 'Agriculture',
    funded: '1.2 ETH',
    match: '0.6 ETH',
    contributors: 67,
    progress: 42,
  },
  {
    id: 6,
    title: 'CodeAcademy',
    tagline: 'Free Tech Education',
    description: 'Making high-quality tech education accessible to everyone',
    category: 'Education',
    funded: '2.5 ETH',
    match: '1.0 ETH',
    contributors: 178,
    progress: 68,
  },
]

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  Education: { bg: 'bg-blue-500/20', text: 'text-blue-300' },
  Environment: { bg: 'bg-green-500/20', text: 'text-green-300' },
  Technology: { bg: 'bg-purple-500/20', text: 'text-purple-300' },
  Healthcare: { bg: 'bg-red-500/20', text: 'text-red-300' },
  Agriculture: { bg: 'bg-amber-500/20', text: 'text-amber-300' },
}

export default function ProjectGrid() {
  const [selectedProject, setSelectedProject] = React.useState<string | null>(null)

  return (
    <div className="container-main">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {PROJECTS.map((project) => {
          const categoryColors: Record<string, any> = {
            Education: { bg: 'bg-blue-500/20', text: 'text-blue-300' },
            Environment: { bg: 'bg-green-500/20', text: 'text-green-300' },
            Technology: { bg: 'bg-purple-500/20', text: 'text-purple-300' },
            Healthcare: { bg: 'bg-red-500/20', text: 'text-red-300' },
            Agriculture: { bg: 'bg-amber-500/20', text: 'text-amber-300' },
          }
          const colors = categoryColors[project.category] || categoryColors['Technology']
          return (
            <div
              key={project.id}
              className="group relative overflow-hidden rounded-3xl"
            >
              {/* Glass Card */}
              <div className="glass-panel p-6 md:p-8 space-y-6 h-full flex flex-col relative z-10">
                {/* Header */}
                <div className="space-y-3">
                  {/* Category Tag */}
                  <div className="inline-block">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${colors.bg} ${colors.text}`}>
                      {project.category}
                    </span>
                  </div>

                  {/* Title */}
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-neon-cyan transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-sm md:text-base mt-1 text-gray-400">{project.tagline}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm leading-relaxed flex-grow text-gray-300">
                  {project.description}
                </p>

                {/* Stats Row */}
                <div className="flex gap-4 pt-4 border-t border-white/10">
                  <div>
                    <p className="text-xs mb-1 text-gray-400">Contributors</p>
                    <p className="text-lg font-semibold text-white">{project.contributors}</p>
                  </div>
                  <div>
                    <p className="text-xs mb-1 text-gray-400">Funded</p>
                    <p className="text-lg font-semibold text-gradient">{project.funded}</p>
                  </div>
                  <div>
                    <p className="text-xs mb-1 text-gray-400">Match</p>
                    <p className="text-lg font-semibold text-neon-mint">{project.match}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-400">Funding Progress</p>
                    <p className="text-xs font-semibold text-white">{project.progress}%</p>
                  </div>
                  <div className="w-full h-2 rounded-full overflow-hidden bg-white/5">
                    <div
                      className="h-full rounded-full transition-all duration-1000 bg-gradient-to-r from-neon-purple to-neon-cyan"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setSelectedProject(project.title)}
                    className="flex-1 btn-premium py-2 text-sm"
                  >
                    Contribute
                  </button>
                  <button className="flex-1 btn-ghost-premium py-2 text-sm">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <DonationModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        projectTitle={selectedProject || ''}
      />
    </div>
  )
}

