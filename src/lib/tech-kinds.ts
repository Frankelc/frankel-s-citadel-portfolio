/**
 * Chaque technologie d'un projet devient un vrai type de composant sur la mini-carte de sa
 * vue éclatée. Une techno inconnue devient un circuit logique générique.
 */
export type PartKind =
  "cpu" | "mem" | "disp" | "rf" | "mcu" | "sec" | "pwr" | "osc" | "gpu" | "io" | "logic";

export const PART_KIND_LABELS: Record<PartKind, string> = {
  cpu: "Contrôleur",
  mem: "Mémoire",
  disp: "Contrôleur d’écran",
  rf: "Module radio",
  mcu: "Microcontrôleur",
  sec: "Élément sécurisé",
  pwr: "Alimentation",
  osc: "Horloge",
  gpu: "Processeur graphique",
  io: "Connecteur",
  logic: "Circuit logique",
};

const RULES: [RegExp, PartKind][] = [
  [/postgres|prisma|sql|supabase|bigquery|pandas|mysql/i, "mem"],
  [/esp32|firmware|atmega|arduino/i, "mcu"],
  [/solidity|breez|lightning|btcpay|lnbits|crypto/i, "sec"],
  [/kotlin|android|flutter|dart/i, "rf"],
  [/react|next|vite|tailwind|html|css/i, "disp"],
  [/node|express|django|fastapi|flask|server actions/i, "cpu"],
  [/docker|vps|vercel|netlify|compose/i, "pwr"],
  [/playwright|ccxt|cron|bot/i, "osc"],
  [/godot|gdscript|three|webgl/i, "gpu"],
  [/telegram|chrome|manifest|api|websocket/i, "io"],
];

export function partKind(tech: string): PartKind {
  return RULES.find(([pattern]) => pattern.test(tech))?.[1] ?? "logic";
}
