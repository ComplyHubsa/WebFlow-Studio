'use client'
import { useState } from 'react'
import FadeIn from './FadeIn'

const industries = [
  'Plumbing / Waterproofing',
  'Electrical',
  'Construction / Building',
  'Restaurant / Café / Takeaway',
  'Salon / Barber / Spa',
  'Retail / Shop',
  'Cleaning Services',
  'Pest Control',
  'Landscaping / Garden Services',
  'Security Services',
  'Transport / Logistics',
  'Healthcare / Medical',
  'Education / Tutoring',
  'Automotive / Panel Beating',
  'Accommodation / Guesthouse',
  'Photography / Videography',
  'Events / Entertainment',
  'Legal / Accounting / Finance',
  'Other Business',
]

export default function Contact() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [business, setBusiness] = useState('')
  const [industry, setIndustry] = useState('')
  const [otherBusiness, setOtherBusiness] = useState('')
  const [hasWebsite, setHasWebsite] = useState('no')
  const [websiteUrl, setWebsiteUrl] = useState('')
  const [extra, setExtra] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  async function submit() {
    const errs: Record<string, string> = {}
    if (!phone.trim()) errs.phone = 'Phone number is required'
    if (!industry) errs.industry = 'Please select your industry'
    if (industry === 'Other Business' && !otherBusiness.trim()) {
      errs.other = 'Please describe your business'
    }
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setErrors({})
    setLoading(true)

    await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.trim(),
        phone: phone.trim(),
        business: business.trim(),
        industry: industry === 'Other Business' ? otherBusiness.trim() : industry,
        hasWebsite: hasWebsite === 'yes' ? 'Yes' : 'No',
        websiteUrl: websiteUrl.trim(),
        extraInfo: extra.trim(),
      }),
    })

    setLoading(false)
    setSent(true)
  }

  return (
    <section className="contact" id="contact">
      <div className="section-inner">
        <div className="contact-inner">
          <FadeIn className="contact-left">
            <div className="section-tag">Get in touch</div>
            <h2 className="section-h2">
              Let&apos;s build something <em>great together.</em>
            </h2>
            <p>
              Fill in the form and we&apos;ll get back to you within 24 hours with a free concept. No
              obligation, no payment required — just a great website waiting to happen.
            </p>
            <div className="contact-info">
              <a className="contact-info-item" href="tel:0731275190">
                <div className="ci-icon" style={{ fontSize: '12px' }}>Call</div>
                <div>
                  <div className="ci-label">Call Aidan directly</div>
                  <div className="ci-value">073 127 5190</div>
                </div>
              </a>
              <a className="contact-info-item" href="https://wa.me/27731275190" target="_blank" rel="noopener noreferrer">
                <div className="ci-icon" style={{ fontSize: '11px' }}>WA</div>
                <div>
                  <div className="ci-label">WhatsApp (fastest)</div>
                  <div className="ci-value">073 127 5190</div>
                </div>
              </a>
              <a className="contact-info-item" href="mailto:webflowstudiosa@gmail.com">
                <div className="ci-icon" style={{ fontSize: '13px' }}>@</div>
                <div>
                  <div className="ci-label">Email</div>
                  <div className="ci-value">webflowstudiosa@gmail.com</div>
                </div>
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="form-card">
              {sent ? (
                <div className="form-success">
                  <div className="success-icon">✓</div>
                  <h4>We&apos;ve got your request!</h4>
                  <p>
                    Thanks for reaching out. We&apos;ll research your business and send you a free concept
                    within 24 hours. Keep an eye on your phone — we&apos;ll be in touch soon.
                  </p>
                </div>
              ) : (
                <>
                  <h3>Free Website Concept</h3>
                  <p className="form-sub">Tell us about your business and we&apos;ll build your concept for free</p>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Your name</label>
                      <input
                        type="text"
                        placeholder="John Smith"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        Phone <span className="req">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="082 000 0000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                      {errors.phone && <span className="form-error show">{errors.phone}</span>}
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Business name</label>
                    <input
                      type="text"
                      placeholder="Your business name"
                      value={business}
                      onChange={(e) => setBusiness(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      Industry <span className="req">*</span>
                    </label>
                    <select value={industry} onChange={(e) => setIndustry(e.target.value)}>
                      <option value="" disabled>Select your industry…</option>
                      {industries.map((ind) => (
                        <option key={ind}>{ind}</option>
                      ))}
                    </select>
                    {errors.industry && <span className="form-error show">{errors.industry}</span>}
                  </div>

                  {industry === 'Other Business' && (
                    <div className="form-group">
                      <label>
                        Describe your business <span className="req">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Mobile tyre fitment"
                        value={otherBusiness}
                        onChange={(e) => setOtherBusiness(e.target.value)}
                      />
                      {errors.other && <span className="form-error show">{errors.other}</span>}
                    </div>
                  )}

                  <div className="form-group">
                    <label>Do you have a website already?</label>
                    <select value={hasWebsite} onChange={(e) => setHasWebsite(e.target.value)}>
                      <option value="no">No website yet</option>
                      <option value="yes">Yes, I have a website</option>
                    </select>
                  </div>

                  {hasWebsite === 'yes' && (
                    <div className="form-group">
                      <label>Your current website URL</label>
                      <input
                        type="url"
                        placeholder="https://yourwebsite.co.za"
                        value={websiteUrl}
                        onChange={(e) => setWebsiteUrl(e.target.value)}
                      />
                    </div>
                  )}

                  <div className="form-group">
                    <label>
                      Anything else?{' '}
                      <span style={{ color: 'rgba(255,255,255,0.25)', fontWeight: 400, letterSpacing: 0, textTransform: 'none', fontSize: '11px' }}>
                        (Optional)
                      </span>
                    </label>
                    <textarea
                      placeholder="Any extra details, special requests or things you'd like us to know…"
                      value={extra}
                      onChange={(e) => setExtra(e.target.value)}
                    />
                  </div>

                  <button
                    className="form-submit-btn"
                    onClick={submit}
                    disabled={loading}
                  >
                    {loading ? 'Sending…' : 'Send my request — get free concept →'}
                  </button>
                </>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
