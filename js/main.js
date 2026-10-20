/* ==========================================================================
   main.js — Onglet actif de la navigation, sommaire des pages projets et
   apparition des éléments au défilement.
   Amélioration progressive : sans JS, tout reste visible et la navigation
   fonctionne, ce ne sont que des liens.
   ========================================================================== */

(function () {
  'use strict';

  const root = document.documentElement;

  /* ------------------------------------------------------------------------
     Lien actif : suit la section (ou le titre du README) en cours de lecture.
     Utilisé pour la navigation de l'accueil et pour le sommaire des projets.
     ------------------------------------------------------------------------ */
  function suivre(liens) {
    const paires = liens
      .map(function (lien) {
        const id = decodeURIComponent(lien.hash.slice(1));
        return { lien: lien, cible: id && document.getElementById(id) };
      })
      .filter(function (paire) { return paire.cible; });

    if (!paires.length) return;

    let actif = null;
    let enAttente = false;

    function mettreAJour() {
      enAttente = false;
      const ligne = window.innerHeight * 0.4;
      const enBas = window.scrollY + window.innerHeight >= root.scrollHeight - 2;
      let courant = null;

      paires.forEach(function (paire) {
        if (paire.cible.getBoundingClientRect().top <= ligne) courant = paire.lien;
      });
      // En bas de page, le dernier titre est forcément celui qu'on lit
      if (enBas) courant = paires[paires.length - 1].lien;

      if (courant === actif) return;
      if (actif) actif.removeAttribute('aria-current');
      if (courant) courant.setAttribute('aria-current', 'true');
      actif = courant;
    }

    window.addEventListener('scroll', function () {
      if (enAttente) return;
      enAttente = true;
      window.requestAnimationFrame(mettreAJour);
    }, { passive: true });
    window.addEventListener('resize', mettreAJour);
    mettreAJour();
  }

  // Accueil : liens de la nav vers les sections de la page
  suivre(Array.from(document.querySelectorAll('.site-nav__list a[href^="#"]')));
  // Pages projets : sommaire du README
  suivre(Array.from(document.querySelectorAll('.toc a[href^="#"]')));

  /* ------------------------------------------------------------------------
     Apparition au défilement : fondu + glissement vers le haut, une seule fois.
     Les blocs qui entrent ensemble dans l'écran apparaissent l'un après
     l'autre, avec un léger décalage (--reveal-step, voir 01-tokens.css).
     ------------------------------------------------------------------------ */
  if (!root.classList.contains('reveal-on')) return;

  const pas = parseFloat(getComputedStyle(root).getPropertyValue('--reveal-step')) || 90;
  const DECALAGE_MAX = 6; // au-delà, les blocs suivants partent en même temps

  function terminer(element) {
    element.addEventListener('transitionend', function fin(event) {
      if (event.target !== element) return;
      element.removeEventListener('transitionend', fin);
      // Le bloc retrouve ses propres transitions (survol, etc.)
      element.removeAttribute('data-reveal');
      element.classList.remove('is-visible');
      element.style.removeProperty('--reveal-delay');
    });
  }

  const observer = new IntersectionObserver(function (entries) {
    entries
      .filter(function (entry) { return entry.isIntersecting; })
      .forEach(function (entry, rang) {
        const element = entry.target;
        observer.unobserve(element);
        element.style.setProperty('--reveal-delay', Math.min(rang, DECALAGE_MAX) * pas + 'ms');
        terminer(element);
        element.classList.add('is-visible');
      });
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0 });

  document.querySelectorAll('[data-reveal]').forEach(function (element) {
    observer.observe(element);
  });

  /* Journal de contrôle qualité : les lignes s'affichent une à une, une seule
     fois, dès que le haut du panneau passe au-dessus de 80 % de l'écran
     (voir .log.is-run dans le CSS). Pas de seuil en pourcentage du panneau :
     sur petit écran ou zoomé, il peut être plus haut que la fenêtre. */
  const journal = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      journal.unobserve(entry.target);
      entry.target.classList.add('is-run');
    });
  }, { rootMargin: '0px 0px -20% 0px', threshold: 0 });

  document.querySelectorAll('[data-log]').forEach(function (element) {
    journal.observe(element);
  });

  // Signale au filet de sécurité du <head> que les apparitions sont prises en charge
  root.classList.add('reveal-ready');
})();
