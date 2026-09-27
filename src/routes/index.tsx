import { createFileRoute } from "@tanstack/react-router";
import { CircuitProvider } from "@/components/board/circuit";
import { PhaseFive } from "@/components/phase-five";
import { PhaseFour } from "@/components/phase-four";
import { PhaseOne } from "@/components/phase-one";
import { PhaseSix } from "@/components/phase-six";
import { SiteFooter } from "@/components/phase-six/site-footer";
import { PhaseThree } from "@/components/phase-three";
import { PhaseTwo } from "@/components/phase-two";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Frankel GNONLONFIN — Développeur systèmes embarqués & web" },
      {
        name: "description",
        content:
          "Portfolio de Frankel GNONLONFIN, développeur à Calavi : du serveur au silicium, des API web aux microcontrôleurs.",
      },
      { property: "og:title", content: "Frankel GNONLONFIN — Du serveur au silicium" },
      {
        property: "og:description",
        content:
          "Découvrez le portfolio immersif de Frankel GNONLONFIN, développeur web, IoT et systèmes embarqués.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <main className="bg-background text-foreground">
        <CircuitProvider>
          <PhaseOne />
          <PhaseTwo />
          <PhaseThree />
          <PhaseFour />
          <PhaseFive />
          <PhaseSix />
        </CircuitProvider>
      </main>
      <SiteFooter />
    </>
  );
}
