'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'
import { useXP } from '@/lib/XPContext'
import { concepts } from '@/lib/concepts'
import ConceptCard from '@/components/ConceptCard'
import ConceptPreview from '@/components/ConceptPreview'

/* ── Typewriter hook ── */
function useTypewriter(text: string, speed = 30) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    setDisplayed('')
    setDone(false)
    let i = 0
    const id = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(id)
        setDone(true)
      }
    }, speed)
    return () => clearInterval(id)
  }, [text, speed])

  return { displayed, done }
}

/* ── CountUp hook ── */
function useCountUp(target: number, duration = 1200) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const start = performance.now()
          const tick = (now: number) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setValue(Math.round(eased * target))
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return { value, ref }
}

/* ── Stat block ── */
function StatBlock({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const { value, ref } = useCountUp(target)
  const { lang } = useLanguage()
  return (
    <div ref={ref} className="text-center">
      <div
        style={{
          fontFamily: 'var(--font-nunito)',
          fontWeight: 900,
          fontSize: 'clamp(36px, 5vw, 56px)',
          color: 'var(--duo-green)',
          lineHeight: 1,
        }}
      >
        {value.toLocaleString(lang === 'nl' ? 'nl-NL' : 'en-US')}
        {suffix}
      </div>
      <p
        className="mt-2 text-xs font-semibold uppercase tracking-widest"
        style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)', letterSpacing: '0.08em' }}
      >
        {label}
      </p>
    </div>
  )
}

/* ── Duo abstract SVG ── */
function DuoAbstract() {
  return (
    <div
      className="relative flex-shrink-0"
      style={{ width: 140, height: 140 }}
      aria-hidden
    >
      {/* Body circle */}
      <div
        className="absolute inset-0 rounded-full"
        style={{ background: 'var(--duo-green)', boxShadow: '0 8px 0 var(--duo-green-dark)' }}
      />
      {/* Eyes */}
      <div className="absolute inset-0 flex items-center justify-center gap-4" style={{ paddingBottom: 12 }}>
        <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
          <div className="w-4 h-4 rounded-full" style={{ background: '#1A1A1A' }} />
        </div>
        <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
          <div className="w-4 h-4 rounded-full" style={{ background: '#1A1A1A' }} />
        </div>
      </div>
      {/* TODO: vervang door Duo Lottie-animatie of echte SVG */}
    </div>
  )
}

export default function Home() {
  const { t, lang } = useLanguage()
  const { addXP } = useXP()
  const [hookDone, setHookDone] = useState(false)
  const conceptsRef = useRef<HTMLElement>(null)

  const { displayed, done } = useTypewriter(t.hero.hook, 28)
  useEffect(() => { if (done) setHookDone(true) }, [done])

  return (
    <>
      {/* ── SECTION 1: Emotional hook ── */}
      <section
        className="relative min-h-[55vh] flex flex-col items-center justify-center px-4 py-24 overflow-hidden"
        style={{ background: 'var(--bg-primary)' }}
      >
        <div
          className="absolute bottom-0 right-0 pointer-events-none"
          aria-hidden
          style={{
            width: 520,
            height: 520,
            background: 'radial-gradient(circle, rgba(88,204,2,0.06) 0%, transparent 70%)',
            borderRadius: '50%',
            transform: 'translate(30%, 35%)',
          }}
        />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2
            className="mb-6 leading-snug"
            style={{
              fontFamily: 'var(--font-nunito)',
              fontWeight: 900,
              fontSize: 'clamp(20px, 3.5vw, 38px)',
              color: 'var(--text-primary)',
              minHeight: '4.5rem',
            }}
          >
            {displayed}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
              style={{ color: 'var(--duo-green)' }}
            >
              |
            </motion.span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={hookDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }}
            className="text-base md:text-lg"
            style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}
          >
            {t.hero.hookSub}
          </motion.p>
        </div>
      </section>

      {/* ── SECTION 2: Hero ── */}
      <section
        className="relative overflow-hidden px-4 py-20 md:py-28"
        style={{ background: 'var(--bg-secondary)' }}
      >
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="mb-4"
            >
              <span
                style={{ fontFamily: 'var(--font-nunito)', fontWeight: 900, fontSize: 20, color: 'var(--text-secondary)' }}
              >
                <span style={{ color: 'var(--duo-green)' }}>duo</span>project
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="mb-5 leading-none lowercase"
              style={{
                fontFamily: 'var(--font-nunito)',
                fontWeight: 900,
                fontSize: 'clamp(40px, 7vw, 80px)',
                color: 'var(--text-primary)',
              }}
            >
              {t.hero.headline}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="mb-3 max-w-md"
              style={{ fontFamily: 'var(--font-inter)', fontWeight: 500, fontSize: 18, color: 'var(--text-secondary)' }}
            >
              {t.hero.subline}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.24 }}
              className="mb-8 text-sm"
              style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}
            >
              Thijn Opperman & Bor Klessens — ICT Media Content Creation, Fontys Eindhoven
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <button
                className="duo-button"
                onClick={() => conceptsRef.current?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t.hero.cta}
                <ArrowRight size={18} style={{ marginLeft: 8 }} />
              </button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.1, type: 'spring', stiffness: 180, damping: 16 }}
            className="hidden md:block"
          >
            <DuoAbstract />
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 3: Stats ── */}
      <section className="px-4 py-20" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
            <StatBlock target={125} suffix="M+" label={t.stats.learners} />
            <StatBlock target={40} suffix="+" label={t.stats.languages} />
            <StatBlock target={1} suffix="#" label={t.stats.rank} />
          </div>
        </div>
      </section>

      {/* ── SECTION 4: Concepts grid ── */}
      <section
        id="concepts"
        ref={conceptsRef as React.RefObject<HTMLElement>}
        className="px-4 py-20"
        style={{ background: 'var(--bg-secondary)' }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="mb-12 lowercase"
            style={{
              fontFamily: 'var(--font-nunito)',
              fontWeight: 900,
              fontSize: 'clamp(32px, 5vw, 48px)',
              color: 'var(--text-primary)',
            }}
          >
            {t.concepts.title}
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {concepts.map((c, i) => (
              <ConceptCard key={c.id} concept={c} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: Interactive concept preview ── */}
      <section className="px-4 py-20" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="mb-3 lowercase"
            style={{
              fontFamily: 'var(--font-nunito)',
              fontWeight: 900,
              fontSize: 'clamp(26px, 4vw, 40px)',
              color: 'var(--text-primary)',
            }}
          >
            {lang === 'nl' ? 'de concepten van dichtbij' : 'the concepts up close'}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="mb-10 text-sm"
            style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}
          >
            {lang === 'nl'
              ? 'Voel de sfeer van elk concept zonder door te klikken.'
              : 'Get a feel for each concept without clicking through.'}
          </motion.p>
          <ConceptPreview />
        </div>
      </section>

      {/* ── SECTION 6: Making-of teaser ── */}
      <section className="px-4 py-20" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl p-10 md:p-14"
            style={{ background: 'var(--bg-tertiary)', border: '2px solid var(--border)' }}
          >
            <h2
              className="mb-6 whitespace-pre-line"
              style={{
                fontFamily: 'var(--font-nunito)',
                fontWeight: 900,
                fontSize: 'clamp(20px, 3.2vw, 34px)',
                color: 'var(--text-primary)',
                lineHeight: 1.35,
              }}
            >
              {t.process.teaser}
            </h2>

            <div className="flex flex-wrap gap-3 mb-8">
              {t.process.steps.map((step, i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-full text-sm font-semibold"
                  style={{ background: 'var(--duo-green)', color: '#fff', fontFamily: 'var(--font-inter)' }}
                >
                  {i + 1}. {step}
                </span>
              ))}
            </div>

            <Link href="/concept/personalized-lessons#process" className="duo-button-outline inline-flex">
              {t.process.seeProcess}
              <ArrowRight size={16} style={{ marginLeft: 8 }} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 7: Team teaser ── */}
      <section className="px-4 py-20" style={{ background: 'var(--duo-green)' }}>
        <div className="max-w-5xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: 'rgba(255,255,255,0.75)', fontFamily: 'var(--font-inter)', letterSpacing: '0.1em' }}
          >
            {t.team.madeBy}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.07 }}
            className="mb-4"
            style={{ fontFamily: 'var(--font-nunito)', fontWeight: 900, fontSize: 'clamp(24px, 4vw, 36px)', color: '#fff' }}
          >
            Thijn Opperman & Bor Klessens
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.12 }}
            className="mb-8 text-sm"
            style={{ color: 'rgba(255,255,255,0.8)', fontFamily: 'var(--font-inter)' }}
          >
            ICT Media Content Creation · Fontys Eindhoven · Semester 4
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.18 }}
          >
            <Link
              href="/team"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm border-2 text-white transition-colors hover:bg-white/10"
              style={{ fontFamily: 'var(--font-nunito)', borderColor: 'rgba(255,255,255,0.4)' }}
            >
              {t.team.aboutUs}
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
