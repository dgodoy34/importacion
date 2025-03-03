const productos = [
    { nombre: "Mini proyector 4k 5G", precio: 95999, imagen: "img/producto1.jpg" },
    { nombre: "Stik TV Android 4K", precio: 42999, imagen: "img/producto2.jpg" },
    { nombre: "STIK GAME 2.4G WIRELES", precio: 48490, imagen: "img/producto3.jpg" },
    { nombre: "SOPORTE TV 14 - 55 ", precio: 18999, imagen: "img/producto4.jpg" },
    { nombre: "Humidificador H20 arom led", precio: 14990, imagen: "img/producto5.jpg" },
    { nombre: "TV BOX MXQ PRO 5G AGOTADO", precio: 0, imagen: "img/producto6.jpg" },
    { nombre: "JOYSTICK SONY PS4", precio: 28000, imagen: "img/producto7.jpg" },
    { nombre: "Auri Inal Galaxy Tour Pro 4 SAMSUNG", precio: 37500, imagen: "img/producto8.jpg" },
    { nombre: "Termo combo Stanley + mate + bombilla", precio: 39990, imagen: "img/producto9.jpg" },
    { nombre: "Vaso cervecero con parlante y abridor STANLEY", precio: 19500, imagen: "img/producto10.jpg" },
    { nombre: "Frapera Hieleras Parlante  Recargable Rgb Led", precio: 33500, imagen: "img/producto11.jpg" },
    { nombre: "Parlante Jbl GO 3 Bluetooth Portátil", precio: 26800, imagen: "img/producto12.jpg" },
    { nombre: "Vaso cervecero con abridor 600ml", precio: 17500, imagen: "img/producto13.jpg" },
    { nombre: "Linterna P50 Táctica Militar Led Zoom Recargable", precio: 14990, imagen: "img/producto14.jpg" },
    { nombre: "Reflector Solar - Lampara Jardín Exterior", precio: 24990, imagen: "img/producto15.jpg" },
    { nombre: "Auriculares Estéreo Sony Wireless Bluetooth", precio: 38990, imagen: "img/producto16.jpg" },
    { nombre: "Reflector LED 30W de Alta Potencia para Ext e Int", precio: 18000, imagen: "img/producto17.jpg" },
    { nombre: "Reflector LED 10W de Alta Potencia para Ext e Int", precio: 15000, imagen: "img/producto17.jpg" }

];

// Clave única
const claveCorrecta = "dgshop2024";

// Función para verificar la clave
function verificarClave() {
    const claveIngresada = document.getElementById("clave").value;
    const mensaje = document.getElementById("mensaje");
    const login = document.getElementById("login");
    const contenido = document.getElementById("contenido");

    if (claveIngresada === claveCorrecta) {
        mensaje.textContent = "✅ Acceso concedido";
        mensaje.style.color = "green";
        setTimeout(() => {
            login.style.display = "none";
            contenido.style.display = "block";
        }, 1000);
    } else {
        mensaje.textContent = "❌ Clave incorrecta";
        mensaje.style.color = "red";
    }
}


const catalogo = document.getElementById("catalogo");
const carrito = document.getElementById("carrito");
const totalElemento = document.getElementById("total");

let carritoItems = [];

// Generar productos dinámicamente
productos.forEach((producto) => {
    let div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}" onclick="mostrarImagen('${producto.imagen}')">
        <h2>${producto.nombre}</h2>
        <p>Precio: $${producto.precio}</p>
        <button onclick="agregarAlCarrito('${producto.nombre}')">Agregar al carrito</button>
    `;
    catalogo.appendChild(div);
});

// Obtener el modal de imagen y la imagen dentro del modal
const modalImagen = document.getElementById("modalImagen");
const imagenAmpliada = document.getElementById("imagenAmpliada");

// Función para mostrar la imagen ampliada
function mostrarImagen(src) {
    imagenAmpliada.src = src;
    modalImagen.style.display = "block";
}

// Cerrar el modal de imagen
document.getElementsByClassName("close")[0].onclick = function() {
    modalImagen.style.display = "none";
};

// Cerrar el modal si se hace clic fuera de él
window.onclick = function(event) {
    if (event.target === modalImagen) {
        modalImagen.style.display = "none";
    }
};

function agregarAlCarrito(nombre) {
    const producto = productos.find(p => p.nombre === nombre);
    if (producto) {
        carritoItems.push(producto);
        actualizarCarrito();
        alert(`Has agregado "${nombre}" al carrito.`);
    }
}

function actualizarCarrito() {
    carrito.innerHTML = "";
    carritoItems.forEach((item, index) => {
        let div = document.createElement("div");
        div.classList.add("carrito-item");
        div.innerHTML = `
            ${item.nombre} - $${item.precio}
            <button onclick="eliminarDelCarrito(${index})">❌</button>
        `;
        carrito.appendChild(div);
    });

    // Actualizar el contador de productos en el icono del carrito
    document.getElementById("contador-carrito").textContent = carritoItems.length;

    calcularTotal();
}

function eliminarDelCarrito(index) {
    carritoItems.splice(index, 1);
    actualizarCarrito();
    alert("Has eliminado un producto del carrito.");
}

function calcularTotal() {
    const total = carritoItems.reduce((acc, item) => acc + item.precio, 0);
    totalElemento.innerHTML = `Total: $${total}`;
    return total;
}

// Función para enviar el pedido por WhatsApp
function enviarPedidoWhatsApp() {
    if (carritoItems.length === 0) {
        alert("El carrito está vacío. Agrega productos antes de finalizar la compra.");
        return;
    }

    const numeroDestino = "5491120226907"; // Reemplázalo con tu número de WhatsApp
    let mensaje = "🛒 *Pedido de Compra*\n\n";

    carritoItems.forEach(item => {
        mensaje += `📌 ${item.nombre} - $${item.precio}\n`;
    });

    const total = calcularTotal();
    mensaje += `\n💰 *Total: $${total}*`;

    // Codificar mensaje para la URL de WhatsApp
    const mensajeCodificado = encodeURIComponent(mensaje);
    const urlWhatsApp = `https://wa.me/${numeroDestino}?text=${mensajeCodificado}`;

    // Abrir WhatsApp en una nueva pestaña
    window.open(urlWhatsApp, "_blank");

    // Vaciar el carrito y actualizar la interfaz
    carritoItems = [];
    actualizarCarrito();

    // Mensaje de confirmación
    setTimeout(() => {
        alert("✅ Pedido enviado. Tu carrito ha sido vaciado.");
    }, 2000);
}
