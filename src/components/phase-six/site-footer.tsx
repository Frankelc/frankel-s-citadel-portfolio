import { ArrowUp } from "lucide-react";

import { profile } from "@/data/profile";

const CREDITS = [
  {
    label: "Typographies",
    value: "Chakra Petch, IBM Plex Sans, JetBrains Mono · Google Fonts, licence SIL OFL",
  },
  { label: "Icônes", value: "Lucide · licence ISC" },
  {
    label: "Illustrations",
    value:
      "Carte mère, composants, bras pick-and-place et robot BOT-01 dessinés en SVG pour ce site",
  },
  {
    label: "Sons",
    value: "Bips, relais, servo et ventilateur synthétisés par programme pour ce site",
  },
  { label: "Animation", value: "GSAP, ScrollTrigger, Lenis · son : Howler.js" },
];

/** Pied de page en sérigraphie, comme le marquage au dos d'une carte. */
export function SiteFooter() {
  return (
    <footer className="silk-footer px-4 pb-10 pt-12 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-dashed border-silk/25 pb-6">
          <div>
            <p className="font-mono text-sm tracking-[0.28em] text-silk">{profile.boardRef}</p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-silk/65">
              Conçu et assemblé à Calavi, Bénin
            </p>
          </div>
          <a
            href="#accueil"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-silk/70 hover:text-led"
          >
            <ArrowUp className="size-4" aria-hidden="true" /> Retour au démarrage
          </a>
        </div>

        <h2 className="mt-6 font-mono text-[10px] uppercase tracking-[0.24em] text-copper-light">
          Crédits
        </h2>
        <dl className="mt-3 grid gap-x-8 gap-y-2 font-mono text-[11px] text-silk/60 sm:grid-cols-[8rem_minmax(0,1fr)]">
          {CREDITS.map((credit) => (
            <div key={credit.label} className="contents">
              <dt className="uppercase tracking-[0.14em] text-silk/80">{credit.label}</dt>
              <dd className="mb-2 sm:mb-0">{credit.value}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.2em] text-silk/40">
          © 2026 {profile.name}
        </p>
      </div>
    </footer>
  );
}
