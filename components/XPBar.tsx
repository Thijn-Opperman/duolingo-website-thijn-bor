'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useXP } from '@/lib/XPContext'
import { Flame } from 'lucide-react'
import { useEffect, useRef } from 'react'
import confetti from 'canvas-confetti'

const MAX_XP = 500
const MILESTONES = [
  { id: 0, icon: '🦉', label: 'Start', xpRequired: 0 },
  { id: 1, icon: '01', label: 'C1' },
  { id: 2, icon: '02', label: 'C2' },
  { id: 3, icon: '03', label: 'C3' },
  { id: 4, icon: '04', label: 'C4' },
  { id: 5, icon: '🏆', label: 'All' },
]

export default function XPBar() {
  const { xp, visitedConcepts, notifications } = useXP()
  const allVisited = visitedConcepts.length >= 4
  const prevAllVisited = useRef(false)

  useEffect(() => {
    if (allVisited && !prevAllVisited.current) {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.3 } })
    }
    prevAllVisited.current = allVisited
  }, [allVisited])

  const fill = Math.min((xp / MAX_XP) * 100, 100)

  return (
    <div className="flex items-center gap-2 relative">
      {/* XP notifications */}
      <AnimatePresence>
        {notifications.map((n) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, y: 16, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="fixed bottom-6 right-6 z-50 px-4 py-2 rounded-2xl font-bold text-sm shadow-lg"
            style={{
              background: 'var(--duo-green)',
              color: '#fff',
              fontFamily: 'var(--font-nunito)',
              boxShadow: '0 4px 0 var(--duo-green-dark)',
            }}
          >
            +{n.amount} XP 🎉
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Flame */}
      <motion.div
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        className="text-orange-400"
      >
        <Flame size={16} fill="currentColor" />
      </motion.div>

      {/* Progress track */}
      <div className="flex flex-col gap-0.5">
        <div
          className="relative rounded-full overflow-hidden"
          style={{ width: 80, height: 8, background: 'var(--bg-tertiary)' }}
        >
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{ background: 'var(--duo-green)' }}
            animate={{ width: `${fill}%` }}
            transition={{ type: 'spring', stiffness: 80, damping: 18 }}
          />
        </div>
      </div>

      {/* XP label */}
      <span
        className="text-xs font-bold tabular-nums"
        style={{ color: 'var(--duo-green)', fontFamily: 'var(--font-nunito)' }}
      >
        {xp} XP
      </span>

      {/* Milestone dots */}
      <div className="hidden lg:flex items-center gap-1">
        {[1, 2, 3, 4].map((id) => (
          <div
            key={id}
            title={`Concept ${id}`}
            className="w-2 h-2 rounded-full transition-colors"
            style={{
              background: visitedConcepts.includes(id) ? 'var(--duo-green)' : 'var(--bg-tertiary)',
            }}
          />
        ))}
        <div
          title="All concepts"
          className="w-2 h-2 rounded-full transition-colors"
          style={{
            background: allVisited ? '#FFB800' : 'var(--bg-tertiary)',
          }}
        />
      </div>
    </div>
  )
}
