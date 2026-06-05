import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

const replacements = [
  ['href="/solutions/#shelf-life" class="article-page__back"', 'href="/solutions/" class="article-page__back"'],
  ['href="/solutions/#shelf-performance" class="article-page__back"', 'href="/solutions/" class="article-page__back"'],
  ['href="/solutions/#shelf-life" data-i18n="solutions-shelf-life-title"', 'href="/solutions/shelf-life" data-i18n="solutions-shelf-life-title"'],
  ['href="/solutions/#shelf-performance" data-i18n="solutions-shelf-performance-title"', 'href="/solutions/shelf-performance" data-i18n="solutions-shelf-performance-title"'],
  ['/solutions/#shelf-life', '/raf-omru-ambalaj-cozumleri'],
  ['/solutions/#shelf-performance', '/raf-performansi-ambalaj-cozumleri'],
  ['/solutions/#small-batches', '/solutions/small-batches'],
  ['/solutions/#data-guided', '/solutions/data-guided'],
  ['../solutions/#shelf-life', '/raf-omru-ambalaj-cozumleri'],
  ['../solutions/#shelf-performance', '/raf-performansi-ambalaj-cozumleri'],
  ['../solutions/#small-batches', '/solutions/small-batches'],
  ['../solutions/#data-guided', '/solutions/data-guided'],
  ['href="#shelf-life"', 'href="/raf-omru-ambalaj-cozumleri"'],
  ['href="#shelf-performance"', 'href="/raf-performansi-ambalaj-cozumleri"'],
  ['href="#small-batches"', 'href="/solutions/small-batches"'],
  ['href="#data-guided"', 'href="/solutions/data-guided"'],
];

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

let changed = 0;
for (const file of walk(root)) {
  let content = fs.readFileSync(file, 'utf8');
  const original = content;
  for (const [from, to] of replacements) {
    content = content.split(from).join(to);
  }
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    changed++;
    console.log('updated:', path.relative(root, file));
  }
}
console.log(`Done. ${changed} file(s) updated.`);
