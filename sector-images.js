// Sector images configuration
// Automatic mapping: resimler aşağıdaki isimlerle kaydedilirse otomatik olarak ilgili sektöre bağlanır
const sectorImageMapping = {
  sector_confectionery: 'sekerlemesektor', // sekerlemesektor.jpeg
  sector_meat_dairy: 'sarkuterisektor', // sarkuterisektor.jpg
  sector_ready_meals: 'haziryemeksektor', // haziryemeksektor.jpeg
  sector_premium: 'lukssektor', // lukssektor.jpg
};

// Helper function to build image path
// Tries multiple extensions (.jpg, .jpeg, .png, .webp)
function getSectorImagePath(sectorKey) {
  const imageName = sectorImageMapping[sectorKey];
  if (!imageName) return null;
  
  // Kök dizinden mutlak yol kullan: tüm sayfalarda çalışsın
  return `/assets/images/${imageName}.jpg`;
}

// Sector images configuration
// Images are automatically loaded based on naming convention
const sectorImages = {
  sector_confectionery: getSectorImagePath('sector_confectionery'), // sekerlemesektor.jpeg
  sector_meat_dairy: getSectorImagePath('sector_meat_dairy'), // sarkuterisektor.jpg
  sector_ready_meals: getSectorImagePath('sector_ready_meals'), // haziryemeksektor.jpeg
  sector_premium: getSectorImagePath('sector_premium'), // lukssektor.jpg
};

// Solution images mapping
// Automatic mapping: resimler aşağıdaki isimlerle kaydedilirse otomatik olarak ilgili çözüme bağlanır
const solutionImageMapping = {
  solution_shelf_life: 'rafomrucozum', // rafomrucozum.jpg
  solution_shelf_performance: 'raperformanscozum', // raperformanscozum.jpg
  solution_small_batches: 'butikcozum', // butikcozum.jpg
  solution_aunoai: 'aunoai', // aunoai.jpg
};

// Helper function to build solution image path
function getSolutionImagePath(solutionKey) {
  const imageName = solutionImageMapping[solutionKey];
  if (!imageName) return null;
  // Kök dizinden mutlak yol: tüm sayfalarda tutarlı
  return `/assets/images/${imageName}.jpg`;
}

// Solution images configuration
// Images are automatically loaded based on naming convention
const solutionImages = {
  solution_shelf_life: getSolutionImagePath('solution_shelf_life'), // rafomrucozum.jpg
  solution_shelf_performance: getSolutionImagePath('solution_shelf_performance'), // raperformanscozum.jpg
  solution_small_batches: getSolutionImagePath('solution_small_batches'), // butikcozum.jpg
  solution_aunoai: getSolutionImagePath('solution_aunoai'), // aunoai.jpg
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
        
        const path = `/assets/images/${imageName}.${extensions[extIndex]}`;
        
        img.onload = function() {
          this.style.display = 'block'; // Show image when loaded
          this.classList.add('loaded');
          const placeholder = card.querySelector('.top-bar__sector-placeholder');
          if (placeholder) {
            placeholder.style.background = 'none';
          }
        };
        
        img.onerror = function() {
          // Try next extension
          tryLoadImage(extIndex + 1);
        };
        
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

// Load solution images
function loadSolutionImages() {
  const solutionItems = document.querySelectorAll('.top-bar__solution-item[data-image]');
  
  solutionItems.forEach(item => {
    const imageKey = item.getAttribute('data-image');
    const img = item.querySelector('img[data-solution-img]');
    
    if (solutionImages[imageKey] && img && solutionImages[imageKey] !== null) {
      const imageName = solutionImageMapping[imageKey];
      if (!imageName) return;
      
      // Try multiple extensions: .jpg, .jpeg, .png, .webp
      const extensions = ['jpg', 'jpeg', 'png', 'webp'];
      let extensionIndex = 0;
      
      const tryLoadImage = (extIndex) => {
        if (extIndex >= extensions.length) {
          console.log(`Image not found for ${imageKey} with any extension`);
          return;
        }
        
        const path = `/assets/images/${imageName}.${extensions[extIndex]}`;
        
        img.onload = function() {
          this.style.display = 'block'; // Show image when loaded
          this.classList.add('loaded');
          const placeholder = item.querySelector('.top-bar__solution-image .top-bar__sector-placeholder');
          if (placeholder) {
            placeholder.style.background = 'none';
          }
        };
        
        img.onerror = function() {
          // Try next extension
          tryLoadImage(extIndex + 1);
        };
        
        img.src = path;
      };
      
      tryLoadImage(0);
      
      const titleSpan = item.querySelector('.top-bar__solution-title');
      if (titleSpan) {
        img.alt = titleSpan.textContent || titleSpan.getAttribute('data-i18n') || '';
      }
    }
  });
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    loadSectorImages();
    loadSolutionImages();
  });
} else {
  loadSectorImages();
  loadSolutionImages();
}
