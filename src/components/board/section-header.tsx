import type { ReactNode } from "react";

import { SectionPart, type SectionPartKind } from "@/components/board/section-part";

/** En-tête de section : titre à gauche, composant qui se démonte à droite. */
export function SectionHeader({
  eyebrow,
  title,
  titleId,
  part,
  children,
}: {
  eyebrow: string;
  title: string;
  titleId: string;
  part: SectionPartKind;
  children?: ReactNode;
}) {
  return (
    <header className="mb-14 grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
      <div className="max-w-3xl">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-copper-light">
          {eyebrow}
        </p>
        <h2
          id={titleId}
          className="mt-2 font-display text-[clamp(2rem,5vw,3.4rem)] font-semibold leading-none text-silk"
        >
          {title}
        </h2>
        {children ? <p className="mt-3 text-sm text-silk/70 sm:text-base">{children}</p> : null}
      </div>
      <SectionPart
        kind={part}
        className="mx-auto w-full max-w-[11rem] sm:max-w-[16rem] lg:max-w-none"
      />
    </header>
  );
}
