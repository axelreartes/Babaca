solicitarDatos ();
iniciarCarrito();




function  solicitarDatos(){

    let usuario = prompt("Ingrese su usuario");
    let pass = prompt ("Ingrese su contraseña");

    while(!validarDatos(usuario,pass)){
        alert("Usuario y/o contraseña invalida");
        usuario = prompt("Ingrese su usuario");
        pass = prompt ("Ingrese su contraseña");

    }

}


function validarDatos(usuario,pass){


    if (usuario !="" && pass !="" && usuario != null && pass != null){


        return true ;
    
    }else {


        return false ;

    }





}

function iniciarCarrito(){


    let lista = "" ;

    let finalizar_carrito = false ;


    while (!finalizar_carrito){


        let cod = prompt("Ingrese nombre de producto \nCLASSIC\nURBAN\nPANTUFLAS");
        let producto = obtenerProducto(cod);


        if (producto){

            console.log("producto agregado con exito :"+producto);
            lista += "\n"+producto;


        }else{

            if (cod === null){

                finalizar_carrito = true ;


            }else {


                alert("Ingrese un codigo de producto valido");
            
            }

        }

    }

    if (lista != ""){

        let resp = confirm ("Desea concretar la compra de :"+lista);
        if (resp){

            alert("Gracias por comprar en nuestra tienda online");


        }


    }








}




function obtenerProducto(cod){ 


    let producto  ;
    switch(cod){

        case "CLASSIC" : 
                    producto = " Calzado Classic";
                    break;
        case "URBAN" : 
                    producto = " Calzado Urban";
                    break;
        case "PANTUFLAS" : 
                    producto = " Pantuflas" ;
                    break;
                    
         default :
                    producto = false;           

    }


   return producto ;  



}

