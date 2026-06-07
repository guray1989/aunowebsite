/** Shared TR/EN URL pairs for sitemap, hreflang, and language switching. */
export const SITE_ORIGIN = 'https://www.aunopack.com';

export const SEO_PAGES = [
  {
    id: 'home',
    tr: '/tr/',
    en: '/en/',
    paths: ['/', '/index.html'],
    priority: '1.0',
    changefreq: 'monthly',
  },
  {
    id: 'solutions',
    tr: '/tr/solutions/',
    en: '/en/solutions/',
    paths: ['/solutions', '/solutions/', '/solutions/index.html'],
    priority: '0.9',
    changefreq: 'monthly',
  },
  {
    id: 'solutions-shelf-life',
    tr: '/tr/solutions/shelf-life',
    en: '/en/solutions/shelf-life',
    paths: ['/solutions/shelf-life'],
    priority: '0.85',
    changefreq: 'monthly',
  },
  {
    id: 'solutions-shelf-performance',
    tr: '/tr/solutions/shelf-performance',
    en: '/en/solutions/shelf-performance',
    paths: ['/solutions/shelf-performance'],
    priority: '0.85',
    changefreq: 'monthly',
  },
  {
    id: 'solutions-small-batches',
    tr: '/tr/solutions/small-batches',
    en: '/en/solutions/small-batches',
    paths: ['/solutions/small-batches'],
    priority: '0.85',
    changefreq: 'monthly',
  },
  {
    id: 'solutions-data-guided',
    tr: '/tr/solutions/data-guided',
    en: '/en/solutions/data-guided',
    paths: ['/solutions/data-guided'],
    priority: '0.85',
    changefreq: 'monthly',
  },
  {
    id: 'article-shelf-life',
    tr: '/tr/raf-omru-ambalaj-cozumleri',
    en: '/en/shelf-life-packaging-solutions',
    paths: [
      '/raf-omru-ambalaj-cozumleri',
      '/raf-omru-ambalaj-cozumleri.html',
      '/shelf-life-packaging-solutions',
    ],
    priority: '0.85',
    changefreq: 'monthly',
  },
  {
    id: 'article-shelf-performance',
    tr: '/tr/raf-performansi-ambalaj-cozumleri',
    en: '/en/shelf-performance-packaging-solutions',
    paths: [
      '/raf-performansi-ambalaj-cozumleri',
      '/raf-performansi-ambalaj-cozumleri.html',
      '/shelf-performance-packaging-solutions',
    ],
    priority: '0.85',
    changefreq: 'monthly',
  },
  {
    id: 'sector-confectionery',
    tr: '/tr/sectors/confectionery-chocolate',
    en: '/en/sectors/confectionery-chocolate',
    paths: ['/sectors/confectionery-chocolate', '/sectors/confectionery-chocolate.html'],
    priority: '0.8',
    changefreq: 'monthly',
  },
  {
    id: 'sector-meat-dairy',
    tr: '/tr/sectors/meat-dairy',
    en: '/en/sectors/meat-dairy',
    paths: ['/sectors/meat-dairy', '/sectors/meat-dairy.html'],
    priority: '0.8',
    changefreq: 'monthly',
  },
  {
    id: 'sector-ready-meals',
    tr: '/tr/sectors/ready-meals',
    en: '/en/sectors/ready-meals',
    paths: ['/sectors/ready-meals', '/sectors/ready-meals.html'],
    priority: '0.8',
    changefreq: 'monthly',
  },
  {
    id: 'sector-dry-foods',
    tr: '/tr/sectors/dry-foods',
    en: '/en/sectors/dry-foods',
    paths: ['/sectors/dry-foods', '/sectors/dry-foods.html'],
    priority: '0.8',
    changefreq: 'monthly',
  },
  {
    id: 'about',
    tr: '/tr/about',
    en: '/en/about',
    paths: ['/about', '/about.html'],
    priority: '0.8',
    changefreq: 'monthly',
  },
  {
    id: 'contact',
    tr: '/tr/contact',
    en: '/en/contact',
    paths: ['/contact', '/contact.html'],
    priority: '0.8',
    changefreq: 'monthly',
  },
  {
    id: 'blog',
    tr: '/tr/blog',
    en: '/en/blog',
    paths: ['/blog', '/blog.html'],
    priority: '0.7',
    changefreq: 'weekly',
  },
];

export function normalizePath(pathname) {
  let path = (pathname || '/').split('?')[0];
  path = path.replace(/^\/(tr|en)(?=\/|$)/, '') || '/';
  if (!path.startsWith('/')) path = '/' + path;
  if (path !== '/' && path.endsWith('/')) path = path.slice(0, -1);
  if (path === '/solutions/index.html') return '/solutions';
  if (path.endsWith('.html')) path = path.slice(0, -5);
  if (path === '/solutions') return '/solutions/';
  return path;
}

export function findPageByPath(pathname) {
  const normalized = normalizePath(pathname);
  return SEO_PAGES.find((page) =>
    page.paths.some((candidate) => normalizePath(candidate) === normalized)
  );
}

export function getLocalizedUrl(pathname, lang) {
  const page = findPageByPath(pathname);
  if (!page) {
    const clean = normalizePath(pathname);
    if (clean === '/' || clean === '/index.html') return lang === 'tr' ? '/tr/' : '/en/';
    return `/${lang}${clean.startsWith('/') ? clean : `/${clean}`}`;
  }
  return lang === 'tr' ? page.tr : page.en;
}
