'use client'

import React, { useState } from 'react'
import { Dialog } from './ui/Dialog'
import { useToast } from './ui/Toast'
import { motion } from 'framer-motion'
import { Check, Loader2 } from 'lucide-react'

interface DonationModalProps {
    isOpen: boolean
    onClose: () => void
    projectTitle: string
}

export function DonationModal({ isOpen, onClose, projectTitle }: DonationModalProps) {
    const [amount, setAmount] = useState('')
    const [token, setToken] = useState('ETH')
    const [isProcessing, setIsProcessing] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const { addToast } = useToast()

    const handleDonate = async () => {
        if (!amount || parseFloat(amount) <= 0) {
            addToast('Please enter a valid amount', 'error')
            return
        }

        setIsProcessing(true)

        // Simulate transaction
        setTimeout(() => {
            setIsProcessing(false)
            setIsSuccess(true)
            addToast(`Successfully donated ${amount} ${token} to ${projectTitle}!`, 'success')

            setTimeout(() => {
                setIsSuccess(false)
                setAmount('')
                onClose()
            }, 2000)
        }, 2000)
    }

    return (
        <Dialog isOpen={isOpen} onClose={onClose} title={`Back ${projectTitle}`}>
            {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-8">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4"
                    >
                        <Check className="w-8 h-8 text-green-400" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-white mb-2">Thank You!</h3>
                    <p className="text-gray-400 text-center">Your contribution has been recorded.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Select Token</label>
                        <div className="flex gap-3">
                            {['ETH', 'USDT', 'QFD'].map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setToken(t)}
                                    className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all ${token === t
                                            ? 'bg-neon-purple text-white shadow-lg shadow-purple-500/20'
                                            : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                        }`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Amount</label>
                        <div className="relative">
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0.00"
                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-cyan transition-colors"
                            />
                            <span className="absolute right-4 top-3 text-gray-500 font-semibold">{token}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Balance: 0.00 {token}</p>
                    </div>

                    <div className="pt-2">
                        <button
                            onClick={handleDonate}
                            disabled={isProcessing}
                            className="w-full btn-premium py-3 font-bold flex items-center justify-center gap-2"
                        >
                            {isProcessing ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                'Confirm Donation'
                            )}
                        </button>
                    </div>
                </div>
            )}
        </Dialog>
    )
}
