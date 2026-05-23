import { useEffect, useRef, useState } from 'react'
import { Search, User, ShoppingBag } from 'lucide-react'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.8)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      ref={navRef}
      className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-8 px-8 py-3 transition-all duration-500 ${
        scrolled ? 'liquid-glass-dark' : 'liquid-glass'
      }`}
      style={{ borderRadius: 48 }}
    >
      <a
        href="#"
        className="font-display text-lg tracking-wide"
        style={{ color: scrolled ? '#fff' : '#fff' }}
      >
        RASCHIDENT
      </a>

      <div className="hidden md:flex items-center gap-6">
        {['Shop', 'New Arrivals', 'Collections', 'About'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
            className="font-body text-sm transition-opacity duration-300 hover:opacity-70"
            style={{
              color: '#fff',
              letterSpacing: '0.02em',
            }}
          >
            {item}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-4 ml-4">
        <button className="p-2 transition-opacity duration-300 hover:opacity-70" aria-label="Search">
          <Search size={18} color="#fff" />
        </button>
        <button className="p-2 transition-opacity duration-300 hover:opacity-70" aria-label="Account">
          <User size={18} color="#fff" />
        </button>
        <button className="p-2 transition-opacity duration-300 hover:opacity-70 relative" aria-label="Cart">
          <ShoppingBag size={18} color="#fff" />
          <span
            className="absolute -top-0.5 -right-0.5 w-4 h-4 flex items-center justify-center text-xs font-medium"
            style={{
              background: 'linear-gradient(135deg, #e8af3c, #f08865)',
              color: '#fff',
              borderRadius: '50%',
              fontSize: 10,
            }}
          >
            3
          </span>
        </button>
      </div>
    </nav>
  )
}
