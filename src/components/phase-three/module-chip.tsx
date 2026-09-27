import { CATEGORIES, type Project } from "@/data/projects";

const PIN_COUNT = 7;

/** Un projet mis en avant, dessiné comme une puce montée sur la carte. */
export function ModuleChip({
  project,
  refDes,
  linked,
  onOpen,
}: {
  project: Project;
  refDes: string;
  /** null : aucune compétence sous tension. true/false : relié ou non à celle-ci. */
  linked: boolean | null;
  onOpen: () => void;
}) {
  const state = linked === null ? "" : linked ? "is-linked" : "is-unlinked";
  return (
    <div className={`module-slot ${state}`}>
      <span className="module-trace" aria-hidden="true" />
      <p className="mb-2 font-mono text-[10px] tracking-[0.2em] text-silk/70" aria-hidden="true">
        {refDes}
      </p>
      <button
        type="button"
        onClick={onOpen}
        className="module-chip-button group"
        aria-haspopup="dialog"
        aria-label={`${project.title} · module ${refDes} · ouvrir la datasheet`}
      >
        <span className="module-pins is-top" aria-hidden="true">
          {Array.from({ length: PIN_COUNT }, (_, i) => (
            <span key={i} style={{ transitionDelay: `${i * 35}ms` }} />
          ))}
        </span>
        <span className="module-body">
          <span className="module-dot" aria-hidden="true" />
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-copper">
            {CATEGORIES[project.category]}
          </span>
          <span className="mt-auto font-display text-lg font-semibold leading-tight text-silk sm:text-xl">
            {project.title}
          </span>
          <span className="mt-1 line-clamp-2 text-xs leading-snug text-silk/65">
            {project.description}
          </span>
          <span className="mt-3 font-mono text-[9px] uppercase tracking-[0.2em] text-led opacity-70 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
            Ouvrir la datasheet →
          </span>
        </span>
        <span className="module-pins is-bottom" aria-hidden="true">
          {Array.from({ length: PIN_COUNT }, (_, i) => (
            <span key={i} style={{ transitionDelay: `${i * 35}ms` }} />
          ))}
        </span>
      </button>
    </div>
  );
}
