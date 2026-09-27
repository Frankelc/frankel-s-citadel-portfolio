import { events, type TestEvent } from "@/data/events";

const W = 1000;
const H = 340;
const X0 = 60;
const X1 = 960;
const PULSE = 46;
const CHANNELS = {
  hackathon: { label: "CH1 · HACKATHONS", low: 150, high: 80, color: "var(--led)" },
  ctf: { label: "CH2 · CTF", low: 290, high: 220, color: "var(--copper-light)" },
} as const;

/** Abscisse de chaque impulsion, réparties à intervalle régulier (le journal n'a pas de dates). */
const pulseX = (index: number) =>
  X0 + 60 + (index * (X1 - X0 - 120)) / Math.max(events.length - 1, 1);

function tracePath(kind: TestEvent["kind"]) {
  const { low, high } = CHANNELS[kind];
  let d = `M${X0} ${low}`;
  events.forEach((event, index) => {
    if (event.kind !== kind) return;
    const x = pulseX(index);
    d += ` H${x - PULSE / 2} V${high} H${x + PULSE / 2} V${low}`;
  });
  return `${d} H${X1}`;
}

/** Écran de l'analyseur logique. Les impulsions cliquables sont des boutons HTML superposés. */
export function Scope({
  selected,
  onSelect,
}: {
  selected: number;
  onSelect: (index: number) => void;
}) {
  const selectedEvent = events[selected];
  const cursorX = pulseX(selected);

  return (
    <div className="scope-screen relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" aria-hidden="true">
        {/* Graticule : 10 × 6 divisions */}
        <g stroke="var(--led)" strokeOpacity="0.1" strokeWidth="1">
          {Array.from({ length: 11 }, (_, i) => (
            <path key={`v${i}`} d={`M${X0 + (i * (X1 - X0)) / 10} 30 V${H - 20}`} />
          ))}
          {Array.from({ length: 7 }, (_, i) => (
            <path key={`h${i}`} d={`M${X0} ${30 + (i * (H - 50)) / 6} H${X1}`} />
          ))}
        </g>

        {(Object.keys(CHANNELS) as TestEvent["kind"][]).map((kind) => {
          const channel = CHANNELS[kind];
          return (
            <g key={kind}>
              <text x={X0} y={channel.high - 18} className="scope-label" fill={channel.color}>
                {channel.label}
              </text>
              <path
                d={tracePath(kind)}
                fill="none"
                stroke={channel.color}
                strokeWidth="3"
                strokeLinejoin="round"
                className="scope-trace"
                pathLength={1}
              />
            </g>
          );
        })}

        {/* Curseur de mesure sur l'impulsion sélectionnée */}
        <g className="scope-cursor" style={{ transform: `translateX(${cursorX}px)` }}>
          <path
            d={`M0 36 V${H - 26}`}
            stroke="var(--silk)"
            strokeDasharray="4 5"
            strokeOpacity="0.7"
          />
          <path d="M-7 30 H7 L0 40 Z" fill="var(--silk)" />
        </g>

        {events.map((event, index) => (
          <text
            key={event.id}
            x={pulseX(index)}
            y={H - 4}
            textAnchor="middle"
            className="scope-label"
            fill="var(--silk)"
            fillOpacity={index === selected ? 1 : 0.45}
          >
            T{index + 1}
          </text>
        ))}

        <rect className="scope-sweep" x={X0} y="30" width="3" height={H - 50} fill="var(--led)" />
      </svg>

      {events.map((event, index) => {
        const channel = CHANNELS[event.kind];
        return (
          <button
            key={event.id}
            type="button"
            className="scope-hit"
            aria-pressed={index === selected}
            aria-label={`T${index + 1} · ${event.name}`}
            onClick={() => onSelect(index)}
            onMouseEnter={() => onSelect(index)}
            style={{
              left: `${(pulseX(index) / W) * 100}%`,
              top: `${((channel.high - 10) / H) * 100}%`,
              height: `${((channel.low - channel.high + 20) / H) * 100}%`,
              width: `${((PULSE + 24) / W) * 100}%`,
            }}
          />
        );
      })}

      <p className="sr-only" aria-live="polite">
        {selectedEvent ? `Mesure T${selected + 1} : ${selectedEvent.name}` : ""}
      </p>
    </div>
  );
}
