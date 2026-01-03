import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import { Hero } from './components/Hero'
import { DiscountBanner } from './components/DiscountBanner'
import { EventGallery } from './components/EventGallery'
import { Feedback } from './components/Feedback'
import { About } from './components/About'
import { Services } from './components/Services'
import { PackagesPricingBanner } from './components/PackagesPricingBanner'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import AdminAuth from './pages/AdminAuth'
import AdminDashboard from './pages/AdminDashboard'
import AcceptInvitation from './pages/AcceptInvitation'

function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground" style={{ overflow: 'visible' }}>
      <main className="relative" role="main" style={{ overflow: 'visible' }}>
        <section id="hero" aria-label="Hero section">
          <Hero />
        </section>
        <DiscountBanner />
        <section id="gallery" aria-label="Event Gallery section">
          <EventGallery />
        </section>
        <section id="feedback" aria-label="Customer Feedback section">
          <Feedback />
        </section>
        <section id="about" aria-label="About section">
          <About />
        </section>
        <section id="services" aria-label="Services section">
          <Services />
        </section>
        <PackagesPricingBanner />
        <section id="contact" aria-label="Contact section">
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" richColors />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/auth" element={<AdminAuth />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/accept-invitation" element={<AcceptInvitation />} />
      </Routes>
    </BrowserRouter>
  )
}
