# Tienda Online: GameHub

## Nombre de la tienda online
*GameHub* - Tu centro de videojuegos digitales

## b. Descripción
GameHub es una tienda online especializada en la venta de videojuegos digitales para PC, disponibles en la plataforma Steam. Ofrecemos títulos nuevos, clásicos, indie y en oferta, codigos de descarga inmediatas tras la compra.

## c. Inventario de productos

| ID  | cNombre del Juego| Género       | Precio (USD) | Descuento | Fecha Lanzamiento | Desarrollador    |
|-----|------------------|--------------|--------------|-----------|-------------------|------------------|
| 001 | Cyberpunketo 2077| RPG          | 39.99        | 20%       | 2020-12-10        | CD Projekt blue  |
| 002 | Stargroup Valley | Simulación   | 14.99        | -         | 2016-02-26        | ConcernedFish    |
| 003 | Elden airing     | ARPG         | 59.99        | -         | 2022-02-25        | FrontenSoftware  |
| 004 | full Knight      | Metroidvania | 14.99        | 15%       | 2017-02-24        | Team Mandarina   |
| 005 | Entrance 2       | Puzzle       | 9.99         | 50%       | 2011-04-19        | drain            |
| 006 | Zeus             | Roguelike    | 24.99        | 10%       | 2020-09-17        | Supermini Games  |

## d. Moodboard de diseño UI (ESTA ES UNA DE REFERENCIA CREADA CON UC PILOT)
![Moodboard GameHub](/Practica10/assets/Paginainicio.png)

## e. Algoritmo de proceso de compra

1. *Inicio*: Usuario accede a GameHub (opcion de crear cuenta3) 
2. *Exploración*:
   - Navega por categorías/búsqueda
   - Filtra por precio/género
3. *Selección de producto*:
   - Visualiza detalles del juego
   - Revisa requisitos del sistema
   - Ve trailers/capturas
4. *Añadir al carrito*:
   - Elige "Comprar ahora" o "Añadir al carrito"
5. *Proceso de pago*:
   - Si no está logueado: crear cuenta/login
   - Selecciona método de pago (tarjeta/PayPal)
   - Ingresa datos de pago
6. *Confirmación*:
   - Revisa resumen de compra
   - Confirma compra
7. *Entrega*:
   - Recibe clave de activación en email
   - Enlace directo a Steam para descarga
8. *Finalización*: 
   - Opción de valorar producto
   - Recomendaciones basadas en compra

## f. Diagrama de flujo
![Diagrama de flujo GameHub](/Practica10/assets/Diagrama%20en%20blanco.png)

## Modelo Entidad-Relacion
### Usuario
- ID_Usuario (PK)
- Nombre
- Email
- Contraseña
- Fecha_Registro
### Prodcuto (videojuegos)
- ID_Producto (PK)
- Nombre
- Género
- Precio_Base
- Desarrollador
- Fecha_Lanzamiento
- Descripción
- Requisietos_Sitema
### Pedido
- ID_Pedido(PK)
- ID_Usuario(FK)
- Total
- Estado

### Descuento
- ID_Descuento (PK)
- Porcentaje
- Fecha_Inicio
- Fecha_Fin 

![Modelo Racional](/Practica10/assets/Modelo%20Entidad-Relacion.png)

## diagrama Racional 


![Modelo Racional](/Practica10/assets/Screenshot%202025-04-17%20185709.png)



## prompt usado
"Design a high-fidelity UI for 'GameHub' (a Steam-like video game store) with a dark theme and gaming aesthetic. Follow this user flow:*

Homepage:

Hero section with a featured game (e.g., Cyberpunk 2077 banner).

Game grid (6+ cards with cover art, title, price, and "Add to Cart" buttons).

Navbar: Logo, categories (RPG, Indie, FPS), search bar, and cart icon.

Product Page:

Game cover (large), title, price, discount tag (if applicable).

"Buy Now" and "Add to Cart" buttons.

Tabs: Description, System Requirements, Reviews.

Trailer embed and screenshot carousel.

Cart Page:

List of selected games (image, title, price, quantity selector).

Order summary (subtotal, taxes, total).

"Proceed to Checkout" button.

Checkout Flow:

Step 1: Login/Register form (or guest checkout option).

Step 2: Payment method selection (credit card, PayPal).

Step 3: Confirmation page ("Order Successful!" + Steam key delivery note).

Style Guidelines:

Colors: Dark background (#0D0D15), purple accents (#8A2BE2), neon green for CTAs (#00FF7F).

Typography: Bold headings (Orbitron), readable body text (Roboto).

Icons: Gaming-themed (controller, cart, Steam logo).

Micro-interactions: Hover effects on buttons, smooth transitions.

Output:

Wireframes + final UI mockups for all screens.

Export to Figma for further edits."*

Key Notes:
Adjust colors/games to match your brand.

For interactive prototypes, add:
"Include clickable transitions between screens (e.g., Home → Product Page → Cart)."

UX Pilot will generate editable layers for customization.