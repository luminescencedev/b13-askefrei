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

Les réglages du binôme (limite et deux mots) sont dans `cahier-personnel.json`, recopiés en haut de `brain.js`. On ne modifie jamais `tests/contrat/`, `browser/contrat.spec.js` ni `cahier-personnel.json`.
