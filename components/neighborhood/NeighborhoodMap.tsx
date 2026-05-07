'use client';

/**
 * NeighborhoodMap — inline SVG of an abstract street grid with
 * irregular blocks, a park, a curving river, and labeled districts.
 * Scales fluidly. Used as Layer 1 in the background system.
 */
export function NeighborhoodMap({
  className = '',
  intensity = 1,
}: {
  className?: string;
  intensity?: number;
}) {
  const op = (base: number) => Math.min(1, base * intensity);

  return (
    <svg
      viewBox="0 0 1600 1000"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="map-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(11,13,18,0)" />
          <stop offset="50%" stopColor="rgba(11,13,18,0)" />
          <stop offset="100%" stopColor="rgba(11,13,18,0.55)" />
        </linearGradient>
        <radialGradient id="map-vignette" cx="50%" cy="50%" r="65%">
          <stop offset="60%" stopColor="rgba(11,13,18,0)" />
          <stop offset="100%" stopColor="rgba(11,13,18,0.85)" />
        </radialGradient>
        <pattern id="block-fill" width="6" height="6" patternUnits="userSpaceOnUse">
          <rect width="6" height="6" fill="rgba(255,255,255,0.012)" />
          <circle cx="3" cy="3" r="0.4" fill="rgba(255,255,255,0.06)" />
        </pattern>
      </defs>

      {/* River/curve through the lower third */}
      <path
        d="M -50 760 C 200 700, 360 820, 600 740 S 1100 660, 1400 720 S 1700 760, 1700 760 L 1700 1100 L -50 1100 Z"
        fill="rgba(76,203,199,0.04)"
        stroke="rgba(76,203,199,0.10)"
        strokeWidth="1"
      />

      {/* Park polygon */}
      <path
        d="M 970 240 L 1180 220 L 1240 380 L 1100 460 L 950 410 Z"
        fill="rgba(183,228,110,0.04)"
        stroke="rgba(183,228,110,0.14)"
        strokeWidth="1"
      />

      {/* Major arteries */}
      <g stroke="rgba(255,255,255,0.10)" strokeWidth="1.2" fill="none">
        <path d="M 0 220 L 1600 200" />
        <path d="M 0 480 L 1600 460" />
        <path d="M 0 720 L 1600 700" opacity={op(0.4)} />
        <path d="M 280 0 L 320 1000" />
        <path d="M 760 0 L 800 1000" />
        <path d="M 1200 0 L 1230 1000" />
      </g>

      {/* Secondary streets — a denser hairline grid */}
      <g stroke="rgba(255,255,255,0.05)" strokeWidth="0.8" fill="none">
        {Array.from({ length: 14 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1={0}
            y1={70 + i * 65}
            x2={1600}
            y2={50 + i * 65}
          />
        ))}
        {Array.from({ length: 18 }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={50 + i * 90}
            y1={0}
            x2={70 + i * 90}
            y2={1000}
          />
        ))}
      </g>

      {/* Selected blocks filled with subtle texture */}
      <g fill="url(#block-fill)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.6">
        <rect x="380" y="130" width="170" height="80" rx="2" />
        <rect x="600" y="280" width="120" height="90" rx="2" />
        <rect x="430" y="540" width="140" height="100" rx="2" />
        <rect x="880" y="560" width="180" height="110" rx="2" />
        <rect x="1280" y="280" width="140" height="80" rx="2" />
        <rect x="170" y="370" width="90" height="60" rx="2" />
      </g>

      {/* District labels — typographic anchors */}
      <g
        fill="rgba(167,177,194,0.34)"
        fontFamily="var(--font-mono, monospace)"
        fontSize="10"
        letterSpacing="2.4"
      >
        <text x="120" y="120" textAnchor="start">EAST · 01</text>
        <text x="900" y="190" textAnchor="start">DOWNTOWN · 02</text>
        <text x="1340" y="160" textAnchor="start">NORTH LOOP · 03</text>
        <text x="500" y="700" textAnchor="start">RIVERSIDE · 04</text>
        <text x="1100" y="900" textAnchor="start">SOUTH · 05</text>
      </g>

      {/* Edge fade + vignette */}
      <rect x="0" y="0" width="1600" height="1000" fill="url(#map-fade)" />
      <rect x="0" y="0" width="1600" height="1000" fill="url(#map-vignette)" />
    </svg>
  );
}
