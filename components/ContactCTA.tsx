import Link from 'next/link'

export default function ContactCTA() {
  return (
    <div className="contact-cta">
      <h2>Ready to get your business online?</h2>
      <p>Free concept. Live in 5 days. Only pay when you love it.</p>
      <Link href="/contact" className="btn-white">
        Get your free concept →
      </Link>
    </div>
  )
}
