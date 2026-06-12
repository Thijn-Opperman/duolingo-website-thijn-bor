'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { concepts } from '@/lib/concepts'
import { useLanguage } from '@/lib/LanguageContext'

export default function ConceptPreview() {
  const [active, setActive] = useState(0)
  const { lang, t } = useLanguage()

  const questions = [
    t.concepts.preview.q1,
    t.concepts.preview.q2,
    t.concepts.preview.q3,
    t.concepts.preview.q4,
  ]

  const current = concepts[active]

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {concepts.map((c, i) => (
          <button
            key={c.id}
            onClick={() => setActive(i)}
            className="relative px-4 py-2 rounded-full text-sm font-bold transition-colors"
            style={{
              fontFamily: 'var(--font-nunito)',
              color: active === i ? '#fff' : 'var(--text-secondary)',
              background: active === i ? c.color : 'var(--bg-secondary)',
            }}
          >
            {active === i && (
              <motion.span
                layoutId="tab-indicator"
                className="absolute inset-0 rounded-full"
                style={{ background: c.color, zIndex: -1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10">{c.title[lang]}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="rounded-2xl p-8"
          style={{
            background: 'var(--card-bg)',
            border: '2px solid var(--border)',
            boxShadow: '0 4px 0 var(--shadow)',
          }}
        >
          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 text-lg font-bold"
              style={{
                background: current.tagBg,
                color: current.color,
                fontFamily: 'var(--font-nunito)',
              }}
            >
              {String(current.id).padStart(2, '0')}
            </div>
            <div>
              <span
                className="text-xs font-bold uppercase tracking-widest block mb-1"
                style={{ color: current.color, fontFamily: 'var(--font-inter)', letterSpacing: '0.08em' }}
              >
                {current.tag[lang]}
              </span>
              <h3
                className="text-xl"
                style={{ fontFamily: 'var(--font-nunito)', fontWeight: 800, color: 'var(--text-primary)' }}
              >
                {questions[active]}
              </h3>
            </div>
          </div>

          {/* Bullets */}
          <ul className="flex flex-col gap-3 mb-8">
            {current.bullets[lang].map((b, i) => (
              <li key={i} className="flex items-start gap-3">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: current.color }}
                >
                  <Check size={12} color="#fff" strokeWidth={3} />
                </div>
                <span className="text-sm" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}>
                  {b}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <Link
            href={`/concept/${current.slug}`}
            className="inline-flex items-center gap-2 text-sm font-bold"
            style={{ color: current.color, fontFamily: 'var(--font-nunito)' }}
          >
            {t.concepts.preview.readMore}
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
