const productos = [
    { nombre: "Mini proyector 4k", precio: 95999, imagen: "img/producto1.jpg" },
    { nombre: "stik tv android 4k", precio: 42999, imagen: "img/producto2.jpg" },
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

// Generar productos dinámicamente
productos.forEach(producto => {
    let div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}" onclick="abrirPopup('${producto.imagen}')">
        <h2>${producto.nombre}</h2>
        <p>Precio: $${producto.precio}</p>
        <button onclick="agregarAlCarrito('${producto.nombre}')">Agregar al carrito</button>
    `;
    catalogo.appendChild(div);
});

function agregarAlCarrito(nombre) {
    alert(`Has agregado "${nombre}" al carrito.`);
}

// Función para abrir el popup con la imagen
function abrirPopup(imagen) {
    let popup = window.open("", "Imagen", "width=600,height=400");
    popup.document.write(`
        <html>
            <head>
                <title>Imagen</title>
                <style>
                    body { display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background: black; }
                    img { max-width: 100%; max-height: 100vh; border-radius: 10px; }
                </style>
            </head>
            <body>
                <img src="${imagen}" alt="Imagen">
            </body>
        </html>
    `);
}
