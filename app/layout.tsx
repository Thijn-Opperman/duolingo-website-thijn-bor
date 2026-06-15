import type { Metadata } from 'next'
import { Nunito, Inter, Fredoka } from 'next/font/google'
import localFont from 'next/font/local'
import { ThemeProvider } from 'next-themes'
import { XPProvider } from '@/lib/XPContext'
import { LanguageProvider } from '@/lib/LanguageContext'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import XPToast from '@/components/XPToast'
import './globals.css'

const feather = localFont({
  src: '../public/fonts/Duolingo Feather Bold.ttf',
  variable: '--font-feather',
  display: 'swap',
})

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-fredoka',
  display: 'swap',
})

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
  title: 'Duolingo project — Thijn & Bor voor Duolingo',
  description:
    "Vier concepten die Duolingo's missie van stil naar luid brengen. Semester 4 ICT Media, Fontys Eindhoven.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="nl"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${feather.variable} ${fredoka.variable} ${nunito.variable} ${inter.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <LanguageProvider>
            <XPProvider>
              <Nav />
              <XPToast />
              <main className="flex-1">{children}</main>
              <Footer />
            </XPProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
