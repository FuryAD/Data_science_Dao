'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/utils/cn'

interface AccordionItem {
    id: string
    title: string
    content: string
}

interface AccordionProps {
    items: AccordionItem[]
    className?: string
}

export function Accordion({ items, className }: AccordionProps) {
    const [openId, setOpenId] = useState<string | null>(null)

    return (
        <div className={cn("space-y-4", className)}>
            {items.map((item) => {
                const isOpen = openId === item.id
                return (
                    <div key={item.id} className="glass-panel overflow-hidden">
                        <button
                            onClick={() => setOpenId(isOpen ? null : item.id)}
                            className="w-full flex items-center justify-between p-4 text-left"
                        >
                            <span className="font-semibold text-white">{item.title}</span>
                            <ChevronDown className={cn("w-5 h-5 text-gray-400 transition-transform", isOpen && "rotate-180")} />
                        </button>
                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden"
                                >
                                    <div className="p-4 pt-0 text-gray-300 leading-relaxed">
                                        {item.content}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )
            })}
        </div>
    )
}
