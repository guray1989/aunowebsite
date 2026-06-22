import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

const logoHtml = `<a href="/" class="top-bar__logo top-bar__logo--brand" aria-label="Aunopack">
            <img src="/auno-logo.png" alt="" class="top-bar__logo-img" width="40" height="40" decoding="async">
            <span class="top-bar__logo-text">Aunopack</span>
          </a>`;

for (const rel of ['index.html', 'public/index.html']) {
  const file = path.join(root, rel);
  let html = fs.readFileSync(file, 'utf8');
  html = html.replace(
    /<a href="\/" class="top-bar__logo[^"]*"[^>]*>[\s\S]*?<\/a>/,
    logoHtml
  );
  fs.writeFileSync(file, html);
}

console.log('Home logo fixed');
