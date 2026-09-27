import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

export type SectionPartKind = "capacitor" | "qfp" | "relay" | "crystal" | "usbc";

const NAMES: Record<SectionPartKind, string> = {
  capacitor: "Condensateur électrolytique",
  qfp: "Circuit intégré QFP",
  relay: "Relais électromécanique",
  crystal: "Quartz HC-49",
  usbc: "Connecteur USB-C",
};

const CX = 100;
const CY = 190;

/**
 * Une pièce du composant, dessinée centrée sur (0, 0). Elle s'écarte verticalement de `dy`
 * quand --x passe de 0 à 1, et son étiquette apparaît à droite, reliée par un repère.
 */
function Piece({
  dy = 0,
  half,
  label,
  children,
}: {
  dy?: number;
  /** Demi-largeur de la pièce : le repère part de son bord droit. */
  half: number;
  label: string;
  children: ReactNode;
}) {
  return (
    <g className="explode-layer" style={{ "--shift": `${dy}px` } as CSSProperties}>
      <g transform={`translate(${CX} ${CY})`}>
        {children}
        <g className="explode-callout">
          <path d={`M${half + 6} 0 H84`} stroke="var(--silk)" strokeOpacity="0.45" />
          <circle cx={half + 6} cy="0" r="2.5" fill="var(--led)" />
          <text x="92" y="5" className="part-callout">
            {label}
          </text>
        </g>
      </g>
    </g>
  );
}

// Les pièces sont déclarées du dessous vers le dessus : la dernière recouvre les autres
// quand le composant est assemblé.

function Capacitor() {
  return (
    <>
      <Piece dy={118} half={70} label="Bouchon · pattes">
        <rect x="-70" y="-14" width="16" height="28" rx="3" fill="#2b2f33" />
        <path d="M-54 -7 H-86 M-54 7 H-78" stroke="#c5c9cc" strokeWidth="3" />
      </Piece>
      <Piece dy={40} half={60} label="Bobinage">
        <rect x="-60" y="-17" width="120" height="34" rx="4" fill="#b8a27a" />
        {Array.from({ length: 11 }, (_, i) => (
          <path key={i} d={`M${-54 + i * 11} -17 V17`} stroke="#8a7550" strokeWidth="2" />
        ))}
      </Piece>
      <Piece dy={-40} half={66} label="Boîtier alu">
        <rect x="-66" y="-20" width="132" height="40" rx="8" fill="#c5c9cc" stroke="#8a8f88" />
        <path d="M54 -12 V12 M46 0 H62" stroke="#8a8f88" strokeWidth="2" />
      </Piece>
      <Piece dy={-118} half={72} label="Gaine">
        <rect x="-72" y="-23" width="144" height="46" rx="10" fill="#1f3a6e" />
        <rect x="-72" y="12" width="144" height="11" fill="#c9d3e6" />
        {[-50, -20, 10, 40].map((x) => (
          <path key={x} d={`M${x} 17.5 h10`} stroke="#1f3a6e" strokeWidth="3" />
        ))}
      </Piece>
    </>
  );
}

function Qfp() {
  const pins = Array.from({ length: 7 }, (_, i) => -45 + i * 15);
  return (
    <>
      <Piece dy={122} half={74} label="Grille · broches">
        <rect
          x="-52"
          y="-52"
          width="104"
          height="104"
          fill="none"
          stroke="#C8893B"
          strokeWidth="2"
        />
        {pins.map((p) => (
          <g key={p} fill="#E0B070">
            <rect x={p - 3} y="-74" width="6" height="22" />
            <rect x={p - 3} y="52" width="6" height="22" />
            <rect x="-74" y={p - 3} width="22" height="6" />
            <rect x="52" y={p - 3} width="22" height="6" />
          </g>
        ))}
      </Piece>
      <Piece half={50} label="Puce · fils">
        {pins.map((p) => (
          <g key={p} stroke="#E0B070" strokeWidth="1.2" fill="none">
            <path d={`M${p} -50 L${p * 0.5} -24`} />
            <path d={`M${p} 50 L${p * 0.5} 24`} />
          </g>
        ))}
        <rect
          x="-24"
          y="-24"
          width="48"
          height="48"
          fill="#2b2f33"
          stroke="#C8893B"
          strokeWidth="2"
        />
        <rect x="-10" y="-10" width="20" height="20" fill="#4BE38A" fillOpacity="0.35" />
      </Piece>
      <Piece dy={-122} half={60} label="Capot">
        <rect
          x="-60"
          y="-60"
          width="120"
          height="120"
          rx="7"
          fill="#1A1D1B"
          stroke="#2f3531"
          strokeWidth="2"
        />
        <circle cx="-42" cy="-42" r="5" fill="#2f3531" />
        <text y="6" textAnchor="middle" className="part-marking">
          U3 · FGNL
        </text>
      </Piece>
    </>
  );
}

function Relay() {
  return (
    <>
      <Piece dy={124} half={66} label="Socle · broches">
        <rect x="-66" y="-10" width="132" height="18" rx="3" fill="#2b2f33" />
        {[-44, -18, 18, 44].map((x) => (
          <path key={x} d={`M${x} 8 V30`} stroke="#c5c9cc" strokeWidth="3" />
        ))}
      </Piece>
      <Piece dy={40} half={56} label="Bobine">
        <rect x="-56" y="-20" width="112" height="40" rx="8" fill="#b86b2c" />
        {Array.from({ length: 10 }, (_, i) => (
          <path key={i} d={`M${-48 + i * 10.5} -20 V20`} stroke="#8a4a18" strokeWidth="2" />
        ))}
      </Piece>
      <Piece dy={-42} half={60} label="Armature">
        <path d="M-60 12 H30 V-14" fill="none" stroke="#8a8f88" strokeWidth="8" />
        <path d="M40 16 V-18 M54 16 V-10" stroke="#c5c9cc" strokeWidth="4" />
        <circle cx="40" cy="-18" r="5" fill="#E0B070" />
        <circle cx="54" cy="-10" r="5" fill="#E0B070" />
      </Piece>
      <Piece dy={-124} half={70} label="Capot">
        <rect
          x="-70"
          y="-34"
          width="140"
          height="68"
          rx="6"
          fill="#4BE38A"
          fillOpacity="0.12"
          stroke="#E9EFE7"
          strokeOpacity="0.55"
        />
        <text y="5" textAnchor="middle" className="part-marking">
          K1 · 5V
        </text>
      </Piece>
    </>
  );
}

function Crystal() {
  return (
    <>
      <Piece dy={112} half={52} label="Embase">
        <rect x="-52" y="-9" width="104" height="18" rx="3" fill="#2b2f33" />
        <path d="M-22 9 V40 M22 9 V40" stroke="#c5c9cc" strokeWidth="3" />
      </Piece>
      <Piece half={40} label="Lame de quartz">
        <path d="M-22 44 V20 M22 44 V20" stroke="#8a8f88" strokeWidth="3" />
        <ellipse rx="40" ry="34" fill="#e9eef0" fillOpacity="0.9" />
        <ellipse rx="20" ry="17" fill="#c5c9cc" />
      </Piece>
      <Piece dy={-116} half={50} label="Boîtier">
        <path
          d="M-50 44 V-14 Q-50 -48 0 -48 Q50 -48 50 -14 V44 Z"
          fill="#c5c9cc"
          stroke="#8a8f88"
          strokeWidth="2"
        />
        <text y="6" textAnchor="middle" className="part-marking is-dark">
          16.000
        </text>
      </Piece>
    </>
  );
}

function UsbC() {
  return (
    <>
      <Piece dy={96} half={50} label="Pattes">
        {[-40, -20, 0, 20, 40].map((x) => (
          <path key={x} d={`M${x} -18 V18`} stroke="#E0B070" strokeWidth="4" />
        ))}
      </Piece>
      <Piece half={56} label="Languette">
        <rect x="-56" y="-12" width="112" height="24" rx="6" fill="#1A1D1B" />
        {Array.from({ length: 12 }, (_, i) => (
          <rect key={i} x={-50 + i * 8.5} y="-8" width="5" height="16" fill="#E0B070" />
        ))}
      </Piece>
      <Piece dy={-96} half={76} label="Blindage">
        <rect
          x="-76"
          y="-30"
          width="152"
          height="60"
          rx="30"
          fill="none"
          stroke="#c5c9cc"
          strokeWidth="10"
        />
      </Piece>
    </>
  );
}

const DRAWINGS: Record<SectionPartKind, () => ReactNode> = {
  capacitor: Capacitor,
  qfp: Qfp,
  relay: Relay,
  crystal: Crystal,
  usbc: UsbC,
};

/**
 * Un vrai composant qui se démonte au fil du défilement quand sa section entre à l'écran.
 * Purement décoratif : le contenu de la section reste lisible à tout moment.
 */
export function SectionPart({
  kind,
  className = "",
}: {
  kind: SectionPartKind;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const Drawing = DRAWINGS[kind];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--x", "1");
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const top = el.getBoundingClientRect().top;
      const vh = window.innerHeight;
      // 0 quand la pièce entre en bas de l'écran, 1 quand elle atteint le tiers supérieur.
      const progress = Math.min(1, Math.max(0, (vh * 0.92 - top) / (vh * 0.55)));
      el.style.setProperty("--x", progress.toFixed(3));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) window.addEventListener("scroll", onScroll, { passive: true });
      else window.removeEventListener("scroll", onScroll);
      update();
    });
    observer.observe(el);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className={`section-part ${className}`}>
      <svg
        viewBox="0 0 350 380"
        className="block h-auto w-full"
        role="img"
        aria-label={`${NAMES[kind]}, vue éclatée`}
      >
        <Drawing />
      </svg>
      <p
        className="mt-1 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-silk/45"
        aria-hidden="true"
      >
        {NAMES[kind]} · vue éclatée
      </p>
    </div>
  );
}
