const productos = [
    {
        id: 1,
        nombre: "Laptop Dell",
        precio: 899.99,
        descripcion: "Laptop de 15 pulgadas con procesador Intel Core i5",
    },
    {
        id: 2,
        nombre: "Mouse Logitech",
        precio: 29.99,
        descripcion: "Mouse inalámbrico ergonómico con batería de larga duración",
    },
    {
        id: 3,
        nombre: "Teclado Mecánico",
        precio: 129.99,
        descripcion: "Teclado mecánico RGB con switches Cherry MX",
    },
    {
        id: 4,
        nombre: "Monitor Samsung",
        precio: 249.99,
        descripcion: "Monitor 4K de 27 pulgadas con tecnología IPS",
    },
    {
        id: 5,
        nombre: "Audífonos Sony",
        precio: 199.99,
        descripcion: "Audífonos inalámbricos con cancelación de ruido",
    },
];

function renderizarProductos() {
    const lista = document.getElementById("productosLista");
    lista.innerHTML = "";

    productos.forEach((producto) => {
        const li = document.createElement("li");
        li.className = "producto";

        li.innerHTML = `
            <h3>${producto.nombre}</h3>
            <div class="precio">$${producto.precio.toFixed(2)}</div>
            <div class="descripcion">${producto.descripcion}</div>
        `;

        lista.appendChild(li);
    });
}

function agregarProducto() {
    const nombre = prompt("Ingresa el nombre del producto:");
    if (!nombre) return;

    const precioStr = prompt("Ingresa el precio del producto:");
    if (!precioStr) return;
    const precio = parseFloat(precioStr);

    if (isNaN(precio) || precio < 0) {
        alert("El precio debe ser un número válido y mayor a 0");
        return;
    }

    const descripcion = prompt("Ingresa una breve descripción:");
    if (!descripcion) return;

    const nuevoProducto = {
        id: productos.length > 0 ? Math.max(...productos.map((p) => p.id)) + 1 : 1,
        nombre: nombre,
        precio: precio,
        descripcion: descripcion,
    };

    productos.push(nuevoProducto);

    renderizarProductos();

    alert(`¡Producto "${nombre}" agregado exitosamente!`);
}

document.getElementById("btnAgregar").addEventListener("click", agregarProducto);

document.addEventListener("DOMContentLoaded", renderizarProductos);
