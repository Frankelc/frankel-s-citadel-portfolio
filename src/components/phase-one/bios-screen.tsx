const LINES = [
  "FG-BIOS 3.14  ·  Calavi Build  ·  REV 3.0",
  "Vérification mémoire .............. 8192K OK",
  "Contrôleur I2C / SPI .............. OK",
  "Détection des modules embarqués :",
  "  [U1]  IRIS ...................... trouvé",
  "  [U2]  MPME OS ................... trouvé",
  "  [U3]  SMART HAVEN ............... trouvé",
  "  [U4]  MOMO RELAY ................ trouvé",
  "Bras SMT pick-and-place ........... prêt",
  "Tous les systèmes opérationnels.",
  "Mise sous tension de la carte...",
];

export function BiosScreen({ visibleCount }: { visibleCount: number }) {
  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black px-5"
      role="status"
      aria-live="polite"
      aria-label="Séquence de démarrage BIOS"
    >
      <pre className="w-full max-w-2xl font-mono text-[11px] leading-6 text-led sm:text-sm sm:leading-7">
        {LINES.slice(0, visibleCount).map((line) => (
          <div key={line}>{line}</div>
        ))}
        {visibleCount < LINES.length ? <span className="bios-cursor">█</span> : null}
      </pre>
    </div>
  );
}

export const BIOS_LINE_COUNT = LINES.length;
