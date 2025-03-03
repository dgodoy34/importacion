const carrito = document.getElementById("carrito");
const totalElemento = document.getElementById("total");
const contadorCarrito = document.getElementById("contador-carrito");
let carritoItems = [];

// Mostrar el carrito en el popup
function mostrarCarrito() {
    const popupCarrito = document.getElementById("popup-carrito");
    popupCarrito.style.display = "block";
    actualizarCarrito(); // Cargar los items del carrito en el popup
}

// Cerrar el carrito
function cerrarCarrito() {
    const popupCarrito = document.getElementById("popup-carrito");
    popupCarrito.style.display = "none";
}

// Función para agregar productos al carrito
function agregarAlCarrito(nombre) {
    const producto = productos.find(p => p.nombre === nombre);
    if (producto) {
        carritoItems.push(producto);
        actualizarCarrito();
        generarMensajeCarrito(); // Actualiza el mensaje de WhatsApp al agregar un producto
    }
}

// Actualizar la vista del carrito en el popup
function actualizarCarrito() {
    carrito.innerHTML = "";
    carritoItems.forEach((item, index) => {
        let div = document.createElement("div");
        div.classList.add("carrito-item");
        div.innerHTML = `
            <img src="${item.imagen}" width="50"> ${item.nombre} - $${item.precio}
            <button onclick="eliminarDelCarrito(${index})">❌</button>
        `;
        carrito.appendChild(div);
    });
    contadorCarrito.textContent = carritoItems.length;
    calcularTotal();
}

// Eliminar un producto del carrito
function eliminarDelCarrito(index) {
    carritoItems.splice(index, 1);
    actualizarCarrito();
    generarMensajeCarrito(); // Actualiza el mensaje de WhatsApp al eliminar un producto
}

// Calcular el total del carrito
function calcularTotal() {
    const total = carritoItems.reduce((acc, item) => acc + item.precio, 0);
    totalElemento.innerHTML = `Total: $${total}`;
}

// Generar el mensaje para WhatsApp con los productos del carrito
function generarMensajeCarrito() {
    let mensaje = "Hola, me interesa comprar los siguientes productos:\n";

    carritoItems.forEach(item => {
        mensaje += `${item.nombre} - $${item.precio}\n`;
    });

    // Actualiza el enlace de WhatsApp con el mensaje dinámico.
    const whatsappLink = "https://wa.me/5491120226907?text=" + encodeURIComponent(mensaje);
    document.getElementById("finalizarCompra").setAttribute("href", whatsappLink);
}

// Llamar a la función para actualizar el mensaje cuando se carga la página o se cambia el carrito
generarMensajeCarrito();
