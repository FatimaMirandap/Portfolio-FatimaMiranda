import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'


function svgToDataUri(svg) {
  return `url("data:image/svg+xml,${encodeURIComponent(svg.trim())}")`
}

const hexTile = `
<svg xmlns="http://www.w3.org/2000/svg" width="64" height="74" viewBox="0 0 64 74">
  <polygon points="32,4 58,20 58,54 32,70 6,54 6,20" fill="none" stroke="#c084fc" stroke-width="1"/>
</svg>`

const networkTile = `
<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150">
  <g stroke="#e879f9" stroke-width="1" fill="none">
    <line x1="12" y1="18" x2="70" y2="52" />
    <line x1="70" y1="52" x2="118" y2="24" />
    <line x1="70" y1="52" x2="46" y2="112" />
    <line x1="46" y1="112" x2="128" y2="128" />
    <line x1="118" y1="24" x2="140" y2="80" />
  </g>
  <g fill="#e879f9">
    <circle cx="12" cy="18" r="2.4" />
    <circle cx="70" cy="52" r="3" />
    <circle cx="118" cy="24" r="2.4" />
    <circle cx="46" cy="112" r="2.4" />
    <circle cx="128" cy="128" r="2.4" />
    <circle cx="140" cy="80" r="2" />
  </g>
</svg>`

const rootTile = `
<svg xmlns="http://www.w3.org/2000/svg" width="220" height="240" viewBox="0 0 220 240">
  <g stroke="#a78bfa" stroke-width="1.2" fill="none" stroke-linecap="round">
    <path d="M20 0 C 40 40, 10 70, 35 110 S 90 150, 70 200 S 40 230, 60 240" />
    <path d="M35 110 C 60 120, 80 100, 110 118" />
    <path d="M70 200 C 100 190, 120 210, 150 195" />
    <path d="M200 20 C 180 60, 210 90, 180 130 S 140 170, 160 220" />
  </g>
</svg>`

const LAYERS = [
  { image: svgToDataUri(networkTile), size: '150px 150px', factor: 0.14, opacity: 0.1 }
]

function ParallaxLayer({ scrollY, image, size, factor, opacity }) {
  const backgroundPositionY = useTransform(scrollY, (v) => `${v * factor}px`)

  return (
    <motion.div
      className="absolute inset-0"
      style={{
        backgroundImage: image,
        backgroundSize: size,
        backgroundRepeat: 'repeat',
        backgroundPositionY,
        opacity,
        willChange: 'background-position',
      }}
    />
  )
}

export default function ParallaxBackground() {
  const { scrollY } = useScroll()
  const shouldReduceMotion = useReducedMotion()

  return (
    <div aria-hidden="true" className="fixed inset-0 z-[-10] bg-[#07050f]">
      {LAYERS.map((layer, i) =>
        shouldReduceMotion ? (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              backgroundImage: layer.image,
              backgroundSize: layer.size,
              backgroundRepeat: 'repeat',
              opacity: layer.opacity,
            }}
          />
        ) : (
          <ParallaxLayer key={i} scrollY={scrollY} {...layer} />
        ),
      )}
    </div>
  )
}
