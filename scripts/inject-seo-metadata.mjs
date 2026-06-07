import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SEO_PAGES, resolveMeta } from './seo-pages.mjs';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

function escapeAttr(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;');
}

function replaceTitle(html, title) {
  return html.replace(/<title>[^<]*<\/title>/i, `<title>${escapeAttr(title)}</title>`);
}

function replaceOrInsertMeta(html, attr, name, content) {
  const tag = `<meta ${attr}="${name}" content="${escapeAttr(content)}">`;
  const re = new RegExp(`<meta\\s+${attr}=["']${name}["']\\s+content=["'][^"']*["']\\s*/?>`, 'i');
  if (re.test(html)) return html.replace(re, tag);
  return html.replace(/<title>[^<]*<\/title>/i, (match) => `${match}\n  ${tag}`);
}

function applyMetaToHtml(html, page, lang = 'tr') {
  const meta = resolveMeta(page, lang);
  if (!meta) return html;

  let out = html;
  out = replaceTitle(out, meta.title);
  out = replaceOrInsertMeta(out, 'name', 'description', meta.description);
  out = replaceOrInsertMeta(out, 'property', 'og:title', meta.ogTitle);
  out = replaceOrInsertMeta(out, 'property', 'og:description', meta.ogDescription);
  out = replaceOrInsertMeta(out, 'name', 'twitter:title', meta.ogTitle);
  out = replaceOrInsertMeta(out, 'name', 'twitter:description', meta.ogDescription);

  if (/<body\b[^>]*data-seo-page-id=/i.test(out)) {
    out = out.replace(
      /(<body\b[^>]*\b)data-seo-page-id=["'][^"']*["']/i,
      `$1 data-seo-page-id="${page.id}"`
    );
  } else if (/<body\b/i.test(out)) {
    out = out.replace(/<body\b/i, `<body data-seo-page-id="${page.id}"`);
  }

  out = out.replace(/\sdata-seo-title-key=["'][^"']*["']/gi, '');

  return out;
}

let updated = 0;
let skipped = 0;

for (const page of SEO_PAGES) {
  if (!page.htmlFiles?.length) continue;
  const lang = 'tr';

  for (const relativeFile of page.htmlFiles) {
    const filePath = path.join(root, relativeFile);
    if (!fs.existsSync(filePath)) {
      console.warn('skip missing:', relativeFile);
      skipped++;
      continue;
    }

    const original = fs.readFileSync(filePath, 'utf8');
    const next = applyMetaToHtml(original, page, lang);
    if (next !== original) {
      fs.writeFileSync(filePath, next, 'utf8');
      updated++;
      console.log('injected:', relativeFile, `(${page.id})`);
    }
  }
}

console.log(`Done. ${updated} file(s) updated, ${skipped} skipped.`);
