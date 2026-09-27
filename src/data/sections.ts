/** Sections du site, dans l'ordre de la carte. `enabled` passe à true quand la phase est livrée. */
export const SECTIONS = [
  { id: "accueil", label: "Accueil", enabled: true },
  { id: "fiche", label: "Fiche technique", enabled: true },
  { id: "modules", label: "Modules", enabled: true },
  { id: "competences", label: "Bibliothèque", enabled: true },
  { id: "journal", label: "Journal de tests", enabled: true },
  { id: "contact", label: "Port COM", enabled: true },
] as const;
