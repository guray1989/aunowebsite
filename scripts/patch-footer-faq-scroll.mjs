import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const sectorFiles = [
  'confectionery-chocolate.html',
  'meat-dairy.html',
  'ready-meals.html',
  'dry-foods.html',
];

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', '.git', 'admin'].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.name.endsWith('.html')) files.push(full);
  }
  return files;
}

function removeDuplicateFaqColumn(footer) {
  return footer.replace(
    /\n[ \t]*<div class="footer__column">\s*\n[ \t]*<h4 data-i18n="sector-faq-title">[\s\S]*?\n[ \t]*<\/div>(?=\s*\n[ \t]*<div class="footer__column">\s*\n[ \t]*<h4 data-i18n="nav-contact">)/,
    ''
  );
}

function patchFooter(html) {
  const footerStart = html.indexOf('<footer');
  if (footerStart === -1) return html;
  const footerEnd = html.indexOf('</footer>', footerStart);
  if (footerEnd === -1) return html;

  let footer = html.slice(footerStart, footerEnd + 9);
  footer = removeDuplicateFaqColumn(footer);

  for (const file of sectorFiles) {
    const escaped = file.replace('.', '\\.');
    const re = new RegExp(`href="([^"]*?${escaped})(?:#faq)?"`, 'g');
    footer = footer.replace(re, 'href="$1#faq"');
  }

  return html.slice(0, footerStart) + footer + html.slice(footerEnd + 9);
}

function patchFaqSection(html) {
  if (!html.includes('class="features faq-section"')) return html;
  if (html.includes('id="faq"')) return html;
  return html.replace(
    /<section class="features faq-section">/,
    '<section id="faq" class="features faq-section">'
  );
}

let updated = 0;
for (const file of walk(root)) {
  const original = fs.readFileSync(file, 'utf8');
  let next = patchFooter(original);
  next = patchFaqSection(next);
  if (next !== original) {
    fs.writeFileSync(file, next, 'utf8');
    updated++;
    console.log('updated:', path.relative(root, file));
  }
}

console.log('total:', updated);
