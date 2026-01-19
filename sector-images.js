// Sector images configuration
// Add your image URLs here when ready
const sectorImages = {
  sector_confectionery: null, // 'assets/images/sectors/confectionery.jpg'
  sector_snacks: null, // 'assets/images/sectors/snacks.jpg'
  sector_meat_dairy: null, // 'assets/images/sectors/meat-dairy.jpg'
  sector_ready_meals: null, // 'assets/images/sectors/ready-meals.jpg'
  sector_premium: null, // 'assets/images/sectors/premium.jpg'
  sector_fresh_produce: null, // 'assets/images/sectors/fresh-produce.jpg'
};

// Solution images configuration
// Add your image URLs here when ready
const solutionImages = {
  solution_shelf_life: null, // 'assets/images/solutions/shelf-life.jpg'
  solution_shelf_performance: null, // 'assets/images/solutions/shelf-performance.jpg'
  solution_small_batches: null, // 'assets/images/solutions/small-batches.jpg'
  solution_aunoai: null, // 'assets/images/solutions/aunoai.jpg'
};

// Load sector images
function loadSectorImages() {
  const sectorCards = document.querySelectorAll('.top-bar__sector-card[data-image]');
  
  sectorCards.forEach(card => {
    const imageKey = card.getAttribute('data-image');
    const img = card.querySelector('img[data-sector-img]');
    
    if (sectorImages[imageKey] && img && sectorImages[imageKey] !== null) {
      img.onload = function() {
        this.classList.add('loaded');
        const placeholder = card.querySelector('.top-bar__sector-placeholder');
        if (placeholder) {
          placeholder.style.background = 'none';
        }
      };
      img.src = sectorImages[imageKey];
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
      img.onload = function() {
        this.classList.add('loaded');
        const placeholder = item.querySelector('.top-bar__solution-image .top-bar__sector-placeholder');
        if (placeholder) {
          placeholder.style.background = 'none';
        }
      };
      img.src = solutionImages[imageKey];
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
