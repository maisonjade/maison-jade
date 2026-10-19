// ══ RÈGLE FIN-1 — SEUL CALCUL DE COMMISSION MAISON JADE ══
// Chargé par index.html, proprio.html, cohote.html, cockpit.html et calculateur-commission.html.
// Identique au trigger SQL reservations_fin1 (arrondi à l'euro), qui fait foi pour les montants en base.
//
//   net_perçu    = montant_brut − frais_plateforme      (montant_brut = loyer seul, sans ménage)
//   commission   = taux de l'offre du bien × net_perçu
//   net_proprio  = net_perçu − commission
//
// Le ménage est un règlement à part : il n'entre jamais dans la base de commission.
// Il compte en revanche dans la rentabilité propriétaire (calcMenage).
(function (g) {
  const OFFRES = { 16: 'Essentielle', 22: 'Sérénité', 25: 'Signature' };
  const PART_SERVICES_COHOTE = 0.85;

  // Taux de l'offre (%) ; null si aucune offre choisie — jamais de taux par défaut.
  function taux(v) {
    const n = parseFloat(v);
    return n > 0 ? n : null;
  }

  function calcFin1(montantBrut, fraisPlateforme, pct) {
    const t = taux(pct);
    const netPercu = Math.round((parseFloat(montantBrut) || 0) - (parseFloat(fraisPlateforme) || 0));
    const commission = t == null ? null : Math.round(netPercu * t / 100);
    return { pct: t, netPercu, commission, netProprio: commission == null ? null : netPercu - commission };
  }

  // Part co-hôte : honoraires MJ (= commission FIN-1) × part co-hôte, + 85 % des services à la carte.
  function calcCohote(netPercu, pct, partPct, services) {
    const honoraires = calcFin1(netPercu, 0, pct).commission || 0;
    const serv = parseFloat(services) || 0;
    const commGestion  = honoraires * (parseFloat(partPct) || 0) / 100;
    const commServices = serv * PART_SERVICES_COHOTE;
    return {
      honoraires,
      commGestion,
      commServices,
      partMJ: honoraires - commGestion + serv * (1 - PART_SERVICES_COHOTE),
      total: commGestion + commServices
    };
  }

  // Ménage (hors commission MJ) : payé par le voyageur, frais plateforme déduits sur cette ligne,
  // puis coût du prestataire en charge. solde = ce que le ménage rapporte (ou coûte) au propriétaire.
  function calcMenage(payeVoyageur, fraisPlateforme, coutPrestataire) {
    const encaisse = Math.round(parseFloat(payeVoyageur) || 0);
    const frais = Math.round(parseFloat(fraisPlateforme) || 0);
    const cout = Math.round(parseFloat(coutPrestataire) || 0);
    return { encaisse, frais, net: encaisse - frais, cout, solde: encaisse - frais - cout };
  }

  g.MJ = { OFFRES, PART_SERVICES_COHOTE, taux, calcFin1, calcCohote, calcMenage };
})(window);
