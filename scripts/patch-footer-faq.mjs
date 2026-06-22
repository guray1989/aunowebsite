import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

const sectorPages = {
  'confectionery-chocolate.html': {
    href: 'confectionery-chocolate.html',
    i18n: 'sector-confectionery',
    label: 'Şekerleme & Atıştırmalıklar',
  },
  'meat-dairy.html': {
    href: 'meat-dairy.html',
    i18n: 'sector-meat-dairy',
    label: 'Et & Süt Ürünleri',
  },
  'ready-meals.html': {
    href: 'ready-meals.html',
    i18n: 'sector-ready-meals',
    label: 'Hazır Yemek & Meal Kit',
  },
  'dry-foods.html': {
    href: 'dry-foods.html',
    i18n: 'sector-premium',
    label: 'Kuru Gıdalar',
  },
};

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', '.git', 'admin'].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.name.endsWith('.html')) files.push(full);
  }
  return files;
}

function detectSectorPrefix(html) {
  const match = html.match(/href="([^"]*?)confectionery-chocolate\.html"/);
  return match ? match[1] : null;
}

function faqColumnAll(prefix, indent) {
  const inner = indent + '  ';
  const li = inner + '  ';
  const sectors = [
    ['confectionery-chocolate.html', 'sector-confectionery', 'Şekerleme & Atıştırmalıklar'],
    ['meat-dairy.html', 'sector-meat-dairy', 'Et & Süt Ürünleri'],
    ['ready-meals.html', 'sector-ready-meals', 'Hazır Yemek & Meal Kit'],
    ['dry-foods.html', 'sector-premium', 'Kuru Gıdalar'],
  ];
  const lines = [
    `${indent}<div class="footer__column">`,
    `${inner}<h4 data-i18n="sector-faq-title">Sıkça Sorulan Sorular</h4>`,
    `${inner}<ul>`,
  ];
  for (const [file, i18n, label] of sectors) {
    lines.push(`${li}<li><a href="${prefix}${file}" data-i18n="${i18n}">${label}</a></li>`);
  }
  lines.push(`${inner}</ul>`, `${indent}</div>`);
  return lines.join('\n');
}

function faqColumnSingle(sector, indent) {
  const inner = indent + '  ';
  const li = inner + '  ';
  return [
    `${indent}<div class="footer__column">`,
    `${inner}<h4 data-i18n="sector-faq-title">Sıkça Sorulan Sorular</h4>`,
    `${inner}<ul>`,
    `${li}<li><a href="${sector.href}" data-i18n="${sector.i18n}">${sector.label}</a></li>`,
    `${inner}</ul>`,
    `${indent}</div>`,
  ].join('\n');
}

const contactRe =
  /(\n)([ \t]*)<div class="footer__column">\s*\n\s*<h4 data-i18n="nav-contact">/;

let updated = 0;
for (const file of walk(root)) {
  let html = fs.readFileSync(file, 'utf8');
  if (!html.includes('class="footer"') || !html.includes('nav-contact')) continue;
  if (html.includes('sector-faq-title') && html.includes('footer__column')) {
    html = html.replace(/\.html#sss/g, '.html').replace(/href="#sss"/g, (match, offset, str) => {
      const base = path.basename(file);
      const sector = sectorPages[base];
      return sector ? `href="${sector.href}"` : match;
    });
    if (html !== fs.readFileSync(file, 'utf8')) {
      fs.writeFileSync(file, html, 'utf8');
      updated++;
      console.log('cleaned:', path.relative(root, file));
    }
    continue;
  }

  const base = path.basename(file);
  const sector = sectorPages[base];
  const match = html.match(contactRe);
  if (!match) continue;

  const indent = match[2];
  const block = sector
    ? faqColumnSingle(sector, indent)
    : faqColumnAll(detectSectorPrefix(html) || 'sectors/', indent);

  const next = html.replace(contactRe, `$1${block}$1${indent}<div class="footer__column">\n${indent}  <h4 data-i18n="nav-contact">`);
  if (next !== html) {
    fs.writeFileSync(file, next, 'utf8');
    updated++;
    console.log('patched:', path.relative(root, file));
  }
}

console.log('total:', updated);
