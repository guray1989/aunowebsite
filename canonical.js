/**
 * Ensures each page has one canonical URL on https://aunopack.com (no www, no /tr|/en prefix).
 */
(function () {
  var SITE_ORIGIN = 'https://aunopack.com';

  function getPathWithoutLangPrefix(pathname) {
    var path = pathname || '/';
    return path.replace(/^\/(tr|en)(?=\/|$)/, '') || '/';
  }

  function resolveCanonicalPath(pathname) {
    var path = getPathWithoutLangPrefix(pathname);
    if (!path.startsWith('/')) path = '/' + path;

    if (path === '/index.html') return '/';
    if (path === '/solutions/index.html' || path === '/solutions') return '/solutions/';
    if (path === '/about.html') return '/about';
    if (path === '/contact.html') return '/contact';
    if (path === '/blog.html') return '/blog';

    var sectorMatch = path.match(/^\/sectors\/([^/]+)$/);
    if (sectorMatch) return '/sectors/' + sectorMatch[1] + '.html';

    return path;
  }

  function updateCanonicalLink() {
    var path = resolveCanonicalPath(window.location.pathname || '/');
    var url = SITE_ORIGIN + path;

    var link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  window.updateCanonicalLink = updateCanonicalLink;
  updateCanonicalLink();
})();
