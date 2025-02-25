document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Cerrar todas las otras preguntas
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Alternar el estado actual
            item.classList.toggle('active');
        });
    });

    // Formulario de contacto
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar el envío del formulario

        // Validación simple
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (name && email && message) {
            alert('Gracias por tu consulta, ' + name + '! Te responderé lo antes posible.');
            contactForm.reset(); // Reiniciar el formulario
        } else {
            alert('Por favor, completa todos los campos.');
        }
    });
});