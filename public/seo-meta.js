/**
 * Runtime SEO metadata from scripts/seo-pages.mjs (via seo-urls.js).
 * Requires seo-urls.js loaded first.
 */
(function () {
  function upsertMeta(attr, name, content) {
    if (!content) return;
    var selector =
      'meta[' + attr + '="' + name + '"]' +
      (attr === 'name' ? ':not([property])' : '');
    var el = document.querySelector(selector);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, name);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  }

  function getLanguageFromPath() {
    var parts = (window.location.pathname || '/').split('/').filter(Boolean);
    return parts[0] === 'tr' || parts[0] === 'en' ? parts[0] : null;
  }

  function getCurrentLanguage() {
    var pathLang = getLanguageFromPath();
    if (pathLang) return pathLang;
    var saved = localStorage.getItem('preferred-language');
    if (saved === 'tr' || saved === 'en') return saved;
    var browserLang = navigator.language || navigator.userLanguage || '';
    return browserLang.startsWith('tr') ? 'tr' : 'en';
  }

  function applySeoMeta(lang) {
    if (typeof window.getCurrentSeoPage !== 'function' || typeof window.resolveSeoMeta !== 'function') {
      return;
    }

    var page = window.getCurrentSeoPage();
    if (!page) return;

    var meta = window.resolveSeoMeta(page, lang);
    if (!meta) return;

    document.title = meta.title;
    upsertMeta('name', 'description', meta.description);
    upsertMeta('property', 'og:title', meta.ogTitle);
    upsertMeta('property', 'og:description', meta.ogDescription);
    upsertMeta('property', 'og:locale', lang === 'tr' ? 'tr_TR' : 'en_US');
    upsertMeta('name', 'twitter:title', meta.ogTitle);
    upsertMeta('name', 'twitter:description', meta.ogDescription);
  }

  window.applySeoMeta = applySeoMeta;

  function initSeoMeta() {
    applySeoMeta(getCurrentLanguage());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSeoMeta);
  } else {
    initSeoMeta();
  }
})();
