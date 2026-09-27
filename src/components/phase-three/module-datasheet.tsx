import { useEffect, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Check, ChevronLeft, ChevronRight, Link2, X } from "lucide-react";

import { Filled, ProjectBadges, ProjectLinks } from "@/components/phase-three/project-meta";
import {
  bomProjects,
  CATEGORIES,
  featuredProjects,
  isFilled,
  projectById,
  projectRefs,
  SHOW_TODO,
} from "@/data/projects";
import { playInterfaceSound } from "@/lib/board-audio";
import { useCircuit } from "@/lib/circuit";

/**
 * Datasheet d'un projet, ouverte depuis une puce, la nomenclature, la sonde ou le journal.
 * Précédent / suivant (et les flèches du clavier) parcourent le même groupe de projets.
 */
export function ModuleDatasheet() {
  const { openProjectId, setOpenProjectId } = useCircuit();
  const project = openProjectId ? projectById[openProjectId] : undefined;
  const [copied, setCopied] = useState(false);

  // Le bras servo s'active à chaque datasheet ouverte ou parcourue.
  useEffect(() => {
    if (openProjectId) playInterfaceSound("servo");
  }, [openProjectId]);

  const group = project?.featured ? featuredProjects : bomProjects;
  const index = project ? group.findIndex((item) => item.id === project.id) : -1;
  const go = (step: number) => {
    const next = group[(index + step + group.length) % group.length];
    if (next) setOpenProjectId(next.id);
    setCopied(false);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const refDes = project ? projectRefs[project.id] : "";
  const hasContext = Boolean(
    project && (project.context.length || project.setting || project.live),
  );
  const showRow = (filled: boolean) => filled || SHOW_TODO;

  return (
    <DialogPrimitive.Root
      open={project !== undefined}
      onOpenChange={(open) => {
        if (!open) setOpenProjectId(null);
      }}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[70] bg-black/75 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") go(1);
            if (event.key === "ArrowLeft") go(-1);
          }}
          className="datasheet fixed inset-x-3 top-1/2 z-[71] max-h-[88vh] -translate-y-1/2 overflow-y-auto focus:outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 sm:inset-x-auto sm:left-1/2 sm:w-[min(46rem,calc(100vw-3rem))] sm:-translate-x-1/2"
        >
          {project ? (
            <>
              <header className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-silk/15 bg-die/95 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-silk/60 sm:px-7">
                <span className="min-w-0 truncate">
                  {refDes} · Datasheet · {CATEGORIES[project.category]}
                </span>
                <span className="flex shrink-0 items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => void copyLink()}
                    className="datasheet-tool"
                    aria-label={copied ? "Lien copié" : "Copier le lien de ce projet"}
                    title="Copier le lien de ce projet"
                  >
                    {copied ? <Check className="size-4" /> : <Link2 className="size-4" />}
                  </button>
                  <DialogPrimitive.Close
                    className="datasheet-tool"
                    aria-label="Fermer la datasheet"
                  >
                    <X className="size-4" />
                  </DialogPrimitive.Close>
                </span>
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
                  {showRow(hasContext) ? (
                    <>
                      <dt className="datasheet-term">Contexte</dt>
                      <dd className="space-y-2">
                        <ProjectBadges project={project} />
                        {project.setting ? <p className="text-silk/80">{project.setting}</p> : null}
                        {!hasContext ? <Filled text={undefined} /> : null}
                      </dd>
                    </>
                  ) : null}

                  {showRow(isFilled(project.objective)) ? (
                    <>
                      <dt className="datasheet-term">Objectif</dt>
                      <dd className="leading-relaxed text-silk/80">
                        <Filled text={project.objective} />
                      </dd>
                    </>
                  ) : null}

                  {showRow(isFilled(project.work)) ? (
                    <>
                      <dt className="datasheet-term">Ce que j’ai fait</dt>
                      <dd className="leading-relaxed text-silk/80">
                        <Filled text={project.work} />
                      </dd>
                    </>
                  ) : null}

                  {showRow(project.stack.length > 0) ? (
                    <>
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
                                <span className="w-5 font-mono text-[11px] text-silk/45">
                                  {i + 1}
                                </span>
                                <span className="font-mono text-[13px] text-silk">{tech}</span>
                              </li>
                            ))}
                          </ol>
                        ) : (
                          <Filled text={undefined} />
                        )}
                      </dd>
                    </>
                  ) : null}

                  <dt className="datasheet-term">Liens</dt>
                  <dd>
                    <ProjectLinks project={project} />
                  </dd>
                </dl>
              </div>

              <footer className="sticky bottom-0 flex items-center justify-between gap-3 border-t border-silk/15 bg-die/95 px-5 py-2.5 sm:px-7">
                <button type="button" onClick={() => go(-1)} className="datasheet-nav">
                  <ChevronLeft className="size-4" aria-hidden="true" />
                  <span>
                    Précédent
                    <span className="sr-only">
                      {" "}
                      : {group[(index - 1 + group.length) % group.length]?.title}
                    </span>
                  </span>
                </button>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-silk/50">
                  {index + 1} / {group.length}
                  <span className="hidden sm:inline"> · ← →</span>
                </span>
                <button type="button" onClick={() => go(1)} className="datasheet-nav">
                  <span>
                    Suivant
                    <span className="sr-only"> : {group[(index + 1) % group.length]?.title}</span>
                  </span>
                  <ChevronRight className="size-4" aria-hidden="true" />
                </button>
              </footer>
            </>
          ) : null}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
