// Translation data
const translations = {
  en: {
    welcome: 'Welcome to AUNO Pack',
    subtitle: 'AI-Powered Innovative Packaging Material Design',
    description: 'We develop smart, sustainable material solutions for paper and flexible packaging. As a technology-driven startup, we combine AI insights with real-world packaging expertise to supply food brands with innovative and eco-friendly packaging materials that meet today\'s performance and sustainability standards.',
    'paper-title': 'Paper Packaging',
    'paper-desc': 'High-quality, sustainable paper packaging with <span class="highlight-yellow">customizable</span> <span class="highlight-yellow">printing options</span>, designed to preserve food freshness and safety.',
    'flexible-title': 'Flexible Packaging',
    'flexible-desc': 'Versatile and durable pouches ideal for a wide range of food products, offering convenient storage and <span class="highlight-yellow">optional digital or flexo printing</span>',
    'sustainable-title': 'Sustainable Packaging',
    'sustainable-desc': 'Different sustainable packaging structures come with their own advantages and disadvantages.<br><br>When selecting the right solution, technical requirements, cost, and ease of manufacturing must be carefully evaluated.<br><br>When a fully recyclable option is not feasible, materials and structures that support sustainability can be preferred.',
    'ai-title': 'AI Packaging Solutions',
    'ai-desc': 'We develop smart and responsible solutions with AI.',
    address: 'Address: Seyrantepe Mah. İbrahim Karaoğlanoğlu Cad. 85 Kağıthane, İstanbul, Turkey.',
    'footer-text': 'Email: info@aunopack.com. For any inquiries or support, please feel free to contact us by email or visit our location.'
  },
  tr: {
    welcome: 'AUNO Pack\'e Hoş Geldiniz',
    subtitle: 'Yenilikçi Ambalaj Malzemeleri',
    description: 'Kağıt ve esnek ambalaj için akıllı ve sürdürülebilir malzeme çözümleri geliştiriyoruz. Teknoloji odaklı bir startup olarak, yapay zekayı ambalaj uzmanlığıyla birleştiriyor; gıda markalarına performans ve sürdürülebilirlik standartlarını karşılayan, günümüz ihtiyaçlarına uygun ambalaj çözümleri sunuyor ve yenilikçi, sürdürülebilir malzemeler tedarik ediyoruz.',
    'paper-title': 'Kağıt Ambalaj',
    'paper-desc': 'Gıda tazeliğini ve güvenliğini korumak için tasarlanmış yüksek kaliteli, <span class="highlight-yellow">firmanıza özel baskılı</span>, sürdürülebilir kağıt ve karton ambalajlar',
    'flexible-title': 'Esnek Ambalaj',
    'flexible-desc': 'Çeşitli gıda ürünlerinin paketlenmesi için; <span class="highlight-yellow">dijital veya flekso baskı</span> seçenekleriyle, ürüne uygun ve sürdürülebilir malzeme yapılarıyla üretilmiş esnek ambalajlar',
    'sustainable-title': 'Sürdürülebilir Ambalaj',
    'sustainable-desc': 'Her sürdürülebilir ambalaj stratejisinin farklı avantajları ve zorlukları vardır.<br><br>Uygun çözümü seçerken teknik ihtiyaçlar, maliyet, üretilebilirlik dikkatle değerlendirilmelidir.<br><br>Geri dönüştürülebilir bir çözüm mümkün olmadığında ise, sürdürülebilirliği destekleyen ambalaj yapıları ve malzemeler tercih edilebilir.',
    'ai-title': 'Yapay Zekâ ile Yenilikçi Ambalaj Malzeme Çözümleri',
    'ai-desc': 'Firmanıza ve ürününüze özel geliştirilmiş ambalaj önerileri için iletişime geçin.',
    address: 'Adres: Seyrantepe Mah. İbrahim Karaoğlanoğlu Cad. 85 Kağıthane, İstanbul, Türkiye.',
    'footer-text': 'E-posta: info@aunopack.com. Herhangi bir soru veya destek için bizimle e-posta yoluyla iletişime geçebilir veya firmamızı ziyaret edebilirsiniz.'
  }
};

// Get saved language preference or detect browser language
function getInitialLanguage() {
  // Check localStorage first
  const savedLang = localStorage.getItem('preferred-language');
  if (savedLang && (savedLang === 'en' || savedLang === 'tr')) {
    return savedLang;
  }
  
  // Detect browser language
  const browserLang = navigator.language || navigator.userLanguage;
  if (browserLang.startsWith('tr')) {
    return 'tr';
  }
  
  // Default to English
  return 'en';
}

// Set language
function setLanguage(lang) {
  if (lang !== 'en' && lang !== 'tr') return;
  
  // Update HTML lang attribute
  document.documentElement.lang = lang;
  
  // Update all elements with data-i18n attribute
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      // Use innerHTML for paper-desc, flexible-desc, and sustainable-desc to support HTML formatting, textContent for others
      if (key === 'paper-desc' || key === 'flexible-desc' || key === 'sustainable-desc') {
        element.innerHTML = translations[lang][key];
      } else {
        element.textContent = translations[lang][key];
      }
    }
  });
  
  // Update images with data-i18n-img attribute
  const imageElements = document.querySelectorAll('[data-i18n-img]');
  imageElements.forEach(img => {
    const baseName = img.getAttribute('data-i18n-img');
    // Base path (common image for both languages)
    const basePath = `assets/images/${baseName}.png`;
    
    // Language-specific paths
    let langSpecificPath;
    if (lang === 'tr') {
      langSpecificPath = `assets/images/${baseName}-tr.png`;
    } else {
      langSpecificPath = `assets/images/${baseName}-en.png`;
    }
    
    // Try to load language-specific image first
    const testImg = new Image();
    testImg.onload = () => {
      // Language-specific image exists, use it
      img.src = langSpecificPath;
    };
    testImg.onerror = () => {
      // Language-specific image doesn't exist, use common base image
      img.src = basePath;
    };
    testImg.src = langSpecificPath;
  });
  
  // Update active button state
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('active');
    }
  });
  
  // Save preference
  localStorage.setItem('preferred-language', lang);
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
  const initialLang = getInitialLanguage();
  setLanguage(initialLang);
  
  // Add click handlers to language buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const lang = e.target.getAttribute('data-lang');
      setLanguage(lang);
    });
  });
});

