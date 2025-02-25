document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS for animations
    AOS.init({
        duration: 800,
        offset: 100,
        once: true
    });

    // Materias Filtering Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const materiaCards = document.querySelectorAll('.materia-card');
    const resultCount = document.querySelector('#result-count'); // Elemento para mostrar el conteo de resultados

    /**
     * Filters materia cards based on the selected category.
     * @param {string} category - The category to filter by ('all', 'sistemas', 'programacion', etc.).
     */
    function filterMaterias(category) {
        let visibleCount = 0; // Contador de materias visibles

        materiaCards.forEach(card => {
            const cardCategory = card.dataset.category;

            if (category === 'all' || cardCategory === category) {
                // Show the card if it matches the category or 'all' is selected
                card.style.display = 'block';
                card.classList.remove('hidden'); // Ensure it's not hidden
                card.classList.remove('fade-out'); // Remove fade-out class if present
                visibleCount++; // Incrementar el contador
            } else {
                // For cards that don't match, fade them out and then hide
                card.classList.add('fade-out');
                setTimeout(() => {
                    card.style.display = 'none'; // Hide after fade-out transition
                    card.classList.add('hidden'); // Add hidden class for good measure
                }, 300); // Match the transition duration in CSS
            }
        });

        // Actualizar el conteo de resultados
        resultCount.textContent = `Mostrando ${visibleCount} materia(s)`;
    }

    // Event listeners for filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all filter buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to the clicked button
            button.classList.add('active');

            // Get the filter value from the data-filter attribute
            const filterValue = button.dataset.filter;
            // Apply the filter
            filterMaterias(filterValue);
        });
    });

    // Initialize with 'all' filter active on page load
    document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');
    filterMaterias('all'); // Show all materias initially
});