import type { Metadata } from 'next'
import Contact from '@/components/Contact'

export const metadata: Metadata = {
  title: 'Get in Touch — Webflow Studio',
  description:
    'Contact Webflow Studio for a free website concept. No payment needed until you love what we\'ve built. Call or WhatsApp Aidan on 073 127 5190.',
}

export default function ContactPage() {
  return <Contact />
}
