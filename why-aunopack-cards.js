// Why AunoPack Cards functionality
document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.why-aunopack__card');
  
  cards.forEach(card => {
    const circle = card.querySelector('.why-aunopack__circle');
    
    // Click event
    card.addEventListener('click', function() {
      const isActive = card.classList.contains('active');
      
      // Close all cards
      cards.forEach(c => c.classList.remove('active'));
      
      // If this card wasn't active, open it
      if (!isActive) {
        card.classList.add('active');
      }
    });
    
    // Hover event (optional - can be removed if only click is desired)
    card.addEventListener('mouseenter', function() {
      // Optionally highlight on hover
      if (!card.classList.contains('active')) {
        card.style.opacity = '0.9';
      }
    });
    
    card.addEventListener('mouseleave', function() {
      if (!card.classList.contains('active')) {
        card.style.opacity = '1';
      }
    });
  });
  
  // Close panels when clicking outside
  document.addEventListener('click', function(event) {
    if (!event.target.closest('.why-aunopack__card')) {
      cards.forEach(c => c.classList.remove('active'));
    }
  });
});
