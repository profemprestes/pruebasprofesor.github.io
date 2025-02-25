// Inicialización de AOS (Animate on Scroll)
AOS.init({
    duration: 800,
    once: true
});

// Datos para el cuestionario
const quizData = [{
        question: "¿Qué es un modelo conceptual en bases de datos?",
        options: [
            "Una representación física de la base de datos",
            "Una representación abstracta y simplificada de la realidad",
            "Un conjunto de tablas relacionadas",
            "Un diagrama de flujo de datos"
        ],
        correct: 1
    },
    {
        question: "¿Cuál es el propósito principal de la normalización?",
        options: [
            "Hacer la base de datos más rápida",
            "Reducir la redundancia y dependencias",
            "Crear más tablas",
            "Simplificar las consultas"
        ],
        correct: 1
    },
    // Agregar más preguntas según sea necesario
];

// Función para cargar el cuestionario
function loadQuiz() {
    const quizForm = document.getElementById('quiz-form');
    if (!quizForm) return;

    let quizHTML = '';
    quizData.forEach((q, index) => {
                quizHTML += `
            <div class="quiz-question">
                <h4>Pregunta ${index + 1}: ${q.question}</h4>
                <div class="quiz-options">
                    ${q.options.map((option, optIndex) => `
                        <label class="quiz-option">
                            <input type="radio" name="q${index}" value="${optIndex}">
                            ${option}
                        </label>
                    `).join('')}
                </div>
            </div>
        `;
    });

    quizHTML += '<button type="submit" class="submit-quiz">Enviar Respuestas</button>';
    quizForm.innerHTML = quizHTML;

    // Manejador de envío del cuestionario
    quizForm.addEventListener('submit', handleQuizSubmit);
}

// Función para manejar el envío del cuestionario
function handleQuizSubmit(e) {
    e.preventDefault();
    let score = 0;
    
    quizData.forEach((q, index) => {
        const answer = document.querySelector(`input[name="q${index}"]:checked`);
        if (answer && parseInt(answer.value) === q.correct) {
            score++;
        }
    });

    alert(`Tu puntuación: ${score} de ${quizData.length}`);
}

// Navegación suave al hacer clic en los enlaces de la barra de navegación
document.querySelectorAll('.unit-nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Función para resaltar la sección actual en la navegación
function highlightCurrentSection() {
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.unit-nav a');
    
    let currentSectionId = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 100)) {
            currentSectionId = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active');
        }
    });
}

// Escuchar el evento scroll para actualizar la navegación
window.addEventListener('scroll', highlightCurrentSection);

// Cargar el cuestionario cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    loadQuiz();
    highlightCurrentSection();
});