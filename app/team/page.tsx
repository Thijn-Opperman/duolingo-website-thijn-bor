'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Mail } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'
import { useXP } from '@/lib/XPContext'

/* ── Skill pill ── */
function SkillPill({ label, color, delay }: { label: string; color: string; delay: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85, y: 8 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay }}
      style={{
        padding: '6px 14px', borderRadius: 100,
        fontSize: 12, fontFamily: 'var(--font-inter)', fontWeight: 600,
        background: `${color}12`,
        color: color,
        border: `1px solid ${color}28`,
      }}
    >
      {label}
    </motion.span>
  )
}

/* ── Team member card ── */
function MemberCard({ initials, name, role, bio, skills, email, color, side }: {
  initials: string
  name: string
  role: string
  bio: string
  skills: string[]
  email: string
  color: string
  side: 'left' | 'right'
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'start 0.5'] })
  const x = useTransform(scrollYProgress, [0, 1], [side === 'left' ? -40 : 40, 0])
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <motion.div ref={ref} style={{ x, opacity }}>
      <div style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderTop: `3px solid ${color}`,
        borderRadius: 24,
        padding: 'clamp(32px, 4vw, 52px)',
        height: '100%',
      }}>
        {/* Avatar */}
        <div style={{
          width: 96, height: 96, borderRadius: '50%',
          background: `${color}12`,
          border: `2px solid ${color}40`,
          boxShadow: `0 0 40px ${color}18`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 28,
          fontFamily: 'var(--font-fredoka)', fontWeight: 700, fontSize: 36,
          color: color,
        }}>
          {initials}
        </div>

        {/* Name & role */}
        <h3 style={{
          fontFamily: 'var(--font-fredoka)', fontWeight: 700,
          fontSize: 'clamp(28px, 3vw, 40px)',
          color: '#ffffff', lineHeight: 1.1, marginBottom: 6,
        }}>
          {name}
        </h3>
        <p style={{
          fontFamily: 'var(--font-inter)', fontSize: 13,
          color: color, fontWeight: 600,
          letterSpacing: '0.08em', textTransform: 'uppercase',
          marginBottom: 24,
        }}>
          {role}
        </p>

        {/* Divider */}
        <div style={{ width: 40, height: 2, background: color, marginBottom: 24, opacity: 0.5 }} />

        {/* Bio */}
        <p style={{
          fontFamily: 'var(--font-inter)', fontSize: 16, lineHeight: 1.7,
          color: 'rgba(255,255,255,0.45)', marginBottom: 32,
        }}>
          {bio}
        </p>

        {/* Skills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 36 }}>
          {skills.map((s, i) => (
            <SkillPill key={s} label={s} color={color} delay={i * 0.05} />
          ))}
        </div>

        {/* Email */}
        <a
          href={`mailto:${email}`}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontFamily: 'var(--font-inter)', fontSize: 14, fontWeight: 600,
            color: 'rgba(255,255,255,0.4)',
            textDecoration: 'none',
            transition: 'color 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = color }}
          onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)' }}
        >
          <Mail size={15} />
          {email}
        </a>
      </div>
    </motion.div>
  )
}

/* ── Stat block ── */
function StatBlock({ value, label, color, delay }: { value: string; label: string; color: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      style={{ textAlign: 'center' }}
    >
      <p style={{
        fontFamily: 'var(--font-fredoka)', fontWeight: 700,
        fontSize: 'clamp(36px, 5vw, 56px)',
        color, lineHeight: 1, marginBottom: 6,
      }}>
        {value}
      </p>
      <p style={{
        fontFamily: 'var(--font-inter)', fontSize: 12,
        color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em',
        textTransform: 'uppercase', fontWeight: 600,
      }}>
        {label}
      </p>
    </motion.div>
  )
}

/* ── Page ── */
export default function TeamPage() {
  const { lang } = useLanguage()
  const { tryAddXP } = useXP()
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  useEffect(() => {
    tryAddXP('team-visit', 20, 'Team pagina bezocht')
  }, []) // eslint-disable-line

  const members = [
    {
      initials: 'TO',
      name: 'Thijn Opperman',
      role: lang === 'nl' ? 'Design & Development' : 'Design & Development',
      bio: lang === 'nl'
        ? 'Semester 4 student ICT Media Content Creation aan Fontys Eindhoven. Gepassioneerd over creatieve concepten, interface design en het bouwen van dingen die mensen raken.'
        : 'Semester 4 student ICT Media Content Creation at Fontys Eindhoven. Passionate about creative concepts, interface design and building things that move people.',
      skills: ['UI/UX Design', 'Next.js', 'Framer Motion', 'Figma', 'Strategie'],
      email: 't.opperman@student.fontys.nl',
      color: '#58CC02',
      side: 'left' as const,
    },
    {
      initials: 'BK',
      name: 'Bor Klessens',
      role: lang === 'nl' ? 'Concept & Research' : 'Concept & Research',
      bio: lang === 'nl'
        ? 'Semester 4 student ICT Media Content Creation aan Fontys Eindhoven. Geinteresseerd in de psychologie achter leren, gamification en hoe je complexe ideeën eenvoudig maakt.'
        : 'Semester 4 student ICT Media Content Creation at Fontys Eindhoven. Interested in the psychology of learning, gamification and how to make complex ideas simple.',
      skills: ['Conceptontwikkeling', 'Research', 'Video', 'Presentatie', 'Copywriting'],
      email: 'b.klessens@student.fontys.nl',
      color: '#1CB0F6',
      side: 'right' as const,
    },
  ]

  return (
    <div style={{ background: '#0b0f0d', minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        style={{
          height: 'calc(100vh - 64px)',
          display: 'flex', alignItems: 'center',
          background: '#0b0f0d',
          position: 'relative', overflow: 'hidden',
        }}
      >
        {/* Dot grid */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, rgba(88,204,2,0.14) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          opacity: 0.5,
        }} />

        {/* Green glow — Thijn */}
        <div aria-hidden style={{
          position: 'absolute', bottom: -100, left: -100,
          width: 600, height: 600,
          background: 'radial-gradient(circle, rgba(88,204,2,0.12) 0%, transparent 65%)',
          borderRadius: '50%', pointerEvents: 'none',
        }} />

        {/* Blue glow — Bor */}
        <div aria-hidden style={{
          position: 'absolute', top: -100, right: -100,
          width: 500, height: 500,
          background: 'radial-gradient(circle, rgba(28,176,246,0.1) 0%, transparent 65%)',
          borderRadius: '50%', pointerEvents: 'none',
        }} />

        <motion.div
          style={{ y: headlineY, opacity: headlineOpacity }}
          transition={{ ease: 'linear' }}
        >
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(24px, 5vw, 80px)' }}>
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
              Duolingo project · Fontys Eindhoven · Semester 4
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: 'var(--font-fredoka)', fontWeight: 700,
                fontSize: 'clamp(64px, 12vw, 140px)',
                color: '#ffffff', lineHeight: 0.95,
                letterSpacing: '-0.02em', marginBottom: 32,
              }}
            >
              het<br />
              <span style={{ color: '#58CC02' }}>team.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22 }}
              style={{
                fontFamily: 'var(--font-inter)', fontSize: 18, lineHeight: 1.6,
                color: 'rgba(255,255,255,0.4)', maxWidth: 440,
              }}
            >
              {lang === 'nl'
                ? 'Twee studenten, één D&AD brief, vier concepten die de wereld iets luider maken.'
                : 'Two students, one D&AD brief, four concepts that make the world a little louder.'}
            </motion.p>

            {/* Scroll hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              style={{
                position: 'absolute', bottom: 40, left: 'clamp(24px, 5vw, 80px)',
                display: 'flex', alignItems: 'center', gap: 10,
              }}
            >
              <div style={{
                width: 20, height: 32, borderRadius: 10,
                border: '1.5px solid rgba(255,255,255,0.15)',
                display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '4px 0',
              }}>
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ width: 3, height: 7, borderRadius: 2, background: '#58CC02' }}
                />
              </div>
              <span style={{
                fontSize: 10, fontFamily: 'var(--font-inter)', fontWeight: 700,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.2)',
              }}>scroll</span>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── STATS ROW ── */}
      <div style={{
        background: '#070a08',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        padding: '48px clamp(24px, 5vw, 80px)',
      }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 32, textAlign: 'center',
        }}>
          <StatBlock value="2" label={lang === 'nl' ? 'studenten' : 'students'} color="#58CC02" delay={0} />
          <StatBlock value="4" label={lang === 'nl' ? 'concepten' : 'concepts'} color="#1CB0F6" delay={0.08} />
          <StatBlock value="6" label={lang === 'nl' ? 'weken' : 'weeks'} color="#FFC800" delay={0.16} />
          <StatBlock value="1" label="D&AD brief" color="#FF4B4B" delay={0.24} />
        </div>
      </div>

      {/* ── TEAM CARDS ── */}
      <section style={{
        padding: 'clamp(64px, 8vw, 120px) clamp(24px, 5vw, 80px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
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
            {lang === 'nl' ? 'De makers' : 'The creators'}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.06 }}
            style={{
              fontFamily: 'var(--font-fredoka)', fontWeight: 700,
              fontSize: 'clamp(32px, 4vw, 48px)',
              color: '#ffffff', lineHeight: 1.1, marginBottom: 64,
            }}
          >
            {lang === 'nl' ? 'wie zijn wij?' : 'who are we?'}
          </motion.h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {members.map(m => <MemberCard key={m.name} {...m} />)}
          </div>
        </div>
      </section>

      {/* ── D&AD QUOTE ── */}
      <section style={{
        padding: 'clamp(64px, 8vw, 120px) clamp(24px, 5vw, 80px)',
        background: '#070a08',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontSize: 11, fontFamily: 'var(--font-inter)', fontWeight: 700,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: '#58CC02', marginBottom: 32,
            }}
          >
            D&AD New Blood 2026 · Duolingo Brief
          </motion.p>

          <motion.blockquote
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: 'var(--font-fredoka)', fontWeight: 700,
              fontSize: 'clamp(28px, 4.5vw, 56px)',
              color: '#ffffff', lineHeight: 1.15,
              letterSpacing: '-0.01em',
              borderLeft: '4px solid #58CC02',
              paddingLeft: 32, margin: 0,
            }}
          >
            "Turn a quiet mission<br />
            into a{' '}
            <span style={{ color: '#58CC02' }}>loud conversation.</span>"
          </motion.blockquote>

          <motion.cite
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            style={{
              display: 'block', marginTop: 24, marginLeft: 36,
              fontFamily: 'var(--font-inter)', fontSize: 14,
              color: 'rgba(255,255,255,0.3)', fontStyle: 'normal',
              letterSpacing: '0.04em',
            }}
          >
            — D&AD New Blood Awards 2026, Duolingo brief
          </motion.cite>
        </div>
      </section>

      {/* ── PROJECT CONTEXT ── */}
      <section style={{
        padding: 'clamp(64px, 8vw, 120px) clamp(24px, 5vw, 80px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <p style={{
                fontSize: 11, fontFamily: 'var(--font-inter)', fontWeight: 700,
                letterSpacing: '0.14em', textTransform: 'uppercase',
                color: '#58CC02', marginBottom: 16,
              }}>
                {lang === 'nl' ? 'Het project' : 'The project'}
              </p>
              <h2 style={{
                fontFamily: 'var(--font-fredoka)', fontWeight: 700,
                fontSize: 'clamp(28px, 3.5vw, 42px)',
                color: '#ffffff', lineHeight: 1.1, marginBottom: 24,
              }}>
                {lang === 'nl' ? 'van brief naar\nbouwend concept.' : 'from brief to\nbuilt concept.'}
              </h2>
              <p style={{
                fontFamily: 'var(--font-inter)', fontSize: 16, lineHeight: 1.7,
                color: 'rgba(255,255,255,0.45)',
              }}>
                {lang === 'nl'
                  ? 'D&AD New Blood is de grootste internationale creatieve competitie voor studenten. In 2026 vroeg Duolingo: maak iets dat onze stille missie luid maakt voor jongeren. Wij namen die handschoen op met vier concepten die elk een ander kanaal bespelen: personalisatie, gamification, community en out-of-home.'
                  : "D&AD New Blood is the world's biggest creative competition for students. In 2026, Duolingo asked: create something that makes our quiet mission loud for young people. We took up that challenge with four concepts each targeting a different channel: personalisation, gamification, community and out-of-home."}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <p style={{
                fontSize: 11, fontFamily: 'var(--font-inter)', fontWeight: 700,
                letterSpacing: '0.14em', textTransform: 'uppercase',
                color: '#1CB0F6', marginBottom: 16,
              }}>
                Fontys Eindhoven
              </p>
              <h2 style={{
                fontFamily: 'var(--font-fredoka)', fontWeight: 700,
                fontSize: 'clamp(28px, 3.5vw, 42px)',
                color: '#ffffff', lineHeight: 1.1, marginBottom: 24,
              }}>
                {lang === 'nl' ? 'ICT Media\nContent Creation.' : 'ICT Media\nContent Creation.'}
              </h2>
              <p style={{
                fontFamily: 'var(--font-inter)', fontSize: 16, lineHeight: 1.7,
                color: 'rgba(255,255,255,0.45)', marginBottom: 32,
              }}>
                {lang === 'nl'
                  ? 'Een opleiding die design, technologie en storytelling combineert. Wij leren hoe je complexe ideeën vertaalt naar digitale ervaringen — en dit project is precies dat.'
                  : 'A programme that combines design, technology and storytelling. We learn how to translate complex ideas into digital experiences — and this project is exactly that.'}
              </p>

              <Link
                href="/concepten"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: '#58CC02',
                  border: '1px solid transparent',
                  borderBottom: '4px solid #3dab00',
                  borderRadius: 12,
                  color: 'white',
                  padding: '14px 28px',
                  fontFamily: 'var(--font-fredoka)', fontWeight: 600, fontSize: 16,
                  textDecoration: 'none',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#4db802' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#58CC02' }}
              >
                {lang === 'nl' ? 'Bekijk alle concepten' : 'See all concepts'}
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  )
}
