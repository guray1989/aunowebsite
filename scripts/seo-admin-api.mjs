import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { loadSeoData, saveSeoData, SEO_PAGES_DATA_PATH } from './seo-pages.mjs';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

export function isLocalRequest(req) {
  const host = (req.headers.host || '').split(':')[0].toLowerCase();
  const ip = (req.socket?.remoteAddress || '').toLowerCase();
  const localHost =
    host === 'localhost' ||
    host === '127.0.0.1' ||
    host === '[::1]' ||
    host.endsWith('.localhost');
  const localIp =
    !ip ||
    ip === '127.0.0.1' ||
    ip === '::1' ||
    ip === '::ffff:127.0.0.1' ||
    ip.startsWith('::ffff:127.') ||
    ip.endsWith('127.0.0.1');
  return localHost && localIp;
}

export function readSeoPages() {
  return loadSeoData();
}

export function writeSeoPages(data) {
  if (!data || !Array.isArray(data.pages)) {
    throw new Error('Invalid SEO data: pages array required');
  }
  saveSeoData(data);
  return data;
}

export function upsertPage(page) {
  const data = readSeoPages();
  const index = data.pages.findIndex((p) => p.id === page.id);
  if (index === -1) {
    data.pages.push(page);
  } else {
    data.pages[index] = page;
  }
  writeSeoPages(data);
  return page;
}

export function deletePage(id) {
  const data = readSeoPages();
  const nextPages = data.pages.filter((p) => p.id !== id);
  if (nextPages.length === data.pages.length) {
    throw new Error(`Page not found: ${id}`);
  }
  data.pages = nextPages;
  writeSeoPages(data);
  return { deleted: id };
}

export function runSeoBuild() {
  return new Promise((resolve, reject) => {
    const child = spawn('npm run seo:build', {
      cwd: root,
      shell: true,
      stdio: ['ignore', 'pipe', 'pipe'],
      env: process.env,
    });

    let output = '';
    child.stdout.on('data', (chunk) => {
      output += chunk.toString();
    });
    child.stderr.on('data', (chunk) => {
      output += chunk.toString();
    });
    child.on('error', reject);
    child.on('close', (code) => {
      if (code === 0) resolve(output.trim());
      else reject(new Error(output.trim() || `seo:build exited with code ${code}`));
    });
  });
}

export { SEO_PAGES_DATA_PATH };
