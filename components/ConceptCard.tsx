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
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Link
        href={`/concept/${concept.slug}`}
        className="block relative overflow-hidden rounded-2xl p-6 h-full"
        style={{
          background: 'var(--card-bg)',
          border: '2px solid var(--border)',
          boxShadow: hovered ? `0 8px 0 var(--shadow)` : `0 4px 0 var(--shadow)`,
          transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
          transition: 'transform 0.15s, box-shadow 0.15s',
          minHeight: 220,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Decorative number */}
        <span
          className="absolute top-3 right-4 select-none"
          style={{
            fontSize: 72,
            fontFamily: 'var(--font-nunito)',
            fontWeight: 900,
            color: concept.color,
            opacity: 0.07,
            lineHeight: 1,
          }}
        >
          {String(concept.id).padStart(2, '0')}
        </span>

        {/* Tag */}
        <span
          className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
          style={{
            background: concept.tagBg,
            color: concept.color,
            letterSpacing: '0.08em',
            fontFamily: 'var(--font-inter)',
          }}
        >
          {concept.tag[lang]}
        </span>

        {/* Title */}
        <h3
          className="text-lg mb-2"
          style={{ fontFamily: 'var(--font-nunito)', fontWeight: 800, color: 'var(--text-primary)' }}
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

        {/* Arrow */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.15 }}
              className="absolute bottom-5 right-5"
              style={{ color: concept.color }}
            >
              <ArrowRight size={20} />
            </motion.div>
          )}
        </AnimatePresence>
      </Link>
    </motion.div>
  )
}
