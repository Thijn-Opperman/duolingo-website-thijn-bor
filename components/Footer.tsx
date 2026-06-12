'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer style={{ background: '#1a1a1a', color: '#e5e5e5' }}>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          {/* Logo */}
          <div>
            <span
              className="text-xl"
              style={{ fontFamily: 'var(--font-nunito)', fontWeight: 900 }}
            >
              <span style={{ color: 'var(--duo-green)' }}>duo</span>
              <span style={{ color: '#e5e5e5' }}>project</span>
            </span>
          </div>

          {/* Nav links */}
          <div className="flex gap-8">
            <Link
              href="/#concepts"
              className="text-sm transition-opacity hover:opacity-70"
              style={{ color: '#a0a0a0', fontFamily: 'var(--font-inter)' }}
            >
              {t.nav.concepts}
            </Link>
            <Link
              href="/team"
              className="text-sm transition-opacity hover:opacity-70"
              style={{ color: '#a0a0a0', fontFamily: 'var(--font-inter)' }}
            >
              {t.nav.team}
            </Link>
          </div>

          {/* Info */}
          <p className="text-sm text-center md:text-right" style={{ color: '#a0a0a0', fontFamily: 'var(--font-inter)' }}>
            Fontys ICT Media · Semester 4 · 2025–2026
          </p>
        </div>

        <div
          className="mt-8 pt-6 text-center text-xs"
          style={{ borderTop: '1px solid #2e2e2e', color: '#555' }}
        >
          © 2026 Thijn Opperman & Bor Klessens · {t.footer.rights}
        </div>
      </div>
    </footer>
  )
}
