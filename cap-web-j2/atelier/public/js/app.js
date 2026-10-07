// Cap Web — câblage : lire le formulaire, mettre à jour l'historique, demander l'affichage.
import { validateMessage, replyTo, LIMITE } from './brain.js';
import { renderMessages } from './view.js';

const formulaire = document.querySelector('#chat-form');
const champ = document.querySelector('#message');
const liste = document.querySelector('#messages');
const statut = document.querySelector('#status');
const effacer = document.querySelector('#effacer');
const versionElt = document.querySelector('#version');
const limiteElt = document.querySelector('#limite');
const compteur = document.querySelector('#compteur');

const CLE = 'capweb.historique';
const historique = [];

function sauvegarder() {
  localStorage.setItem(CLE, JSON.stringify(historique));
}

function charger() {
  const brut = localStorage.getItem(CLE);
  if (brut === null) {
    return;
  }
  try {
    const donnees = JSON.parse(brut);
    if (Array.isArray(donnees)) {
      historique.push(...donnees);
    }
  } catch {
    statut.textContent = 'Conversation précédente illisible : nouvelle conversation.';
  }
}

// Compteur « n / LIMITE » sous le champ.
function mettreAJourCompteur() {
  compteur.textContent = `${champ.value.length} / ${LIMITE}`;
}

champ.addEventListener('input', mettreAJourCompteur);

// Au clavier : Entrée envoie le message, Maj+Entrée va à la ligne.
champ.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) {
    event.preventDefault();
    formulaire.requestSubmit();
  }
});

// Demande un conseil au serveur ; en cas de panne, renvoie un message clair.
async function demanderConseil() {
  try {
    const reponse = await fetch('/api/conseil', { headers: { accept: 'application/json' } });
    if (!reponse.ok) {
      throw new Error(`HTTP ${reponse.status}`);
    }
    const donnees = await reponse.json();
    if (typeof donnees.conseil !== 'string') {
      throw new Error('conseil absent');
    }
    return donnees.conseil;
  } catch {
    return 'Le serveur ne répond pas : conseil indisponible.';
  }
}

formulaire.addEventListener('submit', async (event) => {
  event.preventDefault();
  const controle = validateMessage(champ.value);
  if (!controle.ok) {
    statut.textContent = controle.error;
    champ.focus();
    return;
  }
  historique.push({ role: 'user', text: controle.value });
  renderMessages(historique, liste);
  champ.value = '';
  mettreAJourCompteur();
  statut.textContent = '';
  champ.focus();
  const reponse = controle.value.toLowerCase() === 'conseil'
    ? await demanderConseil()
    : replyTo(controle.value);
  historique.push({ role: 'assistant', text: reponse });
  sauvegarder();
  renderMessages(historique, liste);
});

effacer.addEventListener('click', () => {
  if (!confirm('Effacer toute la conversation ?')) {
    return;
  }
  historique.length = 0;
  localStorage.removeItem(CLE);
  renderMessages(historique, liste);
  statut.textContent = 'Conversation effacée.';
});

// La limite vient de brain.js : un seul endroit à modifier.
champ.maxLength = LIMITE;
limiteElt.textContent = String(LIMITE);
mettreAJourCompteur();

charger();
renderMessages(historique, liste);

// Pied de page : la version vient du serveur ; en cas de panne, un message clair.
async function afficherVersion() {
  try {
    const reponse = await fetch('/version.json', { headers: { accept: 'application/json' } });
    if (!reponse.ok) {
      throw new Error(`HTTP ${reponse.status}`);
    }
    const donnees = await reponse.json();
    if (typeof donnees.version !== 'string') {
      throw new Error('version absente');
    }
    versionElt.textContent = `version ${donnees.version}`;
  } catch {
    versionElt.textContent = 'version indisponible';
  }
}

afficherVersion();
