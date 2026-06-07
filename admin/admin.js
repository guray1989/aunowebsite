const API = '/__seo-admin/api';
const SITE_ORIGIN = 'https://www.aunopack.com';
const TITLE_LIMIT = 60;
const DESC_LIMIT = 155;

let seoData = null;
let selectedId = null;
let isNewPage = false;

const pageList = document.getElementById('page-list');
const emptyState = document.getElementById('empty-state');
const editor = document.getElementById('editor');
const toast = document.getElementById('toast');
const dialogAdd = document.getElementById('dialog-add');
const formAdd = document.getElementById('form-add');

async function api(path, options = {}) {
  const res = await fetch(`${API}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.error || res.statusText);
  return body;
}

function showToast(message, type = 'ok') {
  toast.textContent = message;
  toast.className = `toast ${type}`;
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.add('hidden'), 4500);
}

function splitList(value) {
  return (value || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

function joinList(arr) {
  return (arr || []).join(', ');
}

function getPage(id) {
  return seoData?.pages?.find((p) => p.id === id);
}

function renderPageList() {
  pageList.innerHTML = '';
  const pages = [...(seoData?.pages || [])];
  pages.sort((a, b) => a.id.localeCompare(b.id));

  for (const page of pages) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `nav-item${page.id === selectedId ? ' active' : ''}`;
    btn.dataset.id = page.id;
    btn.innerHTML = `
      <div class="nav-item__label">${escapeHtml(page.meta?.tr?.title || page.id)}</div>
      <div class="nav-item__path">${escapeHtml(page.tr)}</div>
      <div class="nav-item__path nav-item__path--en">${escapeHtml(page.meta?.en?.title || '—')}</div>
      <div class="nav-item__path nav-item__path--en">${escapeHtml(page.en)}</div>
    `;
    btn.addEventListener('click', () => selectPage(page.id));
    pageList.appendChild(btn);
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

function setMetaField(key, value) {
  const el = document.querySelector(`[data-meta="${key}"]`);
  if (el) el.value = value || '';
}

function syncOgForLang(lang) {
  const title = val(`${lang}-title`);
  const desc = val(`${lang}-description`);
  setMetaField(`${lang}-ogTitle`, title);
  setMetaField(`${lang}-ogDescription`, desc);
}

function normalizeMetaBundle(bundle, lang) {
  const title = (bundle?.title || '').trim();
  const description = (bundle?.description || '').trim();
  return {
    title,
    description,
    ogTitle: (bundle?.ogTitle || title).trim(),
    ogDescription: (bundle?.ogDescription || description).trim(),
  };
}

function getMetaFromForm() {
  const tr = normalizeMetaBundle(
    {
      title: val('tr-title'),
      description: val('tr-description'),
      ogTitle: val('tr-ogTitle'),
      ogDescription: val('tr-ogDescription'),
    },
    'tr'
  );
  const en = normalizeMetaBundle(
    {
      title: val('en-title'),
      description: val('en-description'),
      ogTitle: val('en-ogTitle'),
      ogDescription: val('en-ogDescription'),
    },
    'en'
  );
  return { tr, en };
}

function val(key) {
  return document.querySelector(`[data-meta="${key}"]`)?.value?.trim() || '';
}

function fillEditor(page) {
  isNewPage = false;
  document.getElementById('field-id').value = page.id;
  document.getElementById('field-id').readOnly = true;
  document.getElementById('field-tr').value = page.tr || '';
  document.getElementById('field-en').value = page.en || '';
  document.getElementById('field-paths').value = joinList(page.paths);
  document.getElementById('field-htmlFiles').value = joinList(page.htmlFiles);
  document.getElementById('field-priority').value = page.priority || '0.8';
  document.getElementById('field-changefreq').value = page.changefreq || 'monthly';

  setMetaField('tr-title', page.meta?.tr?.title);
  setMetaField('tr-description', page.meta?.tr?.description);
  setMetaField('tr-ogTitle', page.meta?.tr?.ogTitle || page.meta?.tr?.title);
  setMetaField('tr-ogDescription', page.meta?.tr?.ogDescription || page.meta?.tr?.description);
  setMetaField('en-title', page.meta?.en?.title);
  setMetaField('en-description', page.meta?.en?.description);
  setMetaField('en-ogTitle', page.meta?.en?.ogTitle || page.meta?.en?.title);
  setMetaField('en-ogDescription', page.meta?.en?.ogDescription || page.meta?.en?.description);

  const activeLang = document.querySelector('.lang-tabs__btn.active')?.dataset.lang || 'tr';
  const activeTitle =
    activeLang === 'en' ? page.meta?.en?.title : page.meta?.tr?.title;
  document.getElementById('editor-title').textContent = activeTitle || page.id;
  document.getElementById('editor-id').textContent = page.id;

  document.getElementById('preview-tr').href = page.tr || '/tr/';
  document.getElementById('preview-en').href = page.en || '/en/';

  updateCounters();
  updateSerpPreview(page);
}

function selectPage(id) {
  selectedId = id;
  const page = getPage(id);
  if (!page) return;
  emptyState.classList.add('hidden');
  editor.classList.remove('hidden');
  fillEditor(page);
  renderPageList();
}

function updateCounters() {
  updateCounter('tr-title', TITLE_LIMIT);
  updateCounter('en-title', TITLE_LIMIT);
  updateCounter('tr-description', DESC_LIMIT);
  updateCounter('en-description', DESC_LIMIT);
}

function updateCounter(field, limit) {
  const input = document.querySelector(`[data-meta="${field}"]`);
  const counter = document.querySelector(`[data-counter="${field}"]`);
  if (!input || !counter) return;
  const len = input.value.length;
  counter.textContent = `${len} / ${limit}${field.includes('title') ? ' önerilen' : ' önerilen'}`;
  counter.classList.toggle('warn', len > limit * 0.9 && len <= limit);
  counter.classList.toggle('over', len > limit);
}

function updateSerpPreview(page) {
  const trTitle = val('tr-title') || page?.meta?.tr?.title || '';
  const trDesc = val('tr-description') || page?.meta?.tr?.description || '';
  const enTitle = val('en-title') || page?.meta?.en?.title || '';
  const enDesc = val('en-description') || page?.meta?.en?.description || '';

  document.getElementById('serp-tr-title').textContent = trTitle;
  document.getElementById('serp-tr-url').textContent = SITE_ORIGIN + (page?.tr || '/tr/');
  document.getElementById('serp-tr-desc').textContent = trDesc;

  document.getElementById('serp-en-title').textContent = enTitle;
  document.getElementById('serp-en-url').textContent = SITE_ORIGIN + (page?.en || '/en/');
  document.getElementById('serp-en-desc').textContent = enDesc;
}

function collectPageFromForm() {
  const id = document.getElementById('field-id').value.trim();
  return {
    id,
    tr: document.getElementById('field-tr').value.trim(),
    en: document.getElementById('field-en').value.trim(),
    paths: splitList(document.getElementById('field-paths').value),
    htmlFiles: splitList(document.getElementById('field-htmlFiles').value),
    priority: document.getElementById('field-priority').value.trim() || '0.8',
    changefreq: document.getElementById('field-changefreq').value,
    meta: getMetaFromForm(),
  };
}

async function loadPages() {
  seoData = await api('/pages');
  renderPageList();
}

async function saveAndRebuild() {
  const page = collectPageFromForm();
  // og alanları yalnızca kendi dilinden türetilir — TR→EN karışmaz
  page.meta.tr.ogTitle = page.meta.tr.title;
  page.meta.tr.ogDescription = page.meta.tr.description;
  page.meta.en.ogTitle = page.meta.en.title;
  page.meta.en.ogDescription = page.meta.en.description;
  if (!page.id || !page.tr || !page.en) {
    showToast('ID, TR ve EN URL zorunludur.', 'err');
    return;
  }
  if (!page.meta.tr.title || !page.meta.en.title) {
    showToast('TR ve EN title zorunludur.', 'err');
    return;
  }

  showToast('Kaydediliyor…', 'ok');
  await api(`/pages/${encodeURIComponent(page.id)}`, {
    method: 'PUT',
    body: JSON.stringify(page),
  });

  showToast('Derleniyor (seo:build)…', 'ok');
  const result = await api('/rebuild', { method: 'POST' });
  await loadPages();
  selectPage(page.id);
  showToast('Kaydedildi ve HTML güncellendi.', 'ok');
  if (result.output) console.log(result.output);
}

async function rebuildAll() {
  showToast('seo:build çalışıyor…', 'ok');
  await api('/rebuild', { method: 'POST' });
  showToast('Derleme tamamlandı.', 'ok');
}

async function deleteCurrent() {
  if (!selectedId) return;
  if (!confirm(`"${selectedId}" sayfasını silmek istediğinize emin misiniz?`)) return;
  await api(`/pages/${encodeURIComponent(selectedId)}`, { method: 'DELETE' });
  await api('/rebuild', { method: 'POST' });
  selectedId = null;
  editor.classList.add('hidden');
  emptyState.classList.remove('hidden');
  await loadPages();
  showToast('Sayfa silindi.', 'ok');
}

function openAddDialog() {
  formAdd.reset();
  dialogAdd.showModal();
}

function createNewPage(e) {
  e.preventDefault();
  const fd = new FormData(formAdd);
  const id = String(fd.get('newId')).trim();
  const tr = String(fd.get('newTr')).trim();
  const en = String(fd.get('newEn')).trim();
  const paths = splitList(String(fd.get('newPaths') || ''));
  if (!paths.length) paths.push(tr.replace(/^\/tr/, '') || '/');

  const page = {
    id,
    tr,
    en,
    paths,
    priority: '0.8',
    changefreq: 'monthly',
    meta: {
      tr: { title: `${id} | AUNOPACK`, description: '' },
      en: { title: `${id} | AUNOPACK`, description: '' },
    },
  };

  api('/pages', { method: 'POST', body: JSON.stringify(page) })
    .then(async () => {
      dialogAdd.close();
      await loadPages();
      selectPage(id);
      showToast('Yeni sayfa oluşturuldu. Meta alanlarını doldurup kaydedin.', 'ok');
    })
    .catch((err) => showToast(err.message, 'err'));
}

document.querySelectorAll('.lang-tabs__btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const lang = btn.dataset.lang;
    document.querySelectorAll('.lang-tabs__btn').forEach((b) => {
      b.classList.toggle('active', b === btn);
      b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
    });
    document.querySelectorAll('[data-lang-panel]').forEach((panel) => {
      panel.classList.toggle('hidden', panel.dataset.langPanel !== lang);
    });
    const page = getPage(selectedId);
    if (page) {
      document.getElementById('editor-title').textContent =
        lang === 'en' ? page.meta?.en?.title || page.id : page.meta?.tr?.title || page.id;
    }
  });
});

document.querySelectorAll('[data-meta^="tr-"]').forEach((el) => {
  el.addEventListener('input', () => {
    if (el.dataset.meta === 'tr-title' || el.dataset.meta === 'tr-description') {
      syncOgForLang('tr');
    }
    updateCounters();
    updateSerpPreview(getPage(selectedId));
  });
});

document.querySelectorAll('[data-meta^="en-"]').forEach((el) => {
  el.addEventListener('input', () => {
    if (el.dataset.meta === 'en-title' || el.dataset.meta === 'en-description') {
      syncOgForLang('en');
    }
    updateCounters();
    updateSerpPreview(getPage(selectedId));
  });
});

editor.addEventListener('submit', (e) => {
  e.preventDefault();
  saveAndRebuild().catch((err) => showToast(err.message, 'err'));
});

document.getElementById('btn-add-page').addEventListener('click', openAddDialog);
document.getElementById('btn-rebuild-all').addEventListener('click', () => {
  rebuildAll().catch((err) => showToast(err.message, 'err'));
});
document.getElementById('btn-delete').addEventListener('click', () => {
  deleteCurrent().catch((err) => showToast(err.message, 'err'));
});
document.getElementById('dialog-add-cancel').addEventListener('click', () => dialogAdd.close());
formAdd.addEventListener('submit', createNewPage);

loadPages()
  .then(() => showToast('Admin paneli hazır.', 'ok'))
  .catch((err) => {
    showToast('API bağlantı hatası: ' + err.message, 'err');
    emptyState.innerHTML = `<p style="color:#ff9a9a">Admin API yalnızca localhost'ta çalışır.<br><code>npm run dev:static</code> ile başlatın.</p>`;
  });
