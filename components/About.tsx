import FadeIn from './FadeIn'

export default function About() {
  return (
    <section className="story" id="about">
      <div className="story-inner">
        <FadeIn className="story-text">
          <div className="section-tag">About Webflow Studio</div>
          <h2 className="section-h2">
            Built for <em>South African businesses.</em>
          </h2>
          <p>
            Webflow Studio started with a simple observation: too many good South African businesses were
            losing customers online — not because they weren&apos;t good at what they do, but because their
            website didn&apos;t reflect that.
          </p>
          <p>
            My name is <strong>Aidan O&apos;Gorman</strong>. I started Webflow Studio because I believe
            every local business — whether you&apos;re a plumber, a salon owner, a restaurant or a
            contractor — deserves a website that looks the part and actually brings in customers.
          </p>
          <p>
            No big agency fees. No confusing contracts. No templates that look like everyone else&apos;s.
            Just a <strong>custom-built website</strong>, designed around your business, for a price that
            makes sense.
          </p>
          <p>
            You see the design before you pay anything. If you don&apos;t love it, you don&apos;t owe us a
            cent. That&apos;s the deal.
          </p>
        </FadeIn>

        <FadeIn delay={0.15} className="story-visual">
          <div className="story-stat-card accent">
            <div className="stat-num">R3,500</div>
            <div className="stat-label">Full custom website — once-off, no monthly fees</div>
          </div>
          <div className="story-stat-row">
            <div className="story-stat-mini">
              <div className="stat-num">5</div>
              <div className="stat-label">Days to go live</div>
            </div>
            <div className="story-stat-mini">
              <div className="stat-num">Free</div>
              <div className="stat-label">Concept before you pay</div>
            </div>
          </div>
          <div className="story-stat-card">
            <div className="stat-num">SA</div>
            <div className="stat-label">Based in South Africa, building websites nationwide</div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
