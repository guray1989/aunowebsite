import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

const sectors = [
  ['confectionery-chocolate.html', 'sector-confectionery', 'Şekerleme & Atıştırmalıklar'],
  ['meat-dairy.html', 'sector-meat-dairy', 'Et & Süt Ürünleri'],
  ['ready-meals.html', 'sector-ready-meals', 'Hazır Yemek & Meal Kit'],
  ['dry-foods.html', 'sector-premium', 'Kuru Gıdalar'],
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

function buildFaqColumn(prefix, indent) {
  const inner = indent + '  ';
  const li = inner + '  ';
  const lines = [
    `${indent}<div class="footer__column">`,
    `${inner}<h4 data-i18n="sector-faq-title">Sıkça Sorulan Sorular</h4>`,
    `${inner}<ul>`,
  ];
  for (const [file, i18n, label] of sectors) {
    lines.push(`${li}<li><a href="${prefix}${file}#faq" data-i18n="${i18n}">${label}</a></li>`);
  }
  lines.push(`${inner}</ul>`, `${indent}</div>`);
  return lines.join('\n');
}

function patchFooter(html) {
  const footerStart = html.indexOf('<footer');
  if (footerStart === -1) return html;
  const footerEnd = html.indexOf('</footer>', footerStart);
  if (footerEnd === -1) return html;

  let footer = html.slice(footerStart, footerEnd + 9);

  footer = footer.replace(
    /(<div class="footer__column">\s*\n\s*<h4 data-i18n="nav-sectors">[\s\S]*?<ul>)([\s\S]*?)(<\/ul>)/,
    (_, head, ulContent, tail) => head + ulContent.replace(/\.html#faq"/g, '.html"') + tail
  );

  const prefixMatch = footer.match(
    /data-i18n="nav-sectors">[\s\S]*?href="([^"]*?)confectionery-chocolate\.html"/
  );
  const prefix = prefixMatch ? prefixMatch[1] : 'sectors/';

  const contactMatch = footer.match(
    /\n( *)(<div class="footer__column">\s*\n\s*<h4 data-i18n="nav-contact">)/
  );
  if (!contactMatch) return html;

  const colIndent = contactMatch[1];
  const faqColumn = buildFaqColumn(prefix, colIndent);

  if (footer.includes('data-i18n="sector-faq-title"')) {
    footer = footer.replace(
      /(<div class="footer__column">\s*\n\s*<h4 data-i18n="sector-faq-title">[\s\S]*?<ul>)([\s\S]*?)(<\/ul>)/,
      (_, head, ulContent, tail) => {
        let next = ulContent;
        for (const [file] of sectors) {
          const escaped = file.replace('.', '\\.');
          next = next.replace(
            new RegExp(`href="([^"]*?${escaped})(?:#faq)?"`, 'g'),
            'href="$1#faq"'
          );
        }
        return head + next + tail;
      }
    );
  } else {
    footer = footer.replace(
      `\n${colIndent}<div class="footer__column">\n${colIndent}  <h4 data-i18n="nav-contact">`,
      `\n${faqColumn}\n${colIndent}<div class="footer__column">\n${colIndent}  <h4 data-i18n="nav-contact">`
    );
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
  if (!original.includes('class="footer"')) continue;
  let next = patchFooter(original);
  next = patchFaqSection(next);
  if (next !== original) {
    fs.writeFileSync(file, next, 'utf8');
    updated++;
    console.log('updated:', path.relative(root, file));
  }
}

console.log('total:', updated);
