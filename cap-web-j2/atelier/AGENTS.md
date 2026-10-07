# Conventions du projet AskEfrei

Ces règles valent pour toute personne et tout agent qui modifie ce dossier.

## Nommage

- Une fonction porte un verbe qui dit ce qu'elle fait, en camelCase : `validateMessage`, `renderMessages`, `afficherVersion`.
- Une constante de réglage s'écrit en majuscules : `LIMITE`, `MOTS`, `REPONSES`.
- Une variable dit ce qu'elle contient, pas son type : `motsConnus` plutôt que `liste`.
- Un fichier JavaScript porte un nom court en minuscules qui dit son rôle : `brain.js` (règles), `view.js` (affichage), `app.js` (câblage). Un test s'appelle `tests/<sujet>.test.js`.
- Un message de commit commence par son type, puis dit ce qui change, en français : `fix:`, `feat:`, `test:`, `docs:`, `refactor:`. Exemple : `fix: un message fait d'espaces seuls est refusé`.

## Interdits

1. Ne modifie jamais `tests/contrat/`, `browser/contrat.spec.js` ni `cahier-personnel.json`. Si un test te semble faux, arrête-toi et explique pourquoi : on corrige le code, jamais le test pour qu'il accepte un nouveau comportement.
2. N'écris jamais de clé, de mot de passe, de jeton ou de donnée personnelle dans un fichier du dépôt, en particulier dans `public/` (tout ce qui y est servi est lisible par n'importe qui).
3. N'ajoute aucune dépendance (`npm install`) sans accord écrit du binôme : la liste autorisée est `dependances-autorisees.json`, et `package.json` ne change pas sans raison.
4. N'injecte jamais de HTML : pas de `innerHTML`, `outerHTML` ni `insertAdjacentHTML`. Un texte d'utilisateur s'affiche avec `textContent`.
5. `brain.js` reste pur : aucun accès à `document`, `window` ni `localStorage`. La création des lignes `li` appartient à `view.js`.
6. Ne modifie que les fichiers cités dans la demande, et dis lesquels tu as touchés.
