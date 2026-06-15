'use client'

import { useEffect, useRef, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useXP, type XPNotification } from '@/lib/XPContext'

// ── Pure canvas confetti — geen library ──────────────────────────────────────

const CONFETTI_COLORS = ['#58CC02', '#1CB0F6', '#FF4B4B', '#FF9600', '#A560F8', '#FFD700']

function fireConfetti(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  type Piece = {
    x: number; y: number; size: number; color: string
    vx: number; vy: number; rot: number; rotV: number; opacity: number
  }

  const pieces: Piece[] = Array.from({ length: 90 }, () => ({
    x: Math.random() * canvas.width,
    y: -(Math.random() * 160 + 20),
    size: 6 + Math.random() * 7,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    vx: (Math.random() - 0.5) * 5,
    vy: 2.5 + Math.random() * 4,
    rot: Math.random() * 360,
    rotV: (Math.random() - 0.5) * 9,
    opacity: 1,
  }))

  let rafId: number
  const tick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    let alive = false
    for (const p of pieces) {
      p.x += p.vx
      p.y += p.vy
      p.vy += 0.12 // gravity
      p.vx *= 0.99
      p.rot += p.rotV
      if (p.y > canvas.height - 40) p.opacity -= 0.04
      if (p.opacity > 0) {
        alive = true
        ctx.save()
        ctx.globalAlpha = Math.max(0, p.opacity)
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rot * Math.PI) / 180)
        ctx.fillStyle = p.color
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size)
        ctx.restore()
      }
    }
    if (alive) rafId = requestAnimationFrame(tick)
    else ctx.clearRect(0, 0, canvas.width, canvas.height)
  }
  rafId = requestAnimationFrame(tick)
  // Safety cleanup after 5s
  setTimeout(() => cancelAnimationFrame(rafId), 5000)
}

// ── Individual toast ─────────────────────────────────────────────────────────

function Toast({ n, reduced }: { n: XPNotification; reduced: boolean }) {
  if (n.isLevelUp) {
    return (
      <motion.div
        layout
        key={n.id}
        initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.7, y: -12 }}
        animate={reduced ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, y: -8, transition: { duration: 0.25 } }}
        transition={reduced ? { duration: 0.2 } : {
          scale: { type: 'spring', stiffness: 420, damping: 18 },
          y: { type: 'spring', stiffness: 420, damping: 18 },
          opacity: { duration: 0.15 },
        }}
        className="flex items-center gap-3 rounded-2xl px-5 py-3 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, #58CC02, #43C000)',
          boxShadow: '0 6px 0 #2d8a00, 0 8px 24px rgba(88,204,2,0.35)',
          fontFamily: 'var(--font-nunito)',
          color: '#fff',
          minWidth: 200,
        }}
      >
        <span style={{ fontSize: 22 }}>🏆</span>
        <div>
          <div style={{ fontWeight: 900, fontSize: 15 }}>Level {n.newLevel}!</div>
          <div style={{ fontSize: 12, opacity: 0.85, fontFamily: 'var(--font-inter)' }}>
            +{n.amount} XP — {n.reason}
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      layout
      key={n.id}
      initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.82, y: -10 }}
      animate={reduced ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, y: -6, scale: 0.92, transition: { duration: 0.2 } }}
      transition={reduced ? { duration: 0.18 } : {
        scale: { type: 'spring', stiffness: 460, damping: 22 },
        y: { type: 'spring', stiffness: 460, damping: 22 },
        opacity: { duration: 0.12 },
      }}
      className="flex items-center gap-2 rounded-xl px-4 py-2 pointer-events-none"
      style={{
        background: 'var(--duo-green)',
        boxShadow: '0 4px 0 var(--duo-green-dark), 0 4px 16px rgba(88,204,2,0.25)',
        fontFamily: 'var(--font-nunito)',
        fontWeight: 700,
        fontSize: 13,
        color: '#fff',
      }}
    >
      <span style={{ fontWeight: 900 }}>+{n.amount} XP</span>
      <span style={{ opacity: 0.85, fontFamily: 'var(--font-inter)', fontWeight: 500, fontSize: 12 }}>
        — {n.reason}
      </span>
    </motion.div>
  )
}

// ── Main XPToast container ────────────────────────────────────────────────────

export default function XPToast() {
  const { notifications } = useXP()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const prevLevelUp = useRef<number | null>(null)
  const reducedRef = useRef(false)

  useEffect(() => {
    reducedRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  // Fire confetti whenever a level-up notification appears
  const levelUpNotif = notifications.find((n) => n.isLevelUp)
  useEffect(() => {
    if (!levelUpNotif) return
    if (levelUpNotif.id === prevLevelUp.current) return
    prevLevelUp.current = levelUpNotif.id
    if (!reducedRef.current && canvasRef.current) {
      fireConfetti(canvasRef.current)
    }
  }, [levelUpNotif])

  const reduced = reducedRef.current

  return (
    <>
      {/* Confetti canvas — fixed overlay, pointer-events-none */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 9998 }}
        aria-hidden
      />

      {/* Toast stack — top-right */}
      <div
        className="fixed top-20 right-4 z-[9999] flex flex-col gap-2 items-end"
        aria-live="polite"
        aria-label="XP notificaties"
      >
        <AnimatePresence mode="sync">
          {notifications.map((n) => (
            <Toast key={n.id} n={n} reduced={reduced} />
          ))}
        </AnimatePresence>
      </div>
    </>
  )
}
