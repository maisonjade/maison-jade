// ══ ACADÉMIE CO-HÔTES : contenu des modules ══
// Texte source : documents de l'Académie rédigés par Maison Jayla (module 3 : version du 16/11/2026).
// Pour modifier un texte : changer ici, puis ouvrir une pull request. Aucun code à toucher dans cohote.html.
// Cases à cocher : <label class="ac-ck"><input type="checkbox" data-k="identifiant-unique"> Texte</label>

window.ACADEMIE = {
  modules: [
    {
      id: 'm1', num: 1, titre: 'Gérer un logement', duree: '10 jours', dispo: false,
      resume: 'Le métier au quotidien : voyageurs, ménage, linge, arrivées et départs.'
    },
    {
      id: 'm2', num: 2, titre: 'Vendre aux propriétaires', duree: '5 jours', dispo: false,
      resume: 'Présenter l’offre Maison Jayla et accompagner un propriétaire jusqu’à la signature.'
    },
    {
      id: 'm3', num: 3, titre: 'Enregistrer un bien', duree: '3 jours', dispo: true,
      prerequis: 'Module 1 validé',
      resume: 'Du premier contact à la mise en ligne, sur le compte du propriétaire.',
      sections: [
        {
          id: 'essentiel', titre: 'L’essentiel',
          html: `
<p>Enregistrer un bien chez Maison Jayla suit une règle unique : <strong>le propriétaire décide, nous exécutons.</strong> L'annonce reste sur son compte et à son nom, il signe ses réglages une fois, et nous nous occupons de tout le reste.</p>
<table class="ac-table"><tbody>
<tr><th scope="row">Place dans l'Académie</th><td>Après le module 1 (gérer un logement) et le module 2 (vendre aux propriétaires)</td></tr>
<tr><th scope="row">Durée</th><td>3 jours</td></tr>
<tr><th scope="row">Prérequis</th><td>Module 1 validé</td></tr>
<tr><th scope="row">Validation</th><td>Quiz de 10 questions, 8 bonnes réponses</td></tr>
</tbody></table>
<p>À la fin, vous saurez :</p>
<ul>
<li>dérouler les étapes d'un enregistrement, du premier contact à la mise en ligne ;</li>
<li>faire remplir et signer la feuille de réglages ;</li>
<li>préparer l'annonce sur le compte du propriétaire ;</li>
<li>reconnaître les gestes qui ne vous appartiennent pas.</li>
</ul>
<h3>Les trois règles à retenir</h3>
<ol class="ac-regles">
<li><strong>Son compte, son annonce.</strong> Nous intervenons comme co-hôte sur le compte du propriétaire, jamais sur un compte à notre nom.</li>
<li><strong>Ses réglages, signés une fois.</strong> Prix, règles de réservation et contenu de l'annonce sont arrêtés par lui avant la mise en ligne.</li>
<li><strong>Son argent, jamais entre nos mains.</strong> Les plateformes le paient directement. Vous ne facturez et n'encaissez rien auprès de lui.</li>
</ol>`
        },
        {
          id: 'parcours', titre: 'Le parcours en 8 étapes',
          html: `
<p>Un bien n'est mis en ligne qu'après la signature du contrat et de la feuille de réglages. Aucune étape ne se saute.</p>
<div class="ac-scroll" tabindex="0"><table class="ac-table">
<thead><tr><th scope="col">Étape</th><th scope="col">Ce que vous faites</th><th scope="col">Ce que fait le propriétaire</th><th scope="col">Dans votre espace</th></tr></thead>
<tbody>
<tr><td>1. Premier contact</td><td>Vous enregistrez le propriétaire avant tout autre échange</td><td>Il vous donne ses coordonnées et l'adresse du bien</td><td>Mes prospects : statut « Prospect »</td></tr>
<tr><td>2. Estimation</td><td>Vous préparez une estimation de revenus</td><td>Il décrit son logement</td><td>Simulateur de revenus ou Avis de valeur</td></tr>
<tr><td>3. Rendez-vous et audit</td><td>Vous visitez, relevez l'état du logement et présentez l'offre</td><td>Il vous ouvre le logement</td><td>Mes prospects : statut « RDV », Checklists terrain</td></tr>
<tr><td>4. Offre et contrat</td><td>Vous transmettez l'offre retenue</td><td>Il signe le contrat avec Maison Jayla, par signature électronique</td><td>Mes prospects : « Offre envoyée » puis « Signé »</td></tr>
<tr><td>5. Vérifications</td><td>Vous récupérez les justificatifs</td><td>Il atteste qu'il a le droit de louer et fournit ses pièces</td><td>Mes documents</td></tr>
<tr><td>6. Feuille de réglages</td><td>Vous la remplissez avec lui, ligne par ligne</td><td>Il la signe</td><td>Mes documents</td></tr>
<tr><td>7. Préparation de l'annonce</td><td>Vous créez l'annonce sur son compte, selon la feuille signée</td><td>Il crée ou ouvre son compte et vous ajoute comme co-hôte</td><td>Suivi par Maison Jayla</td></tr>
<tr><td>8. Mise en ligne</td><td>Vous contrôlez l'annonce avec la check-list</td><td>Il reçoit son accès à l'espace propriétaire</td><td>Mes biens : « En ligne »</td></tr>
</tbody></table></div>
<h3>Les pièces à demander au propriétaire (étape 5)</h3>
<div class="ac-cks">
<label class="ac-ck"><input type="checkbox" data-k="m3-pieces-1"> Pièce d'identité et justificatif de propriété</label>
<label class="ac-ck"><input type="checkbox" data-k="m3-pieces-2"> Numéro d'enregistrement du meublé de tourisme, quand la commune l'exige</label>
<label class="ac-ck"><input type="checkbox" data-k="m3-pieces-3"> Règlement de copropriété, s'il y en a une, pour vérifier que la location de courte durée est autorisée</label>
<label class="ac-ck"><input type="checkbox" data-k="m3-pieces-4"> Attestation d'assurance du logement couvrant la location saisonnière</label>
<label class="ac-ck"><input type="checkbox" data-k="m3-pieces-5"> Adresse e-mail qu'il utilise pour son compte sur les plateformes</label>
</div>
<p class="ac-note">Si une pièce manque ou si un doute apparaît sur le droit de louer, vous arrêtez le dossier et vous prévenez Maison Jayla.</p>
<h3>Bien apporté ou bien confié</h3>
<p>Un bien est « apporté » quand vous avez enregistré le propriétaire dans Mes prospects avant tout contact entre lui et Maison Jayla. Enregistrez donc chaque contact le jour même : c'est cette date qui fait foi.</p>`
        },
        {
          id: 'reglages', titre: 'La feuille de réglages',
          html: `
<p>La feuille de réglages est le document par lequel le propriétaire fixe lui-même tout ce qui touche à la location de son bien. Elle est annexée à son contrat et vous sert de consigne au quotidien.</p>
<div class="ac-scroll" tabindex="0"><table class="ac-table">
<thead><tr><th scope="col">Rubrique</th><th scope="col">Ce que le propriétaire arrête</th><th scope="col">Votre rôle</th></tr></thead>
<tbody>
<tr><td>Prix</td><td>Prix plancher, prix plafond, tarifs par saison, week-ends, frais de ménage</td><td>Vous proposez une grille à partir du simulateur, il tranche</td></tr>
<tr><td>Tarification automatique</td><td>Activation de l'outil de la plateforme ou d'un outil tiers, avec ses bornes</td><td>Vous expliquez les options</td></tr>
<tr><td>Réservations</td><td>Réservation instantanée ou non, durée minimale, délai avant arrivée, critères voyageurs</td><td>Vous conseillez d'après le type de bien</td></tr>
<tr><td>Calendrier</td><td>Périodes qu'il se réserve, délai de prévenance</td><td>Vous notez les dates</td></tr>
<tr><td>Règlement intérieur</td><td>Animaux, fêtes, fumeurs, nombre de voyageurs</td><td>Vous reprenez ses choix</td></tr>
<tr><td>Annonce</td><td>Titre, description, photos, équipements</td><td>Vous préparez, il approuve le contenu en signant</td></tr>
<tr><td>Dépenses</td><td>Montant maximal d'une intervention sans son accord</td><td>Vous l'appliquez</td></tr>
</tbody></table></div>
<h3>Comment vous l'utilisez</h3>
<ul>
<li><strong>Avant la mise en ligne :</strong> rien n'est publié tant que la feuille n'est pas signée et déposée dans Mes documents.</li>
<li><strong>Au quotidien :</strong> vous appliquez la feuille telle quelle. Un prix reste entre le plancher et le plafond, une réservation respecte ses critères.</li>
<li><strong>Quand il faut sortir du cadre :</strong> vous ne décidez pas à sa place. Vous lui proposez la modification, il signe une feuille mise à jour, puis vous l'appliquez.</li>
<li><strong>À tout moment :</strong> il peut changer ses réglages. Sa dernière feuille signée remplace la précédente.</li>
</ul>
<p class="ac-note">Un exemple : un salon professionnel est annoncé et vous pensez que le prix pourrait dépasser son plafond. Vous lui écrivez avec votre recommandation chiffrée. Sans réponse de sa part, le plafond signé s'applique.</p>`
        },
        {
          id: 'limites', titre: 'Vos limites',
          html: `
<p>Vous faites tout ce qui concerne le séjour et le logement ; vous ne décidez jamais à la place du propriétaire et vous ne touchez jamais à son argent.</p>
<div class="ac-scroll" tabindex="0"><table class="ac-table ac-limites">
<thead><tr><th scope="col">Vous faites</th><th scope="col">Vous ne faites jamais</th></tr></thead>
<tbody>
<tr><td>Préparer l'annonce d'après la feuille signée</td><td>Publier ou modifier une annonce sans feuille signée</td></tr>
<tr><td>Appliquer les prix dans les bornes fixées</td><td>Fixer un prix hors des bornes, même « pour rendre service »</td></tr>
<tr><td>Suivre le calendrier et les réservations selon ses critères</td><td>Accepter ou refuser un voyageur selon votre propre jugement</td></tr>
<tr><td>Répondre aux voyageurs, organiser arrivées et départs</td><td>Signer un contrat de location au nom du propriétaire</td></tr>
<tr><td>Coordonner le ménage, le linge, les petites réparations</td><td>Recevoir un loyer, une caution, des espèces ou un chèque</td></tr>
<tr><td>Présenter l'offre avec les supports Maison Jayla</td><td>Facturer le propriétaire ou lui demander un paiement</td></tr>
<tr><td>Donner une estimation avec le simulateur</td><td>Promettre un revenu ou un taux d'occupation</td></tr>
<tr><td>Vous présenter comme co-hôte indépendante du réseau Maison Jayla</td><td>Vous présenter comme gestionnaire, agent immobilier ou mandataire</td></tr>
</tbody></table></div>
<h3>Pourquoi ces limites existent</h3>
<p>En France, louer et gérer le bien d'autrui est une activité réglementée par la loi Hoguet, réservée aux professionnels titulaires d'une carte délivrée par la CCI. La <a href="https://www.entreprises.cci-paris-idf.fr/fiches-pratiques/carte-g-immobilier-cas-ou-elle-est-obligatoire-activites" target="_blank" rel="noopener">CCI Paris Île-de-France</a> range dans cette activité le fait de fixer les prix, de sélectionner les voyageurs ou de détenir un paiement pour le propriétaire.</p>
<p>Notre modèle repose sur une répartition claire : le propriétaire prend les décisions de location, nous fournissons des services de conciergerie. Cette répartition doit être vraie dans les faits, pas seulement sur le papier.</p>
<p>Ces limites vous protègent personnellement. Selon la même fiche, exercer cette activité sans carte expose à six mois d'emprisonnement et 7 500 € d'amende, et détenir des fonds sans carte à deux ans et 30 000 €. Une co-hôte qui sort du cadre s'expose elle-même et expose le propriétaire à l'annulation de son contrat.</p>
<h3>En cas de doute</h3>
<p class="ac-note">Une demande du propriétaire ou d'un voyageur sort de la feuille de réglages ? Vous ne tranchez pas seule : vous écrivez à Maison Jayla avant d'agir.</p>`
        },
        {
          id: 'outils', titre: 'Les outils',
          html: `
<h3>Dans votre espace co-hôte Maison Jayla</h3>
<div class="ac-scroll" tabindex="0"><table class="ac-table">
<thead><tr><th scope="col">Rubrique</th><th scope="col">À quoi elle sert pour l'enregistrement</th></tr></thead>
<tbody>
<tr><td><button type="button" class="ac-lien" data-vue="prospects">Mes prospects</button></td><td>Enregistrer le propriétaire et suivre son statut : Prospect, RDV, Offre envoyée, Signé</td></tr>
<tr><td><button type="button" class="ac-lien" data-vue="simulateur">Simulateur de revenus</button></td><td>Préparer la grille de prix à proposer</td></tr>
<tr><td><button type="button" class="ac-lien" data-vue="avis">Avis de valeur</button></td><td>Remettre une estimation écrite au propriétaire</td></tr>
<tr><td><button type="button" class="ac-lien" data-vue="checklists">Checklists terrain</button></td><td>Relever l'état du logement lors de l'audit</td></tr>
<tr><td><button type="button" class="ac-lien" data-vue="documents">Mes documents</button></td><td>Déposer les pièces et la feuille de réglages signée ; statut En attente, Validé ou Refusé</td></tr>
<tr><td><button type="button" class="ac-lien" data-vue="biens">Mes biens</button></td><td>Retrouver le bien une fois rattaché à votre espace par Maison Jayla</td></tr>
<tr><td><button type="button" class="ac-lien" data-vue="calendrier">Mon calendrier</button>, <button type="button" class="ac-lien" data-vue="revenus">Mes revenus</button></td><td>Suivre les séjours et votre décompte après la mise en ligne</td></tr>
</tbody></table></div>
<p>Le rattachement d'un bien à votre espace et l'envoi de l'accès propriétaire sont faits par Maison Jayla, pas par vous.</p>
<h3>Sur le compte du propriétaire</h3>
<ol>
<li>Le propriétaire crée son compte sur la plateforme avec sa propre adresse e-mail, ou utilise celui qu'il a déjà. Vous pouvez l'accompagner, mais les identifiants restent les siens.</li>
<li>Il renseigne lui-même son moyen de versement. Les revenus arrivent sur son compte bancaire, jamais sur le vôtre ni sur celui de Maison Jayla.</li>
<li>Il vous invite comme co-hôte sur son annonce.</li>
<li>Vous préparez l'annonce d'après la feuille de réglages signée : titre, description, photos, équipements, prix, règles.</li>
<li>Vous vérifiez que les réglages de la plateforme correspondent ligne par ligne à la feuille.</li>
</ol>
<p class="ac-note">Vous ne demandez jamais le mot de passe du propriétaire et vous ne vous connectez jamais à sa place.</p>`
        },
        {
          id: 'checklist', titre: 'Check-list de mise en ligne',
          html: `
<p>L'annonce n'est activée que si toutes les cases sont cochées.</p>
<div class="ac-cks">
<label class="ac-ck"><input type="checkbox" data-k="m3-ml-1"> Contrat signé entre le propriétaire et Maison Jayla</label>
<label class="ac-ck"><input type="checkbox" data-k="m3-ml-2"> Pièces du propriétaire déposées et validées dans Mes documents</label>
<label class="ac-ck"><input type="checkbox" data-k="m3-ml-3"> Feuille de réglages signée et déposée</label>
<label class="ac-ck"><input type="checkbox" data-k="m3-ml-4"> Annonce créée sur le compte du propriétaire, à son nom</label>
<label class="ac-ck"><input type="checkbox" data-k="m3-ml-5"> Versements paramétrés vers le compte bancaire du propriétaire</label>
<label class="ac-ck"><input type="checkbox" data-k="m3-ml-6"> Prix, durée minimale et règles de réservation identiques à la feuille</label>
<label class="ac-ck"><input type="checkbox" data-k="m3-ml-7"> Numéro d'enregistrement affiché sur l'annonce, quand la commune l'exige</label>
<label class="ac-ck"><input type="checkbox" data-k="m3-ml-8"> Photos et description conformes à la réalité du logement</label>
<label class="ac-ck"><input type="checkbox" data-k="m3-ml-9"> Accès au logement organisé : boîte à clés ou serrure connectée testée</label>
<label class="ac-ck"><input type="checkbox" data-k="m3-ml-10"> Ménage et linge planifiés pour le premier séjour</label>
</div>
<p class="ac-note">Cette check-list sert à vous entraîner. Vos cases sont gardées sur cet appareil uniquement.</p>`
        },
        {
          id: 'programme', titre: 'Programme des 3 jours',
          html: `
<div class="ac-scroll" tabindex="0"><table class="ac-table">
<thead><tr><th scope="col">Jour</th><th scope="col">Thème</th><th scope="col">Exercice</th></tr></thead>
<tbody>
<tr><td>Jour 16</td><td>Le principe et le parcours en 8 étapes</td><td>Replacer les 8 étapes dans l'ordre et dire qui agit à chacune</td></tr>
<tr><td>Jour 17</td><td>La feuille de réglages</td><td>Remplir une feuille complète pour un studio fictif</td></tr>
<tr><td>Jour 18</td><td>Vos limites et la mise en ligne</td><td>Études de cas, check-list, puis quiz</td></tr>
</tbody></table></div>`
        }
      ],
      // Quiz : réponses rédigées par Maison Jayla. La co-hôte répond de tête, découvre la réponse, puis indique si elle avait juste.
      seuil: 8,
      quiz: [
        { q: 'Sur quel compte l’annonce est-elle créée ?', r: 'Celui du propriétaire, à son nom.' },
        { q: 'Quel document doit être signé avant toute mise en ligne, en plus du contrat ?', r: 'La feuille de réglages.' },
        { q: 'Un voyageur propose de vous régler une nuit en espèces. Que faites-vous ?', r: 'Vous refusez : tout paiement passe par la plateforme.' },
        { q: 'Vous pensez qu’un prix devrait dépasser le plafond signé. Que faites-vous ?', r: 'Vous proposez la modification au propriétaire et attendez une feuille mise à jour.' },
        { q: 'Qui signe le contrat avec le propriétaire ?', r: 'Maison Jayla, par signature électronique ; pas vous.' },
        { q: 'Le propriétaire vous propose son mot de passe pour aller plus vite. Votre réponse ?', r: 'Non : il vous invite comme co-hôte.' },
        { q: 'Quand un bien est-il considéré comme apporté par vous ?', r: 'Quand vous l’avez enregistré dans Mes prospects avant tout contact avec Maison Jayla.' },
        { q: 'Pouvez-vous promettre un revenu mensuel au propriétaire ?', r: 'Non, seulement une estimation.' },
        { q: 'Qui rattache le bien à votre espace et envoie l’accès propriétaire ?', r: 'Maison Jayla.' },
        { q: 'Une pièce manque et la copropriété semble interdire la location courte durée. Que faites-vous ?', r: 'Vous arrêtez le dossier et prévenez Maison Jayla.' }
      ]
    }
  ]
};
