# Spécification d'AskEfrei

Chaque critère dit ce que fait AskEfrei, puis ce qui le vérifie. Les noms de tests viennent de `tests/contrat/brain.contrat.test.js` et `browser/contrat.spec.js`.

1. Quand on envoie 241 caractères, AskEfrei refuse et l'erreur cite 240 ; 240 caractères sont acceptés.
   Vérifié par : test « accepte 240 caractères et refuse 241 ».

2. Quand on envoie un message vide ou fait seulement d'espaces, AskEfrei refuse, affiche une erreur dans `#status` et n'ajoute aucune ligne à la conversation.
   Vérifié par : test « refuse le vide et les espaces seuls », et test navigateur « un message fait d'espaces est refusé avec une erreur visible ».

3. Quand on envoie « orage » ou « bougie », quelles que soient la casse et les espaces autour (par exemple « ␣␣ORAGE␣ »), AskEfrei répond la phrase propre à ce mot, différente de celles de salut, aide et test.
   Vérifié par : test « reconnaît les deux mots du cahier personnel, quelles que soient la casse et les espaces autour ».

4. Quand on envoie une phrase qu'il ne connaît pas, AskEfrei répond un repli qui renvoie vers « aide », différent des réponses à salut, aide et test.
   Vérifié par : test « répond à une phrase inconnue par un repli distinct ».

5. Quand on envoie `<b>gras</b>`, AskEfrei l'affiche tel quel, chevrons compris : aucun élément `b` n'apparaît dans la conversation.
   Vérifié par : test « view.js affiche du texte et ne décide pas des réponses », et test navigateur « le texte reste du texte, jamais du HTML ».
