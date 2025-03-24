const d = document;
const $listaCarrito = d.querySelector("#lista-carrito");
const $totalCarrito = d.querySelector("#total-carrito");
const $btnCompra = d.querySelector("#btn-compra");
const $mensajeCompra = d.querySelector("#mensaje-compra");
const $carrito = d.querySelector("#carrito");
const $productosContainer = d.querySelector("#productos-container");
const $loader = d.querySelector("#loader");

// Función para cargar los productos desde la Fake Store API
function cargarProductos() {
  // Mostrar el loader mientras se cargan los productos
  $loader.classList.remove("hidden");
  
  // Hacer la petición AJAX a la API
  fetch('https://fakestoreapi.com/products')
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la respuesta de la API');
      }
      return response.json();
    })
    .then(productos => {
      // Ocultar el loader una vez que tenemos los datos
      $loader.classList.add("hidden");
      
      // Limpiar el contenedor de productos
      $productosContainer.innerHTML = '<h2>Productos</h2>';
      
      // Recorrer los productos y agregarlos al DOM
      productos.forEach(producto => {
        const $producto = d.createElement("article");
        $producto.className = "producto";
        $producto.setAttribute("data-id", producto.id);
        $producto.setAttribute("data-nombre", producto.title);
        $producto.setAttribute("data-precio", producto.price);
        
        // Crear la estructura del producto
        $producto.innerHTML = `
          <img src="${producto.image}" alt="${producto.title}">
          <h3>${producto.title}</h3>
          <p class="precio">$${producto.price.toFixed(2)}</p>
          <p class="categoria">${producto.category}</p>
          <button class="btn-agregar">Agregar al carrito</button>
        `;
        
        $productosContainer.appendChild($producto);
      });
    })
    .catch(error => {
      console.error('Error al cargar productos:', error);
      $loader.classList.add("hidden");
      $productosContainer.innerHTML = '<h2>Error al cargar productos</h2><p>Hubo un problema al conectar con la API. Por favor, intenta nuevamente más tarde.</p>';
    });
}

// Cargar los productos cuando se carga la página
d.addEventListener("DOMContentLoaded", cargarProductos);

$btnCompra.addEventListener("click", function (e) {
  if ($listaCarrito.children.length > 0) {
      // Mostrar el mensaje de espera y el loader
      $mensajeCompra.classList.remove("hidden");

      // Simular la compra durante 5 segundos
      setTimeout(function () {
          // Ocultar el mensaje de espera y el loader
          $mensajeCompra.classList.add("hidden");

          // Limpiar el carrito
          $listaCarrito.innerHTML = "";
          $totalCarrito.textContent = "0";

          // Mostrar un mensaje de compra exitosa
          alert("Compra realizada con éxito");
      }, 5000); // 5000 milisegundos = 5 segundos
  } else {
      alert("El carrito está vacío");
  }
});

d.addEventListener("click", function (e) {
  // Agregar producto al carrito (modificado para el nuevo diseño)
  if (e.target.matches(".btn-agregar")) {
    const $producto = e.target.closest(".producto");
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
        <span class="cantidad">1</span>
        <button class="btn-mas">+</button>
        <button class="btn-menos">-</button>
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

// Función para actualizar el total del carrito
function actualizarTotalCarrito() {
  let total = 0;
  Array.from($listaCarrito.children).forEach(item => {
    const $precio = item.querySelector(".precio-producto");
    const $cantidad = item.querySelector(".cantidad");
    total += parseFloat($precio.textContent) * parseInt($cantidad.textContent);
  });
  $totalCarrito.textContent = total.toFixed(2);
}