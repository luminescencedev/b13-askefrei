# AskEfrei (projet Cap Web)

## À quoi sert AskEfrei

AskEfrei est un assistant de discussion pour les étudiants d'une école d'ingénieurs, construit pendant le module « Renforcement Dev Web ».
Il répond avec des règles écrites à la main (pas une IA réelle) : « salut », « aide », « test » et deux mots propres au binôme b13.
Les messages restent du texte, la conversation est gardée dans le navigateur, et un contrat de tests vérifie chaque règle.

## Installer et lancer

Il faut Node.js 24.20 ou plus. Dans un terminal ouvert dans le dossier `atelier` :

```sh
node --version
npm ci
npm start
```

Ouvrez ensuite http://127.0.0.1:3000 dans le navigateur. Ctrl+C arrête le serveur.

Pour lancer les tests et le contrôle du code (dans `atelier`) :

```sh
npm test
npm run lint
```

## Les 3 modules de `public/js`

- `brain.js` : le cerveau. Fonctions pures (aucun accès à la page) : `validateMessage` vérifie un message (texte, non vide, `LIMITE` caractères au plus), `replyTo` choisit la réponse.
- `view.js` : l'affichage. `renderMessages` fabrique une ligne `li` par message avec `textContent`, sans jamais injecter de HTML.
- `app.js` : le câblage. Il écoute le formulaire et le bouton « Effacer », appelle `brain.js`, garde l'historique dans `localStorage` (clé `capweb.historique`) et demande l'affichage à `view.js`.

## Arborescence

```text
atelier/
├── public/                  ce que le navigateur reçoit
│   ├── index.html           la page : formulaire, conversation, compteur, pied de page
│   ├── styles.css           mise en page, version mobile (< 600 px) et thème sombre
│   └── js/
│       ├── app.js           câblage : événements, historique, fetch de /version.json et /api/conseil
│       ├── brain.js         règles pures : validateMessage, replyTo, compterMots
│       └── view.js          affichage : renderMessages, en texte seulement
├── server/
│   ├── app.js               serveur HTTP : fichiers publics, /version.json, /api/conseil
│   └── start.js             lance le serveur sur 127.0.0.1:3000 (npm start)
├── tests/                   tests Node (npm test)
│   ├── contrat/             contrat du formateur : ne jamais modifier
│   ├── harnais/             tests des scripts de contrôle
│   ├── compterMots.test.js  critères C1 à C5 de compterMots
│   ├── conseil.test.js      la route /api/conseil répond en JSON
│   └── server.test.js       le serveur sert les bons fichiers
├── browser/                 tests navigateur Playwright (npm run test:browser)
├── scripts/                 contrôles : dépendances, tests modifiés, build statique
├── cahier-personnel.json    réglages du binôme b13 : ne jamais modifier
├── AGENTS.md                conventions et interdits du projet
├── SPEC.md                  5 critères, chacun avec sa vérification
└── package.json             scripts npm et dépendances de développement
```

Les réglages du binôme (limite et deux mots) sont dans `cahier-personnel.json`, recopiés en haut de `brain.js`. On ne modifie jamais `tests/contrat/`, `browser/contrat.spec.js` ni `cahier-personnel.json`.
