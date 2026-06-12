'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { type Concept } from '@/lib/concepts'
import { useLanguage } from '@/lib/LanguageContext'

interface ConceptHeroProps {
  concept: Concept
  onScrollToPrototype: () => void
  onScrollToProcess: () => void
}

export default function ConceptHero({ concept, onScrollToPrototype, onScrollToProcess }: ConceptHeroProps) {
  const { lang, t } = useLanguage()

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      {/* Decorative background number */}
      <span
        className="absolute top-0 right-0 select-none pointer-events-none"
        style={{
          fontSize: 280,
          fontFamily: 'var(--font-nunito)',
          fontWeight: 900,
          color: concept.color,
          opacity: 0.04,
          lineHeight: 1,
          right: -20,
          top: -20,
        }}
      >
        {String(concept.id).padStart(2, '0')}
      </span>

      <div className="max-w-5xl mx-auto px-4 relative">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
        >
          <Link
            href="/#concepts"
            className="inline-flex items-center gap-2 text-sm font-semibold mb-8"
            style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}
          >
            <ArrowLeft size={16} />
            {t.concept.back}
          </Link>
        </motion.div>

        {/* Tag */}
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-5"
          style={{
            background: concept.tagBg,
            color: concept.color,
            letterSpacing: '0.08em',
            fontFamily: 'var(--font-inter)',
          }}
        >
          {concept.tag[lang]}
        </motion.span>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-4 leading-tight"
          style={{
            fontFamily: 'var(--font-nunito)',
            fontWeight: 900,
            fontSize: 'clamp(36px, 6vw, 64px)',
            color: 'var(--text-primary)',
          }}
        >
          {concept.title[lang]}
        </motion.h1>

        {/* Oneliner */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="text-lg mb-8 max-w-xl"
          style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}
        >
          {concept.oneliner[lang]}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-wrap gap-3"
        >
          <button onClick={onScrollToPrototype} className="duo-button">
            {t.concept.viewPrototype}
          </button>
          <button onClick={onScrollToProcess} className="duo-button-outline">
            {t.concept.readProcess}
          </button>
        </motion.div>
      </div>
    </section>
  )
}
