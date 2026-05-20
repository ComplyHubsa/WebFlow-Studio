import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Lora } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
})

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  weight: ['500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Webflow Studio — Websites for South African Businesses',
  description:
    'Custom-designed websites for South African small businesses. R3,500 once-off, live within 5 days. Free concept before you pay anything.',
  keywords:
    'website design South Africa, web design, small business website, affordable website, custom website SA',
  openGraph: {
    title: 'Webflow Studio — Websites for South African Businesses',
    description:
      'Custom websites for SA small businesses. R3,500 once-off. Free concept. Live in 5 days.',
    type: 'website',
    locale: 'en_ZA',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${lora.variable}`}>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
