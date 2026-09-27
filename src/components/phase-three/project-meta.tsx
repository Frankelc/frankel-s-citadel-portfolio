import { ExternalLink, Github, Lock } from "lucide-react";

import { TODO, type Context, type Project } from "@/data/projects";

const CONTEXT_LABELS: Record<Context, string> = {
  perso: "Perso",
  client: "Client",
  hackathon: "Hackathon",
  équipe: "Équipe",
  cours: "Cours",
};

/** Badges de contexte, plus « En ligne » quand le projet a un lien public. */
export function ProjectBadges({ project }: { project: Project }) {
  const labels = project.context.map((context) => CONTEXT_LABELS[context]);
  if (!labels.length && !project.live) return null;
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Contexte">
      {labels.map((label) => (
        <li key={label} className="pcb-badge">
          {label}
        </li>
      ))}
      {project.live ? <li className="pcb-badge is-live">En ligne</li> : null}
    </ul>
  );
}

export function ProjectLinks({
  project,
  compact = false,
}: {
  project: Project;
  compact?: boolean;
}) {
  const hasAny = project.github || project.live;
  if (!hasAny) {
    return <span className="font-mono text-[11px] text-silk/40">Aucun lien public</span>;
  }
  return (
    <span className={`flex flex-wrap ${compact ? "gap-x-3 gap-y-1" : "gap-3"}`}>
      {project.live ? (
        <a href={project.live} target="_blank" rel="noreferrer" className="pcb-link">
          <ExternalLink className="size-3.5" aria-hidden="true" />
          En ligne<span className="sr-only"> : {project.title}</span>
        </a>
      ) : null}
      {project.github && !project.repoPrivate ? (
        <a href={project.github} target="_blank" rel="noreferrer" className="pcb-link">
          <Github className="size-3.5" aria-hidden="true" />
          GitHub<span className="sr-only"> : {project.title}</span>
        </a>
      ) : null}
      {project.github && project.repoPrivate ? (
        <span className="inline-flex items-center gap-1 font-mono text-[11px] text-silk/45">
          <Lock className="size-3" aria-hidden="true" /> Dépôt privé
        </span>
      ) : null}
    </span>
  );
}

/** Texte de projet, avec un style distinct quand il reste à compléter. */
export function Filled({ text }: { text: string | undefined }) {
  const value = text ?? TODO;
  return value === TODO ? <span className="todo-text">{TODO}</span> : <>{value}</>;
}
