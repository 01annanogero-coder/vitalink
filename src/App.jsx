import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppFAB from './components/WhatsAppFAB'

import Home          from './pages/Home'
import Products      from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import HealthGoals   from './pages/HealthGoals'
import About         from './pages/About'
import Contact       from './pages/Contact'
import BeADistributor from './pages/BeADistributor'
import WellnessClub  from './pages/WellnessClub'
import CartPage      from './pages/CartPage'
import DistributorAdmin from './pages/DistributorAdmin'
import NotFound      from './pages/NotFound'

// Scroll to top on route change
function ScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <CartProvider>
      <ScrollTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/"                     element={<Home />} />
          <Route path="/products"             element={<Products />} />
          <Route path="/products/:slug"       element={<ProductDetail />} />
          <Route path="/health-goals"         element={<HealthGoals />} />
          <Route path="/about"                element={<About />} />
          <Route path="/contact"              element={<Contact />} />
          <Route path="/be-a-distributor"     element={<BeADistributor />} />
          <Route path="/wellness-club"        element={<WellnessClub />} />
          <Route path="/cart"                 element={<CartPage />} />
          <Route path="/admin/distributors"   element={<DistributorAdmin />} />
          <Route path="*"                     element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppFAB />
    </CartProvider>
  )
}
