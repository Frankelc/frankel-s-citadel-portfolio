import { createFileRoute } from "@tanstack/react-router";
import { PhaseOne } from "@/components/phase-one";

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
        content: "Découvrez le portfolio immersif de Frankel GNONLONFIN, développeur web, IoT et systèmes embarqués.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <PhaseOne />;
}
