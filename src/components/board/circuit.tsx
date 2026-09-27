import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

import { projectById } from "@/data/projects";
import { toLiveSkill } from "@/data/skills";
import { CircuitContext, type LiveSkill } from "@/lib/circuit";

// Paramètres d'URL partageables : ?competence=python ou ?projet=iris
const SKILL_PARAM = "competence";
const PROJECT_PARAM = "projet";

export function CircuitProvider({ children }: { children: ReactNode }) {
  const [liveSkill, setLiveSkill] = useState<LiveSkill | null>(null);
  const [openProjectId, setOpenProjectId] = useState<string | null>(null);
  const restored = useRef(false);

  // Au chargement, restaure l'état décrit par l'URL et amène le visiteur à la bonne section.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const skill = toLiveSkill(params.get(SKILL_PARAM) ?? "");
    const project = projectById[params.get(PROJECT_PARAM) ?? ""];
    if (skill) setLiveSkill(skill);
    if (project) setOpenProjectId(project.id);
    const target = project ? (project.featured ? "modules" : "bom") : skill ? "competences" : null;
    if (target) document.getElementById(target)?.scrollIntoView({ behavior: "instant" });
    restored.current = true;
  }, []);

  // Garde l'URL à jour, sans créer d'entrée d'historique à chaque clic.
  useEffect(() => {
    if (!restored.current) return;
    const url = new URL(window.location.href);
    if (liveSkill) url.searchParams.set(SKILL_PARAM, liveSkill.id);
    else url.searchParams.delete(SKILL_PARAM);
    if (openProjectId) url.searchParams.set(PROJECT_PARAM, openProjectId);
    else url.searchParams.delete(PROJECT_PARAM);
    if (url.href !== window.location.href)
      window.history.replaceState(window.history.state, "", url);
  }, [liveSkill, openProjectId]);

  const value = useMemo(
    () => ({ liveSkill, setLiveSkill, openProjectId, setOpenProjectId }),
    [liveSkill, openProjectId],
  );
  return <CircuitContext.Provider value={value}>{children}</CircuitContext.Provider>;
}
