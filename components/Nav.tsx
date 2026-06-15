'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import LanguageSwitcher from './LanguageSwitcher'
import XPBar from './XPBar'
import MuteButton from './MuteButton'
import { useLanguage } from '@/lib/LanguageContext'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const { t, lang } = useLanguage()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  const navLinks = [
    { href: '/#concepten', label: t.nav.concepts },
    { href: '/team', label: t.nav.team },
  ]

  const isActive = (href: string) =>
    href === '/team' ? pathname === '/team' : pathname === '/'

  return (
    <>
      <nav
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 40,
          background: scrolled ? 'rgba(7,10,8,0.95)' : 'rgba(7,10,8,0.75)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${scrolled ? 'rgba(88,204,2,0.18)' : 'rgba(255,255,255,0.06)'}`,
          transition: 'background 0.35s, border-color 0.35s',
        }}
      >
        {/* Green accent line */}
        <div style={{
          height: 2,
          background: 'linear-gradient(90deg, transparent 0%, #58CC02 25%, #58CC02 75%, transparent 100%)',
          opacity: 0.55,
        }} />

        <div style={{
          maxWidth: 1280, margin: '0 auto',
          padding: '0 32px', height: 58,
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: 24,
        }}>

          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
            <span style={{
              fontFamily: 'var(--font-fredoka)', fontWeight: 700,
              fontSize: 20, letterSpacing: '-0.01em',
            }}>
              <span style={{ color: '#58CC02' }}>duo</span>
              <span style={{ color: '#ffffff' }}>project</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex" style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {navLinks.map((l) => {
              const active = isActive(l.href)
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  style={{
                    position: 'relative',
                    fontFamily: 'var(--font-inter)', fontWeight: 600, fontSize: 14,
                    color: active ? '#ffffff' : 'rgba(255,255,255,0.48)',
                    textDecoration: 'none',
                    padding: '6px 14px',
                    borderRadius: 8,
                    transition: 'color 0.15s, background 0.15s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = '#ffffff'
                    e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = active ? '#ffffff' : 'rgba(255,255,255,0.48)'
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  {l.label}
                  {active && (
                    <span style={{
                      position: 'absolute', bottom: 3, left: '50%',
                      transform: 'translateX(-50%)',
                      width: 4, height: 4, borderRadius: '50%',
                      background: '#58CC02',
                    }} />
                  )}
                </Link>
              )
            })}
          </div>

          {/* Right controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <XPBar />

            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>

            <MuteButton />
            <ThemeToggle />

            {/* CTA — desktop only */}
            <a
              href="https://www.duolingo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex"
              style={{
                background: '#58CC02',
                borderBottom: '3px solid #3dab00',
                borderRadius: 10,
                color: '#fff',
                padding: '6px 16px',
                fontFamily: 'var(--font-fredoka)', fontWeight: 700, fontSize: 14,
                textDecoration: 'none',
                display: 'flex', alignItems: 'center', gap: 6,
                transition: 'filter 0.15s, transform 0.1s',
                letterSpacing: '0.01em',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.filter = 'brightness(1.1)'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.filter = ''
                e.currentTarget.style.transform = ''
              }}
            >
              {lang === 'nl' ? 'Start gratis' : 'Start free'}
              <ArrowRight size={13} />
            </a>

            {/* Hamburger — mobile only */}
            <button
              className="md:hidden"
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Menu"
              style={{
                width: 36, height: 36,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: 8,
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.8)',
                cursor: 'pointer',
              }}
            >
              {mobileOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              style={{
                position: 'fixed', inset: 0, zIndex: 28,
                background: 'rgba(0,0,0,0.55)',
                backdropFilter: 'blur(2px)',
              }}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 340, damping: 34 }}
              style={{
                position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 29,
                width: 280,
                background: '#070a08',
                borderLeft: '1px solid rgba(88,204,2,0.15)',
                display: 'flex', flexDirection: 'column',
                padding: '72px 24px 32px',
                gap: 4,
              }}
            >
              <p style={{
                fontSize: 10, fontFamily: 'var(--font-inter)', fontWeight: 700,
                letterSpacing: '0.14em', textTransform: 'uppercase',
                color: '#58CC02', marginBottom: 12, paddingLeft: 16,
              }}>
                Menu
              </p>

              {navLinks.map(l => (
                <Link
                  key={l.href}
                  href={l.href}
                  style={{
                    fontFamily: 'var(--font-fredoka)', fontWeight: 600, fontSize: 20,
                    color: 'rgba(255,255,255,0.85)',
                    textDecoration: 'none',
                    padding: '13px 16px',
                    borderRadius: 10,
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(88,204,2,0.07)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  {l.label}
                </Link>
              ))}

              <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 4 }}>
                <LanguageSwitcher />
                <MuteButton />
              </div>

              <a
                href="https://www.duolingo.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  marginTop: 'auto',
                  background: '#58CC02',
                  borderBottom: '4px solid #3dab00',
                  borderRadius: 12,
                  color: '#fff',
                  padding: '14px 20px',
                  fontFamily: 'var(--font-fredoka)', fontWeight: 700, fontSize: 17,
                  textDecoration: 'none',
                  textAlign: 'center',
                  display: 'block',
                }}
              >
                {lang === 'nl' ? 'Start gratis →' : 'Start free →'}
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div style={{ height: 60 }} />
    </>
  )
}
