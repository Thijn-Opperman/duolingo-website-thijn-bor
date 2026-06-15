'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { concepts } from '@/lib/concepts'
import { useLanguage } from '@/lib/LanguageContext'

/* ── Single concept row ── */
function ConceptRow({ concept, index, lang }: {
  concept: typeof concepts[0]
  index: number
  lang: 'nl' | 'en'
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'start 0.3'] })
  const x = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? -60 : 60, 0])
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])

  const isEven = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      style={{ x, opacity }}
      transition={{ ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/concept/${concept.slug}`}
        style={{ textDecoration: 'none', display: 'block' }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isEven ? '1fr 1fr' : '1fr 1fr',
            gap: 0,
            borderTop: '1px solid rgba(255,255,255,0.06)',
            cursor: 'pointer',
            transition: 'background 0.2s',
            position: 'relative',
            overflow: 'hidden',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = `${concept.color}06` }}
          onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'transparent' }}
        >
          {/* Big watermark number */}
          <span aria-hidden style={{
            position: 'absolute',
            top: '50%', [isEven ? 'right' : 'left']: -20,
            transform: 'translateY(-50%)',
            fontFamily: 'var(--font-fredoka)', fontWeight: 700,
            fontSize: 'clamp(160px, 20vw, 260px)',
            color: 'transparent',
            WebkitTextStroke: `1px ${concept.color}12`,
            userSelect: 'none', pointerEvents: 'none',
            lineHeight: 1, zIndex: 0,
          }}>
            {String(index + 1).padStart(2, '0')}
          </span>

          {/* Visual placeholder */}
          <div
            style={{
              order: isEven ? 1 : 2,
              aspectRatio: '4/3',
              background: `${concept.color}08`,
              borderRight: isEven ? `1px solid rgba(255,255,255,0.06)` : 'none',
              borderLeft: !isEven ? `1px solid rgba(255,255,255,0.06)` : 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative', overflow: 'hidden',
            }}
          >
            {/* Colored corner gradient */}
            <div aria-hidden style={{
              position: 'absolute', inset: 0,
              background: `radial-gradient(ellipse at ${isEven ? '80%' : '20%'} 50%, ${concept.color}18 0%, transparent 65%)`,
              pointerEvents: 'none',
            }} />
            <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
              <div style={{
                width: 64, height: 64, borderRadius: 16,
                background: `${concept.color}14`,
                border: `1.5px solid ${concept.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 12px',
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={concept.color} strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
              </div>
              <p style={{
                fontSize: 10, fontFamily: 'var(--font-inter)', fontWeight: 700,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: `${concept.color}60`,
              }}>
                keyvisual
              </p>
            </div>
          </div>

          {/* Text content */}
          <div
            style={{
              order: isEven ? 2 : 1,
              padding: 'clamp(40px, 5vw, 80px)',
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
              position: 'relative', zIndex: 1,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <span style={{
                padding: '4px 12px', borderRadius: 100,
                fontSize: 11, fontFamily: 'var(--font-inter)', fontWeight: 700,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                background: `${concept.color}14`,
                color: concept.color,
                border: `1px solid ${concept.color}28`,
              }}>
                {concept.tag[lang]}
              </span>
              <span style={{
                fontSize: 11, fontFamily: 'var(--font-inter)', fontWeight: 600,
                color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em',
              }}>
                {String(index + 1).padStart(2, '0')} / 04
              </span>
            </div>

            <h2 style={{
              fontFamily: 'var(--font-fredoka)', fontWeight: 700,
              fontSize: 'clamp(28px, 3.5vw, 48px)',
              color: '#ffffff', lineHeight: 1.1,
              marginBottom: 16, letterSpacing: '-0.01em',
            }}>
              {concept.title[lang]}
            </h2>

            <p style={{
              fontFamily: 'var(--font-inter)', fontSize: 16, lineHeight: 1.6,
              color: 'rgba(255,255,255,0.45)', marginBottom: 32, maxWidth: 420,
            }}>
              {concept.oneliner[lang]}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 36 }}>
              {concept.bullets[lang].slice(0, 2).map((b, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <div style={{
                    width: 5, height: 5, borderRadius: '50%',
                    background: concept.color, flexShrink: 0, marginTop: 8,
                  }} />
                  <p style={{
                    fontFamily: 'var(--font-inter)', fontSize: 14,
                    color: 'rgba(255,255,255,0.5)', lineHeight: 1.5,
                  }}>{b}</p>
                </div>
              ))}
            </div>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <span style={{
                fontFamily: 'var(--font-fredoka)', fontWeight: 600, fontSize: 16,
                color: concept.color,
              }}>
                {lang === 'nl' ? 'Bekijk concept' : 'View concept'}
              </span>
              <ArrowRight size={18} color={concept.color} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

/* ── Page ── */
export default function ConceptenPage() {
  const { lang } = useLanguage()

  return (
    <div style={{ background: '#0b0f0d', minHeight: '100vh' }}>
      {/* ── HERO ── */}
      <section style={{
        padding: 'clamp(64px, 10vw, 120px) clamp(24px, 5vw, 80px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Background texture */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, rgba(88,204,2,0.1) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          opacity: 0.4,
        }} />

        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <motion.p
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              fontSize: 11, fontFamily: 'var(--font-inter)', fontWeight: 700,
              letterSpacing: '0.16em', textTransform: 'uppercase',
              color: '#58CC02', marginBottom: 20,
            }}
          >
            Duolingo project · D&AD New Blood 2026
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: 'var(--font-fredoka)', fontWeight: 700,
              fontSize: 'clamp(52px, 9vw, 112px)',
              color: '#ffffff', lineHeight: 1.0, letterSpacing: '-0.02em',
              marginBottom: 24,
            }}
          >
            {lang === 'nl' ? 'vier concepten,' : 'four concepts,'}
            <br />
            <span style={{ color: '#58CC02' }}>
              {lang === 'nl' ? 'één missie.' : 'one mission.'}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            style={{
              fontFamily: 'var(--font-inter)', fontSize: 18, lineHeight: 1.6,
              color: 'rgba(255,255,255,0.45)', maxWidth: 560,
            }}
          >
            {lang === 'nl'
              ? "Vier originele concepten die Duolingo's stille missie hoorbaar maken voor een nieuw publiek."
              : "Four original concepts that make Duolingo's quiet mission audible for a new audience."}
          </motion.p>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div aria-hidden style={{
        background: '#070a08', overflow: 'hidden', padding: '14px 0',
        borderBottom: '1px solid rgba(88,204,2,0.1)',
      }}>
        <div style={{
          display: 'flex', width: 'max-content',
          animation: 'marquee 22s linear infinite',
          willChange: 'transform',
        }}>
          {[0, 1].map(i => (
            <span key={i} style={{
              fontSize: 10, fontFamily: 'var(--font-inter)', fontWeight: 800,
              color: '#58CC02', letterSpacing: '0.14em', whiteSpace: 'nowrap',
              textTransform: 'uppercase',
            }}>
              {lang === 'nl'
                ? '  GEPERSONALISEERDE LESSEN  ·  EIGEN KARAKTER MAKEN  ·  TEAM CONTEST  ·  ECHTE WERELD BORDEN  ·  '
                : '  PERSONALIZED LESSONS  ·  CREATE YOUR CHARACTER  ·  TEAM CONTEST  ·  REAL WORLD SIGNS  ·  '}
            </span>
          ))}
        </div>
      </div>

      {/* ── CONCEPT ROWS ── */}
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        {concepts.map((concept, i) => (
          <ConceptRow key={concept.id} concept={concept} index={i} lang={lang} />
        ))}
      </div>

      {/* ── BOTTOM CTA ── */}
      <section style={{
        padding: 'clamp(64px, 8vw, 100px) clamp(24px, 5vw, 80px)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        textAlign: 'center',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p style={{
            fontSize: 11, fontFamily: 'var(--font-inter)', fontWeight: 700,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: '#58CC02', marginBottom: 20,
          }}>
            {lang === 'nl' ? 'Over het project' : 'About the project'}
          </p>
          <h2 style={{
            fontFamily: 'var(--font-fredoka)', fontWeight: 700,
            fontSize: 'clamp(32px, 5vw, 56px)',
            color: '#ffffff', lineHeight: 1.1, marginBottom: 16,
          }}>
            {lang === 'nl' ? 'Meer weten?' : 'Want to know more?'}
          </h2>
          <p style={{
            fontFamily: 'var(--font-inter)', fontSize: 17,
            color: 'rgba(255,255,255,0.4)', marginBottom: 40, maxWidth: 400, margin: '0 auto 40px',
          }}>
            {lang === 'nl' ? 'Ontmoet het team achter dit project.' : 'Meet the team behind this project.'}
          </p>
          <Link
            href="/team"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 100,
              color: 'rgba(255,255,255,0.8)',
              padding: '14px 32px',
              fontFamily: 'var(--font-fredoka)', fontWeight: 600, fontSize: 16,
              textDecoration: 'none',
              transition: 'background 0.15s, border-color 0.15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
            }}
          >
            {lang === 'nl' ? 'Ontmoet het team' : 'Meet the team'}
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
