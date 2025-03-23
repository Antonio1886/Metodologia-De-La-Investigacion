/**
 * Simulador de Tienda en Línea - JavaScript principal
 * Incluye funcionalidades para:
 * 1. Carrito de compras
 * 2. Formulario de registro con validaciones
 */

// Función de inicialización del documento
document.addEventListener('DOMContentLoaded', function() {
    // ===== VARIABLES GLOBALES =====
    const d = document;
    
    // Elementos del carrito
    const $listaCarrito = d.querySelector("#lista-carrito");
    const $totalCarrito = d.querySelector("#total-carrito");
    const $btnCompra = d.querySelector("#btn-compra");
    const $mensajeCompra = d.querySelector("#mensaje-compra");
    const $mensajeProcesando = d.querySelector("#mensaje-procesando");
    const $carrito = d.querySelector("#carrito");
    
    // Elementos del formulario de registro
    const formulario = d.getElementById('registro-form');
    const nombreInput = d.getElementById('nombre');
    const emailInput = d.getElementById('email');
    const passwordInput = d.getElementById('password');
    const confirmPasswordInput = d.getElementById('confirm-password');
    
    const nombreError = d.getElementById('nombre-error');
    const emailError = d.getElementById('email-error');
    const passwordError = d.getElementById('password-error');
    const confirmPasswordError = d.getElementById('confirm-password-error');
    
    const loaderRegistro = d.getElementById('loader-registro');
    const successMessage = d.getElementById('success-message');
    
    // ===== FUNCIONES DEL CARRITO =====
    
    /**
     * Maneja el evento de compra
     * Muestra un loader durante 5 segundos y luego confirma la compra
     */
    $btnCompra.addEventListener("click", function (e) {
        if ($listaCarrito.children.length > 0) {
            // Mostrar el mensaje de espera y el loader
            $mensajeProcesando.classList.remove("hidden");
            $carrito.classList.add("hidden");
    
            // Simular la compra durante 5 segundos
            setTimeout(function () {
                // Ocultar el mensaje de espera y el loader
                $mensajeProcesando.classList.add("hidden");
                
                // Mostrar mensaje de compra exitosa
                $mensajeCompra.classList.remove("hidden");
    
                // Limpiar el carrito
                $listaCarrito.innerHTML = "";
                $totalCarrito.textContent = "0";
                
                // Ocultar mensaje de éxito después de 3 segundos
                setTimeout(function() {
                    $mensajeCompra.classList.add("hidden");
                    $carrito.classList.remove("hidden");
                }, 3000);
            }, 5000); // 5000 milisegundos = 5 segundos
        } else {
            alert("El carrito está vacío");
        }
    });
    
    /**
     * Maneja los clics en los productos y botones del carrito
     * - Agrega productos al carrito
     * - Incrementa/decrementa cantidades
     */
    d.addEventListener("click", function (e) {
        // Agregar producto al carrito
        if (e.target.matches(".producto")) {
            const $producto = e.target;
            let nombre = $producto.getAttribute("data-nombre");
            let precio = parseFloat($producto.getAttribute("data-precio"));
    
            // Verificar si el producto ya está en el carrito
            let $itemExistente = Array.from($listaCarrito.children).find(item => {
                return item.querySelector(".nombre-producto").textContent === nombre;
            });
    
            if ($itemExistente) {
                // Si el producto ya está en el carrito, incrementar la cantidad
                let $cantidad = $itemExistente.querySelector(".cantidad");
                let cantidad = parseInt($cantidad.textContent);
                $cantidad.textContent = cantidad + 1;
            } else {
                // Si el producto no está en el carrito, agregarlo
                const $itemCarrito = d.createElement("li");
                $itemCarrito.innerHTML = `
                    <span class="nombre-producto">${nombre}</span> - $<span class="precio-producto">${precio.toFixed(2)}</span>
                    <div class="controles-cantidad">
                        Cantidad: <span class="cantidad">1</span>
                        <button class="btn-mas">+</button>
                        <button class="btn-menos">-</button>
                    </div>
                `;
                $listaCarrito.appendChild($itemCarrito);
            }
    
            // Actualizar el total del carrito
            actualizarTotalCarrito();
        }
    
        // Manejar clics en los botones de "+" y "-"
        if (e.target.matches(".btn-mas") || e.target.matches(".btn-menos")) {
            const $itemCarrito = e.target.closest("li");
            const $cantidad = $itemCarrito.querySelector(".cantidad");
            const $precio = $itemCarrito.querySelector(".precio-producto");
            let cantidad = parseInt($cantidad.textContent);
            let precio = parseFloat($precio.textContent);
    
            if (e.target.matches(".btn-mas")) {
                // Incrementar la cantidad
                cantidad++;
            } else if (e.target.matches(".btn-menos")) {
                // Decrementar la cantidad (pero no menos de 0)
                if (cantidad > 1) {
                    cantidad--;
                } else {
                    // Si la cantidad es 1, eliminar el producto del carrito
                    $itemCarrito.remove();
                }
            }
    
            // Actualizar la cantidad en el carrito
            $cantidad.textContent = cantidad;
    
            // Actualizar el total del carrito
            actualizarTotalCarrito();
        }
    });
    
    /**
     * Actualiza el total del carrito sumando todos los productos
     * por su cantidad correspondiente
     */
    function actualizarTotalCarrito() {
        let total = 0;
        Array.from($listaCarrito.children).forEach(item => {
            const $precio = item.querySelector(".precio-producto");
            const $cantidad = item.querySelector(".cantidad");
            total += parseFloat($precio.textContent) * parseInt($cantidad.textContent);
        });
        $totalCarrito.textContent = total.toFixed(2);
    }
    
    // ===== FUNCIONES DEL FORMULARIO DE REGISTRO =====
    
    /**
     * Maneja el envío del formulario de registro
     * Realiza todas las validaciones antes de proceder
     */
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
            simularEnvioRegistro();
        }
    });
    
    /**
     * Resetea todos los mensajes de error del formulario
     */
    function resetErrors() {
        nombreError.textContent = '';
        emailError.textContent = '';
        passwordError.textContent = '';
        confirmPasswordError.textContent = '';
    }
    
    /**
     * Valida el campo de nombre
     * - No puede estar vacío
     * - Solo debe contener letras y espacios
     * @returns {boolean} Resultado de la validación
     */
    function validarNombre() {
        const valor = nombreInput.value.trim();
        
        // Validar que no esté vacío
        if (valor === '') {
            nombreError.textContent = 'El nombre es obligatorio';
            return false;
        }
        
        // Validar que solo contenga letras y espacios
        const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
        if (!regex.test(valor)) {
            nombreError.textContent = 'El nombre solo debe contener letras y espacios';
            return false;
        }
        
        return true;
    }
    
    /**
     * Valida el campo de email
     * - No puede estar vacío
     * - Debe tener un formato válido de correo electrónico
     * @returns {boolean} Resultado de la validación
     */
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
    
    /**
     * Valida el campo de contraseña
     * - No puede estar vacío
     * - Debe tener al menos 8 caracteres
     * - Debe contener al menos una mayúscula, una minúscula, un número y un carácter especial
     * @returns {boolean} Resultado de la validación
     */
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
        
        // Validaciones adicionales
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
    
    /**
     * Valida el campo de confirmación de contraseña
     * - No puede estar vacío
     * - Debe coincidir con la contraseña
     * @returns {boolean} Resultado de la validación
     */
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
    
    /**
     * Simula el envío del formulario con un loader
     * Muestra un mensaje de éxito después de 5 segundos
     */
    function simularEnvioRegistro() {
        // Ocultar formulario y mostrar loader
        formulario.style.display = 'none';
        loaderRegistro.style.display = 'block';
        
        // Simular tiempo de carga (5 segundos)
        setTimeout(function() {
            // Ocultar loader y mostrar mensaje de éxito
            loaderRegistro.style.display = 'none';
            successMessage.style.display = 'block';
        }, 5000);
    }
    
    // Validaciones en tiempo real
    nombreInput.addEventListener('blur', validarNombre);
    emailInput.addEventListener('blur', validarEmail);
    passwordInput.addEventListener('blur', validarPassword);
    confirmPasswordInput.addEventListener('blur', validarConfirmPassword);
});