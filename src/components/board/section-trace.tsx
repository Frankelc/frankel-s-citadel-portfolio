/**
 * Piste de cuivre verticale qui amène le courant d'une section à la suivante.
 * `reverse` fait remonter le courant vers les sections du dessus.
 */
export function SectionTrace({ refDes, reverse = false }: { refDes: string; reverse?: boolean }) {
  return (
    <div className={`section-trace ${reverse ? "is-reverse" : ""}`} aria-hidden="true">
      <svg viewBox="0 0 24 120" preserveAspectRatio="none" className="h-full w-6">
        <path d="M12 0 V120" stroke="var(--copper)" strokeWidth="4" fill="none" />
        <path
          className="trace-pulse"
          d="M12 0 V120"
          stroke="var(--led)"
          strokeWidth="2"
          fill="none"
        />
      </svg>
      <span className="section-trace-via" />
      <span className="font-mono text-[9px] tracking-[0.2em] text-silk/70">{refDes}</span>
    </div>
  );
}
