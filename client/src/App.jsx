import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import Home from './pages/Home'
import Constructora from './pages/Constructora'
import Desarrollos from './pages/Desarrollos'
import Proyectos from './pages/Proyectos'
import Nosotros from './pages/Nosotros'
import Contacto from './pages/Contacto'
import ProyectoDetalle from './pages/ProyectoDetalle'
import AdminDashboard from './pages/AdminDashboard'
import AdminLogin from './pages/AdminLogin'
import ProtectedRoute from './components/ui/ProtectedRoute'
import ScrollToTop from './components/ui/ScrollToTop'

export const App = () => {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true })
    window.lenisInstance = lenis 
    let animationFrameId
    const animationLoop = (time) => {
      lenis.raf(time)
      animationFrameId = requestAnimationFrame(animationLoop)
    }
    animationFrameId = requestAnimationFrame(animationLoop)
    return () => {
      cancelAnimationFrame(animationFrameId)
      lenis.destroy()
      delete window.lenisInstance
    }
  }, [])

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/constructora" element={<Constructora />} />
            <Route path="/proyectos" element={<Proyectos />} />
            <Route path="/desarrollos" element={<Desarrollos />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/proyecto/:id" element={<ProyectoDetalle />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
