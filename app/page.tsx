'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Search, PenTool, Code, CheckSquare, Zap, Trophy, Timer, Globe } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'

/* ─────────────────────────────────────────
   TYPES & HELPERS
───────────────────────────────────────── */
type Phase = 'idle' | 'powering' | 'blueprint' | 'flash' | 'glitch' | 'grid' | 'reveal' | 'done'

const PHASE_ORDER: Phase[] = ['idle', 'powering', 'blueprint', 'flash', 'glitch', 'grid', 'reveal', 'done']
const gte = (a: Phase, b: Phase) => PHASE_ORDER.indexOf(a) >= PHASE_ORDER.indexOf(b)

const POWER_KEY = 'duoproject-power-seen'

/* ─────────────────────────────────────────
   BLUEPRINT SVG
───────────────────────────────────────── */
function BlueprintSVG({ active }: { active: boolean }) {
  const paths = [
    { d: 'M 189 20 L 391 20 Q 415 20 415 44 L 415 376 Q 415 400 391 400 L 189 400 Q 165 400 165 376 L 165 44 Q 165 20 189 20 Z', delay: 0, dur: 0.9 },
    { d: 'M 165 70 L 415 70', delay: 0.55, dur: 0.4 },
    { d: 'M 165 375 L 415 375', delay: 0.65, dur: 0.4 },
    { d: 'M 216 88 L 364 88 Q 370 88 370 94 L 370 108 Q 370 114 364 114 L 216 114 Q 210 114 210 108 L 210 94 Q 210 88 216 88 Z', delay: 0.8, dur: 0.5 },
    { d: 'M 185 138 L 395 138', delay: 1.0, dur: 0.35 },
    { d: 'M 185 158 L 330 158', delay: 1.1, dur: 0.3 },
    { d: 'M 225 255 A 65 65 0 1 1 355 255 A 65 65 0 1 1 225 255 Z', delay: 1.2, dur: 0.75 },
    { d: 'M 254 242 A 14 14 0 1 1 282 242 A 14 14 0 1 1 254 242 Z', delay: 1.65, dur: 0.35 },
    { d: 'M 298 242 A 14 14 0 1 1 326 242 A 14 14 0 1 1 298 242 Z', delay: 1.75, dur: 0.35 },
    { d: 'M 268 272 Q 290 290 312 272', delay: 1.85, dur: 0.3 },
    { d: 'M 191 348 L 389 348 Q 395 348 395 354 L 395 360 Q 395 366 389 366 L 191 366 Q 185 366 185 360 L 185 354 Q 185 348 191 348 Z', delay: 2.0, dur: 0.4 },
  ]

  return (
    <svg
      viewBox="0 0 580 440"
      fill="none"
      stroke="#58CC02"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'min(80vw, 520px)',
        opacity: active ? 1 : 0,
        transition: 'opacity 0.3s',
        pointerEvents: 'none',
      }}
    >
      {paths.map((p, i) => (
        <motion.path
          key={i}
          d={p.d}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={active ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: p.dur, delay: p.delay, ease: 'easeOut' }}
        />
      ))}
      {/* Coordinates labels — blueprint feel */}
      {active && (
        <>
          <motion.text x="170" y="16" fontSize="8" fill="#58CC02" opacity="0.45" initial={{ opacity: 0 }} animate={{ opacity: 0.45 }} transition={{ delay: 0.6 }}>
            UI_FRAME_v1
          </motion.text>
          <motion.text x="170" y="416" fontSize="8" fill="#58CC02" opacity="0.45" initial={{ opacity: 0 }} animate={{ opacity: 0.45 }} transition={{ delay: 2.2 }}>
            DUOPROJECT_MASCOT
          </motion.text>
        </>
      )}
    </svg>
  )
}

/* ─────────────────────────────────────────
   SECTION 1 — HERO POWER-ON
───────────────────────────────────────── */
function HeroPowerOn() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [mounted, setMounted] = useState(false)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  const add = useCallback((fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms)
    timers.current.push(id)
  }, [])

  useEffect(() => {
    setMounted(true)
    if (localStorage.getItem(POWER_KEY) === '1') {
      setPhase('done')
      return
    }
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    return () => {
      timers.current.forEach(clearTimeout)
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }
  }, [])

  const startSequence = useCallback(() => {
    if (phase !== 'idle') return
    setPhase('powering')
    add(() => setPhase('blueprint'), 220)
    add(() => setPhase('flash'), 2600)
    add(() => setPhase('glitch'), 2850)
    add(() => setPhase('grid'), 3300)
    add(() => setPhase('reveal'), 3600)
    add(() => {
      setPhase('done')
      localStorage.setItem(POWER_KEY, '1')
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }, 5000)
  }, [phase, add])

  if (!mounted) return null

  const isDone = phase === 'done'
  const isReveal = gte(phase, 'reveal')
  const isGrid = gte(phase, 'grid')
  const isBlueprint = gte(phase, 'blueprint')
  const isFlash = phase === 'flash'
  const isGlitch = phase === 'glitch'

  return (
    <section
      style={{
        position: 'relative',
        height: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0b0f0d',
        overflow: 'hidden',
      }}
    >
      {/* Dot grid background */}
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, rgba(88,204,2,0.18) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          opacity: isGrid ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
      />

      {/* Scan line */}
      {isGrid && (
        <div
          aria-hidden
          style={{
            position: 'absolute', left: 0, right: 0,
            height: 2,
            background: 'linear-gradient(90deg, transparent, rgba(88,204,2,0.4), transparent)',
            animation: 'scan-line 3s ease forwards',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Blueprint SVG */}
      <BlueprintSVG active={isBlueprint && !isFlash && !isGlitch && !isReveal} />

      {/* Flash overlay */}
      {isFlash && (
        <motion.div
          aria-hidden
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
          style={{ position: 'absolute', inset: 0, background: 'white', zIndex: 10 }}
        />
      )}

      {/* Glitch overlay */}
      {isGlitch && (
        <div
          aria-hidden
          style={{
            position: 'absolute', inset: 0, zIndex: 9,
            background: '#0b0f0d',
            animation: 'glitch-slice 0.42s ease forwards',
          }}
        />
      )}

      {/* IDLE — power button */}
      {phase === 'idle' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32, zIndex: 10 }}
        >
          <div style={{ textAlign: 'center' }}>
            <p style={{
              fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase',
              fontFamily: 'var(--font-inter)', fontWeight: 700,
              color: 'rgba(255,255,255,0.3)', marginBottom: 6,
            }}>
              <span style={{ color: '#58CC02' }}>duo</span>project · D&AD New Blood 2026
            </p>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.18)', fontFamily: 'var(--font-inter)', letterSpacing: '0.06em' }}>
              Thijn Opperman & Bor Klessens
            </p>
          </div>

          {/* Power button */}
          <button
            onClick={startSequence}
            aria-label="Start Duolingo project"
            style={{
              width: 140, height: 140,
              borderRadius: 32,
              background: 'rgba(88,204,2,0.08)',
              border: '1.5px solid rgba(88,204,2,0.3)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10,
              cursor: 'pointer', color: '#58CC02',
              transition: 'background 0.2s, border-color 0.2s, box-shadow 0.2s',
              boxShadow: '0 0 40px rgba(88,204,2,0.12)',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget
              el.style.background = 'rgba(88,204,2,0.14)'
              el.style.borderColor = 'rgba(88,204,2,0.55)'
              el.style.boxShadow = '0 0 60px rgba(88,204,2,0.22)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget
              el.style.background = 'rgba(88,204,2,0.08)'
              el.style.borderColor = 'rgba(88,204,2,0.3)'
              el.style.boxShadow = '0 0 40px rgba(88,204,2,0.12)'
            }}
          >
            {/* Power icon */}
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
              <circle cx="20" cy="20" r="14" stroke="#58CC02" strokeWidth="2"
                strokeDasharray="60 28" strokeLinecap="round" />
              <line x1="20" y1="6" x2="20" y2="16" stroke="#58CC02" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <span style={{
              fontFamily: 'var(--font-fredoka)', fontWeight: 700, fontSize: 12,
              letterSpacing: '0.14em', textTransform: 'uppercase',
            }}>
              Power On
            </span>
          </button>

          {/* Hint */}
          <p style={{
            fontSize: 11, color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-inter)',
            letterSpacing: '0.04em',
          }}>
            klik om de website te openen
          </p>
        </motion.div>
      )}

      {/* Powering indicator */}
      {phase === 'powering' && (
        <div style={{ zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 0.8, delay: i * 0.2, repeat: Infinity }}
                style={{ width: 8, height: 8, borderRadius: '50%', background: '#58CC02' }}
              />
            ))}
          </div>
          <p style={{ fontSize: 11, color: 'rgba(88,204,2,0.6)', fontFamily: 'var(--font-inter)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
            Initialiseren...
          </p>
        </div>
      )}

      {/* REVEAL — main headline */}
      {isReveal && (
        <div style={{
          position: 'relative', zIndex: 10,
          textAlign: 'center', padding: '0 24px',
          animation: isDone ? 'flicker-hero 7s ease-in-out infinite' : 'none',
        }}>
          <motion.p
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              fontSize: 11, fontFamily: 'var(--font-inter)', fontWeight: 700,
              letterSpacing: '0.16em', textTransform: 'uppercase',
              color: '#58CC02', marginBottom: 24,
            }}
          >
            Duolingo project · D&AD New Blood 2026
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: 'var(--font-fredoka)',
              fontWeight: 700,
              fontSize: 'clamp(52px, 9vw, 120px)',
              color: '#ffffff',
              lineHeight: 1.0,
              marginBottom: 16,
              letterSpacing: '-0.02em',
            }}
          >
            van stil<br />
            naar{' '}
            <span style={{ color: '#58CC02' }}>luid.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28 }}
            style={{
              fontFamily: 'var(--font-inter)', fontWeight: 400, fontSize: 18,
              color: 'rgba(255,255,255,0.5)', marginBottom: 40,
              maxWidth: 480, margin: '0 auto 40px',
            }}
          >
            Vier concepten die Duolingo's stille missie omzetten naar een luid gesprek.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.42 }}
            style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <a
              href="#concepten"
              style={{
                background: '#58CC02',
                border: 'none',
                borderBottom: '4px solid #3dab00',
                borderRadius: 12,
                color: 'white',
                padding: '14px 28px',
                fontFamily: 'var(--font-fredoka)',
                fontWeight: 600,
                fontSize: 16,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                textDecoration: 'none',
                letterSpacing: '0.02em',
              }}
            >
              Bekijk de concepten <ArrowRight size={18} />
            </a>
            <a
              href="#over"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.14)',
                borderRadius: 12,
                color: 'rgba(255,255,255,0.8)',
                padding: '14px 28px',
                fontFamily: 'var(--font-fredoka)',
                fontWeight: 600,
                fontSize: 16,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                textDecoration: 'none',
              }}
            >
              Meer weten
            </a>
          </motion.div>
        </div>
      )}

      {/* Scroll indicator (done only) */}
      {isDone && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{
            position: 'absolute', bottom: 32, left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
            pointerEvents: 'none',
          }}
          aria-hidden
        >
          <span style={{
            fontSize: 10, fontFamily: 'var(--font-inter)', fontWeight: 700,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.25)',
          }}>scroll</span>
          <div style={{
            width: 24, height: 38, borderRadius: 12,
            border: '1.5px solid rgba(255,255,255,0.15)',
            display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '5px 0',
          }}>
            <motion.div
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              style={{ width: 4, height: 8, borderRadius: 2, background: '#58CC02' }}
            />
          </div>
        </motion.div>
      )}
    </section>
  )
}

/* ─────────────────────────────────────────
   SECTION 2 — FLAG STRIP (scroll-driven)
───────────────────────────────────────── */
const FLAG_DATA = [
  { emoji: '🇺🇸', lang: 'English' },
  { emoji: '🇪🇸', lang: 'Español' },
  { emoji: '🇫🇷', lang: 'Français' },
  { emoji: '🇩🇪', lang: 'Deutsch' },
  { emoji: '🇮🇹', lang: 'Italiano' },
  { emoji: '🇵🇹', lang: 'Português' },
  { emoji: '🇯🇵', lang: '日本語' },
  { emoji: '🇰🇷', lang: '한국어' },
  { emoji: '🇨🇳', lang: '中文' },
  { emoji: '🇷🇺', lang: 'Русский' },
  { emoji: '🇳🇱', lang: 'Nederlands' },
  { emoji: '🇸🇦', lang: 'العربية' },
  { emoji: '🇳🇴', lang: 'Norsk' },
  { emoji: '🇸🇪', lang: 'Svenska' },
  { emoji: '🇩🇰', lang: 'Dansk' },
  { emoji: '🇵🇱', lang: 'Polski' },
  { emoji: '🇹🇷', lang: 'Türkçe' },
  { emoji: '🇬🇷', lang: 'Ελληνικά' },
  { emoji: '🇻🇳', lang: 'Tiếng Việt' },
  { emoji: '🇮🇳', lang: 'हिन्दी' },
  { emoji: '🇺🇦', lang: 'Українська' },
  { emoji: '🇮🇪', lang: 'Gaeilge' },
  { emoji: '🇧🇷', lang: 'Português BR' },
  { emoji: '🇵🇭', lang: 'Filipino' },
  { emoji: '🇮🇱', lang: 'עברית' },
  { emoji: '🇹🇭', lang: 'ภาษาไทย' },
  { emoji: '🇭🇷', lang: 'Hrvatski' },
  { emoji: '🇷🇴', lang: 'Română' },
  { emoji: '🇮🇩', lang: 'Indonesian' },
  { emoji: '🇫🇮', lang: 'Suomi' },
]

function FlagStrip() {
  const trackRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const update = () => {
      const halfWidth = track.scrollWidth / 2
      if (halfWidth === 0) return
      const offset = (window.scrollY * 0.55) % halfWidth
      track.style.transform = `translateX(-${offset}px)`
    }

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      aria-hidden
      style={{
        background: '#070a08',
        overflow: 'hidden',
        padding: '18px 0',
        borderTop: '1px solid rgba(88,204,2,0.12)',
        borderBottom: '1px solid rgba(88,204,2,0.12)',
      }}
    >
      <div
        ref={trackRef}
        style={{ display: 'flex', width: 'max-content', willChange: 'transform' }}
      >
        {[0, 1].map(copy => (
          <div key={copy} style={{ display: 'flex', gap: 4 }}>
            {FLAG_DATA.map((f, i) => (
              <div
                key={i}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  gap: 4, padding: '2px 14px',
                  borderRight: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <span style={{ fontSize: 24, lineHeight: 1 }}>{f.emoji}</span>
                <span style={{
                  fontSize: 8, fontFamily: 'var(--font-inter)', fontWeight: 700,
                  color: 'rgba(255,255,255,0.28)', letterSpacing: '0.08em',
                  textTransform: 'uppercase', whiteSpace: 'nowrap',
                }}>
                  {f.lang}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   SECTION 3 — ABOUT
───────────────────────────────────────── */
function AboutSection({ lang }: { lang: 'nl' | 'en' }) {
  const stats = [
    { value: '4', label: lang === 'nl' ? 'concepten' : 'concepts' },
    { value: '6', label: lang === 'nl' ? 'weken' : 'weeks' },
    { value: '125M+', label: lang === 'nl' ? 'gratis leerders' : 'free learners' },
  ]

  return (
    <section
      id="over"
      style={{ background: '#0b0f0d', padding: '120px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          {/* Left: visual placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              aspectRatio: '4/5',
              borderRadius: 24,
              background: 'rgba(88,204,2,0.06)',
              border: '1px solid rgba(88,204,2,0.18)',
              boxShadow: '0 0 80px rgba(88,204,2,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexDirection: 'column', gap: 12, color: 'rgba(88,204,2,0.4)',
            }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
            <span style={{ fontSize: 11, fontFamily: 'var(--font-inter)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              keyvisual
            </span>
          </motion.div>

          {/* Right: text */}
          <motion.div
            initial={{ opacity: 0, x: 48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p style={{
              fontSize: 11, fontFamily: 'var(--font-inter)', fontWeight: 700,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: '#58CC02', marginBottom: 16,
            }}>
              02 — {lang === 'nl' ? 'Over het project' : 'About the project'}
            </p>

            <h2 style={{
              fontFamily: 'var(--font-fredoka)', fontWeight: 700,
              fontSize: 'clamp(36px, 5vw, 56px)',
              color: '#ffffff', lineHeight: 1.1, marginBottom: 40,
              letterSpacing: '-0.01em',
            }}>
              {lang === 'nl' ? 'de stille missie\nwordt luid.' : 'the quiet mission\ngoes loud.'}
            </h2>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, marginBottom: 40 }}>
              {stats.map((s, i) => (
                <div
                  key={i}
                  style={{
                    borderTop: '2px solid #58CC02',
                    paddingTop: 16, paddingRight: 20,
                  }}
                >
                  <p style={{
                    fontFamily: 'var(--font-fredoka)', fontWeight: 700,
                    fontSize: 40, color: '#58CC02', lineHeight: 1,
                  }}>{s.value}</p>
                  <p style={{
                    fontFamily: 'var(--font-inter)', fontSize: 12,
                    color: 'rgba(255,255,255,0.45)', marginTop: 4, letterSpacing: '0.04em',
                  }}>{s.label}</p>
                </div>
              ))}
            </div>

            <div style={{ width: 48, height: 2, background: '#58CC02', marginBottom: 24 }} />

            <p style={{
              fontFamily: 'var(--font-inter)', fontSize: 17, lineHeight: 1.7,
              color: 'rgba(255,255,255,0.55)', maxWidth: 480,
            }}>
              {lang === 'nl'
                ? 'Vier originele concepten die Duolingo\'s stille missie omzetten naar een luid gesprek. Voor de D&AD New Blood Awards 2026 — de grootste creatieve competitie voor studenten.'
                : 'Four original concepts that turn Duolingo\'s quiet mission into a loud conversation. For the D&AD New Blood Awards 2026 — the biggest creative competition for students.'}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   SECTION 4 — WHY (scroll-driven)
───────────────────────────────────────── */
function WhySection({ lang }: { lang: 'nl' | 'en' }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLParagraphElement>(null)
  const band0Ref = useRef<HTMLDivElement>(null)
  const band1Ref = useRef<HTMLDivElement>(null)
  const band2Ref = useRef<HTMLDivElement>(null)
  const band3Ref = useRef<HTMLDivElement>(null)
  const fill0Ref = useRef<HTMLDivElement>(null)
  const fill1Ref = useRef<HTMLDivElement>(null)
  const fill2Ref = useRef<HTMLDivElement>(null)
  const fill3Ref = useRef<HTMLDivElement>(null)
  const rafRef = useRef(0)

  const bands = [
    {
      num: '01',
      title: lang === 'nl' ? 'De stille missie' : 'The quiet mission',
      desc: lang === 'nl'
        ? 'Duolingo bereikt meer dan 125 miljoen mensen — maar de meeste kennen alleen de groene uil, niet de missie erachter.'
        : 'Duolingo reaches over 125 million people — but most only know the green owl, not the mission behind it.',
      color: '#58CC02', start: 0.05, end: 0.38, dir: -1,
    },
    {
      num: '02',
      title: lang === 'nl' ? 'Vier concepten' : 'Four concepts',
      desc: lang === 'nl'
        ? 'Van gepersonaliseerde lessen tot Out-of-Home campagnes — vier richtingen die de missie hoorbaar maken voor jongeren.'
        : 'From personalised lessons to Out-of-Home campaigns — four directions that make the mission audible to young people.',
      color: '#1CB0F6', start: 0.28, end: 0.58, dir: 1,
    },
    {
      num: '03',
      title: lang === 'nl' ? 'Gamification' : 'Gamification',
      desc: lang === 'nl'
        ? 'XP, streaks, competitie — de psychologie achter leren dat écht werkt. Duolingo\'s geheime wapen, nu zichtbaar.'
        : 'XP, streaks, competition — the psychology behind learning that actually works. Duolingo\'s secret weapon, now visible.',
      color: '#FFC800', start: 0.5, end: 0.75, dir: -1,
    },
    {
      num: '04',
      title: lang === 'nl' ? 'Luid worden' : 'Going loud',
      desc: lang === 'nl'
        ? 'Een stille missie wordt pas luid als je hem de straat op brengt, de feeds in stuurt en mensen onderdeel maakt van het verhaal.'
        : 'A quiet mission only goes loud when you take it to the streets, into the feeds and make people part of the story.',
      color: '#FF4B4B', start: 0.66, end: 0.92, dir: 1,
    },
  ]

  useEffect(() => {
    const bandRefs = [band0Ref, band1Ref, band2Ref, band3Ref]
    const fillRefs = [fill0Ref, fill1Ref, fill2Ref, fill3Ref]

    const tick = () => {
      const el = containerRef.current
      if (el) {
        const rect = el.getBoundingClientRect()
        const total = rect.height - window.innerHeight
        const raw = Math.max(0, Math.min(1, -rect.top / total))

        if (labelRef.current) {
          labelRef.current.style.opacity = String(Math.min(1, raw * 6))
          labelRef.current.style.transform = `translateY(${(1 - Math.min(1, raw * 6)) * 12}px)`
        }

        bands.forEach(({ start, end, dir }, i) => {
          const lp = (raw - start) / (end - start)
          const cl = Math.max(0, Math.min(1, lp))
          const e = 1 - Math.pow(1 - cl, 3)

          const band = bandRefs[i].current
          if (band) {
            band.style.transform = `translateX(${(1 - e) * dir * 108}%)`
            band.style.opacity = String(Math.min(1, e * 1.6))
          }

          const fill = fillRefs[i].current
          if (fill) {
            fill.style.height = `${e * 100}%`
          }
        })
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div ref={containerRef} style={{ height: '300vh', position: 'relative' }}>
      <div style={{
        position: 'sticky', top: 0, height: '100vh',
        background: '#070a08', overflow: 'hidden',
        display: 'flex', alignItems: 'center',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}>
        {/* Watermark */}
        <span aria-hidden style={{
          position: 'absolute', right: -20, bottom: -40,
          fontSize: 'clamp(180px, 28vw, 320px)',
          fontFamily: 'var(--font-fredoka)', fontWeight: 700,
          color: 'transparent',
          WebkitTextStroke: '1px rgba(88,204,2,0.05)',
          userSelect: 'none', pointerEvents: 'none', lineHeight: 1,
        }}>
          03
        </span>

        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px', width: '100%' }}>
          <p
            ref={labelRef}
            style={{
              fontSize: 11, fontFamily: 'var(--font-inter)', fontWeight: 700,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: '#58CC02', marginBottom: 56, opacity: 0, transition: 'none',
            }}
          >
            03 — {lang === 'nl' ? 'Waarom dit project' : 'Why this project'}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {bands.map((band, i) => {
              const refs = [band0Ref, band1Ref, band2Ref, band3Ref]
              const fillRefs = [fill0Ref, fill1Ref, fill2Ref, fill3Ref]
              return (
                <div
                  key={i}
                  ref={refs[i]}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 28,
                    padding: '22px 24px',
                    background: 'rgba(255,255,255,0.03)',
                    border: `1px solid rgba(255,255,255,0.06)`,
                    borderLeft: `3px solid ${band.color}`,
                    borderRadius: 12,
                    opacity: 0,
                    position: 'relative', overflow: 'hidden',
                  }}
                >
                  {/* Vertical fill bar */}
                  <div style={{
                    position: 'absolute', left: 0, bottom: 0,
                    width: 3, background: band.color,
                    height: '0%', transition: 'none',
                  }} ref={fillRefs[i]} />

                  <span style={{
                    fontFamily: 'var(--font-fredoka)', fontWeight: 700,
                    fontSize: 'clamp(32px, 4vw, 52px)',
                    color: band.color, lineHeight: 1,
                    flexShrink: 0, minWidth: 80,
                    opacity: 0.35,
                  }}>
                    {band.num}
                  </span>

                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontFamily: 'var(--font-fredoka)', fontWeight: 600,
                      fontSize: 'clamp(18px, 2.2vw, 26px)',
                      color: '#ffffff', marginBottom: 6, lineHeight: 1.2,
                    }}>
                      {band.title}
                    </h3>
                    <p style={{
                      fontFamily: 'var(--font-inter)', fontSize: 15,
                      color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, maxWidth: 600,
                    }}>
                      {band.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   SECTION 5 — PROCESS (3 phases)
───────────────────────────────────────── */
function ProcessSection({ lang }: { lang: 'nl' | 'en' }) {
  const phases = [
    {
      icon: <Search size={24} />,
      color: '#58CC02',
      label: lang === 'nl' ? 'Fase 1' : 'Phase 1',
      title: lang === 'nl' ? 'Onderzoek' : 'Research',
      desc: lang === 'nl'
        ? 'D&AD brief analyseren, doelgroep in kaart brengen, Duolingo\'s DNA doorgronden. Concurrentieanalyse, gebruikersonderzoek en missie-diepteduik.'
        : 'Analysing the D&AD brief, mapping the target audience, and understanding Duolingo\'s DNA. Competitive analysis, user research and mission deep-dive.',
      tags: ['D&AD Brief', 'Doelgroep', 'Duolingo DNA', 'Research'],
    },
    {
      icon: <PenTool size={24} />,
      color: '#1CB0F6',
      label: lang === 'nl' ? 'Fase 2' : 'Phase 2',
      title: lang === 'nl' ? 'Conceptontwikkeling' : 'Concept development',
      desc: lang === 'nl'
        ? 'Vier conceptrichtingen, van ideation tot prototype. Schetsen, testen, itereren — totdat het klopt. Figma-designs en interactieve mock-ups.'
        : 'Four concept directions, from ideation to prototype. Sketching, testing, iterating until it works. Figma designs and interactive mock-ups.',
      tags: ['Figma', 'Prototypen', 'Iteraties', 'UI Design'],
    },
    {
      icon: <Code size={24} />,
      color: '#FFC800',
      label: lang === 'nl' ? 'Fase 3' : 'Phase 3',
      title: lang === 'nl' ? 'Uitwerking' : 'Realisation',
      desc: lang === 'nl'
        ? 'UI-designs, werkende demo\'s, deze website en een complete presentatie. Van ruwe schets naar eindresultaat klaar voor de D&AD jury.'
        : 'UI designs, working demos, this website and a complete presentation. From rough sketch to final result ready for the D&AD jury.',
      tags: ['Next.js', 'Framer Motion', 'Demo\'s', 'Presentatie'],
    },
  ]

  return (
    <section style={{ background: '#0b0f0d', padding: '120px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>
        <motion.p
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            fontSize: 11, fontFamily: 'var(--font-inter)', fontWeight: 700,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: '#58CC02', marginBottom: 16,
          }}
        >
          04 — {lang === 'nl' ? 'Het proces' : 'The process'}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.07 }}
          style={{
            fontFamily: 'var(--font-fredoka)', fontWeight: 700,
            fontSize: 'clamp(32px, 4.5vw, 52px)',
            color: '#ffffff', lineHeight: 1.1, marginBottom: 72,
          }}
        >
          {lang === 'nl' ? 'van brief naar\nbouwend concept.' : 'from brief to\nbuilt concept.'}
        </motion.h2>

        {/* Phases grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, position: 'relative' }}>
          {/* Connecting line */}
          <div style={{
            position: 'absolute', top: 36, left: '16.67%', right: '16.67%',
            height: 1, background: 'rgba(255,255,255,0.08)', zIndex: 0,
          }} />

          {phases.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              style={{ padding: '0 24px 0 0', position: 'relative', zIndex: 1 }}
            >
              {/* Icon circle */}
              <div style={{
                width: 72, height: 72, borderRadius: '50%',
                background: `${p.color}14`,
                border: `1.5px solid ${p.color}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: p.color, marginBottom: 28,
              }}>
                {p.icon}
              </div>

              <p style={{
                fontSize: 11, fontFamily: 'var(--font-inter)', fontWeight: 700,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: p.color, marginBottom: 8,
              }}>
                {p.label}
              </p>

              <h3 style={{
                fontFamily: 'var(--font-fredoka)', fontWeight: 600, fontSize: 22,
                color: '#ffffff', marginBottom: 12, lineHeight: 1.2,
              }}>
                {p.title}
              </h3>

              <p style={{
                fontFamily: 'var(--font-inter)', fontSize: 15, lineHeight: 1.65,
                color: 'rgba(255,255,255,0.45)', marginBottom: 20,
              }}>
                {p.desc}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {p.tags.map(tag => (
                  <span
                    key={tag}
                    style={{
                      padding: '4px 10px', borderRadius: 100,
                      fontSize: 11, fontFamily: 'var(--font-inter)', fontWeight: 600,
                      background: `${p.color}12`,
                      color: p.color, border: `1px solid ${p.color}25`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   SECTION 6 — GALLERY (floating concepts)
───────────────────────────────────────── */
function GallerySection({ lang }: { lang: 'nl' | 'en' }) {
  const cards = [
    { color: '#58CC02',  num: '01', label: lang === 'nl' ? 'Gepersonaliseerde\nLessen' : 'Personalised\nLessons',      slug: 'personalized-lessons', anim: 'float-a', dur: '6.4s',  delay: '0s',    rotate: '-3deg' },
    { color: '#1CB0F6',  num: '02', label: lang === 'nl' ? 'Eigen Karakter\nMaken' : 'Create Your\nCharacter',          slug: 'custom-character',     anim: 'float-b', dur: '7.8s',  delay: '-1.2s', rotate: '2deg'  },
    { color: '#FF4B4B',  num: '03', label: lang === 'nl' ? 'Team\nContest' : 'Team\nContest',                           slug: 'team-contest',         anim: 'float-c', dur: '5.9s',  delay: '-0.5s', rotate: '-1.5deg' },
    { color: '#FF9600',  num: '04', label: lang === 'nl' ? 'Echte Wereld\nBorden' : 'Real World\nSigns',                slug: 'real-world-signs',     anim: 'float-d', dur: '8.2s',  delay: '-2s',   rotate: '3.5deg' },
  ]

  return (
    <section
      id="concepten"
      style={{
        background: '#070a08',
        padding: '120px 0',
        position: 'relative', overflow: 'hidden',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      {/* Background text */}
      <div aria-hidden style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        whiteSpace: 'nowrap',
        fontSize: 'clamp(80px, 12vw, 160px)',
        fontFamily: 'var(--font-fredoka)', fontWeight: 700,
        color: 'transparent',
        WebkitTextStroke: '1px rgba(255,255,255,0.03)',
        userSelect: 'none', pointerEvents: 'none', lineHeight: 1,
        zIndex: 0,
      }}>
        DUOLINGO PROJECT DUOLINGO PROJECT
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 1 }}>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            fontSize: 11, fontFamily: 'var(--font-inter)', fontWeight: 700,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: '#58CC02', marginBottom: 16,
          }}
        >
          05 — {lang === 'nl' ? 'De concepten' : 'The concepts'}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.06 }}
          style={{
            fontFamily: 'var(--font-fredoka)', fontWeight: 700,
            fontSize: 'clamp(32px, 4.5vw, 52px)',
            color: '#ffffff', lineHeight: 1.1, marginBottom: 72,
          }}
        >
          {lang === 'nl' ? 'vier concepten,\néen missie.' : 'four concepts,\none mission.'}
        </motion.h2>

        {/* Floating cards grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20,
          alignItems: 'start',
        }}>
          {cards.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                marginTop: [0, 40, 20, 60][i],
                animation: `${c.anim} ${c.dur} ease-in-out ${c.delay} infinite`,
              }}
            >
              <Link
                href={`/concept/${c.slug}`}
                style={{
                  display: 'block',
                  aspectRatio: '3/4',
                  borderRadius: 20,
                  background: `${c.color}0e`,
                  border: `1.5px solid ${c.color}28`,
                  boxShadow: `0 20px 60px ${c.color}10`,
                  transform: `rotate(${c.rotate})`,
                  textDecoration: 'none',
                  position: 'relative', overflow: 'hidden',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget
                  el.style.boxShadow = `0 28px 80px ${c.color}20`
                  el.style.transform = 'rotate(0deg) scale(1.04)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget
                  el.style.boxShadow = `0 20px 60px ${c.color}10`
                  el.style.transform = `rotate(${c.rotate})`
                }}
              >
                {/* Number */}
                <span style={{
                  position: 'absolute', top: 16, right: 16,
                  fontFamily: 'var(--font-fredoka)', fontWeight: 700,
                  fontSize: 72, color: c.color, opacity: 0.1,
                  lineHeight: 1, userSelect: 'none',
                }}>
                  {c.num}
                </span>

                {/* Bottom content */}
                <div style={{
                  position: 'absolute', bottom: 20, left: 20, right: 20,
                }}>
                  <div style={{
                    width: 32, height: 3, background: c.color,
                    borderRadius: 2, marginBottom: 12, opacity: 0.7,
                  }} />
                  <p style={{
                    fontFamily: 'var(--font-fredoka)', fontWeight: 600,
                    fontSize: 18, color: '#ffffff', lineHeight: 1.3,
                    whiteSpace: 'pre-line',
                  }}>
                    {c.label}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   SECTION 7 — CTA
───────────────────────────────────────── */
function CTASection({ lang }: { lang: 'nl' | 'en' }) {
  const checks = [
    lang === 'nl' ? 'Vier originele D&AD concepten' : 'Four original D&AD concepts',
    lang === 'nl' ? 'Gepersonaliseerde Lessen — concept 01' : 'Personalised Lessons — concept 01',
    lang === 'nl' ? 'Eigen Karakter Maken — concept 02' : 'Create Your Character — concept 02',
    lang === 'nl' ? 'Team Contest — concept 03' : 'Team Contest — concept 03',
    lang === 'nl' ? 'Echte Wereld Borden — concept 04' : 'Real World Signs — concept 04',
    lang === 'nl' ? 'Volledige procesdocumentatie' : 'Complete process documentation',
  ]

  return (
    <section style={{ background: '#0b0f0d', padding: '120px 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
          {/* Left: checklist */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p style={{
              fontSize: 11, fontFamily: 'var(--font-inter)', fontWeight: 700,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: '#58CC02', marginBottom: 20,
            }}>
              06 — {lang === 'nl' ? 'Bekijk het project' : 'See the project'}
            </p>
            <h2 style={{
              fontFamily: 'var(--font-fredoka)', fontWeight: 700,
              fontSize: 'clamp(30px, 3.8vw, 48px)',
              color: '#ffffff', lineHeight: 1.1, marginBottom: 48,
            }}>
              {lang === 'nl' ? 'Benieuwd naar\nhet resultaat?' : 'Curious about\nthe result?'}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {checks.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  style={{ display: 'flex', alignItems: 'center', gap: 14 }}
                >
                  <div style={{
                    width: 22, height: 22, borderRadius: 6, flexShrink: 0,
                    border: '2px solid #58CC02',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6L5 9L10 3" stroke="#58CC02" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p style={{ fontFamily: 'var(--font-inter)', fontSize: 15, color: 'rgba(255,255,255,0.65)' }}>
                    {item}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: CTA buttons + contact */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ paddingTop: 80 }}
          >
            {/* CTA card */}
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 24, padding: 36, marginBottom: 32,
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
                <Link
                  href="/#concepten"
                  style={{
                    background: '#58CC02',
                    borderRadius: 100,
                    border: 'none',
                    color: 'white',
                    padding: '14px 28px',
                    fontFamily: 'var(--font-fredoka)', fontWeight: 600, fontSize: 16,
                    textDecoration: 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    transition: 'background 0.15s, transform 0.15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#4db802'; e.currentTarget.style.transform = 'scale(1.02)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#58CC02'; e.currentTarget.style.transform = 'scale(1)' }}
                >
                  {lang === 'nl' ? 'Bekijk de concepten' : 'See the concepts'}
                  <ArrowRight size={16} />
                </Link>

                <Link
                  href="/team"
                  style={{
                    background: 'rgba(28,176,246,0.1)',
                    border: '1px solid rgba(28,176,246,0.25)',
                    borderRadius: 100,
                    color: '#1CB0F6',
                    padding: '14px 28px',
                    fontFamily: 'var(--font-fredoka)', fontWeight: 600, fontSize: 16,
                    textDecoration: 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(28,176,246,0.18)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(28,176,246,0.1)' }}
                >
                  {lang === 'nl' ? 'Over het team' : 'About the team'}
                  <ArrowRight size={16} />
                </Link>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 24 }}>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-inter)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>
                  contact
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[
                    { name: 'Thijn Opperman', email: 't.opperman@student.fontys.nl' },
                    { name: 'Bor Klessens', email: 'b.klessens@student.fontys.nl' },
                  ].map(c => (
                    <div key={c.name}>
                      <p style={{ fontFamily: 'var(--font-inter)', fontWeight: 600, fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>{c.name}</p>
                      <p style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.02em' }}>{c.email}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <p style={{
              fontFamily: 'var(--font-inter)', fontSize: 13,
              color: 'rgba(255,255,255,0.2)', lineHeight: 1.6,
            }}>
              {lang === 'nl'
                ? 'ICT Media Content Creation · Fontys Eindhoven · Semester 4 · 2025–2026'
                : 'ICT Media Content Creation · Fontys Eindhoven · Semester 4 · 2025–2026'}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   COUNT-UP HELPER
───────────────────────────────────────── */
function CountUp({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const elRef = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = elRef.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        obs.disconnect()
        const duration = 1600
        const startTime = performance.now()
        const tick = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1)
          const ease = 1 - Math.pow(1 - progress, 3)
          setCount(Math.round(ease * end))
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [end])

  return <span ref={elRef}>{count}{suffix}</span>
}

/* ─────────────────────────────────────────
   SECTION A — MANIFEST
───────────────────────────────────────── */
function ManifestSection({ lang }: { lang: 'nl' | 'en' }) {
  return (
    <section style={{ background: '#0b0f0d', padding: '96px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 48px', textAlign: 'center' }}>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: 'var(--font-fredoka)', fontWeight: 700,
            fontSize: 'clamp(30px, 4.5vw, 52px)',
            color: '#ffffff', lineHeight: 1.15, marginBottom: 24,
          }}
        >
          {lang === 'nl'
            ? <>leren was nog nooit zo <span style={{ color: '#58CC02' }}>makkelijk te beginnen.</span></>
            : <>learning has never been this <span style={{ color: '#58CC02' }}>easy to start.</span></>
          }
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.12 }}
          style={{
            fontFamily: 'var(--font-inter)', fontSize: 18, lineHeight: 1.75,
            color: 'rgba(255,255,255,0.5)',
          }}
        >
          {lang === 'nl'
            ? 'Geen dure cursus. Geen dik boek. Geen reden om het uit te stellen. Gewoon vijf minuten per dag, een app die op een game lijkt — en voor je het weet spreek je iets dat je vorige maand nog niet kon.'
            : "No expensive course. No thick book. No reason to put it off. Just five minutes a day, an app that feels like a game — and before you know it you're saying things you couldn't last month."
          }
        </motion.p>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   SECTION C — DUOLINGO STATS (count-up)
───────────────────────────────────────── */
function DuoStatsSection({ lang }: { lang: 'nl' | 'en' }) {
  const items = lang === 'nl' ? [
    { end: 56,  suffix: 'M',  label: 'leerders elke dag',     note: 'dagelijks actief' },
    { end: 40,  suffix: '+',  label: 'talen beschikbaar',      note: 'incl. wiskunde & muziek' },
    { end: 100, suffix: '+',  label: 'cursussen',              note: 'en groeit nog steeds' },
    { end: 5,   suffix: 'M+', label: 'streak van een jaar+',   note: 'elke dag, een jaar lang' },
  ] : [
    { end: 56,  suffix: 'M',  label: 'daily learners',         note: 'active every day' },
    { end: 40,  suffix: '+',  label: 'languages',              note: 'incl. math & music' },
    { end: 100, suffix: '+',  label: 'courses',                note: 'and still growing' },
    { end: 5,   suffix: 'M+', label: '1-year+ streaks',        note: 'every day, for a year' },
  ]

  return (
    <section style={{
      background: '#070a08', padding: '72px 0',
      borderTop: '1px solid rgba(88,204,2,0.08)',
      borderBottom: '1px solid rgba(88,204,2,0.08)',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                padding: '36px 32px',
                borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              }}
            >
              <p style={{
                fontFamily: 'var(--font-fredoka)', fontWeight: 700,
                fontSize: 'clamp(44px, 5vw, 68px)',
                color: '#58CC02', lineHeight: 1, marginBottom: 8,
              }}>
                <CountUp end={item.end} suffix={item.suffix} />
              </p>
              <p style={{
                fontFamily: 'var(--font-fredoka)', fontWeight: 500,
                fontSize: 16, color: 'rgba(255,255,255,0.75)', marginBottom: 4,
              }}>
                {item.label}
              </p>
              <p style={{
                fontFamily: 'var(--font-inter)', fontSize: 11,
                color: 'rgba(255,255,255,0.25)', letterSpacing: '0.06em',
              }}>
                {item.note}
              </p>
            </motion.div>
          ))}
        </div>
        <p style={{
          fontFamily: 'var(--font-inter)', fontSize: 11,
          color: 'rgba(255,255,255,0.18)', marginTop: 8, paddingLeft: 32,
          letterSpacing: '0.06em',
        }}>
          {lang === 'nl' ? 'cijfers Q1 2026 · en het groeit nog steeds.' : 'figures Q1 2026 · and still growing.'}
        </p>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   SECTION B — WHY DUOLINGO (4 cards)
───────────────────────────────────────── */
function WhyDuoSection({ lang }: { lang: 'nl' | 'en' }) {
  const cards = lang === 'nl' ? [
    {
      icon: <Zap size={22} />, color: '#58CC02',
      title: 'Gratis. Echt gratis.',
      desc: 'De hele basis is en blijft kosteloos. Geen proefperiode die stiekem afloopt. Wereldwijd toegang tot taalonderwijs, ongeacht je portemonnee.',
    },
    {
      icon: <Trophy size={22} />, color: '#1CB0F6',
      title: 'Het voelt als spelen.',
      desc: 'XP verdienen, je streak beschermen, omhoog klimmen in de league. Je brein denkt dat het een game speelt — ondertussen leer je echt een taal.',
    },
    {
      icon: <Timer size={22} />, color: '#FFC800',
      title: 'Vijf minuten per dag.',
      desc: 'Geen avonden blokken. Lessen zijn bewust kort, zodat je elke dag een klein beetje doet. Klein en consistent verslaat groot en eenmalig — altijd.',
    },
    {
      icon: <Globe size={22} />, color: '#FF4B4B',
      title: 'Veel meer dan één taal.',
      desc: 'Van Spaans tot Japans, en ook wiskunde, muziek en schaken. 40+ talen, 100+ cursussen. Eén app, eindeloos veel te leren.',
    },
  ] : [
    {
      icon: <Zap size={22} />, color: '#58CC02',
      title: 'Free. Actually free.',
      desc: 'The entire foundation stays free. No trial that secretly expires. Worldwide access to language education, whatever your budget.',
    },
    {
      icon: <Trophy size={22} />, color: '#1CB0F6',
      title: 'It feels like playing.',
      desc: "Earn XP, protect your streak, climb the league. Your brain thinks it's a game — meanwhile you're actually learning a language.",
    },
    {
      icon: <Timer size={22} />, color: '#FFC800',
      title: 'Five minutes a day.',
      desc: 'No blocking out evenings. Lessons are intentionally short so you do a little every day. Small and consistent beats big and occasional — always.',
    },
    {
      icon: <Globe size={22} />, color: '#FF4B4B',
      title: 'Way more than one language.',
      desc: 'From Spanish to Japanese, plus math, music and chess. 40+ languages, 100+ courses. One app, endless things to learn.',
    },
  ]

  return (
    <section style={{ background: '#0b0f0d', padding: '120px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>
        <motion.p
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          style={{
            fontSize: 11, fontFamily: 'var(--font-inter)', fontWeight: 700,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: '#58CC02', marginBottom: 16,
          }}
        >
          {lang === 'nl' ? 'Waarom miljoenen mensen elke dag terugkomen' : 'Why millions of people come back every day'}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.07 }}
          style={{
            fontFamily: 'var(--font-fredoka)', fontWeight: 700,
            fontSize: 'clamp(32px, 4.5vw, 52px)',
            color: '#ffffff', lineHeight: 1.1, marginBottom: 64,
          }}
        >
          {lang === 'nl' ? 'leren dat wérkt.' : 'learning that works.'}
        </motion.h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                padding: '32px 28px',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderTop: `3px solid ${card.color}`,
              }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: `${card.color}15`,
                border: `1px solid ${card.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: card.color, marginBottom: 20,
              }}>
                {card.icon}
              </div>
              <h3 style={{
                fontFamily: 'var(--font-fredoka)', fontWeight: 600,
                fontSize: 20, color: '#ffffff', marginBottom: 12, lineHeight: 1.2,
              }}>
                {card.title}
              </h3>
              <p style={{
                fontFamily: 'var(--font-inter)', fontSize: 14, lineHeight: 1.65,
                color: 'rgba(255,255,255,0.4)',
              }}>
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   SECTION F+G — APP CTA (streak FOMO + download)
───────────────────────────────────────── */
function AppCTASection({ lang }: { lang: 'nl' | 'en' }) {
  return (
    <section style={{ background: '#070a08', padding: '120px 0', borderTop: '1px solid rgba(88,204,2,0.08)' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 48px', textAlign: 'center' }}>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            fontSize: 11, fontFamily: 'var(--font-inter)', fontWeight: 700,
            letterSpacing: '0.16em', textTransform: 'uppercase',
            color: '#FFC800', marginBottom: 24,
          }}
        >
          {lang === 'nl' ? 'de streak is verslavender dan je denkt' : 'the streak is more addictive than you think'}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: 'var(--font-fredoka)', fontWeight: 700,
            fontSize: 'clamp(36px, 6vw, 72px)',
            color: '#ffffff', lineHeight: 1.0, marginBottom: 24,
          }}
        >
          {lang === 'nl'
            ? <>jouw eerste les <span style={{ color: '#58CC02' }}>wacht.</span></>
            : <>your first lesson <span style={{ color: '#58CC02' }}>waits.</span></>
          }
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.14 }}
          style={{
            fontFamily: 'var(--font-inter)', fontSize: 17, lineHeight: 1.75,
            color: 'rgba(255,255,255,0.45)', marginBottom: 48,
          }}
        >
          {lang === 'nl'
            ? 'Meer dan vijf miljoen mensen hebben een streak van minstens een jaar. Eén dag overslaan voelt na een week al als verraad aan jezelf. Gratis, vandaag, vijf minuten.'
            : 'More than five million people have a streak of at least one year. Missing just one day feels like betraying yourself after a single week. Free, today, five minutes.'
          }
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.26 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}
        >
          <a
            href="https://www.duolingo.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: '#58CC02',
              borderBottom: '4px solid #3dab00',
              borderRadius: 16,
              color: 'white',
              padding: '18px 56px',
              fontFamily: 'var(--font-fredoka)', fontWeight: 700, fontSize: 22,
              textDecoration: 'none',
              display: 'inline-block',
              letterSpacing: '0.02em',
              transition: 'filter 0.15s, transform 0.15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.filter = 'brightness(1.09)'
              e.currentTarget.style.transform = 'scale(1.02) translateY(-1px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.filter = ''
              e.currentTarget.style.transform = ''
            }}
          >
            {lang === 'nl' ? 'start gratis →' : 'start for free →'}
          </a>
          <p style={{
            fontFamily: 'var(--font-inter)', fontSize: 12,
            color: 'rgba(255,255,255,0.25)', letterSpacing: '0.04em',
          }}>
            {lang === 'nl'
              ? 'geen account nodig om te proberen · werkt op elke telefoon'
              : 'no account needed to try · works on any phone'
            }
          </p>
        </motion.div>

        {/* Student project disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          style={{
            fontFamily: 'var(--font-inter)', fontSize: 11,
            color: 'rgba(255,255,255,0.15)', marginTop: 80, lineHeight: 1.7,
            letterSpacing: '0.03em',
          }}
        >
          {lang === 'nl'
            ? 'Dit is een niet-commercieel studentenproject van Thijn Opperman & Bor Klessens (Fontys Eindhoven, semester 4 ICT Media). Wij zijn niet verbonden aan Duolingo Inc. — dit werk is gemaakt in het kader van de D&AD New Blood Awards 2026.'
            : 'This is a non-commercial student project by Thijn Opperman & Bor Klessens (Fontys Eindhoven, semester 4 ICT Media). We are not affiliated with Duolingo Inc. — this work was created for the D&AD New Blood Awards 2026.'
          }
        </motion.p>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   HOME PAGE
───────────────────────────────────────── */
export default function Home() {
  const { lang } = useLanguage()

  return (
    <>
      <HeroPowerOn />
      <FlagStrip />
      <ManifestSection lang={lang} />
      <AboutSection lang={lang} />
      <DuoStatsSection lang={lang} />
      <WhySection lang={lang} />
      <WhyDuoSection lang={lang} />
      <ProcessSection lang={lang} />
      <GallerySection lang={lang} />
      <CTASection lang={lang} />
      <AppCTASection lang={lang} />
    </>
  )
}
