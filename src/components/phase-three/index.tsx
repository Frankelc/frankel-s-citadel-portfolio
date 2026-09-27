import { useCircuit } from "@/lib/circuit";
import { SectionTrace } from "@/components/board/section-trace";
import { Bom } from "@/components/phase-three/bom";
import { ModuleChip } from "@/components/phase-three/module-chip";
import { ModuleDatasheet } from "@/components/phase-three/module-datasheet";
import { featuredProjects, projectRefs } from "@/data/projects";
import { useReveal } from "@/hooks/use-reveal";

const moduleRef = (index: number) => projectRefs[featuredProjects[index]?.id ?? ""] ?? "";

export function PhaseThree() {
  const boardRef = useReveal<HTMLDivElement>();
  const { liveSkill, setOpenProjectId } = useCircuit();

  return (
    <section id="modules" className="relative px-4 pb-20 sm:px-8" aria-labelledby="modules-title">
      <SectionTrace refDes="TP3" />

      <div className="mx-auto max-w-6xl">
        <header className="mb-16 max-w-3xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-copper-light">
            Section 3 · Modules
          </p>
          <h2
            id="modules-title"
            className="mt-2 font-display text-[clamp(2rem,5vw,3.4rem)] font-semibold leading-none text-silk"
          >
            Les modules montés sur la carte
          </h2>
          <p className="mt-3 text-sm text-silk/70 sm:text-base">
            Chaque puce est un projet. Cliquez dessus pour ouvrir sa datasheet, puis parcourez les
            modules avec les flèches. Tous les autres projets sont listés dans la nomenclature, plus
            bas.
          </p>
        </header>

        <div ref={boardRef} className="reveal module-board">
          <h3 className="sr-only">Modules principaux</h3>
          <ul className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featuredProjects.map((project, index) => (
              <li key={project.id}>
                <ModuleChip
                  project={project}
                  refDes={moduleRef(index)}
                  linked={liveSkill ? liveSkill.projectIds.has(project.id) : null}
                  onOpen={() => setOpenProjectId(project.id)}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16">
          <h3 className="mb-5 font-display text-2xl font-semibold text-silk sm:text-3xl">
            Nomenclature des composants
          </h3>
          <Bom />
        </div>
      </div>

      <ModuleDatasheet />
    </section>
  );
}
