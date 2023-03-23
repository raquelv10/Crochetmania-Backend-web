 // Manda con fetch el array de localStorage a carrito.routes
 const enviarCarrito = () =>{
    const div_subtotal = document.querySelector('.subtotal');
    if (localStorage.getItem('productos')) {
        
        const carrito = localStorage.getItem('productos');
        const datos = new Array(carrito);
   
        fetch('/compras/', {
            method: 'PUT',
            body: datos,
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => response.json())
            .then(message => {
               if(message === 'Sesión iniciada'){
                   console.log(message);
               }else{
                alert(message);
               }
                   
            })
            .catch(error => console.log(error));
   
   
        // calculamos la suma de los totales + los portes y lo pintamos en el html
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
   
    } else {
   
        // Envia el carrito vacío cuando no se ha comprado nada
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
   
        // Pinta el campo suma vacío para que no siga saliendo el último coste    
        let suma = document.querySelector('.suma');
        suma.textContent = "";
    }
 }
 


 export default enviarCarrito;