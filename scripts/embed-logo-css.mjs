import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const dataUri = fs.readFileSync(path.join(root, 'scripts', 'auno-logo-b64.txt'), 'utf8');

const logoCss = `
.top-bar__logo-mark {
  display: inline-block;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  background-image: url("${dataUri}");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
`;

for (const rel of ['styles.css', 'public/styles.css']) {
  const file = path.join(root, rel);
  let css = fs.readFileSync(file, 'utf8');
  css = css.replace(/\n\.top-bar__logo-mark[\s\S]*?\n\}/, '');
  css = css.replace(
    '.top-bar__logo--brand .top-bar__logo-img {',
    `${logoCss}\n.top-bar__logo--brand .top-bar__logo-img {`
  );
  if (!css.includes('.top-bar__logo-mark')) {
    css = css.replace(
      '.top-bar__logo--brand {',
      `${logoCss}\n.top-bar__logo--brand {`
    );
  }
  fs.writeFileSync(file, css);
}

const logoHtml = `<a href="/" class="top-bar__logo top-bar__logo--brand" aria-label="Aunopack">
            <span class="top-bar__logo-mark" aria-hidden="true"></span>
            <span class="top-bar__logo-text">Aunopack</span>
          </a>`;

for (const rel of ['index.html', 'public/index.html']) {
  const file = path.join(root, rel);
  let html = fs.readFileSync(file, 'utf8');
  html = html.replace(
    /<a href="\/" class="top-bar__logo top-bar__logo--brand"[\s\S]*?<\/a>/,
    logoHtml
  );
  fs.writeFileSync(file, html);
}

fs.copyFileSync(
  path.join(root, 'public', 'auno-logo.png'),
  path.join(root, 'public', 'assets', 'images', 'auno-logo.jpg')
);

console.log('Logo embedded in CSS');
