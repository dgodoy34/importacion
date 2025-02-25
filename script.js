const productos = [
    { nombre: "Mini proyector 4k", precio: 95999, imagen: "img/producto1.jpg" },
    { nombre: "Stik TV Android 4K", precio: 42999, imagen: "img/producto2.jpg" },
    { nombre: "Producto 3", precio: 2000, imagen: "img/producto3.jpg" },
    { nombre: "Producto 4", precio: 1000, imagen: "img/producto4.jpg" },
    { nombre: "Producto 5", precio: 1500, imagen: "img/producto5.jpg" },
    { nombre: "Producto 6", precio: 2000, imagen: "img/producto6.jpg" },
    { nombre: "Producto 7", precio: 1000, imagen: "img/producto1.jpg" },
    { nombre: "Producto 8", precio: 1500, imagen: "img/producto2.jpg" },
    { nombre: "Producto 9", precio: 2000, imagen: "img/producto3.jpg" },
    { nombre: "Producto 10", precio: 1000, imagen: "img/producto4.jpg" },
    { nombre: "Producto 11", precio: 1500, imagen: "img/producto5.jpg" },
    { nombre: "Producto 12", precio: 2000, imagen: "img/producto6.jpg" }
];

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
    imagenAmpliada.src = src; // Establecer la fuente de la imagen ampliada
    modalImagen.style.display = "block"; // Mostrar el modal
}

// Cerrar el modal de imagen
const closeModalImagen = document.getElementsByClassName("close")[0]; // Cambia a [0] para seleccionar el primer elemento
closeModalImagen.onclick = function() {
    modalImagen.style.display = "none"; // Ocultar el modal
}

// Cerrar el modal si se hace clic fuera de él
window.onclick = function(event) {
    if (event.target === modalImagen) {
        modalImagen.style.display = "none"; // Ocultar el modal
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
    carrito.innerHTML = ""; // Limpiar el carrito antes de actualizar

    carritoItems.forEach((item, index) => {
        let div = document.createElement("div");
        div.classList.add("carrito-item");
        div.innerHTML = `
            ${item.nombre} - $${item.precio}
            <button onclick="eliminarDelCarrito(${index})">❌</button>
        `;
        carrito.appendChild(div);
    });

    calcularTotal();
}

function eliminarDelCarrito(index) {
    carritoItems.splice(index, 1); // Eliminar el producto según su índice
    actualizarCarrito();
    alert("Has eliminado un producto del carrito.");
}

function calcularTotal() {
    const total = carritoItems.reduce((acc, item) => acc + item.precio, 0);
    totalElemento.innerHTML = `Total: $${total}`;
    return total; // Retornar el total para su uso en enviarCorreo
}

emailjs.init("fksMZpFl9TQtslnTL"); // Reemplázalo con tu ID de usuario

function enviarCorreo() {
    if (carritoItems.length === 0) {
        alert("El carrito está vacío. Agrega productos antes de finalizar la compra.");
        return; // Salir si el carrito está vacío
    }

    let mensaje = "Has realizado una compra con los siguientes productos:\n\n";
    
    // Recorrer el carrito y agregar cada producto al mensaje
    carritoItems.forEach(item => {
        mensaje += `- ${item.nombre}: $${item.precio}\n`;
    });

    const total = calcularTotal(); // Calcular el total aquí

    mensaje += `\nTotal: $${total}\n`;

    let templateParams = {
        to_email: "dgodoy34@gmail.com",  // Cambia esto por el email de destino
        from_name: "Tienda Online",
        message: mensaje, // Este es el contenido que se enviará en el correo
        total: total // Usar el total calculado
    };

    emailjs.send("service_1tgat94", "template_p4clcsr", templateParams)
        .then(response => {
            alert("Compra finalizada. Se ha enviado un correo con los detalles.");
            carritoItems = []; // Vaciar carrito
            actualizarCarrito();
        }, error => {
            alert("Error al enviar el correo: " + JSON.stringify(error));
        });
}
