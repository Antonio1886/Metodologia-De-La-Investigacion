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
  $loader.classList.remove("hidden");

  fetch('https://fakestoreapi.com/products')
    .then(response => {
      if (!response.ok) throw new Error('Error en la respuesta de la API');
      return response.json();
    })
    .then(productos => {
      $loader.classList.add("hidden");
      $productosContainer.innerHTML = '<h2>Productos</h2>';

      productos.forEach(producto => {
        const $producto = d.createElement("article");
        $producto.className = "producto";
        $producto.setAttribute("data-id", producto.id);
        $producto.setAttribute("data-nombre", producto.title);
        $producto.setAttribute("data-precio", producto.price);

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

// Cargar productos al iniciar la página
d.addEventListener("DOMContentLoaded", cargarProductos);

$btnCompra.addEventListener("click", function () {
  if ($listaCarrito.children.length > 0) {
    // Mostrar mensaje de "Procesando compra..."
    $mensajeCompra.innerHTML = `<p>Procesando compra...</p><div class="loader"></div>`;
    $mensajeCompra.classList.remove("hidden");

    setTimeout(() => {
      // Cambiar el mensaje a "Compra exitosa"
      $mensajeCompra.innerHTML = `<p>¡Compra exitosa!</p>`;

      // Limpiar el carrito después de la compra
      $listaCarrito.innerHTML = "";
      $totalCarrito.textContent = "0";

      // Ocultar el mensaje después de 2 segundos
      setTimeout(() => {
        $mensajeCompra.classList.add("hidden");
      }, 2000);
    }, 3000); // 3 segundos de procesamiento antes de mostrar "Compra exitosa"
  } else {
    alert("El carrito está vacío");
  }
});

d.addEventListener("click", function (e) {
  if (e.target.matches(".btn-agregar")) {
    const $producto = e.target.closest(".producto");
    let nombre = $producto.getAttribute("data-nombre");
    let precio = parseFloat($producto.getAttribute("data-precio"));

    let $itemExistente = Array.from($listaCarrito.children).find(item =>
      item.querySelector(".nombre-producto").textContent === nombre
    );

    if ($itemExistente) {
      let $cantidad = $itemExistente.querySelector(".cantidad");
      let cantidad = parseInt($cantidad.textContent);
      $cantidad.textContent = cantidad + 1;
    } else {
      const $itemCarrito = d.createElement("li");
      $itemCarrito.innerHTML = `
        <span class="nombre-producto">${nombre}</span> - $<span class="precio-producto">${precio.toFixed(2)}</span>
        <span class="cantidad">1</span>
        <button class="btn-mas">+</button>
        <button class="btn-menos">-</button>
      `;
      $listaCarrito.appendChild($itemCarrito);
    }

    actualizarTotalCarrito();
  }

  if (e.target.matches(".btn-mas") || e.target.matches(".btn-menos")) {
    const $itemCarrito = e.target.closest("li");
    const $cantidad = $itemCarrito.querySelector(".cantidad");
    let cantidad = parseInt($cantidad.textContent);

    if (e.target.matches(".btn-mas")) {
      cantidad++;
    } else if (e.target.matches(".btn-menos")) {
      if (cantidad > 1) {
        cantidad--;
      } else {
        $itemCarrito.remove();
      }
    }

    $cantidad.textContent = cantidad;
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
