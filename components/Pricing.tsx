'use client'
import { useState } from 'react'
import Link from 'next/link'
import FadeIn from './FadeIn'

function QuickFixForm() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState(false)
  const [sent, setSent] = useState(false)

  async function submit() {
    if (!name.trim() || !phone.trim()) {
      setError(true)
      return
    }
    setError(false)
    await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        phone,
        business: 'Quick Fix Request',
        industry: 'Quick Fix',
        hasWebsite: 'Yes',
        websiteUrl: '',
        extraInfo: 'Quick Fix enquiry',
      }),
    })
    setSent(true)
  }

  if (sent) {
    return (
      <div className="qf-success show">
        <div className="qf-success-text">Got it! We&apos;ll WhatsApp you shortly.</div>
      </div>
    )
  }

  return (
    <>
      <div className="qf-inputs">
        <input
          className="qf-input"
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="qf-input"
          type="tel"
          placeholder="WhatsApp number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        {error && <div className="qf-error show">Please fill in both fields</div>}
      </div>
      <button onClick={submit} className="btn-pricing btn-pricing-outline" style={{ width: '100%', cursor: 'pointer' }}>
        Send — we&apos;ll WhatsApp you →
      </button>
    </>
  )
}

export default function Pricing() {
  return (
    <section className="pricing" id="pricing">
      <div className="section-inner">
        <FadeIn>
          <div className="section-tag">Pricing</div>
          <h2 className="section-h2">
            Simple pricing, <em>no hidden fees.</em>
          </h2>
          <p className="section-sub">
            Pick the package that suits you. Every price is once-off — no monthly surprises, no contracts,
            no nonsense.
          </p>
        </FadeIn>

        <div className="pricing-grid">
          <FadeIn delay={0.05}>
            <div className="pricing-card featured">
              <div className="pricing-head">
                <div className="pricing-badge">Most popular</div>
                <div className="pricing-name">Full Website Build</div>
                <div className="pricing-price">
                  <sup>R</sup><span>3,500</span>
                </div>
                <div className="pricing-tagline">Once-off · No monthly fees · No contracts</div>
              </div>
              <div className="pricing-features">
                <ul>
                  <li>Custom designed website — not a template</li>
                  <li>Mobile-friendly &amp; fast-loading</li>
                  <li>Live within 5 business days</li>
                  <li>Free concept before you pay anything</li>
                  <li>WhatsApp &amp; call button built in</li>
                  <li>Google-ready (basic SEO setup)</li>
                  <li>Contact form included</li>
                  <li>
                    1 round of revisions included{' '}
                    <span className="note">
                      Ask for one set of changes after delivery — wording, colours, layout — fixed at no extra charge.
                    </span>
                  </li>
                </ul>
              </div>
              <div className="pricing-cta">
                <Link href="/contact" className="btn-pricing btn-pricing-solid">
                  Get your free concept →
                </Link>
                <a
                  href="https://pay.yoco.com/r/4gv1Ng"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pricing-pay-link"
                >
                  Already seen your concept? <span>Pay R3,500 now →</span>
                </a>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="pricing-card">
              <div className="pricing-head">
                <div className="pricing-name">Quick Fix</div>
                <div className="pricing-price">
                  <sup>R</sup><span>500</span>
                </div>
                <div className="pricing-tagline">Per fix · Pay only when done</div>
              </div>
              <div className="pricing-features">
                <ul>
                  <li>Update text, prices or details</li>
                  <li>Fix a broken button or link</li>
                  <li>Swap out images or photos</li>
                  <li>Small layout or colour changes</li>
                  <li>Add or remove a section</li>
                  <li>Turnaround within 24–48 hours</li>
                </ul>
              </div>
              <div className="pricing-cta">
                <QuickFixForm />
                <a
                  href="https://pay.yoco.com/r/2YV6j5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pricing-pay-link"
                  style={{ marginTop: '10px' }}
                >
                  Already agreed on a fix? <span>Pay R500 now →</span>
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
