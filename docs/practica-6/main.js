//1. Crear un Arreglo de Productos:
let productos = [
  { nombre: "Camiseta", precio: 15, stock: 10 },
  { nombre: "Pantalón", precio: 25, stock: 8 },
  { nombre: "Zapatos", precio: 50, stock: 5 },
  { nombre: "Sombrero", precio: 10, stock: 20 },
  { nombre: "Vestido", precio: 30, stock: 15 },
];
//2. Agregar Productos al Carrito:
let carrito = [];

function agregarAlCarrito(productoNombre, cantidad) {
  for (let producto of productos) {
    if (producto.nombre === productoNombre) {
      if (producto.stock >= cantidad) {
        carrito.push({
          nombre: productoNombre,
          cantidad: cantidad,
          precio: producto.precio,
        });
         producto.stock -= cantidad;
        console.log(
          `* ${cantidad} ${productoNombre}(s) agregado(s) al carrito.`
        );
        console.log(productos);
        console.log(carrito);
        console.log("***************************");
      } else {
        console.log(
          `No hay suficiente stock del producto "${productoNombre}".`
        );
        return;
      }
    }
  }
}
//3. Calcular el Total del Carrito:
function calcularTotal() {
  let total = 0;
  for (let item of carrito) {
    total += item.precio * item.cantidad;
  }
  return total;
}
let imprimirTotal = calcularTotal();
//console.log(`Venta Total: $${imprimirTotal}`);

// 4.Aplicar Descuentos:
function aplicarDescuento(total) {
  if (total > 100) {
    return total * 0.9;
  }
  return total;
}
let imprimirDescuento = aplicarDescuento(imprimirTotal);
//console.log(`Venta con Descuento del 10%: $${imprimirDescuento}`);
//5. Simular el Proceso de Compra
function procesarCompra() {
  console.log("Procesando compra...");
  mostrarTiempoRestante(3); // Mostrar el contador de confirmación
  setTimeout(function () {
    let total = calcularTotal();
    total = aplicarDescuento(total);
    console.log(`Compra completada. Total a pagar: $${total.toFixed(2)}`);
  }, 3000);
}
// Función para mostrar el tiempo restante para confirmar la compra
function mostrarTiempoRestante(segundos) {
  let contador = segundos;
  // Mostrar el mensaje inicial
  console.log(`Compra confirmada en ${contador}...`);
  // Usar setInterval para actualizar el mensaje cada segundo
  const intervalo = setInterval(() => {
    contador--; // Reducir el contador en 1 segundo
    if (contador > 0) {
      console.log(`Compra confirmada en ${contador}...`);
    } else {
      // Cuando el contador llegue a 0, detener el intervalo y confirmar la compra
      clearInterval(intervalo);
      console.log("¡Compra confirmada!");
    }
  }, 1000); // Actualizar cada 1000 ms (1 segundo)
}

// Función para eliminar productos del carrito
function eliminarDelCarrito(productoNombre) {
  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].nombre === productoNombre) {
      // Eliminar el producto del carrito usando splice
      carrito.splice(i, 1);
      console.log(`* ${productoNombre} eliminado del carrito.`);
      console.log(carrito);
      console.log("***************************");
      return; // Salir de la función después de eliminar el producto
    }
  }
  console.log(`El producto "${productoNombre}" no se encuentra en el carrito.`);
}

// Ejecuta el código:
agregarAlCarrito("Sombrero", 10);
agregarAlCarrito("Zapatos", 3);
eliminarDelCarrito("Sombrero"); // Eliminar "Sombrero" del carrito
procesarCompra();
