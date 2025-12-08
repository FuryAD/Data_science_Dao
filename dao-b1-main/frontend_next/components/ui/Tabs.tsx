'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

interface Tab {
    id: string
    label: string
    content: React.ReactNode
}

interface TabsProps {
    tabs: Tab[]
    className?: string
}

export function Tabs({ tabs, className }: TabsProps) {
    const [activeTab, setActiveTab] = useState(tabs[0].id)

    return (
        <div className={className}>
            <div className="flex space-x-1 rounded-xl bg-white/5 p-1 mb-6">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                            "relative w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-all outline-none",
                            activeTab === tab.id
                                ? "text-white"
                                : "text-gray-400 hover:text-white hover:bg-white/5"
                        )}
                    >
                        {activeTab === tab.id && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute inset-0 bg-white/10 rounded-lg border border-white/10 shadow-sm"
                            />
                        )}
                        <span className="relative z-10">{tab.label}</span>
                    </button>
                ))}
            </div>
            <div>
                {tabs.map((tab) => (
                    <div
                        key={tab.id}
                        className={cn("transition-opacity duration-200", activeTab === tab.id ? "block" : "hidden")}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {tab.content}
                        </motion.div>
                    </div>
                ))}
            </div>
        </div>
    )
}
