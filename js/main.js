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
    constructor(el, phrases, waitTime = 3000) {
        this.el = el;
        this.phrases = phrases;
        this.waitTime = waitTime;
        this.txt = '';
        this.phraseIndex = 0;
        this.isDeleting = false;
        this.type();
    }

    type() {
        const currentPhrase = this.phrases[this.phraseIndex];
        const delta = this.isDeleting ? -50 : 100;

        if (this.isDeleting) {
            this.txt = currentPhrase.substring(0, this.txt.length - 1);
        } else {
            this.txt = currentPhrase.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = `<span>${this.txt}</span>`;

        let typeSpeed = 100;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.txt === currentPhrase) {
            typeSpeed = this.waitTime;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Countdown Timer
function updateCountdown() {
    const targetDate = new Date('2024-12-31T23:59:59').getTime();

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
    // Initialize particles.js
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: '#ffffff' },
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: false },
            size: { value: 3, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#ffffff',
                opacity: 0.4,
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
                onhover: { enable: true, mode: 'repulse' },
                onclick: { enable: true, mode: 'push' },
                resize: true
            }
        },
        retina_detect: true
    });

    // Initialize typewriter effect
    const typewriterEl = document.querySelector('.typewriter-text');
    new TypeWriter(typewriterEl, phrases);

    // Initialize AOS with enhanced settings
    AOS.init({
        duration: 1000,
        offset: 100,
        once: true,
        easing: 'ease-out-cubic',
        delay: 50
    });

    // Add smooth scroll for CTA button
    document.querySelector('.cta-button').addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(e.currentTarget.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
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

    // Add smooth scroll behavior for anchor links
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
});