# Ana sayfa – intro bölümü ve dil kodu

## 1. HTML (public/index.html) – intro bölümü

```html
  <section class="intro" aria-labelledby="intro-heading">
    <h2 id="intro-heading" class="intro__title" data-i18n="intro-title">AunoPack – Ambalaj Kararlarında Veri Gücü</h2>
    <p class="intro__text" data-i18n="intro-text">Ürününüz için gerçekten en doğru ambalaj yapısını biliyor musunuz? AunoPack; teknik gereklilikleri, sürdürülebilirlik kriterlerini ve tüketici trendlerini birlikte analiz eden yapay zekâ destekli bir ambalaj karar motorudur. Platform, veri odaklı yaklaşımı ve düşük minimum siparişli premium ambalaj çözümleriyle markalara maliyet avantajı, regülasyon uyumu ve güçlü raf performansı kazandırır.</p>
  </section>
```

**Script sırası (sayfa sonunda):**
```html
  <script src="i18n.js"></script>
  <script src="navigation.js"></script>
  <script src="sector-images.js"></script>
  <script src="hero-image.js"></script>
  <script src="why-aunopack-cards.js"></script>
</body>
</html>
```

**Dil butonları:**
```html
<button class="lang-btn active" data-lang="en">EN</button>
<button class="lang-btn" data-lang="tr">TR</button>
```

---

## 2. i18n.js – intro çevirileri (translations)

**İngilizce (en):**
```javascript
'intro-title': 'AunoPack – Data-Driven Packaging Decisions',
'intro-text': 'Do you really know the right packaging structure for your product? AunoPack is an AI-powered packaging decision engine that analyzes technical requirements, sustainability criteria and consumer trends together. The platform gives brands a cost advantage, regulatory compliance and strong shelf performance with its data-driven approach and low minimum order premium packaging solutions.',
```

**Türkçe (tr):**
```javascript
'intro-title': 'AunoPack – Ambalaj Kararlarında Veri Gücü',
'intro-text': 'Ürününüz için gerçekten en doğru ambalaj yapısını biliyor musunuz? AunoPack; teknik gereklilikleri, sürdürülebilirlik kriterlerini ve tüketici trendlerini birlikte analiz eden yapay zekâ destekli bir ambalaj karar motorudur. Platform, veri odaklı yaklaşımı ve düşük minimum siparişli premium ambalaj çözümleriyle markalara maliyet avantajı, regülasyon uyumu ve güçlü raf performansı kazandırır.',
```

---

## 3. i18n.js – setLanguage (intro dahil)

```javascript
// Set language
function setLanguage(lang) {
  if (lang !== 'en' && lang !== 'tr') return;
  
  document.documentElement.lang = lang;
  
  // Update all elements with data-i18n attribute
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      const translation = translations[lang][key];
      const containsHTML = /<[^>]+>/.test(translation);
      if (containsHTML) {
        element.innerHTML = translation;
      } else {
        element.textContent = translation;
      }
      if (element.tagName === 'OPTION' && element.getAttribute('value') !== '') {
        element.value = translation;
      }
    }
  });

  // Intro: ID ile zorla güncelle (bazı ortamlarda data-i18n atlanabiliyor)
  var introTitle = document.getElementById('intro-heading');
  var introText = document.querySelector('.intro .intro__text');
  if (introTitle && translations[lang]['intro-title']) introTitle.textContent = translations[lang]['intro-title'];
  if (introText && translations[lang]['intro-text']) introText.textContent = translations[lang]['intro-text'];

  // ... placeholders, images, lang buttons, localStorage ...
}

// Initialize language on page load
function initLanguage() {
  const initialLang = getInitialLanguage();
  setLanguage(initialLang);

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const button = e.currentTarget || e.target.closest('.lang-btn');
      const lang = button ? button.getAttribute('data-lang') : null;
      if (lang === 'en' || lang === 'tr') setLanguage(lang);
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLanguage);
} else {
  initLanguage();
}
```

---

## 4. getInitialLanguage()

```javascript
function getInitialLanguage() {
  const savedLang = localStorage.getItem('preferred-language');
  if (savedLang && (savedLang === 'en' || savedLang === 'tr')) {
    return savedLang;
  }
  const browserLang = navigator.language || navigator.userLanguage;
  if (browserLang.startsWith('tr')) {
    return 'tr';
  }
  return 'en';
}
```

---

**Dosya konumları:**
- Sayfa: `public/index.html`
- Dil script: `public/i18n.js`
- Menü/navigation: `public/navigation.js` (setLanguage’ı sarmalayıp updateNavigationTexts çağırıyor)
