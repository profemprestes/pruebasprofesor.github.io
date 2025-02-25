document.addEventListener('DOMContentLoaded', () => {
    // Inicializar AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        once: true
    });

    // Desplazamiento suave para el botón CTA
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = document.querySelector('#contact-section');
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Animación de las barras de habilidades
    const skillBars = document.querySelectorAll('.skill-level');
    const observerOptions = {
        threshold: 0.5
    };

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillPercentage = entry.target.parentElement.querySelector('.skill-percentage').textContent;
                entry.target.style.width = skillPercentage; // Establece el ancho de la barra según el porcentaje
                skillObserver.unobserve(entry.target); // Deja de observar una vez que se ha animado
            }
        });
    }, observerOptions);

    skillBars.forEach(bar => skillObserver.observe(bar));

    // Manejo del formulario de contacto
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async(e) => {
            e.preventDefault();

            // Animación del botón durante el envío
            const submitButton = contactForm.querySelector('.submit-button');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitButton.disabled = true;

            try {
                // Simulación de envío
                await new Promise(resolve => setTimeout(resolve, 1500));

                // Mostrar mensaje de éxito
                Swal.fire({
                    icon: 'success',
                    title: '¡Mensaje enviado!',
                    text: 'Te responderé lo antes posible.',
                    confirmButtonColor: '#3b82f6'
                });

                contactForm.reset();
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un problema al enviar el mensaje. Por favor, intenta nuevamente.',
                    confirmButtonColor: '#3b82f6'
                });
            } finally {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }
        });
    }

    // Animación suave de los campos del formulario
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('input-focused');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('input-focused');
            }
        });
    });

    // Animación para el efecto subrayado
    const underlineElements = document.querySelectorAll('.underline-effect');
    underlineElements.forEach(element => {
        element.addEventListener('mouseover', () => {
            element.classList.add('active');
        });

        element.addEventListener('mouseout', () => {
            element.classList.remove('active');
        });
    });

    // Animación para las tarjetas de contacto
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
});