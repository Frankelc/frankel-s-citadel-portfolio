import { useEffect, useRef, useState, type ComponentType, type CSSProperties } from "react";
import { ArrowDown, Github, Mail, Shield, SkipForward, Volume2, VolumeX } from "lucide-react";

import rempartImage from "@/assets/rempart-airain.webp";
import { Button } from "@/components/ui/button";

type ParticleLayer = ComponentType<Record<string, unknown>>;
type SoundHandle = { play: () => number; pause: () => unknown; fade: (from: number, to: number, duration: number) => unknown };

const particleOptions = {
  fullScreen: { enable: false },
  background: { color: { value: "transparent" } },
  fpsLimit: 40,
  particles: {
    color: { value: ["#8e2320", "#d4894a", "#e6dcc5"] },
    move: { enable: true, direction: "top", speed: { min: 0.25, max: 1.1 }, outModes: { default: "out" } },
    number: { value: 34, density: { enable: true } },
    opacity: { value: { min: 0.12, max: 0.65 } },
    shape: { type: "circle" },
    size: { value: { min: 0.6, max: 2.2 } },
  },
  detectRetina: true,
};

function Emblem({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 96" aria-label="Emblème de Frankel : tour et épée croisées" role="img">
      <path d="M40 3 72 16v30c0 22-14 38-32 47C22 84 8 68 8 46V16L40 3Z" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="m21 68 38-44M18 24l42 44M17 20l7 1-5 6m42-7-7 1 5 6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M31 31h18v27H31zM28 31l4-8 4 8 4-8 4 8 4-8 4 8M27 58h26" fill="none" stroke="currentColor" strokeWidth="3" />
    </svg>
  );
}

export function PhaseOne() {
  const storyRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const colossusRef = useRef<HTMLDivElement>(null);
  const crackRef = useRef<HTMLDivElement>(null);
  const debrisRef = useRef<HTMLDivElement>(null);
  const welcomeRef = useRef<HTMLElement>(null);
  const soundRef = useRef<SoundHandle | null>(null);
  const [soundOn, setSoundOn] = useState(false);
  const [ParticlesLayer, setParticlesLayer] = useState<ParticleLayer | null>(null);

  useEffect(() => {
    let cancelled = false;
    let cleanup = () => {};

    Promise.all([import("gsap"), import("gsap/ScrollTrigger"), import("lenis")]).then(
      ([gsapModule, triggerModule, lenisModule]) => {
        if (cancelled || !storyRef.current || !sceneRef.current) return;
        const gsap = gsapModule.gsap;
        const ScrollTrigger = triggerModule.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const lenis = reduced ? null : new lenisModule.default({ duration: 1.1, smoothWheel: true });
        let frame = 0;
        const tick = (time: number) => {
          lenis?.raf(time);
          frame = requestAnimationFrame(tick);
        };
        if (lenis) frame = requestAnimationFrame(tick);

        if (reduced) {
          gsap.set(crackRef.current, { opacity: 0.8, scaleY: 1 });
          gsap.set(debrisRef.current, { opacity: 0.45 });
        } else {
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: storyRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.55,
            },
          });
          timeline
            .to(imageRef.current, { scale: 1.08, yPercent: 4, duration: 3 }, 0)
            .to(colossusRef.current, { xPercent: 4, yPercent: 5, opacity: 0.9, duration: 2 }, 0.5)
            .to(sceneRef.current, { x: -8, duration: 0.06, repeat: 7, yoyo: true }, 2.7)
            .to(debrisRef.current, { opacity: 1, y: 90, rotation: 9, duration: 0.7 }, 2.72)
            .to(crackRef.current, { opacity: 1, scaleY: 1, duration: 0.6 }, 2.8)
            .to(crackRef.current, { filter: "brightness(2)", duration: 0.7 }, 3.25)
            .to(sceneRef.current, { opacity: 0.18, scale: 1.04, duration: 1.1 }, 4.05);
        }
        cleanup = () => {
          cancelAnimationFrame(frame);
          lenis?.destroy();
          ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
      },
    );

    import("@tsparticles/react").then(async (module) => {
      const { loadSlim } = await import("@tsparticles/slim");
      const Particles = module.default;
      const Provider = module.ParticlesProvider;
      const Layer = (props: Record<string, unknown>) => (
        <Provider init={loadSlim}>
          <Particles {...props} />
        </Provider>
      );
      if (!cancelled) setParticlesLayer(() => Layer as ParticleLayer);
    });

    return () => {
      cancelled = true;
      cleanup();
      soundRef.current?.pause();
    };
  }, []);

  const skipIntro = () => welcomeRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const toggleSound = async () => {
    if (!soundRef.current) {
      const { Howl } = await import("howler");
      soundRef.current = new Howl({ src: ["/rempart-ambience.wav"], loop: true, volume: 0 });
    }
    if (soundOn) {
      soundRef.current.fade(0.28, 0, 400);
      window.setTimeout(() => soundRef.current?.pause(), 420);
    } else {
      soundRef.current.play();
      soundRef.current.fade(0, 0.28, 700);
    }
    setSoundOn((current) => !current);
  };

  return (
    <main className="bg-background text-foreground">
      <div className="fixed right-4 top-4 z-50 flex items-center gap-2 sm:right-6 sm:top-6">
        <Button variant="outline" size="icon" onClick={toggleSound} aria-label={soundOn ? "Couper le son" : "Activer le son"} title={soundOn ? "Couper le son" : "Activer le son"} className="border-parchment/30 bg-background/60 text-parchment backdrop-blur-md hover:bg-parchment/10 hover:text-parchment">
          {soundOn ? <Volume2 /> : <VolumeX />}
        </Button>
        <Button variant="outline" onClick={skipIntro} className="border-parchment/30 bg-background/60 px-3 text-xs uppercase text-parchment backdrop-blur-md hover:bg-parchment/10 hover:text-parchment sm:px-4">
          <SkipForward /> Passer l’intro
        </Button>
      </div>

      <section ref={storyRef} className="relative h-[280vh]" aria-label="Le Rempart d’Airain">
        <div ref={sceneRef} className="intro-reveal sticky top-0 h-screen overflow-hidden bg-background">
          <img ref={imageRef} src={rempartImage} alt="Le Rempart d’Airain face à un colosse minéral dans la brume" width={1920} height={1080} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover object-[44%_center] sm:object-[62%_center]" />
          <div className="absolute inset-0 bg-scene-shade" />
          <div ref={colossusRef} className="absolute left-[11%] top-[7%] h-[44%] w-[26%] rounded-full bg-colossus-haze opacity-30 blur-2xl" />
          <div className="mist mist-one" /><div className="mist mist-two" />
          {ParticlesLayer ? <div className="pointer-events-none absolute inset-0 z-10"><ParticlesLayer id="embers" options={particleOptions} className="h-full w-full" /></div> : null}

          <div className="absolute inset-x-0 bottom-[12%] z-20 mx-auto flex max-w-5xl flex-col items-center px-5 text-center sm:bottom-[10%]">
            <div className="mb-4 flex items-center gap-3 text-parchment/70"><span className="h-px w-10 bg-current" /><Emblem className="h-14 w-12" /><span className="h-px w-10 bg-current" /></div>
            <p className="mb-2 text-xs font-semibold uppercase text-parchment/70 sm:text-sm">Rempart d’Airain · Dossier 01</p>
            <h1 className="stone-title text-[clamp(2.7rem,8vw,7.4rem)] leading-[0.83] text-parchment">Frankel<br /><span className="text-blood-light">Gnonlonfin</span></h1>
            <p className="mt-5 max-w-2xl text-base font-medium text-parchment/90 sm:text-xl">Je construis du serveur jusqu’au silicium,<br className="hidden sm:block" /> des API web aux microcontrôleurs.</p>
            <div className="mt-8 flex items-center gap-2 text-xs uppercase text-parchment/60"><ArrowDown className="animate-bounce" /> Défilez pour franchir le rempart</div>
          </div>

          <div ref={debrisRef} className="pointer-events-none absolute left-1/2 top-[43%] z-30 h-28 w-52 -translate-x-1/2 opacity-0">
            {[...Array(14)].map((_, index) => <i key={index} className="debris" style={{ "--i": index } as CSSProperties} />)}
          </div>
          <div ref={crackRef} className="crack absolute left-1/2 top-[31%] z-30 h-[62%] w-28 -translate-x-1/2 origin-top scale-y-0 opacity-0" aria-hidden="true" />
          <div className="absolute bottom-5 left-5 z-20 hidden text-[0.65rem] uppercase text-parchment/50 sm:block">Calavi · Bénin</div>
        </div>
      </section>

      <section ref={welcomeRef} className="relative min-h-screen scroll-mt-0 overflow-hidden border-t border-parchment/10 bg-welcome px-5 py-20 sm:px-8" aria-labelledby="welcome-title">
        <div className="absolute inset-x-0 top-0 h-px bg-rift" />
        <div className="mx-auto grid min-h-[78vh] max-w-6xl items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="recruit-frame relative mx-auto aspect-[4/5] w-full max-w-sm border border-parchment/20 bg-card p-4">
            <div className="flex h-full flex-col items-center justify-center border border-dashed border-parchment/25 bg-background/40 px-8 text-center">
              <Shield className="mb-5 h-12 w-12 text-blood-light" />
              <p className="font-display text-2xl text-parchment">Portrait de recrue</p>
              <p className="mt-2 text-sm text-muted-foreground">Emplacement réservé à votre image en uniforme de cuir et cape.</p>
            </div>
            <span className="absolute -right-3 -top-3 flex h-14 w-14 items-center justify-center rounded-full border-2 border-blood-light bg-blood font-display text-xl text-parchment shadow-seal">FG</span>
          </div>

          <div className="max-w-2xl">
            <p className="mb-4 text-xs font-bold uppercase text-blood-light">Transmission reçue · Phase I</p>
            <h2 id="welcome-title" className="font-display text-5xl leading-none text-parchment sm:text-7xl">Bienvenue derrière les remparts.</h2>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-parchment/75">Étudiant en systèmes embarqués et IoT, je relie les logiciels aux machines. Ici commence le registre de mes constructions, de mes missions et de mes expérimentations.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild className="bg-blood text-parchment hover:bg-blood/80"><a href="https://github.com/Frankelc" target="_blank" rel="noreferrer"><Github /> GitHub</a></Button>
              <Button asChild variant="outline" className="border-parchment/25 bg-transparent text-parchment hover:bg-parchment/10 hover:text-parchment"><a href="mailto:frankelgnonlonfin@gmail.com"><Mail /> M’écrire</a></Button>
            </div>
            <div className="mt-14 border-l-2 border-blood pl-5 text-sm text-muted-foreground"><span className="font-display text-lg text-parchment">Le registre continue bientôt.</span><br />Dites « phase suivante » pour ouvrir la fiche de recrue.</div>
          </div>
        </div>
      </section>
    </main>
  );
}
