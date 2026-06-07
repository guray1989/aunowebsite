(function () {
  var SITE_ORIGIN = 'https://www.aunopack.com';

  var SEO_PAGES = [
    { id: 'home', tr: '/tr/', en: '/en/', paths: ['/', '/index.html'] },
    { id: 'solutions', tr: '/tr/solutions/', en: '/en/solutions/', paths: ['/solutions', '/solutions/', '/solutions/index.html'] },
    { id: 'solutions-shelf-life', tr: '/tr/solutions/shelf-life', en: '/en/solutions/shelf-life', paths: ['/solutions/shelf-life'] },
    { id: 'solutions-shelf-performance', tr: '/tr/solutions/shelf-performance', en: '/en/solutions/shelf-performance', paths: ['/solutions/shelf-performance'] },
    { id: 'solutions-small-batches', tr: '/tr/solutions/small-batches', en: '/en/solutions/small-batches', paths: ['/solutions/small-batches'] },
    { id: 'solutions-data-guided', tr: '/tr/solutions/data-guided', en: '/en/solutions/data-guided', paths: ['/solutions/data-guided'] },
    {
      id: 'article-shelf-life',
      tr: '/tr/raf-omru-ambalaj-cozumleri',
      en: '/en/shelf-life-packaging-solutions',
      paths: ['/raf-omru-ambalaj-cozumleri', '/raf-omru-ambalaj-cozumleri.html', '/shelf-life-packaging-solutions']
    },
    {
      id: 'article-shelf-performance',
      tr: '/tr/raf-performansi-ambalaj-cozumleri',
      en: '/en/shelf-performance-packaging-solutions',
      paths: ['/raf-performansi-ambalaj-cozumleri', '/raf-performansi-ambalaj-cozumleri.html', '/shelf-performance-packaging-solutions']
    },
    { id: 'sector-confectionery', tr: '/tr/sectors/confectionery-chocolate', en: '/en/sectors/confectionery-chocolate', paths: ['/sectors/confectionery-chocolate', '/sectors/confectionery-chocolate.html'] },
    { id: 'sector-meat-dairy', tr: '/tr/sectors/meat-dairy', en: '/en/sectors/meat-dairy', paths: ['/sectors/meat-dairy', '/sectors/meat-dairy.html'] },
    { id: 'sector-ready-meals', tr: '/tr/sectors/ready-meals', en: '/en/sectors/ready-meals', paths: ['/sectors/ready-meals', '/sectors/ready-meals.html'] },
    { id: 'sector-dry-foods', tr: '/tr/sectors/dry-foods', en: '/en/sectors/dry-foods', paths: ['/sectors/dry-foods', '/sectors/dry-foods.html'] },
    { id: 'about', tr: '/tr/about', en: '/en/about', paths: ['/about', '/about.html'] },
    { id: 'contact', tr: '/tr/contact', en: '/en/contact', paths: ['/contact', '/contact.html'] },
    { id: 'blog', tr: '/tr/blog', en: '/en/blog', paths: ['/blog', '/blog.html'] }
  ];

  function normalizePath(pathname) {
    var path = pathname || '/';
    path = path.replace(/^\/(tr|en)(?=\/|$)/, '') || '/';
    if (!path.startsWith('/')) path = '/' + path;
    if (path !== '/' && path.endsWith('/')) path = path.slice(0, -1);
    if (path === '/solutions/index.html') return '/solutions';
    if (path.endsWith('.html')) path = path.slice(0, -5);
    if (path === '/solutions') return '/solutions/';
    return path;
  }

  function findPageByPath(pathname) {
    var normalized = normalizePath(pathname);
    for (var i = 0; i < SEO_PAGES.length; i++) {
      var page = SEO_PAGES[i];
      for (var j = 0; j < page.paths.length; j++) {
        if (normalizePath(page.paths[j]) === normalized) return page;
      }
    }
    return null;
  }

  function getLocalizedPath(pathname, lang) {
    var page = findPageByPath(pathname);
    if (!page) {
      var clean = normalizePath(pathname);
      if (clean === '/' || clean === '/index.html') return lang === 'tr' ? '/tr/' : '/en/';
      return '/' + lang + (clean.startsWith('/') ? clean : '/' + clean);
    }
    return lang === 'tr' ? page.tr : page.en;
  }

  window.SEO_SITE_ORIGIN = SITE_ORIGIN;
  window.SEO_PAGES = SEO_PAGES;
  window.normalizeSeoPath = normalizePath;
  window.findSeoPageByPath = findPageByPath;
  window.getLocalizedSeoPath = getLocalizedPath;
})();
