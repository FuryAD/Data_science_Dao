'use client'

import { useEffect, useRef, useState } from 'react'

interface CountUpProps {
    end: number
    duration?: number
    prefix?: string
    suffix?: string
    decimals?: number
}

export default function CountUp({
    end,
    duration = 2000,
    prefix = '',
    suffix = '',
    decimals = 0
}: CountUpProps) {
    const [count, setCount] = useState(0)
    const countRef = useRef<HTMLSpanElement>(null)
    const hasAnimated = useRef(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true
                    let start = 0
                    const stepTime = Math.abs(Math.floor(duration / (end - start)))
                    // Ensure a minimum step time for performance, but adjust increment if needed
                    const totalFrames = (duration / 1000) * 60
                    const increment = end / totalFrames

                    let current = 0
                    const timer = setInterval(() => {
                        current += increment
                        if (current >= end) {
                            setCount(end)
                            clearInterval(timer)
                        } else {
                            setCount(current)
                        }
                    }, 1000 / 60)

                    return () => clearInterval(timer)
                }
            },
            { threshold: 0.1 }
        )

        if (countRef.current) {
            observer.observe(countRef.current)
        }

        return () => {
            if (countRef.current) {
                observer.unobserve(countRef.current)
            }
        }
    }, [end, duration])

    return (
        <span ref={countRef}>
            {prefix}
            {count.toLocaleString(undefined, {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals
            })}
            {suffix}
        </span>
    )
}
