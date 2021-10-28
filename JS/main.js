const precioFinal = document.getElementById('sumaTotal');
const abrirCerrarCarrito = document.getElementById('carritoDeCompras');
const selectMarca = document.getElementById('ordenarPorMarca');
const selectPrecio = document.getElementById('ordenarPorPrecio');
const botonBuscar = document.getElementById('botonBuscar');
const ocultarMain = document.getElementById('mainPrincipal');
const mostrarCompra = document.getElementById('compraID');
const precioFinalCompra = document.getElementById('totalCompra')
const ocultarCarritoBolsa = document.getElementById('toggleBolsa');

let carrito = []
const miLocalStorage = window.localStorage;

const url = './JS/stock.json'
$.get(url, (response) => {
    stockProductos = response

    mostrarProductos(stockProductos)
    console.log(stockProductos)
})

        //Acá se van añadiendo con un bucle forEach a traves del DOM los productos a la página.

        const mostrarProductos = (stockProductos) => {
            contenedorProductos.innerHTML = ``
        
            stockProductos.forEach( (producto) => {
                const div = document.createElement('div')
                div.classList.add('producto')
                div.innerHTML = `
                <h3 class="nombreCelular">${producto.nombre}</h3>
                    <img class="imagenCelular" src="${producto.img}"" alt="">
                    <div>
                        <button onclick="agregarAlCarrito(${producto.id})" class="anadirAlCarrito" id="anadirAlCarritoId">Añadir</button>
                        <p>$ ${producto.precio}</p> 
                    </div>
                ` 
                
                contenedorProductos.appendChild(div)
            } )
        }

         ///// Esta función es para añadir los productos al array de carrito
    
    const agregarAlCarrito = (itemId) => {
        const productoEncarrito = carrito.find( (prod) => prod.id === itemId)
        
        if (productoEncarrito) {
            productoEncarrito.cantidad++
        
        } else {
            const prod = stockProductos.find( (prod) => prod.id === itemId)
    
            carrito.push({
                id: prod.id,
                nombre: prod.nombre,
                precio: prod.precio,
                img: prod.img,
                cantidad: 1
            })

            botonBuscar.addEventListener('click', () => { 
                mostrarProductos( buscar(search) )  
            })
            
        }
    
        console.log(carrito)
    
        actualizarCarrito()
    
        guardarCarritoEnLocalStorage();

        const noProductosEnCarritoID = document.getElementById("noProductosEnCarritoID");

        if (carrito.length >= 1) {
            noProductosEnCarritoID.classList.remove('mostrarInline');
        }

    }
    
    //// esta función sirve para añadir el innerHTML a los productos del carrito
    
    const actualizarCarrito = () => {
        productosEnCarrito.innerHTML = ""
    
        carrito.forEach((producto) => {
            const div = document.createElement('div')
            div.classList.add('productoEnCarrito')
    
            div.innerHTML = `
            <div class="estilosProductosCarrito" id="productosCarrito">
                <img src="${producto.img}">
                <p class="nombreProductoCarrito">${producto.nombre}</p>
                <p class="precioProductosCarrito">$ ${producto.precio}</p>
                <p class="cantidadCarrito"> ${producto.cantidad} </p>
                <button onclick="eliminarProducto(${producto.id})" class="buttonCantidad">X</button>
            </div>
            <div>
            `
            productosEnCarrito.appendChild(div)   

        })  

        precioFinal.innerText = carrito.reduce((acc, producto) => acc += producto.precio * producto.cantidad , 0)
        

    };

    //// Función para eliminar los productos del carrito
    
    const eliminarProducto = (itemId) => {
        const producto = carrito.find((producto) => producto.id === itemId)

        producto.cantidad--
    
        if (producto.cantidad === 0) {
            const index = carrito.indexOf(producto)
            carrito.splice(index, 1)
        }
        
        actualizarCarrito()

        guardarCarritoEnLocalStorage();
        
    };


    //// acá muestro el carrito ////
    
    $('#toggleBolsa').click( () => {
        $('#carritoDeCompras').slideDown(500)
    })
    
    //// acá se cierra el carrito ////
    
    $('#cerrarCarrito').click ( () => {
        $('#carritoDeCompras').slideUp(500)
    })

    ///// A partir de acá están las funciones para verificar si hay objetos guardados en el local storage y de existir los renderiza con la función actualizarCarrito, en caso contrario no muestra nada.

    function guardarCarritoEnLocalStorage () {
        miLocalStorage.setItem('carrito', JSON.stringify(carrito));
    }
    
    function cargarCarritoDeLocalStorage () {
        // ¿Existe un carrito previo guardado en LocalStorage?
        if (miLocalStorage.getItem('carrito') !== null) {
            // Carga la información
            carrito = JSON.parse(miLocalStorage.getItem('carrito'));
        }
    }
    
    cargarCarritoDeLocalStorage();      

    actualizarCarrito();


// Esta función permite ordenar los productos de la página principal según precio o marca    

const filtrar = () => {
    let valorFiltroMarca = selectMarca.value
    let valorFiltroPrecio = selectPrecio.value

    let arrayFiltrado = []

    botonPrecioAplicado.addEventListener('click', () => {
        if (valorFiltroMarca == 'Todos') {
            arrayFiltrado = stockProductos
        } else {
            arrayFiltrado = stockProductos.filter (el => el.marca == selectMarca.value)
        }
    
        if (valorFiltroPrecio == 1) {
            arrayFiltrado = arrayFiltrado.filter( el => el.precio >= 50000)
        } else if (valorFiltroPrecio == 2) {
            arrayFiltrado = arrayFiltrado.filter( el => el.precio >= 70000)
        }
    
        mostrarProductos(arrayFiltrado);
    } )  

}

selectMarca.addEventListener('change', ()=>{
    filtrar();
})
selectPrecio.addEventListener('change', ()=>{
    filtrar();
})


// === buscador ===

const buscador = document.getElementById('inputBuscador')

const buscar = (search) => {
    return stockProductos.filter((prod) => prod.nombre.toLowerCase().includes(search))
}

buscador.addEventListener('input', () => {
    const search = buscador.value.trim().toLowerCase()

    botonBuscar.addEventListener('click', () => { 
        mostrarProductos( buscar(search) )  
    })
    
})


    const eleccionModoDePago = () => {
        const buttonComprarClickeado = document.getElementById('buttonComprar');
        const mostrarEleccionCompra = document.getElementById('comprarEleccionID');
        const backgroundNegroID = document.getElementById('backgroundNegroID');
        const noProductosEnCarritoID = document.getElementById("noProductosEnCarritoID");
    
        buttonComprarClickeado.addEventListener('click', () => {

            // esto despliega un texto diciendo que faltan productos en el carrito si está vacío y no permite pasar a la sección de elegir el modo de pago 
            if (carrito.length <= 0) { 
                noProductosEnCarritoID.classList.add('mostrarInline')

            } else if (carrito.length >= 1) {

            console.log(buttonComprarClickeado);
            mostrarEleccionCompra.classList.toggle('mostrarInline');
    
            backgroundNegroID.classList.toggle('mostrarInline');
            console.log(backgroundNegroID);

            }
            if(carrito.length >= 1) { 
                noProductosEnCarritoID.classList.remove('mostrarInline');
            }
        });
        
    }

    eleccionModoDePago();


const eleccionModoDePagoCerrar = () => { 
    const cerrarEleccionCompra = document.getElementById('comprarEleccionID');
    const botonCancelarEleccionCompra = document.getElementById('cancelarCompraEleccion');
    const backgroundNegroID = document.getElementById('backgroundNegroID');

    botonCancelarEleccionCompra.addEventListener('click', () => {
        cerrarEleccionCompra.classList.remove('mostrarInline');

        backgroundNegroID.classList.remove('mostrarInline');
        console.log(backgroundNegroID);
    });
}
eleccionModoDePagoCerrar();

/* Acá se añaden los productos del carrito a la parte de finalizar compra según el array de carrito, se oculta toda la página principal

*/
const pagarConSP = document.getElementById('pagarConSP');

    pagarConSP.addEventListener('click', () => {
        /// Este condicional evitahace que si el carrito no tiene productos el boton de comprar no permita pasar a la sección de comprar.
        if (carrito.length >= 1) { 
            ocultarMain.classList.toggle('ocultarMain');
            mostrarCompra.classList.toggle('mostrarComprar');
            ocultarCarritoBolsa.classList.toggle('ocultarCarritoBolsa');
            abrirCerrarCarrito.classList.toggle('ocultarCarritoBolsa');
            modoOscuro.classList.toggle('ocultarBotonModoOscuro');
            const backgroundNegroID = document.getElementById('backgroundNegroID');
        
            const mostrarProductosFinalizar = () => {
    
                productosFinalizar.innerHTML = ""
    
                carrito.forEach((producto) => {
                    const div = document.createElement('div')
                    div.classList.add('producto_finalizarCompra')
    
                    div.innerHTML = `
                    <div class="producto_finalizarCompra" >
                    <img src="${producto.img}" alt="" class="imagenProductoCompra">
                    <p class="nombreProducto_finalizarCompra">${producto.nombre}</p>
                    <p class="precioProducto_finalizarCompra">$${producto.precio}</p>
                    <p class="CantidadFinalizarCompra">Cantidad: ${producto.cantidad}</p>   
                    `
                    productosFinalizar.appendChild(div)
                })
                console.log(mostrarProductosFinalizar);
            };
    
            precioFinalCompra.innerText = carrito.reduce((acc, producto) => acc += producto.precio * producto.cantidad , 0)

            // acá se realizan los cálculos de las cuotas según el precio total
            let optionsCuotas = [ 1, 3, 6, 12 ];

            for (var i = 0; i < optionsCuotas.length; i++) {
                funcionCuotas(parseInt(precioFinalCompra.textContent), i, optionsCuotas[i])
            }

            console.log(buttonComprar);
            mostrarProductosFinalizar();
            
            backgroundNegroID.classList.remove('mostrarInline');
        } 
        
    });

        // esta es la función para realizar los cálculos y las modificaciones al html para mostrar las cuotas correctamente
        let funcionCuotas = (precioFinalCompra, indice, cantidadDeCuotas) => {

        let precioTotalParaCuotas =  precioFinalCompra / cantidadDeCuotas;
        let value = cantidadDeCuotas + '_' + precioTotalParaCuotas.toFixed(2);
        let concatenacionHMLT = cantidadDeCuotas + ' Pagos de $ ' + precioTotalParaCuotas.toFixed(2);
        let concatenacionSelector = '.cuotas option:nth-child(' + ( indice + 1 ) + ')';

        $(concatenacionSelector).val(value)
        $(concatenacionSelector).html(concatenacionHMLT);

    };


    // Si se finaliza la compra con el método de la página vuelve el carrito a un array vacío y lo aplica al local storage , además de mostrar un mensaje con los datos ingresados vía el formulario.

    buttonFinalizarCompraEvento = document.getElementById('buttonFinalizarCompraEvento');
    finalizarCompraMensaje = document.getElementById('finalizarCompraMensaje');
    ocultarFormCompra = document.getElementById('compraID');
    
    buttonFinalizarCompraEvento.addEventListener('click', () => {
        ocultarFormCompra.classList.add('ocultar');
        carrito = []
        console.log(carrito);
        guardarCarritoEnLocalStorage();

        let nombre = document.getElementById('nombre').value;
        let email = document.getElementById('email').value;
        let creditCardNumber = document.getElementById('creditCardNumber').value;
        let creditCardNumberLast4 = creditCardNumber.substr(15)
        let cuotas = document.getElementById('cuotas').value.replaceAll('_', ' Cuotas de: $');

        const div = document.createElement('div')
        div.classList.add('mensajeCompra')
    
        div.innerHTML = `
            <h1>¡Gracias <span class="greenColor">${nombre}</span> por elegirnos!</h1>
            <h2>¡El pago fue realizado con éxito!</h2>
            <p>Corroborá las instrucciones de retiro en tu correo: <span class="greenColor">${email}</span ></p>
            <p>Pagaste $ ${totalCompra.innerHTML} en ${cuotas}</p>
            <p>Con la tarjeta número: **** - **** - **** - ${creditCardNumberLast4}</p>
        `
        finalizarCompraMensaje.appendChild(div)
    });



//Esta función sirve para hacer la petición a MercadoPago y se incluyen los productos del carrito, cuando se completa la compra se vacía el carrito y el localStorage
const finalizarCompraMP = () => {

    if(carrito.length >= 1) { 
        const itemsMercadoPago = carrito.map((producto) => {
            return {
                title: producto.nombre,
                description: "",
                picture_url: "",
                category_id: producto.id,
                quantity: producto.cantidad,
                currency_id: 'ARS',
                unit_price: producto.precio
            }
        })
    
        fetch('https://api.mercadopago.com/checkout/preferences', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer TEST-510098023140664-102605-953c03f1527f0d779dc5224bb3f84c5a-295802024'
            },
            body: JSON.stringify({
                items: itemsMercadoPago ,
                back_urls: {
                    success: window.location.href,
                    failure: window.location.href
                }
    
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
    
            window.location.replace(data.init_point);
        })
        carrito = [] 
        guardarCarritoEnLocalStorage();
    }

}


    