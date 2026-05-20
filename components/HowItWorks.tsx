import FadeIn from './FadeIn'

const steps = [
  {
    num: '1',
    title: 'You call or WhatsApp us',
    body: "Tell us about your business. We'll research your industry, your area and your competitors — all at no charge before we build anything.",
  },
  {
    num: '2',
    title: 'We build you a free concept',
    body: 'We design a custom website concept for your business completely free. You see exactly what you\'re getting before you spend a single rand.',
  },
  {
    num: '3',
    title: 'You approve and pay',
    body: "Love the concept? Pay R3,500 and we begin the build. No deposits, no surprises — you only pay when you're happy with what you see.",
  },
  {
    num: '4',
    title: 'Live within 5 days',
    body: "Your site goes live within 5 business days. Mobile-friendly, fast-loading and built to get your phone ringing and your inbox busy.",
  },
]

export default function HowItWorks() {
  return (
    <section className="how" id="how">
      <div className="section-inner">
        <FadeIn>
          <div className="section-tag">How it works</div>
          <h2 className="section-h2">
            Simple, honest, <em>no surprises.</em>
          </h2>
          <p className="section-sub">
            We keep things straightforward. No confusing jargon, no hidden fees, no pressure — just a
            great website for your business.
          </p>
        </FadeIn>

        <div className="how-grid">
          {steps.map((step, i) => (
            <FadeIn key={step.num} delay={i * 0.1}>
              <div className="how-card">
                <div className="how-card-num">{step.num}</div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
