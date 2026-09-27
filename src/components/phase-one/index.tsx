import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowDown, Github, Menu, SkipForward, Volume2, VolumeX } from "lucide-react";

import { BiosScreen, BIOS_LINE_COUNT } from "@/components/phase-one/bios-screen";
import { Motherboard } from "@/components/phase-one/motherboard";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";
import { SECTIONS } from "@/data/sections";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { createBoardAudio, type BoardAudio } from "@/lib/board-audio";

export function PhaseOne() {
  const reduced = useReducedMotion();
  const storyRef = useRef<HTMLElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const dieRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<BoardAudio | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [biosLines, setBiosLines] = useState(1);
  const [showBios, setShowBios] = useState(true);
  const [placed, setPlaced] = useState(false);
  const [powered, setPowered] = useState(false);
  // Read inside the SMT timeline so toggling sound doesn't restart the assembly.
  const soundOnRef = useRef(soundOn);
  soundOnRef.current = soundOn;

  const skipBoot = useCallback(() => {
    setShowBios(false);
    setBiosLines(BIOS_LINE_COUNT);
    setPlaced(true);
    setPowered(true);
    document.getElementById("accueil")?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  }, [reduced]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (menuOpen) setMenuOpen(false);
      else skipBoot();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, skipBoot]);

  useEffect(() => {
    if (reduced) {
      setShowBios(false);
      setBiosLines(BIOS_LINE_COUNT);
      setPlaced(true);
      setPowered(true);
    }
  }, [reduced]);

  useEffect(() => {
    if (reduced || !showBios) return;
    if (biosLines >= BIOS_LINE_COUNT) {
      const done = window.setTimeout(() => setShowBios(false), 420);
      return () => window.clearTimeout(done);
    }
    const tick = window.setTimeout(() => setBiosLines((n) => n + 1), biosLines === 0 ? 180 : 160);
    return () => window.clearTimeout(tick);
  }, [biosLines, reduced, showBios]);

  useEffect(() => {
    if (showBios || reduced || powered) return;
    let cancelled = false;
    let cleanup = () => {};

    void import("gsap").then(({ gsap }) => {
      if (cancelled) return;
      const carriage = document.getElementById("arm-carriage");
      const beam = document.getElementById("arm-beam");
      const head = document.getElementById("arm-head");
      const held = document.getElementById("held-part");
      const parts = document.querySelectorAll<SVGElement>(".module-chip");
      if (!carriage || !beam || !head || !held) {
        setPlaced(true);
        setPowered(true);
        return;
      }

      const play = (sound: "servo" | "relay") => {
        if (soundOnRef.current) audioRef.current?.[sound]();
      };

      gsap.set(parts, { opacity: 0 });
      gsap.set(held, { opacity: 0 });

      const tl = gsap.timeline({
        onComplete: () => {
          setPlaced(true);
          setPowered(true);
          if (soundOnRef.current) audioRef.current?.startFan();
        },
      });

      // Carriage x is relative to its rest position (board x = 800, above U1). The nozzle
      // tip sits at board y = 256 when the head is at rest, so reaching a pad at
      // board y means lowering the head by y - 256 and stretching the beam with it.
      const REST_X = 800;
      const NOZZLE_Y = 256;
      const FEEDER_X = 800;
      const reach = (dy: number, duration: number, ease = "power2.inOut") => {
        tl.to(head, { y: dy, duration, ease });
        tl.to(beam, { attr: { height: 120 + dy }, duration, ease }, "<");
      };

      const pickAndPlace = (partIndex: number, x: number, y: number) => {
        const part = parts[partIndex];
        tl.call(() => play("servo"));
        tl.to(carriage, { x: FEEDER_X - REST_X, duration: 0.45, ease: "power2.inOut" });
        reach(18, 0.16, "power2.in");
        tl.set(held, { opacity: 1 });
        reach(0, 0.14);
        tl.call(() => play("servo"));
        tl.to(carriage, { x: x - REST_X, duration: 0.55, ease: "power2.inOut" });
        reach(y - NOZZLE_Y, 0.28, "power2.in");
        tl.call(() => {
          play("relay");
          if (part) gsap.to(part, { opacity: 1, duration: 0.12 });
        });
        tl.set(held, { opacity: 0 });
        reach(0, 0.24);
      };

      pickAndPlace(0, 198, 184);
      pickAndPlace(1, 1188, 708);
      pickAndPlace(2, 1364, 430);
      tl.to(carriage, { x: FEEDER_X - REST_X, duration: 0.5, ease: "power2.inOut" });

      cleanup = () => {
        tl.kill();
        // A skip mid-assembly must not leave parts hidden by inline styles.
        gsap.set(parts, { clearProps: "opacity" });
        gsap.set(held, { opacity: 0 });
        gsap.set(carriage, { x: 0 });
        gsap.set(head, { y: 0 });
        gsap.set(beam, { attr: { height: 120 } });
      };
    });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [powered, reduced, showBios]);

  useEffect(() => {
    if (!powered) return;
    let cancelled = false;
    let cleanup = () => {};

    void Promise.all([import("gsap"), import("gsap/ScrollTrigger"), import("lenis")]).then(
      ([gsapModule, triggerModule, lenisModule]) => {
        if (cancelled || !storyRef.current || !boardRef.current) return;
        const gsap = gsapModule.gsap;
        const ScrollTrigger = triggerModule.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);
        const lenis = reduced
          ? null
          : new lenisModule.default({ duration: 1.05, smoothWheel: true });
        let frame = 0;
        const tick = (time: number) => {
          lenis?.raf(time);
          frame = requestAnimationFrame(tick);
        };
        if (lenis) frame = requestAnimationFrame(tick);

        const pulses = boardRef.current.querySelectorAll<SVGPathElement>(".current-pulses .pulse");
        // Le courant avance en continu et accélère avec le défilement.
        const flow = (time: number) => {
          const offset = -(time * 70 + window.scrollY * 0.8);
          pulses.forEach((pulse) => (pulse.style.strokeDashoffset = String(offset)));
        };
        if (!reduced) gsap.ticker.add(flow);

        if (!reduced) {
          // Plongée dans le processeur : la caméra zoome sur U1 (centre de la carte),
          // puis le silicium remplit l'écran et la suite du site se révèle.
          const dive = gsap.timeline({
            scrollTrigger: {
              trigger: storyRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.6,
            },
          });
          dive
            .to(heroRef.current, { opacity: 0, y: 40, duration: 0.18, ease: "none" }, 0)
            .to(
              boardRef.current,
              { scale: 9, transformOrigin: "50% 50%", duration: 1, ease: "power2.in" },
              0,
            )
            .fromTo(
              dieRef.current,
              { opacity: 0, scale: 0.6 },
              { opacity: 1, scale: 1, duration: 0.3, ease: "power1.out" },
              0.5,
            );
        }

        cleanup = () => {
          cancelAnimationFrame(frame);
          gsap.ticker.remove(flow);
          lenis?.destroy();
          ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
      },
    );

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [powered, reduced]);

  const toggleSound = async () => {
    if (!audioRef.current) audioRef.current = await createBoardAudio();
    if (soundOn) {
      audioRef.current.stopAll();
    } else {
      audioRef.current.boot();
      if (powered) audioRef.current.startFan();
    }
    setSoundOn((v) => !v);
  };

  return (
    <>
      <a
        href="#accueil"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-die focus:px-3 focus:py-2 focus:text-silk"
      >
        Aller à l’accueil
      </a>

      <div className="fixed right-3 top-3 z-50 flex items-center gap-2 sm:right-5 sm:top-5">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="board-nav"
          aria-label="Ouvrir le menu des sections"
          className="border-silk/25 bg-die/80 text-silk backdrop-blur-md hover:bg-pcb-light hover:text-silk"
        >
          <Menu />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => void toggleSound()}
          aria-label={soundOn ? "Couper le son" : "Activer le son"}
          className="border-silk/25 bg-die/80 text-silk backdrop-blur-md hover:bg-pcb-light hover:text-silk"
        >
          {soundOn ? <Volume2 /> : <VolumeX />}
        </Button>
        <Button
          variant="outline"
          onClick={skipBoot}
          className="border-silk/25 bg-die/80 px-3 font-mono text-[10px] uppercase tracking-[0.14em] text-silk hover:bg-pcb-light hover:text-silk sm:text-xs"
        >
          <SkipForward />
          <span className={powered ? "max-sm:sr-only" : undefined}>Passer le démarrage</span>
        </Button>
      </div>

      {menuOpen ? (
        <nav
          id="board-nav"
          className="fixed right-3 top-16 z-50 w-56 border border-silk/20 bg-die/92 p-3 font-mono text-[11px] uppercase tracking-[0.12em] text-silk backdrop-blur-md sm:right-5"
        >
          {SECTIONS.map((section) =>
            section.enabled ? (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="block border-b border-silk/10 py-2 text-led hover:text-silk"
                onClick={() => setMenuOpen(false)}
              >
                {section.label}
              </a>
            ) : (
              <span key={section.id} className="block border-b border-silk/10 py-2 text-silk/35">
                {section.label} · bientôt
              </span>
            ),
          )}
        </nav>
      ) : null}

      {showBios && !reduced ? <BiosScreen visibleCount={biosLines} /> : null}

      <section
        ref={storyRef}
        className="relative h-[320vh] motion-reduce:h-auto"
        aria-label="Mise sous tension de la carte"
      >
        <div id="accueil" className="sticky top-0 h-screen overflow-hidden bg-background">
          <div
            ref={boardRef}
            className={`board-zoom h-full w-full origin-center max-sm:h-[56%] max-sm:pt-14 ${powered ? "is-powered" : "is-cold"}`}
          >
            <div className="board-tilt h-full w-full">
              <Motherboard powered={powered} placed={placed || powered} />
            </div>
          </div>

          <div
            ref={dieRef}
            className="die-reveal pointer-events-none absolute inset-0 z-10 flex items-center justify-center p-5 opacity-0 sm:p-12"
            aria-hidden="true"
          >
            <div className="w-full max-w-5xl">
              <p className="mb-4 text-center font-mono text-[10px] uppercase tracking-[0.4em] text-copper-light sm:text-xs">
                U1 · plan du silicium
              </p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
                {SECTIONS.map((section, index) => (
                  <div
                    key={section.id}
                    className={`die-block ${section.enabled ? "is-active" : ""}`}
                  >
                    <span className="font-mono text-[9px] tracking-[0.2em] text-copper sm:text-[10px]">
                      BLK{index} · 0x{(index * 0x400).toString(16).toUpperCase().padStart(4, "0")}
                    </span>
                    <span className="mt-auto font-display text-sm uppercase tracking-[0.08em] text-silk sm:text-lg">
                      {section.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            ref={heroRef}
            className="pointer-events-none absolute inset-x-0 bottom-0 z-20 max-sm:bottom-auto max-sm:top-[52%] bg-gradient-to-t from-background via-background/70 to-transparent px-4 pb-6 pt-16 sm:pb-8"
          >
            <p className="text-center font-mono text-[10px] uppercase tracking-[0.28em] text-copper-light">
              U1 · FGNL · REV 3.0
            </p>
            <h1 className="mt-2 text-center font-display text-[clamp(2.1rem,7vw,5.4rem)] leading-[0.9] text-silk">
              {profile.name}
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-center text-sm text-silk/80 sm:text-base">
              {profile.tagline}
            </p>
            {powered ? (
              <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-led">
                Courant établi · défilez pour entrer dans le processeur
              </p>
            ) : (
              <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-copper">
                Assemblage SMT en cours
              </p>
            )}
            <div className="mt-4 flex justify-center">
              <a
                href="#modules"
                className="pointer-events-auto inline-flex items-center gap-2 border border-copper/60 bg-die/70 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-silk backdrop-blur-sm transition-colors hover:border-led hover:text-led focus-visible:outline-2 focus-visible:outline-led"
              >
                Voir les projets <ArrowDown className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="die-exit px-5 pb-16 pt-24 sm:px-8" aria-labelledby="suite-title">
        <div className="mx-auto max-w-3xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-copper-light">
            Phase 1 · Accueil
          </p>
          <h2 id="suite-title" className="mt-3 font-display text-4xl text-silk sm:text-5xl">
            La carte est sous tension.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-silk/75">
            {profile.school}. Je relie les backends et les interfaces aux cartes et aux
            microcontrôleurs. {profile.location}.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button className="bg-copper text-die hover:bg-copper-light" asChild>
              <a href={profile.github} target="_blank" rel="noreferrer">
                <Github /> Voir mon GitHub
              </a>
            </Button>
            <Button
              variant="outline"
              className="border-silk/25 bg-transparent text-silk hover:bg-pcb-light hover:text-silk"
              asChild
            >
              <a href={`mailto:${profile.email}`}>M’écrire</a>
            </Button>
          </div>
          <a
            href="#fiche"
            className="mt-12 inline-flex items-center gap-2 border-l-2 border-led pl-4 font-mono text-xs uppercase tracking-[0.16em] text-silk/70 hover:text-led"
          >
            Lire la fiche technique <ArrowDown className="size-4" />
          </a>
        </div>
      </section>
    </>
  );
}
