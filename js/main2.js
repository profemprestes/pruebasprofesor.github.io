// Typewriter effect phrases
const phrases = [
    "¿Problemas con la base de datos? → Yo soy tu SELECT * FROM soluciones",
    "De bug a feature → En 0 y 1... perdón, ¡en minutos!",
    "¿Código desordenado? → ¡Hagamos un COMMIT de mejoras!",
    "Enseñando tecnología... → Desde el bit hasta el robot 🤖",
    "¿Atrapado en un loop infinito? → Tranquilo, te ayudo a encontrar el break;",
    "¿Tu código no compila? → A veces la vida tampoco, y seguimos adelante 😎",
    "Depurando errores desde... → Bueno, desde que aprendí a programar",
    "Programador en acción → Lo que no arregle con un if, lo arreglo con un try-catch",
    "Si todo falla… → Prueba apagar y encender (o revisar los permisos 🤔)",
    "No hay problema sin solución → Solo warnings que ignoramos... hasta que explotan 💥"
];

class TypeWriter {
    constructor(el, phrases, speed = 100) {
        this.el = el;
        this.phrases = phrases;
        this.speed = speed;
        this.currentPhrase = 0;
        this.text = '';
        this.isDeleting = false;
        this.tick();
    }

    tick() {
        const currentPhrase = this.phrases[this.currentPhrase];
        const [question, answer] = currentPhrase.split(' → '); // Separar la pregunta y la respuesta
        const shouldDelete = this.isDeleting;

        // Mostrar la pregunta primero
        if (!shouldDelete) {
            this.text = question.substring(0, this.text.length + 1);
            this.el.textContent = this.text; // Mostrar la pregunta
            if (this.text === question) {
                setTimeout(() => {
                    this.isDeleting = true; // Cambiar a modo de eliminación
                }, 2000); // Esperar 2 segundos antes de empezar a eliminar
            }
        } else {
            // Mostrar la respuesta después de la pregunta
            if (this.text.length < question.length + answer.length) {
                this.text = question + answer.substring(0, this.text.length - question.length + 1);
                this.el.textContent = this.text; // Mostrar la respuesta
            } else {
                this.isDeleting = false; // Cambiar a modo de escritura
                this.currentPhrase = (this.currentPhrase + 1) % this.phrases.length; // Cambiar a la siguiente frase
                setTimeout(() => this.tick(), 500); // Esperar antes de comenzar la siguiente frase
                return; // Salir para evitar el requestAnimationFrame
            }
        }

        let delta = this.speed;
        if (shouldDelete) {
            delta /= 2; // Acelerar la eliminación
        }

        requestAnimationFrame(() => setTimeout(() => this.tick(), delta));
    }
}

// Countdown Timer
function updateCountdown() {
    const targetDate = new Date('2025-11-29T23:59:59').getTime();

    function update() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }

    update();
    setInterval(update, 1000);
}

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS con duración más rápida
    AOS.init({
        duration: 500, // Reducir la duración de las animaciones
        once: true
    });

    // Inicializar Particles.js
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#ffffff'
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.3,
                random: false
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#ffffff',
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'repulse'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            }
        },
        retina_detect: true
    });

    // Inicializar la sección de Noticias
    function initNoticias() {
        const newsCards = document.querySelectorAll('.noticias-card');

        newsCards.forEach(card => {
            card.addEventListener('click', () => {
                const title = card.querySelector('h3').textContent;
                const description = card.querySelector('p').textContent;
                const logo = card.querySelector('.portal-logo').src;

                // Aquí puedes implementar la lógica para mostrar un modal o una nueva página
                console.log(`Título: ${title}, Descripción: ${description}, Logo: ${logo}`);
            });
        });
    }

    // Llamar a la función de inicialización de Noticias
    initNoticias();

    // Smooth scroll para los enlaces internos
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

    // Botón "Volver arriba"
    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Actualizar año en el copyright
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Mejorar la animación del typewriter
    const typewriterEl = document.querySelector('.typewriter-effect');
    if (typewriterEl) {
        new TypeWriter(typewriterEl, phrases, 200); // Ajustar la velocidad de escritura
    }

    // Inicializar la cuenta regresiva
    const countdown = {
        targetDate: new Date('2025-11-29T23:59:59'),
        elements: {
            days: document.getElementById('days'),
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds')
        },
        pad(num) {
            return num.toString().padStart(2, '0');
        },
        calculate() {
            const now = new Date();
            const diff = this.targetDate - now;

            if (diff <= 0) {
                Object.values(this.elements).forEach(el => el.textContent = '00');
                return false;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            this.elements.days.textContent = this.pad(days);
            this.elements.hours.textContent = this.pad(hours);
            this.elements.minutes.textContent = this.pad(minutes);
            this.elements.seconds.textContent = this.pad(seconds);

            return true;
        },
        init() {
            if (this.calculate()) {
                setInterval(() => this.calculate(), 1000);
            }
        }
    };

    countdown.init();

    // Optimización de scroll y animaciones
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 }
    );

    document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));

    // Funcionalidad de filtrado de materias
    const filterBtns = document.querySelectorAll('.filter-btn');
    const courseCards = document.querySelectorAll('.course-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remover clase active de todos los botones
            filterBtns.forEach(b => b.classList.remove('active'));
            // Agregar clase active al botón clickeado
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            courseCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});

// Add animation for skill bars
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress-bar');
            skillBars.forEach(bar => {
                const width = bar.parentElement.previousElementSibling.querySelector('.skill-progress-value').textContent;
                bar.style.width = width;
            });
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skills-container').forEach(container => {
    observer.observe(container);
});

// Initialize skill bars with 0 width
document.querySelectorAll('.skill-progress-bar').forEach(bar => {
    bar.style.width = '0';
});

// Add parallax effect to cards
const cards = document.querySelectorAll('.noticias-card');

function handleMouseMove(e) {
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 30;
        const rotateY = (centerX - x) / 30;

        // Add a slight glow effect to the ribbon on hover
        const ribbon = card.querySelector('.noticias-card::before');
        if (ribbon) {
            ribbon.style.filter = `brightness(${1 + Math.abs(rotateX + rotateY) / 50})`;
        }

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
}

function resetCards() {
    cards.forEach(card => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        const ribbon = card.querySelector('.noticias-card::before');
        if (ribbon) {
            ribbon.style.filter = 'brightness(1)';
        }
    });
}

// Add card hover effects
cards.forEach(card => {
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', resetCards);
});

// Add intersection observer for progressive loading
const observer2 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

cards.forEach(card => observer2.observe(card));

// Initialize countdown
updateCountdown();

function initMateriasFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const materiaCards = document.querySelectorAll('.materia-card');

    function filterMaterias(category) {
        materiaCards.forEach(card => {
            const cardCategory = card.dataset.category;

            // Add fade out class
            if (category !== 'all' && cardCategory !== category) {
                card.classList.add('fade-out');
                setTimeout(() => {
                    card.classList.add('hidden');
                }, 300);
            } else {
                card.classList.remove('hidden');
                requestAnimationFrame(() => {
                    card.classList.remove('fade-out');
                });
            }
        });
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.dataset.filter;
            filterMaterias(filterValue);
        });
    });

    // Initialize with 'all' filter
    document.querySelector('[data-filter="all"]').click();
}

// Initialize materias filter
initMateriasFilter();

if (typeof AOS !== 'undefined') {
    AOS.refresh();
}