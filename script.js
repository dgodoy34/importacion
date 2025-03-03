document.addEventListener("DOMContentLoaded", () => {
    cargarCatalogo();
    actualizarCarrito();
    document.getElementById("icono-carrito").style.display = "none"; // Ocultar el icono del carrito al inicio
    const modalCarrito = new bootstrap.Modal(document.getElementById("modalCarrito"));
    modalCarrito.hide(); // Asegurarse de que el modal esté oculto al inicio
});

const claveCorrecta = "dgshop2024";
let carrito = [];

function verificarClave() {
    const claveIngresada = document.getElementById("clave").value;
    if (claveIngresada === claveCorrecta) {
        document.getElementById("login").classList.add("d-none");
        document.getElementById("contenido").classList.remove("d-none");
        document.getElementById("icono-carrito").style.display = "block"; // Mostrar el icono del carrito al iniciar sesión
    } else {
        alert("Clave incorrecta");
    }
}

const productos = [
    {
        nombre: "Mini proyector 4K 5G",
        precio: 95999,
        imagenes: [
            { src: "img/producto1.jpg", descripcion: "Vista frontal del mini proyector" },
            { src: "img/producto1_2.jpg", descripcion: "Mini proyector en uso" },
            { src: "img/producto1_3.jpg", descripcion: "Accesorios del mini proyector" }
        ]
    },
    {
        nombre: "Stik TV Android 4K",
        precio: 42999,
        imagenes: [
            { src: "img/producto2.jpg", descripcion: "Vista del Stik TV Android" },
            { src: "img/producto2_2.jpg", descripcion: "Accesorios incluidos" },
            { src: "img/producto2_3.jpg", descripcion: "Instalado en un televisor" }
        ]
    },
    {
        nombre: "STIK GAME 2.4G WIRELESS",
        precio: 48490,
        imagenes: [
            { src: "img/producto3.jpg", descripcion: "Control inalámbrico en presentación" },
            { src: "img/producto3_2.jpg", descripcion: "Doble control para multijugador" },
            { src: "img/producto3_3.jpg", descripcion: "Detalle de los botones y diseño" }
        ]
    }
];

function cargarCatalogo() {
    const catalogo = document.getElementById("catalogo");
    catalogo.innerHTML = "";
    productos.forEach((producto, index) => {
        catalogo.innerHTML += `
            <div class="col-md-3 mb-4">
                <div class="card">
                    <img src="${producto.imagenes[0].src}" class="card-img-top" alt="${producto.nombre}" onclick="mostrarImagen(${index}, 0)">
                    <div class="card-body text-center">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">$${producto.precio}</p>
                        <button class="btn btn-primary" onclick="agregarAlCarrito(${index})">Agregar al carrito</button>
                    </div>
                </div>
            </div>`;
    });
}

function agregarAlCarrito(index) {
    carrito.push(productos[index]);
    actualizarCarrito();
}

function actualizarCarrito() {
    const listaCarrito = document.getElementById("listaCarrito");
    listaCarrito.innerHTML = "";
    let total = 0;

    carrito.forEach((producto, index) => {
        listaCarrito.innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                ${producto.nombre}
                <span class="badge bg-primary rounded-pill">$${producto.precio}</span>
            </li>`;
        total += producto.precio;
    });

    document.getElementById("totalCarrito").innerText = total;
    document.getElementById("contador-carrito").innerText = carrito.length;
}

function mostrarCarrito() {
    actualizarCarrito();
    const modalCarrito = new bootstrap.Modal(document.getElementById('modalCarrito'));
    modalCarrito.show();
}

function cerrarCarrito() {
    const modalCarrito = bootstrap.Modal.getInstance(document.getElementById('modalCarrito'));
    if (modalCarrito) modalCarrito.hide();
}

function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
    cerrarCarrito();
}

function finalizarCompra() {
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    let mensaje = "Hola, quiero comprar:\n";
    carrito.forEach(producto => {
        mensaje += `- ${producto.nombre} por $${producto.precio}\n`;
    });

    const url = `https://wa.me/549XXXXXXXXXX?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");

    vaciarCarrito();
}

function mostrarImagen(productoIndex, imagenIndex) {
    const imagen = productos[productoIndex].imagenes[imagenIndex];
    document.getElementById("imagenAmpliada").src = imagen.src;
    document.getElementById("descripcionImagen").innerText = imagen.descripcion;

    const modalImagen = new bootstrap.Modal(document.getElementById('modalImagen'));
    modalImagen.show();
}


