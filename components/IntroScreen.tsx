'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useXP } from '@/lib/XPContext'

const SEEN_KEY = 'duoproject-intro-seen'

export default function IntroScreen() {
  const { tryAddXP } = useXP()
  const [mounted, setMounted]   = useState(false)
  const [skip, setSkip]         = useState(false)
  const [pressed, setPressed]   = useState(false)
  const [done, setDone]         = useState(false)
  const [flash, setFlash]       = useState(false)

  useEffect(() => {
    setMounted(true)
    if (localStorage.getItem(SEEN_KEY) === '1') setSkip(true)
  }, [])

  useEffect(() => {
    if (!mounted || skip) return
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }
  }, [mounted, skip])

  const finish = useCallback(() => {
    document.documentElement.style.overflow = ''
    document.body.style.overflow = ''
    localStorage.setItem(SEEN_KEY, '1')
    tryAddXP('intro-complete', 50, 'Intro voltooid!')
    setDone(true)
  }, [tryAddXP])

  const handlePress = useCallback(() => {
    if (pressed) return
    setPressed(true)
    setTimeout(() => {
      setFlash(true)
      setTimeout(() => { setFlash(false); finish() }, 180)
    }, 160)
  }, [pressed, finish])

  if (!mounted || skip || done) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Intro scherm"
      className="fixed inset-0 flex flex-col items-center justify-center"
      style={{ zIndex: 9999, background: '#0a0a0a', userSelect: 'none' }}
    >
      {/* Dot-grid achtergrond */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(88,204,2,0.22) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Groene glow achter de knop */}
      <div
        className="absolute pointer-events-none"
        aria-hidden
        style={{
          width: 520,
          height: 520,
          background: 'radial-gradient(circle, rgba(88,204,2,0.18) 0%, transparent 65%)',
          borderRadius: '50%',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* White flash */}
      {flash && (
        <div className="absolute inset-0 bg-white" style={{ zIndex: 20 }} aria-hidden />
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-10">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center"
        >
          <p style={{
            fontSize: 12,
            fontFamily: 'var(--font-inter)',
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#444',
          }}>
            <span style={{ color: '#58CC02' }}>duo</span>project
          </p>
          <p style={{
            fontSize: 11,
            fontFamily: 'var(--font-inter)',
            color: '#333',
            marginTop: 3,
            letterSpacing: '0.06em',
          }}>
            D&AD New Blood 2026 · Thijn & Bor
          </p>
        </motion.div>

        {/* DE DUOLINGO KNOP */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.28, type: 'spring', stiffness: 220, damping: 18 }}
          onClick={handlePress}
          aria-label="Open Duolingo project"
          style={{
            background: '#58CC02',
            borderRadius: 24,
            border: 'none',
            borderBottom: pressed ? '0px solid #3aab00' : '8px solid #3aab00',
            width: 200,
            height: 200,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            cursor: 'pointer',
            transform: pressed ? 'translateY(8px)' : 'translateY(0)',
            transition: 'transform 0.12s ease, border-bottom-width 0.12s ease, box-shadow 0.15s ease',
            boxShadow: pressed
              ? 'none'
              : '0 0 80px rgba(88,204,2,0.35), 0 24px 64px rgba(0,0,0,0.55)',
            outline: 'none',
          }}
        >
          {/* Play-driehoek */}
          <svg width="52" height="52" viewBox="0 0 52 52" fill="none" aria-hidden>
            <path d="M17 11L43 26L17 41V11Z" fill="white" />
          </svg>
          <span style={{
            color: 'rgba(255,255,255,0.9)',
            fontFamily: 'var(--font-nunito)',
            fontWeight: 900,
            fontSize: 13,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}>
            Start
          </span>
        </motion.button>

        {/* Overslaan */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          transition={{ delay: 1.4 }}
          whileHover={{ opacity: 0.7 }}
          onClick={finish}
          style={{
            background: 'none',
            border: 'none',
            color: '#888',
            fontSize: 12,
            fontFamily: 'var(--font-inter)',
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
        >
          Overslaan
        </motion.button>
      </div>
    </div>
  )
}

export function clearIntroSeen() {
  if (typeof window !== 'undefined') localStorage.removeItem(SEEN_KEY)
}
