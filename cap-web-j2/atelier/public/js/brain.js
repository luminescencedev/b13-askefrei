// Cap Web — cerveau à règles. Fonctions pures : aucun accès à la page.

// Réglages du binôme b13 : mêmes valeurs que cahier-personnel.json.
export const LIMITE = 240;

const MOTS = {
  orage: 'Un orage sur le trajet vers le campus ? Prenez un parapluie et consultez votre emploi du temps en ligne avant de partir.',
  bougie: 'Une bougie à souffler ? AskEfrei souhaite un joyeux anniversaire à toute la promo !'
};

const liste = Object.keys(MOTS).map((mot) => `« ${mot} »`).join(' et ');

const REPONSES = {
  salut: 'Bonjour ! Je suis Cap Web, un assistant à règles. Écrivez « aide » pour voir ce que je sais faire.',
  aide: `Je connais « salut », « aide », « test », et deux mots à moi : ${liste}.`,
  test: 'Test bien reçu : mes règles fonctionnent.',
  repli: 'Je ne connais pas encore cette phrase. Écrivez « aide » pour voir les mots que je connais.'
};

export function validateMessage(raw) {
  if (typeof raw !== 'string') {
    return { ok: false, error: 'Le message doit être du texte.' };
  }
  const value = raw.trim();
  if (value === '') {
    return { ok: false, error: 'Le message ne doit pas être vide.' };
  }
  if (value.length > LIMITE) {
    return { ok: false, error: `Le message doit contenir ${LIMITE} caractères au maximum.` };
  }
  return { ok: true, value };
}

export function replyTo(message) {
  const texte = String(message).trim().toLowerCase();
  if (texte === 'salut' || texte === 'bonjour') {
    return REPONSES.salut;
  }
  if (texte === 'aide') {
    return REPONSES.aide;
  }
  if (texte === 'test') {
    return REPONSES.test;
  }
  if (Object.hasOwn(MOTS, texte)) {
    return MOTS[texte];
  }
  // Message inconnu : une réponse de repli, distincte de « aide ».
  return REPONSES.repli;
}
