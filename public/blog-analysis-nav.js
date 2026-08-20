(function () {
  const HERO_CLASS = 'blog-article__hero';
  const TOC_CLASS = 'blog-toc';
  const LINK_CLASS = 'blog-toc__link';

  function isAnalysisPage() {
    const pageId = document.body?.getAttribute('data-seo-page-id') || '';
    return pageId.startsWith('blog-analysis');
  }

  function buildToc() {
    const article = document.querySelector('.blog-article');
    const media = article?.querySelector('.blog-article__media');
    const content = article?.querySelector('.blog-article__content');
    if (!article || !media || !content) return;

    let hero = article.querySelector(`.${HERO_CLASS}`);
    if (!hero) {
      hero = document.createElement('div');
      hero.className = HERO_CLASS;
      media.parentNode.insertBefore(hero, media);
      hero.appendChild(media);
    }

    let toc = hero.querySelector(`.${TOC_CLASS}`);
    if (!toc) {
      toc = document.createElement('nav');
      toc.className = TOC_CLASS;
      toc.setAttribute('aria-label', document.documentElement.lang === 'en' ? 'Sections' : 'Bölümler');
      hero.appendChild(toc);
    } else {
      toc.innerHTML = '';
    }

    const headings = content.querySelectorAll('h2.blog-article__heading[data-i18n], h2[data-i18n]');
    headings.forEach((heading) => {
      const key = heading.getAttribute('data-i18n');
      if (!key) return;

      const section = heading.closest('.blog-article__section') || heading.parentElement;
      section.style.scrollMarginTop = '96px';

      const link = document.createElement('a');
      link.className = LINK_CLASS;
      link.href = window.location.pathname + window.location.search;
      link.textContent = heading.textContent.trim();
      link.addEventListener('click', (event) => {
        event.preventDefault();
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      toc.appendChild(link);
    });
  }

  function stripHashFromUrl() {
    if (!window.location.hash) return;
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }

  function init() {
    if (!isAnalysisPage()) return;
    stripHashFromUrl();
    buildToc();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  document.addEventListener('languageChanged', () => {
    window.requestAnimationFrame(buildToc);
  });
})();
