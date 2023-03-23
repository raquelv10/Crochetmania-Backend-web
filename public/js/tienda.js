


document.addEventListener('DOMContentLoaded', () => {

    // Guarda las compras en LocalStorage hasta que finalizas la compra.
    
    const contenedorTienda = document.querySelector('.contenedor-tienda'); // corresponde al contenedor primcipal.
    const containerTienda = document.querySelectorAll('.container-tienda button'); // corresponde al botón de cada producto.
    const btn_carrito = document.querySelectorAll('.btn-carrito');
    const carritoLleno = JSON.parse(localStorage.getItem('productos'));
    const carrito = [];
    if (carritoLleno !== null) {
        for (let i = 0; i < carritoLleno.length; i++) {
            carrito.push(carritoLleno[i]);

        }

    }

    btn_carrito.forEach.call(btn_carrito, (e) => {

        e.addEventListener('click', () => {
            // addProduct(e);

            const idUser = e.getAttribute('id');


            if (idUser === "") {
                alert('Inicia sesión para comprar');

            } else {
                // cojemos el id del producto cada vez que clicamos en el botón 'añadir al carrito' de un producto

                const idProducto = Number(e.parentElement.parentElement.parentElement.getAttribute('id'));


                carrito.push([idProducto]);

                // const localStorageDB = JSON.parse(localStorage.getItem('productos')); 

                // insertamos el array carrito en LocalStorage
                const carrito_json = JSON.stringify(carrito);
                localStorage.setItem('productos', carrito_json);

                const carrito_icon = document.querySelector('#carrito-icon');
                carrito_icon.setAttribute('src', '../img/carrito-lleno.png');

            }

            if (localStorage.getItem('productos')) {
                // al hacer getItem para que lo lea como un array primero hay que hacer un JSON.parse
                const carrito = localStorage.getItem('productos');
                const datos = new Array(carrito);

                fetch('/compras/', {
                    method: 'PUT',
                    body: datos,
                    headers: { 'Content-Type': 'application/json' }
                })
                    .then(response => response.json())
                    .then(message => {
                        alert(message);

                    })
                    .catch(error => console.log(error));

               
            } else {

                // Envia el carrito vacío
                const carrito = [];

                fetch('/compras/', {
                    method: 'PUT',
                    body: JSON.stringify(carrito),
                    headers: { 'Content-Type': 'application/json' }
                })
                .then(response => response.json())
                .then(message => {
                    alert(message);

                })
                .catch(error => console.log(error));

               
            }

        })



    })


})