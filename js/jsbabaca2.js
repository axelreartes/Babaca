const productos = [
    { nombre: "STROKEN", modelo: "BLANCAS", precio: "4500" },
    { nombre: "STROKEN", modelo: "BEIGE", precio: "4500" },
    { nombre: "STROKEN", modelo: "ROJAS", precio: "4500" },
    { nombre: "STROKEN", modelo: "NEGRAS", precio: "4500" },
    { nombre: "URBAN", modelo: "TWINFEELER", precio: "5500" },
    { nombre: "URBAN", modelo: "JOA", precio: "5500" },
    { nombre: "URBAN", modelo: "SID", precio: "5500" },
    { nombre: "URBAN", modelo: "AX", precio: "5500" },
    { nombre: "PANTUFLAS", modelo: "NEGRAS", precio: "1600" },
    { nombre: "PANTUFLAS", modelo: "GRIS", precio: "1600" },
    { nombre: "PANTUFLAS", modelo: "NATURAL", precio: "1600" },
    { nombre: "PANTUFLAS", modelo: "ROSAS", precio: "1600" },
];

let carrito = []

let seleccion = confirm ("Bienvenido a Babaca, ¿Desea comprar un producto?")
if (seleccion){
    alert("A continuacion, nuestra lista de productos")
    let todosLosProductos = productos.map((producto) => producto.nombre + " " + producto.modelo + " " + "$" + producto.precio);
    alert(todosLosProductos.join(" - "))
} else{
    alert("Gracias por visitar Babaca")
}

while(seleccion){
    let producto = prompt("Agrega un producto a tu carrito")
    let modelo = prompt("Seleccione el modelo")
    let precio = 0

    if (producto == "STROKEN" || producto == "URBAN" || producto == "PANTUFLAS"){
        switch(producto){
            case "STROKEN":
                precio = 4500;
                break;
            case "URBAN":
                precio = 5500;
                break;
            case "PANTUFLAS":
                precio = 1600;
                break;
            default:
                break;
        }
    let unidades = parseInt(prompt("Cuantas unidades quiere llevar?"))

    carrito.push({producto, modelo, unidades, precio})
    console.log(carrito)
    }
    else{
        alert("Ingrese un producto valido")
    }

    if (((producto == "STROKEN") && (modelo == "BLANCAS" || modelo == "BEIGE" || modelo == "ROJAS" || modelo== "NEGRAS")) || ((producto == "URBAN") && (modelo == "TWINFEELER" || modelo == "JOA" || modelo == "SID" || modelo == "AX")) || ((producto == "PANTUFLAS") && (modelo == "NEGRAS" || modelo == "GRIS" || modelo == "NATURAL" || modelo == "ROSAS"))) {
    }else {
        alert("Ingrese un modelo valido")
    }
    seleccion = confirm("Desea agregar otro producto?")

    if (!seleccion){
        carrito.forEach((carritoFinal) => {
            console.log("Producto:" + " " + carritoFinal.producto + " " + "Modelo" + " " + carritoFinal.modelo + " " + "Unidades" + " " + carritoFinal.unidades + " " + "Total a pagar por producto" + " " + carritoFinal.unidades * carritoFinal.precio)
        })
    }
}

const total = carrito.reduce((acumulador, el) => acumulador + el.precio * el.unidades, 0)
let finalizar = confirm("El total a pagar por su compra es:" + " " + total)
