import { useMemo } from 'react'

const TORN_POINTS = [
  [[0, 24], [26, 14], [52, 27], [80, 9], [108, 22], [136, 6], [164, 25], [192, 13], [220, 29], [248, 8], [276, 20], [304, 28], [332, 11], [360, 23], [388, 7], [416, 26], [444, 15], [472, 30], [500, 10], [528, 21], [556, 7], [584, 27], [612, 16], [640, 4], [668, 24], [696, 12], [724, 28], [752, 9], [780, 19], [808, 5], [836, 25], [864, 14], [892, 29], [920, 10], [948, 20], [976, 6], [1000, 18]],
  [[0, 10], [24, 26], [50, 8], [78, 23], [106, 5], [134, 21], [162, 9], [190, 27], [218, 14], [246, 30], [274, 11], [302, 24], [330, 6], [358, 20], [386, 28], [414, 8], [442, 22], [470, 4], [498, 26], [526, 12], [554, 29], [582, 15], [610, 23], [638, 7], [666, 20], [694, 27], [722, 10], [750, 25], [778, 4], [806, 18], [834, 29], [862, 11], [890, 22], [918, 6], [946, 24], [974, 13], [1000, 20]],
]

function smoothEdge(points) {
  let d = `M ${points[0][0]},${points[0][1]} `
  for (let i = 1; i < points.length - 1; i++) {
    const [x1, y1] = points[i]
    const [x2, y2] = points[i + 1]
    d += `Q ${x1},${y1} ${(x1 + x2) / 2},${(y1 + y2) / 2} `
  }
  const last = points[points.length - 1]
  d += `L ${last[0]},${last[1]} `
  return d
}

export default function TornDivider({ color = '#0d0818', variant = 0, flip = false, className = '' }) {
  const points = TORN_POINTS[variant % TORN_POINTS.length]
  const edgePath = useMemo(() => smoothEdge(points), [points])
  const fillPath = `${edgePath} L 1000,60 L 0,60 Z`
  const gradientId = `torn-rim-${variant}-${flip ? 'f' : 'n'}`

  return (
    <div className={`relative w-full overflow-hidden ${className}`} style={{ height: '52px' }} aria-hidden="true">
      <svg
        viewBox="0 0 1000 60"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        style={{ transform: flip ? 'scaleX(-1)' : undefined }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#e879f9" stopOpacity="0" />
            <stop offset="50%" stopColor="#e879f9" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Resplandor difuso detrás — sensación de capa flotando sobre el fondo */}
        <path d={fillPath} fill={color} opacity="0.55" style={{ filter: 'blur(6px)' }} transform="translate(0,6)" />

        {/* Relleno principal */}
        <path d={fillPath} fill={color} style={{ filter: 'drop-shadow(0 -10px 16px rgba(0,0,0,0.45))' }} />

        {/* Línea de luz trazando el borde rasgado */}
        <path
          d={edgePath}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="1.5"
          strokeLinecap="round"
          style={{ filter: 'drop-shadow(0 0 4px rgba(232,121,249,0.55))' }}
        />
      </svg>
    </div>
  )
}