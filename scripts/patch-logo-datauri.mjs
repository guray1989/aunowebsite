import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const uri = fs.readFileSync(path.join(root, 'scripts', 'auno-logo-datauri.txt'), 'utf8');

for (const rel of ['index.html', 'public/index.html']) {
  const file = path.join(root, rel);
  let html = fs.readFileSync(file, 'utf8');
  html = html.replace(/src="\/auno-logo\.png"/, `src="${uri}"`);
  fs.writeFileSync(file, html);
}

console.log('Logo embedded in index.html');
