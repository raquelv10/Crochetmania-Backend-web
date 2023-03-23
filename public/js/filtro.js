document.addEventListener('DOMContentLoaded', () => {


    let filtros = document.querySelectorAll('.boton-filtro'), i;

    filtros.forEach.call(filtros, function (e) {

        e.addEventListener('click', function () {

            const boton_activo = document.querySelector('.activo');

            boton_activo.classList.remove('activo'); // elimina la clase activo de donde la encuentra

            this.classList.add('activo') // añade la clase activo al botón que hemos clicado

            let clase_activa = this.dataset.filter; // guarda el contenido de dataset.filter del botón en una variable

            let productos = document.querySelectorAll('.container-tienda'); // crea la variable de los productos.


            productos.forEach.call(productos, function (el) {

                // oculta todos los productos
                  
                el.style.transform= `scale(0)`;
                function ocultar(){
                    el.classList.add('none');  
                }  
                setTimeout(ocultar,250);
               // muestra solo los productos que concuerdan con la clase del botón clicado
                
                function mostrar(){

                    el.classList.remove('none'); 
                    el.style.transform= `scale(1)`;
                }


                if (el.classList.contains(clase_activa)) {
                    setTimeout(mostrar,250);
                }
                
                function mostrar_todo(){
                    el.classList.remove('none');
                    el.style.transform= `scale(1)`;
                    
                }
                // muestra todos los productos
                if (clase_activa === '*') {
                    setTimeout(mostrar,250);
                    
                }
            })
        })

    });


})
    


    
    

