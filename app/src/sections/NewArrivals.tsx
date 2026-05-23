import { useRef, useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const products = [
  { name: 'Gold Chain Necklace', price: 68, image: '/images/product-necklace.jpg' },
  { name: 'Coral Silk Scarf', price: 95, image: '/images/product-scarf.jpg' },
  { name: 'Tan Leather Belt', price: 78, image: '/images/product-belt.jpg' },
  { name: 'Beige Linen Blazer', price: 245, image: '/images/product-blazer.jpg' },
  { name: 'Woven Straw Hat', price: 55, image: '/images/product-hat.jpg' },
  { name: 'Cream Knit Cardigan', price: 132, image: '/images/product-cardigan.jpg' },
  { name: 'Suede Ankle Boots', price: 189, image: '/images/product-boots.jpg' },
  { name: 'Pearl Drop Earrings', price: 52, image: '/images/product-earrings.jpg' },
]

export default function NewArrivals() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.from('.new-arrivals-heading', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none reverse',
        },
      })

      gsap.from('.product-card-item', {
        y: 50,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: scrollRef.current,
          start: 'top bottom-=50',
          toggleActions: 'play none none reverse',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Drag to scroll
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return
    isDragging.current = true
    startX.current = e.pageX - scrollRef.current.offsetLeft
    scrollLeft.current = scrollRef.current.scrollLeft
    scrollRef.current.style.cursor = 'grabbing'
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX.current) * 1.5
    scrollRef.current.scrollLeft = scrollLeft.current - walk
  }

  const handleMouseUp = () => {
    isDragging.current = false
    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grab'
    }
  }

  return (
    <section
      id="new-arrivals"
      ref={sectionRef}
      className="w-full"
      style={{
        backgroundColor: 'var(--bg-light)',
        padding: '120px 0 120px 48px',
      }}
    >
      {/* Section Header */}
      <div className="new-arrivals-heading mb-12">
        <p className="section-label mb-4" style={{ color: 'var(--text-tertiary)' }}>
          NEW ARRIVALS
        </p>
        <h2
          className="font-display"
          style={{
            fontSize: 'clamp(36px, 5vw, 72px)',
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
          }}
        >
          Just Dropped
        </h2>
      </div>

      {/* Horizontal Scroll Gallery */}
      <div
        ref={scrollRef}
        className="horizontal-scroll pb-4"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {products.map((product, i) => (
          <div
            key={product.name}
            className="product-card-item"
            style={{ width: 280, flexShrink: 0 }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Image Container */}
            <div
              className="relative mb-3 overflow-hidden"
              style={{ aspectRatio: '1/1', borderRadius: 8 }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300"
                style={{
                  transform:
                    hoveredIndex === i ? 'scale(1.03)' : 'scale(1)',
                }}
                draggable={false}
              />

              {/* Quick View Button */}
              <div
                className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
                style={{ opacity: hoveredIndex === i ? 1 : 0 }}
              >
                <div
                  className="liquid-glass w-12 h-12 flex items-center justify-center cursor-pointer"
                  style={{ borderRadius: '50%' }}
                >
                  <Search size={18} color="#fff" />
                </div>
              </div>
            </div>

            {/* Product Info */}
            <p
              className="font-display mb-1"
              style={{ fontSize: 18, color: 'var(--text-primary)' }}
            >
              {product.name}
            </p>
            <p
              className="font-body"
              style={{ fontSize: 14, color: 'var(--text-tertiary)' }}
            >
              ${product.price}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
