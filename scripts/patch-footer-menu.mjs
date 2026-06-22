import fs from 'fs';
import path from 'path';

const root = path.resolve(import.meta.dirname, '..');
const snippet = fs.readFileSync(path.join(import.meta.dirname, 'footer-inner-snippet.html'), 'utf8').trimEnd();

const footerInnerRe = /(<div class="footer__inner">)[\s\S]*?(<\/div>\s*<div class="footer__bottom">)/;

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name === 'node_modules' || name === '.git' || name === 'admin') continue;
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, files);
    else if (name.endsWith('.html')) files.push(p);
  }
  return files;
}

let changed = 0;
for (const file of walk(root)) {
  const html = fs.readFileSync(file, 'utf8');
  if (!html.includes('class="footer__inner"') || !html.includes('footer__bottom')) continue;
  if (!footerInnerRe.test(html)) {
    console.warn('skip (no match):', path.relative(root, file));
    continue;
  }
  const updated = html.replace(footerInnerRe, `$1\n${snippet}\n    $2`);
  if (updated === html) continue;
  fs.writeFileSync(file, updated, 'utf8');
  changed++;
  console.log(path.relative(root, file));
}

console.log('Total:', changed);
