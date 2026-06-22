import fs from 'fs';
import path from 'path';

const root = path.resolve(import.meta.dirname, '..');
const about = fs.readFileSync(path.join(root, 'about.html'), 'utf8');

const headerStart = about.indexOf('<header class="top-bar"');
const headerEnd = about.indexOf('<div class="top-bar__mobile-backdrop"') + about.slice(about.indexOf('<div class="top-bar__mobile-backdrop"')).indexOf('></div>') + 6;
const headerBlock = about.slice(headerStart, headerEnd);

const footerStart = about.indexOf('<footer class="footer">');
const footerBlock = about.slice(footerStart, about.indexOf('</body>'));

const scriptsBlock = `  <script src="/seo-urls.js"></script>
  <script src="/seo-meta.js"></script>
  <script src="/canonical.js"></script>
  <script src="/i18n.js"></script>
  <script src="/navigation.js"></script>
  <script src="/sector-images.js"></script>
`;

function pageShell({ seoId, canonical, title, description, extraHead = '', main, extraScripts = '' }) {
  return `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="canonical" href="${canonical}">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/styles.css">
${extraHead}
</head>
<body data-seo-page-id="${seoId}" class="page--white page--platform">
${headerBlock}

${main}

${footerBlock}
${scriptsBlock}
${extraScripts}
</body>
</html>
`;
}

const simpleMain = (titleKey, descKey, bodyKey, cta) => `  <main class="page">
    <section class="hero hero--sector platform-page">
      <div class="feature">
        <div class="feature__copy platform-page__copy">
          <h1 class="hero__title" data-i18n="${titleKey}"></h1>
          <p class="platform-page__lead" data-i18n="${descKey}"></p>
          <div class="hero__description platform-page__body" data-i18n="${bodyKey}"></div>
          ${cta}
        </div>
      </div>
    </section>
  </main>`;

const aunoMain = `  <main class="page">
    <section class="hero hero--sector platform-page">
      <div class="feature">
        <div class="feature__copy platform-page__copy">
          <h1 class="hero__title" data-i18n="platform-aunoai-title">Auno AI</h1>
          <p class="platform-page__lead" data-i18n="platform-aunoai-desc">Yapay zeka destekli ambalaj seçim asistanı</p>
          <div class="hero__description platform-page__body">
            <p data-i18n="platform-aunoai-body">Auno AI Ambalaj Asistanı; ürününüzü, önceliklerinizi ve hedeflerinizi tanımlayarak size uygun ambalaj alternatiflerini keşfetmenize, karşılaştırmanıza ve değerlendirmenize yardımcı olur.</p>
            <ol class="platform-page__steps">
              <li><strong data-i18n="packaging-process-1-title">Sisteme Girin</strong><div data-i18n="packaging-process-1-desc"></div></li>
              <li><strong data-i18n="packaging-process-2-title">Ürününüzü Tanımlayın</strong><div data-i18n="packaging-process-2-desc"></div></li>
              <li><strong data-i18n="packaging-process-3-title">Ambalaj Alternatiflerini Keşfedin</strong><div data-i18n="packaging-process-3-desc"></div></li>
              <li><strong data-i18n="packaging-process-4-title">Karşılaştırın ve Değerlendirin</strong><div data-i18n="packaging-process-4-desc"></div></li>
              <li><strong data-i18n="packaging-process-5-title">Numune Talep Edin ve Sipariş Sürecini Başlatın</strong><div data-i18n="packaging-process-5-desc"></div></li>
            </ol>
          </div>
          <div class="platform-page__actions">
            <a href="https://ai.aunopack.com" class="top-bar__cta" target="_blank" rel="noopener noreferrer" data-i18n="platform-aunoai-cta">Asistanı Kullan</a>
          </div>
        </div>
      </div>
    </section>
  </main>`;

const pages = [
  {
    file: 'platform/auno-ai.html',
    seoId: 'platform-auno-ai',
    canonical: 'https://www.aunopack.com/platform/auno-ai',
    title: 'Auno AI | AUNOPACK',
    description: 'Yapay zeka destekli ambalaj seçim asistanı ile ürününüze uygun ambalaj alternatiflerini keşfedin.',
    main: aunoMain,
  },
  {
    file: 'platform/ambalaj-veritabani.html',
    seoId: 'platform-database',
    canonical: 'https://www.aunopack.com/platform/ambalaj-veritabani',
    title: 'Ambalaj Veritabanı | AUNOPACK',
    description: 'Ambalaj tipleri, malzeme yapıları, kullanım örnekleri ve pazar uygulamalarından oluşan ambalaj bilgi tabanı.',
    main: simpleMain(
      'platform-database-title',
      'platform-database-desc',
      'platform-database-body',
      `<div class="platform-page__actions"><a href="/contact.html" class="top-bar__cta" data-i18n="platform-database-cta">Veritabanını Keşfedin</a></div>`
    ),
  },
  {
    file: 'platform/ambalaj-analizleri.html',
    seoId: 'platform-market',
    canonical: 'https://www.aunopack.com/platform/ambalaj-analizleri',
    title: 'Ambalaj Analizleri | AUNOPACK',
    description: 'Şirketlere özel ambalaj değerlendirmeleri, fırsat alanları ve çözüm raporları.',
    main: simpleMain(
      'platform-market-title',
      'platform-market-desc',
      'platform-market-body',
      `<div class="platform-page__actions"><a href="/contact.html" class="top-bar__cta" data-i18n="platform-market-cta">Analiz Talep Edin</a></div>`
    ),
  },
];

fs.mkdirSync(path.join(root, 'platform'), { recursive: true });
fs.mkdirSync(path.join(root, 'public', 'platform'), { recursive: true });

for (const p of pages) {
  const html = pageShell(p);
  fs.writeFileSync(path.join(root, p.file), html, 'utf8');
  fs.writeFileSync(path.join(root, 'public', p.file), html, 'utf8');
  console.log('created', p.file);
}

// Veri destekli tasarım: copy from solutions/data-guided and adjust
let veri = fs.readFileSync(path.join(root, 'solutions/data-guided.html'), 'utf8');
veri = veri.replace(
  'data-seo-page-id="solutions-data-guided"',
  'data-seo-page-id="platform-data-guided"'
);
veri = veri.replace(
  'https://www.aunopack.com/solutions/data-guided',
  'https://www.aunopack.com/platform/veri-destekli-tasarim'
);
veri = veri.replace(
  '<title>Veri Odaklı Ambalaj Tasarımı | AUNOPACK</title>',
  '<title>Veri Destekli Tasarım | AUNOPACK</title>'
);
veri = veri.replace(/Veri Odaklı Ambalaj Tasarımı \| AUNOPACK/g, 'Veri Destekli Tasarım | AUNOPACK');
veri = veri.replace(
  '<h1 class="solutions-hero__title" data-i18n="solutions-data-guided-title">Veri Odaklı Ambalaj Tasarımı ve Malzeme Seçimi</h1>',
  '<h1 class="solutions-hero__title" data-i18n="platform-data-guided-title">🎨 Veri Destekli Tasarım</h1>'
);
veri = veri.replace(
  '<p class="solutions-hero__subtitle" data-i18n="platform-data-guided-desc">Binlerce ambalaj örneğinin analizinden elde edilen içgörülerle tasarım süreçlerini destekleyin. Veri temelli tasarım yönlendirmeleri alın veya yapay zeka ile yeni ambalaj tasarım alternatifleri oluşturun.</p>',
  '<p class="solutions-hero__subtitle" data-i18n="platform-data-guided-desc">Tasarım kararları için veri ve AI desteği</p>'
);
veri = veri.replace(
  '<p data-i18n="solutions-data-guided-p1">',
  '<p data-i18n="platform-data-guided-body">'
);
veri = veri.replace(
  '<p data-i18n="solutions-data-guided-p2">Sonuç; hızlandırılmış karar süreci ve maliyet–performans dengesi gözetilerek üretilen ölçülebilir alternatiflerdir.</p>\n',
  ''
);

const veriPath = path.join(root, 'platform/veri-destekli-tasarim.html');
fs.writeFileSync(veriPath, veri, 'utf8');
fs.writeFileSync(path.join(root, 'public/platform/veri-destekli-tasarim.html'), veri, 'utf8');
console.log('created platform/veri-destekli-tasarim.html');
