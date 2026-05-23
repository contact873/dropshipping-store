import { useRef, useEffect, useState } from 'react'

const heroProducts = [
  {
    name: 'Summer Sandals',
    price: 89,
    image: '/images/hero-sandals.jpg',
  },
  {
    name: 'Woven Handbag',
    price: 120,
    image: '/images/hero-bag.jpg',
  },
  {
    name: 'Linen Dress',
    price: 156,
    image: '/images/hero-dress.jpg',
  },
]

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([false, false, false])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [])

  const handleImageLoad = (index: number) => {
    setImagesLoaded((prev) => {
      const next = [...prev]
      next[index] = true
      return next
    })
  }

  return (
    <section id="shop" className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/hero-bg.mp4"
        muted
        loop
        playsInline
        autoPlay
        style={{ zIndex: 0 }}
      />

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 1,
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.25) 60%, rgba(0,0,0,0.55) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative h-full" style={{ zIndex: 2 }}>
        {/* Left: Headline & CTA */}
        <div className="absolute bottom-24 left-8 md:left-16 max-w-lg">
          <h1
            className="font-display text-white mb-4"
            style={{
              fontSize: 'clamp(48px, 7vw, 96px)',
              lineHeight: 0.9,
              letterSpacing: '-0.03em',
              textShadow: '0 2px 20px rgba(0,0,0,0.3)',
            }}
          >
            This Season's Essential Edit
          </h1>
          <p
            className="font-body text-white mb-8"
            style={{
              fontSize: 18,
              lineHeight: 1.6,
              opacity: 0.8,
              textShadow: '0 1px 10px rgba(0,0,0,0.3)',
            }}
          >
            Autopilot dropshipping. Curated fashion. Zero effort.
          </p>
          <button
            className="btn-sharp text-white"
            style={{
              background: 'linear-gradient(135deg, #e8af3c, #f08865)',
            }}
          >
            Shop the Collection
          </button>
        </div>

        {/* Right: Floating Glass Product Cards */}
        <div className="hidden lg:flex absolute right-12 top-1/2 -translate-y-1/2 flex-col gap-6">
          {heroProducts.map((product, i) => (
            <div
              key={product.name}
              className="liquid-glass"
              style={{
                width: 280,
                borderRadius: 16,
                overflow: 'hidden',
                animation: `fadeInUp 0.6s ease-out ${0.2 + i * 0.15}s both`,
              }}
            >
              {/* Product Image */}
              <div style={{ height: 170, overflow: 'hidden' }}>
                <img
                  src={product.image}
                  alt={product.name}
                  className={`w-full h-full object-cover transition-opacity duration-400 ${
                    imagesLoaded[i] ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => handleImageLoad(i)}
                  style={{ transition: 'opacity 0.4s ease, transform 0.3s ease' }}
                  onMouseEnter={(e) => {
                    ;(e.target as HTMLImageElement).style.transform = 'scale(1.03)'
                  }}
                  onMouseLeave={(e) => {
                    ;(e.target as HTMLImageElement).style.transform = 'scale(1)'
                  }}
                />
              </div>

              {/* Text Area */}
              <div className="p-4" style={{ background: 'rgba(0,0,0,0.2)' }}>
                <p
                  className="font-display text-white mb-1"
                  style={{ fontSize: 18 }}
                >
                  {product.name}
                </p>
                <p
                  className="font-body text-white mb-3"
                  style={{ fontSize: 14, opacity: 0.8 }}
                >
                  ${product.price}
                </p>
                <button
                  className="w-full py-2 text-white font-body text-sm font-medium"
                  style={{
                    background: 'linear-gradient(135deg, #e8af3c, #f08865)',
                    border: 'none',
                    borderRadius: 0,
                    cursor: 'pointer',
                    transition: 'filter 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    ;(e.target as HTMLButtonElement).style.filter = 'brightness(1.1)'
                  }}
                  onMouseLeave={(e) => {
                    ;(e.target as HTMLButtonElement).style.filter = 'brightness(1)'
                  }}
                >
                  Add to Bag
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}
