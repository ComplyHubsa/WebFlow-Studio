'use client'
import { useState, useCallback, CSSProperties } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

// Three.js uses browser APIs — load client-side only
const BlobScene = dynamic(() => import('./BlobScene'), { ssr: false })

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

function fadeStyle(visible: boolean, delay: number): CSSProperties {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0px)' : 'translateY(22px)',
    transition: visible
      ? `opacity 0.75s ${delay}s ${EASE}, transform 0.75s ${delay}s ${EASE}`
      : 'none',
  }
}

export default function Hero() {
  const [visible, setVisible] = useState(false)
  const handleSettled = useCallback(() => setVisible(true), [])

  return (
    <section className="hero" id="hero" style={{ background: '#04060c' }}>
      <BlobScene onSettled={handleSettled} />
      <div className="hero-text-backdrop" />

      <div className="hero-left">
        <div className="hero-tag" style={fadeStyle(visible, 0.0)}>
          🇿🇦 South Africa
        </div>

        <h1 className="hero-h1" style={fadeStyle(visible, 0.12)}>
          Your business deserves a website <em>that actually works.</em>
        </h1>

        <p className="hero-body" style={fadeStyle(visible, 0.24)}>
          We build beautiful, professional websites for South African small businesses — from plumbers and
          salons to restaurants and accountants. Custom-designed, mobile-friendly, and live within 5 days.
        </p>

        <div className="hero-ctas" style={fadeStyle(visible, 0.36)}>
          <Link href="/contact" className="btn-blue">
            Get your free concept →
          </Link>
          <Link href="/work" className="btn-ghost">
            See our work
          </Link>
        </div>

        <p className="hero-note" style={fadeStyle(visible, 0.48)}>
          No payment needed until you love what we&apos;ve built.
        </p>
      </div>
    </section>
  )
}
