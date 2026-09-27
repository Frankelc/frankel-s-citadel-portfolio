import { useEffect, useRef, useState } from "react";

import { SECTIONS } from "@/data/sections";

const LINKS = SECTIONS.filter((section) => section.enabled);

/**
 * Piste de cuivre verticale (grands écrans) : un point de test par section, une impulsion
 * qui suit le défilement, et les touches 1 à 6 pour sauter directement à une section.
 */
export function NavRail() {
  const pulseRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState<string>(LINKS[0]?.id ?? "");

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      pulseRef.current?.style.setProperty("--progress", String(progress));
      // Section active : la dernière dont le haut a franchi le tiers supérieur de l'écran.
      let current = LINKS[0]?.id ?? "";
      for (const link of LINKS) {
        const el = document.getElementById(link.id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.35) current = link.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable='true']")) return;
      if (document.querySelector('[role="dialog"]')) return;
      const link = LINKS[Number(event.key) - 1];
      if (!link) return;
      document.getElementById(link.id)?.scrollIntoView({ behavior: "instant" });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <nav className="nav-rail" aria-label="Sections du site">
      <span className="nav-rail-trace" aria-hidden="true">
        <span ref={pulseRef} className="nav-rail-pulse" />
      </span>
      <ol className="nav-rail-points">
        {LINKS.map((link, index) => (
          <li key={link.id}>
            <a
              href={`#${link.id}`}
              className="nav-rail-point"
              aria-current={active === link.id ? "location" : undefined}
              aria-keyshortcuts={String(index + 1)}
            >
              <span className="nav-rail-via" aria-hidden="true" />
              <span className="nav-rail-label">
                <span className="text-copper-light">TP{index + 1}</span> {link.label}
                <kbd className="ml-2 text-silk/45">{index + 1}</kbd>
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
