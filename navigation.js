// Navigation functionality
(function() {
  'use strict';

  const currentLang = localStorage.getItem('preferred-language') || 'en';
  let activeMenu = null;
  let pinnedMenu = null;

  // Initialize navigation
  function initNavigation() {
    setupDesktopMenus();
    setupMobileMenu();
    setupKeyboardNavigation();
    setupOutsideClick();
    updateNavigationTexts();
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
    const mobileToggle = document.querySelector('.top-bar__mobile-toggle');
    const mobileDrawer = document.querySelector('.top-bar__mobile-drawer');
    const mobileContent = document.querySelector('.top-bar__mobile-content');
    
    if (!mobileToggle || !mobileDrawer) return;

    // Create backdrop
    const backdrop = document.createElement('div');
    backdrop.className = 'top-bar__mobile-backdrop';
    backdrop.setAttribute('data-open', 'false');
    document.body.appendChild(backdrop);

    // Toggle mobile menu
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isOpen);
      mobileDrawer.setAttribute('data-open', !isOpen);
      backdrop.setAttribute('data-open', !isOpen);
      document.body.style.overflow = isOpen ? '' : 'hidden';
      
      if (!isOpen) {
        buildMobileMenu();
      }
    });

    // Close on backdrop click
    backdrop.addEventListener('click', () => {
      mobileToggle.setAttribute('aria-expanded', 'false');
      mobileDrawer.setAttribute('data-open', 'false');
      backdrop.setAttribute('data-open', 'false');
      document.body.style.overflow = '';
    });

    // Build mobile menu content
    function buildMobileMenu() {
      if (!mobileContent) return;
      
      mobileContent.innerHTML = '';

      // Sectors
      const sectorsItem = createMobileMenuItem('nav-sectors', 'products', [
        { key: 'sector-confectionery', href: 'sectors/confectionery-chocolate.html' },
        { key: 'sector-meat-dairy', href: 'sectors/meat-dairy.html' },
        { key: 'sector-ready-meals', href: 'sectors/ready-meals.html' },
        { key: 'sector-premium', href: 'sectors/premium-products.html' },
      ]);
      mobileContent.appendChild(sectorsItem);

      // Solutions
      const solutionsItem = createMobileMenuItem('nav-solutions', 'solutions', [
        { key: 'solution-shelf-life-title', href: 'solutions/shelf-life.html', desc: 'solution-shelf-life-desc' },
        { key: 'solution-shelf-performance-title', href: 'solutions/shelf-performance.html', desc: 'solution-shelf-performance-desc' },
        { key: 'solution-small-batches-title', href: 'solutions/small-batches.html', desc: 'solution-small-batches-desc' },
        { key: 'solution-aunoai-title', href: 'solutions/data-guided-design.html', desc: 'solution-aunoai-desc' }
      ]);
      mobileContent.appendChild(solutionsItem);

      // Case Studies
      const caseStudiesLink = document.createElement('a');
      caseStudiesLink.href = 'case-studies.html';
      caseStudiesLink.className = 'top-bar__mobile-link';
      caseStudiesLink.setAttribute('data-i18n', 'nav-case-studies');
      caseStudiesLink.textContent = 'Başarı Hikayeleri';
      mobileContent.appendChild(caseStudiesLink);

      // About
      const aboutItem = createMobileMenuItem('nav-about', 'about', [
        { key: 'nav-who-we-are', href: 'about.html' },
        { key: 'nav-how-we-work', href: 'how-we-work.html' },
        { key: 'nav-sustainability', href: 'sustainability.html' },
        { key: 'nav-faq', href: 'faq.html' },
        { key: 'nav-contact', href: 'contact.html' }
      ]);
      mobileContent.appendChild(aboutItem);

      // CTA Button
      const ctaButton = document.createElement('a');
      ctaButton.href = 'contact.html';
      ctaButton.className = 'top-bar__cta';
      ctaButton.style.display = 'block';
      ctaButton.style.marginTop = '24px';
      ctaButton.setAttribute('data-i18n', 'nav-cta');
      ctaButton.textContent = 'Teklif Al';
      mobileContent.appendChild(ctaButton);

      // Update texts
      updateNavigationTexts();

      // Setup accordion
      setupMobileAccordion();
    }

    function createMobileMenuItem(titleKey, menuId, subItems) {
      const item = document.createElement('div');
      item.className = 'top-bar__mobile-item';
      item.setAttribute('data-menu', menuId);

      const button = document.createElement('button');
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
          if (subItem.desc) {
            link.innerHTML = `<div style="font-weight: 500;"></div><div style="font-size: 0.75rem; color: #6b7280; margin-top: 4px;"></div>`;
            link.querySelector('div:first-child').setAttribute('data-i18n', subItem.key);
            link.querySelector('div:last-child').setAttribute('data-i18n', subItem.desc);
          }
          submenu.appendChild(link);
        }
      });

      button.addEventListener('click', () => {
        const isOpen = item.getAttribute('data-open') === 'true';
        item.setAttribute('data-open', !isOpen);
      });

      item.appendChild(button);
      item.appendChild(submenu);
      return item;
    }

    function setupMobileAccordion() {
      const mobileItems = document.querySelectorAll('.top-bar__mobile-item[data-menu]');
      mobileItems.forEach(item => {
        const button = item.querySelector('.top-bar__mobile-link');
        button.addEventListener('click', (e) => {
          e.preventDefault();
          const isOpen = item.getAttribute('data-open') === 'true';
          mobileItems.forEach(otherItem => {
            if (otherItem !== item) {
              otherItem.setAttribute('data-open', 'false');
            }
          });
          item.setAttribute('data-open', !isOpen);
        });
      });
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
    };
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavigation);
  } else {
    initNavigation();
  }

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
