// Validación para formulario de contacto con Formspree

// Esperar a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    // Elementos del formulario
    const formulario = document.querySelector('#formularioContacto');
    const mensajeExito = document.querySelector('#mensajeExito');

    // Verificar que el formulario existe
    if (!formulario) {
        console.error('No se encontró el formulario con id "formularioContacto"');
        return;
    }

    // Evento de envío del formulario
    formulario.addEventListener('submit', function(event) {
        // 1. Prevenir el envío normal para validar primero
        event.preventDefault();
        
        // 2. Verificar si el formulario es válido
        if (!formulario.checkValidity()) {
            event.stopPropagation();
            // Agrega clases de validación de Bootstrap
            formulario.classList.add('was-validated');
            return;
        }
        
        // 3. Si es válido, enviar datos vía Formspree
        const formData = new FormData(formulario);
        
        fetch(formulario.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Mostrar mensaje de éxito
                formulario.reset();
                formulario.classList.remove('was-validated');
                mensajeExito.classList.remove('d-none');
                
                // Ocultar mensaje después de 5 segundos
                setTimeout(() => {
                    mensajeExito.classList.add('d-none');
                }, 5000);
            } else {
                alert('Hubo un error al enviar el mensaje. Por favor, intentá nuevamente.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un error de conexión. Por favor, intentá nuevamente.');
        });
    });

    // Validación en tiempo real para campo de email
    const emailInput = document.querySelector('#email');
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            if (emailInput.validity.typeMismatch) {
                emailInput.setCustomValidity('Por favor, ingresá un email válido.');
            } else {
                emailInput.setCustomValidity('');
            }
        });
    }

    console.log('Validación de contacto cargada correctamente');
});