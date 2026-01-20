// Hero image configuration
// Add your hero image URL here when ready
const heroImage = {
  // Place your hero image at this path (recommended): assets/images/hero-main.png
  // Then it will automatically render in the hero image area next to the main text.
  url: 'assets/images/hero-main.png',
  alt: {
    en: 'AUNO Pack - Innovative Packaging Solutions',
    tr: 'AUNO Pack - Yenilikçi Ambalaj Çözümleri'
  }
};

// Load hero image
function loadHeroImage() {
  const heroImg = document.querySelector('.top-bar__hero-image img[data-hero-img]');
  
  if (heroImage.url && heroImg && heroImage.url !== null) {
    heroImg.src = heroImage.url;
    const currentLang = document.documentElement.lang || 'en';
    heroImg.alt = heroImage.alt[currentLang] || heroImage.alt.en;
  }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadHeroImage);
} else {
  loadHeroImage();
}
