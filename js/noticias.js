document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 800,
        once: true
    });

    // Elementos DOM
    const categoryFilter = document.getElementById('categoryFilter');
    const searchInput = document.getElementById('noticias-search');
    const newsCards = document.querySelectorAll('.news-card');
    const modal = document.getElementById('noticias-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalImage = document.getElementById('modal-image');
    const modalBody = document.getElementById('modal-body');
    const closeBtn = document.querySelector('.close-button');
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
    const currentPageSpan = document.querySelector('.current-page');
    let currentPage = 1;
    const articlesPerPage = 6;

    // Función para filtrar noticias
    const filterNews = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;
        let visibleCount = 0;

        newsCards.forEach(card => {
            const title = card.querySelector('.news-title').textContent.toLowerCase();
            const category = card.dataset.category;

            const matchesSearch = title.includes(searchTerm);
            const matchesCategory = selectedCategory === 'all' || category === selectedCategory;

            if (matchesSearch && matchesCategory) {
                card.style.display = '';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Actualizar la paginación
        updatePagination(visibleCount);
    };

    // Función para actualizar la paginación
    const updatePagination = (visibleCount) => {
        const totalPages = Math.ceil(visibleCount / articlesPerPage);
        currentPage = 1; // Reiniciar a la primera página
        showPage(currentPage);
        currentPageSpan.textContent = currentPage;
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages;
    };

    // Función para mostrar la página
    const showPage = (pageNum) => {
        const articles = document.querySelectorAll('[data-page]');
        articles.forEach(article => {
            if (article.dataset.page == pageNum) {
                article.style.display = '';
            } else {
                article.style.display = 'none';
            }
        });
    };

    // Event listeners para filtros
    categoryFilter.addEventListener('change', filterNews);
    searchInput.addEventListener('input', filterNews);

    // Event listeners para paginación
    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            showPage(currentPage);
            currentPageSpan.textContent = currentPage;
            prevPageBtn.disabled = currentPage === 1;
            nextPageBtn.disabled = currentPage === Math.ceil(newsCards.length / articlesPerPage);
        }
    });

    nextPageBtn.addEventListener('click', () => {
        if (currentPage < Math.ceil(newsCards.length / articlesPerPage)) {
            currentPage++;
            showPage(currentPage);
            currentPageSpan.textContent = currentPage;
            prevPageBtn.disabled = currentPage === 1;
            nextPageBtn.disabled = currentPage === Math.ceil(newsCards.length / articlesPerPage);
        }
    });

    // Funcionalidad del modal
    document.querySelectorAll('.btn-news').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const card = btn.closest('.news-card');
            const title = card.querySelector('.news-title').textContent;
            const image = card.querySelector('.news-image').style.backgroundImage;
            const description = card.querySelector('.news-excerpt').textContent;

            modalTitle.textContent = title;
            modalImage.style.backgroundImage = image;
            modalBody.textContent = description;
            modal.style.display = 'block';
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Animación de entrada para las tarjetas
    newsCards.forEach((card, index) => {
        card.style.animation = `fadeIn 0.5s ease forwards ${index * 0.1}s`;
    });

    // Inicializar la página
    filterNews(); // Llamar a la función de filtrado al cargar
});