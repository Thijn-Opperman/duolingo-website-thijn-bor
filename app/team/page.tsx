'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'
import { useXP } from '@/lib/XPContext'
import { type Metadata } from 'next'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as const } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

interface TeamMemberProps {
  initials: string
  name: string
  skills: string[]
  color: string
}

function TeamMemberCard({ initials, name, skills, color }: TeamMemberProps) {
  return (
    <motion.div
      variants={fadeUp}
      className="rounded-2xl p-8 flex flex-col gap-5"
      style={{
        background: 'var(--card-bg)',
        border: '2px solid var(--border)',
        boxShadow: '0 4px 0 var(--shadow)',
      }}
    >
      {/* Avatar */}
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center"
        style={{
          background: `${color}18`,
          border: `3px solid ${color}`,
          fontFamily: 'var(--font-nunito)',
          fontWeight: 900,
          fontSize: 28,
          color: color,
        }}
      >
        {/* TODO: vervang door echte foto */}
        {initials}
      </div>

      {/* Name */}
      <div>
        <h3
          style={{ fontFamily: 'var(--font-nunito)', fontWeight: 900, fontSize: 24, color: 'var(--text-primary)' }}
        >
          {name}
        </h3>
        <p
          className="text-sm mt-1"
          style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}
        >
          ICT Media — Content Creation
        </p>
      </div>

      {/* Bio */}
      <p
        className="text-sm leading-relaxed"
        style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}
      >
        {/* TODO: voeg eigen bio toe — max 3 zinnen */}
        Semester 4 student ICT Media (Content Creation) aan Fontys Eindhoven. Gepassioneerd door creatieve conceptontwikkeling en digitale storytelling. Werkt graag aan projecten die échte impact maken.
      </p>

      {/* Skills */}
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1 rounded-full text-xs font-semibold"
            style={{ background: `${color}15`, color, fontFamily: 'var(--font-inter)' }}
          >
            {skill}
          </span>
        ))}
        {/* TODO: voeg echte skills/interesses toe */}
      </div>

      {/* LinkedIn */}
      <a
        href="#"
        className="inline-flex items-center gap-2 text-sm font-semibold mt-auto"
        style={{ color, fontFamily: 'var(--font-inter)' }}
      >
        {/* TODO: vervang href="#" door echte LinkedIn URL */}
        <ExternalLink size={16} />
        LinkedIn
        <ArrowRight size={14} />
      </a>
    </motion.div>
  )
}

export default function TeamPage() {
  const { t, lang } = useLanguage()
  const { addXP } = useXP()

  useEffect(() => {
    addXP(50, 'Team pagina bezocht')
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={{ background: 'var(--bg-primary)' }}>
      {/* ── Hero ── */}
      <section
        className="relative px-4 py-20 md:py-28 overflow-hidden"
        style={{ background: 'var(--bg-secondary)' }}
      >
        {/* Decorative */}
        <div
          className="absolute top-0 right-0 pointer-events-none"
          aria-hidden
          style={{
            width: 400,
            height: 400,
            background: 'radial-gradient(circle, rgba(88,204,2,0.06) 0%, transparent 70%)',
            borderRadius: '50%',
            transform: 'translate(20%, -20%)',
          }}
        />

        <div className="max-w-5xl mx-auto relative">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: 'var(--duo-green)', fontFamily: 'var(--font-inter)', letterSpacing: '0.1em' }}
          >
            Fontys Eindhoven · ICT Media · Semester 4
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.06 }}
            className="mb-4 lowercase"
            style={{
              fontFamily: 'var(--font-nunito)',
              fontWeight: 900,
              fontSize: 'clamp(48px, 8vw, 80px)',
              color: 'var(--text-primary)',
              lineHeight: 1,
            }}
          >
            {t.team.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="text-lg"
            style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}
          >
            Semester 4 ICT Media · Content Creation · Fontys Eindhoven
          </motion.p>
        </div>
      </section>

      {/* ── Team cards ── */}
      <section className="px-4 py-16 md:py-20" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <TeamMemberCard
              initials="TO"
              name="Thijn Opperman"
              color="#58CC02"
              skills={['Design', 'Strategie', 'Web Dev']}
              /* TODO: voeg echte skills toe */
            />
            <TeamMemberCard
              initials="BK"
              name="Bor Klessens"
              color="#1CB0F6"
              skills={['Video', 'Concept', 'Research']}
              /* TODO: voeg echte skills toe */
            />
          </motion.div>
        </div>
      </section>

      {/* ── About project ── */}
      <section className="px-4 py-16" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="mb-6"
            style={{ fontFamily: 'var(--font-nunito)', fontWeight: 900, fontSize: 'clamp(22px, 3.5vw, 32px)', color: 'var(--text-primary)' }}
          >
            {t.team.projectTitle}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="leading-relaxed"
            style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)', fontSize: 16 }}
          >
            {t.team.projectText}
          </motion.p>

          {/* D&AD quote */}
          <motion.blockquote
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.16 }}
            className="mt-8 pl-5 py-1"
            style={{
              borderLeft: '4px solid var(--duo-green)',
              fontFamily: 'var(--font-nunito)',
              fontWeight: 800,
              fontSize: 'clamp(16px, 2.5vw, 20px)',
              color: 'var(--text-primary)',
              fontStyle: 'italic',
            }}
          >
            "Turn a quiet mission into a loud conversation."
            <cite
              className="block mt-2 text-sm font-normal not-italic"
              style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}
            >
              — D&AD New Blood Awards 2026, Duolingo brief
            </cite>
          </motion.blockquote>
        </div>
      </section>

      {/* ── Fontys section ── */}
      <section
        className="px-4 py-12 text-center"
        style={{ background: 'var(--bg-primary)', borderTop: '1px solid var(--border)' }}
      >
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-sm"
          style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}
        >
          {lang === 'nl' ? 'Een project van' : 'A project by'}{' '}
          <strong style={{ color: 'var(--text-primary)' }}>Fontys Eindhoven</strong>
        </motion.p>
      </section>
    </div>
  )
}
