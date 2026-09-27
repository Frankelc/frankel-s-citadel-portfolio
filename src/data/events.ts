/**
 * Journal de tests : hackathons et CTF. Chaque événement devient une impulsion sur l'analyseur
 * logique (CH1 pour les hackathons, CH2 pour les CTF), dans l'ordre du fichier.
 * `projectId` relie l'événement à un projet de projects.ts. Quand une information manque,
 * laisse TODO : la page affiche « [description à compléter] ».
 */
import { TODO } from "@/data/projects";

export type TestEvent = {
  id: string;
  name: string;
  kind: "hackathon" | "ctf";
  place?: string;
  organizer?: string;
  team?: string;
  /** Ce que j'y ai fait. */
  detail: string;
  projectId?: string;
};

export const events: TestEvent[] = [
  {
    id: "bitcoin-mastermind",
    name: "Bitcoin Mastermind Hackathon 2026",
    kind: "hackathon",
    place: "Cotonou",
    team: "Évolutics",
    detail: "IRIS : plateforme d’accès anticipé au salaire payée via le réseau Lightning.",
    projectId: "iris",
  },
  {
    id: "miabe",
    name: "MIABE Hackathon 2026",
    kind: "hackathon",
    detail: "TontineChain : smart contract de tontine en Solidity.",
    projectId: "tontinechain",
  },
  {
    id: "hack-by-ifri",
    name: "Hack by IFRI 2026",
    kind: "hackathon",
    detail: TODO,
    projectId: "owners-hack-ifri",
  },
  {
    id: "impact-social",
    name: "Hackathon impact social",
    kind: "hackathon",
    detail: "NAWIRI : j’ai écrit le script et le plan de tournage de la vidéo de pitch.",
    projectId: "nawiri",
  },
  {
    id: "hackerlab",
    name: "HackerLab 2026",
    kind: "ctf",
    organizer: "ASIN",
    team: "Z3R0_D4Y",
    detail: "Rapport d’enquête complet rédigé pour l’une des missions.",
  },
  {
    id: "meute-epihack",
    name: "Meute Epihack",
    kind: "ctf",
    organizer: "Epitech Bénin",
    detail: "CTF centré sur l’encodage et la cryptographie.",
  },
];
