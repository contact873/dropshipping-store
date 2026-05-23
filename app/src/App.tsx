import Navigation from './sections/Navigation'
import Hero from './sections/Hero'
import StatementBar from './sections/StatementBar'
import AutopilotFeatures from './sections/AutopilotFeatures'
import NewArrivals from './sections/NewArrivals'
import BrandManifesto from './sections/BrandManifesto'
import Atelier from './sections/Atelier'
import Footer from './sections/Footer'

export default function App() {
  return (
    <div className="relative">
      <Navigation />
      <Hero />
      <StatementBar />
      <AutopilotFeatures />
      <NewArrivals />
      <BrandManifesto />
      <Atelier />
      <Footer />
    </div>
  )
}
