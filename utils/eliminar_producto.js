const eliminarProducto = (idProducto) => {
    // Función que elimina un producto por completo de la lista de LocalStorage. Se utiliza al clicar en la papelera
    const carrito = [];
    if (localStorage.getItem('productos')) {
        const carritoLleno = JSON.parse(localStorage.getItem('productos'));

        for (let i = 0; i < carritoLleno.length; i++) {

            if (carritoLleno[i][0] === idProducto) {
                console.log(`id producto es ${idProducto} el valor del array en esta posición es ${carritoLleno[i][0]}`)
                // el producto con este id, es decir el que queremos eliminar no se añade al array

            } else {

                carrito.push([carritoLleno[i][0]]);

                // insertamos el array carrito en LocalStorage
                const carrito_json = JSON.stringify(carrito);
                localStorage.setItem('productos', carrito_json);


                fetch('/compras/', {
                    method: 'PUT',
                    body: JSON.stringify(carrito),
                    headers: { 'Content-Type': 'application/json' }
                })
                    .then(response => response.json())
                    .then(message => {
                        
                       console.log(message);
                        
                    })
                    .catch(error => console.log(error));
            }
        }
        location.reload();
    }

    if (carrito.length === 0) {
        vaciarCarrito();
    }
    return console.log('ok');
}


export default eliminarProducto;
