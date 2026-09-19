import { NavBar } from '../components/NavBar'
import { Hero } from '../components/Hero'
import { Audience } from '../components/Audience'
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
      <Process />
      <FAQ />
      <About />
      <FinalCTA />
      <Footer />
    </>
  )
}
