'use client'
import { useRef, useState, useCallback, useEffect } from 'react'

// ── Brasa Restaurant Card ────────────────────────────────────────────────────

function BrasaCard() {
  return (
    <div className="cw-card cw-brasa">
      <div className="cw-card-inner">
        <div className="cw-card-top">
          <div className="cw-brasa-name">BRASA</div>
          <p className="cw-brasa-desc">
            South African open-fire cuisine, sourced from the land.
          </p>
        </div>
        <div className="cw-card-bottom cw-brasa-footer">
          <span className="cw-brasa-dot" />
          <span className="cw-brasa-loc">ROSEBANK · JHB</span>
        </div>
      </div>
      <div className="cw-hover-overlay">
        <span className="cw-view-label">View concept →</span>
      </div>
    </div>
  )
}

// ── 4WaysCon Card ────────────────────────────────────────────────────────────

function FourWaysCard() {
  return (
    <div className="cw-card cw-fourways">
      <div className="cw-card-inner">
        <div className="cw-card-top">
          <div className="cw-4w-stats">
            <div className="cw-4w-stat">
              <div className="cw-4w-num">200+</div>
              <div className="cw-4w-lbl">PROJECTS</div>
            </div>
            <div className="cw-4w-divider" />
            <div className="cw-4w-stat">
              <div className="cw-4w-num">12</div>
              <div className="cw-4w-lbl">YEARS</div>
            </div>
          </div>
          <div className="cw-4w-name">
            4WAYS<br />CON
          </div>
        </div>
        <div className="cw-card-bottom cw-4w-footer">
          <span className="cw-4w-loc">CONSTRUCTION · FOURWAYS · GAUTENG</span>
          <span className="cw-4w-bar" />
        </div>
      </div>
      <div className="cw-hover-overlay">
        <span className="cw-view-label">View concept →</span>
      </div>
    </div>
  )
}

// ── Before Website (bad) ─────────────────────────────────────────────────────

function BeforeWebsite() {
  return (
    <div className="ba-website ba-before-site">
      <div className="ba-b-nav">
        <span className="ba-b-logo">JOE&apos;S PLUMBING SERVICES</span>
        <div className="ba-b-navlinks">
          <a>Home</a><a>About Us</a><a>Services</a><a>Contact Us</a>
        </div>
      </div>
      <div className="ba-b-ticker">
        ⭐⭐ BEST PRICES IN THE AREA !! CALL NOW: 082 000 0000 ⭐ FREE QUOTES ⭐⭐
      </div>
      <div className="ba-b-hero">
        <div className="ba-b-clipart">🔧</div>
        <h1 className="ba-b-h1">Welcome to Joe&apos;s Plumbing!!</h1>
        <p className="ba-b-sub">We do ALL plumbing work. Fast &amp; Cheap!!</p>
        <a className="ba-b-btn">Click Here For A Quote!!</a>
      </div>
      <div className="ba-b-body">
        <div className="ba-b-img">📷<br /><small>image here</small></div>
        <div className="ba-b-text">
          <h2 className="ba-b-h2">About Our Company</h2>
          <p className="ba-b-p">
            Joes Plumbing has been servicing the area for many years. We are fully qualified and do all types of work including: leaking pipes, blocked drains, geyser installations, burst pipes and much more!! No job is too big or too small for us. Please dont hesitate to contact us for a FREE no obligation quote. We garentee the best prices!!
          </p>
          <p className="ba-b-p" style={{ color: '#c00', fontWeight: 700 }}>
            ⚠️ LIMITED TIME OFFER — 10% OFF THIS MONTH ONLY!!
          </p>
        </div>
      </div>
    </div>
  )
}

// ── After Website (FlowPro) ───────────────────────────────────────────────────

function AfterWebsite() {
  return (
    <div className="ba-website ba-after-site">
      <div className="ba-a-nav">
        <span className="ba-a-logo">FlowPro</span>
        <div className="ba-a-navlinks">
          <span>Services</span><span>Projects</span><span>Quote</span>
        </div>
        <span className="ba-a-btn">Get a Quote →</span>
      </div>
      <div className="ba-a-hero">
        <div className="ba-a-eyebrow">
          <span className="ba-a-dot" /> Licensed &amp; Insured · Durban
        </div>
        <h1 className="ba-a-h1">
          Expert Plumbing.<br />
          <span className="ba-a-blue">Done Right.</span>
        </h1>
        <div className="ba-a-stats">
          <div className="ba-a-stat">
            <strong>500+</strong><span>Jobs Done</span>
          </div>
          <div className="ba-a-stat-sep" />
          <div className="ba-a-stat">
            <strong>24h</strong><span>Response</span>
          </div>
          <div className="ba-a-stat-sep" />
          <div className="ba-a-stat">
            <strong>5★</strong><span>Rating</span>
          </div>
        </div>
      </div>
      <div className="ba-a-chips">
        <span>Emergency Repairs</span>
        <span>Geyser Installation</span>
        <span>Leak Detection</span>
        <span>Drain Cleaning</span>
      </div>
    </div>
  )
}

// ── Before/After Slider ──────────────────────────────────────────────────────

function BeforeAfterSlider() {
  const [pos, setPos] = useState(50)
  const dragging = useRef(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const updatePos = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const raw = ((clientX - rect.left) / rect.width) * 100
    setPos(Math.max(4, Math.min(96, raw)))
  }, [])

  const onDividerMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    dragging.current = true
  }, [])

  const onContainerTouchStart = useCallback((e: React.TouchEvent) => {
    dragging.current = true
    updatePos(e.touches[0].clientX)
  }, [updatePos])

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => { if (dragging.current) updatePos(e.clientX) }
    const onMouseUp = () => { dragging.current = false }
    const onTouchMove = (e: TouchEvent) => { if (dragging.current) updatePos(e.touches[0].clientX) }
    const onTouchEnd = () => { dragging.current = false }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onTouchEnd)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [updatePos])

  return (
    <div className="ba-section">
      <div className="ba-heading-wrap">
        <h2 className="ba-heading">The difference is <em>everything.</em></h2>
        <p className="ba-sub">Drag the handle to see what Webflow Studio delivers.</p>
      </div>

      <div className="ba-container" ref={containerRef} onTouchStart={onContainerTouchStart}>
        {/* After (right — always visible behind) */}
        <div className="ba-after-panel">
          <AfterWebsite />
          <div className="ba-label ba-label-after">After</div>
        </div>

        {/* Before (left — clipped to left of divider) */}
        <div
          className="ba-before-panel"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <BeforeWebsite />
          <div className="ba-label ba-label-before">Before</div>
        </div>

        {/* Divider line + drag handle */}
        <div
          className="ba-divider"
          style={{ left: `${pos}%` }}
          onMouseDown={onDividerMouseDown}
        >
          <div className="ba-handle">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M6 9L2 5M6 9L2 13M12 9L16 5M12 9L16 13" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Main Export ──────────────────────────────────────────────────────────────

export default function WorkShowcase() {
  return (
    <div className="cw-wrap">
      <div className="cw-grid">
        <BrasaCard />
        <FourWaysCard />
      </div>
      <BeforeAfterSlider />
    </div>
  )
}
