import eliminarProducto from '../eliminar_producto.js';
import enviarCarrito from '../enviar_carrito.js';

document.addEventListener("DOMContentLoaded", () => {

    // enviamos los datos de localStorage mediante fetch: 
    enviarCarrito();
   
    
    /******************************************************************************************************* */
    // Al clicar en el input number si el número es superior, lo sube a localStorage. Si es inferior borra uno.
    const btn_cantidad = document.querySelectorAll('.input-cantidad');

    btn_cantidad.forEach.call(btn_cantidad, (e) => {
        e.addEventListener('click', () => {

            // e corresponde al input cantidad que clicamos
            // nuevaCantidad corresponde al valor del input cuando clicamos.
            const nuevaCantidad = e.value;
            // para seleccionar cada div, primero seleccionaremos el padre y le añadiremos una clase con el número de idProducto
            const contenedor = e.parentElement.parentElement.getAttribute('id');
            e.parentElement.parentElement.classList.add(`contenedor${contenedor}`);
            // añadimos la clase
            const contenedorClass = document.querySelector(`.contenedor${contenedor}`);

            // Guardamos el valor del div precio para poder recalcular el total
            let precio = document.querySelector(`.contenedor${contenedor} .precio`).textContent;
            
            // Seleccionamos el div 'total' del elemento
            const total = document.querySelector(`.contenedor${contenedor} .total`);

            // Guardamos el id del producto cada vez que clicamos en el botón 'añadir al carrito' de un producto
            const idProducto = Number(e.parentElement.parentElement.getAttribute('id'));

            const idUser = e.getAttribute('id');
            
            // cogemos el array de localStorage
            const carrito = JSON.parse(localStorage.getItem('productos'));
            let contador = 0;

            //Añadimos un contador para saber si le hemos dado a subir o bajar en el input number
            for (let i = 0; i < carrito.length; i++) {
                // Si se repite, suma uno al contador
                if (carrito[i][0] === idProducto) {
                    contador++
                }
            }

            if (idUser === "") {
                alert('Inicia sesión para comprar');

            } else {
                // si el contador es menor que la cantidad que aparece en el input, inserta el producto en localStorage y recalcula el precio
                let localStorageDB = JSON.parse(localStorage.getItem('productos')); // creamos un nuevo array con el localStorage productos

                if (contador < nuevaCantidad) {
                    // añade
                    carrito.push([idProducto]);

                    // insertamos el array carrito en LocalStorage
                    const carrito_json = JSON.stringify(carrito);
                    localStorage.setItem('productos', carrito_json);
                    // recalcula el total de cada producto

                    recalcular(nuevaCantidad, total, precio);

                } else {
                    // elimina
                    if (nuevaCantidad === 1) {
                        // elimina completamente el producto de la lista localStorage
                        eliminarProducto(idProducto);
                        
                        location.reload();
                    } else {
                        // elimina de uno en uno
                        for (let i = 0; i < localStorageDB.length; i++) {

                            if (localStorageDB[i][0] === idProducto) {

                                localStorageDB.splice(i, 1);

                                break;  // salimos del bucle para que solo nos elimine un producto cada vez.
                            }

                        }
                        // Esta función calcula el total de cada producto según la cantidad y también recalcula el total a pagar
                        recalcular(nuevaCantidad, total, precio);


                    }

                    localStorage.setItem('productos', JSON.stringify(localStorageDB));
                }
            }


        })
 

    })    

    

    // Al clicar en el botón 'vaciar carrito' llama a la función y elimina 'productos' de localStorage
    const boton_vaciar = document.querySelector('.boton-vaciar');
    boton_vaciar.addEventListener('click', () => {

        if (confirm("¿Quieres vaciar el carrito?")) {

            vaciarCarrito();

        }
        location.reload();
    })

    // Al clicar en una de las papeleras elimina ese producto de LocalStorage
    const papelera = document.querySelectorAll('.fa-trash');
    papelera.forEach(papelera => {
        papelera.addEventListener('click', (e) => {
            const idProducto = Number(e.target.getAttribute('id'));
            eliminarProducto(idProducto);

        });

    });


    // Al cliclar en el botón 'finalizar compra' manda el fetch y abre finalizar-compra.ejs

    const boton_finalizar = document.querySelector('.boton-finalizar');
    boton_finalizar.addEventListener('click', ()=>{
        // enviamos el carrito para actualizar si ha habido aumento o disminución de cantidad de algún producto
        enviarCarrito();

        // finalizamos la compra con fetch

        const carrito = localStorage.getItem('productos');
        const datos = new Array(carrito);
        fetch('/compras/final', {
            method: 'PUT',
            body: datos,
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(message => {
            if(message === 'Completa tu perfil antes de finalizar la compra'){
                alert(message);
                window.location.href = '/perfil';
            }else{
                window.location.href = '/finalizar_compra';
                console.log(message);
    
            }
                
                
        })
        .catch(error => console.log(error));
    


    })

    //////////////////////////////////// FUNCIONES //////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////
    // Función que calcula el total a pagar añadiendo los portes y lo pinta en el html
    function calcularTotal() {
        
        const totales = document.querySelectorAll('.total');
        let subtotal = 0;
        for (let i = 0; i < totales.length; i++) {

            subtotal = Number(totales[i].textContent) + Number(subtotal);
        }
       
       
        const div_subtotal = document.querySelector('.subtotal');
        div_subtotal.textContent = `${subtotal.toFixed(2)} €`;

        let suma = document.querySelector('.suma');

        let superTotal = Number(subtotal.toFixed(2)) + 2.99;
        suma.textContent = `${superTotal.toFixed(2)} €`;
    }

    //////////////////////////////////////////////////////////////////////////////////////////
    // Función que recalcula el precio de cada producto según la cantidad y lo pinta en el html
    function recalcular(nuevaCantidad, total, precio) {

        let sum = precio * nuevaCantidad;
        total.textContent = sum.toFixed(2);
        calcularTotal();
    }


    //////////////////////////////////////////////////////////////////////////////////////////
    // Función que vacía el carrito por completo eliminando la key 'productos' de localStorage
    function vaciarCarrito() {
        localStorage.removeItem('productos');

        // ajax
        fetch('/compras/del', {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(message => {
                alert(message);
                location.reload();
            })
            .catch(error => console.log(error))
    }

})