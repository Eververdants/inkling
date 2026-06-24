export function Convergence() {
  const cx = 200
  const cy = 200
  const r = 130
  const stages = [
    { angle: -90, label: 'PROBLEM' },
    { angle: -18, label: 'AUDIENCE' },
    { angle: 54, label: 'MVP' },
    { angle: 126, label: 'TECH' },
    { angle: 198, label: 'EDGE' },
  ]
  return (
    <svg
      viewBox="0 0 400 400"
      className="w-full h-full text-amber-400"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e6b35d" stopOpacity="1" />
          <stop offset="40%" stopColor="#d4a574" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#d4a574" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="line" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#d4a574" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#d4a574" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[r * 1.45, r * 1.05, r * 0.55].map((d, i) => (
        <circle key={i} cx={cx} cy={cy} r={d} stroke="currentColor" strokeOpacity={0.08 + i * 0.04} strokeDasharray={i === 2 ? '0' : '2 4'} />
      ))}
      {stages.map((s, i) => {
        const rad = (s.angle * Math.PI) / 180
        const x = cx + r * Math.cos(rad)
        const y = cy + r * Math.sin(rad)
        return (
          <line key={i} x1={x} y1={y} x2={cx} y2={cy} stroke="url(#line)" strokeWidth="1" strokeLinecap="round"
            style={{ strokeDasharray: 220, strokeDashoffset: 220, animation: `draw-line 1.6s var(--ease-soft) ${0.2 + i * 0.12}s forwards` }} />
        )
      })}
      <g style={{ animation: 'pulse-dot 3.6s ease-in-out infinite' }}>
        <circle cx={cx} cy={cy} r="48" fill="url(#core)" opacity="0.55" />
        <circle cx={cx} cy={cy} r="6" fill="#e6b35d" />
        <circle cx={cx} cy={cy} r="14" fill="none" stroke="#e6b35d" strokeOpacity="0.4" />
      </g>
      {stages.map((s, i) => {
        const rad = (s.angle * Math.PI) / 180
        const x = cx + r * Math.cos(rad)
        const y = cy + r * Math.sin(rad)
        const fromX = Math.cos(rad) * 90
        const fromY = Math.sin(rad) * 90
        return (
          <g key={i} style={{ animation: `convergence 1.4s var(--ease-soft) ${0.4 + i * 0.12}s both`, '--from-x': `${fromX}px`, '--from-y': `${fromY}px` }}>
            <circle cx={x} cy={y} r="22" fill="#0a0905" stroke="#d4a574" strokeOpacity="0.6" />
            <circle cx={x} cy={y} r="3" fill="#d4a574" />
            <text x={x} y={y + 38} textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="8.5" letterSpacing="1.4" fill="#857558">0{i + 1} · {s.label}</text>
          </g>
        )
      })}
      <text x="14" y="386" fontFamily="JetBrains Mono, monospace" fontSize="9" letterSpacing="1.5" fill="#5e5240">FIVE STAGES · ONE PROPOSAL</text>
    </svg>
  )
}
