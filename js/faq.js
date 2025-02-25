document.addEventListener('DOMContentLoaded', () => {
  // Initialize AOS
  AOS.init({
    duration: 800,
    once: true
  });

  // FAQ Accordion Functionality
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const faqItem = question.closest('.faq-item');
      
      // Close any other open items
      const activeItems = document.querySelectorAll('.faq-item.active');
      activeItems.forEach(item => {
        if (item !== faqItem) {
          item.classList.remove('active');
        }
      });
      
      // Toggle current item
      faqItem.classList.toggle('active');
    });
  });

  // FAQ Filter Functionality
  const filterButtons = document.querySelectorAll('.filter-btn');
  const faqItems = document.querySelectorAll('.faq-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filter = button.dataset.filter;

      faqItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Search Functionality
  const searchInput = document.getElementById('faq-search');
  
  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();

    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question h3');
      const answer = item.querySelector('.faq-answer p');
      
      const questionText = question.textContent.toLowerCase();
      const answerText = answer.textContent.toLowerCase();

      if (questionText.includes(searchTerm) || answerText.includes(searchTerm)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });

  // Quick Contact Form Submission
  const quickContactForm = document.getElementById('quick-contact-form');

  quickContactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Basic form validation
    const nameInput = quickContactForm.querySelector('input[type="text"]');
    const emailInput = quickContactForm.querySelector('input[type="email"]');
    const messageInput = quickContactForm.querySelector('textarea');

    if (!nameInput.value || !emailInput.value || !messageInput.value) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    // Here you would typically send the form data to a server
    // For this example, we'll just show a success message
    alert('¡Consulta enviada con éxito! Nos pondremos en contacto pronto.');
    quickContactForm.reset();
  });
});