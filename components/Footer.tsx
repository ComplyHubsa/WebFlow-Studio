import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <div className="footer-logo">
        Webflow <span>Studio</span>
      </div>
      <p>Professional websites for South African businesses · R3,500 once-off</p>
      <p>
        <Link href="mailto:webflowstudiosa@gmail.com">webflowstudiosa@gmail.com</Link>
      </p>
    </footer>
  )
}
