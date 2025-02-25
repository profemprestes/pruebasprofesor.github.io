// sistemas-operativos.js
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar AOS con configuración mejorada
    AOS.init({
        duration: 800,
        offset: 100,
        once: true,
        mirror: false,
        anchorPlacement: 'top-bottom'
    });

    // Función para copiar bloques de código
    const addCodeCopyButtons = () => {
        const codeBlocks = document.querySelectorAll('pre code');

        codeBlocks.forEach((codeBlock, index) => {
            // Crear botón de copiar
            const copyButton = document.createElement('button');
            copyButton.className = 'copy-button';
            copyButton.innerHTML = '<i class="fas fa-copy"></i>';
            copyButton.setAttribute('aria-label', 'Copiar código');

            // Agregar botón al pre contenedor
            codeBlock.parentNode.style.position = 'relative';
            codeBlock.parentNode.appendChild(copyButton);

            // Funcionalidad de copiado
            copyButton.addEventListener('click', async() => {
                try {
                    await navigator.clipboard.writeText(codeBlock.textContent);
                    copyButton.innerHTML = '<i class="fas fa-check"></i>';
                    setTimeout(() => {
                        copyButton.innerHTML = '<i class="fas fa-copy"></i>';
                    }, 2000);
                } catch (err) {
                    console.error('Error al copiar:', err);
                    copyButton.innerHTML = '<i class="fas fa-times"></i>';
                }
            });
        });
    };

    // Función para resaltar secciones al hacer scroll
    const highlightCurrentSection = () => {
        const sections = document.querySelectorAll('.topic-subsection');
        const navHeight = document.querySelector('#page-header').offsetHeight;

        window.addEventListener('scroll', () => {
            let current = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop - navHeight - 100;
                const sectionHeight = section.offsetHeight;
                if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                    section.classList.add('active-section');
                } else {
                    section.classList.remove('active-section');
                }
            });
        });
    };

    // Función para expandir/colapsar subsecciones
    const initializeCollapsibleSections = () => {
        const subsectionTitles = document.querySelectorAll('.subsection-title');

        subsectionTitles.forEach(title => {
            title.addEventListener('click', () => {
                const content = title.nextElementSibling;
                const isExpanded = content.style.maxHeight;

                // Toggle la clase y la altura máxima
                title.classList.toggle('expanded');
                if (isExpanded) {
                    content.style.maxHeight = null;
                } else {
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            });
        });
    };

    // Inicializar todas las funcionalidades
    addCodeCopyButtons();
    highlightCurrentSection();
    initializeCollapsibleSections();
});

// Agregar estilos dinámicos para los nuevos elementos
const style = document.createElement('style');
style.textContent = `
  .copy-button {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    padding: 0.5rem;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 0.25rem;
    color: #fff;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .copy-button:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  .active-section {
    border-left-color: var(--primary-color);
    background: rgba(59, 130, 246, 0.05);
  }

  .subsection-title {
    cursor: pointer;
  }

  .subsection-title.expanded::before {
    transform: rotate(90deg);
  }
`;

document.head.appendChild(style);

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar animaciones de scroll
    initScrollAnimations();

    // Inicializar navegación suave
    initSmoothScroll();

    // Inicializar resaltado de código
    initCodeHighlight();
});

// Función para inicializar animaciones de scroll
function initScrollAnimations() {
    // Configuración de animaciones AOS
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: true,
        offset: 100,
        disable: window.innerWidth < 768 // Deshabilitar en móviles
    });
}

// Función para navegación suave
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Función para resaltado de código
function initCodeHighlight() {
    // Si hay bloques de código, añadir clases y estilos
    document.querySelectorAll('pre code').forEach(block => {
        block.classList.add('language-' + (block.className || 'plaintext'));
    });
}

// Función para manejar la barra de progreso y el botón "Volver arriba"
function handleScroll() {
    const scrollProgress = document.getElementById('scroll-progress');
    const backToTop = document.getElementById('back-to-top');

    if (!scrollProgress || !backToTop) return;

    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;

    scrollProgress.style.width = scrolled + '%';

    if (winScroll > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
}

// Optimización del evento scroll
let ticking = false;
window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            handleScroll();
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

// Manejar el botón "Volver arriba"
const backToTop = document.getElementById('back-to-top');
if (backToTop) {
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Función para manejar las imágenes responsive
function handleImages() {
    document.querySelectorAll('.course-image').forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
    });
}

// Inicializar el manejo de imágenes cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', handleImages);