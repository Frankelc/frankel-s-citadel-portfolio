import { MascotFigure } from "@/components/board/mascot";
import { profile } from "@/data/profile";

type MotherboardProps = {
  powered: boolean;
  placed: boolean;
};

function Pins({
  x,
  y,
  w,
  h,
  count,
  gap = 10,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  count: number;
  gap?: number;
}) {
  const items = Array.from({ length: count }, (_, i) => i);
  const topY = y - 8;
  const botY = y + h;
  return (
    <g className="chip-pins" fill="#C8893B">
      {items.map((i) => {
        const px = x + 8 + i * gap;
        return (
          <g key={i}>
            <rect x={px} y={topY} width="4" height="8" />
            <rect x={px} y={botY} width="4" height="8" />
          </g>
        );
      })}
    </g>
  );
}

function Resistor({
  x,
  y,
  rotate = 0,
  refDes,
}: {
  x: number;
  y: number;
  rotate?: number;
  refDes: string;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
      <rect x="-22" y="-5" width="16" height="3" fill="#C8893B" />
      <rect x="6" y="-5" width="16" height="3" fill="#C8893B" />
      <rect x="-12" y="-8" width="24" height="10" rx="2" fill="#c4a574" />
      <rect x="-6" y="-8" width="3" height="10" fill="#6b3a12" />
      <rect x="-1" y="-8" width="3" height="10" fill="#1A1D1B" />
      <rect x="4" y="-8" width="3" height="10" fill="#9a1c1c" />
      <rect x="9" y="-8" width="2" height="10" fill="#c9a227" />
      <text x="0" y="-12" textAnchor="middle" className="silk-label">
        {refDes}
      </text>
    </g>
  );
}

function Cap({ x, y, refDes }: { x: number; y: number; refDes: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r="14" fill="#2a1a12" stroke="#C8893B" strokeWidth="1.5" />
      <circle r="9" fill="#1A1D1B" />
      <path d="M-3 -4 h6 M0 -7 v6" stroke="#E9EFE7" strokeWidth="1.4" />
      <text x="0" y="26" textAnchor="middle" className="silk-label">
        {refDes}
      </text>
    </g>
  );
}

function Led({
  id,
  x,
  y,
  color = "var(--led)",
}: {
  id: string;
  x: number;
  y: number;
  color?: string;
}) {
  return (
    <g transform={`translate(${x} ${y})`} className="board-led" data-led={id}>
      <circle r="7" fill="#0a1812" stroke="#E9EFE7" strokeWidth="0.8" />
      <circle className="led-core" r="4.5" fill={color} />
      <text x="0" y="18" textAnchor="middle" className="silk-label">
        {id}
      </text>
    </g>
  );
}

export function Motherboard({ powered, placed }: MotherboardProps) {
  return (
    <svg
      viewBox="0 0 1600 1000"
      className="h-full w-full"
      role="img"
      aria-labelledby="board-title board-desc"
    >
      <title id="board-title">Carte mère de Frankel Gnonlonfin, vue de dessus</title>
      <desc id="board-desc">
        Circuit imprimé vert avec pistes de cuivre, processeur central gravé au nom de Frankel, et
        composants électroniques.
      </desc>
      <defs>
        <filter id="pcb-grain" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" result="n" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="table" tableValues="0 0.18" />
          </feComponentTransfer>
          <feBlend in="SourceGraphic" mode="multiply" />
        </filter>
        <filter id="led-glow">
          <feGaussianBlur stdDeviation="3.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="copper-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E0B070" />
          <stop offset="100%" stopColor="#C8893B" />
        </linearGradient>
        <path id="bus-a" d="M120 180 H430 C460 180 470 210 500 240 L610 340" fill="none" />
        <path id="bus-b" d="M1480 220 H1180 C1140 220 1120 280 1080 330 L990 400" fill="none" />
        <path id="bus-c" d="M180 860 H520 C560 860 590 800 640 740 L720 660" fill="none" />
      </defs>

      <rect width="1600" height="1000" fill="#07180f" />
      <g filter="url(#pcb-grain)">
        <rect x="48" y="40" width="1504" height="920" rx="28" fill="#0E3B2C" />
        <rect x="70" y="62" width="1460" height="876" rx="18" fill="#17563F" opacity="0.28" />
      </g>

      <g fill="none" stroke="#0a2418" strokeWidth="1.2">
        {Array.from({ length: 18 }, (_, i) => (
          <path key={`g-${i}`} d={`M80 ${90 + i * 46} H1520`} opacity="0.18" />
        ))}
      </g>

      <circle cx="92" cy="84" r="14" fill="#07180f" stroke="#E9EFE7" strokeWidth="1.2" />
      <circle cx="1508" cy="84" r="14" fill="#07180f" stroke="#E9EFE7" strokeWidth="1.2" />
      <circle cx="92" cy="916" r="14" fill="#07180f" stroke="#E9EFE7" strokeWidth="1.2" />
      <circle cx="1508" cy="916" r="14" fill="#07180f" stroke="#E9EFE7" strokeWidth="1.2" />
      <circle cx="92" cy="84" r="6" fill="#C8893B" />
      <circle cx="1508" cy="84" r="6" fill="#C8893B" />
      <circle cx="92" cy="916" r="6" fill="#C8893B" />
      <circle cx="1508" cy="916" r="6" fill="#C8893B" />

      <text x="118" y="78" className="silk-brand">
        FRANKEL-GNONLONFIN REV 3.0
      </text>
      <text x="118" y="100" className="silk-label">
        PCB · CALAVI · L3 IFRI · EMBARQUÉ / IoT
      </text>

      <g className="copper-traces" stroke="url(#copper-grad)" fill="none" strokeLinecap="round">
        <path d="M120 180 H430 C460 180 470 210 500 240 L610 340" strokeWidth="7" />
        <path d="M140 210 H410 C440 210 455 230 485 255 L610 360" strokeWidth="3.5" />
        <path d="M1480 220 H1180 C1140 220 1120 280 1080 330 L990 400" strokeWidth="7" />
        <path d="M1460 250 H1200 C1160 250 1140 300 1100 345 L990 420" strokeWidth="3.5" />
        <path d="M180 860 H520 C560 860 590 800 640 740 L720 660" strokeWidth="6" />
        <path d="M200 830 H500 C540 830 570 780 620 730 L720 640" strokeWidth="3" />
        <path d="M980 660 C1040 720 1120 760 1280 780 H1460" strokeWidth="5" />
        <path d="M620 500 H180 V640" strokeWidth="4" />
        <path d="M980 500 H1360 V640" strokeWidth="4" />
        <path d="M800 340 V160 H1040 V220" strokeWidth="4" />
        <path d="M800 660 V820 H430" strokeWidth="4" />
      </g>

      <g
        className={`current-pulses ${powered ? "is-on" : ""}`}
        stroke="#4BE38A"
        fill="none"
        strokeLinecap="round"
        strokeWidth="2.2"
        opacity={powered ? 0.9 : 0}
      >
        <path className="pulse" d="M120 180 H430 C460 180 470 210 500 240 L610 340" />
        <path className="pulse" d="M1480 220 H1180 C1140 220 1120 280 1080 330 L990 400" />
        <path className="pulse" d="M180 860 H520 C560 860 590 800 640 740 L720 660" />
        <path className="pulse" d="M980 660 C1040 720 1120 760 1280 780 H1460" />
        <path className="pulse" d="M620 500 H180 V640" />
        <path className="pulse" d="M800 340 V160 H1040 V220" />
      </g>

      {Array.from({ length: 42 }, (_, i) => {
        const col = i % 7;
        const row = Math.floor(i / 7);
        return (
          <circle
            key={`via-${i}`}
            cx={220 + col * 180}
            cy={140 + row * 120}
            r="4.5"
            fill="#C8893B"
            stroke="#8a5a24"
            strokeWidth="1"
          />
        );
      })}

      <g className={`module-chip ${placed ? "is-placed" : ""}`} data-part="U12">
        <Pins x={132} y={148} w={132} h={72} count={8} gap={14} />
        <rect x="132" y="148" width="132" height="72" rx="3" fill="#1A1D1B" />
        <text x="198" y="178" textAnchor="middle" className="die-mark">
          U12
        </text>
        <text x="198" y="198" textAnchor="middle" className="die-sub">
          IRIS BUS
        </text>
      </g>
      <text x="198" y="140" textAnchor="middle" className="silk-label">
        U12
      </text>

      <g transform="translate(1260 150)">
        <Pins x={0} y={0} w={160} h={88} count={9} gap={16} />
        <rect width="160" height="88" rx="3" fill="#1A1D1B" />
        <text x="80" y="38" textAnchor="middle" className="die-mark">
          U8
        </text>
        <text x="80" y="58" textAnchor="middle" className="die-sub">
          RADIO / IoT
        </text>
      </g>
      <text x="1340" y="142" textAnchor="middle" className="silk-label">
        U8
      </text>

      <g className="cpu-package" transform="translate(620 340)">
        <rect
          x="-18"
          y="-18"
          width="396"
          height="356"
          fill="none"
          stroke="#E9EFE7"
          strokeWidth="1.1"
        />
        <text x="180" y="-24" textAnchor="middle" className="silk-label">
          U1 · PROCESSOR
        </text>
        {Array.from({ length: 18 }, (_, i) => (
          <g key={`cpu-pin-${i}`} fill="#C8893B">
            <rect x={8 + i * 20} y="-12" width="7" height="12" />
            <rect x={8 + i * 20} y="320" width="7" height="12" />
            <rect x="-12" y={8 + i * 16} width="12" height="7" />
            <rect x="360" y={8 + i * 16} width="12" height="7" />
          </g>
        ))}
        <rect width="360" height="320" rx="6" fill="#1A1D1B" />
        <rect x="14" y="14" width="332" height="292" rx="3" fill="#141714" stroke="#2a302c" />
        <text x="180" y="78" textAnchor="middle" className="cpu-mark-sm">
          FGNL · 2026
        </text>
        <text x="180" y="132" textAnchor="middle" className="cpu-mark">
          FRANKEL
        </text>
        <text x="180" y="178" textAnchor="middle" className="cpu-mark">
          GNONLONFIN
        </text>
        <text x="180" y="226" textAnchor="middle" className="cpu-tagline">
          du serveur jusqu’au silicium
        </text>
        <text x="180" y="252" textAnchor="middle" className="cpu-tagline">
          des API web aux microcontrôleurs
        </text>
        <text x="180" y="286" textAnchor="middle" className="die-sub">
          L3 IFRI · EMBEDDED / IoT
        </text>
      </g>

      <g className={`module-chip ${placed ? "is-placed" : ""}`} data-part="XTAL">
        <g transform="translate(1188 708)">
          <ellipse rx="36" ry="18" fill="#c5c1b7" stroke="#8a8680" />
          <rect x="-8" y="-6" width="16" height="12" fill="#9a9790" />
          <text x="0" y="36" textAnchor="middle" className="silk-label">
            Y1 16MHz
          </text>
        </g>
      </g>

      <g className={`module-chip ${placed ? "is-placed" : ""}`} data-part="C4">
        <Cap x={1320} y={430} refDes="C4" />
        <Cap x={1364} y={430} refDes="C5" />
        <Cap x={1408} y={430} refDes="C6" />
      </g>

      <Resistor x={250} y={430} refDes="R12" />
      <Resistor x={330} y={430} refDes="R13" />
      <Resistor x={250} y={490} rotate={90} refDes="R18" />
      <Resistor x={430} y={820} refDes="R22" />
      <Resistor x={520} y={820} refDes="R23" />

      <g transform="translate(160 620)">
        <rect width="220" height="86" rx="4" fill="#1A1D1B" />
        {Array.from({ length: 12 }, (_, i) => (
          <rect key={i} x={10 + i * 17} y="86" width="8" height="16" fill="#C8893B" />
        ))}
        <text x="110" y="38" textAnchor="middle" className="die-mark">
          J3 UART
        </text>
        <text x="110" y="58" textAnchor="middle" className="die-sub">
          PORT COM
        </text>
      </g>

      <g transform="translate(1240 820)">
        {Array.from({ length: 18 }, (_, i) => (
          <rect
            key={i}
            x={i * 12}
            y="0"
            width="8"
            height="46"
            rx="1"
            fill="#E0B070"
            stroke="#8a5a24"
          />
        ))}
        <text x="108" y="-10" textAnchor="middle" className="silk-label">
          EDGE · PWR
        </text>
      </g>

      <Led id="D1" x={210} y={740} />
      <Led id="D2" x={250} y={740} />
      <Led id="PWR" x={148} y={280} />
      <Led id="RUN" x={148} y={320} color="#4BE38A" />
      <Led id="ERR" x={148} y={360} color="#E5484D" />

      <AvatarPad />

      <MascotFigure x={1440} y={540} />

      <g className={`binary-layer ${powered ? "is-on" : ""}`} fill="#4BE38A">
        <text>
          <textPath href="#bus-a" className="binary-text">
            01001001 01010010 01001001 01010011 00100000 01001100 01001110
          </textPath>
        </text>
        <text>
          <textPath href="#bus-b" className="binary-text">
            01001101 01010000 01001101 01000101 00100000 01001111 01010011
          </textPath>
        </text>
        <text>
          <textPath href="#bus-c" className="binary-text">
            01010011 01001101 01000001 01010010 01010100 00100000 01001000 01010110
          </textPath>
        </text>
      </g>

      <PickAndPlaceArm />
    </svg>
  );
}

function PickAndPlaceArm() {
  return (
    <g id="smt-arm" className="smt-arm" aria-hidden="true">
      <rect
        x="70"
        y="52"
        width="1460"
        height="10"
        fill="#2a312c"
        stroke="#E9EFE7"
        strokeWidth="0.6"
      />
      <rect x="70" y="52" width="16" height="40" fill="#1A1D1B" />
      <rect x="1514" y="52" width="16" height="40" fill="#1A1D1B" />
      <g transform="translate(800 52)">
        <g id="arm-carriage">
          <rect x="-22" y="-6" width="44" height="22" rx="2" fill="#1A1D1B" stroke="#E0B070" />
          <rect id="arm-beam" x="-5" y="16" width="10" height="120" fill="#C8893B" />
          <g transform="translate(0 136)">
            <g id="arm-head">
              <rect x="-18" y="0" width="36" height="28" rx="3" fill="#1A1D1B" />
              <rect x="-6" y="28" width="12" height="26" fill="#8a8f88" />
              <circle cx="0" cy="58" r="7" fill="#4a504c" stroke="#E0B070" />
              <g id="held-part" opacity="0">
                <rect
                  x="-16"
                  y="62"
                  width="32"
                  height="18"
                  rx="1"
                  fill="#1A1D1B"
                  stroke="#C8893B"
                />
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  );
}

function AvatarPad() {
  return (
    <g className="avatar-pad" transform="translate(118 430)">
      <rect
        width="132"
        height="158"
        rx="6"
        fill="#0a2418"
        stroke="#E9EFE7"
        strokeDasharray={profile.avatar ? undefined : "4 3"}
        strokeWidth="1.2"
      />
      {profile.avatar ? (
        <>
          <clipPath id="avatar-clip">
            <rect x="10" y="10" width="112" height="112" rx="4" />
          </clipPath>
          <image
            href={profile.avatar}
            x="10"
            y="10"
            width="112"
            height="112"
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#avatar-clip)"
          >
            <title>{profile.avatarAlt}</title>
          </image>
        </>
      ) : (
        <g aria-hidden="true">
          <rect x="18" y="18" width="96" height="96" rx="48" fill="#1A1D1B" />
          <circle cx="48" cy="58" r="5" className="mascot-eye" fill="#4BE38A" />
          <circle cx="84" cy="58" r="5" className="mascot-eye" fill="#4BE38A" />
          <rect x="44" y="78" width="44" height="6" rx="2" fill="#C8893B" />
        </g>
      )}
      <text x="66" y="138" textAnchor="middle" className="silk-label">
        J1 AVATAR
      </text>
      {profile.avatar ? null : (
        <text x="66" y="152" textAnchor="middle" className="silk-label">
          image à fournir
        </text>
      )}
    </g>
  );
}
