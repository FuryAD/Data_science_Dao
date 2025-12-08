'use client'

import React, { useState } from 'react'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import { motion } from 'framer-motion'
import { useToast } from '../../../components/ui/Toast'

export default function CreateProposalPage() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const { addToast } = useToast()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!title || !description) {
            addToast("Please fill in all fields", "error")
            return
        }
        // Mock submission
        addToast("Proposal submitted successfully!", "success")
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gradient-to-b from-dark-bg via-dark-bg to-dark-surface pt-32 pb-20">
                <div className="container-wide max-w-2xl">
                    <h1 className="text-4xl font-bold text-white mb-8">Create <span className="text-gradient">Proposal</span></h1>

                    <form onSubmit={handleSubmit} className="glass-panel p-8 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Proposal Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-cyan transition-colors"
                                placeholder="e.g., Increase Education budget"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-cyan transition-colors h-40"
                                placeholder="Detailed explanation of your proposal..."
                            />
                        </div>

                        <div className="pt-4">
                            <button type="submit" className="w-full btn-premium py-3 font-bold">
                                Submit Proposal
                            </button>
                            <p className="text-xs text-center text-gray-500 mt-3">Requires 100 QF-GOV tokens to submit</p>
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </>
    )
}
