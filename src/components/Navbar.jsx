import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { SOCIAL_LINKS } from '../config'
import { useCart } from '../context/CartContext'

const navLinks = [
  { to: '/',                  label: 'Home' },
  { to: '/products',          label: 'Products' },
  { to: '/health-goals',      label: 'Health Goals' },
  { to: '/about',             label: 'About' },
  { to: '/contact',           label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen]         = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location                = useLocation()
  const menuRef                 = useRef(null)
  const { count }                = useCart()

  // Close mobile menu on route change
  useEffect(() => { setOpen(false) }, [location])

  // Shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (open && menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  return (
    <header
      className={`sticky top-0 z-50 bg-white border-b border-gray-100 transition-shadow duration-200 ${
        scrolled ? 'shadow-nav' : ''
      }`}
      ref={menuRef}
    >
      {/* Top bar */}
      <div className="bg-forest-700 text-white text-xs py-2 hidden md:block">
        <div className="container-xl flex items-center justify-between">
          <span className="text-mint/80">Official NeoLife Distributor — Kenya</span>
          <a
            href={SOCIAL_LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-mint hover:text-white transition-colors"
          >
            <WhatsAppIcon className="w-3.5 h-3.5" />
            <span>+254 143 276 663</span>
          </a>
        </div>
      </div>

      {/* Main nav row */}
      <nav className="container-xl flex items-center justify-between h-16 md:h-18">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
          <LogoIcon className="w-8 h-8 text-forest-700" />
          <span className="font-serif font-bold text-xl text-forest-700 tracking-tight">
            Vitalink
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-forest-700 bg-mint'
                      : 'text-navy hover:text-forest-700 hover:bg-gray-50'
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <Link to="/cart" className="relative p-2 rounded-lg text-navy hover:bg-gray-50 transition-colors" aria-label="View cart">
            <CartIcon className="w-5 h-5" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-leaf text-white text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                {count > 9 ? '9+' : count}
              </span>
            )}
          </Link>
          <Link to="/be-a-distributor" className="btn-outline py-2 text-xs">
            Become a Distributor
          </Link>
          <Link to="/wellness-club" className="btn-primary py-2 text-xs">
            Join Wellness Club
          </Link>
        </div>

        {/* Mobile: cart + hamburger */}
        <div className="lg:hidden flex items-center gap-1">
          <Link to="/cart" className="relative p-2 rounded-lg text-navy hover:bg-gray-100 transition-colors" aria-label="View cart">
            <CartIcon className="w-5 h-5" />
            {count > 0 && (
              <span className="absolute top-0.5 right-0.5 bg-leaf text-white text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                {count > 9 ? '9+' : count}
              </span>
            )}
          </Link>
          <button
            className="p-2 rounded-lg text-navy hover:bg-gray-100 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-gray-100 bg-white shadow-lg">
          <ul className="container-xl py-4 space-y-1">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-forest-700 bg-mint'
                        : 'text-navy hover:bg-gray-50'
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
            <li className="pt-3 border-t border-gray-100 space-y-2">
              <Link to="/be-a-distributor" className="block btn-outline justify-center py-3">
                Become a Distributor
              </Link>
              <Link to="/wellness-club" className="block btn-primary justify-center py-3">
                Join Wellness Club
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}

// ── SVG Icons ───────────────────────────────────────────────────
function LogoIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="16" fill="#1B4332" />
      <path d="M10 10 L16 22 L22 10" stroke="#74C69D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle cx="16" cy="16" r="3" fill="#52B788" />
    </svg>
  )
}

function MenuIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}

function XIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

function CartIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.836l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 1.906-4.804 2.287-7.43a1.125 1.125 0 00-1.112-1.32H5.25M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    </svg>
  )
}

function WhatsAppIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}
