import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { Filled, ProjectBadges, ProjectLinks } from "@/components/phase-three/project-meta";
import { CATEGORIES, type Project } from "@/data/projects";

/** Datasheet d'un module principal, ouverte au clic sur sa puce. */
export function ModuleDatasheet({
  project,
  refDes,
  onClose,
}: {
  project: Project | null;
  refDes: string;
  onClose: () => void;
}) {
  return (
    <DialogPrimitive.Root open={project !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[70] bg-black/75 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content className="datasheet fixed inset-x-3 top-1/2 z-[71] max-h-[88vh] -translate-y-1/2 overflow-y-auto focus:outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 sm:inset-x-auto sm:left-1/2 sm:w-[min(46rem,calc(100vw-3rem))] sm:-translate-x-1/2">
          {project ? (
            <>
              <header className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-silk/15 bg-die/95 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-silk/60 sm:px-7">
                <span>
                  {refDes} · Datasheet · {CATEGORIES[project.category]}
                </span>
                <DialogPrimitive.Close
                  className="grid size-8 place-items-center border border-silk/20 text-silk hover:border-led hover:text-led focus-visible:outline-2 focus-visible:outline-led"
                  aria-label="Fermer la datasheet"
                >
                  <X className="size-4" />
                </DialogPrimitive.Close>
              </header>

              <div className="space-y-7 px-5 py-6 sm:px-7 sm:py-8">
                <div>
                  <DialogPrimitive.Title className="font-display text-3xl font-semibold leading-none text-silk sm:text-4xl">
                    {project.title}
                  </DialogPrimitive.Title>
                  <DialogPrimitive.Description className="mt-3 text-base leading-relaxed text-silk/80">
                    <Filled text={project.description} />
                  </DialogPrimitive.Description>
                </div>

                <dl className="grid gap-x-6 gap-y-5 text-sm sm:grid-cols-[9rem_minmax(0,1fr)]">
                  <dt className="datasheet-term">Contexte</dt>
                  <dd className="space-y-2">
                    <ProjectBadges project={project} />
                    {project.setting ? <p className="text-silk/80">{project.setting}</p> : null}
                    {!project.setting && !project.context.length ? (
                      <Filled text={undefined} />
                    ) : null}
                  </dd>

                  <dt className="datasheet-term">Objectif</dt>
                  <dd className="leading-relaxed text-silk/80">
                    <Filled text={project.objective} />
                  </dd>

                  <dt className="datasheet-term">Ce que j’ai fait</dt>
                  <dd className="leading-relaxed text-silk/80">
                    <Filled text={project.work} />
                  </dd>

                  <dt className="datasheet-term">Brochage (stack)</dt>
                  <dd>
                    {project.stack.length ? (
                      <ol className="grid gap-x-4 sm:grid-cols-2">
                        {project.stack.map((tech, i) => (
                          <li
                            key={tech}
                            className="flex items-center gap-3 border-b border-silk/10 py-1.5"
                          >
                            <span className="pin-pad" aria-hidden="true" />
                            <span className="w-5 font-mono text-[11px] text-silk/45">{i + 1}</span>
                            <span className="font-mono text-[13px] text-silk">{tech}</span>
                          </li>
                        ))}
                      </ol>
                    ) : (
                      <Filled text={undefined} />
                    )}
                  </dd>

                  <dt className="datasheet-term">Liens</dt>
                  <dd>
                    <ProjectLinks project={project} />
                  </dd>
                </dl>
              </div>
            </>
          ) : null}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
