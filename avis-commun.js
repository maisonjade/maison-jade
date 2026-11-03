// ══ AVIS DE VALEUR — module commun (index.html et cohote.html) ══
// Formulaire, fiche détail, PDF propriétaire et appel à l'Edge Function « avis-valeur ».
// Toutes les valeurs affichées passent par esc() : aucune donnée n'est injectée brute dans le HTML.
(function (g) {
  const FONCTION = 'https://lvfncstosaaqgtfozthw.supabase.co/functions/v1/avis-valeur';
  const CLE_PUBLIQUE = 'sb_publishable_UrB6X04fyAOhnN7aHropFQ_mwubBip2';
  const TYPES = { studio: 'Studio', t2: 'T2', t3: 'T3', t4: 'T4 et +', maison: 'Maison', villa: 'Villa' };
  const STATUTS = { nouveau: 'Nouveau', en_cours: 'En cours', envoye: 'Envoyé', converti: 'Converti', archive: 'Archivé' };
  const SOURCES = { public: 'Site', intranet: 'Interne', cohote: 'Co-hôte' };
  const EQUIP = { parking: 'Parking', terrasse: 'Terrasse', jardin: 'Jardin', piscine: 'Piscine', clim: 'Climatisation', vue: 'Belle vue' };
  const MOIS = ['Janv.', 'Févr.', 'Mars', 'Avr.', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'];

  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const eur = n => (n == null || isNaN(n)) ? '—' : Math.round(Number(n)).toLocaleString('fr-FR') + ' €';
  const date = d => d ? new Date(d).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '';
  const safeUrl = u => /^https:\/\//.test(u || '') ? u : '';
  const tel = t => String(t || '').replace(/[^\d+]/g, '');
  const telWa = t => { let d = tel(t).replace(/^\+/, ''); if (/^0\d{9}$/.test(d)) d = '33' + d.slice(1); return d; };

  // ── Appel serveur (jeton de la session courante) ──
  async function appeler(sb, action, corps) {
    const { data: { session } } = await sb.auth.getSession();
    if (!session) throw new Error('Session expirée : reconnectez-vous.');
    let r;
    try {
      r = await fetch(FONCTION, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', apikey: CLE_PUBLIQUE, Authorization: 'Bearer ' + session.access_token },
        body: JSON.stringify({ action, ...corps }),
      });
    } catch (_) { throw new Error('Connexion impossible au serveur. Vérifiez votre réseau.'); }
    const d = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(d.error || ('Erreur serveur (' + r.status + ')'));
    return d;
  }

  // ── Formulaire de saisie (préfixe = identifiant unique de l'écran) ──
  function formulaireHtml(p) {
    const types = Object.entries(TYPES).map(([k, v]) => `<option value="${k}">${v}</option>`).join('');
    const eq = Object.entries(EQUIP).map(([k, v]) => `<label style="display:flex;gap:6px;align-items:center;font-size:13px"><input type="checkbox" data-eq="${k}"> ${v}</label>`).join('');
    const ch = (id, lib, attrs = '') => `<label style="display:flex;flex-direction:column;gap:4px;font-size:12px;font-weight:600">${lib}<input id="${p}-${id}" ${attrs} style="padding:9px 10px;border:1px solid var(--border,#ddd);border-radius:6px;font-size:14px;font-weight:400"></label>`;
    return `<div id="${p}-form" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px">
      <div style="grid-column:1/-1;position:relative">${ch('adresse', 'Adresse du bien', 'type="text" autocomplete="off" placeholder="Commencez à taper…"')}
        <div id="${p}-sug" style="display:none;position:absolute;left:0;right:0;z-index:20;background:#fff;border:1px solid #ddd;max-height:220px;overflow:auto"></div></div>
      ${ch('ville', 'Ville', 'type="text"')}${ch('cp', 'Code postal', 'type="text" maxlength="10"')}
      <label style="display:flex;flex-direction:column;gap:4px;font-size:12px;font-weight:600">Type de bien<select id="${p}-type" style="padding:9px 10px;border:1px solid var(--border,#ddd);border-radius:6px;font-size:14px">${types}</select></label>
      ${ch('chambres', 'Chambres', 'type="number" min="0" max="20" value="1"')}${ch('couchages', 'Couchages', 'type="number" min="1" max="30" value="2"')}
      ${ch('sdb', 'Salles de bain', 'type="number" min="1" max="10" value="1"')}${ch('surface', 'Surface (m²)', 'type="number" min="5" max="2000"')}
      ${ch('frais', 'Frais plateforme (%)', 'type="number" min="0" max="30" step="0.5" value="3"')}
      <div style="grid-column:1/-1;display:flex;flex-wrap:wrap;gap:14px;padding:8px 0">${eq}</div>
      ${ch('nom', 'Propriétaire', 'type="text" maxlength="120"')}${ch('email', 'Email', 'type="email" maxlength="200"')}${ch('tel', 'Téléphone', 'type="tel" maxlength="30"')}
      <label style="grid-column:1/-1;display:flex;flex-direction:column;gap:4px;font-size:12px;font-weight:600">Notes internes<textarea id="${p}-notes" rows="2" maxlength="2000" style="padding:9px 10px;border:1px solid var(--border,#ddd);border-radius:6px;font-size:14px;font-family:inherit"></textarea></label>
    </div>`;
  }

  // Branche l'autocomplétion d'adresse (IGN) sur un formulaire rendu
  function brancherAdresse(p) {
    const inp = document.getElementById(p + '-adresse'), sug = document.getElementById(p + '-sug');
    const geo = { lat: null, lon: null, citycode: '' };
    let t = null, res = [];
    inp.addEventListener('input', () => {
      geo.lat = geo.lon = null; geo.citycode = '';
      clearTimeout(t);
      const q = inp.value.trim();
      if (q.length < 4) { sug.style.display = 'none'; return; }
      t = setTimeout(async () => {
        try {
          const r = await fetch('https://data.geopf.fr/geocodage/search?limit=5&q=' + encodeURIComponent(q));
          res = r.ok ? ((await r.json()).features || []) : [];
          sug.replaceChildren(...res.map((f, i) => {
            const b = document.createElement('button'); b.type = 'button'; b.dataset.i = i;
            b.style.cssText = 'display:block;width:100%;text-align:left;padding:8px 10px;border:none;border-bottom:1px solid #eee;background:none;cursor:pointer;font-size:13px';
            b.textContent = f.properties.label; return b;
          }));
          sug.style.display = res.length ? 'block' : 'none';
        } catch (_) { sug.style.display = 'none'; }
      }, 300);
    });
    sug.addEventListener('click', e => {
      const b = e.target.closest('button[data-i]'); if (!b) return;
      const f = res[+b.dataset.i], pr = f.properties;
      inp.value = pr.label;
      document.getElementById(p + '-ville').value = pr.city || '';
      document.getElementById(p + '-cp').value = pr.postcode || '';
      [geo.lon, geo.lat] = f.geometry.coordinates; geo.citycode = pr.citycode || '';
      sug.style.display = 'none';
    });
    return geo;
  }

  function lireFormulaire(p, geo) {
    const v = id => document.getElementById(p + '-' + id)?.value?.trim() || '';
    const eq = {};
    document.querySelectorAll(`#${p}-form [data-eq]`).forEach(c => eq[c.dataset.eq] = c.checked);
    if (!v('ville') && !v('cp')) throw new Error('Indiquez la ville ou le code postal du bien.');
    return {
      bien: {
        adresse: v('adresse'), ville: v('ville'), code_postal: v('cp'), pays: 'FR',
        lat: geo?.lat ?? null, lon: geo?.lon ?? null, citycode: geo?.citycode || '',
        type_bien: v('type'), chambres: +v('chambres') || 0, couchages: +v('couchages') || 1,
        salles_de_bain: +v('sdb') || 1, surface_m2: v('surface') ? +v('surface') : null, equipements: eq,
      },
      contact: { nom: v('nom'), email: v('email'), tel: v('tel') },
      notes: v('notes'),
      frais_plateforme_pct: v('frais') === '' ? 3 : +v('frais'),
    };
  }

  // ── Badges ──
  function badgeStatut(s) {
    const c = { nouveau: ['#F6E3E3', '#9B2F2F'], en_cours: ['#F7EDD9', '#9A6A12'], envoye: ['#E7EDE9', '#31483F'], converti: ['#E3F0E8', '#2F6B4A'], archive: ['#ECEDEF', '#5F6670'] }[s] || ['#ECEDEF', '#5F6670'];
    return `<span style="display:inline-block;padding:2px 9px;border-radius:999px;font-size:11px;font-weight:700;background:${c[0]};color:${c[1]}">${esc(STATUTS[s] || s)}</span>`;
  }
  function badgeConfiance(n) {
    const c = n >= 70 ? '#2F6B4A' : n >= 50 ? '#9A6A12' : '#9B2F2F';
    return `<span style="font-weight:700;color:${c}">${esc(n ?? '—')}/100</span>`;
  }

  // ── Fiche détail ──
  function detailHtml(a) {
    const m = a.donnees_marche || {}, geo = m.geo || {}, f = a.resultat_formules || {};
    const eqs = Object.entries(a.equipements || {}).filter(([k, v]) => v && EQUIP[k]).map(([k]) => EQUIP[k]).join(', ') || 'Aucun';
    const sources = (m.sources || []).map(s => { const u = safeUrl(s.url); return u ? `<li><a href="${esc(u)}" target="_blank" rel="noopener">${esc(s.titre || u)}</a></li>` : ''; }).join('');
    const alertes = (m.alertes || []).map(x => `<li>${esc(x)}</li>`).join('');
    const ajust = (geo.ajustements || []).map(x => `<li>${esc(x)}</li>`).join('');
    const lignesF = ['16', '22', '25'].map(k => {
      const x = f[k]; if (!x) return '';
      return `<tr><td style="padding:7px 8px"><strong>${esc(x.nom)}</strong> · ${esc(x.pct)} % TTC</td>
        <td style="padding:7px 8px;text-align:right">${eur(x.moyen.net_percu)}</td>
        <td style="padding:7px 8px;text-align:right;color:#B89452">−${eur(x.moyen.commission)}</td>
        <td style="padding:7px 8px;text-align:right;font-weight:700;color:#31483F">${eur(x.moyen.net_proprio)}</td>
        <td style="padding:7px 8px;text-align:right;color:#6E655B">${eur(x.bas.net_proprio)} – ${eur(x.haut.net_proprio)}</td></tr>`;
    }).join('');
    const mois = (a.detail_mensuel || []).map(x => `<td style="padding:4px 3px;text-align:center;font-size:11px">${esc(MOIS[x.mois - 1])}<br><strong>${esc(x.occupation)}%</strong><br>${esc(x.prix)}€</td>`).join('');
    const cTel = tel(a.contact_tel);
    const contact = a.contact_nom || a.contact_email || a.contact_tel ? `
      <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:6px">
        <span><strong>${esc(a.contact_nom || '—')}</strong> · ${esc(a.contact_email || '')} · ${esc(a.contact_tel || '')}${a.creneau_rappel ? ' · rappel ' + esc({ matin: 'le matin', apres_midi: "l'après-midi", soir: 'en fin de journée' }[a.creneau_rappel]) : ''}</span>
        ${cTel ? `<a class="btn btn-ghost btn-sm" href="tel:${esc(cTel)}">📞 Appeler</a>` : ''}
        ${a.contact_email ? `<a class="btn btn-ghost btn-sm" href="mailto:${esc(a.contact_email)}">✉️ Email</a>` : ''}
        ${cTel ? `<a class="btn btn-ghost btn-sm" href="https://wa.me/${esc(telWa(a.contact_tel))}" target="_blank" rel="noopener">💬 WhatsApp</a>` : ''}
      </div>` : '<div style="color:#6E655B">Aucun contact renseigné</div>';
    return `
      <div style="display:grid;gap:16px">
        <div><div style="font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#B89452;font-weight:700">Contact</div>${contact}</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px">
          <div style="background:#F9F6F1;border-radius:8px;padding:12px"><div style="font-size:11px;color:#6E655B">Brut annuel estimé</div><div style="font-size:20px;font-weight:700;color:#31483F">${eur(a.revenu_brut_moyen)}</div><div style="font-size:11px;color:#6E655B">${eur(a.revenu_brut_bas)} – ${eur(a.revenu_brut_haut)}</div></div>
          <div style="background:#F9F6F1;border-radius:8px;padding:12px"><div style="font-size:11px;color:#6E655B">Prix moyen / nuit</div><div style="font-size:20px;font-weight:700;color:#31483F">${eur(a.prix_nuit_moyen)}</div><div style="font-size:11px;color:#6E655B">grille : ${eur(m.prix_grille)}</div></div>
          <div style="background:#F9F6F1;border-radius:8px;padding:12px"><div style="font-size:11px;color:#6E655B">Occupation</div><div style="font-size:20px;font-weight:700;color:#31483F">${esc(a.taux_occupation ?? '—')} %</div><div style="font-size:11px;color:#6E655B">${esc(geo.courbe || '')}</div></div>
          <div style="background:#F9F6F1;border-radius:8px;padding:12px"><div style="font-size:11px;color:#6E655B">Indice de confiance</div><div style="font-size:20px">${badgeConfiance(a.indice_confiance)}</div><div style="font-size:11px;color:#6E655B">${esc(a.version_moteur || '')}</div></div>
        </div>
        <div><div style="font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#B89452;font-weight:700;margin-bottom:6px">Le bien</div>
          ${esc(TYPES[a.type_bien] || a.type_bien)} · ${esc(a.couchages)} couchages · ${esc(a.chambres)} ch. · ${esc(a.salles_de_bain)} sdb${a.surface_m2 ? ' · ' + esc(a.surface_m2) + ' m²' : ''}<br>
          ${esc(a.adresse || [a.code_postal, a.ville].filter(Boolean).join(' '))}<br><span style="color:#6E655B">Atouts : ${esc(eqs)}</span></div>
        <div><div style="font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#B89452;font-weight:700;margin-bottom:6px">Calcul par formule (FIN-1, frais plateforme ${esc(a.frais_plateforme_pct)} %)</div>
          <div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:13px"><thead><tr style="color:#6E655B;font-size:11px;text-align:right"><th style="text-align:left;padding:6px 8px">Formule</th><th style="padding:6px 8px">Net perçu</th><th style="padding:6px 8px">Commission</th><th style="padding:6px 8px">Net propriétaire</th><th style="padding:6px 8px">Fourchette</th></tr></thead><tbody>${lignesF}</tbody></table></div></div>
        <div style="overflow-x:auto"><table style="border-collapse:collapse;width:100%"><tr>${mois}</tr></table></div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px;font-size:13px">
          <div><strong>Localisation</strong><div style="color:#6E655B">${esc(geo.secteur || 'Non localisé')}</div><ul style="margin:4px 0;padding-left:18px">${ajust}</ul></div>
          <div><strong>Données de marché</strong>${m.zone ? `<div style="color:#6E655B">Zone : ${esc(m.zone)}</div>` : ''}<div style="color:#6E655B">${esc(m.commentaire || m.erreur || '')}</div>${sources ? `<ul style="margin:4px 0;padding-left:18px">${sources}</ul>` : ''}${m.recherche_le ? `<div style="font-size:11px;color:#6E655B">Recherche du ${esc(date(m.recherche_le))}${m.depuis_cache ? ' (cache)' : ''}</div>` : ''}</div>
        </div>
        ${alertes ? `<div style="background:#F7EDD9;border-radius:8px;padding:10px 12px;font-size:13px;color:#7a5410"><strong>À vérifier</strong><ul style="margin:4px 0;padding-left:18px">${alertes}</ul></div>` : ''}
      </div>`;
  }

  // ── PDF propriétaire (impression navigateur, sans service tiers) ──
  function pdf(a, opts = {}) {
    const f = a.resultat_formules || {}, m = a.donnees_marche || {};
    const lignes = ['16', '22', '25'].map(k => { const x = f[k]; return x ? `<tr><td><strong>${esc(x.nom)}</strong><br><span class="d">Commission ${esc(x.pct)} % TTC</span></td><td>${eur(x.moyen.commission)}</td><td class="n">${eur(x.moyen.net_proprio)}</td><td class="d">${eur(x.bas.net_proprio)} – ${eur(x.haut.net_proprio)}</td></tr>` : ''; }).join('');
    const mois = (a.detail_mensuel || []).map(x => `<tr><td>${esc(MOIS[x.mois - 1])}</td><td>${esc(x.occupation)} %</td><td>${esc(x.nuits)}</td><td>${eur(x.prix)}</td><td>${eur(x.ca)}</td></tr>`).join('');
    const lieu = esc(a.ville || a.code_postal || '');
    const html = `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><title>Estimation de revenus · Maison Jade</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;1,500&family=Lato:wght@400;700&display=swap">
<style>*{box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact}@page{size:A4;margin:16mm}
body{font-family:Lato,Arial,sans-serif;color:#1D1B19;font-size:12px;margin:0}
.ent{display:flex;justify-content:space-between;align-items:flex-end;border-bottom:1px solid #B89452;padding-bottom:12px;margin-bottom:22px}
.logo{font-family:'Cormorant Garamond',serif;font-size:22px;letter-spacing:.3em;text-transform:uppercase;color:#31483F}
h1{font-family:'Cormorant Garamond',serif;font-weight:500;font-size:30px;color:#31483F;margin:0 0 4px}
h2{font-family:'Cormorant Garamond',serif;font-weight:500;font-size:19px;color:#31483F;margin:24px 0 8px}
.d{color:#6E655B;font-size:11px}.bloc{background:#F9F6F1;border-radius:4px;padding:16px 18px;display:flex;gap:30px;flex-wrap:wrap}
.k{font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:#6E655B}.v{font-family:'Cormorant Garamond',serif;font-size:28px;color:#31483F}
table{width:100%;border-collapse:collapse}td,th{padding:6px 8px;border-bottom:1px solid #E4DCCF;text-align:right}td:first-child,th:first-child{text-align:left}th{font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:#6E655B}
.n{font-weight:700;color:#31483F}.pied{margin-top:26px;border-top:1px solid #E4DCCF;padding-top:10px;font-size:10px;color:#6E655B}</style></head><body>
<div class="ent"><div class="logo">Maison Jade</div><div class="d">Estimation du ${esc(date(a.updated_at || a.created_at))}</div></div>
<h1>Estimation de revenus locatifs</h1>
<div class="d">${esc(TYPES[a.type_bien] || a.type_bien)} · ${esc(a.couchages)} couchages · ${lieu}${a.contact_nom ? ' · Préparée pour ' + esc(a.contact_nom) : ''}</div>
<h2>Vos revenus estimés en location courte durée</h2>
<div class="bloc"><div><div class="k">Chiffre d'affaires brut annuel</div><div class="v">${eur(a.revenu_brut_bas)} – ${eur(a.revenu_brut_haut)}</div><div class="d">Scénario central : ${eur(a.revenu_brut_moyen)}</div></div>
<div><div class="k">Prix moyen par nuit</div><div class="v">${eur(a.prix_nuit_moyen)}</div></div><div><div class="k">Occupation estimée</div><div class="v">${esc(a.taux_occupation)} %</div></div></div>
<h2>Ce qu'il vous reste, selon la formule</h2>
<table><thead><tr><th>Formule</th><th>Honoraires Maison Jade</th><th>Net propriétaire / an</th><th>Fourchette</th></tr></thead><tbody>${lignes}</tbody></table>
<div class="d" style="margin-top:6px">Calcul : chiffre d'affaires − frais de plateforme (${esc(a.frais_plateforme_pct)} %) = revenu perçu ; la commission Maison Jade s'applique sur ce revenu perçu. Les frais de ménage sont refacturés aux voyageurs.</div>
<h2>Saisonnalité</h2>
<table><thead><tr><th>Mois</th><th>Occupation</th><th>Nuits</th><th>Prix moyen</th><th>Chiffre d'affaires</th></tr></thead><tbody>${mois}</tbody></table>
${opts.confiance ? `<div class="d" style="margin-top:10px">Indice de confiance de l'estimation : ${esc(a.indice_confiance)}/100${m.zone ? ' · données de marché : ' + esc(m.zone) : ''}</div>` : ''}
<div class="pied">Estimation indicative fondée sur les données de marché disponibles et la méthode Maison Jade. Elle ne constitue ni une garantie de revenus ni une expertise. Hors charges du propriétaire (taxe de séjour, charges, assurance, fiscalité).${opts.auteur ? '<br>Estimation réalisée par ' + esc(opts.auteur) + ' · Maison Jade' : ''}</div>
<script>window.onload=()=>setTimeout(()=>window.print(),400)<\/script></body></html>`;
    const w = window.open('', '_blank');
    if (!w) throw new Error('Autorisez les fenêtres pop-up pour générer le PDF.');
    w.document.open(); w.document.write(html); w.document.close();
  }

  g.AvisMJ = { FONCTION, TYPES, STATUTS, SOURCES, esc, eur, date, appeler, formulaireHtml, brancherAdresse, lireFormulaire, badgeStatut, badgeConfiance, detailHtml, pdf };
})(window);
