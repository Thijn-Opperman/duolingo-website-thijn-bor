'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Flame } from 'lucide-react'
import { useXP } from '@/lib/XPContext'

// ── Smooth count-up from previous XP to new XP ───────────────────────────────

function useCountUp(target: number, duration = 500): number {
  const [display, setDisplay] = useState(target)
  const from = useRef(target)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const start = from.current
    if (start === target) return
    const began = performance.now()
    cancelAnimationFrame(rafRef.current)

    const tick = (now: number) => {
      const t = Math.min((now - began) / duration, 1)
      const eased = 1 - (1 - t) * (1 - t) // ease-out quad
      setDisplay(Math.round(start + (target - start) * eased))
      if (t < 1) rafRef.current = requestAnimationFrame(tick)
      else from.current = target
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, duration])

  return display
}

// ── XPBar ────────────────────────────────────────────────────────────────────

const MAX_XP = 500

export default function XPBar() {
  const { xp, level, visitedConcepts } = useXP()
  const displayed = useCountUp(xp)
  const fill = Math.min((xp / MAX_XP) * 100, 100)
  const allVisited = visitedConcepts.length >= 4

  return (
    <div className="flex items-center gap-2">
      {/* Flame pulse */}
      <motion.div
        animate={{ scale: [1, 1.18, 1] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
        className="text-orange-400 flex-shrink-0"
        aria-hidden
      >
        <Flame size={15} fill="currentColor" />
      </motion.div>

      {/* Progress bar */}
      <div
        className="relative rounded-full overflow-hidden flex-shrink-0"
        style={{ width: 72, height: 7, background: 'var(--bg-tertiary)' }}
        role="progressbar"
        aria-valuenow={xp}
        aria-valuemin={0}
        aria-valuemax={MAX_XP}
        aria-label="XP voortgang"
      >
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ background: 'var(--duo-green)', originX: 0 }}
          animate={{ width: `${fill}%` }}
          transition={{ type: 'spring', stiffness: 70, damping: 16 }}
        />
      </div>

      {/* XP counter */}
      <span
        className="text-xs font-bold tabular-nums flex-shrink-0"
        style={{ color: 'var(--duo-green)', fontFamily: 'var(--font-nunito)', minWidth: '3.5ch' }}
      >
        {displayed}
      </span>

      {/* Level badge */}
      {level > 0 && (
        <span
          className="text-xs font-bold px-1.5 py-0.5 rounded-md flex-shrink-0"
          style={{
            background: 'var(--duo-green)',
            color: '#fff',
            fontFamily: 'var(--font-nunito)',
            fontSize: 10,
          }}
        >
          L{level}
        </span>
      )}

      {/* Milestone dots */}
      <div className="hidden xl:flex items-center gap-1" aria-hidden>
        {[1, 2, 3, 4].map((id) => (
          <div
            key={id}
            className="w-1.5 h-1.5 rounded-full transition-colors duration-300"
            style={{
              background: visitedConcepts.includes(id) ? 'var(--duo-green)' : 'var(--bg-tertiary)',
            }}
          />
        ))}
        <div
          className="w-1.5 h-1.5 rounded-full transition-colors duration-300"
          style={{ background: allVisited ? '#FFB800' : 'var(--bg-tertiary)' }}
        />
      </div>
    </div>
  )
}
