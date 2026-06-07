/** Single source of truth loader: URLs, sitemap, and SEO metadata (TR/EN). */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const dataPath = path.join(root, 'scripts', 'seo-pages.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

export const SITE_ORIGIN = data.siteOrigin;

/** @typedef {{ title: string, description: string, ogTitle?: string, ogDescription?: string }} SeoMetaLang */
/** @typedef {{ id: string, tr: string, en: string, paths: string[], meta: { tr: SeoMetaLang, en: SeoMetaLang }, htmlFiles?: string[], priority?: string, changefreq?: string }} SeoPage */

/** @type {SeoPage[]} */
export const SEO_PAGES = data.pages;

export function normalizePath(pathname) {
  let path = (pathname || '/').split('?')[0];
  path = path.replace(/^\/(tr|en)(?=\/|$)/, '') || '/';
  if (!path.startsWith('/')) path = '/' + path;
  if (path !== '/' && path.endsWith('/')) path = path.slice(0, -1);
  if (path === '/solutions/index.html') return '/solutions';
  if (path.endsWith('.html')) path = path.slice(0, -5);
  if (path === '/solutions') return '/solutions/';
  return path;
}

export function findPageByPath(pathname) {
  const normalized = normalizePath(pathname);
  return SEO_PAGES.find((page) =>
    page.paths.some((candidate) => normalizePath(candidate) === normalized)
  );
}

export function getLocalizedUrl(pathname, lang) {
  const page = findPageByPath(pathname);
  if (!page) {
    const clean = normalizePath(pathname);
    if (clean === '/' || clean === '/index.html') return lang === 'tr' ? '/tr/' : '/en/';
    return `/${lang}${clean.startsWith('/') ? clean : `/${clean}`}`;
  }
  return lang === 'tr' ? page.tr : page.en;
}

export function resolveMeta(page, lang) {
  const bundle = page.meta?.[lang];
  if (!bundle) return null;
  return {
    title: bundle.title,
    description: bundle.description,
    ogTitle: bundle.ogTitle || bundle.title,
    ogDescription: bundle.ogDescription || bundle.description,
  };
}

export function getPageById(id) {
  return SEO_PAGES.find((page) => page.id === id);
}

export function loadSeoData() {
  return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
}

export function saveSeoData(nextData) {
  fs.writeFileSync(dataPath, JSON.stringify(nextData, null, 2) + '\n', 'utf8');
}

export { dataPath as SEO_PAGES_DATA_PATH };
