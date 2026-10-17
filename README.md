# Portfolio — Anis Nefikha

Site portfolio personnel : une page d'accueil et une page par projet. Étudiant en BUT
Science des Données (IUT de Lille), à la recherche d'un stage d'un mois en data, de juillet à août.

## Stack

- HTML5, CSS natif, JavaScript vanilla
- Aucun framework, aucun build, aucune dépendance
- Contenu écrit directement dans le HTML (pas de rendu JavaScript)
- JavaScript limité au lien actif de la navigation et aux apparitions au défilement

## Arborescence

```
portfolio/
├── index.html               accueil, projets, compétences, à propos et contact
├── projets/
│   ├── comparateur-carburants.html   README du projet Python
│   └── dashboard-adidas.html         README du projet Excel
├── centres-interet/                  une page par centre d'intérêt (JJB, voyages, …)
├── css/
│   ├── 01-tokens.css        variables uniquement
│   ├── 02-base.css          reset minimal, typographie de base, focus visible
│   ├── 03-layout.css        conteneur, header, sections, grille, breakpoints
│   └── 04-components.css    cartes projets, badges, boutons, timeline
├── js/
│   └── main.js              lien actif, sommaire, apparitions au défilement
├── assets/
│   ├── images/              photo, bannière, photos des centres d'intérêt, captures des projets
│   └── cv/                  CV en PDF
├── README.md
└── .gitignore
```

Les CSS sont chargés dans l'ordre de leur préfixe numérique : chaque fichier peut
s'appuyer sur les précédents.

## Lancer en local

Ouvrir `index.html` dans un navigateur, ou servir le dossier :

```
python3 -m http.server 8000
```

## Mise en ligne (GitHub Pages)

Le site est publié depuis la branche `main` de ce dépôt (`anis-nefikha.github.io`) :
chaque push met en ligne https://anis-nefikha.github.io en une à deux minutes.

## Modifier le contenu

- Les pages sont du HTML statique : on peut modifier directement `index.html`,
  `projets/*.html` et `centres-interet/*.html`.
- Captures des projets dans `assets/images/projets/`, photos des centres d'intérêt dans
  `assets/images/passions/` (recadrées et sans métadonnées), toujours avec un `alt` descriptif.
- Remplacer le CV : déposer le PDF dans `assets/cv/` sous le même nom.
- Aperçu de partage (LinkedIn, messageries) : `assets/images/apercu-partage.jpg`, 1200 × 630.

## Design

Direction « éditorial sombre » en noir et bleu, reprise de la bannière LinkedIn (bleu marine
`#1F3A5F`), avec l'orange `#FF5A36` en accent. Toutes les valeurs (couleurs, polices, espacements,
durées) sont dans `css/01-tokens.css`. Polices chargées depuis Google Fonts : Space Grotesk 600
(titres), Inter 400/500/600 (texte), JetBrains Mono 400 (étiquettes).

Animation : les blocs marqués `data-reveal` apparaissent au défilement (fondu et glissement
vers le haut, avec un léger décalage entre ceux qui arrivent ensemble). Rien n'est masqué si
l'utilisateur préfère réduire les animations ou si `js/main.js` ne se charge pas.
