import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import About from '@/components/About'
import HowItWorks from '@/components/HowItWorks'
import Work from '@/components/Work'
import Pricing from '@/components/Pricing'
import ContactCTA from '@/components/ContactCTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <HowItWorks />
      <Work />
      <Pricing />
      <ContactCTA />
    </>
  )
}
