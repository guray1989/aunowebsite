import fs from 'fs';
import path from 'path';

const root = process.cwd();

function writeLangSolutions(lang) {
  const src = path.join(root, 'solutions', 'index.html');
  let html = fs.readFileSync(src, 'utf8');
  html = html
    .replace(/href="\.\.\//g, 'href="../../')
    .replace(/src="\.\.\//g, 'src="../../')
    .replace(/href="solutions\.css"/g, 'href="../../solutions/solutions.css"');
  const dir = path.join(root, lang, 'solutions');
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
  console.log('wrote', path.join(lang, 'solutions', 'index.html'));
}

function writeLangRafOmru(lang) {
  const src = path.join(root, 'raf-omru-ambalaj-cozumleri.html');
  let html = fs.readFileSync(src, 'utf8');
  html = html
    .replace(/href="styles\.css"/g, 'href="../styles.css"')
    .replace(/href="canonical\.js"/g, 'href="../canonical.js"')
    .replace(/href="i18n\.js"/g, 'href="../i18n.js"')
    .replace(/href="navigation\.js"/g, 'href="../navigation.js"')
    .replace(/href="sector-images\.js"/g, 'href="../sector-images.js"')
    .replace(/href="index\.html"/g, 'href="../index.html"')
    .replace(/href="blog\.html"/g, 'href="../blog.html"')
    .replace(/href="about\.html"/g, 'href="../about.html"')
    .replace(/href="contact\.html"/g, 'href="../contact.html"')
    .replace(/href="sectors\//g, 'href="../sectors/');
  const dir = path.join(root, lang);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'raf-omru-ambalaj-cozumleri.html'), html, 'utf8');
  console.log('wrote', path.join(lang, 'raf-omru-ambalaj-cozumleri.html'));
}

writeLangSolutions('tr');
writeLangSolutions('en');
writeLangRafOmru('tr');
writeLangRafOmru('en');
