import { createContext, useContext } from "react";

/** Compétence sous tension : ses projets s'allument dans les modules et filtrent la BOM. */
export type LiveSkill = {
  id: string;
  name: string;
  ref: string;
  projectIds: ReadonlySet<string>;
};

type Circuit = {
  liveSkill: LiveSkill | null;
  setLiveSkill: (skill: LiveSkill | null) => void;
  /** Projet dont la datasheet est ouverte, depuis n'importe quelle section. */
  openProjectId: string | null;
  setOpenProjectId: (id: string | null) => void;
};

export const CircuitContext = createContext<Circuit>({
  liveSkill: null,
  setLiveSkill: () => {},
  openProjectId: null,
  setOpenProjectId: () => {},
});

export function useCircuit() {
  return useContext(CircuitContext);
}
