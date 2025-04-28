document.addEventListener('DOMContentLoaded', function() {
    const envelope = document.getElementById('envelope');
    const btnYes = document.getElementById('btn-yes');
    const btnNo = document.getElementById('btn-no');
    const initialContent = document.getElementById('initial-content');
    const formContainer = document.getElementById('form-container');
    const formTitle = document.getElementById('form-title');
    const formDescription = document.getElementById('form-description');
    const btnSubmit = document.getElementById('btn-submit');
    const loading = document.getElementById('loading');
    const thankYou = document.getElementById('thank-you');
    let userResponse = '';

    // **Eliminamos la verificación inicial de localStorage y la apertura automática**
    // const hasConfirmed = localStorage.getItem('hasConfirmed');
    // if (hasConfirmed) {
    //     envelope.classList.add('open');
    //     setTimeout(() => {
    //         initialContent.style.display = 'none';
    //         thankYou.style.display = 'block';
    //     }, 1000);
    // }

    // Abrir sobre al hacer clic
    envelope.addEventListener('click', function() {
        if (!envelope.classList.contains('open')) {
            envelope.classList.add('open');
        }
    });

    // Mostrar formulario cuando se selecciona "Asisto"
    btnYes.addEventListener('click', function() {
        userResponse = 'asisto';
        showForm('¡Genial! Confirma tu asistencia', 'Por favor dinos tu nombre para poder registrar tu asistencia.');
        createConfetti();
    });

    // Mostrar formulario cuando se selecciona "No asisto"
    btnNo.addEventListener('click', function() {
        userResponse = 'no asisto';
        showForm('Lamentamos que no puedas asistir', 'Por favor dinos tu nombre para registrar tu respuesta.');
    });

    // Función para mostrar el formulario
    function showForm(title, description) {
        initialContent.style.opacity = '0';
        setTimeout(() => {
            initialContent.style.display = 'none';
            formTitle.textContent = title;
            formDescription.textContent = description;
            formContainer.style.display = 'block';
            // Añadir una pequeña demora para la animación
            setTimeout(() => {
                formContainer.style.opacity = '1';
            }, 50);
        }, 300);
    }

    // Manejar envío del formulario
    btnSubmit.addEventListener('click', function() {
        const nombre = document.getElementById('nombre').value.trim();

        if (!nombre) {
            alert('Por favor, ingresa tu nombre');
            return;
        }

        formContainer.style.display = 'none';
        loading.style.display = 'block';

        // Simular carga (en una aplicación real esto podría ser una llamada a la API)
        setTimeout(() => {
            loading.style.display = 'none';
            thankYou.style.display = 'block';

            // Construir el mensaje de WhatsApp
            const mensaje = `Hola, soy ${nombre} y ${userResponse} al evento.`;
            const whatsappURL = `https://wa.me/593995864018?text=${encodeURIComponent(mensaje)}`;

            // Abrir WhatsApp en una nueva pestaña
            window.open(whatsappURL, '_blank');

            // Guardar en localStorage que el usuario ya confirmó
            localStorage.setItem('hasConfirmed', 'true');

        }, 1500);
    });

    // Crear efecto de confeti cuando el usuario selecciona "Asisto"
    function createConfetti() {
        const container = document.querySelector('.container');
        const colors = ['#f5a0a0', '#a0f5c8', '#a0c8f5', '#f5f0a0', '#d9a0f5'];

        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');

            // Estilo aleatorio para cada confeti
            const size = Math.random() * 10 + 5;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const shape = Math.random() > 0.5 ? '50%' : '0';

            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            confetti.style.backgroundColor = color;
            confetti.style.borderRadius = shape;
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.top = `${Math.random() * 100}%`;

            // Animación
            confetti.style.animation = `
                fall ${Math.random() * 3 + 2}s linear infinite,
                sway ${Math.random() * 2 + 2}s ease-in-out infinite alternate
            `;

            confetti.style.opacity = '1';

            // Añadir al contenedor
            container.appendChild(confetti);

            // Eliminar después de unos segundos
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }
    }

    // Añadir keyframes dinámicamente para la animación de confeti
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes fall {
            0% { transform: translateY(-100px); opacity: 0; }
            10% { opacity: 1; }
            100% { transform: translateY(${window.innerHeight}px); opacity: 0; }
        }

        @keyframes sway {
            0% { transform: translateX(-10px) rotate(0deg); }
            100% { transform: translateX(10px) rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
});