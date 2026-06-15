'use client'

import Link from 'next/link'
import { ArrowUpRight, RotateCcw } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'
import { clearIntroSeen } from '@/components/IntroScreen'

const CONCEPT_LINKS = [
  { num: '01', href: '/concept/personalized-lessons', nl: 'Gepersonaliseerde Lessen', en: 'Personalised Lessons' },
  { num: '02', href: '/concept/custom-character',     nl: 'Eigen Karakter Maken',    en: 'Create Your Character' },
  { num: '03', href: '/concept/team-contest',         nl: 'Team Contest',             en: 'Team Contest' },
  { num: '04', href: '/concept/real-world-signs',     nl: 'Echte Wereld Borden',      en: 'Real World Signs' },
]

const NAV_LINKS = [
  { href: '/',          nl: 'Home',             en: 'Home' },
  { href: '/#over',     nl: 'Over het project', en: 'About the project' },
  { href: '/#concepten',nl: 'De concepten',     en: 'The concepts' },
  { href: '/team',      nl: 'Het team',          en: 'The team' },
]

export default function Footer() {
  const { lang } = useLanguage()

  return (
    <footer style={{ background: '#070a08' }}>

      {/* Top accent line */}
      <div style={{
        height: 2,
        background: 'linear-gradient(90deg, transparent 0%, #58CC02 25%, #58CC02 75%, transparent 100%)',
        opacity: 0.45,
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '72px 48px 0' }}>

        {/* Main 3-column grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.6fr 1fr 1fr',
          gap: '64px',
          marginBottom: 64,
        }}>

          {/* ── Column 1: Brand ── */}
          <div>
            <Link href="/" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: 18 }}>
              <span style={{ fontFamily: 'var(--font-fredoka)', fontWeight: 700, fontSize: 26, letterSpacing: '-0.01em' }}>
                <span style={{ color: '#58CC02' }}>duo</span>
                <span style={{ color: '#ffffff' }}>project</span>
              </span>
            </Link>

            <p style={{
              fontFamily: 'var(--font-inter)', fontSize: 14, lineHeight: 1.72,
              color: 'rgba(255,255,255,0.4)', maxWidth: 300, marginBottom: 28,
            }}>
              {lang === 'nl'
                ? "Vier originele concepten die Duolingo's stille missie omzetten naar een luid gesprek."
                : "Four original concepts turning Duolingo's quiet mission into a loud conversation."}
            </p>

            {/* D&AD badge */}
            <div style={{
              display: 'inline-flex', flexDirection: 'column', gap: 3,
              padding: '10px 14px',
              background: 'rgba(255,200,0,0.06)',
              border: '1px solid rgba(255,200,0,0.18)',
              borderRadius: 10,
              marginBottom: 24,
            }}>
              <span style={{
                fontSize: 9, fontFamily: 'var(--font-inter)', fontWeight: 800,
                letterSpacing: '0.16em', textTransform: 'uppercase', color: '#FFC800',
              }}>
                D&AD New Blood 2026
              </span>
              <span style={{ fontSize: 12, fontFamily: 'var(--font-inter)', color: 'rgba(255,255,255,0.35)' }}>
                Turn a quiet mission into a loud conversation.
              </span>
            </div>

            <p style={{
              fontSize: 11, fontFamily: 'var(--font-inter)',
              color: 'rgba(255,255,255,0.18)', lineHeight: 1.65, letterSpacing: '0.02em',
            }}>
              {lang === 'nl'
                ? 'Niet verbonden aan Duolingo Inc. · Studentenproject.'
                : 'Not affiliated with Duolingo Inc. · Student project.'}
            </p>
          </div>

          {/* ── Column 2: Navigatie ── */}
          <div>
            <p style={{
              fontSize: 10, fontFamily: 'var(--font-inter)', fontWeight: 700,
              letterSpacing: '0.16em', textTransform: 'uppercase',
              color: '#58CC02', marginBottom: 22,
            }}>
              {lang === 'nl' ? 'Navigatie' : 'Navigation'}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {NAV_LINKS.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: 'var(--font-inter)', fontSize: 14,
                    color: 'rgba(255,255,255,0.45)',
                    textDecoration: 'none',
                    padding: '9px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    transition: 'color 0.15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#58CC02'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
                >
                  {lang === 'nl' ? link.nl : link.en}
                </Link>
              ))}
            </div>

            {/* Project info block */}
            <div style={{ marginTop: 32 }}>
              <p style={{
                fontSize: 10, fontFamily: 'var(--font-inter)', fontWeight: 700,
                letterSpacing: '0.16em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.25)', marginBottom: 14,
              }}>
                {lang === 'nl' ? 'Project info' : 'Project info'}
              </p>
              {[
                lang === 'nl' ? 'Fontys Eindhoven' : 'Fontys Eindhoven',
                lang === 'nl' ? 'ICT Media Content Creation' : 'ICT Media Content Creation',
                lang === 'nl' ? 'Semester 4 · 2025–2026' : 'Semester 4 · 2025–2026',
              ].map((line, i) => (
                <p key={i} style={{
                  fontFamily: 'var(--font-inter)', fontSize: 13,
                  color: 'rgba(255,255,255,0.3)', lineHeight: 1.8,
                }}>
                  {line}
                </p>
              ))}
            </div>
          </div>

          {/* ── Column 3: Concepten ── */}
          <div>
            <p style={{
              fontSize: 10, fontFamily: 'var(--font-inter)', fontWeight: 700,
              letterSpacing: '0.16em', textTransform: 'uppercase',
              color: '#58CC02', marginBottom: 22,
            }}>
              {lang === 'nl' ? 'Concepten' : 'Concepts'}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {CONCEPT_LINKS.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: 'var(--font-inter)', fontSize: 14,
                    color: 'rgba(255,255,255,0.45)',
                    textDecoration: 'none',
                    padding: '9px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    transition: 'color 0.15s',
                    display: 'flex', alignItems: 'center', gap: 10,
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#58CC02'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
                >
                  <span style={{
                    fontSize: 11, fontFamily: 'var(--font-inter)', fontWeight: 700,
                    color: 'rgba(88,204,2,0.4)', flexShrink: 0,
                    fontVariantNumeric: 'tabular-nums',
                  }}>
                    {link.num}
                  </span>
                  {lang === 'nl' ? link.nl : link.en}
                </Link>
              ))}
            </div>

            {/* Contact */}
            <div style={{ marginTop: 32 }}>
              <p style={{
                fontSize: 10, fontFamily: 'var(--font-inter)', fontWeight: 700,
                letterSpacing: '0.16em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.25)', marginBottom: 14,
              }}>
                Contact
              </p>
              {[
                { name: 'Thijn Opperman', email: 't.opperman@student.fontys.nl' },
                { name: 'Bor Klessens',   email: 'b.klessens@student.fontys.nl' },
              ].map(c => (
                <div key={c.name} style={{ marginBottom: 10 }}>
                  <p style={{ fontFamily: 'var(--font-inter)', fontWeight: 600, fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
                    {c.name}
                  </p>
                  <a
                    href={`mailto:${c.email}`}
                    style={{
                      fontFamily: 'var(--font-inter)', fontSize: 12,
                      color: 'rgba(255,255,255,0.25)',
                      textDecoration: 'none', transition: 'color 0.15s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = '#58CC02'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.25)'}
                  >
                    {c.email}
                  </a>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.07)',
          padding: '24px 0 32px',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
        }}>
          <p style={{
            fontFamily: 'var(--font-inter)', fontSize: 12,
            color: 'rgba(255,255,255,0.2)',
          }}>
            © 2026 Thijn Opperman & Bor Klessens · {lang === 'nl' ? 'Alle rechten voorbehouden' : 'All rights reserved'}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <a
              href="https://www.duolingo.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-inter)', fontSize: 12,
                color: 'rgba(255,255,255,0.3)',
                textDecoration: 'none',
                display: 'flex', alignItems: 'center', gap: 4,
                transition: 'color 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#58CC02'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
            >
              duolingo.com <ArrowUpRight size={12} />
            </a>

            <button
              onClick={() => { clearIntroSeen(); window.location.reload() }}
              style={{
                background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                fontFamily: 'var(--font-inter)', fontSize: 12,
                color: 'rgba(255,255,255,0.2)',
                display: 'flex', alignItems: 'center', gap: 5,
                transition: 'color 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.2)'}
            >
              <RotateCcw size={11} />
              {lang === 'nl' ? 'Intro opnieuw' : 'Replay intro'}
            </button>
          </div>
        </div>

      </div>
    </footer>
  )
}
