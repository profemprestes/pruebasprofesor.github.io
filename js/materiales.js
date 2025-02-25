document.addEventListener('DOMContentLoaded', () => {
  // Initialize AOS
  AOS.init({
    duration: 800,
    once: true
  });

  // Smooth scroll to recursos section
  const btnExplore = document.querySelector('.btn-explore');
  if (btnExplore) {
    btnExplore.addEventListener('click', (e) => {
      e.preventDefault();
      const recursosSection = document.getElementById('recursos');
      recursosSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Recursos Filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const recursosCards = document.querySelectorAll('.recurso-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filter = button.dataset.filter;

      recursosCards.forEach(card => {
        const cardCategory = card.dataset.category;

        if (filter === 'all' || cardCategory === filter) {
          card.style.display = 'flex';
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // Resource Download/Access Handling
  const resourceButtons = document.querySelectorAll('.recurso-btn');
  resourceButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      // Here you could implement download logic or show a modal
      alert('Próximamente: Descarga de recursos');
    });
  });
});