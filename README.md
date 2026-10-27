# Frankel's Citadel Portfolio

Crée mon portfolio de développeur. Construis-le SECTION PAR SECTION : commence uniquement par la PHASE 1, montre-la-moi, et attends que je te dise « phase suivante » avant de continuer.

# Qui je suis
Frankel GNONLONFIN, étudiant en L3 informatique (Systèmes embarqués et IoT) à l'IFRI, Université d'Abomey-Calavi, Bénin. Ancien stagiaire développeur chez Quant Studio SARL (applications pour des projets clients) et chez SCB Lafarge (développement web et administration réseau). Basé à Calavi, Bénin.
GitHub : https://github.com/Frankelc
Email : frankelgnonlonfin@gmail.com
Accroche : je construis du serveur jusqu'au silicium, des API web aux microcontrôleurs.

# Univers visuel (100 % original)
Site cinématographique et immersif : une humanité assiégée derrière des remparts colossaux face à des géants. Ambiance dark fantasy militaire, fin XIXe siècle.
- Les « Colosses » : géants de pierre et de bronze fissurés, braises rougeoyantes dans leurs failles, silhouettes massives dans la brume. Design minéral et mythologique.
- Trois remparts concentriques : Rempart d'Airain, Rempart de Cendre, Rempart du Cœur.
- Palette : brun cuir #6B4426, vert olive #4B5330, parchemin #E6DCC5, pierre #6D665B, rouge sang #8E2320, fond sombre #1D1914.
- Typo : « IM Fell English » (Google Fonts) pour les titres gravés, « Alegreya Sans » pour le texte.
- Matières : pierre, cuir cousu, métal riveté, parchemin, cire.
- Mon emblème personnel : un bouclier avec une tour et une épée croisées.
INTERDIT : tout personnage, logo, emblème, nom, image ou son tiré d'un anime, manga ou d'une autre œuvre existante.

# Stack
React + Vite + TypeScript + Tailwind. GSAP + ScrollTrigger pour la mise en scène au scroll, Lenis pour le défilement fluide, tsParticles pour braises et cendres, Howler.js pour le son (coupé par défaut, bouton pour l'activer). Images en WebP, chargement progressif. Responsive mobile. Respecte « prefers-reduced-motion » avec une version statique. Bouton « Passer l'intro » toujours visible.

# PHASE 1 : Intro et accueil
Écran noir, brume qui se lève sur un rempart gigantesque en contre-plongée, parallaxe à plusieurs couches (ciel de crépuscule, silhouette d'un Colosse dans la brume, rempart, tours avec bannières à mon emblème). Mon nom gravé dans la pierre du rempart, avec mon accroche. Au scroll : un Colosse frappe le mur, léger tremblement d'écran, éclats de pierre, puis le mur se fissure et s'ouvre sur la suite. Prévois un emplacement pour mon avatar (moi en recrue, uniforme de cuir et cape) que je fournirai en image.

# PHASE 2 : Fiche de recrue (à propos)
Un dossier sur parchemin avec sceau de cire « FG » : nom, formation, spécialité, affectation actuelle, service passé, base (Calavi, Bénin), emplacement pour mon avatar. À côté, 3 courts paragraphes sur moi.

# PHASE 3 : Rapports d'expédition (projets)
Chaque projet est un rapport de mission sur parchemin : titre, contexte, objectif, ce que j'ai fait, équipement (stack), tampon, lien.
1. IRIS : plateforme d'accès anticipé au salaire payée via Lightning. Bitcoin Mastermind Hackathon 2026, Cotonou, équipe de 5. Node.js, Express, Prisma, PostgreSQL, Next.js 14, Breez SDK. github.com/Frankelc/iris
2. MPME OS : logiciel de gestion pour PME béninoises (Quant Studio). Migration des appels API vers les Server Actions Next.js, audit des endpoints contre les failles IDOR. Django REST, PostgreSQL, Next.js, app mobile Flutter.
3. Smart Haven : interface de maison connectée pilotant un ESP32, avec firmware et hooks React. En ligne : https://smart-haven-ui.vercel.app
4. Momo Relay : API et clients Android natifs (Kotlin) qui interceptent et relaient les notifications de paiement Mobile Money. github.com/Frankelc/momo-relay-api
5. Queen Excellence 2026 : site de vote pour un concours de miss, en Next.js, avec un rapport de pentest rédigé sur ma propre application.
6. TontineChain : smart contract de tontine en Solidity. MIABE Hackathon 2026.
7. Baya Luxe : boutique en ligne avec routing et panier. En ligne : https://baya-luxe.vercel.app
8. Galaxie gestuelle : application web pilotée par reconnaissance de gestes.
9. Mon premier jeu 3D : jeu PC en cours de développement avec Godot 4 (GDScript).

# PHASE 4 : Arsenal (compétences)
Présente-les comme un râtelier d'armes ou un registre d'équipement, par catégories :
- Langages : JavaScript, TypeScript, Python, C, Kotlin, VHDL, GDScript
- Frontend : React, Next.js, Vite, Tailwind CSS, mobile-first
- Backend et données : Node.js/Express, Django REST, FastAPI, Prisma, PostgreSQL, JWT, WebSockets
- Mobile : Android natif (Kotlin), Flutter
- Embarqué : C bare-metal sur ATmega328P, ESP32, VHDL/FPGA (Quartus, ModelSim), Proteus
- Systèmes et réseau : POSIX en C (threads, sémaphores, FIFO), sous-réseaux, administration réseau
- Sécurité : CTF (pwn, reverse, forensics, crypto), audit d'API, rapports de pentest
- Automatisation : Playwright, bots Telegram déployés sur VPS
- Blockchain : Solidity, Lightning (Breez SDK, BTCPay Server, LNbits)
- DevOps : Docker, Docker Compose, VPS, Vercel, Netlify

# PHASE 5 : Faits d'armes (hackathons et CTF)
Registre militaire : Bitcoin Mastermind Hackathon 2026 (IRIS), MIABE Hackathon 2026 (TontineChain), Hack by IFRI 2026, HackerLab 2026 (CTF de l'ASIN, équipe Z3R0_D4Y), Meute Epihack (CTF d'Epitech Bénin).

# PHASE 6 : Ordre d'enrôlement (contact)
Au Rempart du Cœur. Un ordre sur parchemin avec sceau, texte « Un projet, un stage ou une équipe à compléter ? Enrôle-moi. », boutons « M'écrire » (mailto:frankelgnonlonfin@gmail.com) et « Voir mon GitHub ». Pied de page avec crédits des images et sons.

Contrainte finale : tout ce spectacle ne doit jamais empêcher un recruteur de voir mes projets en moins de 10 secondes.


## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
