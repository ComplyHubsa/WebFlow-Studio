const items = [
  'Plumbing', 'Electrical', 'Restaurants', 'Salons', 'Retail', 'Construction',
  'Accounting', 'Healthcare', 'Security', 'Landscaping', 'Photography', 'Transport',
  'Cleaning', 'Automotive', 'Events', 'Education',
]

function Track() {
  return (
    <div className="marquee-track">
      {items.map((item, i) => (
        <span key={`item-${i}`}>
          {item}
          <span className="dot" style={{ padding: '0 20px' }}>◆</span>
        </span>
      ))}
    </div>
  )
}

export default function Marquee() {
  return (
    <div className="marquee-strip" aria-hidden="true">
      <div className="marquee-wrapper">
        <Track />
        <Track />
      </div>
    </div>
  )
}
