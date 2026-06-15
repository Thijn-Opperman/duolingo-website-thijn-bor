'use client'

import { useEffect, useRef } from 'react'
import { useXP } from '@/lib/XPContext'

interface SectionXPTriggerProps {
  eventId: string
  label: string
  /** Fraction of element that must be visible before firing (default 0.4) */
  threshold?: number
}

/**
 * Zero-height sentinel element. Place inside a section to award XP
 * the first time a visitor scrolls it into view.
 */
export default function SectionXPTrigger({ eventId, label, threshold = 0.4 }: SectionXPTriggerProps) {
  const { tryAddXP } = useXP()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          tryAddXP(eventId, 10, label)
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, []) // intentionally stable — eventId/label don't change

  return <div ref={ref} className="sr-only" aria-hidden />
}
