'use client'

import React from 'react'
import { useTheme } from './ThemeProvider'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full backdrop-blur-md bg-white/10 dark:bg-black/20 border border-white/20 shadow-lg cursor-pointer flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-neon-purple/50 group"
      aria-label="Toggle Theme"
    >
      <div className="relative w-6 h-6 text-yellow-500 dark:text-blue-400">
        <Sun
          className={`absolute inset-0 w-full h-full transition-all duration-500 transform ${theme === 'dark' ? 'rotate-90 opacity-0 scale-0' : 'rotate-0 opacity-100 scale-100'
            }`}
        />
        <Moon
          className={`absolute inset-0 w-full h-full transition-all duration-500 transform ${theme === 'dark' ? 'rotate-0 opacity-100 scale-100' : '-rotate-90 opacity-0 scale-0'
            }`}
        />
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </button>
  )
}
