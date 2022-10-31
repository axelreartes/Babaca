class Producto {
    constructor(id, nombre, precio, img) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.cantidad = 1;
    }
}

const stBlancas = new Producto(1, "Stroken Blancas", 4500, "img/stBlancas.jpg");
const stBeiges = new Producto (2, "Stroken Beiges", 4500, "img/stBeiges.jpg");
const stRojas = new Producto(3, "Stroken Rojas", 4500, "img/stRojas.jpg");
const urbanTwinfeeler = new Producto(4, "Urban Twinfeeler", 5500, "img/urbanTwinfeeler.jpg");
const urbanJoa = new Producto(5, "Urban Joa", 5500, "img/urbanJoa.jpg");
const urbanSid = new Producto(6, "Urban SID", 5500, "img/urbanSid.jpg");
const urbanAx = new Producto(7, "Urban AX", 5500, "img/urbanAx.jpg");
const pantuflaNegra = new Producto(8, "Pantufla negra", 1600, "img/pantuflaNegra.png");
const pantuflaNatural = new Producto(9, "Pantufla natural", 1600, "img/pantuflaNatural.jpg");
const pantuflaRosa = new Producto(10, "Pantufla Rosa", 1600, "img/pantuflaRosa.jpg");

// Array con el catalogo de productos:

const productos = [stBlancas, stBeiges, stRojas, urbanTwinfeeler, urbanJoa, urbanSid, urbanAx, pantuflaNegra, pantuflaNatural, pantuflaRosa];

// Array carrito

let carrito = [];

//cargar carrito desde el localstorage
if(localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
}

//DOM

const contenedorProductos = document.getElementById("contenedorProductos");

// Funcion para mostrar los productos

const mostrarProductos = () => {
    productos.forEach((producto) => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
            <div class="card">
                <img src="${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}">
                <div class="card-body">
                    <h5 class="card-title"> ${producto.nombre} </h5>
                    <p class="card-text"> ${producto.precio} </p>
                    <button class="btn colorBoton" id="boton${producto.id}"> Agregar al carrito </button>
                </div>
            </div>
        `
        contenedorProductos.appendChild(card);

        //Agregar productos al carrito

        const boton = document.getElementById(`boton${producto.id}`);
        boton.addEventListener("click", () => {
            agregarAlCarrito(producto.id)
        })
    })
}

// Funcion agregar al carrito

const agregarAlCarrito = (id) => {
    const producto = productos.find((producto) => producto.id === id);
    const productoEnCarrito = carrito.find((producto) => producto.id === id);
    if(productoEnCarrito){
        productoEnCarrito.cantidad++;
    }else {
        carrito.push(producto);
        //localstorage
        localStorage.setItem("carrito",JSON.stringify(carrito));
    }
    calcularTotal();
}

mostrarProductos();

// Mostrar carrito

const contenedorCarrito = document.getElementById("contenedorCarrito");

const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", () => {
    mostrarCarrito();
});

//Funcion para mostrar el carrito

const mostrarCarrito = () => {
    contenedorCarrito.innerHTML="";
    carrito.forEach((producto) => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
            <div class="card">
                <img src="${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}">
                <div class="card-body">
                    <h5 class="card-title"> ${producto.nombre} </h5>
                    <p class="card-text"> ${producto.precio} </p>
                    <p class="card-text"> ${producto.cantidad} </p>
                    <button class="btn colorBoton" id="eliminar${producto.id}"> Eliminar producto </button>
                </div>
            </div>
        `
        contenedorCarrito.appendChild(card);

        //Eliminar productos del carrito:
        const boton = document.getElementById(`eliminar${producto.id}`);
        boton.addEventListener("click", () => {
            eliminarDelCarrito(producto.id);
        })

    })

    calcularTotal();
}

//Funcion para eliminar producto del carrito

const eliminarDelCarrito = (id) => {
    const producto = carrito.find((producto) => producto.id === id);
    const indice = carrito.indexOf (producto);
    carrito.splice(indice, 1);
    mostrarCarrito();

    //localstorage
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Vaciar todo el carrito de compras

const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", () => {
    eliminarTodoElCarrito();
})

//Funcion para eliminar todo el carrito

const eliminarTodoElCarrito = () => {
    carrito = [];
    mostrarCarrito();
    //localstorage
    localStorage.clear();
}

// Total de la compra

const total = document.getElementById("total");

const calcularTotal = () => {
    let totalCompra = 0;
    carrito.forEach((producto) => {
        totalCompra = totalCompra + producto.precio * producto.cantidad;
    })
    total.innerHTML = `$${totalCompra}`;
}