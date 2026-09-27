import { ArrowUp, X } from "lucide-react";

import { useCircuit, type LiveSkill } from "@/lib/circuit";
import { SectionTrace } from "@/components/board/section-trace";
import { projectById, projectRefs } from "@/data/projects";
import { skillZones, type Skill, type SkillZone } from "@/data/skills";
import { useReveal } from "@/hooks/use-reveal";

const skillRef = (zone: SkillZone, index: number) => `${zone.prefix}${index + 1}`;

// Index de chaque compétence par identifiant, pour retrouver sa note dans la sonde.
const SKILLS = new Map<string, { skill: Skill; ref: string; zone: SkillZone }>(
  skillZones.flatMap((zone) =>
    zone.skills.map((skill, index) => [skill.id, { skill, ref: skillRef(zone, index), zone }]),
  ),
);

function toLive(skill: Skill, ref: string): LiveSkill {
  return { id: skill.id, name: skill.name, ref, projectIds: new Set(skill.projects) };
}

function SkillPart({ skill, refDes }: { skill: Skill; refDes: string }) {
  const { liveSkill, setLiveSkill } = useCircuit();
  const active = liveSkill?.id === skill.id;
  const count = skill.projects.length;

  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={() => setLiveSkill(active ? null : toLive(skill, refDes))}
      className={`skill-part ${count ? "" : "is-empty"}`}
      aria-label={`${skill.name}, ${refDes}, ${
        count
          ? `${count} projet${count > 1 ? "s" : ""} relié${count > 1 ? "s" : ""}`
          : "aucun projet relié"
      }`}
    >
      <span className="skill-cap" aria-hidden="true" />
      <span className="skill-body">
        <span className="skill-led" aria-hidden="true" />
        <span className="font-mono text-[10px] text-silk/50">{refDes}</span>
        <span className="text-[13px] leading-tight text-silk">{skill.name}</span>
        {count ? (
          <span className="font-mono text-[10px] text-copper-light" aria-hidden="true">
            ×{count}
          </span>
        ) : null}
      </span>
      <span className="skill-cap" aria-hidden="true" />
    </button>
  );
}

/** Sonde de mesure : affiche les connexions de la compétence sous tension. */
function Probe() {
  const { liveSkill, setLiveSkill } = useCircuit();
  const entry = liveSkill ? SKILLS.get(liveSkill.id) : undefined;

  if (!liveSkill || !entry) {
    return (
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-silk/60">
        Sonde · cliquez sur un composant pour tracer ses connexions
      </p>
    );
  }

  const linked = entry.skill.projects.map((id) => projectById[id]).filter(Boolean);
  const hasModules = linked.some((project) => project?.featured);
  const hasBom = linked.some((project) => project && !project.featured);

  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm text-silk">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-led">
            {liveSkill.ref} · {entry.zone.title}
          </span>
          <span className="mt-0.5 block font-display text-lg font-semibold leading-tight">
            {liveSkill.name}
          </span>
        </p>
        <button
          type="button"
          onClick={() => setLiveSkill(null)}
          className="grid size-8 shrink-0 place-items-center border border-silk/20 text-silk hover:border-led hover:text-led"
          aria-label="Couper le courant"
        >
          <X className="size-4" />
        </button>
      </div>

      {linked.length ? (
        <ul className="flex max-h-28 flex-wrap gap-1.5 overflow-y-auto" aria-label="Projets reliés">
          {linked.map((project) =>
            project ? (
              <li key={project.id}>
                <a
                  href={project.featured ? "#modules" : "#bom"}
                  className="inline-flex items-center gap-1.5 border border-led/40 px-2 py-0.5 text-[12px] text-silk hover:border-led hover:text-led"
                >
                  <span className="font-mono text-[10px] text-led">{projectRefs[project.id]}</span>
                  {project.title}
                </a>
              </li>
            ) : null,
          )}
        </ul>
      ) : (
        <p className="text-[13px] text-silk/65">Aucun projet de la liste ne l’illustre encore.</p>
      )}
      {entry.skill.note ? <p className="text-[13px] text-silk/70">{entry.skill.note}</p> : null}

      {linked.length ? (
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {hasModules ? (
            <a href="#modules" className="pcb-link">
              <ArrowUp className="size-3.5" aria-hidden="true" /> Voir les modules allumés
            </a>
          ) : null}
          {hasBom ? (
            <a href="#bom" className="pcb-link">
              <ArrowUp className="size-3.5" aria-hidden="true" /> Voir la nomenclature filtrée
            </a>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export function PhaseFour() {
  const zonesRef = useReveal<HTMLDivElement>();
  const { liveSkill } = useCircuit();

  return (
    <section
      id="competences"
      className="relative px-4 pb-20 sm:px-8"
      aria-labelledby="competences-title"
    >
      <SectionTrace refDes="TP4" reverse={liveSkill !== null} />

      <div className="mx-auto max-w-6xl">
        <header className="mb-10 max-w-3xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-copper-light">
            Section 4 · Bibliothèque de composants
          </p>
          <h2
            id="competences-title"
            className="mt-2 font-display text-[clamp(2rem,5vw,3.4rem)] font-semibold leading-none text-silk"
          >
            Les compétences, zone par zone
          </h2>
          <p className="mt-3 text-sm text-silk/70 sm:text-base">
            Chaque compétence est un composant. Mettez-en un sous tension : le courant remonte vers
            les modules qui l’utilisent, et la nomenclature se filtre sur ces projets.
          </p>
        </header>

        <div ref={zonesRef} className="reveal grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillZones.map((zone) => (
            <section key={zone.id} className="skill-zone" aria-labelledby={`zone-${zone.id}`}>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-silk/55">
                {zone.zone}
              </p>
              <h3
                id={`zone-${zone.id}`}
                className="mb-4 mt-1 font-display text-lg font-semibold text-silk"
              >
                {zone.title}
              </h3>
              <ul className="flex flex-wrap gap-x-2.5 gap-y-3">
                {zone.skills.map((skill, index) => (
                  <li key={skill.id}>
                    <SkillPart skill={skill} refDes={skillRef(zone, index)} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="probe sticky bottom-3 z-30 mt-8" aria-live="polite">
          <Probe />
        </div>
      </div>
    </section>
  );
}
