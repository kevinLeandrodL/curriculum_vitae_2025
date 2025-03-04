// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Elementos DOM
    const sections = document.querySelectorAll('.section');
    const navButtons = document.querySelectorAll('.nav-btn');
    
    // Función para mostrar una sección
    function showSection(sectionId) {
        // Ocultar todas las secciones
        sections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Mostrar la sección seleccionada
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            // Reiniciar animaciones de las barras de progreso si es la sección de CV
            if (sectionId === 'cv') {
                animateProgressBars();
            }
        }
    }
    
    // Función para animar las barras de progreso
    function animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress');
        progressBars.forEach((bar, index) => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100 * index);
        });
    }
    
    // Event Listeners para los botones de navegación
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Actualizar botones activos
            navButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Mostrar la sección correspondiente
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);
        });
    });
    
    // Formulario de contacto
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Aquí puedes agregar la lógica para enviar el formulario
            alert('Mensaje enviado con éxito!');
            this.reset();
        });
    }
    
    // Botón de descarga
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            // Aquí puedes agregar la lógica para descargar el CV
            alert('Descargando CV...');
        });
    }
    
    // Mostrar la sección inicial
    showSection('inicio');
    
    // Animación para las estadísticas
    function animateStats() {
        const stats = document.querySelectorAll('.stat-item h3');
        stats.forEach(stat => {
            const target = parseInt(stat.textContent);
            let current = 0;
            const increment = target / 30;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    clearInterval(timer);
                    current = target;
                }
                stat.textContent = Math.round(current) + '+';
            }, 50);
        });
    }
    
    // Observer para las animaciones al hacer scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('stats-container')) {
                    animateStats();
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    // Observar elementos para animaciones
    document.querySelectorAll('.stats-container').forEach(el => observer.observe(el));
});
