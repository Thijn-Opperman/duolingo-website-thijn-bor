'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { type Concept, getAdjacentConcepts } from '@/lib/concepts'
import { useLanguage } from '@/lib/LanguageContext'
import { useXP } from '@/lib/XPContext'
import ConceptHero from './ConceptHero'
import ProcessTimeline from './ProcessTimeline'
import PrototypeEmbed from './PrototypeEmbed'
import Placeholder from './Placeholder'

interface ConceptDetailPageProps {
  concept: Concept
}

export default function ConceptDetailPage({ concept }: ConceptDetailPageProps) {
  const { lang, t } = useLanguage()
  const { addXP, markConceptVisited, visitedConcepts } = useXP()
  const protoRef = useRef<HTMLElement>(null)
  const processRef = useRef<HTMLElement>(null)
  const { prev, next } = getAdjacentConcepts(concept.id)

  /* Award XP once per concept per session */
  useEffect(() => {
    if (!visitedConcepts.includes(concept.id)) {
      markConceptVisited(concept.id)
      addXP(100, `Concept ${concept.id} bekeken`)
    }
  }, [concept.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const scrollTo = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const descParagraphs = concept.description[lang].split('\n\n')

  return (
    <div style={{ background: 'var(--bg-primary)' }}>
      {/* Hero */}
      <ConceptHero
        concept={concept}
        onScrollToPrototype={() => scrollTo(protoRef)}
        onScrollToProcess={() => scrollTo(processRef)}
      />

      {/* ── SECTION 2: The concept ── */}
      <section className="px-4 py-16 md:py-24" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="mb-10"
            style={{ fontFamily: 'var(--font-nunito)', fontWeight: 900, fontSize: 'clamp(24px, 3.5vw, 36px)', color: 'var(--text-primary)' }}
          >
            {t.concept.theConcept}
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Text — 60% */}
            <div className="lg:col-span-3">
              {descParagraphs.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="mb-5 leading-relaxed"
                  style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)', fontSize: 16 }}
                >
                  {p}
                </motion.p>
              ))}

              {/* Features */}
              <div className="mt-8 flex flex-wrap gap-2">
                {concept.features[lang].map((f, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.06 }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                    style={{ background: `${concept.color}15`, color: concept.color, fontFamily: 'var(--font-inter)' }}
                  >
                    <Check size={12} strokeWidth={3} />
                    {f}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Visual — 40% */}
            <div className="lg:col-span-2">
              {/* TODO: vervang door echte hero-afbeelding of prototype screenshot */}
              <Placeholder
                label={`${concept.title[lang]} — hero afbeelding`}
                aspectRatio="3/4"
                color={concept.color}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: Process ── */}
      <section
        id="process"
        ref={processRef as React.RefObject<HTMLElement>}
        className="px-4 py-16 md:py-24"
        style={{ background: 'var(--bg-primary)' }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="mb-3"
            style={{ fontFamily: 'var(--font-nunito)', fontWeight: 900, fontSize: 'clamp(24px, 3.5vw, 36px)', color: 'var(--text-primary)' }}
          >
            {t.concept.theProcess}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="mb-12 text-sm"
            style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}
          >
            {lang === 'nl'
              ? 'Van briefing naar eindresultaat — zo werkten wij.'
              : "From brief to final result — here's how we worked."}
          </motion.p>

          <ProcessTimeline steps={concept.processSteps} accentColor={concept.color} />
        </div>
      </section>

      {/* ── SECTION 4: Prototype showcase ── */}
      <section
        ref={protoRef as React.RefObject<HTMLElement>}
        className="px-4 py-16 md:py-24"
        style={{ background: 'var(--bg-secondary)' }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="mb-10"
            style={{ fontFamily: 'var(--font-nunito)', fontWeight: 900, fontSize: 'clamp(24px, 3.5vw, 36px)', color: 'var(--text-primary)' }}
          >
            {t.concept.prototype}
          </motion.h2>

          {/* TODO: vervang type="images" door type="iframe" + src="jullie-prototype-url" als het prototype klaar is */}
          <PrototypeEmbed type="images" deviceType="desktop" accentColor={concept.color} />
        </div>
      </section>

      {/* ── SECTION 5: Concept navigation ── */}
      <section className="px-4 py-12" style={{ background: 'var(--bg-primary)', borderTop: '1px solid var(--border)' }}>
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          {prev ? (
            <Link
              href={`/concept/${prev.slug}`}
              className="duo-button-outline flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              {t.concept.previous}
            </Link>
          ) : (
            <div />
          )}

          <Link
            href="/#concepts"
            className="text-sm font-semibold"
            style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}
          >
            {t.concept.backOverview}
          </Link>

          {next ? (
            <Link
              href={`/concept/${next.slug}`}
              className="duo-button flex items-center gap-2"
            >
              {t.concept.next}
              <ArrowRight size={16} />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </section>
    </div>
  )
}
