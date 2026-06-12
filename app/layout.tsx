import type { Metadata } from 'next'
import { Nunito, Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { XPProvider } from '@/lib/XPContext'
import { LanguageProvider } from '@/lib/LanguageContext'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import './globals.css'

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['800', '900'],
  variable: '--font-nunito',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'duoproject — Thijn & Bor voor Duolingo',
  description:
    "Vier concepten die Duolingo's missie van stil naar luid brengen. Semester 4 ICT Media, Fontys Eindhoven.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="nl"
      suppressHydrationWarning
      className={`${nunito.variable} ${inter.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LanguageProvider>
            <XPProvider>
              <Nav />
              <main className="flex-1">{children}</main>
              <Footer />
            </XPProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
