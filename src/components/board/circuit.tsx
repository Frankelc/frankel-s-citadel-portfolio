import { useMemo, useState, type ReactNode } from "react";

import { CircuitContext, type LiveSkill } from "@/lib/circuit";

export function CircuitProvider({ children }: { children: ReactNode }) {
  const [liveSkill, setLiveSkill] = useState<LiveSkill | null>(null);
  const value = useMemo(() => ({ liveSkill, setLiveSkill }), [liveSkill]);
  return <CircuitContext.Provider value={value}>{children}</CircuitContext.Provider>;
}
