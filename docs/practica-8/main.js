document.addEventListener('DOMContentLoaded', function() {
    // Obtener referencias a los elementos del DOM
    const formulario = document.getElementById('registro-form');
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    
    const nombreError = document.getElementById('nombre-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const confirmPasswordError = document.getElementById('confirm-password-error');
    
    const loader = document.getElementById('loader');
    const successMessage = document.getElementById('success-message');
    
    // Escuchar el evento de envío del formulario
    formulario.addEventListener('submit', function(event) {
        // Prevenir el envío por defecto del formulario
        event.preventDefault();
        
        // Resetear mensajes de error
        resetErrors();
        
        // Validar cada campo
        const nombreValido = validarNombre();
        const emailValido = validarEmail();
        const passwordValido = validarPassword();
        const confirmPasswordValido = validarConfirmPassword();
        
        // Si todos los campos son válidos, proceder con el envío
        if (nombreValido && emailValido && passwordValido && confirmPasswordValido) {
            simularEnvio();
        }
    });
    
    // Función para resetear todos los mensajes de error
    function resetErrors() {
        nombreError.textContent = '';
        emailError.textContent = '';
        passwordError.textContent = '';
        confirmPasswordError.textContent = '';
    }
    
    // Validación del nombre
    function validarNombre() {
        const valor = nombreInput.value.trim();
        
        // Validar que no esté vacío
        if (valor === '') {
            nombreError.textContent = 'El nombre es obligatorio';
            return false;
        }
        
        // Validar que solo contenga letras y espacios (reto adicional)
        const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
        if (!regex.test(valor)) {
            nombreError.textContent = 'El nombre solo debe contener letras y espacios';
            return false;
        }
        
        return true;
    }
    
    // Validación del email
    function validarEmail() {
        const valor = emailInput.value.trim();
        
        // Validar que no esté vacío
        if (valor === '') {
            emailError.textContent = 'El correo electrónico es obligatorio';
            return false;
        }
        
        // Validar formato de email con regex
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!regex.test(valor)) {
            emailError.textContent = 'Ingresa un correo electrónico válido';
            return false;
        }
        
        return true;
    }
    
    // Validación de la contraseña
    function validarPassword() {
        const valor = passwordInput.value;
        
        // Validar que no esté vacía
        if (valor === '') {
            passwordError.textContent = 'La contraseña es obligatoria';
            return false;
        }
        
        // Validar longitud mínima
        if (valor.length < 8) {
            passwordError.textContent = 'La contraseña debe tener al menos 8 caracteres';
            return false;
        }
        
        // Validaciones adicionales (reto adicional)
        const mayuscula = /[A-Z]/.test(valor);
        const minuscula = /[a-z]/.test(valor);
        const numero = /[0-9]/.test(valor);
        const caracterEspecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(valor);
        
        if (!mayuscula || !minuscula || !numero || !caracterEspecial) {
            let mensaje = 'La contraseña debe incluir al menos:';
            if (!mayuscula) mensaje += ' una mayúscula,';
            if (!minuscula) mensaje += ' una minúscula,';
            if (!numero) mensaje += ' un número,';
            if (!caracterEspecial) mensaje += ' un carácter especial,';
            
            // Eliminar la última coma y añadir punto
            mensaje = mensaje.slice(0, -1) + '.';
            
            passwordError.textContent = mensaje;
            return false;
        }
        
        return true;
    }
    
    // Validación de la confirmación de contraseña
    function validarConfirmPassword() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        
        // Validar que no esté vacía
        if (confirmPassword === '') {
            confirmPasswordError.textContent = 'La confirmación de contraseña es obligatoria';
            return false;
        }
        
        // Validar que coincida con la contraseña
        if (password !== confirmPassword) {
            confirmPasswordError.textContent = 'Las contraseñas no coinciden';
            return false;
        }
        
        return true;
    }
    
    // Función que simula el envío del formulario con un loader
    function simularEnvio() {
        // Ocultar formulario y mostrar loader
        formulario.style.display = 'none';
        loader.style.display = 'block';
        
        // Simular tiempo de carga (5 segundos)
        setTimeout(function() {
            // Ocultar loader y mostrar mensaje de éxito
            loader.style.display = 'none';
            successMessage.style.display = 'block';
        }, 5000);
    }
    
    // Validaciones en tiempo real
    nombreInput.addEventListener('blur', validarNombre);
    emailInput.addEventListener('blur', validarEmail);
    passwordInput.addEventListener('blur', validarPassword);
    confirmPasswordInput.addEventListener('blur', validarConfirmPassword);
});