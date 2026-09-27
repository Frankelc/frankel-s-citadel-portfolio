export const profile = {
  name: "Frankel Gnonlonfin",
  boardRef: "FRANKEL-GNONLONFIN REV 3.0",
  tagline: "Je construis du serveur jusqu’au silicium, des API web aux microcontrôleurs.",
  location: "Calavi, Bénin",
  school: "L3 informatique · Systèmes embarqués et IoT · IFRI, Université d’Abomey-Calavi",
  github: "https://github.com/Frankelc",
  email: "frankelgnonlonfin@gmail.com",
  // Déposer l'image dans public/ (ex. public/avatar.webp) puis mettre "/avatar.webp" ici.
  // Tant que la valeur est null, un emplacement « J1 AVATAR » s'affiche sur la carte.
  avatar: "/avatar.webp" as string | null,
  avatarAlt: "Portrait de Frankel Gnonlonfin, casque audio sur les oreilles, concentré",
};

/** Contenu de la fiche technique (phase 2). */
export const datasheet = {
  reference: "FRANKEL-GNONLONFIN",
  characteristics: [
    {
      param: "Formation",
      value: ["Licence 3 en informatique, IFRI, Université d’Abomey-Calavi"],
    },
    { param: "Spécialité", value: ["Systèmes embarqués et Internet des objets"] },
    {
      param: "États de service",
      value: [
        "Stage · Quant Studio SARL : applications pour des projets clients",
        "Stage · SCB Lafarge : développement web et administration réseau",
      ],
    },
    { param: "Localisation", value: ["Calavi, Bénin"] },
  ],
  description: [
    "Je travaille aux deux extrémités de la machine : les applications web que les gens utilisent, et le code bas niveau qui parle directement au matériel.",
    "Côté web, je conçois des backends Django, Node.js et FastAPI et des interfaces React et Next.js. Côté embarqué, j’écris du C bare-metal sur microcontrôleur et je décris du matériel en VHDL.",
    "Entre les deux, je participe à des hackathons et des CTF, parce que c’est là qu’on apprend le plus vite.",
  ],
  /** Brochage : broches 1 à 8 à gauche (de haut en bas), 9 à 16 à droite (de bas en haut). */
  pins: [
    { name: "WEB", fn: "Interfaces React et Next.js" },
    { name: "API", fn: "Backends Django, Node.js, FastAPI" },
    { name: "DB", fn: "PostgreSQL, Prisma" },
    { name: "MOB", fn: "Android natif (Kotlin), Flutter" },
    { name: "MCU", fn: "C bare-metal sur microcontrôleur" },
    { name: "HDL", fn: "Description matérielle en VHDL" },
    { name: "NET", fn: "Administration réseau" },
    { name: "GND", fn: "Masse · Calavi, Bénin" },
    { name: "RX", fn: "GitHub · Frankelc" },
    { name: "TX", fn: "Email · frankelgnonlonfin@gmail.com" },
    { name: "IOT", fn: "ESP32, capteurs, maison connectée" },
    { name: "LN", fn: "Paiements Lightning" },
    { name: "HACK", fn: "Hackathons" },
    { name: "SEC", fn: "CTF et audit d’API" },
    { name: "EDU", fn: "L3 IFRI · Embarqué et IoT" },
    { name: "VCC", fn: "Alimentation : curiosité" },
  ],
};
