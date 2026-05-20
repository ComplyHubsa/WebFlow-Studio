import type { Metadata } from 'next'
import Work from '@/components/Work'
import ContactCTA from '@/components/ContactCTA'

export const metadata: Metadata = {
  title: 'Our Work — Webflow Studio',
  description:
    'Browse custom websites built by Webflow Studio for South African businesses — salons, restaurants, construction, accounting and more.',
}

export default function WorkPage() {
  return (
    <>
      <div className="work-page-header">
        <div className="section-inner">
          <div className="section-tag" style={{ background: 'rgba(37,99,235,0.15)', borderColor: 'rgba(37,99,235,0.3)' }}>
            Our work
          </div>
          <h1 className="section-h2">Built for <em>real businesses.</em></h1>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.45)', lineHeight: '1.7', maxWidth: '560px', marginTop: '8px' }}>
            Every website we build is custom-designed from scratch — no templates, no cookie-cutter layouts.
            Here&apos;s a taste of what we create for South African businesses.
          </p>
        </div>
      </div>
      <Work hideHeader />
      <ContactCTA />
    </>
  )
}
