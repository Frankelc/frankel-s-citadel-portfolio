import { Github, Mail } from "lucide-react";

import { SectionTrace } from "@/components/board/section-trace";
import { Pinout } from "@/components/phase-two/pinout";
import { datasheet, profile } from "@/data/profile";
import { useReveal } from "@/hooks/use-reveal";

export function PhaseTwo() {
  const sheetRef = useReveal<HTMLDivElement>();

  return (
    <section id="fiche" className="relative px-4 pb-20 sm:px-8" aria-labelledby="fiche-title">
      <SectionTrace refDes="TP2" />

      <div ref={sheetRef} className="datasheet reveal mx-auto max-w-6xl">
        <header className="flex flex-wrap items-center justify-between gap-2 border-b border-silk/15 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-silk/60 sm:px-8">
          <span>FG · Fiche technique</span>
          <span>Rév. 3.0 · 2026 · Page 1/1</span>
        </header>

        <div className="px-5 pt-8 sm:px-8 sm:pt-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-copper-light">
            Référence
          </p>
          <h2
            id="fiche-title"
            className="mt-2 break-words font-display text-[clamp(1.7rem,5.5vw,3.6rem)] font-semibold leading-none tracking-[0.02em] text-silk"
          >
            {datasheet.reference}
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-silk/75 sm:text-base">{profile.tagline}</p>
        </div>

        <div className="grid gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="space-y-10 lg:sticky lg:top-24 lg:self-start">
            <figure>
              <figcaption className="datasheet-heading">1 · Brochage</figcaption>
              <div className="mt-4 border border-silk/10 bg-die/40 p-3 sm:p-5">
                <Pinout />
              </div>
            </figure>

            <figure>
              <figcaption className="datasheet-heading">2 · Photo du composant</figcaption>
              <div className="mt-4 flex items-center gap-4">
                <div
                  className={`grid size-28 shrink-0 place-items-center overflow-hidden border bg-die/60 sm:size-32 ${
                    profile.avatar ? "border-silk/30" : "border-dashed border-silk/30"
                  }`}
                >
                  {profile.avatar ? (
                    <img
                      src={profile.avatar}
                      alt={profile.avatarAlt}
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover"
                    />
                  ) : (
                    <span className="px-2 text-center font-mono text-[9px] uppercase tracking-[0.16em] text-silk/55">
                      J1 avatar
                      <br />
                      image à fournir
                    </span>
                  )}
                </div>
                <p className="text-xs leading-relaxed text-silk/60">
                  Boîtier : portrait de l’auteur.
                </p>
              </div>
            </figure>
          </div>

          <div className="space-y-10">
            <div>
              <h3 className="datasheet-heading">3 · Caractéristiques</h3>
              <table className="mt-4 w-full border-collapse text-left text-sm">
                <caption className="sr-only">Caractéristiques du composant</caption>
                <thead>
                  <tr className="border-b border-copper/40 font-mono text-[10px] uppercase tracking-[0.18em] text-copper-light">
                    <th scope="col" className="w-[38%] py-2 pr-4 font-medium">
                      Paramètre
                    </th>
                    <th scope="col" className="py-2 font-medium">
                      Valeur
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-silk/10">
                    <th scope="row" className="py-3 pr-4 align-top font-normal text-silk/60">
                      Référence
                    </th>
                    <td className="break-all py-3 font-mono text-[13px] text-silk">
                      {datasheet.reference}
                    </td>
                  </tr>
                  {datasheet.characteristics.map((row) => (
                    <tr key={row.param} className="border-b border-silk/10">
                      <th scope="row" className="py-3 pr-4 align-top font-normal text-silk/60">
                        {row.param}
                      </th>
                      <td className="py-3 text-silk">
                        {row.value.map((line) => (
                          <span key={line} className="block [&+&]:mt-1">
                            {line}
                          </span>
                        ))}
                      </td>
                    </tr>
                  ))}
                  <tr className="border-b border-silk/10">
                    <th scope="row" className="py-3 pr-4 align-top font-normal text-silk/60">
                      Liaisons
                    </th>
                    <td className="py-3">
                      <span className="flex flex-wrap gap-x-5 gap-y-2">
                        <a
                          href={profile.github}
                          target="_blank"
                          rel="noreferrer"
                          className="datasheet-link"
                        >
                          <Github className="size-4" /> github.com/Frankelc
                        </a>
                        <a href={`mailto:${profile.email}`} className="datasheet-link">
                          <Mail className="size-4" /> M’écrire
                        </a>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div>
              <h3 className="datasheet-heading">4 · Description</h3>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-silk/85">
                {datasheet.description.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div>
              <h3 className="datasheet-heading">5 · Description des broches</h3>
              <ol className="mt-4 grid gap-x-6 text-[13px] sm:grid-cols-2">
                {datasheet.pins.map((pin, i) => (
                  <li key={pin.name} className="flex gap-3 border-b border-silk/10 py-2">
                    <span className="w-5 shrink-0 text-right font-mono text-silk/45">{i + 1}</span>
                    <span className="w-11 shrink-0 font-mono text-copper-light">{pin.name}</span>
                    <span className="text-silk/75">{pin.fn}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
