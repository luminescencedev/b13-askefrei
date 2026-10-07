# AskEfrei (projet Cap Web)

## À quoi sert AskEfrei

AskEfrei est un assistant de discussion pour les étudiants d'une école d'ingénieurs, construit par le binôme b13 (Arthur Garnier, Noé Le Roux) pendant le module « Renforcement Dev Web ».
Il répond avec des règles écrites à la main, pas avec une IA réelle : « salut » (ou « bonjour »), « aide », « test », trois mots à lui (« orage », « bougie », « partiels »), et « conseil », qui demande un conseil du jour au serveur.
Un message vide ou de plus de 240 caractères est refusé avec une erreur visible, le texte reste du texte (jamais du HTML), et la conversation est gardée dans le navigateur. La page fonctionne au clavier, sur téléphone et en thème sombre.

## Installer

Il faut Node.js 24.20 ou plus et Git. Depuis le dossier où vous rangez vos projets :

```sh
git clone https://github.com/luminescencedev/b13-askefrei.git
cd b13-askefrei/cap-web-j2/atelier
node --version
npm ci
```

`npm ci` installe exactement les versions de `package-lock.json`. Il annonce une vulnérabilité dans les outils de développement : ne lancez pas `npm audit fix`.

## Lancer

Dans `cap-web-j2/atelier` :

```sh
npm start
```

Ouvrez http://127.0.0.1:3000 dans le navigateur. Ctrl+C arrête le serveur. Si le port 3000 est déjà pris, choisissez-en un autre : `PORT=3001 npm start` (sous PowerShell : `$env:PORT=3001`, puis `npm start`).

## Tester

Dans `cap-web-j2/atelier` :

```sh
npm test
npm run lint
```

`npm test` lance les tests Node (contrat du formateur, `compterMots`, `/api/conseil`, serveur) et doit afficher `fail 0`. `npm run lint` ne doit rien signaler.

Les tests navigateur sont facultatifs. Ils téléchargent Chromium la première fois (environ 150 Mo) :

```sh
npx playwright install chromium
npm run test:browser
```

## Les 3 modules de `public/js`

- `brain.js` : le cerveau. Fonctions pures, sans accès à la page : `validateMessage` vérifie un message (du texte, non vide, `LIMITE` caractères au plus après `trim`), `replyTo` choisit la réponse, `compterMots` compte les mots.
- `view.js` : l'affichage. `renderMessages` fabrique une ligne `li` par message avec `textContent`, sans jamais injecter de HTML.
- `app.js` : le câblage. Il écoute le formulaire (Entrée envoie, Maj+Entrée va à la ligne), le compteur et le bouton « Effacer ». Il appelle `brain.js`, garde l'historique dans `localStorage` (clé `capweb.historique`), demande l'affichage à `view.js`, et appelle le serveur avec `fetch` (`afficherVersion`, `demanderConseil`).

## La route `/api/conseil`

`GET /api/conseil` renvoie un conseil tiré au hasard parmi trois, en JSON :

```json
{ "conseil": "Relisez vos notes de cours le soir même : dix minutes suffisent pour retenir bien plus." }
```

Statut 200, en-tête `content-type: application/json; charset=utf-8`. Dans la page, le message « conseil » appelle cette route avec `fetch`. Si le serveur ne répond pas, AskEfrei affiche « Le serveur ne répond pas : conseil indisponible. » au lieu de planter. Elle est vérifiée par `tests/conseil.test.js`.

Le serveur sert aussi `GET /version.json` (`{ "version": "…" }`), affiché dans le pied de page, ou « version indisponible » en cas de panne.

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

## Règles du projet

Les réglages du binôme (limite 240 et deux mots) sont dans `cahier-personnel.json`, recopiés en haut de `brain.js`. On ne modifie jamais `tests/contrat/`, `browser/contrat.spec.js` ni `cahier-personnel.json`. Les conventions et les interdits sont dans [AGENTS.md](AGENTS.md), et la spécification dans [SPEC.md](SPEC.md).
