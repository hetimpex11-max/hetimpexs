import { Routes, Route } from 'react-router-dom'
import ScrollWatermark from './components/ScrollWatermark'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TopMarquee from './components/TopMarquee'
import ShopByShape from './components/ShopByShape'
import About from './components/About'
import MiddleMarquee from './components/MiddleMarquee'

import ManufacturingProcess from './components/ManufacturingProcess'
import WhyChooseUs from './components/WhyChooseUs'
import GlobalExportCapability from './components/GlobalExportCapability'
import InstagramReels from './components/InstagramReels'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import CustomJewellery from './components/CustomJewellery'
import BottomMarquee from './components/BottomMarquee'
import Footer from './components/Footer'
import CustomizeRing from './components/CustomizeRing'

export default function App() {
  return (
    <div className="min-h-screen relative">
      <ScrollWatermark />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={
                <>
                  <Hero />
                  <TopMarquee />
                  <ShopByShape />
                  <About />
                  <MiddleMarquee />
                  <ManufacturingProcess />
                  <CustomJewellery />
                  <WhyChooseUs />
                  <GlobalExportCapability />
                  <InstagramReels />
                  <FAQ />
                  <Contact />
                  <BottomMarquee />
                </>
              } />
            <Route path="/customize" element={<CustomizeRing />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  )
}
