/**
 * Canonical + hreflang tags for /tr/ and /en/ localized URLs.
 * Requires /seo-urls.js loaded first.
 */
(function () {
  var SITE_ORIGIN = window.SEO_SITE_ORIGIN || 'https://www.aunopack.com';

  function getLanguageFromPath(pathname) {
    var parts = (pathname || '/').split('/').filter(Boolean);
    return parts[0] === 'tr' || parts[0] === 'en' ? parts[0] : null;
  }

  function getCurrentLanguage() {
    var pathLang = getLanguageFromPath(window.location.pathname);
    if (pathLang) return pathLang;
    var saved = localStorage.getItem('preferred-language');
    if (saved === 'tr' || saved === 'en') return saved;
    var browserLang = navigator.language || navigator.userLanguage || '';
    return browserLang.startsWith('tr') ? 'tr' : 'en';
  }

  function upsertLink(rel, hreflang, href) {
    var selector = 'link[rel="' + rel + '"]' + (hreflang ? '[hreflang="' + hreflang + '"]' : ':not([hreflang])');
    var link = document.querySelector(selector);
    if (!link) {
      link = document.createElement('link');
      link.rel = rel;
      if (hreflang) link.setAttribute('hreflang', hreflang);
      document.head.appendChild(link);
    }
    link.setAttribute('href', href);
  }

  function updateSeoLinks() {
    var lang = getCurrentLanguage();
    var page = typeof window.findSeoPageByPath === 'function'
      ? window.findSeoPageByPath(window.location.pathname)
      : null;

    if (!page) return;

    var canonicalPath = lang === 'tr' ? page.tr : page.en;
    upsertLink('canonical', null, SITE_ORIGIN + canonicalPath);
    upsertLink('alternate', 'tr', SITE_ORIGIN + page.tr);
    upsertLink('alternate', 'en', SITE_ORIGIN + page.en);
    upsertLink('alternate', 'x-default', SITE_ORIGIN + page.tr);
  }

  window.updateCanonicalLink = updateSeoLinks;
  updateSeoLinks();
})();
