import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const NEW_ADDRESS = 'İnkılap Mahallesi, Sokullu Caddesi No:5 Ümraniye/İstanbul';

const addressBlock = (indent) =>
  `${indent}<div class="footer__address">\n` +
  `${indent}  <span data-i18n="address">${NEW_ADDRESS}</span>\n` +
  `${indent}  <img src="/assets/images/teknopark-istanbul.png" alt="Teknopark İstanbul" class="footer__teknopark-logo" loading="lazy">\n` +
  `${indent}</div>`;

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', '.git', 'admin'].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.name.endsWith('.html')) files.push(full);
  }
  return files;
}

function patchHtml(html) {
  if (!html.includes('data-i18n="address"')) return html;

  if (html.includes('footer__address')) {
    return html.replace(
      /<span data-i18n="address">[^<]*<\/span>/,
      `<span data-i18n="address">${NEW_ADDRESS}</span>`
    );
  }

  return html.replace(
    /(\n[ \t]*)<span data-i18n="address">[^<]*<\/span>(<br>)?/,
    (_, indent, br = '') => `${addressBlock(indent)}${br || ''}`
  );
}

let updated = 0;
for (const file of walk(root)) {
  const original = fs.readFileSync(file, 'utf8');
  const next = patchHtml(original);
  if (next !== original) {
    fs.writeFileSync(file, next, 'utf8');
    updated++;
    console.log(path.relative(root, file));
  }
}

console.log('total:', updated);
