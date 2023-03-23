
document.addEventListener("DOMContentLoaded", () => {

    const modal = document.querySelector(".modal");
    const span_cerrar = document.querySelector(".cerrar");
    const btn_finalizar = document.querySelector('.boton-finalizar1');
   

    btn_finalizar.addEventListener('click', (e)=>{
        
        modal.classList.add('scale1');
        
    })

    span_cerrar.addEventListener('click', ()=>{
        modal.classList.add('scale0');
        modal.classList.remove('scale1');
    })

    window.addEventListener('click', (e)=>{
        if (e.target === modal) {
            modal.classList.add('scale0');
            modal.classList.remove('scale1');
        }
    })

    // boton del modal
    const boton_pagar = document.querySelector('.pagar');
    boton_pagar.addEventListener('click', ()=>{

        const carrito = localStorage.getItem('productos');
        const datos = new Array(carrito);

        fetch('/compras/facturar', {
            method: 'PUT',
            body: datos,
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(message => {
            console.log(message);
            localStorage.removeItem('productos');
                    
            window.open('/factura');           
        })
        .catch(error => console.log(error));

    })

})











