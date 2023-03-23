document.addEventListener("DOMContentLoaded", () => {

    // Función que abre y cierra el aside con el icomo de menú burger
    let burguer = document.querySelector("#burguer img");
    let contenedor = document.querySelector(".contenedor-aside");
    let content = document.querySelector(".content-aside");

    contenedor.addEventListener("click", () => {
        
        content.classList.toggle("content-abierto");
        content.classList.toggle("content-aside");
        contenedor.classList.toggle("contenedor-abierto");
        contenedor.classList.toggle("contenedor-aside");
   })

    burguer.addEventListener("click", () => {

        content.classList.toggle("content-abierto");
        content.classList.toggle("content-aside");
        contenedor.classList.toggle("contenedor-abierto");
        contenedor.classList.toggle("contenedor-aside");

    })

    // funcion que cambia el icono del carrito si hay algo en localStorage

    const carrito = JSON.parse(localStorage.getItem('productos')); 
    const carritoIcon = document.querySelector('#carrito-icon');
    
    // Para cambiar el icono, primero comprueba que existe, ya que si no se ha iniciado sesión no aparece.
    if(carritoIcon !== null){ 
        if(carrito !== null ){
       
            carritoIcon.setAttribute('src', '../img/carrito-lleno.png');
            carritoIcon.setAttribute('alt', 'carrito');
    
        }else {
            carritoIcon.setAttribute('src', '../img/carrito-vacio.png');
            carritoIcon.setAttribute('alt', 'carrito');
        }
    }
    
})