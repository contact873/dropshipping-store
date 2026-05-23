import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function BrandManifesto() {
  const containerRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const row1Ref = useRef<HTMLDivElement>(null)
  const row2Ref = useRef<HTMLDivElement>(null)
  const row3Ref = useRef<HTMLDivElement>(null)
  const finalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !stickyRef.current) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.0,
        onUpdate: (self) => {
          const progress = self.progress

          // Move rows 1 and 3 inward
          if (row1Ref.current) {
            const move1 = gsap.utils.interpolate(0, 50, progress)
            row1Ref.current.style.transform = `translateX(${move1}vw)`
          }

          if (row3Ref.current) {
            const move3 = gsap.utils.interpolate(0, -50, progress)
            row3Ref.current.style.transform = `translateX(${move3}vw)`
          }

          // Fade out rows
          const opacity = progress < 0.2 ? 1 - progress / 0.2 : 0
          ;[row1Ref, row2Ref, row3Ref].forEach((ref) => {
            if (ref.current) {
              ref.current.style.opacity = String(opacity)
            }
          })

          // Fade in final word
          if (finalRef.current) {
            finalRef.current.style.opacity = String(progress)
          }

          // Background gradient transition
          if (stickyRef.current) {
            const bgProgress = Math.min(progress * 2, 1)
            const r = Math.round(252 - (252 - 19) * bgProgress)
            const g = Math.round(246 - (246 - 18) * bgProgress)
            const b = Math.round(238 - (238 - 17) * bgProgress)
            stickyRef.current.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
          }
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="manifesto-container">
      <div ref={stickyRef} className="manifesto-sticky" style={{ backgroundColor: '#fcf6ee' }}>
        {/* Row 1: Left-aligned */}
        <div
          ref={row1Ref}
          className="manifesto-row"
          style={{ top: '35%', left: '10%' }}
        >
          <span>Where confidence</span>
        </div>

        {/* Row 2: Centered */}
        <div
          ref={row2Ref}
          className="manifesto-row"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <span>meets</span>
        </div>

        {/* Row 3: Right-aligned */}
        <div
          ref={row3Ref}
          className="manifesto-row"
          style={{ top: '65%', right: '10%' }}
        >
          <span>timeless style</span>
        </div>

        {/* Final word */}
        <div ref={finalRef} className="manifesto-final">
          <span>Raschident</span>
        </div>
      </div>
    </div>
  )
}
