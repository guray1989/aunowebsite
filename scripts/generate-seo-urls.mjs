import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SEO_PAGES, SITE_ORIGIN } from './seo-pages.mjs';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

const clientPages = SEO_PAGES.map((page) => ({
  id: page.id,
  tr: page.tr,
  en: page.en,
  paths: page.paths,
  meta: page.meta,
}));

const js = `/* Auto-generated from scripts/seo-pages.mjs — do not edit manually. */
(function () {
  var SITE_ORIGIN = ${JSON.stringify(SITE_ORIGIN)};
  var SEO_PAGES = ${JSON.stringify(clientPages, null, 2)};

  function normalizePath(pathname) {
    var path = pathname || '/';
    path = path.replace(/^\\/(tr|en)(?=\\/|$)/, '') || '/';
    if (!path.startsWith('/')) path = '/' + path;
    if (path !== '/' && path.endsWith('/')) path = path.slice(0, -1);
    if (path === '/solutions/index.html') return '/solutions';
    if (path.endsWith('.html')) path = path.slice(0, -5);
    if (path === '/solutions') return '/solutions/';
    return path;
  }

  function findPageByPath(pathname) {
    var normalized = normalizePath(pathname);
    for (var i = 0; i < SEO_PAGES.length; i++) {
      var page = SEO_PAGES[i];
      for (var j = 0; j < page.paths.length; j++) {
        if (normalizePath(page.paths[j]) === normalized) return page;
      }
    }
    return null;
  }

  function getLocalizedPath(pathname, lang) {
    var page = findPageByPath(pathname);
    if (!page) {
      var clean = normalizePath(pathname);
      if (clean === '/' || clean === '/index.html') return lang === 'tr' ? '/tr/' : '/en/';
      return '/' + lang + (clean.startsWith('/') ? clean : '/' + clean);
    }
    return lang === 'tr' ? page.tr : page.en;
  }

  function resolveMeta(page, lang) {
    var bundle = page.meta && page.meta[lang];
    if (!bundle) return null;
    return {
      title: bundle.title,
      description: bundle.description,
      ogTitle: bundle.ogTitle || bundle.title,
      ogDescription: bundle.ogDescription || bundle.description
    };
  }

  function getPageById(id) {
    for (var i = 0; i < SEO_PAGES.length; i++) {
      if (SEO_PAGES[i].id === id) return SEO_PAGES[i];
    }
    return null;
  }

  function getCurrentSeoPage() {
    var fromPath = findPageByPath(window.location.pathname);
    if (fromPath) return fromPath;
    var pageId = document.body && document.body.getAttribute('data-seo-page-id');
    return pageId ? getPageById(pageId) : null;
  }

  window.SEO_SITE_ORIGIN = SITE_ORIGIN;
  window.SEO_PAGES = SEO_PAGES;
  window.normalizeSeoPath = normalizePath;
  window.findSeoPageByPath = findPageByPath;
  window.getLocalizedSeoPath = getLocalizedPath;
  window.getSeoPageById = getPageById;
  window.getCurrentSeoPage = getCurrentSeoPage;
  window.resolveSeoMeta = resolveMeta;
})();
`;

for (const target of ['seo-urls.js', 'public/seo-urls.js']) {
  fs.writeFileSync(path.join(root, target), js, 'utf8');
  console.log('wrote', target);
}
