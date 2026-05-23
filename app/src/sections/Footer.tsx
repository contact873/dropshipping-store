import { useState } from 'react'

const footerLinks = {
  Shop: ['New Arrivals', 'Dresses', 'Accessories', 'Sale'],
  Help: ['Shipping & Returns', 'Size Guide', 'FAQ', 'Contact'],
  Company: ['About Us', 'Careers', 'Press', 'Sustainability'],
  Connect: ['Instagram', 'Pinterest', 'TikTok', 'Newsletter'],
}

const paymentIcons = ['Visa', 'Mastercard', 'Amex', 'PayPal', 'Apple Pay']

export default function Footer() {
  const [email, setEmail] = useState('')

  return (
    <footer
      className="w-full"
      style={{
        backgroundColor: 'var(--bg-dark)',
        padding: '120px 48px 48px',
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Watermark Logo */}
        <div
          className="font-display text-center mb-16 overflow-hidden"
          style={{
            fontSize: 'clamp(80px, 12vw, 180px)',
            lineHeight: 0.85,
            color: 'rgba(255, 255, 255, 0.06)',
            letterSpacing: '-0.02em',
          }}
        >
          RASCHIDENT
        </div>

        {/* Link Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4
                className="font-body font-medium text-white mb-5"
                style={{ fontSize: 14, letterSpacing: '0.02em' }}
              >
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-body transition-opacity duration-300 hover:opacity-100"
                      style={{
                        fontSize: 14,
                        color: 'rgba(255, 255, 255, 0.6)',
                      }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="flex flex-col md:flex-row items-center gap-4 mb-16 pb-16" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <p className="font-body text-white text-sm" style={{ opacity: 0.6 }}>
            Subscribe for exclusive offers and updates
          </p>
          <div className="flex gap-2 flex-1 max-w-md">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="footer-input-glass flex-1"
              style={{ borderRadius: 0 }}
            />
            <button
              className="btn-sharp text-white whitespace-nowrap"
              style={{
                background: 'linear-gradient(135deg, #e8af3c, #f08865)',
                padding: '14px 24px',
                fontSize: 14,
              }}
            >
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="font-body"
            style={{
              fontSize: 14,
              color: 'rgba(255, 255, 255, 0.4)',
            }}
          >
            &copy; 2025 Raschident. All rights reserved.
          </p>

          {/* Payment Icons */}
          <div className="flex items-center gap-3">
            {paymentIcons.map((icon) => (
              <div
                key={icon}
                className="px-3 py-1.5 flex items-center justify-center"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  borderRadius: 4,
                }}
              >
                <span
                  className="font-body text-xs"
                  style={{ color: 'rgba(255, 255, 255, 0.5)' }}
                >
                  {icon}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
