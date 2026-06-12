'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import LanguageSwitcher from './LanguageSwitcher'
import XPBar from './XPBar'
import { useLanguage } from '@/lib/LanguageContext'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const { t } = useLanguage()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  const navLinks = [
    { href: '/#concepts', label: t.nav.concepts },
    { href: '/team', label: t.nav.team },
  ]

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-40 transition-all"
        style={{
          background: 'var(--bg-primary)',
          borderBottom: `1px solid var(--border)`,
          boxShadow: scrolled ? '0 1px 12px rgba(0,0,0,0.08)' : 'none',
        }}
      >
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <span
              className="text-xl"
              style={{ fontFamily: 'var(--font-nunito)', fontWeight: 900 }}
            >
              <span style={{ color: 'var(--duo-green)' }}>duo</span>
              <span style={{ color: 'var(--text-primary)' }}>project</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-semibold transition-colors hover:opacity-80"
                style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-inter)' }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            <XPBar />
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
            <ThemeToggle />
            {/* Mobile hamburger */}
            <button
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl"
              style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 z-30 w-72 flex flex-col pt-20 p-6 gap-4"
            style={{ background: 'var(--bg-primary)', borderLeft: '1px solid var(--border)' }}
          >
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-lg font-bold py-3 border-b"
                style={{ color: 'var(--text-primary)', borderColor: 'var(--border)', fontFamily: 'var(--font-nunito)' }}
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-4">
              <LanguageSwitcher />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-16" />
    </>
  )
}
