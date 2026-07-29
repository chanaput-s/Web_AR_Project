function KrathongIcon({ className = '', flameClassName = '' }) {
  const petals = Array.from({ length: 10 })

  return (
    <svg viewBox="0 0 120 100" className={className} aria-hidden="true">
      <ellipse cx="60" cy="78" rx="46" ry="10" fill="#2f5d3a" opacity="0.9" />
      <g>
        {petals.map((_, i) => {
          const angle = (i / petals.length) * Math.PI - Math.PI / 2
          const cx = 60 + Math.cos(angle) * 34
          const cy = 62 + Math.sin(angle) * 10
          return (
            <ellipse
              key={i}
              cx={cx}
              cy={cy}
              rx="16"
              ry="20"
              fill={i % 2 === 0 ? '#3f7d4c' : '#4f9a5e'}
              transform={`rotate(${(angle * 180) / Math.PI + 90} ${cx} ${cy})`}
            />
          )
        })}
        <ellipse cx="60" cy="58" rx="20" ry="16" fill="#5cae6a" />
      </g>
      <rect x="44" y="30" width="2.5" height="26" fill="#d9a066" />
      <rect x="50" y="26" width="2.5" height="30" fill="#d9a066" />
      <rect x="56" y="32" width="2.5" height="24" fill="#d9a066" />
      <circle cx="45.25" cy="28" r="2" fill="#e8664a" />
      <circle cx="51.25" cy="24" r="2" fill="#e8664a" />
      <circle cx="57.25" cy="30" r="2" fill="#e8664a" />
      <rect x="70" y="34" width="6" height="22" rx="1.5" fill="#f2c14e" />
      <path
        className={flameClassName}
        d="M73 20c4 4 4 9 0 12-4-3-4-8 0-12Z"
        fill="#ff9a3c"
      />
    </svg>
  )
}

export default KrathongIcon
