/**
 * Local-only dev server: static site + SEO admin panel API.
 * Binds to 127.0.0.1 only — admin is not available on production deploy.
 */
import express from 'express';
import handler from 'serve-handler';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  isLocalRequest,
  readSeoPages,
  upsertPage,
  deletePage,
  runSeoBuild,
} from './seo-admin-api.mjs';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const adminDir = path.join(root, 'admin');
const adminIndex = path.join(adminDir, 'index.html');
const serveConfig = JSON.parse(fs.readFileSync(path.join(root, 'serve.json'), 'utf8'));
const PORT = Number(process.env.PORT || 3000);
const HOST = '127.0.0.1';

const app = express();
app.disable('x-powered-by');

function localOnly(req, res, next) {
  if (!isLocalRequest(req)) {
    return res.status(403).send('SEO Admin yalnızca localhost üzerinde kullanılabilir.');
  }
  next();
}

app.use(express.json({ limit: '2mb' }));

// Explicit index — express.static trailing-slash redirect causes /admin/ loop
app.get(['/admin', '/admin/'], localOnly, (_req, res) => {
  res.sendFile(adminIndex);
});

app.use(
  '/admin',
  localOnly,
  express.static(adminDir, { index: false, redirect: false })
);

app.use('/__seo-admin', localOnly);

app.get('/__seo-admin/api/status', (_req, res) => {
  res.json({ ok: true, local: true, dataFile: 'scripts/seo-pages.json' });
});

app.get('/__seo-admin/api/pages', (_req, res) => {
  res.json(readSeoPages());
});

app.put('/__seo-admin/api/pages/:id', (req, res) => {
  try {
    const page = { ...req.body, id: req.params.id };
    if (!page.meta?.tr || !page.meta?.en) {
      return res.status(400).json({ error: 'meta.tr and meta.en are required' });
    }
    upsertPage(page);
    res.json({ ok: true, page });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/__seo-admin/api/pages', (req, res) => {
  try {
    const page = req.body;
    if (!page.id) return res.status(400).json({ error: 'id is required' });
    const data = readSeoPages();
    if (data.pages.some((p) => p.id === page.id)) {
      return res.status(409).json({ error: `Page id already exists: ${page.id}` });
    }
    upsertPage(page);
    res.status(201).json({ ok: true, page });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/__seo-admin/api/pages/:id', (req, res) => {
  try {
    res.json(deletePage(req.params.id));
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

app.post('/__seo-admin/api/rebuild', async (_req, res) => {
  try {
    const output = await runSeoBuild();
    res.json({ ok: true, output });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/__seo-admin/api/pages/:id/meta', (req, res) => {
  try {
    const data = readSeoPages();
    const page = data.pages.find((p) => p.id === req.params.id);
    if (!page) return res.status(404).json({ error: 'Page not found' });

    page.meta = {
      tr: { ...page.meta.tr, ...req.body.tr },
      en: { ...page.meta.en, ...req.body.en },
    };
    upsertPage(page);
    res.json({ ok: true, page });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.use(async (req, res) => {
  await handler(req, res, {
    public: root,
    cleanUrls: false,
    redirects: (serveConfig.redirects || []).map((item) => ({
      source: item.source,
      destination: item.destination,
      type: item.type || 302,
    })),
    rewrites: serveConfig.rewrites || [],
  });
});

const server = app.listen(PORT, HOST, () => {
  console.log('');
  console.log('  AunoPack local dev');
  console.log(`  Site:  http://${HOST}:${PORT}/tr/`);
  console.log(`  Admin: http://${HOST}:${PORT}/admin/`);
  console.log('');
  console.log('  Admin yalnızca localhost — deploy\'da kapalı.');
  console.log('  SEO değişiklikleri scripts/seo-pages.json dosyasına yazılır.');
  console.log('');
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error('');
    console.error(`  Port ${PORT} dolu. Eski sunucuyu durdurun (Ctrl+C) ve tekrar çalıştırın:`);
    console.error('  npm run dev:static');
    console.error('');
    process.exit(1);
  }
  throw err;
});
