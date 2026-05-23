import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { Suspense } from 'react'

const imageUrls = [
  '/images/hero-sandals.jpg',
  '/images/hero-bag.jpg',
  '/images/hero-dress.jpg',
  '/images/product-necklace.jpg',
  '/images/product-scarf.jpg',
  '/images/product-belt.jpg',
  '/images/product-blazer.jpg',
  '/images/product-hat.jpg',
  '/images/showcase-1.jpg',
  '/images/showcase-2.jpg',
  '/images/showcase-3.jpg',
  '/images/product-cardigan.jpg',
]

const imageSize: [number, number] = [3, 3.2]
const ringRadius = 4.5
const goldenAngle = 2.39996
const ringCount = 30

function TunnelGallery({ textures }: { textures: THREE.Texture[] }) {
  const planeGeometry = useMemo(
    () => new THREE.PlaneGeometry(imageSize[0], imageSize[1]),
    []
  )

  const ringOffsets = useMemo(
    () => Array.from({ length: ringCount }, (_, i) => i * 1.2),
    []
  )

  const imageCount = textures.length

  const groupRefs = useRef<(THREE.Group | null)[]>(
    Array.from({ length: ringCount }, () => null)
  )

  useFrame(({ camera }) => {
    groupRefs.current.forEach((group, i) => {
      if (!group) return
      const baseZ = ringOffsets[i]
      const mod = ringCount * 1.2
      let z = ((baseZ - camera.position.z) % mod) + camera.position.z
      if (z > camera.position.z + 15) z -= mod
      if (z < camera.position.z - 45) z += mod
      group.position.z = z
    })
  })

  return (
    <group position={[0, 0.4, 0]}>
      {ringOffsets.map((baseZ, ringIndex) => (
        <group
          key={ringIndex}
          position={[0, 0, baseZ]}
          ref={(el) => {
            groupRefs.current[ringIndex] = el
          }}
        >
          {Array.from({ length: 10 }, (_, imgIndex) => {
            const angle = imgIndex * goldenAngle
            const x = Math.cos(angle) * ringRadius
            const y = Math.sin(angle) * ringRadius
            const textureIndex = (ringIndex * 10 + imgIndex) % imageCount
            const rotationZ = angle - Math.PI / 2

            return (
              <mesh
                key={imgIndex}
                geometry={planeGeometry}
                position={[x, y, 0]}
                rotation={[0, 0, rotationZ]}
              >
                <meshBasicMaterial
                  side={THREE.DoubleSide}
                  map={textures[textureIndex]}
                  depthWrite={false}
                />
              </mesh>
            )
          })}
        </group>
      ))}
    </group>
  )
}

function CameraRig({ scrollSpeed = 0.15 }: { scrollSpeed?: number }) {
  const { camera } = useThree()
  const scroll = useRef(5)

  useFrame(() => {
    scroll.current += scrollSpeed
    camera.position.z = scroll.current
    camera.position.y = 0.4
    camera.rotation.x = 0
  })

  return null
}

function AtelierScene() {
  const textures = useMemo(() => {
    const loader = new THREE.TextureLoader()
    return imageUrls.map((url) => {
      const tex = loader.load(url)
      tex.colorSpace = THREE.SRGBColorSpace
      return tex
    })
  }, [])

  return (
    <Canvas
      camera={{ fov: 60, near: 0.1, far: 100, position: [0, 0.4, 5] }}
      style={{ position: 'absolute', inset: 0 }}
      dpr={[1, 2]}
    >
      <Suspense fallback={null}>
        <CameraRig />
        <TunnelGallery textures={textures} />
      </Suspense>
    </Canvas>
  )
}

export default function Atelier() {
  return (
    <section
      id="collections"
      className="relative w-full overflow-hidden"
      style={{ height: '100vh', backgroundColor: 'var(--bg-dark)' }}
    >
      {/* Three.js Canvas */}
      <AtelierScene />

      {/* Overlay */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ zIndex: 2, pointerEvents: 'none' }}
      >
        <h2
          className="font-display text-white text-center mb-8"
          style={{
            fontSize: 'clamp(48px, 7vw, 96px)',
            lineHeight: 0.9,
            letterSpacing: '-0.03em',
            textShadow: '0 2px 30px rgba(0,0,0,0.5)',
          }}
        >
          The Raschident Atelier
        </h2>
        <button
          className="liquid-glass-dark text-white font-body font-medium text-base px-8 py-3"
          style={{
            borderRadius: 48,
            pointerEvents: 'auto',
            letterSpacing: '0.02em',
          }}
        >
          Explore the Collection
        </button>
      </div>
    </section>
  )
}
