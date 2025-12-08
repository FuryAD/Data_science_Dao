'use client'

import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { z } from 'zod'
import { useToast } from '../../components/ui/Toast'

// Zod Schema
const submitSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  category: z.string().min(1, 'Please select a category'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  budget: z.string().regex(/^\d+$/, 'Budget must be a number'),
  wallet: z.string().startsWith('0x', 'Must be a valid ETH address').length(42, 'Invalid address length'),
})

interface SubmitForm {
  title: string
  category: string
  description: string
  budget: string
  wallet: string
}

export default function SubmitProjectPage() {
  const [formData, setFormData] = useState<SubmitForm>({
    title: '',
    category: 'Education',
    description: '',
    budget: '',
    wallet: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const { addToast } = useToast()

  const categories = ['Education', 'Environment', 'Technology', 'Healthcare', 'Agriculture', 'Governance']

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const name = e.target.name as keyof SubmitForm
    const value = e.target.value
    setFormData(prev => ({ ...prev, [name]: value } as SubmitForm))
    if (errors[name as string]) {
      setErrors(prev => ({ ...prev, [name as string]: '' }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Zod Validation Check
    const result = submitSchema.safeParse(formData)

    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      result.error.issues.forEach((issue) => {
        const fieldName = String(issue.path[0])
        fieldErrors[fieldName] = issue.message
      })
      setErrors(fieldErrors)
      addToast("Please fix the validation errors", "error")
      return
    }

    setErrors({})
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      addToast("Project submitted successfully!", "success")
      window.scrollTo(0, 0)
    }, 1500)
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-dark-bg via-dark-bg to-dark-surface pt-32 pb-20">
        <div className="container-main max-w-3xl">
          {submitted ? (
            <div className="glass-panel p-12 text-center animate-fade-in relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent" />
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/50">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">Project Submitted!</h2>
              <p className="text-gray-300 mb-8 max-w-md mx-auto">
                Your proposal has been successfully recorded on-chain and is pending review by the governance committee.
              </p>
              <button
                onClick={() => { setSubmitted(false); setFormData({ title: '', category: 'Education', description: '', budget: '', wallet: '' }) }}
                className="btn-primary px-8 py-3"
              >
                Submit Another Project
              </button>
            </div>
          ) : (
            <>
              <div className="mb-10 text-center">
                <h1 className="text-5xl font-bold text-white mb-4">Submit a <span className="text-gradient">Proposal</span></h1>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  Share your public goods project with the DAO. Approved projects will be eligible for the next quadratic funding round.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="glass-panel p-8 md:p-10 space-y-8 relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-neon-cyan/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                {/* Title */}
                <div className="space-y-2">
                  <label htmlFor="title" className="block text-sm font-semibold text-gray-300">Project Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`w-full bg-black/40 border ${errors.title ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all`}
                    placeholder="e.g. Decentralized Clean Water Initiative"
                  />
                  {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title}</p>}
                </div>

                {/* Category & Budget Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="category" className="block text-sm font-semibold text-gray-300">Category</label>
                    <div className="relative">
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:border-neon-cyan transition-all cursor-pointer"
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat} className="bg-dark-surface">{cat}</option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="budget" className="block text-sm font-semibold text-gray-300">Funding Goal (ETH)</label>
                    <input
                      type="text"
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className={`w-full bg-black/40 border ${errors.budget ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-neon-cyan transition-all`}
                      placeholder="e.g. 5.0"
                    />
                    {errors.budget && <p className="text-red-400 text-xs mt-1">{errors.budget}</p>}
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label htmlFor="description" className="block text-sm font-semibold text-gray-300">Project Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={6}
                    className={`w-full bg-black/40 border ${errors.description ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-neon-cyan transition-all resize-none`}
                    placeholder="Describe your project, its goals, and how it benefits the community..."
                  />
                  {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description}</p>}
                </div>

                {/* Wallet Address */}
                <div className="space-y-2">
                  <label htmlFor="wallet" className="block text-sm font-semibold text-gray-300">Recipient Wallet Address</label>
                  <input
                    type="text"
                    id="wallet"
                    name="wallet"
                    value={formData.wallet}
                    onChange={handleChange}
                    className={`w-full bg-black/40 border ${errors.wallet ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-neon-cyan transition-all font-mono text-sm`}
                    placeholder="0x..."
                  />
                  {errors.wallet && <p className="text-red-400 text-xs mt-1">{errors.wallet}</p>}
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full btn-premium py-4 text-lg font-bold shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? 'Processing...' : 'Submit Proposal'}
                  </button>
                  <p className="text-center text-xs text-gray-500 mt-4">By submitting, you agree to the DAO's code of conduct and governance rules.</p>
                </div>
              </form>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
