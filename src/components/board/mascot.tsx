/** BOT-01 : robot original assemblé à partir de composants (servos, capteur, puce DIP). */
export function MascotFigure({
  x,
  y,
  waving = false,
}: {
  x: number;
  y: number;
  /** Le bras droit fait signe (survol des boutons du port COM). */
  waving?: boolean;
}) {
  return (
    <g
      className={`mascot ${waving ? "is-waving" : ""}`}
      transform={`translate(${x} ${y})`}
      aria-hidden="true"
    >
      {/* Antenne avec LED d'état */}
      <path d="M0 -44 V-30" stroke="#E0B070" strokeWidth="2" />
      <circle cy="-47" r="4" className="led-core" fill="#E5484D" />
      {/* Tête : capteur ultrason, deux transducteurs servent d'yeux */}
      <rect
        x="-30"
        y="-30"
        width="60"
        height="30"
        rx="3"
        fill="#17563F"
        stroke="#E9EFE7"
        strokeWidth="0.8"
      />
      <circle cx="-14" cy="-15" r="11" fill="#c5c1b7" stroke="#8a8680" />
      <circle cx="14" cy="-15" r="11" fill="#c5c1b7" stroke="#8a8680" />
      <circle cx="-14" cy="-15" r="5" className="mascot-eye" fill="#4BE38A" />
      <circle cx="14" cy="-15" r="5" className="mascot-eye" fill="#4BE38A" />
      {/* Cou : broches */}
      <rect x="-6" y="0" width="4" height="8" fill="#C8893B" />
      <rect x="2" y="0" width="4" height="8" fill="#C8893B" />
      {/* Corps : puce DIP */}
      <rect x="-26" y="8" width="52" height="44" rx="3" fill="#1A1D1B" />
      <circle cx="-18" cy="16" r="2.5" fill="#2a302c" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i} fill="#C8893B">
          <rect x="-31" y={14 + i * 10} width="5" height="4" />
          <rect x="26" y={14 + i * 10} width="5" height="4" />
        </g>
      ))}
      <text x="0" y="36" textAnchor="middle" className="die-sub">
        B01
      </text>
      {/* Épaules : servomoteurs, bras en fil de cuivre */}
      <g className="mascot-arm-left">
        <rect x="-50" y="10" width="16" height="22" rx="2" fill="#2f4b8a" />
        <circle cx="-42" cy="16" r="4" fill="#E9EFE7" />
        <path
          d="M-42 16 L-58 38 L-52 54"
          fill="none"
          stroke="#E0B070"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
      <g className="mascot-arm-right">
        <rect x="34" y="10" width="16" height="22" rx="2" fill="#2f4b8a" />
        <circle cx="42" cy="16" r="4" fill="#E9EFE7" />
        <path
          d="M42 16 L58 38 L52 54"
          fill="none"
          stroke="#E0B070"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
      {/* Roues */}
      <circle cx="-16" cy="60" r="9" fill="#1A1D1B" stroke="#8a8f88" strokeWidth="2" />
      <circle cx="16" cy="60" r="9" fill="#1A1D1B" stroke="#8a8f88" strokeWidth="2" />
      <text x="0" y="86" textAnchor="middle" className="silk-label">
        BOT-01
      </text>
    </g>
  );
}
