import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

function loadTranslations() {
  const src = fs.readFileSync(path.join(root, 'i18n.js'), 'utf8');
  const marker = 'const translations = ';
  const start = src.indexOf(marker);
  if (start < 0) throw new Error('translations object not found in i18n.js');

  let depth = 0;
  let started = false;
  let end = start + marker.length;
  for (let i = end; i < src.length; i++) {
    if (src[i] === '{') {
      depth++;
      started = true;
    } else if (src[i] === '}') {
      depth--;
      if (started && depth === 0) {
        end = i + 1;
        break;
      }
    }
  }

  const objectLiteral = src.slice(start + marker.length, end);
  return new Function(`return ${objectLiteral}`)();
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function fixImgAlts(html, tr) {
  return html.replace(
    /alt="([^"]*(?:\uFFFD|�)[^"]*)"/g,
    (match, badAlt, offset, whole) => {
      const slice = whole.slice(offset, offset + 1200);
      const keyMatch = slice.match(/data-i18n="([^"]+)"/);
      if (keyMatch && tr[keyMatch[1]]) {
        const plain = tr[keyMatch[1]].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
        return `alt="${plain.replace(/"/g, '&quot;')}"`;
      }
      const headingMatch = slice.match(/<h3[^>]*data-i18n="[^"]+"[^>]*>([^<]+)<\/h3>/);
      if (headingMatch) {
        const plain = headingMatch[1].replace(/&amp;/g, '&').trim();
        return `alt="${plain.replace(/"/g, '&quot;')}"`;
      }
      return match;
    }
  );
}

function fixFaqIntro(html, tr) {
  const intro = tr['sector-faq-intro'];
  if (!intro) return html;
  return html.replace(
    /<p class="faq__intro" data-i18n="sector-faq-intro">[\s\S]*?<\/p>/,
    `<p class="faq__intro" data-i18n="sector-faq-intro">${intro}\n          </p>`
  );
}

function fixStaticCorruption(html) {
  return html
    .replace(/Men�y� A�\/Kapat/g, 'Menüyü Aç/Kapat')
    .replace(/Mega men�/g, 'Mega menü')
    .replace(/S�k�a Sorulan Sorular/g, 'Sıkça Sorulan Sorular')
    .replace(/ilgili cevab� g�ster/g, 'ilgili cevabı göster');
}

function fixI18nFallbacks(html, tr) {
  let out = html;
  const keys = Object.keys(tr).sort((a, b) => b.length - a.length);

  for (const key of keys) {
    const value = tr[key];
    if (!value) continue;

    const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(
      `(data-i18n="${escapedKey}"[^>]*>)([\\s\\S]*?)(<\\/(?:h1|h2|h3|h4|h5|h6|p|span|button|a|li|label|legend|option|div|td|th|dt|dd|strong|em|small)>)`,
      'g'
    );

    out = out.replace(re, (match, open, content, closeTag) => {
      if (!content.includes('\uFFFD') && !content.includes('�')) return match;
      const inner = /<[^>]+>/.test(value) ? value : escapeHtml(value);
      return open + inner + closeTag;
    });
  }

  return out;
}

const translations = loadTranslations();
const sectorFiles = [
  'sectors/confectionery-chocolate.html',
  'sectors/meat-dairy.html',
  'sectors/ready-meals.html',
  'sectors/dry-foods.html',
  'public/sectors/confectionery-chocolate.html',
  'public/sectors/meat-dairy.html',
  'public/sectors/ready-meals.html',
  'public/sectors/dry-foods.html',
];

let fixed = 0;
for (const relative of sectorFiles) {
  const filePath = path.join(root, relative);
  const original = fs.readFileSync(filePath, 'utf8');
  let next = fixI18nFallbacks(original, translations.tr);
  next = fixImgAlts(next, translations.tr);
  next = fixFaqIntro(next, translations.tr);
  next = fixStaticCorruption(next);
  if (next !== original) {
    fs.writeFileSync(filePath, next, 'utf8');
    const remaining = (next.match(/�/g) || []).length;
    console.log('fixed:', relative, remaining ? `(remaining: ${remaining})` : '(clean)');
    fixed++;
  } else {
    console.log('unchanged:', relative);
  }
}

console.log(`Done. ${fixed} file(s) updated.`);
