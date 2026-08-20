// Navigation functionality
(function() {
  'use strict';

  const currentLang = localStorage.getItem('preferred-language') || 'en';
  let activeMenu = null;
  let pinnedMenu = null;

  function getBasePath() {
    const path = (window.location.pathname || '').replace(/^\//, '');
    return path.split('/').filter(Boolean).length > 1 ? '../' : '';
  }

  function getCurrentLanguage() {
    if (typeof getLanguageFromPath === 'function') {
      const pathLang = getLanguageFromPath();
      if (pathLang) return pathLang;
    }

    const saved = localStorage.getItem('preferred-language');
    if (saved === 'en' || saved === 'tr') return saved;

    return document.documentElement.lang === 'tr' ? 'tr' : 'en';
  }

  function getAunoAiUrl(lang) {
    return lang === 'en' ? 'https://ai.aunopack.com/en' : 'https://ai.aunopack.com';
  }

  function getLocalizedHref(path) {
    const lang = getCurrentLanguage();
    if (typeof window.getLocalizedSeoPath === 'function') {
      return window.getLocalizedSeoPath(path, lang);
    }
    const clean = (path || '/').replace(/^\/(tr|en)(?=\/|$)/, '') || '/';
    if (clean === '/' || clean === '/index.html') return lang === 'tr' ? '/tr/' : '/en/';
    return '/' + lang + (clean.startsWith('/') ? clean : '/' + clean);
  }

  function localizeMobileMenuLinks() {
    const container = document.querySelector('.top-bar__mobile-content');
    if (!container) return;
    container.querySelectorAll('a[href]').forEach((link) => {
      const raw = link.getAttribute('href');
      if (!raw || raw.startsWith('http') || raw.startsWith('mailto:') || raw.startsWith('tel:') || raw.startsWith('#')) {
        return;
      }
      try {
        const url = new URL(raw, window.location.origin);
        if (url.origin !== window.location.origin) return;
        link.setAttribute('href', getLocalizedHref(url.pathname) + url.search + url.hash);
      } catch {
        // ignore invalid URLs
      }
    });
  }

  function updateAunoAiLinks() {
    const url = getAunoAiUrl(getCurrentLanguage());
    document.querySelectorAll('[data-auno-ai-link]').forEach((link) => {
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    });
  }

  // Initialize navigation
  function initNavigation() {
    setupDesktopMenus();
    setupMobileMenu();
    setupKeyboardNavigation();
    setupOutsideClick();
    updateNavigationTexts();
    updateAunoAiLinks();
  }

  // Setup desktop menu hover/click behavior
  function setupDesktopMenus() {
    const menuItems = document.querySelectorAll('.top-bar__item[data-menu]');
    
    menuItems.forEach(item => {
      const menuButton = item.querySelector('.top-bar__link');
      const menuType = item.getAttribute('data-menu');

      // Hover behavior
      item.addEventListener('mouseenter', () => {
        if (window.innerWidth >= 1024) {
          if (pinnedMenu !== menuType) {
            activeMenu = menuType;
            item.setAttribute('data-menu-open', 'true');
            menuButton?.setAttribute('aria-expanded', 'true');
          }
        }
      });

      item.addEventListener('mouseleave', () => {
        if (window.innerWidth >= 1024) {
          if (pinnedMenu !== menuType) {
            activeMenu = null;
            item.setAttribute('data-menu-open', 'false');
            menuButton?.setAttribute('aria-expanded', 'false');
          }
        }
      });

      // Click to pin/unpin
      menuButton?.addEventListener('click', (e) => {
        if (window.innerWidth >= 1024) {
          e.preventDefault();
          if (pinnedMenu === menuType) {
            pinnedMenu = null;
            activeMenu = null;
            item.setAttribute('data-menu-open', 'false');
            menuButton.setAttribute('aria-expanded', 'false');
          } else {
            // Close other menus
            menuItems.forEach(otherItem => {
              if (otherItem !== item) {
                otherItem.setAttribute('data-menu-open', 'false');
                otherItem.querySelector('.navbar__link')?.setAttribute('aria-expanded', 'false');
              }
            });
            pinnedMenu = menuType;
            activeMenu = menuType;
            item.setAttribute('data-menu-open', 'true');
            menuButton.setAttribute('aria-expanded', 'true');
          }
        }
      });
    });
  }

  // Setup mobile menu drawer
  function setupMobileMenu() {
    const toggle = document.querySelector('.top-bar__mobile-toggle');
    const drawer = document.querySelector('.top-bar__mobile-drawer');
    const mobileContent = document.querySelector('.top-bar__mobile-content');

    // Backdrop: HTML'de varsa onu kullan, yoksa oluştur (header dışında drawer + backdrop kullanılıyor)
    let backdrop = null;
    var menuOpenedAt = 0;
    function getBackdrop() {
      if (!backdrop) {
        backdrop = document.querySelector('.top-bar__mobile-backdrop');
        if (!backdrop) {
          backdrop = document.createElement('div');
          backdrop.className = 'top-bar__mobile-backdrop';
          backdrop.dataset.open = 'false';
          document.body.appendChild(backdrop);
        }
        backdrop.addEventListener('click', function () {
          if (Date.now() - menuOpenedAt < 400) {
            console.log('[Nav] backdrop click yok sayıldı (açılıştan hemen sonra)');
            return;
          }
          console.log('[Nav] backdrop tıklandı, menü kapatılıyor');
          drawer.classList.remove('open');
          backdrop.dataset.open = 'false';
          toggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        });
      }
      return backdrop;
    }

    console.log('[Nav] navigation.js loaded');
    console.log('[Nav] toggle:', toggle);
    console.log('[Nav] drawer:', drawer);
    console.log('[Nav] mobileContent:', mobileContent);

    if (!toggle || !drawer) {
      console.error('[Nav] Mobile menu elements missing!', { toggle: !!toggle, drawer: !!drawer });
      return;
    }
    if (!mobileContent) {
      console.warn('[Nav] mobileContent yok – menü içeriği oluşturulmayacak');
    }

    // Accordion: delegated handler on drawer (pointerdown = mouse + touch, capture = run first)
    function handleAccordion(e) {
      console.log('[Nav] pointerdown', e.type, 'target:', e.target, 'drawer.open:', drawer.classList.contains('open'));
      if (!drawer.classList.contains('open')) {
        console.log('[Nav] accordion: drawer kapalı, çık');
        return;
      }
      const button = e.target.closest('.top-bar__mobile-link');
      console.log('[Nav] accordion: button=', button, 'tagName=', button ? button.tagName : '-');
      if (!button || button.tagName !== 'BUTTON') return;
      const item = button.closest('.top-bar__mobile-item[data-menu]');
      console.log('[Nav] accordion: item=', item, 'data-menu=', item ? item.getAttribute('data-menu') : '-');
      if (!item) return;
      e.preventDefault();
      e.stopPropagation();
      const isOpen = item.getAttribute('data-open') === 'true';
      console.log('[Nav] accordion: toggle', item.getAttribute('data-menu'), 'isOpen=', isOpen, '->', !isOpen);
      document.querySelectorAll('.top-bar__mobile-item[data-menu]').forEach(function(other) {
        other.setAttribute('data-open', other === item ? (!isOpen ? 'true' : 'false') : 'false');
      });
    }
    drawer.addEventListener('pointerdown', handleAccordion, true);

    function openMenu() {
      drawer.classList.toggle('open');
      const isOpen = drawer.classList.contains('open');
      console.log('[Nav] openMenu: drawer.open=', isOpen);
      if (isOpen) menuOpenedAt = Date.now();
      var back = getBackdrop();
      back.dataset.open = isOpen ? 'true' : 'false';
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
      if (isOpen) buildMobileMenu();
    }

    toggle.addEventListener('click', function () {
      console.log('[Nav] toggle CLICK');
      openMenu();
    });


    // Build mobile menu content
    function buildMobileMenu() {
      console.log('[Nav] buildMobileMenu başladı, mobileContent:', !!mobileContent);
      if (!mobileContent) {
        console.error('[Nav] buildMobileMenu: mobileContent yok, çık');
        return;
      }
      mobileContent.innerHTML = '';

      const base = getBasePath();

      // Products
      const productsItem = createMobileMenuItem('nav-products', 'catalog', [
        { key: 'product-bib', href: '/contact.html' },
        { key: 'product-flexible', href: '/contact.html' },
        { key: 'product-paper-carton', href: '/contact.html' },
        { key: 'product-hybrid', href: '/contact.html' },
        { key: 'product-compostable', href: '/contact.html' },
      ]);
      mobileContent.appendChild(productsItem);

      // Platform
      const platformItem = createMobileMenuItem('nav-platform', 'platform', [
        { key: 'platform-aunoai-title', href: getAunoAiUrl(getCurrentLanguage()), aunoAi: true },
        { key: 'platform-pallet-title', href: 'https://system.aunopack.com/pallet-optimizer', external: true },
        { key: 'platform-database-title', href: '/platform/ambalaj-veritabani' },
        { key: 'platform-market-title', href: '/platform/ambalaj-analizleri' },
      ]);
      mobileContent.appendChild(platformItem);

      // Example use cases
      const examplesItem = createMobileMenuItem('nav-sectors', 'examples', [
        { key: 'menu-tile-confectionery', href: '/sectors/confectionery-chocolate.html' },
        { key: 'menu-tile-meat-dairy', href: '/sectors/meat-dairy.html' },
        { key: 'menu-tile-ready-meals', href: '/sectors/ready-meals.html' },
        { key: 'menu-tile-dry-foods', href: '/sectors/dry-foods.html' },
      ]);
      mobileContent.appendChild(examplesItem);

      // Case Studies
      const caseStudiesLink = document.createElement('a');
      caseStudiesLink.href = '/blog.html';
      caseStudiesLink.className = 'top-bar__mobile-link';
      caseStudiesLink.setAttribute('data-i18n', 'nav-case-studies');
      caseStudiesLink.textContent = 'Blog';
      mobileContent.appendChild(caseStudiesLink);

      // About (single link)
      const aboutLink = document.createElement('a');
      aboutLink.href = '/about.html';
      aboutLink.className = 'top-bar__mobile-link';
      aboutLink.setAttribute('data-i18n', 'nav-about');
      aboutLink.textContent = 'Hakkımızda';
      mobileContent.appendChild(aboutLink);

      // CTA Button
      const ctaButton = document.createElement('a');
      ctaButton.href = '/contact.html';
      ctaButton.className = 'top-bar__cta';
      ctaButton.style.display = 'block';
      ctaButton.style.marginTop = '24px';
      ctaButton.setAttribute('data-i18n', 'nav-cta');
      ctaButton.textContent = 'Teklif Al';
      mobileContent.appendChild(ctaButton);

      // Update texts
      updateNavigationTexts();
      localizeMobileMenuLinks();
      const accordionItems = mobileContent.querySelectorAll('.top-bar__mobile-item[data-menu]');
      console.log('[Nav] buildMobileMenu bitti, accordion item sayısı:', accordionItems.length);
    }

    function createMobileMenuItem(titleKey, menuId, subItems) {
      const item = document.createElement('div');
      item.className = 'top-bar__mobile-item';
      item.setAttribute('data-menu', menuId);

      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'top-bar__mobile-link';
      button.setAttribute('data-i18n', titleKey);
      button.innerHTML = '<span></span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 9l-7 7-7-7"/></svg>';

      const submenu = document.createElement('div');
      submenu.className = 'top-bar__mobile-submenu';

      subItems.forEach(subItem => {
        if (subItem.isTitle) {
          const title = document.createElement('div');
          title.className = 'top-bar__mobile-submenu-item';
          title.style.fontWeight = '600';
          title.style.paddingTop = '16px';
          title.setAttribute('data-i18n', subItem.key);
          submenu.appendChild(title);
        } else {
          const link = document.createElement('a');
          link.href = subItem.href;
          link.className = 'top-bar__mobile-submenu-item';
          link.setAttribute('data-i18n', subItem.key);
          if (subItem.aunoAi) {
            link.setAttribute('data-auno-ai-link', '');
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
          }
          if (subItem.external) {
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
          }
          if (subItem.desc) {
            link.innerHTML = `<div style="font-weight: 500;"></div><div style="font-size: 0.75rem; color: #6b7280; margin-top: 4px;"></div>`;
            link.querySelector('div:first-child').setAttribute('data-i18n', subItem.key);
            link.querySelector('div:last-child').setAttribute('data-i18n', subItem.desc);
          }
          submenu.appendChild(link);
        }
      });

      item.appendChild(button);
      item.appendChild(submenu);
      return item;
    }

  }

  // Setup keyboard navigation
  function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      // ESC to close menus
      if (e.key === 'Escape') {
        const menuItems = document.querySelectorAll('.top-bar__item[data-menu]');
        menuItems.forEach(item => {
          item.setAttribute('data-menu-open', 'false');
          item.querySelector('.top-bar__link')?.setAttribute('aria-expanded', 'false');
        });
        pinnedMenu = null;
        activeMenu = null;

        // Close mobile menu
        const mobileToggle = document.querySelector('.top-bar__mobile-toggle');
        if (mobileToggle?.getAttribute('aria-expanded') === 'true') {
          mobileToggle.click();
        }
      }
    });

    // Enter/Space on menu buttons
    document.querySelectorAll('.top-bar__link[aria-haspopup]').forEach(button => {
      button.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          button.click();
        }
      });
    });
  }

  // Close menus on outside click
  function setupOutsideClick() {
    document.addEventListener('click', (e) => {
      if (window.innerWidth >= 1024) {
        const clickedMenu = e.target.closest('.top-bar__item[data-menu]');
        if (!clickedMenu && pinnedMenu) {
          const menuItems = document.querySelectorAll('.top-bar__item[data-menu]');
          menuItems.forEach(item => {
            item.setAttribute('data-menu-open', 'false');
            item.querySelector('.top-bar__link')?.setAttribute('aria-expanded', 'false');
          });
          pinnedMenu = null;
          activeMenu = null;
        }
      }
    });
  }

  // Update navigation texts when language changes
  function updateNavigationTexts() {
    const lang = localStorage.getItem('preferred-language') || 'en';
    const navElements = document.querySelectorAll('[data-i18n]');
    
    // Get translations from i18n.js (assuming it's loaded)
    if (typeof translations !== 'undefined') {
      navElements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
          const translation = translations[lang][key];
          // Check if translation contains HTML tags
          const containsHTML = /<[^>]+>/.test(translation);
          
          // Handle different element types
          if (element.tagName === 'BUTTON') {
            const span = element.querySelector('span');
            if (span) {
              if (containsHTML) {
                span.innerHTML = translation;
              } else {
                span.textContent = translation;
              }
            } else {
              if (containsHTML) {
                element.innerHTML = translation;
              } else {
                element.textContent = translation;
              }
            }
          } else if (element.tagName === 'A' && element.classList.contains('navbar__link')) {
            // Direct link (Case Studies) - no HTML in links
            element.textContent = translation;
          } else if (element.tagName === 'SPAN') {
            // Span elements (including sector card overlays) - check if HTML allowed
            if (containsHTML && element.closest('p, div, h1, h2, h3, h4, h5, h6')) {
              element.innerHTML = translation;
            } else {
              element.textContent = translation;
            }
          } else {
            // Other elements (divs, p, etc.) - use innerHTML if HTML present
            if (containsHTML) {
              element.innerHTML = translation;
            } else {
              element.textContent = translation;
            }
          }
        }
      });
    }
  }

  // Listen for language changes
  const originalSetLanguage = window.setLanguage;
  if (originalSetLanguage) {
    window.setLanguage = function(lang) {
      originalSetLanguage(lang);
      updateNavigationTexts();
      updateAunoAiLinks();
    };
  }

  function swapPreviewImage(img, src) {
    if (!img || !src) return;
    const current = img.getAttribute('src') || '';
    if (current.endsWith(src) || current === src) return;

    img.classList.add('is-swapping');
    const next = new Image();
    next.onload = () => {
      img.src = src;
      img.classList.remove('is-swapping');
    };
    next.onerror = () => {
      img.src = src;
      img.classList.remove('is-swapping');
    };
    next.src = src;
  }

  function initProductsMenuPreview() {
    const catalogMenu = document.querySelector('.top-bar__item[data-menu="catalog"]');
    if (!catalogMenu) return;

    const previewImg = catalogMenu.querySelector('[data-product-preview-img]');
    const links = catalogMenu.querySelectorAll('[data-product-preview]');
    if (!previewImg || !links.length) return;

    const images = {
      bib: '/assets/images/bib-ambalaj.png',
      flexible: '/assets/images/flexible-ambalaj.png',
      'paper-carton': '/assets/images/paperpackaging.png',
      hybrid: '/assets/images/sustainability-tr.png',
      compostable: '/assets/images/sustainability.png',
    };

    function setPreview(key) {
      const src = images[key];
      if (src) swapPreviewImage(previewImg, src);
    }

    links.forEach((link) => {
      const key = link.getAttribute('data-product-preview');
      link.addEventListener('mouseenter', () => setPreview(key));
      link.addEventListener('focus', () => setPreview(key));
    });

    setPreview(links[0].getAttribute('data-product-preview'));
  }

  function initPlatformMenuPreview() {
    const platformMenu = document.querySelector('.top-bar__item[data-menu="platform"]');
    if (!platformMenu) return;

    const previewImg = platformMenu.querySelector('[data-platform-preview-img]');
    const links = platformMenu.querySelectorAll('[data-platform-preview]');
    if (!previewImg || !links.length) return;

    let activePreviewKey = links[0].getAttribute('data-platform-preview');

    function getPlatformPreviewImages() {
      const lang = getCurrentLanguage();
      return {
        'auno-ai': lang === 'en' ? '/assets/images/aunoai-en.png' : '/assets/images/aunoai.png',
        pallet: '/assets/images/paletoptimizasyon.png',
        database: '/assets/images/ambalaj-veritabani.png',
        analytics: lang === 'en'
          ? '/assets/images/ambalaj-analizleri-en.png'
          : '/assets/images/ambalaj-analizleri.png',
      };
    }

    function setPreview(key) {
      if (key) activePreviewKey = key;
      const src = getPlatformPreviewImages()[activePreviewKey];
      if (src) swapPreviewImage(previewImg, src);
    }

    links.forEach((link) => {
      const key = link.getAttribute('data-platform-preview');
      link.addEventListener('mouseenter', () => setPreview(key));
      link.addEventListener('focus', () => setPreview(key));
    });

    setPreview(activePreviewKey);

    window.refreshPlatformMenuPreview = () => setPreview(activePreviewKey);

    const langObserver = new MutationObserver(() => setPreview(activePreviewKey));
    langObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

    const menuObserver = new MutationObserver(() => {
      if (platformMenu.getAttribute('data-menu-open') === 'true') {
        setPreview(activePreviewKey);
      }
    });
    menuObserver.observe(platformMenu, { attributes: true, attributeFilter: ['data-menu-open'] });
  }

  function initWhatsAppWidget() {
    if (document.querySelector('.wa-widget')) return;

    const phone = '905449494886';
    const prefillTr = 'Merhaba, AunoPack hakkında bilgi almak istiyorum.';
    const prefillEn = 'Hello, I would like information about AunoPack.';
    const lang = (document.documentElement.lang || localStorage.getItem('preferred-language') || 'tr').slice(0, 2);
    const prefill = encodeURIComponent(lang === 'en' ? prefillEn : prefillTr);
    const waUrl = `https://wa.me/${phone}?text=${prefill}`;

    const root = document.createElement('div');
    root.className = 'wa-widget';
    root.innerHTML = `
      <div class="wa-widget__panel" role="dialog" aria-labelledby="wa-widget-title" hidden>
        <div class="wa-widget__panel-header">
          <h2 class="wa-widget__title" id="wa-widget-title" data-i18n="wa-title">AunoPack WhatsApp Destek Hattı</h2>
          <button type="button" class="wa-widget__close" aria-label="Close">&times;</button>
        </div>
        <p class="wa-widget__text" data-i18n="wa-text">Auno AI sonuçlarınız, ambalaj seçenekleri, fiyat, numune ve tedarik talepleriniz için bize WhatsApp üzerinden yazabilirsiniz. Ekibimiz ihtiyacınızı inceleyerek size yardımcı olsun.</p>
        <a class="wa-widget__cta" href="${waUrl}" target="_blank" rel="noopener noreferrer" data-i18n="wa-cta">WhatsApp'tan Yazın</a>
      </div>
      <button type="button" class="wa-widget__toggle" aria-expanded="false" aria-controls="wa-widget-title" aria-label="WhatsApp">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </button>
    `;

    document.body.appendChild(root);

    const panel = root.querySelector('.wa-widget__panel');
    const toggle = root.querySelector('.wa-widget__toggle');
    const closeBtn = root.querySelector('.wa-widget__close');
    const cta = root.querySelector('.wa-widget__cta');

    function setOpen(open) {
      root.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) panel.removeAttribute('hidden');
      else panel.setAttribute('hidden', '');
    }

    toggle.addEventListener('click', () => setOpen(!root.classList.contains('is-open')));
    closeBtn.addEventListener('click', () => setOpen(false));
    document.addEventListener('click', (event) => {
      if (!root.contains(event.target)) setOpen(false);
    });

    document.addEventListener('languageChanged', () => {
      const nextLang = (document.documentElement.lang || 'tr').slice(0, 2);
      const nextPrefill = encodeURIComponent(nextLang === 'en' ? prefillEn : prefillTr);
      cta.href = `https://wa.me/${phone}?text=${nextPrefill}`;
    });

    if (typeof setLanguage === 'function') {
      const current = document.documentElement.lang || localStorage.getItem('preferred-language') || 'tr';
      setLanguage(current === 'en' ? 'en' : 'tr');
    }
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavigation);
  } else {
    initNavigation();
  }

  document.addEventListener('DOMContentLoaded', () => {
    initProductsMenuPreview();
    initPlatformMenuPreview();
    initWhatsAppWidget();
  });

  // Reinitialize on resize (for mobile/desktop switch)
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth < 1024) {
        // Close desktop menus on mobile
        const menuItems = document.querySelectorAll('.top-bar__item[data-menu]');
        menuItems.forEach(item => {
          item.setAttribute('data-menu-open', 'false');
          item.querySelector('.top-bar__link')?.setAttribute('aria-expanded', 'false');
        });
        pinnedMenu = null;
        activeMenu = null;
      }
    }, 250);
  });
})();
