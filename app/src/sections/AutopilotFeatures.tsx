import { useEffect, useRef } from 'react'
import {
  Brain,
  RefreshCw,
  Package,
  TrendingUp,
  Megaphone,
  MessageCircle,
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    icon: Brain,
    title: 'AI Product Research',
    description:
      'AutoDS-powered AI scans trending products, analyzes competitor data, and imports winning items to your store.',
  },
  {
    icon: RefreshCw,
    title: 'Real-Time Inventory Sync',
    description:
      'Near-real-time stock synchronization across all suppliers. Never oversell again.',
  },
  {
    icon: Package,
    title: 'One-Click Fulfillment',
    description:
      'Orders route to suppliers automatically. Tracking numbers update without manual work.',
  },
  {
    icon: TrendingUp,
    title: 'Dynamic Pricing Engine',
    description:
      'AI-adjusted markups protect margins. Responds to supplier cost changes instantly.',
  },
  {
    icon: Megaphone,
    title: 'Marketing Automation',
    description:
      'Klaviyo-integrated email flows, abandoned cart recovery, and customer segmentation on autopilot.',
  },
  {
    icon: MessageCircle,
    title: '24/7 AI Support',
    description:
      'Tidio-powered chatbot handles inquiries round-the-clock. Human handoff for complex issues.',
  },
]

export default function AutopilotFeatures() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !cardsRef.current) return

    const ctx = gsap.context(() => {
      // Animate heading
      gsap.from('.features-heading', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.features-heading',
          start: 'top bottom-=100',
          toggleActions: 'play none none reverse',
        },
      })

      // Stagger cards
      gsap.from('.feature-card', {
        y: 60,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top bottom-=50',
          toggleActions: 'play none none reverse',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="w-full"
      style={{
        backgroundColor: 'var(--bg-light)',
        padding: '120px 48px',
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="features-heading mb-16">
          <p
            className="section-label mb-4"
            style={{ color: 'var(--accent-warm)' }}
          >
            AUTOPILOT SYSTEM
          </p>
          <h2
            className="font-display mb-4"
            style={{
              fontSize: 'clamp(36px, 5vw, 72px)',
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
            }}
          >
            Your Store Runs Itself
          </h2>
          <p
            className="font-body max-w-xl"
            style={{
              fontSize: 18,
              lineHeight: 1.6,
              color: 'var(--text-secondary)',
            }}
          >
            From product sourcing to order fulfillment — Raschident automates
            every step of your dropshipping business.
          </p>
        </div>

        {/* Feature Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10"
        >
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div key={feature.title} className="feature-card">
                <div
                  className="w-12 h-12 flex items-center justify-center mb-5"
                  style={{
                    background: 'linear-gradient(135deg, #e8af3c, #f08865)',
                    borderRadius: 12,
                  }}
                >
                  <Icon size={24} color="#fff" strokeWidth={1.5} />
                </div>
                <h3
                  className="font-body font-medium mb-2"
                  style={{
                    fontSize: 18,
                    color: 'var(--text-primary)',
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  className="font-body"
                  style={{
                    fontSize: 16,
                    lineHeight: 1.5,
                    color: 'var(--text-secondary)',
                  }}
                >
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <button
            className="btn-sharp text-white"
            style={{ backgroundColor: 'var(--text-primary)' }}
          >
            Explore All Features
          </button>
        </div>
      </div>
    </section>
  )
}
