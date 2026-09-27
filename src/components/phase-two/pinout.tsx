import type { CSSProperties } from "react";

import { datasheet } from "@/data/profile";

const PIN_GAP = 34;
const BODY_X = 150;
const BODY_W = 120;
const TOP = 30;

/** Brochage DIP-16, vue de dessus. Broches 1 à 8 à gauche, 9 à 16 à droite en remontant. */
export function Pinout() {
  const pins = datasheet.pins;
  const half = pins.length / 2;
  const bodyH = half * PIN_GAP + 10;
  const cx = BODY_X + BODY_W / 2;
  const cy = TOP + bodyH / 2;

  return (
    <svg
      viewBox={`0 0 420 ${bodyH + TOP * 2}`}
      className="h-auto w-full"
      role="img"
      aria-labelledby="pinout-title"
    >
      <title id="pinout-title">{`Brochage DIP-16 du composant ${datasheet.reference}, détaillé dans la description des broches.`}</title>
      <rect
        x={BODY_X}
        y={TOP}
        width={BODY_W}
        height={bodyH}
        rx="6"
        fill="var(--die)"
        stroke="var(--silk)"
        strokeOpacity="0.25"
      />
      {/* Encoche d'orientation et repère de la broche 1 */}
      <path
        d={`M${cx - 14} ${TOP} a14 14 0 0 0 28 0`}
        fill="var(--pcb)"
        stroke="var(--silk)"
        strokeOpacity="0.25"
      />
      <circle cx={BODY_X + 16} cy={TOP + 12} r="4" fill="var(--silk)" opacity="0.35" />
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        className="pinout-body-label"
        transform={`rotate(-90 ${cx} ${cy})`}
      >
        {datasheet.reference}
      </text>

      {pins.map((pin, i) => {
        const left = i < half;
        const row = left ? i : pins.length - 1 - i;
        const y = TOP + 24 + row * PIN_GAP;
        const padX = left ? BODY_X - 22 : BODY_X + BODY_W;
        return (
          <g key={pin.name} className="pinout-pin" style={{ "--pin": i } as CSSProperties}>
            <rect x={padX} y={y - 5} width="22" height="10" rx="1" className="pinout-pad" />
            <text
              x={left ? BODY_X + 10 : BODY_X + BODY_W - 10}
              y={y + 3}
              textAnchor={left ? "start" : "end"}
              className="pinout-num"
            >
              {i + 1}
            </text>
            <text
              x={left ? padX - 8 : padX + 30}
              y={y + 4}
              textAnchor={left ? "end" : "start"}
              className="pinout-name"
            >
              {pin.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
