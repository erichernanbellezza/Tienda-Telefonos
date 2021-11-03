const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input')

const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{3,40}$/, // Letras y espacios, pueden llevar acentos.
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const campos = {
    nombre: false,
    email: false,
    telefono: false
}

const validarFormulario = (e) => {
    console.log(e.target.name);
    
    switch (e.target.name) {
        case "nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre');
        break;
        case "correo":
            validarCampo(expresiones.email, e.target, 'email');
        break;
        case "telefono":
            validarCampo(expresiones.telefono, e.target, 'telefono');
        break;
    }
    
}

const validarCampo = (expresion, input, campo) => {
    if(expresion.test(input.value)) {
        document.getElementById(`${campo}`).classList.add('formularioCorrecto');
        document.querySelector(`#grupo-${campo} .errorInput`).classList.remove('mostrarError');
        campos[campo] = true ;
    }
    else {
        document.getElementById(`${campo}`).classList.add('formularioIncorrecto');
        document.getElementById(`${campo}`).classList.remove('formularioCorrecto');
        document.querySelector(`#grupo-${campo} .errorInput`).classList.add('mostrarError');
        campos[campo] = false ;
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
})

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    if (campos.nombre && campos.telefono && campos.email) {
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

    } else {
        document.getElementById('mensajeErrorCompra').classList.add('mostrar');
    }
})
