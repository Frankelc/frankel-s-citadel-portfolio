import { useEffect } from "react";

import { useCircuit } from "@/lib/circuit";
import { SectionHeader } from "@/components/board/section-header";
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

  // Écrans tactiles (pas de survol) : la puce au centre de l'écran s'allume pendant le défilement.
  useEffect(() => {
    const board = boardRef.current;
    if (!board || !window.matchMedia("(hover: none)").matches) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          entry.target.classList.toggle("is-centered", entry.isIntersecting);
      },
      { rootMargin: "-42% 0px -42% 0px" },
    );
    board.querySelectorAll(".module-slot").forEach((slot) => observer.observe(slot));
    return () => observer.disconnect();
  }, [boardRef]);

  return (
    <section id="modules" className="relative px-4 pb-20 sm:px-8" aria-labelledby="modules-title">
      <SectionTrace refDes="TP3" />

      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Section 3 · Modules"
          title="Les modules montés sur la carte"
          titleId="modules-title"
          part="qfp"
        >
          Chaque puce est un projet. Cliquez dessus pour ouvrir sa datasheet, puis parcourez les
          modules avec les flèches. Tous les autres projets sont listés dans la nomenclature, plus
          bas.
        </SectionHeader>

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
