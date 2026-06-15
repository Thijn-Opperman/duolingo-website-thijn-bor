'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { type Concept } from '@/lib/concepts'
import { useLanguage } from '@/lib/LanguageContext'

interface ConceptHeroProps {
  concept: Concept
  onScrollToPrototype: () => void
  onScrollToProcess: () => void
}

export default function ConceptHero({ concept, onScrollToPrototype, onScrollToProcess }: ConceptHeroProps) {
  const { lang, t } = useLanguage()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 120])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section
      ref={ref}
      style={{
        minHeight: 'calc(100vh - 64px)',
        background: '#0b0f0d',
        position: 'relative', overflow: 'hidden',
        display: 'flex', alignItems: 'center',
      }}
    >
      {/* Concept-colored gradient blob right */}
      <div aria-hidden style={{
        position: 'absolute', top: '-20%', right: '-10%',
        width: '60vw', height: '140%',
        background: `radial-gradient(ellipse at 70% 50%, ${concept.color}14 0%, transparent 65%)`,
        pointerEvents: 'none',
      }} />

      {/* Dot grid */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }} />

      {/* Giant background number */}
      <span aria-hidden style={{
        position: 'absolute', top: '50%', right: -32,
        transform: 'translateY(-50%)',
        fontFamily: 'var(--font-fredoka)', fontWeight: 700,
        fontSize: 'clamp(200px, 28vw, 380px)',
        color: 'transparent',
        WebkitTextStroke: `1px ${concept.color}10`,
        lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
      }}>
        {String(concept.id).padStart(2, '0')}
      </span>

      <motion.div
        style={{ y, opacity }}
        transition={{ ease: 'linear' }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '60px clamp(24px, 5vw, 80px)' }}>
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
            style={{ marginBottom: 40 }}
          >
            <Link
              href="/concepten"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontFamily: 'var(--font-inter)', fontSize: 13, fontWeight: 600,
                color: 'rgba(255,255,255,0.35)',
                textDecoration: 'none',
                transition: 'color 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.35)' }}
            >
              <ArrowLeft size={15} />
              {t.concept.back}
            </Link>
          </motion.div>

          {/* Tag + number */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.06 }}
            style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}
          >
            <span style={{
              padding: '5px 14px', borderRadius: 100,
              fontSize: 11, fontFamily: 'var(--font-inter)', fontWeight: 700,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              background: `${concept.color}14`,
              color: concept.color,
              border: `1px solid ${concept.color}30`,
            }}>
              {concept.tag[lang]}
            </span>
            <span style={{
              fontSize: 11, fontFamily: 'var(--font-inter)', fontWeight: 600,
              color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em',
            }}>
              {String(concept.id).padStart(2, '0')} / 04
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: 'var(--font-fredoka)', fontWeight: 700,
              fontSize: 'clamp(44px, 7vw, 88px)',
              color: '#ffffff', lineHeight: 1.05,
              letterSpacing: '-0.02em',
              marginBottom: 20, maxWidth: 700,
            }}
          >
            {concept.title[lang]}
          </motion.h1>

          {/* Oneliner */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            style={{
              fontFamily: 'var(--font-inter)', fontSize: 19, lineHeight: 1.6,
              color: 'rgba(255,255,255,0.45)',
              maxWidth: 520, marginBottom: 48,
            }}
          >
            {concept.oneliner[lang]}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.28 }}
            style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}
          >
            <button
              onClick={onScrollToPrototype}
              style={{
                background: concept.color,
                border: 'none',
                borderBottom: `4px solid ${concept.colorDark}`,
                borderRadius: 12,
                color: 'white',
                padding: '14px 28px',
                fontFamily: 'var(--font-fredoka)', fontWeight: 600, fontSize: 16,
                cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: 8,
                transition: 'background 0.15s, transform 0.1s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
            >
              {t.concept.viewPrototype}
              <ArrowRight size={16} />
            </button>

            <button
              onClick={onScrollToProcess}
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.14)',
                borderRadius: 12,
                color: 'rgba(255,255,255,0.75)',
                padding: '14px 28px',
                fontFamily: 'var(--font-fredoka)', fontWeight: 600, fontSize: 16,
                cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: 8,
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
            >
              {t.concept.readProcess}
            </button>
          </motion.div>

          {/* Question callout */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            style={{
              marginTop: 64,
              paddingTop: 32,
              borderTop: '1px solid rgba(255,255,255,0.07)',
              maxWidth: 600,
            }}
          >
            <p style={{
              fontFamily: 'var(--font-fredoka)', fontWeight: 600,
              fontSize: 'clamp(18px, 2.5vw, 26px)',
              color: concept.color, lineHeight: 1.3,
              fontStyle: 'italic',
            }}>
              "{concept.question[lang]}"
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
