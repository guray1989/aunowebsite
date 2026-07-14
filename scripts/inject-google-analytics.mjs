import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const GA_ID = 'G-C07320ZX9Y';
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

const SNIPPET = `<!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_ID}');
  </script>
`;

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'admin' || entry.name === '.next') continue;
      walk(full, files);
    } else if (entry.name.endsWith('.html')) {
      files.push(full);
    }
  }
  return files;
}

function stripExistingGa(html) {
  return html.replace(
    /\n?\s*<!-- Google tag \(gtag\.js\) -->\s*<script async src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-[A-Z0-9]+"><\/script>\s*<script>\s*window\.dataLayer[\s\S]*?<\/script>\s*/g,
    '\n'
  );
}

let changed = 0;
let skipped = 0;

for (const file of walk(root)) {
  let html = fs.readFileSync(file, 'utf8');
  if (!html.includes('</head>')) {
    skipped++;
    continue;
  }

  const cleaned = stripExistingGa(html);
  const updated = cleaned.replace('</head>', `${SNIPPET}</head>`);

  if (updated !== html) {
    fs.writeFileSync(file, updated, 'utf8');
    changed++;
    console.log('updated:', path.relative(root, file));
  }
}

console.log(`Done. ${changed} HTML file(s) updated, ${skipped} skipped.`);
