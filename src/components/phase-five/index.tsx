import { useState } from "react";
import { FileText } from "lucide-react";

import { SectionTrace } from "@/components/board/section-trace";
import { Scope } from "@/components/phase-five/scope";
import { Filled } from "@/components/phase-three/project-meta";
import { events, type TestEvent } from "@/data/events";
import { projectById, projectRefs } from "@/data/projects";
import { useReveal } from "@/hooks/use-reveal";
import { useCircuit } from "@/lib/circuit";

const KIND_LABEL: Record<TestEvent["kind"], string> = { hackathon: "Hackathon", ctf: "CTF" };

function metaLine(event: TestEvent) {
  return [
    event.place,
    event.organizer ? `Organisé par ${event.organizer}` : null,
    event.team ? `Équipe ${event.team}` : null,
  ]
    .filter(Boolean)
    .join(" · ");
}

function ProjectLink({ event }: { event: TestEvent }) {
  const { setOpenProjectId } = useCircuit();
  const project = event.projectId ? projectById[event.projectId] : undefined;
  if (!project) return null;
  return (
    <button type="button" onClick={() => setOpenProjectId(project.id)} className="pcb-link">
      <FileText className="size-3.5" aria-hidden="true" />
      Datasheet {projectRefs[project.id]} · {project.title}
    </button>
  );
}

export function PhaseFive() {
  const screenRef = useReveal<HTMLDivElement>();
  const [selected, setSelected] = useState(0);
  const event = events[selected];
  const hackathons = events.filter((item) => item.kind === "hackathon").length;

  return (
    <section id="journal" className="relative px-4 pb-20 sm:px-8" aria-labelledby="journal-title">
      <SectionTrace refDes="TP5" />

      <div className="mx-auto max-w-6xl">
        <header className="mb-10 max-w-3xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-copper-light">
            Section 5 · Journal de tests
          </p>
          <h2
            id="journal-title"
            className="mt-2 font-display text-[clamp(2rem,5vw,3.4rem)] font-semibold leading-none text-silk"
          >
            Hackathons et CTF, mesurés à l’analyseur
          </h2>
          <p className="mt-3 text-sm text-silk/70 sm:text-base">
            Chaque événement est une impulsion sur le signal. Survolez ou sélectionnez une impulsion
            pour lire la mesure.
          </p>
        </header>

        <div ref={screenRef} className="reveal scope">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-silk/10 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-silk/55 sm:px-6">
            <span>FG-LA · analyseur logique · 2 voies</span>
            <span>Trig ↑ CH1 · {events.length} impulsions</span>
          </div>

          <div className="px-2 pt-3 sm:px-4">
            <Scope selected={selected} onSelect={setSelected} />
          </div>

          {event ? (
            <div className="grid gap-4 border-t border-silk/10 px-4 py-5 sm:grid-cols-[10rem_minmax(0,1fr)] sm:px-6">
              <div className="font-mono text-[11px] uppercase tracking-[0.14em]">
                <p className="text-silk/50">Mesure</p>
                <p className="mt-1 text-2xl text-led">T{selected + 1}</p>
                <p className="mt-1 text-copper-light">
                  {event.kind === "hackathon" ? "CH1" : "CH2"} · {KIND_LABEL[event.kind]}
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-xl font-semibold leading-tight text-silk sm:text-2xl">
                  {event.name}
                </h3>
                {metaLine(event) ? <p className="text-sm text-silk/65">{metaLine(event)}</p> : null}
                <p className="text-base leading-relaxed text-silk/85">
                  <Filled text={event.detail} />
                </p>
                <ProjectLink event={event} />
              </div>
            </div>
          ) : null}

          <div className="flex flex-wrap gap-x-6 gap-y-1 border-t border-silk/10 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.16em] sm:px-6">
            <span className="text-led">CH1 · {hackathons} hackathons</span>
            <span className="text-copper-light">CH2 · {events.length - hackathons} CTF</span>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="mb-4 font-display text-2xl font-semibold text-silk">Journal complet</h3>
          <ol className="datasheet divide-y divide-silk/10">
            {events.map((item, index) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setSelected(index)}
                  aria-pressed={index === selected}
                  className="log-row"
                >
                  <span className="font-mono text-[11px] text-silk/50">T{index + 1}</span>
                  <span
                    className={`font-mono text-[10px] uppercase tracking-[0.14em] ${
                      item.kind === "hackathon" ? "text-led" : "text-copper-light"
                    }`}
                  >
                    {KIND_LABEL[item.kind]}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-medium text-silk">{item.name}</span>
                    {metaLine(item) ? (
                      <span className="block text-[13px] text-silk/60">{metaLine(item)}</span>
                    ) : null}
                    <span className="mt-1 block text-sm text-silk/80">
                      <Filled text={item.detail} />
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
