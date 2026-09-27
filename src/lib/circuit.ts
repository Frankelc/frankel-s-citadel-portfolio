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
};

export const CircuitContext = createContext<Circuit>({ liveSkill: null, setLiveSkill: () => {} });

export function useCircuit() {
  return useContext(CircuitContext);
}
