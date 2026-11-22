// ══ ANNONCE — module commun (index.html et cohote.html) ══
// Construit le prompt de rédaction d'annonce à partir des données d'un dossier, sans appel à l'IA
// (aucune dépense) : on copie le prompt dans claude.ai. Le nom du propriétaire et l'adresse exacte
// ne sont jamais mis dans le prompt : seuls la ville et le quartier servent à l'annonce.
(function (g) {
  const LANGUES = {
    fr: { label: '🇫🇷 Français', regle: 'Rédige UNIQUEMENT en français.' },
    en: { label: '🇬🇧 English', regle: 'Write ONLY in English.' },
    es: { label: '🇪🇸 Español', regle: 'Escribe ÚNICAMENTE en español.' },
  };
  const echap = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // « 12 rue des Écoles, 95500 Le Thillay » → « Le Thillay » (on garde la commune, pas la rue).
  function lieu(dos) {
    if (dos.ville) return String(dos.ville);
    const parts = String(dos.adresse || '').split(',').map(s => s.trim()).filter(Boolean);
    if (parts.length < 2) return 'non précisé';
    return parts[parts.length - 1].replace(/^\d{5}\s*/, '') || 'non précisé';
  }

  function promptAnnonce(dos, langue) {
    dos = dos || {};
    const l = LANGUES[langue] || LANGUES.fr;
    const ligne = (lib, v) => (v != null && String(v).trim() !== '' ? `- ${lib} : ${v}\n` : '');
    const capacite = [dos.voy && `${dos.voy} voyageurs`, dos.ch && `${dos.ch} chambre(s)`, dos.dbl && `${dos.dbl} lit(s) double(s)`, dos.sdb && `${dos.sdb} SDB`].filter(Boolean).join(' · ');
    const tarif = dos.taux ? `${dos.emin || dos.pmin || '?'}–${dos.emax || dos.pmax || '?'} €/nuit` : '';
    return `Tu es un expert en rédaction d'annonces Airbnb haut de gamme pour Maison Jayla, conciergerie premium.
${l.regle}

DONNÉES DU BIEN :
${ligne('Type', [dos.type, dos.surface && dos.surface + ' m²'].filter(Boolean).join(' · ') || 'non précisé')}${ligne('Ville', lieu(dos))}${ligne('Capacité', capacite || 'non précisée')}${ligne('Décoration', dos.deco || 'non précisé')}${ligne('Point fort', dos.fort || 'non précisé')}${ligne('Équipements', dos.equip || 'WiFi, cuisine équipée')}${ligne('Transports', dos.transport || 'non précisé')}${ligne('Clientèle', dos.cible || 'tous profils')}${ligne('Check-in / check-out', `${dos.checkin || 'flexible'} / ${dos.checkout || 'flexible'}`)}${ligne('Infos', dos.extra)}${ligne('Tarif estimé', tarif)}
Génère l'annonce complète avec ces 7 sections :
1. TITRE (max 50 car., accrocheur, sans emoji)
2. ACCROCHE (1 phrase 15-25 mots)
3. DESCRIPTION COURTE (40-60 mots, 3 atouts)
4. DESCRIPTION LONGUE (150-220 mots, 2-3 §)
5. ÉQUIPEMENTS (liste à puces)
6. RÈGLES (ton positif)
7. PHRASE DE CLÔTURE (20-30 mots)

Jamais inventer d'info. Ton chaleureux et premium. Zéro faute.`;
  }

  // Panneau autonome (balise <dialog>) pour les pages sans système de modale, comme cohote.html.
  let dlg = null, dosCourant = null, titreCourant = '', langueCourante = 'fr';
  function construire() {
    dlg = document.createElement('dialog');
    dlg.id = 'annonce-dialog';
    dlg.setAttribute('aria-labelledby', 'annonce-titre');
    dlg.style.cssText = 'max-width:640px;width:calc(100% - 32px);border:1px solid var(--border,#E3D9CE);border-radius:10px;padding:0;background:var(--surface,#FBF8F3);color:var(--ink,#30282A)';
    dlg.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;padding:16px 18px;border-bottom:1px solid var(--border,#E3D9CE)">
        <strong id="annonce-titre" style="font-size:16px">Annonce</strong>
        <button type="button" data-a="fermer" aria-label="Fermer" style="font-size:18px;background:none;border:1px solid var(--border,#E3D9CE);border-radius:6px;width:34px;height:34px;cursor:pointer;color:inherit">✕</button>
      </div>
      <div style="padding:16px 18px;display:flex;flex-direction:column;gap:12px">
        <p style="margin:0;font-size:13px;color:var(--ink3,#6E6266)">Le texte est préparé à partir de la fiche du logement. Copie-le dans une conversation Claude : l'annonce est rédigée en quelques secondes. Relis-la avant de la publier.</p>
        <div role="group" aria-label="Langue de l'annonce" data-zone="langues" style="display:flex;gap:6px;flex-wrap:wrap"></div>
        <textarea readonly data-zone="texte" aria-label="Texte à copier dans Claude" style="width:100%;min-height:260px;font:12px/1.5 ui-monospace,Menlo,Consolas,monospace;padding:10px;border:1px solid var(--border,#E3D9CE);border-radius:6px;background:#fff;color:#30282A;box-sizing:border-box"></textarea>
        <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end">
          <a data-a="claude" href="https://claude.ai/new" target="_blank" rel="noopener" class="btn btn-outline btn-sm" style="text-decoration:none">Ouvrir Claude</a>
          <button type="button" data-a="copier" class="btn btn-primary btn-sm">📋 Copier le texte</button>
        </div>
        <p data-zone="note" style="margin:0;font-size:12px;color:var(--ink3,#6E6266)" hidden></p>
      </div>`;
    document.body.appendChild(dlg);
    dlg.addEventListener('click', async e => {
      if (e.target === dlg) return dlg.close();                       // clic sur le fond
      const a = e.target.closest('[data-a],[data-langue]');
      if (!a) return;
      if (a.dataset.langue) { langueCourante = a.dataset.langue; rendre(); return; }
      if (a.dataset.a === 'fermer') return dlg.close();
      if (a.dataset.a === 'copier' || a.dataset.a === 'claude') {
        const note = dlg.querySelector('[data-zone=note]');
        try { await navigator.clipboard.writeText(dlg.querySelector('[data-zone=texte]').value); note.textContent = 'Texte copié. Colle-le dans une nouvelle conversation Claude (Ctrl+V).'; }
        catch (_) { dlg.querySelector('[data-zone=texte]').select(); note.textContent = 'Copie automatique refusée : le texte est sélectionné, fais Ctrl+C.'; }
        note.hidden = false;
      }
    });
  }
  function rendre() {
    dlg.querySelector('#annonce-titre').textContent = 'Annonce' + (titreCourant ? ' · ' + titreCourant : '');
    dlg.querySelector('[data-zone=langues]').innerHTML = Object.entries(LANGUES).map(([k, v]) =>
      `<button type="button" data-langue="${k}" aria-pressed="${k === langueCourante}" class="btn btn-sm ${k === langueCourante ? 'btn-primary' : 'btn-outline'}">${echap(v.label)}</button>`).join('');
    dlg.querySelector('[data-zone=texte]').value = promptAnnonce(dosCourant, langueCourante);
    dlg.querySelector('[data-zone=note]').hidden = true;
  }
  function ouvrirAnnonce(dos, titre) {
    if (!dlg) construire();
    dosCourant = dos || {}; titreCourant = titre || ''; langueCourante = 'fr';
    rendre();
    if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
  }

  g.promptAnnonce = promptAnnonce;
  g.ouvrirAnnonce = ouvrirAnnonce;
})(window);
