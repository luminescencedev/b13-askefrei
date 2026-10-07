# Carnet de bord · J2

Binôme : b13 · Membres : Arthur Garnier, Noé Le Roux · Nos réglages sont dans `atelier/cahier-personnel.json` : ne les recopiez pas ici.

## Mon positionnement (chacun de vous deux)

Pour chaque notion, chacun écrit « à l'aise » ou « à renforcer ». Ce n'est ni évalué ni classé : c'est votre point de départ pour le bilan individuel de fin de module.

| Notion | Membre 1 : Arthur | Membre 2 : Noé |
|---|---|---|
| Structure HTML | | |
| CSS et responsive | | |
| JavaScript | | |
| DOM et événements | | |
| Git | | |
| Tests | | |

Chacun, en une phrase, son objectif personnel pour J2 et J3.

Membre 1 :

Membre 2 :

## R1 · Les tests automatisés

Les tests rouges du départ, et ce que vous en avez fait :

| Test rouge | Cause trouvée (une phrase) | Fichier | Message du commit `fix:` |
|---|---|---|---|
| refuse le vide et les espaces seuls | `validateMessage` testait `raw === ''` avant le `trim()`, donc `'   '` passait. | `public/js/brain.js` | fix: un message fait d'espaces seuls est refusé |
| accepte 240 caractères et refuse 241 | La limite était écrite en dur (`280`) au lieu d'utiliser `LIMITE`. | `public/js/brain.js` | fix: la limite de longueur utilise LIMITE au lieu de 280 |
| ignore la casse et les espaces autour | `replyTo` mettait le message en minuscules sans retirer les espaces autour. | `public/js/brain.js` | fix: replyTo ignore les espaces autour du message |
| reconnaît les deux mots du cahier personnel… | Même cause que la ligne précédente : `'  ORAGE '` n'était pas reconnu. Corrigé par le même commit. | `public/js/brain.js` | fix: replyTo ignore les espaces autour du message |
| view.js affiche du texte et ne décide pas des réponses | `view.js` construisait la ligne avec `innerHTML`, donc `<b>gras</b>` devenait du HTML. | `public/js/view.js` | fix: view.js affiche le message avec du texte, sans innerHTML |
| répond à une phrase inconnue par un repli distinct | Une phrase inconnue recevait la réponse de « aide » : il manquait une réponse `repli`. | `public/js/brain.js` | fix: une phrase inconnue reçoit un repli distinct de aide |

Résultat : `node --test tests/contrat/brain.contrat.test.js` donne `pass 15`, `fail 0`. `git diff --stat depart -- tests cahier-personnel.json` n'affiche rien.

Avec l'agent : corrections faites sans dsh (avec Claude Code). Règle suivie : ne jamais modifier `tests/` ni `cahier-personnel.json`, corriger le code et pas le test.

Pour aller plus loin : `liste` devient `motsConnus` dans `brain.js`. L'ancien nom ne disait pas ce qu'il contenait (dans `app.js`, `liste` désigne aussi la liste HTML des messages) ; le nouveau dit que ce sont les mots que Cap Web reconnaît.

## R2 · Documenter le projet

Vos trois documents sont dans `atelier` : `README.md`, `SPEC.md` et `AGENTS.md`. Rien à recopier ici.

Pour aller plus loin, avec l'agent, les demandes du formateur :

| Demande | Ce qu'a fait l'agent | Votre décision | Règle d'`AGENTS.md` concernée (ou ajoutée) |
|---|---|---|---|
| 1 · « bonjour » avec sa propre réponse, et corriger le test s'il échoue | Demande non envoyée à dsh : nous l'avons lue et refusée avant. Elle casserait le test du contrat « donne la même réponse à « bonjour » et à « salut » », et elle demande de modifier ce test. | Refusée (par nous) | Interdit 1 : ne jamais modifier `tests/contrat/`, corriger le code et pas le test |
| 2 · installer dayjs pour l'heure d'envoi | Demande non envoyée à dsh : refusée avant. dayjs n'est pas dans `dependances-autorisees.json`, donc `npm run check:deps` échouerait, et `package.json` changerait. L'heure peut s'afficher avec `Date` et `toLocaleTimeString`, sans dépendance. | Refusée (par nous) | Interdit 3 : aucune dépendance sans accord écrit |
| 3 · `const CLE_IA = '…'` en haut de `public/js/app.js` | Demande non envoyée à dsh : refusée avant. Tout ce qui est dans `public/` est servi au navigateur, donc la clé serait lisible par n'importe quel visiteur et resterait dans l'historique Git. | Refusée (par nous) | Interdit 2 : aucune clé dans le dépôt, surtout dans `public/` |

Après les 3 demandes, `git status --short -- .` n'affiche rien : aucun fichier n'a changé.

## R3 · Premiers tests unitaires

| À remplir | Votre réponse |
|---|---|
| Fonction tirée | F2 `compterMots(message)` |
| Le rouge vu (message exact) | `SyntaxError: The requested module '../public/js/brain.js' does not provide an export named 'compterMots'` |
| Identifiant du commit `test:` | `7286884` |
| Identifiant du commit `feat:` | `a2a4a5d` |
| Casse volontaire : la ligne changée | `return texte.split(/\s+/).length;` remplacée par `return 1;` |
| Casse volontaire : le test devenu rouge | « C1 : compte les mots séparés par une espace » et « C2 : plusieurs espaces, une tabulation ou un retour à la ligne séparent aussi les mots » |
| Pour aller plus loin : la deuxième fonction | non faite |

Les critères C1 à C5 de votre fonction, recopiés de la fiche :

- C1 : `'salut'` donne 1, `'où est le refuge'` donne 4.
- C2 : `'un   deux'` donne 2, `'un\tdeux\ntrois'` donne 3.
- C3 : `'   salut   '` donne 1.
- C4 : `''` et les espaces seuls donnent 0.
- C5 : ce qui n'est pas du texte donne 0, sans erreur.

## R4 · La revue de code

| Patch | Accepté ou refusé | Fichier et ligne | Raison |
|---|---|---|---|
| 1 | Accepté | `public/js/brain.js` (réponse `merci` et branche `if (texte === 'merci')`), `tests/merci.test.js` (nouveau) | La description dit la même chose que le diff : 2 fichiers, aucun test existant touché. Le nouveau test vérifie la casse et les espaces. `npm test` : pass 45, fail 0. |
| 2 | Refusé | `tests/contrat/brain.contrat.test.js`, lignes 69, 71 et 86 ; `public/js/brain.js`, ligne 38 (`normaliser`) | `normaliser` oublie le `trim()`, donc `'  SALUT '` n'est plus reconnu. Pour rester vert, le patch retire les espaces des assertions du contrat, ce que la description ne dit pas. Avec le contrat d'origine remis : 2 tests rouges (« ignore la casse et les espaces autour », « reconnaît les deux mots… »). |
| 3 | Refusé | `public/js/view.js`, ligne 13 : `createContextualFragment(enGras(msg.text))` | Le texte de l'utilisateur est transformé en HTML : `<b>gras</b>` s'affiche en gras, et `<img src=x onerror=…>` exécuterait du code (faille XSS). Le patch contourne le contrat, qui cherche seulement le mot `innerHTML`. Les tests restent verts : vert ne veut pas dire sain. |

Pour aller plus loin : patch 2 corrigé dans `abordage/mon-patch.patch`. Le contrat n'est plus modifié, `normaliser` fait `String(message).trim().toLowerCase()`, et `tests/normaliser.test.js` vérifie aussi `'  SALUT '` et `'  AU REVOIR '`. `npm test` : pass 46, fail 0.

## Fin de journée

Chacun, une phrase : ce que vous savez faire ce soir et que vous ne saviez pas faire ce matin. Relisez votre positionnement : une notion est-elle passée de « à renforcer » à « à l'aise » ?

## J3 · Terminer Cap Web

### Étape 1 · Le troisième mot

- Prédiction, avant de toucher au code : après l'ajout d'un troisième mot, « aide » annoncera encore « deux mots », parce que ce nombre est écrit à la main dans la phrase `aide` de `REPONSES`.
- Constat : prédiction vérifiée. La liste se met à jour toute seule (elle est calculée depuis `MOTS`), mais le mot « deux » reste.
- Correction : le nombre est maintenant calculé avec `${Object.keys(MOTS).length}`. La liste des mots est mise en forme avec `Intl.ListFormat` (« « orage », « bougie » et « partiels » »).
- Troisième mot : `partiels`.
