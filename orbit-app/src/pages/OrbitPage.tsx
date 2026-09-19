import { NavBar } from '../components/NavBar'
import { Hero } from '../components/Hero'
import { Audience } from '../components/Audience'
import { Services } from '../components/Services'
import { Process } from '../components/Process'
import { FAQ } from '../components/FAQ'
import { About } from '../components/About'
import { FinalCTA } from '../components/FinalCTA'
import { Footer } from '../components/Footer'

export function OrbitPage() {
  return (
    <>
      <NavBar />
      <Hero />
      <Audience />
      <Services />
      <Process />
      <FAQ />
      <About />
      <FinalCTA />
      <Footer />
    </>
  )
}
