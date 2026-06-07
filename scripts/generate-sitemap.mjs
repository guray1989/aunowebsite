import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SEO_PAGES, SITE_ORIGIN } from './seo-pages.mjs';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const lastmod = new Date().toISOString().slice(0, 10);

function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function alternateLinks(page) {
  const tr = `${SITE_ORIGIN}${page.tr}`;
  const en = `${SITE_ORIGIN}${page.en}`;
  const xDefault = tr;
  return [
    `    <xhtml:link rel="alternate" hreflang="tr" href="${escapeXml(tr)}"/>`,
    `    <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(en)}"/>`,
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(xDefault)}"/>`,
  ].join('\n');
}

function urlEntry(loc, page) {
  return [
    '  <url>',
    `    <loc>${escapeXml(loc)}</loc>`,
    alternateLinks(page),
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${page.changefreq}</changefreq>`,
    `    <priority>${page.priority}</priority>`,
    '  </url>',
  ].join('\n');
}

const body = SEO_PAGES.flatMap((page) => [
  urlEntry(`${SITE_ORIGIN}${page.tr}`, page),
  urlEntry(`${SITE_ORIGIN}${page.en}`, page),
]).join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${body}
</urlset>
`;

for (const target of ['sitemap.xml', 'public/sitemap.xml']) {
  fs.writeFileSync(path.join(root, target), xml, 'utf8');
  console.log('wrote', target);
}
