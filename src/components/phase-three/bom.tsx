import { useEffect, useId, useMemo, useState } from "react";
import { Search, X } from "lucide-react";

import { useCircuit } from "@/lib/circuit";
import { Filled, ProjectBadges, ProjectLinks } from "@/components/phase-three/project-meta";
import { bomProjects, CATEGORIES, projectRefs, type Category, type Project } from "@/data/projects";

// Référence stable : elle suit l'ordre du fichier de données, pas le filtre.
const ROWS = bomProjects.map((project) => ({ project, ref: projectRefs[project.id] ?? "" }));

const USED_CATEGORIES = (Object.keys(CATEGORIES) as Category[]).filter((category) =>
  bomProjects.some((project) => project.category === category),
);

function matches(project: Project, query: string) {
  if (!query) return true;
  const haystack = [
    project.title,
    project.description,
    CATEGORIES[project.category],
    ...project.stack,
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(query);
}

function Stack({ stack }: { stack: string[] }) {
  if (!stack.length) return <span className="text-silk/35">—</span>;
  return <span className="font-mono text-[12px] text-silk/80">{stack.join(" · ")}</span>;
}

/** Nomenclature industrielle de tous les autres projets. */
export function Bom() {
  const searchId = useId();
  const [category, setCategory] = useState<Category | "all">("all");
  const [query, setQuery] = useState("");
  const { liveSkill, setLiveSkill } = useCircuit();

  // Une compétence mise sous tension repart d'une nomenclature sans autre filtre.
  useEffect(() => {
    if (!liveSkill) return;
    setCategory("all");
    setQuery("");
  }, [liveSkill]);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ROWS.filter(
      ({ project }) =>
        (!liveSkill || liveSkill.projectIds.has(project.id)) &&
        (category === "all" || project.category === category) &&
        matches(project, q),
    );
  }, [category, query, liveSkill]);

  return (
    <div id="bom" className="datasheet scroll-mt-20">
      <header className="flex flex-wrap items-center justify-between gap-2 border-b border-silk/15 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-silk/60 sm:px-7">
        <span>BOM · Nomenclature des composants</span>
        <span aria-live="polite">
          {rows.length} / {ROWS.length} composants
        </span>
      </header>

      <div className="space-y-4 border-b border-silk/10 px-5 py-5 sm:px-7">
        {liveSkill ? (
          <p className="flex flex-wrap items-center gap-x-3 gap-y-2 border border-led/50 bg-led/10 px-3 py-2 text-sm text-silk">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-led">
              {liveSkill.ref} sous tension
            </span>
            <span>
              Projets qui prouvent <strong className="font-semibold">{liveSkill.name}</strong>
            </span>
            <button
              type="button"
              onClick={() => setLiveSkill(null)}
              className="ml-auto inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.12em] text-silk/70 hover:text-led"
            >
              <X className="size-3.5" aria-hidden="true" /> Couper le courant
            </button>
          </p>
        ) : null}
        <div className="relative max-w-md">
          <label htmlFor={searchId} className="sr-only">
            Rechercher un projet
          </label>
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-silk/45"
            aria-hidden="true"
          />
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Rechercher : nom, stack, description…"
            className="w-full border border-silk/20 bg-die/60 py-2.5 pl-9 pr-3 text-sm text-silk placeholder:text-silk/40 focus:border-led focus:outline-none"
          />
        </div>

        <div
          className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 max-md:[scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0"
          role="group"
          aria-label="Filtrer par catégorie"
        >
          <button
            type="button"
            className="bom-filter"
            aria-pressed={category === "all"}
            onClick={() => setCategory("all")}
          >
            Tout
          </button>
          {USED_CATEGORIES.map((key) => (
            <button
              key={key}
              type="button"
              className="bom-filter"
              aria-pressed={category === key}
              onClick={() => setCategory(key)}
            >
              {CATEGORIES[key]}
            </button>
          ))}
        </div>
      </div>

      {rows.length === 0 ? (
        <p className="px-5 py-10 text-center font-mono text-xs uppercase tracking-[0.16em] text-silk/50 sm:px-7">
          {liveSkill
            ? "Aucun projet de la nomenclature pour cette compétence · voir les modules"
            : "Aucun composant ne correspond · circuit ouvert"}
        </p>
      ) : (
        <>
          {/* Tableau (tablette et ordinateur) */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full border-collapse text-left text-sm">
              <caption className="sr-only">Nomenclature de tous les autres projets</caption>
              <thead>
                <tr className="border-b border-copper/40 font-mono text-[10px] uppercase tracking-[0.18em] text-copper-light">
                  <th scope="col" className="px-4 py-3 font-medium sm:pl-7">
                    Réf.
                  </th>
                  <th scope="col" className="px-4 py-3 font-medium">
                    Nom
                  </th>
                  <th scope="col" className="px-4 py-3 font-medium">
                    Description
                  </th>
                  <th scope="col" className="px-4 py-3 font-medium">
                    Stack
                  </th>
                  <th scope="col" className="px-4 py-3 font-medium">
                    Badges
                  </th>
                  <th scope="col" className="px-4 py-3 font-medium sm:pr-7">
                    Liens
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map(({ project, ref }) => (
                  <tr
                    key={project.id}
                    className="border-b border-silk/10 align-top transition-colors hover:bg-die/40"
                  >
                    <td className="px-4 py-3 font-mono text-[12px] text-silk/55 sm:pl-7">{ref}</td>
                    <th scope="row" className="px-4 py-3 text-left font-medium text-silk">
                      {project.title}
                      <span className="mt-0.5 block font-mono text-[10px] font-normal uppercase tracking-[0.12em] text-copper">
                        {CATEGORIES[project.category]}
                      </span>
                    </th>
                    <td className="max-w-xs px-4 py-3 text-silk/75">
                      <Filled text={project.description} />
                    </td>
                    <td className="px-4 py-3">
                      <Stack stack={project.stack} />
                    </td>
                    <td className="px-4 py-3">
                      <ProjectBadges project={project} />
                    </td>
                    <td className="px-4 py-3 sm:pr-7">
                      <ProjectLinks project={project} compact />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Liste de cartes (mobile) */}
          <ul className="divide-y divide-silk/10 md:hidden">
            {rows.map(({ project, ref }) => (
              <li key={project.id} className="space-y-2.5 px-5 py-4">
                <div className="flex items-baseline justify-between gap-3">
                  <h4 className="font-display text-lg font-semibold leading-tight text-silk">
                    {project.title}
                  </h4>
                  <span className="shrink-0 font-mono text-[11px] text-silk/50">{ref}</span>
                </div>
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-copper">
                  {CATEGORIES[project.category]}
                </p>
                <p className="text-sm text-silk/75">
                  <Filled text={project.description} />
                </p>
                {project.stack.length ? <Stack stack={project.stack} /> : null}
                <ProjectBadges project={project} />
                <ProjectLinks project={project} compact />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
