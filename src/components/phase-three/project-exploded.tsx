import type { CSSProperties, ReactNode } from "react";

import { projectRefs, type Project } from "@/data/projects";
import { partKind, PART_KIND_LABELS, type PartKind } from "@/lib/tech-kinds";

const CX = 350;
const CY = 232;
const BOARD = 230;
const PACKAGE = 190;
// Projection isométrique d'un plan à plat (u, v) vers l'écran.
const ISO = "matrix(0.866 0.5 -0.866 0.5 0 0)";

/**
 * Une couche : dessin à plat projeté en isométrie, décalé verticalement selon --x.
 * Les annotations alternent à gauche et à droite pour garder la puce au centre du cadre.
 */
function Layer({
  shift,
  size,
  side,
  label,
  detail,
  children,
}: {
  shift: number;
  size: number;
  side: "left" | "right";
  label: string;
  detail: string;
  children: ReactNode;
}) {
  // Coins gauche et droit du plan isométrique : (±h, ∓h) projeté donne x = ±1,732 h.
  const dir = side === "left" ? -1 : 1;
  const cornerX = CX + dir * 1.732 * size;
  const anchor = side === "left" ? "end" : "start";
  return (
    <g className="explode-layer" style={{ "--shift": `${shift}px` } as CSSProperties}>
      <g transform={`translate(${CX} ${CY}) ${ISO}`}>{children}</g>
      <g className="explode-callout">
        <path
          d={`M${cornerX + dir * 6} ${CY} H${cornerX + dir * 30}`}
          stroke="var(--silk)"
          strokeOpacity="0.5"
        />
        <circle cx={cornerX + dir * 4} cy={CY} r="2.5" fill="var(--led)" />
        <text x={cornerX + dir * 36} y={CY - 3} textAnchor={anchor} className="explode-label">
          {label}
        </text>
        <text x={cornerX + dir * 36} y={CY + 13} textAnchor={anchor} className="explode-detail">
          {detail}
        </text>
      </g>
    </g>
  );
}

function Pins({ size, count, gap }: { size: number; count: number; gap: number }) {
  const half = size / 2;
  const start = -((count - 1) * gap) / 2;
  return (
    <g fill="#E0B070">
      {Array.from({ length: count }, (_, i) => {
        const p = start + i * gap;
        return (
          <g key={i}>
            <rect x={p - 3} y={-half - 14} width="6" height="14" />
            <rect x={p - 3} y={half} width="6" height="14" />
            <rect x={-half - 14} y={p - 3} width="14" height="6" />
            <rect x={half} y={p - 3} width="14" height="6" />
          </g>
        );
      })}
    </g>
  );
}

/** Dessin à plat d'un sous-composant selon son type, centré sur (0, 0). */
function SubPart({ kind }: { kind: PartKind }) {
  switch (kind) {
    case "mem":
      return (
        <g>
          <rect x="-24" y="-11" width="48" height="22" rx="2" fill="#1A1D1B" />
          {[-18, -9, 0, 9, 18].map((x) => (
            <g key={x} fill="#E0B070">
              <rect x={x - 2} y="-15" width="4" height="4" />
              <rect x={x - 2} y="11" width="4" height="4" />
            </g>
          ))}
        </g>
      );
    case "disp":
      return (
        <g>
          <rect x="-24" y="-6" width="48" height="16" fill="#d9c9a0" />
          <rect x="-26" y="-12" width="52" height="8" rx="1" fill="#1A1D1B" />
        </g>
      );
    case "rf":
      return (
        <rect
          x="-20"
          y="-15"
          width="40"
          height="30"
          rx="2"
          fill="#b9bdb8"
          stroke="#8a8f88"
          strokeDasharray="3 2"
        />
      );
    case "mcu":
      return (
        <g>
          <rect x="-22" y="-16" width="44" height="32" rx="2" fill="#2f4b8a" />
          <path d="M-18 -12 h8 v6 h8 v-6 h8 v6 h8" fill="none" stroke="#E0B070" strokeWidth="2" />
          <rect x="-10" y="-2" width="20" height="14" fill="#1A1D1B" />
        </g>
      );
    case "sec":
      return (
        <g>
          <rect x="-13" y="-13" width="26" height="26" rx="2" fill="#1A1D1B" />
          <circle r="6" fill="none" stroke="#E0B070" strokeWidth="2" />
          <rect x="-2" y="-2" width="4" height="7" fill="#E0B070" />
        </g>
      );
    case "pwr":
      return (
        <g>
          <rect x="-22" y="-10" width="22" height="20" fill="#1A1D1B" />
          <circle cx="12" r="10" fill="#2a1a12" stroke="#E0B070" strokeWidth="1.5" />
        </g>
      );
    case "osc":
      return <ellipse rx="20" ry="10" fill="#c5c1b7" stroke="#8a8680" />;
    case "gpu":
      return (
        <g>
          <rect x="-20" y="-20" width="40" height="40" rx="3" fill="#1A1D1B" />
          <rect x="-12" y="-12" width="24" height="24" fill="#3a3f3c" />
        </g>
      );
    case "io":
      return (
        <g>
          <rect x="-22" y="-9" width="44" height="18" rx="2" fill="#8a8f88" />
          {[-15, -7, 1, 9].map((x) => (
            <rect key={x} x={x} y="-4" width="5" height="8" fill="#E0B070" />
          ))}
        </g>
      );
    case "cpu":
      return (
        <g>
          <rect x="-17" y="-17" width="34" height="34" rx="2" fill="#1A1D1B" />
          {[-10, 0, 10].map((p) => (
            <g key={p} fill="#E0B070">
              <rect x={p - 2} y="-21" width="4" height="4" />
              <rect x={p - 2} y="17" width="4" height="4" />
              <rect x="-21" y={p - 2} width="4" height="4" />
              <rect x="17" y={p - 2} width="4" height="4" />
            </g>
          ))}
        </g>
      );
    default:
      return (
        <g>
          <rect x="-16" y="-10" width="32" height="20" rx="2" fill="#1A1D1B" />
          {[-10, -3, 4, 11].map((x) => (
            <g key={x} fill="#E0B070">
              <rect x={x - 2} y="-14" width="3" height="4" />
              <rect x={x - 2} y="10" width="3" height="4" />
            </g>
          ))}
        </g>
      );
  }
}

/** Positions des sous-composants sur la mini-carte (grille autour du centre). */
function slots(count: number) {
  const cols = count <= 4 ? 2 : 3;
  const rows = Math.ceil(count / cols);
  const gapX = 150 / Math.max(cols - 1, 1);
  const gapY = rows > 1 ? 150 / (rows - 1) : 0;
  return Array.from({ length: count }, (_, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    return { x: cols > 1 ? -75 + col * gapX : 0, y: rows > 1 ? -75 + row * gapY : 0 };
  });
}

/**
 * Vue éclatée d'un projet : capot, puce, fils de liaison et mini-carte dont chaque
 * technologie est un vrai composant. `open` écarte les couches (transition sur --x).
 */
export function ProjectExploded({ project, open }: { project: Project; open: boolean }) {
  const parts = project.stack.slice(0, 9).map((tech) => ({ tech, kind: partKind(tech) }));
  const positions = slots(parts.length);
  const ref = projectRefs[project.id] ?? "";

  return (
    <div className={`explode ${open ? "is-open" : ""}`}>
      <svg
        viewBox="0 0 700 470"
        className="mx-auto block h-auto max-h-[min(46vh,28rem)] w-full"
        role="img"
        aria-label={`Vue éclatée de ${project.title} : ${
          parts.length ? parts.map((part) => part.tech).join(", ") : "architecture non détaillée"
        }`}
      >
        {/* Carte : chaque techno est un composant relié au bus central */}
        <Layer
          shift={106}
          size={BOARD / 2}
          side="right"
          label="Carte"
          detail={
            parts.length ? `${parts.length} composant${parts.length > 1 ? "s" : ""}` : "non peuplée"
          }
        >
          <rect
            x={-BOARD / 2}
            y={-BOARD / 2}
            width={BOARD}
            height={BOARD}
            rx="8"
            fill="#0E3B2C"
            stroke="#17563F"
            strokeWidth="3"
          />
          {positions.map((pos, i) => (
            <path key={`t${i}`} d={`M0 0 L${pos.x} ${pos.y}`} stroke="#C8893B" strokeWidth="3" />
          ))}
          <circle r="7" fill="#C8893B" />
          {parts.map((part, i) => {
            const pos = positions[i];
            if (!pos) return null;
            return (
              <g key={part.tech} transform={`translate(${pos.x} ${pos.y})`}>
                <SubPart kind={part.kind} />
                <text y="30" textAnchor="middle" className="explode-part-label">
                  {part.tech}
                </text>
              </g>
            );
          })}
          {!parts.length ? (
            <text textAnchor="middle" y="40" className="explode-part-label">
              DNP · composants à renseigner
            </text>
          ) : null}
          {/* Broches du boîtier : les liens du projet */}
          <Pins size={BOARD} count={9} gap={22} />
        </Layer>

        {/* Fils de liaison : le contexte relie la puce au monde extérieur */}
        <Layer shift={34} size={PACKAGE / 2} side="left" label="Fils" detail="contexte">
          {Array.from({ length: 12 }, (_, i) => {
            const angle = (i / 12) * Math.PI * 2;
            const x1 = Math.cos(angle) * 40;
            const y1 = Math.sin(angle) * 40;
            const x2 = Math.cos(angle) * 88;
            const y2 = Math.sin(angle) * 88;
            return (
              <path
                key={i}
                d={`M${x1} ${y1} Q${(x1 + x2) / 2 + 8} ${(y1 + y2) / 2 - 8} ${x2} ${y2}`}
                fill="none"
                stroke="#E0B070"
                strokeWidth="1.6"
              />
            );
          })}
        </Layer>

        {/* Puce de silicium : le cœur du projet */}
        <Layer shift={-40} size={55} side="right" label="Puce" detail="objectif · réalisation">
          <rect
            x="-50"
            y="-50"
            width="100"
            height="100"
            fill="#2b2f33"
            stroke="#C8893B"
            strokeWidth="2"
          />
          <g stroke="#C8893B" strokeOpacity="0.45">
            {[-30, -10, 10, 30].map((p) => (
              <g key={p}>
                <path d={`M${p} -46 V46`} />
                <path d={`M-46 ${p} H46`} />
              </g>
            ))}
          </g>
          <rect x="-16" y="-16" width="32" height="32" fill="#4BE38A" fillOpacity="0.25" />
        </Layer>

        {/* Capot : le marquage du composant */}
        <Layer
          shift={-110}
          size={PACKAGE / 2}
          side="left"
          label="Capot"
          detail={`${ref} · marquage`}
        >
          <rect
            x={-PACKAGE / 2}
            y={-PACKAGE / 2}
            width={PACKAGE}
            height={PACKAGE}
            rx="10"
            fill="#1A1D1B"
            stroke="#2f3531"
            strokeWidth="2"
          />
          <circle cx={-PACKAGE / 2 + 20} cy={-PACKAGE / 2 + 20} r="6" fill="#2f3531" />
          <text x="0" y="-6" textAnchor="middle" className="explode-cap-title">
            {project.title.length > 16 ? `${project.title.slice(0, 15)}…` : project.title}
          </text>
          <text x="0" y="18" textAnchor="middle" className="explode-cap-ref">
            {ref} · FGNL
          </text>
        </Layer>
      </svg>

      {parts.length ? (
        <ul className="mt-2 flex flex-wrap gap-1.5" aria-label="Composants de la carte">
          {parts.map((part) => (
            <li key={part.tech} className="pcb-badge">
              {part.tech} · {PART_KIND_LABELS[part.kind]}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
