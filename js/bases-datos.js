document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS for animations
    AOS.init({
        duration: 800,
        offset: 100,
        once: true,
        delay: 100
    });

    // Interactividad mejorada para las tarjetas
    const cards = document.querySelectorAll('.unit-card, .resource-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
            card.style.boxShadow = '0 12px 20px rgba(0, 0, 0, 0.15)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
    });

    // Tiempo de lectura estimado
    const mainContent = document.querySelector('#course-main');
    if (mainContent) {
        const wordCount = mainContent.textContent.trim().split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / 200);

        const timeElement = document.createElement('div');
        timeElement.className = 'reading-time';
        timeElement.innerHTML = `
            <i class="fas fa-book-reader"></i>
            <span>Tiempo de lectura: ${readingTime} min</span>
        `;

        const courseIntro = document.querySelector('.course-intro');
        courseIntro.appendChild(timeElement);
    }
});