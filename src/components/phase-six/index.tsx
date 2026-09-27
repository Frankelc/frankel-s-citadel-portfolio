import { useState } from "react";
import { Check, Copy, Github, Mail } from "lucide-react";

import { MascotFigure } from "@/components/board/mascot";
import { SectionHeader } from "@/components/board/section-header";
import { SectionTrace } from "@/components/board/section-trace";
import { profile } from "@/data/profile";
import { useReveal } from "@/hooks/use-reveal";

type Tx = "mail" | "github" | null;

const TX_LINE: Record<Exclude<Tx, null>, string> = {
  mail: `TX › mailto:${profile.email}`,
  github: `TX › ${profile.github.replace("https://", "")}`,
};

/** Connecteur série de la carte, câble et robot BOT-01 branché dessus. */
function PortIllustration({ waving }: { waving: boolean }) {
  return (
    <svg viewBox="0 0 420 300" className="h-auto w-full max-w-md" aria-hidden="true">
      {/* Bord de carte et connecteur J3 */}
      <rect x="0" y="40" width="150" height="220" rx="6" fill="#0E3B2C" />
      <path
        d="M20 90 H100 M20 130 H100 M20 170 H100 M20 210 H100"
        stroke="#C8893B"
        strokeWidth="3"
      />
      <text x="20" y="70" className="silk-label">
        J3 · PORT COM
      </text>
      <g transform="translate(96 108)">
        <path d="M0 0 H64 L56 84 H8 Z" fill="#8a8f88" stroke="#c5c1b7" strokeWidth="2" />
        <path d="M10 12 H54 L48 72 H16 Z" fill="#1A1D1B" />
        {[0, 1, 2, 3, 4].map((i) => (
          <circle key={`a${i}`} cx={20 + i * 6} cy="30" r="2.2" fill="#E0B070" />
        ))}
        {[0, 1, 2, 3].map((i) => (
          <circle key={`b${i}`} cx={23 + i * 6} cy="52" r="2.2" fill="#E0B070" />
        ))}
      </g>
      <circle className="port-led" cx="40" cy="236" r="5" fill="#4BE38A" />
      <text x="52" y="240" className="silk-label">
        LINK
      </text>

      {/* Câble du connecteur jusqu'à la main gauche du robot */}
      <path
        className="port-cable"
        d="M160 150 C220 150 205 246 246 246 S262 234 255 229"
        fill="none"
        stroke="#1A1D1B"
        strokeWidth="9"
        strokeLinecap="round"
      />
      <path
        className="port-signal"
        d="M160 150 C220 150 205 246 246 246 S262 234 255 229"
        fill="none"
        stroke="#4BE38A"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect x="152" y="138" width="18" height="24" rx="2" fill="#c5c1b7" />

      <g transform="translate(330 150) scale(1.45)">
        <MascotFigure x={0} y={0} waving={waving} />
      </g>
    </svg>
  );
}

export function PhaseSix() {
  const panelRef = useReveal<HTMLDivElement>();
  const [tx, setTx] = useState<Tx>(null);
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const hover = (value: Tx) => ({
    onMouseEnter: () => setTx(value),
    onMouseLeave: () => setTx(null),
    onFocus: () => setTx(value),
    onBlur: () => setTx(null),
  });

  return (
    <section id="contact" className="relative px-4 pb-24 sm:px-8" aria-labelledby="contact-title">
      <SectionTrace refDes="TP6" />

      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Section 6 · Port de communication"
          title="Établissons la connexion"
          titleId="contact-title"
          part="usbc"
        />

        <div
          ref={panelRef}
          className="reveal grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
        >
          <div className="flex justify-center">
            <PortIllustration waving={tx !== null} />
          </div>

          <div className="terminal">
            <div className="flex items-center gap-2 border-b border-silk/10 px-4 py-2.5">
              <span className="size-2.5 rounded-full bg-alert/80" aria-hidden="true" />
              <span className="size-2.5 rounded-full bg-copper/80" aria-hidden="true" />
              <span className="size-2.5 rounded-full bg-led/80" aria-hidden="true" />
              <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.18em] text-silk/55">
                COM3 · 115200 bauds · 8N1
              </span>
            </div>

            <div className="space-y-1.5 px-5 py-5 font-mono text-[13px] leading-relaxed sm:px-6">
              <p className="term-line text-silk/50">› ouverture du port COM3…</p>
              <p className="term-line text-silk/50">› FRANKEL-GNONLONFIN REV 3.0 détecté</p>
              <p className="term-line text-led">› liaison établie</p>
            </div>

            <div className="border-t border-silk/10 px-5 py-6 sm:px-6">
              <p className="font-display text-2xl font-semibold leading-snug text-silk sm:text-3xl">
                Un projet, un stage ou une équipe à compléter&nbsp;? Établissons la connexion.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="port-button is-primary"
                  {...hover("mail")}
                >
                  <Mail className="size-4" aria-hidden="true" /> M’écrire
                </a>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="port-button"
                  {...hover("github")}
                >
                  <Github className="size-4" aria-hidden="true" /> Voir mon GitHub
                </a>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[12px] text-silk/65">
                <span>{profile.email}</span>
                <button
                  type="button"
                  onClick={() => void copyEmail()}
                  className="inline-flex items-center gap-1 text-silk/80 underline decoration-copper/60 underline-offset-4 hover:text-led"
                >
                  {copied ? (
                    <Check className="size-3.5" aria-hidden="true" />
                  ) : (
                    <Copy className="size-3.5" aria-hidden="true" />
                  )}
                  {copied ? "Adresse copiée" : "Copier l’adresse"}
                </button>
              </div>

              <p
                className="mt-5 h-5 font-mono text-[12px] text-led"
                aria-live="polite"
                aria-atomic="true"
              >
                {tx ? TX_LINE[tx] : <span className="term-cursor">█</span>}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
