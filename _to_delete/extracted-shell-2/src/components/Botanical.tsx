/** Hand-drawn-style botanical SVG decorations (server-safe). */

type P = { className?: string; strokeWidth?: number };

export function LeafMark({ className = "" }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M4 20C4 10 10 4 20 4c0 10-6 16-16 16Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M6 18C9 14 13 10 18 6"
        stroke="var(--color-offwhite)"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}

export function VineLine({ className = "", strokeWidth = 1.4 }: P) {
  return (
    <svg viewBox="0 0 320 60" fill="none" className={className} aria-hidden>
      <path
        d="M2 40 C 60 10, 120 55, 180 28 S 290 18, 318 34"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {[
        [50, 24, -30],
        [120, 44, 20],
        [190, 26, -24],
        [258, 24, 16],
      ].map(([x, y, r], i) => (
        <path
          key={i}
          d="M0 0 C 6 -9 15 -9 20 -1 C 15 6 6 6 0 0 Z"
          fill="currentColor"
          transform={`translate(${x} ${y}) rotate(${r})`}
        />
      ))}
    </svg>
  );
}

export function MonsteraLeaf({ className = "" }: P) {
  return (
    <svg viewBox="0 0 200 220" fill="none" className={className} aria-hidden>
      <path
        d="M100 210 C 30 170 20 70 100 20 C 180 70 170 170 100 210 Z"
        fill="currentColor"
      />
      <g
        stroke="var(--color-offwhite)"
        strokeOpacity="0.35"
        strokeWidth="6"
        strokeLinecap="round"
      >
        <path d="M100 196 L100 36" strokeOpacity="0.22" />
        <path d="M92 160 L52 138" />
        <path d="M92 122 L46 96" />
        <path d="M92 84 L60 62" />
        <path d="M108 160 L148 138" />
        <path d="M108 122 L154 96" />
        <path d="M108 84 L140 62" />
      </g>
    </svg>
  );
}

export function Frond({ className = "" }: P) {
  return (
    <svg viewBox="0 0 160 300" fill="none" className={className} aria-hidden>
      <path
        d="M80 296 C 76 200 78 100 84 8"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {[...Array(9)].map((_, i) => {
        const y = 30 + i * 28;
        const s = 1 - i * 0.06;
        return (
          <g key={i}>
            <path
              d={`M80 ${y} C ${80 - 46 * s} ${y - 16 * s} ${80 - 52 * s} ${y + 14 * s} 80 ${y + 6}`}
              fill="currentColor"
              opacity={0.85}
            />
            <path
              d={`M80 ${y} C ${80 + 46 * s} ${y - 16 * s} ${80 + 52 * s} ${y + 14 * s} 80 ${y + 6}`}
              fill="currentColor"
              opacity={0.7}
            />
          </g>
        );
      })}
    </svg>
  );
}

/** Corner leaves that grow in on scroll (targets .grow-leaf). */
export function GrowingCorner({ className = "", flip = false }: P & { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 220 220"
      fill="none"
      className={className}
      aria-hidden
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <path
        className="grow-vine"
        d="M8 212 C 30 150 60 100 120 62 C 150 44 180 34 212 30"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        pathLength={1}
      />
      {[
        [36, 160, -50, 1],
        [64, 118, -25, 0.9],
        [104, 78, -12, 0.85],
        [150, 50, 8, 0.7],
        [188, 36, 20, 0.55],
      ].map(([x, y, r, s], i) => (
        <path
          key={i}
          className="grow-leaf"
          d="M0 0 C 10 -16 28 -16 36 -2 C 28 12 10 12 0 0 Z"
          fill="currentColor"
          transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}
        />
      ))}
    </svg>
  );
}
