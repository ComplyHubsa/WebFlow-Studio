'use client'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let W = 0, H = 0
    let mouse = { x: -9999, y: -9999 }

    type Particle = {
      x: number; y: number; vx: number; vy: number
      size: number; alpha: number; layer: number
    }
    let particles: Particle[] = []

    function init() {
      W = canvas!.width = canvas!.offsetWidth
      H = canvas!.height = canvas!.offsetHeight
      particles = []
      const count = Math.floor((W * H) / 5000)
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: 0.5 + Math.random() * 1.8,
          alpha: 0.1 + Math.random() * 0.6,
          layer: Math.floor(Math.random() * 3),
        })
      }
    }

    function drawConnections() {
      const maxDist = 80
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.12
            ctx!.beginPath()
            ctx!.moveTo(particles[i].x, particles[i].y)
            ctx!.lineTo(particles[j].x, particles[j].y)
            ctx!.strokeStyle = `rgba(255,255,255,${alpha})`
            ctx!.lineWidth = 0.4
            ctx!.stroke()
          }
        }
      }
    }

    function draw() {
      ctx!.fillStyle = 'rgba(4,6,12,0.18)'
      ctx!.fillRect(0, 0, W, H)
      drawConnections()

      particles.forEach((p) => {
        const layerSpeed = 0.4 + p.layer * 0.4
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const repelRadius = 100 + p.layer * 30
        if (dist < repelRadius && dist > 0) {
          const force = (repelRadius - dist) / repelRadius
          p.vx += (dx / dist) * force * 0.6
          p.vy += (dy / dist) * force * 0.6
        }
        p.vx += (Math.random() - 0.5) * 0.01
        p.vy += (Math.random() - 0.5) * 0.01
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        const maxSpeed = 1.2 * layerSpeed
        if (speed > maxSpeed) {
          p.vx = (p.vx / speed) * maxSpeed
          p.vy = (p.vy / speed) * maxSpeed
        }
        p.vx *= 0.97; p.vy *= 0.97
        p.x += p.vx * layerSpeed; p.y += p.vy * layerSpeed
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0
        const bright = 160 + p.layer * 40
        const alpha = p.alpha * (0.5 + p.layer * 0.25)
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.size * (0.6 + p.layer * 0.3), 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(${bright},${bright},${bright + 20},${alpha})`
        ctx!.fill()
      })
      animId = requestAnimationFrame(draw)
    }

    const onMouseMove = (e: MouseEvent) => {
      const r = canvas!.getBoundingClientRect()
      mouse = { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    const onMouseLeave = () => { mouse = { x: -9999, y: -9999 } }
    const onResize = () => init()

    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('resize', onResize)

    init()
    ctx.fillStyle = '#04060C'
    ctx.fillRect(0, 0, W, H)
    draw()

    return () => {
      cancelAnimationFrame(animId)
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <section className="hero" id="hero">
      <canvas ref={canvasRef} id="orb-canvas" aria-hidden="true" />
      <div className="hero-overlay" />
      <div className="hero-left">
        <motion.div
          className="hero-tag"
          custom={0.1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          🇿🇦 South Africa
        </motion.div>

        <motion.h1
          className="hero-h1"
          custom={0.25}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          Your business deserves a website <em>that actually works.</em>
        </motion.h1>

        <motion.p
          className="hero-body"
          custom={0.4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          We build beautiful, professional websites for South African small businesses — from plumbers and
          salons to restaurants and accountants. Custom-designed, mobile-friendly, and live within 5 days.
        </motion.p>

        <motion.div
          className="hero-ctas"
          custom={0.55}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <Link href="/contact" className="btn-blue">
            Get your free concept →
          </Link>
          <Link href="/work" className="btn-ghost">
            See our work
          </Link>
        </motion.div>

        <motion.p
          className="hero-note"
          custom={0.7}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          No payment needed until you love what we&apos;ve built.
        </motion.p>
      </div>
    </section>
  )
}
