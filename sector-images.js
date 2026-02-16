// Asset base: '' for root, '../' for sectors/ or solutions/
function getAssetBasePath() {
  const path = (window.location.pathname || window.location.href || '').replace(/\\/g, '/');
  if (path.includes('/sectors/') || path.includes('/solutions/')) return '../';
  return '';
}

// Sector images configuration
const sectorImageMapping = {
  sector_confectionery: 'sekerlemesektor', // sekerlemesektor.jpeg
  sector_meat_dairy: 'sarkuterisektor', // sarkuterisektor.jpg
  sector_ready_meals: 'haziryemeksektor', // haziryemeksektor.jpeg
  sector_premium: 'kurugıdasektor', // Kuru Gıdalar - kurugıdasektor.jpg
};

// Helper function to build image path
// Tries multiple extensions (.jpg, .jpeg, .png, .webp)
function getSectorImagePath(sectorKey) {
  const imageName = sectorImageMapping[sectorKey];
  if (!imageName) return null;
  
  const ext = sectorKey === 'sector_premium' ? 'png' : 'jpg';
  return getAssetBasePath() + `assets/images/${imageName}.${ext}`;
}

// Sector images configuration
// Images are automatically loaded based on naming convention
const sectorImages = {
  sector_confectionery: getSectorImagePath('sector_confectionery'), // sekerlemesektor.jpeg
  sector_meat_dairy: getSectorImagePath('sector_meat_dairy'), // sarkuterisektor.jpg
  sector_ready_meals: getSectorImagePath('sector_ready_meals'), // haziryemeksektor.jpeg
  sector_premium: getSectorImagePath('sector_premium'), // lukssektor.jpg
};

// Solution images mapping – mevcut görsellere fallback
const solutionImageMapping = {
  solution_shelf_life: ['rafomrucozum', 'raperformanscozum', 'kurugıdasektor'],
  solution_shelf_performance: ['raperformanscozum', 'etsatisarttirma', 'sarkuterisektor'],
  solution_small_batches: ['butikcozum', 'etdusukadet', 'kurugıdasektor'],
  solution_aunoai: ['aunoai', 'sekerlemesatinalma', 'kurugıdasektor'],
};

function getSolutionImagePath(solutionKey) {
  const names = solutionImageMapping[solutionKey];
  if (!names || !Array.isArray(names)) return null;
  const base = getAssetBasePath();
  return names.map(n => ({ jpg: base + `assets/images/${n}.jpg`, png: base + `assets/images/${n}.png` }));
}

const solutionImages = {
  solution_shelf_life: getSolutionImagePath('solution_shelf_life'),
  solution_shelf_performance: getSolutionImagePath('solution_shelf_performance'),
  solution_small_batches: getSolutionImagePath('solution_small_batches'),
  solution_aunoai: getSolutionImagePath('solution_aunoai'),
};

// Load sector images
function loadSectorImages() {
  const sectorCards = document.querySelectorAll('.top-bar__sector-card[data-image]');
  
  sectorCards.forEach(card => {
    const imageKey = card.getAttribute('data-image');
    const img = card.querySelector('img[data-sector-img]');
    
    if (sectorImages[imageKey] && img && sectorImages[imageKey] !== null) {
      const imageName = sectorImageMapping[imageKey];
      if (!imageName) return;
      
      // Try multiple extensions: .jpg, .jpeg, .png, .webp
      const extensions = ['jpg', 'jpeg', 'png', 'webp'];
      let extensionIndex = 0;
      
      const tryLoadImage = (extIndex) => {
        if (extIndex >= extensions.length) {
          console.log(`Image not found for ${imageKey} with any extension`);
          return;
        }
        
        const path = getAssetBasePath() + `assets/images/${imageName}.${extensions[extIndex]}`;
        
        img.onload = function() {
          this.style.display = 'block';
          this.classList.add('loaded');
          const placeholder = card.querySelector('.top-bar__sector-placeholder');
          if (placeholder) placeholder.style.background = 'none';
        };
        
        img.onerror = function() { tryLoadImage(extIndex + 1); };
        
        img.src = path;
      };
      
      tryLoadImage(0);
      
      const span = card.querySelector('.top-bar__sector-overlay span');
      if (span) {
        img.alt = span.textContent || span.getAttribute('data-i18n') || '';
      }
    }
  });
}

// Load solution images – tries multiple fallback images per solution
function loadSolutionImages() {
  const solutionItems = document.querySelectorAll('.top-bar__solution-item[data-image]');
  const extensions = ['jpg', 'jpeg', 'png', 'webp'];
  
  solutionItems.forEach(item => {
    const imageKey = item.getAttribute('data-image');
    const img = item.querySelector('img[data-solution-img]');
    const names = solutionImageMapping[imageKey];
    
    if (!names || !img || !Array.isArray(names)) return;
    
    function tryNext(candidateIndex, extIndex) {
      if (candidateIndex >= names.length) return;
      if (extIndex >= extensions.length) { tryNext(candidateIndex + 1, 0); return; }
      const name = names[candidateIndex];
      const path = getAssetBasePath() + 'assets/images/' + name + '.' + extensions[extIndex];
      
      img.onload = function() {
        this.style.display = 'block';
        this.classList.add('loaded');
        const placeholder = item.querySelector('.top-bar__solution-image .top-bar__sector-placeholder');
        if (placeholder) placeholder.style.background = 'none';
      };
      img.onerror = function() { tryNext(candidateIndex, extIndex + 1); };
      img.src = path;
    }
    
    tryNext(0, 0);
    
    const titleSpan = item.querySelector('.top-bar__solution-title');
    if (titleSpan) img.alt = titleSpan.textContent || titleSpan.getAttribute('data-i18n') || '';
  });
}

// Load solution section images (solutions page – image left of each section)
function loadSolutionSectionImages() {
  const sectionImgs = document.querySelectorAll('.solutions-section__media img[data-solution-img]');
  const extensions = ['jpg', 'jpeg', 'png', 'webp'];

  sectionImgs.forEach(img => {
    const imageKey = img.getAttribute('data-solution-img');
    const names = solutionImageMapping[imageKey];

    if (!names || !Array.isArray(names)) return;

    function tryNext(candidateIndex, extIndex) {
      if (candidateIndex >= names.length) return;
      if (extIndex >= extensions.length) { tryNext(candidateIndex + 1, 0); return; }
      const name = names[candidateIndex];
      const path = getAssetBasePath() + 'assets/images/' + name + '.' + extensions[extIndex];

      img.onload = function() {
        this.style.display = 'block';
        this.classList.add('loaded');
      };
      img.onerror = function() { tryNext(candidateIndex, extIndex + 1); };
      img.src = path;
    }

    tryNext(0, 0);
  });
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    loadSectorImages();
    loadSolutionImages();
    loadSolutionSectionImages();
  });
} else {
  loadSectorImages();
  loadSolutionImages();
  loadSolutionSectionImages();
}
