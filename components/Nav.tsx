'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { label: 'How it works', href: '/#how' },
  { label: 'About', href: '/#about' },
  { label: 'Our work', href: '/work' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Contact', href: '/contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <>
      <nav className={scrolled ? 'scrolled' : ''}>
        <Link href="/" className="nav-logo">
          <div className="nav-logo-mark">WS</div>
          <span className="nav-logo-text">
            Webflow <span>Studio</span>
          </span>
        </Link>

        <ul className="nav-links">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href}>{l.label}</Link>
            </li>
          ))}
        </ul>

        <Link href="/contact" className="nav-cta">
          Get a free concept →
        </Link>

        <button
          className={`nav-hamburger${open ? ' open' : ''}`}
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`mobile-menu${open ? ' open' : ''}`} role="navigation">
        {links.map((l) => (
          <Link key={l.href} href={l.href}>
            {l.label}
          </Link>
        ))}
        <Link href="/contact" className="mobile-cta">
          Get a free concept →
        </Link>
      </div>
    </>
  )
}
