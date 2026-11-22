// ══ Interface Maison Jayla 2026 : icônes fines à la place des émojis ══
// Remplace les émojis du menu, de la barre mobile et des titres de cartes par des icônes au trait (SVG intégrés, aucun appel externe).
// Ne s'exécute que si <body class="ui26">. Les émojis inconnus sont laissés tels quels.
(function () {
  const P = {
    cible: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    calcul: '<rect x="5" y="3" width="14" height="18" rx="2.5"/><path d="M8.5 7h7M8.5 11h.01M12 11h.01M15.5 11h.01M8.5 14.5h.01M12 14.5h.01M15.5 14.5h.01M8.5 18h.01M12 18h3.5"/>',
    graphe: '<path d="M3 20h18"/><path d="M7 16v-4M12 16V7M17 16v-7"/>',
    kanban: '<rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M9 4v16M15 4v9"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    dossier: '<path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H9l2 2.2h7.5A2.5 2.5 0 0 1 21 9.7v7.8a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5z"/>',
    calendrier: '<rect x="3" y="5" width="18" height="16" rx="2.5"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    menage: '<path d="M12 3.5l1.6 4.4 4.4 1.6-4.4 1.6L12 15.5l-1.6-4.4L6 9.5l4.4-1.6z"/><path d="M18.5 15l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z"/>',
    equipe: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M21.5 20a6.5 6.5 0 0 0-3.8-5.9"/>',
    immeuble: '<rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M9 7.5h.01M15 7.5h.01M9 11.5h.01M15 11.5h.01M9 15.5h.01M15 15.5h.01M10 21v-3h4v3"/>',
    outil: '<path d="M14.5 4.2a4.8 4.8 0 0 0-5.8 6.3L3.5 15.7a1.8 1.8 0 0 0 2.5 2.5l5.2-5.2a4.8 4.8 0 0 0 6.3-5.8l-2.7 2.7-2.4-.4-.4-2.4z"/>',
    courbe: '<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
    recu: '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6M9 16h3"/>',
    euro: '<path d="M17.5 6.5a7 7 0 1 0 0 11"/><path d="M4 10h9M4 14h9"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3.5 7l8.5 6 8.5-6"/>',
    photo: '<path d="M4 8h3l2-3h6l2 3h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/><circle cx="12" cy="13" r="3.5"/>',
    cycle: '<path d="M20 11a8 8 0 0 0-14.9-3M4 4v4h4"/><path d="M4 13a8 8 0 0 0 14.9 3M20 20v-4h-4"/>',
    coche: '<rect x="3" y="3" width="18" height="18" rx="4"/><path d="M8 12.2l2.8 2.8L16 9.5"/>',
    maison: '<path d="M3.5 10.5L12 4l8.5 6.5"/><path d="M5.5 9v11h13V9"/><path d="M10 20v-5.5h4V20"/>',
    pieces: '<ellipse cx="12" cy="6.5" rx="7" ry="3"/><path d="M5 6.5v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5M5 11.5v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5"/>',
    reglages: '<path d="M4 6h9M17 6h3M4 12h3M11 12h9M4 18h11M19 18h1"/><circle cx="15" cy="6" r="2"/><circle cx="9" cy="12" r="2"/><circle cx="17" cy="18" r="2"/>',
    profil: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    diplome: '<path d="M2 9.5L12 5l10 4.5L12 14z"/><path d="M6 11.5v4.5c3.3 2.6 8.7 2.6 12 0v-4.5M22 9.5V15"/>',
    sortie: '<path d="M9 21H5.5A2.5 2.5 0 0 1 3 18.5v-13A2.5 2.5 0 0 1 5.5 3H9"/><path d="M16 17l5-5-5-5M21 12H9"/>',
    plusmenu: '<circle cx="5" cy="12" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="19" cy="12" r="1.2"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    cloche: '<path d="M6 9a6 6 0 1 1 12 0c0 6.5 2.5 8.5 2.5 8.5h-17S6 15.5 6 9"/><path d="M10.2 20.5a2 2 0 0 0 3.6 0"/>',
    crayon: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>',
    cadenas: '<rect x="5" y="11" width="14" height="10" rx="2.5"/><path d="M8 11V7.5a4 4 0 0 1 8 0V11"/>',
    telecharger: '<path d="M12 4v11M7 10.5l5 5 5-5M5 20h14"/>',
    envoyer: '<path d="M12 20V9M7 13.5l5-5 5 5M5 4h14"/>',
    oeil: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    epingle: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    document: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>',
    fusee: '<path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2"/><path d="M9 15l-3-3c1-5 5-9 13-9 0 8-4 12-9 13z"/><circle cx="14.5" cy="9.5" r="1.5"/>',
    cle: '<circle cx="8" cy="15" r="4"/><path d="M10.8 12.2L20 3M16 7l3 3M14 9l2 2"/>',
    poignee: '<path d="M11 17l2 2a1.5 1.5 0 0 0 2-2"/><path d="M14 14l2.5 2.5a1.5 1.5 0 0 0 2-2L15 11"/><path d="M3 12l4-4 3 1 3-2 8 8-2 2"/><path d="M7 8l-4 4 6 6 2-2"/>',
    telephone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
    point: '<circle cx="12" cy="12" r="4"/>',
    loupe: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
  };
  const E = {
    '🎯': 'cible', '🧮': 'calcul', '📊': 'graphe', '📋': 'kanban', '✦': 'plus', '📁': 'dossier', '📂': 'envoyer',
    '📅': 'calendrier', '🗓': 'calendrier', '🧹': 'menage', '👷': 'equipe', '👥': 'equipe', '🏢': 'immeuble', '🔧': 'outil', '🛠': 'outil',
    '📈': 'courbe', '🧾': 'recu', '💶': 'euro', '📧': 'mail', '✉': 'mail', '📸': 'photo', '📷': 'photo', '🔄': 'cycle',
    '✅': 'coche', '🏠': 'maison', '🏡': 'maison', '💰': 'pieces', '⚙': 'reglages', '👤': 'profil', '🎓': 'diplome', '🚪': 'sortie',
    '⋯': 'plusmenu', '☰': 'menu', '🔔': 'cloche', '📝': 'crayon', '🔒': 'cadenas', '💾': 'telecharger', '👁': 'oeil',
    '📍': 'epingle', '📄': 'document', '🚀': 'fusee', '🤝': 'poignee', '📞': 'telephone', '🟢': 'point', '🔍': 'loupe', '🔑': 'cle', '⏳': 'cycle', '💼': 'immeuble',
  };
  const svg = (n) => `<svg class="ui-ico" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${P[n]}</svg>`;
  const nettoie = (t) => (t || '').replace(/[️‍]/g, '').trim();
  // Émoji en tête d'un texte (pictogrammes, symboles, drapeaux)
  const RE_TETE = /^([\p{Extended_Pictographic}☀-➿⬀-⯿✦⋯☰][️‍\p{Extended_Pictographic}]*)\s*/u;

  function icone(el) {
    if (el.querySelector('svg.ui-ico')) return;
    const k = nettoie(el.textContent);
    if (E[k]) el.innerHTML = svg(E[k]);
  }
  // Remplace l'émoji de tête d'un élément texte (titres de cartes, libellés de section, actions rapides)
  function tete(el, garder) {
    const n = [...el.childNodes].find(c => c.nodeType === 3 && c.textContent.trim());
    if (!n) return;
    const m = n.textContent.trimStart().match(RE_TETE);
    if (!m) return;
    const nom = E[nettoie(m[1])];
    n.textContent = n.textContent.trimStart().slice(m[0].length);
    if (garder && nom) n.parentNode.insertBefore(document.createRange().createContextualFragment(svg(nom)), n);
  }
  function passer(racine) {
    racine.querySelectorAll('.pi, .ni-icon, .md-ico, .mt-ico, .m-tab-icon, #demo-icon, .scard-hd > span:first-child, .drawer-item-icon').forEach(icone);
    racine.querySelectorAll('.sb-lbl').forEach(el => tete(el, false));
    racine.querySelectorAll('.tcard-title, .card-title, .scard-title, .modal-title, .btn, .md-item').forEach(el => tete(el, true));
    // Bouton Déconnexion de la barre du haut : icône + texte (texte masqué sur téléphone)
    racine.querySelectorAll('.topbar button[onclick="doLogout()"], .topbar .btn-logout').forEach(b => {
      if (b.querySelector('svg.ui-ico')) return;
      const t = b.textContent.trim();
      b.innerHTML = svg('sortie') + '<span class="ui-txt">' + t + '</span>';
      b.setAttribute('aria-label', t || 'Déconnexion');
    });
    const nb = document.getElementById('notif-btn');
    if (nb) {
      const t = [...nb.childNodes].find(c => c.nodeType === 3 && nettoie(c.textContent) === '🔔');
      if (t) t.replaceWith(document.createRange().createContextualFragment(svg('cloche')));
    }
  }
  function demarrer() {
    if (!document.body || !document.body.classList.contains('ui26')) return;
    passer(document);
    let attente = false;
    new MutationObserver(() => {
      if (attente) return; attente = true;
      requestAnimationFrame(() => { attente = false; passer(document); });
    }).observe(document.body, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', demarrer); else demarrer();
})();
