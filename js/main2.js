// mostrar los productos
const contenedorProductos = document.getElementById("contenedorProductos");

const listadoProductos = "./json/productos.json";

let Productos = [];

fetch(listadoProductos)
    .then((respuesta) => respuesta.json())
    .then((datos) => {
        datos.forEach((producto) => {
            Productos.push(producto);
        })
    })
    .catch((error) => console.log(error))

    .finally(() =>
        Productos.forEach((producto) => {
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

        const boton = document.getElementById(`boton${producto.id}`);
        boton.addEventListener("click", () => {
            Toastify ({
                text: "Producto agregado al carrito",
                duration: 3000,
                gravity: "bottom",
                position: "right",
                style:{
                    background: "black"
                }
            }).showToast();
            agregarAlCarrito(producto.id)
        })
    }))

let carrito = [];

if(localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    for (let i = 0; i < carrito.lenght; i++) {
        carrito.push(carrito[i]);
    }
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

const agregarAlCarrito = (id) => {
    const producto = Productos.find((producto) => producto.id === id);
    const productoEnCarrito = carrito.find((producto) => producto.id === id);
    if(productoEnCarrito){
        productoEnCarrito.cantidad++;
    }else {
        carrito.push(producto);
    }
    //localstorage
    localStorage.setItem("carrito",JSON.stringify(carrito));
    actualizarCarrito();
}


// Mostrar carrito

const contenedorCarrito = document.getElementById("contenedorCarrito");

const verCarrito = document.getElementById("verCarrito");

let eliminar = " ";

verCarrito.addEventListener("click", actualizarCarrito());

function actualizarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    let aux = " ";
    carrito.forEach((producto) => {
        aux += `
        <div class="card">
            <img src="${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}">
            <div class="card-body">
                <h5 class="card-title"> ${producto.nombre} </h5>
                <p class="card-text"> ${producto.precio} </p>
                <p class="card-text"> ${producto.cantidad} </p>
                <button class="btn colorBoton" id="eliminar${producto.id}"> Eliminar producto </button>
            </div>
        </div>
        `;
    });

    contenedorCarrito.innerHTML = aux;
    calcularTotal();
}


// Vaciar todo el carrito de compras

const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", () => {
    Swal.fire({
        title:"¿Estas seguro que quieres eliminar todos los productos del carrito?",
        icon: "warning",
        confirmButtonText: "Vaciar carrito",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: "red",
        cancelButtonColor: "black",
    }).then((result) => {
        if(result.isConfirmed){
            Swal.fire ({
                title: "Carrito vaciado con exito",
                icon: "success",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "black",
            })
            eliminarTodoElCarrito();
        }
    }) 
})

//Funcion para eliminar todo el carrito

const eliminarTodoElCarrito = () => {
    carrito = [];
    mostrarCarrito();
    //localstorage
    localStorage.clear();
}

//Funcion para eliminar producto del carrito





// Funcion agregar al carrito


//Funcion para mostrar el carrito

const mostrarCarrito = () => {
    contenedorCarrito.innerHTML="";
    carrito.forEach((producto) => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
            <div class="card ">
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
        const btn = document.getElementById(`eliminar${producto.id}`);
        btn.addEventListener("click", () => {
            eliminarDelCarrito(producto.id);
            producto.cantidad = 0
           calcularTotal();
        })

        const eliminarDelCarrito = (id) => {
            const producto = carrito.find((producto) => producto.id === id);
            const indice = carrito.indexOf (producto);
            if (producto.cantidad === 1){
                carrito.splice(carrito.indexOf(producto), 1);
            }else {
                carrito[indice].cantidad = carrito[indice].cantidad - 1; 
            }
            actualizarCarrito();
        }

    })

    calcularTotal();
}




