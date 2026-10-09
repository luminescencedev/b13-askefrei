# Bilan individuel · Noé Le Roux (binôme b13)

## Niveau de départ

Positionnement écrit dans le carnet de J2 :

| Notion | Départ |
|---|---|
| Structure HTML | à l'aise |
| CSS et responsive | à l'aise |
| JavaScript | à l'aise |
| DOM et événements | à l'aise |
| Git | à l'aise |
| Tests | à l'aise |

## Deux acquis, chacun prouvé par un commit

1. **CSS avec variables et accessibilité.** Je sais changer l'apparence de toute la page en ne modifiant que les variables de `:root`, en thème clair comme en thème sombre. Je choisis une couleur en vérifiant son contraste avec le texte du bouton : `#00695c` sur du blanc donne 6,61:1, au-dessus du minimum de 4,5:1.
   Preuve : `8a07749` (feat: nouvelle couleur, pull request #2).

2. **Relire du code.** Dans la pull request #1 d'Arthur, j'ai vérifié que l'annonce correspondait au diff, j'ai lancé les tests (pass 50, fail 0), et j'ai laissé un commentaire typé qui cite un fait précis : le README annonçait trois mots en haut, mais « deux mots » dans « Règles du projet ». Le défaut a été corrigé grâce à cette remarque.
   Preuve : ma relecture de la pull request #1, puis le correctif `17f2681`.

## Deux points à renforcer

1. **`fetch` avec `async`/`await` et la gestion des erreurs** : savoir expliquer pourquoi on teste `reponse.ok`, et ce que fait le `catch` quand le serveur est arrêté.
2. **Expliquer le JavaScript de la page éditeur fermé** : les événements (`keydown`, `submit`), et pourquoi le texte s'affiche avec `textContent` et jamais avec `innerHTML`.

## Mon objectif

D'ici la soutenance de vendredi, savoir expliquer seul ce qui se passe quand on envoie un message, de la touche Entrée jusqu'à l'affichage de la réponse.
