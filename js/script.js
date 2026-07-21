let carrito = [];


// AGREGAR PRODUCTO

function agregarProducto(nombre, precio){


    let producto = carrito.find(item => item.nombre === nombre);


    if(producto){

        producto.cantidad++;

    }else{

        carrito.push({

            nombre:nombre,

            precio:precio,

            cantidad:1

        });

    }


    actualizarCarrito();

}




// ACTUALIZAR CARRITO

function actualizarCarrito(){


    let lista = document.getElementById("lista-carrito");

    let contador = document.getElementById("contador");

    let totalTexto = document.getElementById("total");


    if(!lista) return;



    lista.innerHTML="";


    let total = 0;

    let cantidadTotal = 0;



    carrito.forEach((producto,index)=>{


        total += producto.precio * producto.cantidad;

        cantidadTotal += producto.cantidad;



        lista.innerHTML += `


        <div class="producto-carrito">


            <h4>
            ${producto.nombre}
            </h4>


            <p>
            S/${(producto.precio * producto.cantidad).toFixed(2)}
            </p>


            <button onclick="cambiarCantidad(${index},-1)">
            -
            </button>


            <span>
            ${producto.cantidad}
            </span>


            <button onclick="cambiarCantidad(${index},1)">
            +
            </button>


            <button onclick="eliminarProducto(${index})">
            🗑️
            </button>


        </div>


        `;


    });



    if(carrito.length===0){

        lista.innerHTML="Tu carrito está vacío";

    }



    contador.innerHTML=cantidadTotal;


    totalTexto.innerHTML=
    "Total: S/ "+total.toFixed(2);



}



// CAMBIAR CANTIDAD

function cambiarCantidad(index,cambio){


    carrito[index].cantidad += cambio;


    if(carrito[index].cantidad <=0){

        carrito.splice(index,1);

    }


    actualizarCarrito();

}




// ELIMINAR PRODUCTO

function eliminarProducto(index){


    carrito.splice(index,1);


    actualizarCarrito();


}




// MOSTRAR CARRITO

function mostrarCarrito(){


    document
    .getElementById("panel-carrito")
    .classList.toggle("activo");


    document
    .getElementById("fondo-carrito")
    .classList.toggle("activo");


}




// ENVIAR WHATSAPP

function enviarWhatsApp(){


    if(carrito.length===0){

        alert("El carrito está vacío");

        return;

    }



    let nombre =
    document.getElementById("nombreCliente").value;



    let direccion =
    document.getElementById("direccionCliente").value;



    let pago =
    document.getElementById("pagoCliente").value;



    if(nombre==="" || direccion==="" || pago===""){

        alert("Completa tus datos antes de enviar el pedido");

        return;

    }



    let mensaje =
    "Hola QORI BOWL 👋%0A%0A";



    mensaje +=
    "Quiero realizar este pedido:%0A%0A";



    let total=0;



    carrito.forEach(producto=>{


        mensaje +=
        "🥗 "+producto.nombre+
        " x"+producto.cantidad+
        " - S/"+
        (producto.precio*producto.cantidad).toFixed(2)
        +"%0A";


        total += producto.precio*producto.cantidad;


    });



    mensaje +=
    "%0A💰 Total: S/"+
    total.toFixed(2);



    mensaje +=
    "%0A%0A👤 Nombre: "+nombre;



    mensaje +=
    "%0A📍 Dirección: "+direccion;



    mensaje +=
    "%0A💳 Pago: "+pago;



    window.open(

    "https://wa.me/51968921825?text="+mensaje,

    "_blank"

    );


}