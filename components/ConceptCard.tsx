'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { type Concept } from '@/lib/concepts'
import { useLanguage } from '@/lib/LanguageContext'

interface ConceptCardProps {
  concept: Concept
  index: number
}

export default function ConceptCard({ concept, index }: ConceptCardProps) {
  const [hovered, setHovered] = useState(false)
  const { lang } = useLanguage()

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/concept/${concept.slug}`}
        className="block relative overflow-hidden rounded-2xl p-7 h-full"
        style={{
          background: 'var(--card-bg)',
          border: '2px solid var(--border)',
          borderTop: `4px solid ${concept.color}`,
          boxShadow: hovered
            ? `0 16px 0 var(--shadow), 0 0 40px ${concept.color}18`
            : `0 4px 0 var(--shadow)`,
          transform: hovered ? 'translateY(-8px) scale(1.01)' : 'translateY(0) scale(1)',
          transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease',
          minHeight: 230,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Decoratief concept-nummer */}
        <span
          className="absolute top-2 right-4 select-none pointer-events-none"
          style={{
            fontSize: 88,
            fontFamily: 'var(--font-nunito)',
            fontWeight: 900,
            color: concept.color,
            opacity: hovered ? 0.12 : 0.06,
            lineHeight: 1,
            transition: 'opacity 0.25s ease',
          }}
        >
          {String(concept.id).padStart(2, '0')}
        </span>

        {/* Tag */}
        <span
          className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-5"
          style={{
            background: `${concept.color}18`,
            color: concept.color,
            letterSpacing: '0.08em',
            fontFamily: 'var(--font-inter)',
          }}
        >
          {concept.tag[lang]}
        </span>

        {/* Titel */}
        <h3
          className="mb-3"
          style={{
            fontFamily: 'var(--font-nunito)',
            fontWeight: 800,
            fontSize: 20,
            color: 'var(--text-primary)',
            lineHeight: 1.3,
          }}
        >
          {concept.title[lang]}
        </h3>

        {/* One-liner */}
        <p
          className="text-sm leading-relaxed"
          style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}
        >
          {concept.oneliner[lang]}
        </p>

        {/* Pijl */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.18 }}
              className="absolute bottom-5 right-5"
              style={{ color: concept.color }}
            >
              <ArrowRight size={22} />
            </motion.div>
          )}
        </AnimatePresence>
      </Link>
    </motion.div>
  )
}
