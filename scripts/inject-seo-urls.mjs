import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.git') continue;
      walk(full, files);
    } else if (entry.name.endsWith('.html')) {
      files.push(full);
    }
  }
  return files;
}

function scriptSrc(filePath, fileName) {
  const rel = path.relative(root, filePath).split(path.sep);
  const depth = rel.length - 1;
  if (depth <= 0) return `/${fileName}`;
  return `${'../'.repeat(depth)}${fileName}`;
}

function removeSeoScripts(html) {
  return html.replace(/<script src="[^"]*seo-urls\.js"><\/script>\s*/g, '');
}

function injectBefore(html, targetFile, insertTag) {
  const pattern = new RegExp(`<script src="[^"]*${targetFile.replace('.', '\\.')}"><\\/script>`);
  if (!pattern.test(html) || html.includes('seo-urls.js')) return html;
  return html.replace(pattern, `${insertTag}\n  <script src="${scriptSrc('', targetFile)}"></script>`.replace(`src="${scriptSrc('', targetFile)}"`, (match) => {
    const filePathMatch = html.match(pattern);
    if (!filePathMatch) return match;
    const original = filePathMatch[0];
    const src = original.match(/src="([^"]+)"/)[1];
    return insertTag.includes('seo-urls') ? insertTag : match;
  }));
}

let changed = 0;
for (const file of walk(root)) {
  let html = fs.readFileSync(file, 'utf8');
  const original = html;
  html = removeSeoScripts(html);

  const seoTag = `<script src="${scriptSrc(file, 'seo-urls.js')}"></script>`;
  const canonicalPattern = /<script src="[^"]*canonical\.js"><\/script>/;
  const i18nPattern = /<script src="[^"]*i18n\.js"><\/script>/;

  if (canonicalPattern.test(html)) {
    html = html.replace(
      canonicalPattern,
      `${seoTag}\n  <script src="${scriptSrc(file, 'canonical.js')}"></script>`
    );
  } else if (i18nPattern.test(html)) {
    html = html.replace(
      i18nPattern,
      `${seoTag}\n  <script src="${scriptSrc(file, 'i18n.js')}"></script>`
    );
  }

  if (html !== original) {
    fs.writeFileSync(file, html, 'utf8');
    changed++;
    console.log('updated:', path.relative(root, file));
  }
}

console.log(`Done. ${changed} HTML file(s) updated.`);
