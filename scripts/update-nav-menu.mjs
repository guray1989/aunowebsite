import fs from 'fs';
import path from 'path';

const root = path.resolve(import.meta.dirname, '..');
const snippet = fs.readFileSync(path.join(import.meta.dirname, 'nav-menu-snippet.html'), 'utf8');

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name === 'node_modules' || name === '.git') continue;
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, files);
    else if (name.endsWith('.html') && !p.includes(`${path.sep}admin${path.sep}`)) files.push(p);
  }
  return files;
}

function findReplaceRange(html) {
  const blogIdx = html.indexOf('data-i18n="nav-case-studies"');
  if (blogIdx === -1) return null;

  const logoIdx = html.indexOf('top-bar__logo');
  if (logoIdx === -1) return null;

  const firstMenuIdx = html.indexOf('data-menu=', logoIdx);
  if (firstMenuIdx === -1 || firstMenuIdx > blogIdx) return null;

  const start = html.lastIndexOf('<div class="top-bar__item', firstMenuIdx);
  if (start === -1) return null;

  const blogComment = html.lastIndexOf('<!-- Blog -->', blogIdx);
  let end = blogComment !== -1 ? blogComment : html.lastIndexOf('<a href', blogIdx);
  if (end <= start) return null;

  return [start, end];
}

let changed = 0;
for (const file of walk(root)) {
  const html = fs.readFileSync(file, 'utf8');
  if (!html.includes('data-menu=') || !html.includes('nav-case-studies')) continue;

  const range = findReplaceRange(html);
  if (!range) {
    console.warn('skip (no range):', path.relative(root, file));
    continue;
  }

  const [start, end] = range;
  const updated = html.slice(0, start) + snippet + html.slice(end);
  fs.writeFileSync(file, updated, 'utf8');
  changed++;
  console.log(path.relative(root, file));
}

console.log('Total:', changed);
