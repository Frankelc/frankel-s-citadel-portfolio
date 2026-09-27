/**
 * Bibliothèque de composants (compétences). Chaque catégorie est une zone de la carte et
 * chaque compétence un composant. `projects` liste les identifiants de projets (voir
 * projects.ts) qui prouvent la compétence : au clic, ces projets s'allument dans les modules
 * et la nomenclature se filtre dessus. Laisse la liste vide plutôt que d'inventer un lien.
 * `note` sert pour une preuve qui n'est pas un projet (stage, cours).
 */
import { projects } from "@/data/projects";

export type Skill = {
  id: string;
  name: string;
  projects: string[];
  note?: string;
};

export type SkillZone = {
  id: string;
  title: string;
  zone: string;
  prefix: string;
  skills: Skill[];
};

const deployedOn = (host: string) =>
  projects.filter((project) => project.live?.includes(host)).map((project) => project.id);

const publicRepos = projects
  .filter((project) => project.github && !project.repoPrivate)
  .map((project) => project.id);

export const skillZones: SkillZone[] = [
  {
    id: "langages",
    title: "Langages",
    zone: "Zone CPU · cœur logique",
    prefix: "L",
    skills: [
      {
        id: "javascript",
        name: "JavaScript",
        projects: ["iris", "tiktok-bot", "smart-haven", "unstim-etudiant"],
      },
      { id: "typescript", name: "TypeScript", projects: ["mobile-shop", "campus-connect-hub"] },
      {
        id: "python",
        name: "Python",
        projects: ["mpme-os", "microrisk", "crypto-bot", "uniplan-scheduler", "projetpython"],
      },
      {
        id: "c",
        name: "C",
        projects: [],
        note: "C bare-metal sur microcontrôleur et programmation POSIX.",
      },
      { id: "kotlin", name: "Kotlin", projects: ["momo-relay"] },
      { id: "dart", name: "Dart", projects: ["mpme-os"] },
      { id: "solidity", name: "Solidity", projects: ["tontinechain"] },
      { id: "vhdl", name: "VHDL", projects: [], note: "Description matérielle sur FPGA." },
      { id: "gdscript", name: "GDScript", projects: ["jeu-3d"] },
      { id: "sql", name: "SQL", projects: ["iris", "mpme-os"] },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    zone: "Zone vidéo · sortie écran",
    prefix: "V",
    skills: [
      { id: "react", name: "React 18/19", projects: ["smart-haven", "unstim-etudiant"] },
      {
        id: "nextjs",
        name: "Next.js 14/15",
        projects: ["iris", "mpme-os", "queen-excellence", "thesigenix", "its-cool"],
      },
      { id: "vite", name: "Vite", projects: ["unstim-etudiant"] },
      { id: "tailwind", name: "Tailwind CSS", projects: ["thesigenix"] },
      { id: "responsive", name: "Responsive mobile-first", projects: ["google-tv"] },
    ],
  },
  {
    id: "backend",
    title: "Backend et API",
    zone: "Zone bus · contrôleur",
    prefix: "B",
    skills: [
      { id: "node", name: "Node.js / Express", projects: ["iris", "tiktok-bot"] },
      { id: "drf", name: "Django REST Framework", projects: ["mpme-os"] },
      { id: "fastapi", name: "FastAPI", projects: ["microrisk"] },
      { id: "prisma", name: "Prisma", projects: ["iris"] },
      { id: "sqlalchemy", name: "SQLAlchemy + Alembic", projects: [] },
      { id: "jwt", name: "JWT", projects: [] },
      { id: "websockets", name: "WebSockets", projects: [] },
      { id: "server-actions", name: "Server Actions Next.js", projects: ["mpme-os"] },
    ],
  },
  {
    id: "data",
    title: "Bases de données et data",
    zone: "Zone mémoire",
    prefix: "M",
    skills: [
      { id: "postgresql", name: "PostgreSQL", projects: ["iris", "mpme-os"] },
      { id: "bigquery", name: "Google BigQuery", projects: [] },
      { id: "pandas", name: "pandas", projects: ["crypto-bot"] },
    ],
  },
  {
    id: "mobile",
    title: "Mobile",
    zone: "Zone radio mobile",
    prefix: "RF",
    skills: [
      {
        id: "android",
        name: "Android natif (Kotlin, Gradle, services en arrière-plan)",
        projects: ["momo-relay"],
      },
      { id: "flutter", name: "Flutter", projects: ["mpme-os"] },
    ],
  },
  {
    id: "embarque",
    title: "Embarqué et IoT",
    zone: "Zone capteurs · GPIO",
    prefix: "G",
    skills: [
      { id: "atmega", name: "C bare-metal sur ATmega328P", projects: [] },
      { id: "esp32", name: "ESP32", projects: ["smart-haven"] },
      { id: "timers", name: "Timers et interruptions", projects: [] },
      { id: "fpga", name: "VHDL / FPGA (Quartus, ModelSim)", projects: [] },
      { id: "proteus", name: "Proteus", projects: [] },
      { id: "grafcet", name: "Grafcet", projects: ["grafcet"] },
    ],
  },
  {
    id: "systemes",
    title: "Systèmes et réseau",
    zone: "Zone réseau · PHY",
    prefix: "N",
    skills: [
      {
        id: "posix",
        name: "POSIX en C (threads, sémaphores, FIFO, processus)",
        projects: [],
      },
      { id: "subnets", name: "Sous-réseaux", projects: [] },
      {
        id: "netadmin",
        name: "Administration réseau",
        projects: [],
        note: "Stage chez SCB Lafarge : développement web et administration réseau.",
      },
    ],
  },
  {
    id: "securite",
    title: "Cybersécurité",
    zone: "Zone sécurité · coffre",
    prefix: "S",
    skills: [
      {
        id: "ctf",
        name: "CTF (pwn, reverse, forensics, crypto)",
        projects: ["plateforme-ctf", "ctf-challenges"],
      },
      { id: "api-audit", name: "Audit d’API (IDOR, contrôle d’accès)", projects: ["mpme-os"] },
      { id: "pentest", name: "Rapports de pentest", projects: ["queen-excellence"] },
      { id: "hardening", name: "Durcissement d’API", projects: [] },
    ],
  },
  {
    id: "blockchain",
    title: "Blockchain et paiements",
    zone: "Zone crypto · paiements",
    prefix: "X",
    skills: [
      { id: "solidity-sc", name: "Solidity", projects: ["tontinechain"] },
      {
        id: "lightning",
        name: "Lightning Network (Breez SDK, BTCPay Server, LNbits)",
        projects: ["iris"],
      },
      { id: "mobile-money", name: "Intégration Mobile Money", projects: ["momo-relay"] },
    ],
  },
  {
    id: "ia",
    title: "IA et vision",
    zone: "Zone coprocesseur",
    prefix: "A",
    skills: [
      { id: "ml", name: "Machine learning (FastAPI)", projects: ["microrisk"] },
      { id: "gestures", name: "Reconnaissance de gestes", projects: ["galaxie-gestuelle"] },
    ],
  },
  {
    id: "automatisation",
    title: "Automatisation",
    zone: "Zone horloge · séquenceur",
    prefix: "T",
    skills: [
      { id: "playwright", name: "Playwright", projects: ["tiktok-bot"] },
      { id: "telegram", name: "Bots Telegram", projects: ["bot-bac"] },
      { id: "imap", name: "Automatisation email / IMAP", projects: ["suivi-aliexpress"] },
      { id: "ccxt", name: "Trading algorithmique (ccxt)", projects: ["crypto-bot"] },
    ],
  },
  {
    id: "outils",
    title: "Extensions et outils",
    zone: "Zone périphériques",
    prefix: "P",
    skills: [{ id: "mv3", name: "Extensions Chrome Manifest V3", projects: ["adshield"] }],
  },
  {
    id: "jeu",
    title: "Jeu vidéo",
    zone: "Zone GPU",
    prefix: "GP",
    skills: [{ id: "godot", name: "Godot 4", projects: ["jeu-3d"] }],
  },
  {
    id: "devops",
    title: "DevOps",
    zone: "Zone alimentation",
    prefix: "PS",
    skills: [
      { id: "docker", name: "Docker", projects: ["microrisk"] },
      { id: "compose", name: "Docker Compose", projects: [] },
      { id: "vps", name: "VPS (LWS)", projects: ["bot-bac"] },
      { id: "vercel", name: "Vercel", projects: deployedOn("vercel.app") },
      { id: "netlify", name: "Netlify", projects: deployedOn("netlify.app") },
      { id: "git", name: "Git / GitHub", projects: publicRepos },
    ],
  },
];
