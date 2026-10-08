# Bilan individuel · Arthur Garnier (binôme b13)

## Niveau de départ

Absent le mardi (J2) : pas de positionnement écrit dans le carnet ce jour-là. Positionnement fait le mercredi (J3), au début de la reprise :

| Notion | Départ |
|---|---|
| Structure HTML | à l'aise |
| CSS et responsive | à l'aise |
| JavaScript | à l'aise |
| DOM et événements | à l'aise |
| Git | à l'aise |
| Tests | à l'aise |

## Deux acquis, chacun prouvé par un commit

1. **Échanger des données avec le serveur et gérer la panne.** Je sais écrire une route qui répond en JSON, son test, et l'appeler depuis la page avec `fetch`, `async`/`await` et `try`/`catch`. Si le serveur est arrêté, un message clair s'affiche au lieu d'un écran blanc.
   Preuves : `91da924` (route `/api/conseil` et son test), `32677ac` (`demanderConseil` dans `app.js`), `1aa95bb` (`afficherVersion` avec `reponse.ok` et « version indisponible »).

2. **Faire prouver le code par un test vu rouge d'abord.** J'écris le test à partir des critères, je le vois échouer pour la bonne raison (`does not provide an export named 'compterMots'`), puis j'écris le code qui le fait passer. Une casse volontaire (`return 1;`) fait bien rougir deux tests.
   Preuves : `7286884` (test: compterMots), puis `a2a4a5d` (feat: compterMots).

## Deux points à renforcer

1. **Git à deux** : branches, pull request et revue de la PR de l'autre, et résoudre un conflit sans perdre de travail. Je l'ai fait une fois (PR #1), pas encore assez pour être à l'aise.
2. **Expliquer le code sans éditeur** : le chemin exact d'un événement (`keydown`, puis `requestSubmit`, `submit`, `validateMessage`, `replyTo` ou `demanderConseil`, et enfin `renderMessages`), et pourquoi `textContent` protège mieux que `innerHTML`.

## Mon objectif

D'ici la soutenance de vendredi, expliquer éditeur fermé chaque fonction de `app.js`, `brain.js` et `view.js`, et refaire seul une route JSON avec son test.
